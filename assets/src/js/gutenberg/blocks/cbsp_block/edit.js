import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl, CheckboxControl, TextControl, Modal, Button } from '@wordpress/components';
import ProductLayout from './product-layout';

const Edit = (props) => {
    const { attributes, setAttributes } = props;
    const { columns, rows, showImage, showTitle, showPrice, showViewButton, products, isAutomatic } = attributes;
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [availableProducts, setAvailableProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

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
            }));

            setAvailableProducts(parsedProducts);
            if (isAutomatic) {
                setAttributes({ products: parsedProducts }); // Automatically set products if TSLW
            }
        };

        fetchProducts();
    }, [isAutomatic]);

    // Handle product selection through checkboxes (only when manual mode is active)
    const handleProductSelect = async (product) => {
        const isSelected = selectedProducts.some(selected => selected.id === product.id);
        let updatedSelection;

        if (isSelected) {
            updatedSelection = selectedProducts.filter(selected => selected.id !== product.id);
        } else {
            const response = await fetch(cbspProductData.apiUrl + `products/?mode=manual&selectedIds[]=${product.id}`, {
                method: 'GET',
                headers: { 'X-WP-Nonce': cbspProductData.nonce },
            });

            const productDetails = await response.json();
            if (productDetails && productDetails.length > 0) {
                const selectedProduct = {
                    id: productDetails[0].id,
                    name: productDetails[0].name,
                    price: productDetails[0].price,
                    regular_price: productDetails[0].regular_price,
                    sale_price: productDetails[0].sale_price,
                    product_type: productDetails[0].product_type,
                    image: productDetails[0].image,
                    product_url: productDetails[0].product_url
                };
    
                updatedSelection = [...selectedProducts, selectedProduct];
            }
        }

        setSelectedProducts(updatedSelection);
        setAttributes({ products: updatedSelection.length > 0 ? updatedSelection : [] });
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

    // Toggle the automatic/manual mode with confirmation dialog (only if manual products are selected)
    const handleModeSwitch = (value) => {
        if (!isAutomatic && value && selectedProducts.length > 0) {
            setShowConfirmationModal(true);
        } else {
            setAttributes({ isAutomatic: value });
        }
    };

    const handleModalConfirm = () => {
        setAttributes({ isAutomatic: true, products: [] });
        setSelectedProducts([]);
        setShowConfirmationModal(false);
    };

    const handleModalCancel = () => {
        setShowConfirmationModal(false);
    };

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
                <PanelBody title={__('Mode', 'cbsp')}>
                    <ToggleControl
                        label={__('Load Top Selling Products Automatically', 'cbsp')}
                        checked={isAutomatic}
                        onChange={handleModeSwitch}
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
                columns={columns}
                rows={rows}
                products={(!isAutomatic && selectedProducts.length === 0) ? null : selectedProducts.length > 0 ? selectedProducts : products} // Conditional rendering
                showImage={showImage}
                showTitle={showTitle}
                showPrice={showPrice}
                showViewButton={showViewButton}
                isManualMode={!isAutomatic} // Pass manual mode flag to layout
            />

            {showConfirmationModal && (
                <Modal
                    title={__('Switching to Automatic Mode', 'cbsp')}
                    onRequestClose={handleModalCancel}
                >
                    <p>{__('Switching modes will remove your manually selected products. Are you sure?', 'cbsp')}</p>
                    <Button isSecondary onClick={handleModalCancel}>
                        {__('Cancel', 'cbsp')}
                    </Button>
                    <Button isPrimary onClick={handleModalConfirm}>
                        {__('OK', 'cbsp')}
                    </Button>
                </Modal>
            )}
        </>
    );
};

export default Edit;
