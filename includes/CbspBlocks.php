<?php
/**
 * CbspBlocks Class.
 *
 * @package cbsp
 */

namespace CBSP;

/**
 * Class CbspBlocks.
 */
class CbspBlocks {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->setup_hooks();
	}

	/**
	 * Set up WordPress hooks related to the CBSP block.
	 *
	 * Registers the necessary actions or filters for the plugin to function.
	 */
	protected function setup_hooks() {

		/**
		 * Actions.
		 */
		add_filter( 'block_categories_all', array( $this, 'add_cbsp_block_categories' ) );
	}

	/**
	 * Add a block category for the CBSP plugin blocks.
	 *
	 * @param array $categories Existing block categories.
	 *
	 * @return array Modified block categories with the CBSP category added.
	 */
	public function add_cbsp_block_categories( $categories ) {

		$category_slugs = wp_list_pluck( $categories, 'slug' );

		return in_array( 'wc-cbsp', $category_slugs, true ) ? $categories : array_merge(
			$categories,
			array(
				array(
					'slug'  => 'wc-cbsp',
					'title' => __( 'Choose Your Best Selling Products', 'choose-your-best-selling-products' ),
					'icon'  => '',
				),
			)
		);
	}
}
