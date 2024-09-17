<?php
/**
 * Handles block registration for Choose Your Best Selling Products.
 *
 * @package CBSP
 */

namespace CBSP;

/**
 * The main class responsible for registering the block and block patterns.
 *
 * @package CBSP
 */
class CbspPlugin {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->init();
	}

	/**
	 * Plugin activation hook.
	 */
	public function activate() {}

	/**
	 * Plugin deactivation hook.
	 */
	public function deactivate() {}

	/**
	 * Initialize the plugin.
	 */
	private function init() {
		// Define constants for plugin paths and URLs.
		define( 'CBSP_PLUGIN_PATH', untrailingslashit( plugin_dir_path( __DIR__ ) ) );
		define( 'CBSP_PLUGIN_URL', untrailingslashit( plugin_dir_url( __DIR__ ) ) );
		define( 'CBSP_PLUGIN_BUILD_PATH', CBSP_PLUGIN_PATH . '/assets/build' );
		define( 'CBSP_PLUGIN_BUILD_URL', CBSP_PLUGIN_URL . '/assets/build' );
		define( 'CBSP_PLUGIN_VERSION', '1.0.0' );

		new CbspAssets();
	}
}
