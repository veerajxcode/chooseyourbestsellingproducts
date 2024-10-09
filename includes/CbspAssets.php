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
		add_action( 'wp_enqueue_scripts', array( $this, 'cbsp_register_styles' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'cbsp_register_scripts' ) );
		/**
		 * The 'init' hook includes styles and scripts both in editor and frontend,
		 * except when is_admin() is used to include them conditionally
		 */
		add_action( 'init', array( $this, 'enqueue_cbsp_block_editor_assets' ) );
	}

	/**
	 * Register Bootstrap Styles.
	 */
	public function cbsp_register_styles() {
		// Dynamically get the file modification time for versioning.
		$bootstrap_css_version = filemtime( CBSP_PLUGIN_PATH . '/assets/src/library/css/bootstrap.min.css' );
		$block_css_version     = filemtime( CBSP_PLUGIN_PATH . '/assets/src/css/blocks.css' );
		wp_register_style(
			'cbsp-bootstrap-css',
			CBSP_PLUGIN_URL . '/assets/src/library/css/bootstrap.min.css',
			array(),
			$bootstrap_css_version,
			'all'
		);
		wp_register_style(
			'cbsp-block-css',
			CBSP_PLUGIN_URL . '/assets/src/css/blocks.css',
			array(),
			$block_css_version,
			'all'
		);

		wp_enqueue_style( 'cbsp-bootstrap-css' );
		wp_enqueue_style( 'cbsp-block-css' );
	}

	/**
	 * Register Bootstrap Scripts.
	 */
	public function cbsp_register_scripts() {

		// Dynamically get the file modification time for versioning.
		$bootstrap_js_version = filemtime( CBSP_PLUGIN_PATH . '/assets/src/library/js/bootstrap.min.js' );

		wp_register_script(
			'cbsp-bootstrap-js',
			CBSP_PLUGIN_URL . '/assets/src/library/js/bootstrap.min.js',
			array( 'jquery' ),
			$bootstrap_js_version,
			true
		);
		wp_enqueue_script( 'cbsp-bootstrap-js' );
	}

	/**
	 * Enqueue Admin Scripts.
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

			// WP Gutenberg blocks CSS.
			$css_dependencies = array(
				'wp-edit-blocks',
			);

			wp_enqueue_style(
				'cbsp-layout-css',
				CBSP_PLUGIN_URL . '/assets/src/css/blocks.css',
				$css_dependencies,
				filemtime( CBSP_PLUGIN_PATH . '/assets/src/css/blocks.css' ),
				'all'
			);

		}
	}
}
