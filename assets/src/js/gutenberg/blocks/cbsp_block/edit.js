import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl, CheckboxControl, TextControl, Modal, Button } from '@wordpress/components';
import ProductLayout from './product-layout';

const Edit = (props) => {
    const { attributes, setAttributes } = props;
    const { columns, rows, showImage, showTitle, showPrice, showViewButton, products, isAutomatic } = attributes;
    const [selectedProducts, setSelectedProducts] = useState([]); // Initialize from attributes.products
    const [availableProducts, setAvailableProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [noDataFound, setNoDataFound] = useState(false); // No data found state

    // Fetch products based on the mode (TSLW or manual)
    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true); // Start loading
            let mode = isAutomatic ? 'tslw' : 'manual'; // Conditional mode
            const response = await fetch(cbspProductData.apiUrl + `products/?mode=${mode}`, {
                method: 'GET',
                headers: { 'X-WP-Nonce': cbspProductData.nonce },
            });

            // Check if the response status is 204 (No Content)
            if (response.status === 204) {
                setNoDataFound(true); // Set no data found state
                setIsLoading(false);
                return;
            }else {
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
            }
            setIsLoading(false); // Stop loading once data is fetched
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
        setAttributes({ products: updatedSelection.length > 0 ? updatedSelection : [] }); // Set empty array if no products selected
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
        if(isAutomatic && !value && availableProducts.length > 0){
            setAttributes({ isAutomatic: value, products: [] });
            
        }else if (!isAutomatic && value && selectedProducts.length > 0) {
            // Show modal only if manual products are selected
            setShowConfirmationModal(true);
        } else if(!isAutomatic && value && selectedProducts.length === 0 ){
                setAttributes({ isAutomatic: value }); // Switch to automatic and clear selected products
                setAvailableProducts([]); // Clear available products
                setNoDataFound(false); //Set NoDataFound as false
                setSearchTerm(''); //Set Search as empty string
        } else {
            // Directly switch to automatic mode without showing the modal
            setAttributes({ isAutomatic: value });
        }
    };

    const handleModalConfirm = () => {
        setAttributes({ isAutomatic: true, products: [] }); // Switch to automatic and clear selected products
        setSelectedProducts([]); // Clear selected products
        setAvailableProducts([]); // Clear available products
        setNoDataFound(false); //Set NoDataFound as false
        setShowConfirmationModal(false); // Close the modal
        setSearchTerm(''); //Set Search as empty string
    };

    const handleModalCancel = () => {
        setShowConfirmationModal(false); // Simply close the modal
    };

    return (
        <>  
            {isAutomatic && isLoading && <p>{__('Loading top selling products from last week...', 'cbsp')}</p>}
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
                        label={__('Top Selling Products (Last Week)', 'cbsp')}
                        checked={isAutomatic}
                        onChange={handleModeSwitch} // Call the mode switch function
                    />
                    {!isAutomatic && (
                        <>
                            <TextControl
                                value={searchTerm}
                                onChange={(value) => setSearchTerm(value)}
                                placeholder={__('Search by product name...', 'cbsp')}
                            />
                            {/* Display loading message while fetching products */}
                            {isLoading ? (
                                <p style={{color:'#007CBA'}}>{__('Loading products...', 'cbsp')}</p>
                            ) : (
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
                            )}
                        </>
                    )}
                </PanelBody>
            </InspectorControls>

            <ProductLayout
                products={isAutomatic ? availableProducts : selectedProducts} // Updated to handle both cases
                columns={columns}
                rows={rows}
                showImage={showImage}
                showTitle={showTitle}
                showPrice={showPrice}
                showViewButton={showViewButton}
                isManualMode={!isAutomatic} // Pass manual mode flag to layout
                noDataFound={noDataFound} // Pass no data found flag to layout
            />

            {showConfirmationModal && (
                <Modal
                    title={__('Confirm', 'cbsp')}
                    onRequestClose={handleModalCancel}
                >
                    <p>{__('Switching back to Top Selling Products (last week). Your selected products will be cleared.', 'cbsp')}</p>
                    <Button variant="primary" onClick={handleModalConfirm} style={{ margin: '0 10px 0 0' }}>
                        {__('OK', 'cbsp')}
                    </Button>
                    <Button variant="secondary" onClick={handleModalCancel}>
                        {__('Cancel', 'cbsp')}
                    </Button>
                </Modal>
            )}
        </>
    );
};

export default Edit;
