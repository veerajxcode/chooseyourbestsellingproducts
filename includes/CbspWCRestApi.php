<?php
/**
 * Class CbspWCRestApi.
 *
 * Handles WooCommerce REST API calls for the CBSP plugin.
 *
 * @package cbsp
 */

namespace CBSP;

/**
 * Class CbspWCRestApi.
 */
class CbspWCRestApi {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->init();
	}

	/**
	 * Initialize actions and hooks.
	 */
	private function init() {
		add_action( 'init', array( $this, 'enqueue_cbsp_localize_script_wc_products' ) );
		add_action( 'rest_api_init', array( $this, 'cbsp_register_wc_rest_api' ) );
	}

	/**
	 * Enqueue Admin Scripts.
	 */
	public function enqueue_cbsp_localize_script_wc_products() {
		if ( is_admin() ) {
			// Retrieve the current currency symbol from WooCommerce.
			$currency_symbol = get_woocommerce_currency_symbol();

			// Localize scripts for product categories and products based on category.
			wp_localize_script(
				'cbsp-blocks-js',
				'cbspProductData',
				array(
					'nonce'  => wp_create_nonce( 'wp_rest' ),
					'apiUrl' => rest_url( 'cbsp/v1/' ),
				)
			);
		}
	}

	/**
	 * Register custom REST API endpoints to fetch WooCommerce product categories and products based on category.
	 */
	public function cbsp_register_wc_rest_api() {
		// Endpoint to fetch products based on the selected category.
		register_rest_route(
			'cbsp/v1',
			'/products/',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'cbsp_get_products_listing' ),
				'permission_callback' => '__return_true',
			)
		);
	}

	/**
	 * Helper function to format the price.
	 *
	 * @param float  $price              The product price.
	 * @param string $currency_symbol    The currency symbol.
	 * @param string $currency_position  The currency symbol position.
	 * @param string $decimal_separator  The decimal separator.
	 * @param string $thousand_separator The thousand separator.
	 * @param int    $decimals           Number of decimals.
	 *
	 * @return string The formatted price.
	 */
	private function format_price( $price, $currency_symbol, $currency_position, $decimal_separator, $thousand_separator, $decimals ) {
		// Ensure the price is a float and not an empty value.
		$price = (float) $price;
		// Format the price with separators.
		$formatted_price = number_format( $price, $decimals, $decimal_separator, $thousand_separator );

		// Add the currency symbol in the correct position.
		switch ( $currency_position ) {
			case 'left':
				return $currency_symbol . $formatted_price;
			case 'right':
				return $formatted_price . $currency_symbol;
			case 'left_space':
				return $currency_symbol . ' ' . $formatted_price;
			case 'right_space':
				return $formatted_price . ' ' . $currency_symbol;
			default:
				return $formatted_price;
		}
	}

	/**
	 * Callback function to retrieve products.
	 *
	 * @param WP_REST_Request $request REST API request object.
	 *
	 * @return WP_REST_Response|WP_Error Response object.
	 */
	public function cbsp_get_products_listing( $request ) {

		// Ensure WooCommerce is active.
		if ( ! class_exists( 'WooCommerce' ) ) {
			return new WP_Error( 'woocommerce_not_active', 'WooCommerce is not installed or activated.', array( 'status' => 404 ) );
		}

		// Get the mode from the request parameters (default is 'tslw').
		$mode = $request->get_param( 'mode' );

		if ( 'tslw' === $mode ) {
			// If the mode is 'tslw (top_selling_last_week)', fetch last week's best selling products.

			// Calculate the start and end dates of the last week.
			$previous_week = strtotime("-1 week +1 day");

			$start_of_last_week = strtotime("last sunday midnight",$previous_week);
			$end_of_last_week = strtotime("next saturday",$start_of_last_week);

			//$start_of_last_week = strtotime("last week",$previous_week);
			//$end_of_last_week = strtotime("next week",$start_of_last_week);

			$start_of_last_week = date("Y-m-d",$start_of_last_week);
			$end_of_last_week = date("Y-m-d",$end_of_last_week);

			// Get all completed or processing orders from the last week.
			$order_args = array(
				'status'     => array( 'wc-completed', 'wc-processing' ),
				'date_query' => array(
					array(
						'after'     => $start_of_last_week,
						'before'    => $end_of_last_week,
						'inclusive' => true,
					),
				),
				'limit'      => -1,  // Get all orders.
			);
			//print_r($order_args); wp_die();

			$orders = wc_get_orders( $order_args );
			if(empty( $orders )){
				// Create a new WP_REST_Response object with the message and set the status to 204.
				$response = new \WP_REST_Response( array( 'message' => 'No data found' ) );
				$response->set_status( 204 ); // Set the status code to 204 No Content.
				return $response;
			}
			// Initialize an array to store the product sales data.
			$product_sales = array();

			// Loop through each order and sum up the quantities sold for each product.
			foreach ( $orders as $order ) {
				foreach ( $order->get_items() as $item ) {
					$product_id    = $item->get_product_id();
					$quantity_sold = $item->get_quantity();

					// Sum the quantities sold for each product, but skip if quantity is 0.
					if ( $quantity_sold > 0 ) {
						if ( isset( $product_sales[ $product_id ] ) ) {
							$product_sales[ $product_id ] += $quantity_sold;
						} else {
							$product_sales[ $product_id ] = $quantity_sold;
						}
					} else {
						$product_sales[ $product_id ] = ( $product_sales[ $product_id ] ?? 0 ) + $quantity_sold;
					}
				}
			}

			// Sort the products by quantity sold in descending order.
			arsort( $product_sales );

			// Fetch the top 40 products (with quantities sold).
			$top_products = array_slice( $product_sales, 0, 40, true );

			// Initialize an empty array to hold the product objects.
			$products = array();
			foreach ( $top_products as $product_id => $quantity_sold ) {
				$product = wc_get_product( $product_id );
				if ( $product ) {
					// Add the product object and quantity_sold to the array.
					$products[] = $product; // WooCommerce product object.
				}
			}
		} else {
			// Otherwise, perform the manual product selection query.

			$args = array(
				'status'  => 'publish',
				'orderby' => 'title',     // Order by product title.
				'order'   => 'ASC',       // Ascending order.
				'limit'   => -1,          // No limit on the number of products.
			);

			$query    = new \WC_Product_Query( $args );
			$products = $query->get_products();
		}

		// Get WooCommerce currency settings.
		$currency_symbol    = html_entity_decode( get_woocommerce_currency_symbol() );
		$currency_position  = get_option( 'woocommerce_currency_pos' );
		$decimal_separator  = get_option( 'woocommerce_price_decimal_sep' );
		$thousand_separator = get_option( 'woocommerce_price_thousand_sep' );
		$decimals           = get_option( 'woocommerce_price_num_decimals' );
		$sale_price         = '';
		$regular_price      = '';
		$product_type       = '';
		$formatted_price    = '';
		// Format the product data.
		$formatted_products = array();
		foreach ( $products as $product ) {

			if ( $product->is_on_sale() && $product->is_type( 'simple' ) ) {
				// Sale Price.
				$sale_price = $this->format_price( $product->get_sale_price(), $currency_symbol, $currency_position, $decimal_separator, $thousand_separator, $decimals );
				// Regular Price.
				$regular_price = $this->format_price( $product->get_regular_price(), $currency_symbol, $currency_position, $decimal_separator, $thousand_separator, $decimals );
				// Product Type.
				$product_type = 'on_sale';
			} elseif ( $product->is_type( 'variable' ) ) {
				// Variable price range.
				$max_price = $this->format_price( $product->get_variation_price( 'max', true ), $currency_symbol, $currency_position, $decimal_separator, $thousand_separator, $decimals );
				// Min Price.
				$min_price = $this->format_price( $product->get_variation_price( 'min', true ), $currency_symbol, $currency_position, $decimal_separator, $thousand_separator, $decimals );
				// Product Type.
				$product_type = 'variable';
				// Display price range.
				$formatted_price = $min_price . ' - ' . $max_price;
			} else {
				// Product price.
				$formatted_price = $this->format_price( $product->get_price(), $currency_symbol, $currency_position, $decimal_separator, $thousand_separator, $decimals );
				// product type.
				$product_type = 'simple';
			}

			$formatted_products[] = array(
				'id'            => $product->get_id(),
				'name'          => $product->get_name(),
				'price'         => $formatted_price,
				'regular_price' => $regular_price,
				'sale_price'    => $sale_price,
				'product_type'  => $product_type,
				'image'         => wp_get_attachment_image_src( $product->get_image_id(), 'thumbnail' )[0],
				'product_url'   => $product->get_permalink(),
			);
		}

		return rest_ensure_response( $formatted_products );
	}
}
