<?php
/**
 * Choose Your Best Selling Products Plugin
 *
 * @package cbsp
 * @author Veeraj Yadav
 *
 * Plugin Name:       Choose Your Best Selling Products
 * Plugin URI:        https://example.com/plugins/the-basics/
 * Description:       Allows you to choose and show best selling products of your store
 * Version:           1.0.0
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            Veeraj Yadav
 * Author URI:        https://author.example.com/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       cbsp
 * Domain Path:       /languages
 * Requires Plugins:  woocommerce
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Include Composer's autoloader if available.
if ( file_exists( plugin_dir_path( __FILE__ ) . 'vendor/autoload.php' ) ) {
	require plugin_dir_path( __FILE__ ) . 'vendor/autoload.php';
}

use CBSP\CbspPlugin;

// Initialize the plugin.
if ( class_exists( 'CBSP\CbspPlugin' ) ) {
	$cbsp_plugin = new CbspPlugin();
}

// Hook into activation and deactivation.
register_activation_hook( __FILE__, [ $cbsp_plugin, 'activate' ] );
register_deactivation_hook( __FILE__, [ $cbsp_plugin, 'deactivate' ] );
