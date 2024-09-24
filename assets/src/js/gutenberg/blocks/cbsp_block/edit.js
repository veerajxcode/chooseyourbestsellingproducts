import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';
import ProductLayout from './product-layout';
// Helper function to parse XML
const parseXML = (xmlData) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, 'application/xml');
    const itemNodes = xmlDoc.getElementsByTagName('item');
    const products = [];

    Array.from(itemNodes).forEach(item => {
        const name = item.getElementsByTagName('title')[0]?.textContent || '';
        const priceNodes = item.getElementsByTagName('wp:postmeta');
        let price = '';
        let thumbnailId = '';

        Array.from(priceNodes).forEach(meta => {
            const key = meta.getElementsByTagName('wp:meta_key')[0]?.textContent;
            const value = meta.getElementsByTagName('wp:meta_value')[0]?.textContent;

            if(key === '_price'){
                price = value;
            }

            if(key === '_thumbnail_id') {
                thumbnailId = value;
            }
        });

        const image = thumbnailId ? `/wp-content/uploads/${thumbnailId}.jpg` : '';

        products.push({
            name,
            image,
            price,
        });
    });

    return products;
}

const Edit = (props) => {
    const { attributes, setAttributes } = props;
    const { columns, rows, showImage, showTitle, showPrice, showRating, showCartButton } = attributes;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchDummyProducts = async () => {
            const response = await fetch(cbspSampleData.sampleProductsXML);
            const xmlData = await response.text();
            const parsedProducts = parseXML(xmlData);
            setProducts(parsedProducts);
            setAttributes({ products: parsedProducts }); // Persist products in attributes
        };

        fetchDummyProducts();
    }, []);

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Layout', 'cbsp')}>
                    <RangeControl
                        label={__('Columns', 'cbsp')}
                        value={columns}
                        onChange={(value) => setAttributes({ columns: value })}
                        min={1}
                        max={6}
                    />
                    <RangeControl
                        label={__('Rows', 'cbsp')}
                        value={rows}
                        onChange={(value) => setAttributes({ rows: value })}
                        min={1}
                        max={6}
                    />
                </PanelBody>
                <PanelBody title={__('Content Settings', 'cbsp')}>
                    <ToggleControl
                        label={__('Show Product Image', 'cbsp')}
                        checked={showImage}
                        onChange={(value) => setAttributes({ showImage: value })}
                    />
                    <ToggleControl
                        label={__('Show Product Title', 'cbsp')}
                        checked={showTitle}
                        onChange={(value) => setAttributes({ showTitle: value })}
                    />
                    <ToggleControl
                        label={__('Show Product Price', 'cbsp')}
                        checked={showPrice}
                        onChange={(value) => setAttributes({ showPrice: value })}
                    />
                    <ToggleControl
                        label={__('Show Product Rating', 'cbsp')}
                        checked={showRating}
                        onChange={(value) => setAttributes({ showRating: value })}
                    />
                    <ToggleControl
                        label={__('Show Add to Cart Button', 'cbsp')}
                        checked={showCartButton}
                        onChange={(value) => setAttributes({ showCartButton: value })}
                    />
                </PanelBody>
            </InspectorControls>

           <ProductLayout
            products={products}
            columns={columns}
            rows={rows}
            showImage={showImage}
            showTitle={showTitle}
            showPrice={showPrice}
            showRating={showRating}
            showCartButton={showCartButton}
        />
        </>
    );
};

export default Edit;
