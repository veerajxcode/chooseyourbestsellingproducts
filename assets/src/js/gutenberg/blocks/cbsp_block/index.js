import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';

registerBlockType( 'cbsp-blocks/cbsp-grid-layout', {
	title: __( 'CBSP', 'cbsp' ),
	icon: 'products',
	description: __('Choose Your Best Selling Products', 'cbsp'),
	category: 'wc-cbsp',
    attributes: {
        columns: {
            type: 'number',
            default: 3,
        },
        rows: {
            type: 'number',
            default: 3,
        },
        showImage: {
            type: 'boolean',
            default: true,
        },
        showTitle: {
            type: 'boolean',
            default: true,
        },
        showPrice: {
            type: 'boolean',
            default: true,
        },
        showRating: {
            type: 'boolean',
            default: true,
        },
        showCartButton: {
            type: 'boolean',
            default: true,
        },
        products: {
            type: 'array',
            default: [],
        },
    },
    edit: Edit,
    save: Save,
} );