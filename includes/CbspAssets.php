<?php
/**
 * CbspAssets Class.
 *
 * @package cbsp
 */

namespace CBSP;

/**
 * Class CbspAssets.
 */
class CbspAssets {

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
		/**
		 * The 'init' hook includes styles and scripts both in editor and frontend,
		 * except when is_admin() is used to include them conditionally
		 */
		add_action( 'init', array( $this, 'enqueue_cbsp_block_editor_assets' ) );
	}

	/**
	 * Enqueue Admin Scripts
	 */
	public function enqueue_cbsp_block_editor_assets() {

		$asset_config_file = sprintf( '%s/assets.php', CBSP_PLUGIN_BUILD_PATH );
		
		if ( ! file_exists( $asset_config_file ) ) {
			return;
		}

		$asset_config = include_once $asset_config_file;

		if ( empty( $asset_config['js/blocks.js'] ) ) {
			return;
		}

		$blocks_asset    = $asset_config['js/blocks.js'];
		$js_dependencies = ( ! empty( $blocks_asset['dependencies'] ) ) ? $blocks_asset['dependencies'] : array();
		$version         = ( ! empty( $blocks_asset['version'] ) ) ? $blocks_asset['version'] : filemtime( $asset_config_file );

		// Theme Gutenberg blocks JS.
		if ( is_admin() ) {
			wp_enqueue_script(
				'cbsp-blocks-js',
				CBSP_PLUGIN_BUILD_URL . '/js/blocks.js',
				$js_dependencies,
				$version,
				true
			);

			// Make sample-products.xml file URL available to JavaScript
			wp_localize_script(
				'cbsp-blocks-js',
				'cbspSampleData',
				array(
					'sampleProductsXML' => plugin_dir_url( __DIR__ ) . 'assets/sample-data/sample_products.xml',
				)
			);
		}

		// Theme Gutenberg blocks CSS.
		$css_dependencies = array(
			'wp-block-library-theme',
			'wp-block-library',
		);

		wp_enqueue_style(
			'cbsp-blocks-css',
			CBSP_PLUGIN_BUILD_URL . '/css/blocks.css',
			$css_dependencies,
			filemtime( CBSP_PLUGIN_BUILD_PATH . '/css/blocks.css' ),
			'all'
		);

	}
}
