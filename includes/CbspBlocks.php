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

	protected function setup_hooks() {

		/**
		 * Actions.
		 */
		add_filter( 'block_categories_all', array( $this, 'add_cbsp_block_categories' ) );
	}


	/**
	 * Add a block category
	 *
	 * @param array $categories Block categories.
	 *
	 * @return array
	 */
	public function add_cbsp_block_categories( $categories ) {

		$category_slugs = wp_list_pluck( $categories, 'slug' );

		return in_array( 'wc-cbsp', $category_slugs, true ) ? $categories : array_merge(
			$categories,
			array(
				array(
					'slug'  => 'wc-cbsp',
					'title' => __( 'Choose Your Best Selling Products', 'cbsp' ),
					'icon'  => '',
                ),
            )
		);
		
        //echo "<pre>";
        //print_r($cbsp_slugs); wp_die();

	}
}
