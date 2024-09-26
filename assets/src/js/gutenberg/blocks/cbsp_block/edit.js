import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl, CheckboxControl, TextControl } from '@wordpress/components';
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

        Array.from(priceNodes).forEach(meta => {
            const key = meta.getElementsByTagName('wp:meta_key')[0]?.textContent;
            const value = meta.getElementsByTagName('wp:meta_value')[0]?.textContent;

            if (key === '_price') {
                price = value;
            }

        });

        const image = cbspProductData.defaultImg;

        products.push({
            name,
            image,
            price,
        });
    });

    return products;
};

const Edit = (props) => {
    const { attributes, setAttributes } = props;
    const { columns, rows, showImage, showTitle, showPrice, showViewButton, products, currencySymbol } = attributes;
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [availableProducts, setAvailableProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch dummy products data initially
    useEffect(() => {
        const fetchDummyProducts = async () => {
            const response = await fetch(cbspProductData.sampleProductsXML);
            const xmlData = await response.text();
            const parsedProducts = parseXML(xmlData);
            setAvailableProducts(parsedProducts);
            setAttributes({ products: parsedProducts }); // Set dummy products in attributes initially

            const wcCurrencySymbol = cbspProductData.currencySymbol;
            setAttributes({ currencySymbol: wcCurrencySymbol });

        };

        fetchDummyProducts();
    }, []);

    // Fetch all products from localized script (cbspProductData)
    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const response = await fetch(cbspProductData.apiUrl + 'products'); // Fetch all products
                const productData = await response.json();
                const allProducts = productData.map(product => ({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                }));
                setAvailableProducts(allProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchAllProducts();
    }, []);

    // Handle product selection through checkboxes
    const handleProductSelect = (product) => {
        const isSelected = selectedProducts.some(selected => selected.id === product.id);
        const updatedSelection = isSelected
            ? selectedProducts.filter(selected => selected.id !== product.id)
            : [...selectedProducts, product];

        setSelectedProducts(updatedSelection);
        setAttributes({ products: updatedSelection.length > 0 ? updatedSelection : availableProducts });
    };

    // Validation based on rows and columns
    useEffect(() => {
        const totalSlots = columns * rows;
        if (selectedProducts.length > totalSlots) {
            setSelectedProducts(selectedProducts.slice(0, totalSlots));
        }
    }, [columns, rows, selectedProducts]);

    // Filter products based on search term
    const filteredProducts = availableProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                        label={__('Show View Product Button', 'cbsp')}
                        checked={showViewButton}
                        onChange={(value) => setAttributes({ showViewButton: value })}
                    />
                </PanelBody>
                <PanelBody title={__('Product Filters', 'cbsp')}>
                    <p>{__('Select Products', 'cbsp')}</p>
                    {/* Add a search field */}
                    <TextControl
                        label={''}
                        value={searchTerm}
                        onChange={(value) => setSearchTerm(value)}
                        placeholder={__('Search by product name...', 'cbsp')}
                    />
                    <div
                        style={{
                            maxHeight: '200px', // Fixed height for scrolling
                            minWidth: '230px', // Minimum width for product listing
                            overflowY: 'scroll', // Enable vertical scrolling
                            border: '1px solid #ccc',
                            padding: '10px',
                        }}
                    >
                        {filteredProducts.map((product) => (
                            <CheckboxControl
                                key={product.id}
                                label={product.name}
                                checked={selectedProducts.some(selected => selected.id === product.id)}
                                onChange={() => handleProductSelect(product)}
                            />
                        ))}
                    </div>
                </PanelBody>
            </InspectorControls>

            <ProductLayout
                products={selectedProducts.length > 0 ? selectedProducts : products} // Use selected products or fallback to default products
                columns={columns}
                rows={rows}
                showImage={showImage}
                showTitle={showTitle}
                currencySymbol={currencySymbol}
                showPrice={showPrice}
                showViewButton={showViewButton}
            />
        </>
    );
};

export default Edit;
