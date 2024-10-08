<?php
/**
 * ProductQueryHelper Class.
 *
 * @package cbsp
 */

namespace CBSP;

class ProductQueryHelper {

    /**
     * Helper function to format the price.
     */
    private function format_price_tslw($price, $currency_symbol, $currency_position, $decimal_separator, $thousand_separator, $decimals) {
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
     * Fetch top selling products from last week.
     *
     * @return array
     */
    public function fetch_top_selling_last_week() {
        $one_week_ago = strtotime('-1 week');
        $order_args = array(
            'status' => array('wc-completed', 'wc-processing'),
            'date_query' => array(
                array(
                    'after' => date('Y-m-d', $one_week_ago),
                    'inclusive' => true,
                ),
            ),
            'limit' => 36,
        );

        $orders = wc_get_orders($order_args);
        $product_sales = array();

        foreach ($orders as $order) {
            foreach ($order->get_items() as $item) {
                $product_id = $item->get_product_id();
                $quantity_sold = $item->get_quantity();

                if ($quantity_sold > 0) {
                    if (isset($product_sales[$product_id])) {
                        $product_sales[$product_id] += $quantity_sold;
                    } else {
                        $product_sales[$product_id] = $quantity_sold;
                    }
                }
            }
        }

        arsort($product_sales);
        $top_products = array_slice($product_sales, 0, 40, true);

        $products = array();
        foreach ($top_products as $product_id => $quantity_sold) {
            $product = wc_get_product($product_id);
            if ($product->is_on_sale() && $product->is_type('simple')) {
                // Sale Price
                $sale_price = $this->format_price_tslw($product->get_sale_price(), $currency_symbol, $currency_position, $decimal_separator, $thousand_separator, $decimals);
                // Regular Price
                $regular_price = $this->format_price_tslw($product->get_regular_price(), $currency_symbol, $currency_position, $decimal_separator, $thousand_separator, $decimals);
                //product type
                $product_type = 'on_sale';
            }elseif ($product->is_type('variable')) {
                // Variable price range
                $max_price = $this->format_price_tslw($product->get_variation_price('max', true), $currency_symbol, $currency_position, $decimal_separator, $thousand_separator, $decimals);
                //Min Price
                $min_price = $this->format_price_tslw($product->get_variation_price('min', true), $currency_symbol, $currency_position, $decimal_separator, $thousand_separator, $decimals);
                //product type
                $product_type = 'variable';
                // Display price range
                $formatted_price = $min_price . ' - ' . $max_price;
            }else {
                // Product price
                $formatted_price = $this->format_price_tslw($product->get_price(), $currency_symbol, $currency_position, $decimal_separator, $thousand_separator, $decimals);
                 //product type
                 $product_type = 'simple';
            }

            if ($product) {
                $products[] = array(
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
        }

        return $products;
    }
}
