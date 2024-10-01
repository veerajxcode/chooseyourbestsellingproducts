import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl, CheckboxControl, TextControl } from '@wordpress/components';
import ProductLayout from './product-layout';

const Edit = (props) => {
    const { attributes, setAttributes } = props;
    const { columns, rows, showImage, showTitle, showPrice, showViewButton, products, isAutomatic } = attributes;
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [availableProducts, setAvailableProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch products based on the mode (TSLW or manual)
    useEffect(() => {
        const fetchProducts = async () => {
            let mode = isAutomatic ? 'tslw' : 'manual'; // Conditional mode
            const response = await fetch(cbspProductData.apiUrl + `products/?mode=${mode}`, {
                method: 'GET',
                headers: { 'X-WP-Nonce': cbspProductData.nonce },
            });

            const productData = await response.json();
            const parsedProducts = productData.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price,
                regular_price: product.regular_price,
                sale_price: product.sale_price,
                product_type: product.product_type,
                image: product.image,
                product_url: product.product_url,
            }));

            setAvailableProducts(parsedProducts);
            if (isAutomatic) {
                setAttributes({ products: parsedProducts }); // Automatically set products if TSLW
            }
        };

        fetchProducts();
    }, [isAutomatic]);

    // Handle product selection through checkboxes (only when manual mode is active)
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
                    <ToggleControl
                        label={__('Load Top Selling Products Automatically', 'cbsp')}
                        checked={isAutomatic}
                        onChange={(value) => setAttributes({ isAutomatic: value })}
                    />
                    {!isAutomatic && (
                        <>
                            <TextControl
                                value={searchTerm}
                                onChange={(value) => setSearchTerm(value)}
                                placeholder={__('Search by product name...', 'cbsp')}
                            />
                            <div style={{ maxHeight: '200px', minWidth: '230px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
                                {filteredProducts.map((product) => (
                                    <CheckboxControl
                                        key={product.id}
                                        label={product.name}
                                        checked={selectedProducts.some(selected => selected.id === product.id)}
                                        onChange={() => handleProductSelect(product)}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </PanelBody>
            </InspectorControls>

            <ProductLayout
                products={selectedProducts.length > 0 ? selectedProducts : products} // Use selected products or fallback to default products
                columns={columns}
                rows={rows}
                showImage={showImage}
                showTitle={showTitle}
                showPrice={showPrice}
                showViewButton={showViewButton}
            />
        </>
    );
};

export default Edit;
