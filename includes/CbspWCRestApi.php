<?php
/**
 * CbspWCRestApi Class.
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
     * Initialize.
     */
    private function init() {
        add_action( 'init', array( $this, 'enqueue_cbsp_localize_script_wc_products' ) );

        /** Rest API call to fetch categories and products from WooCommerce */
        add_action( 'rest_api_init', array( $this, 'cbsp_register_wc_rest_api' ) );
    }

    /**
     * Enqueue Admin Scripts.
     */
    public function enqueue_cbsp_localize_script_wc_products() {
        if ( is_admin() ) {
            // Retrieve the current currency symbol from WooCommerce
            $currency_symbol = get_woocommerce_currency_symbol();

            // Localize scripts for product categories and products based on category
            wp_localize_script(
                'cbsp-blocks-js',
                'cbspProductData',
                array(
                    'nonce'           => wp_create_nonce( 'wp_rest' ), // ToDo: Implement it in api call
                    'apiUrl' => rest_url( 'cbsp/v1/' ),
                )
            );
        }
    }

    /**
     * Register custom REST API endpoints to fetch WooCommerce product categories and products based on category.
     */
    public function cbsp_register_wc_rest_api() {

        // Endpoint to fetch products based on the selected category
        register_rest_route( 'cbsp/v1', '/products/', array(
            'methods'  => 'GET',
            'callback' => array( $this, 'cbsp_get_products_listing' ),
            'permission_callback' => '__return_true',
        ) );
    }

    /**
     * Helper function to format the price.
     */
    private function format_price($price, $currency_symbol, $currency_position, $decimal_separator, $thousand_separator, $decimals) {
        // Ensure the price is a float and not an empty value
        $price = (float) $price;
        // Format the price with separators
        $formatted_price = number_format($price, $decimals, $decimal_separator, $thousand_separator);

        // Add the currency symbol in the correct position
        switch ($currency_position) {
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
     * Callback function to retrieve products
     *
     * @param WP_REST_Request $request
     */
    public function cbsp_get_products_listing() {

        // Ensure WooCommerce is active.
        if ( ! class_exists( 'WooCommerce' ) ) {
            return new WP_Error( 'woocommerce_not_active', 'WooCommerce is not installed or activated.', array( 'status' => 404 ) );
        }

        $args = array(
            'status'    => 'publish',
            'orderby'   => 'title',     // Order by product title
            'order'     => 'ASC',       // Ascending order
            'limit'     => -1,          // No limit on the number of products
        );

        $query    = new \WC_Product_Query( $args );
        $products = $query->get_products();

        // Get WooCommerce currency settings
        $currency_symbol = html_entity_decode( get_woocommerce_currency_symbol() );
        $currency_position = get_option( 'woocommerce_currency_pos' );
        $decimal_separator = get_option( 'woocommerce_price_decimal_sep' );
        $thousand_separator = get_option( 'woocommerce_price_thousand_sep' );
        $decimals = get_option( 'woocommerce_price_num_decimals' );
        $sale_price = '';
        $regular_price = '';
        $product_type = '';

        // Format the product data.
        $formatted_products = array();
        foreach ( $products as $product ) {

        if ($product->is_on_sale() && $product->is_type('simple')) {
            // Sale Price
            $sale_price = $this->format_price($product->get_sale_price(), $currency_symbol, $currency_position, $decimal_separator, $thousand_separator, $decimals);
            // Regular Price
            $regular_price = $this->format_price($product->get_regular_price(), $currency_symbol, $currency_position, $decimal_separator, $thousand_separator, $decimals);
            //product type
            $product_type = 'on_sale';
        }elseif ($product->is_type('variable')) {
            // Variable price range
            $max_price = $this->format_price($product->get_variation_price('max', true), $currency_symbol, $currency_position, $decimal_separator, $thousand_separator, $decimals);
            //Min Price
            $min_price = $this->format_price($product->get_variation_price('min', true), $currency_symbol, $currency_position, $decimal_separator, $thousand_separator, $decimals);
            //product type
            $product_type = 'variable';
            // Display price range
            $formatted_price = $min_price . ' - ' . $max_price;
        }else {
            // Product price
            $formatted_price = $this->format_price($product->get_price(), $currency_symbol, $currency_position, $decimal_separator, $thousand_separator, $decimals);
             //product type
             $product_type = 'simple';
        }
    
        $formatted_products[] = array(
            'id'    => $product->get_id(),
            'name'  => $product->get_name(),
            'price' => $formatted_price,
            'regular_price' => $regular_price,
            'sale_price' => $sale_price,
            'product_type' => $product_type,
            'image' => wp_get_attachment_image_src( $product->get_image_id(), 'thumbnail' )[0],
            'product_url' => $product->get_permalink(),
        );
    }

        return rest_ensure_response( $formatted_products );
    }
}
