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
                    'sampleProductsXML' => plugin_dir_url( __DIR__ ) . 'assets/sample-data/sample_products.xml',
                    'apiUrl' => rest_url( 'cbsp/v1/' ),
                    'currencySymbol'    => $currency_symbol,
                    'defaultImg' => plugin_dir_url( __DIR__ ) . 'assets/build/img/cbsp-products.png',
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

        // Format the product data.
        $formatted_products = array();
        foreach ( $products as $product ) {

            // Format the price
            $price = number_format( $product->get_price(), $decimals, $decimal_separator, $thousand_separator );

            // Add currency symbol in the correct position
            switch ( $currency_position ) {
                    case 'left':
                        $formatted_price = $currency_symbol . $price;
                        break;
                    case 'right':
                        $formatted_price = $price . $currency_symbol;
                        break;
                    case 'left_space':
                        $formatted_price = $currency_symbol . ' ' . $price;
                        break;
                    case 'right_space':
                        $formatted_price = $price . ' ' . $currency_symbol;
                        break;
                    default:
                        $formatted_price = $price;
                        break;
                }

            $formatted_products[] = array(
                'id'    => $product->get_id(),
                'name'  => $product->get_name(),
                'price' => $formatted_price,
                'image' => wp_get_attachment_image_src( $product->get_image_id(), 'thumbnail' )[0],
            );
        }

        return rest_ensure_response( $formatted_products );
    }
}
