<?php
/**
 * CbspWCRestApi Class.
 *
 * @package cbsp
 */

namespace CBSP;

class CbspWCRestApi {

    public function __construct() {
        $this->init();
    }

    private function init() {
        add_action( 'init', array( $this, 'enqueue_cbsp_localize_script_wc_products' ) );
        add_action( 'rest_api_init', array( $this, 'cbsp_register_wc_rest_api' ) );
    }

    public function enqueue_cbsp_localize_script_wc_products() {
        if ( is_admin() ) {
            wp_localize_script(
                'cbsp-blocks-js',
                'cbspProductData',
                array(
                    'nonce'   => wp_create_nonce( 'wp_rest' ),
                    'apiUrl'  => rest_url( 'cbsp/v1/' ),
                )
            );
        }
    }

    public function cbsp_register_wc_rest_api() {
        register_rest_route( 'cbsp/v1', '/products/', array(
            'methods'  => 'GET',
            'callback' => array( $this, 'cbsp_get_products_listing' ),
            'permission_callback' => '__return_true',
        ) );
    }

     /**
     * Helper function to format the price.
     */
    private function format_price_manual($price, $currency_symbol, $currency_position, $decimal_separator, $thousand_separator, $decimals) {
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

    public function cbsp_get_products_listing( $request ) {
        // Ensure WooCommerce is active.
        if ( ! class_exists( 'WooCommerce' ) ) {
            return new WP_Error( 'woocommerce_not_active', 'WooCommerce is not installed or activated.', array( 'status' => 404 ) );
        }

        $mode = $request->get_param('mode');
        $selectedIds = $request->get_param('selectedIds'); // Fetch selected product IDs

        if ($mode === 'tslw') {
            return $this->cbsp_get_tslw_products();
        } else {
            return $this->cbsp_get_manual_products($selectedIds);
        }
    }

    // Method to call ProductQueryHelper's tslw function
    public function cbsp_get_tslw_products() {
        require_once 'ProductQueryHelper.php';
        $helper = new \CBSP\ProductQueryHelper();

        // Get WooCommerce currency settings
        $currency_symbol = html_entity_decode(get_woocommerce_currency_symbol());
        $currency_position = get_option('woocommerce_currency_pos');
        $decimal_separator = get_option('woocommerce_price_decimal_sep');
        $thousand_separator = get_option('woocommerce_price_thousand_sep');
        $decimals = get_option('woocommerce_price_num_decimals');
        $sale_price = '';
        $regular_price = '';
        $product_type = '';
        $formatted_price = '';
        
        $products = $helper->fetch_top_selling_last_week();

        return rest_ensure_response($products);
    }

    // Method for manual product selection, fetching product details based on selected IDs
    public function cbsp_get_manual_products($selectedIds = array()) {
        // If no selected IDs, return only basic info (ID and name)
        if (empty($selectedIds)) {
            $args = array(
                'status'    => 'publish',
                'orderby'   => 'title',
                'order'     => 'ASC',
                'limit'     => -1,
            );
        } else {
            // Fetch detailed product information for selected products
            $args = array(
                'status'    => 'publish',
                'orderby'   => 'title',
                'order'     => 'ASC',
                'include'   => $selectedIds, // Fetch only selected IDs
            );
        }

        $query    = new \WC_Product_Query($args);
        $products = $query->get_products();

        // Get WooCommerce currency settings
        $currency_symbol = html_entity_decode(get_woocommerce_currency_symbol());
        $currency_position = get_option('woocommerce_currency_pos');
        $decimal_separator = get_option('woocommerce_price_decimal_sep');
        $thousand_separator = get_option('woocommerce_price_thousand_sep');
        $decimals = get_option('woocommerce_price_num_decimals');
        $sale_price = '';
        $regular_price = '';
        $product_type = '';
        $formatted_price = '';

        $formatted_products = array();
        foreach ($products as $product) {
            if ($product->is_on_sale() && $product->is_type('simple')) {
                // Sale Price
                $sale_price = $this->format_price_manual($product->get_sale_price(), $currency_symbol, $currency_position, $decimal_separator, $thousand_separator, $decimals);
                // Regular Price
                $regular_price = $this->format_price_manual($product->get_regular_price(), $currency_symbol, $currency_position, $decimal_separator, $thousand_separator, $decimals);
                //product type
                $product_type = 'on_sale';
            }elseif ($product->is_type('variable')) {
                // Variable price range
                $max_price = $this->format_price_manual($product->get_variation_price('max', true), $currency_symbol, $currency_position, $decimal_separator, $thousand_separator, $decimals);
                //Min Price
                $min_price = $this->format_price_manual($product->get_variation_price('min', true), $currency_symbol, $currency_position, $decimal_separator, $thousand_separator, $decimals);
                //product type
                $product_type = 'variable';
                // Display price range
                $formatted_price = $min_price . ' - ' . $max_price;
            }else {
                // Product price
                $formatted_price = $this->format_price_manual($product->get_price(), $currency_symbol, $currency_position, $decimal_separator, $thousand_separator, $decimals);
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

        return rest_ensure_response($formatted_products);
    }
}
