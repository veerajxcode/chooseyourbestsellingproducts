import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';

// Helper function to parse XML
const parseXML = (xmlData) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, 'application/xml');
    console.log(xmlDoc);
    const itemNodes = xmlDoc.getElementsByTagName('item');
    //console.log(itemNodes);
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

        // Assuming you have a method to fetch image URL by ID
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
        // Fetch the dummy product data (parsed XML logic)
        const fetchDummyProducts = async () => {
            // Logic to fetch and parse XML data
            const response = await fetch(cbspSampleData.sampleProductsXML);
            const xmlData = await response.text();
            const parsedProducts = parseXML(xmlData);
            setProducts(parsedProducts);
        };

        fetchDummyProducts();
    }, []);

    // CSS grid structure based on column/row settings
    const gridStyle = {
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows:  `repeat(${rows}, auto)`,
    }

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

            <div className="product-grid" style={gridStyle}>
                {products.length > 0 ? (
                     products.slice(0, columns * rows).map((product, index) => (
                        <div key={index} className="product-card">
                            {showImage && <img src={product.image} alt={product.name} />}
                            {showTitle && <h3>{product.name}</h3>}
                            {showPrice && <p>{product.price}</p>}
                            {showRating && <p>Rating Placeholder</p>}
                            {showCartButton && <button>{__('Add to Cart', 'cbsp')}</button>}
                        </div>
                    ))
                ) : (
                    <p>{__('Loading sample products...', 'cbsp')}</p>
                )}
            </div>
        </>
    );
};

export default Edit;