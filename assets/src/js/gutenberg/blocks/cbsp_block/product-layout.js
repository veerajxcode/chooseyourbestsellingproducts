import { __ } from '@wordpress/i18n';

const ProductLayout = ({ products, columns, rows, showImage, showTitle, showPrice, showViewButton, isManualMode }) => {
    const isLoading = !products && !isManualMode; // No products and not manual mode
    let displayMessage = '';

    if (isLoading) {
        displayMessage = __('Loading Products...', 'cbsp');
    } else if (!products && isManualMode) { 
        // Manual mode and no products selected
        displayMessage = __('Select your products.', 'cbsp');
    } else if (products && products.length === 0 && !isManualMode) {
        displayMessage = __('There are no products available from last week. Would recommend you to add your products manually.', 'cbsp');
    }

    const productsToDisplay = products ? products.slice(0, Math.min(products.length, columns * rows)) : [];

    return (
        <div className="container cbsp-container">
            {displayMessage ? (
                <p>{displayMessage}</p>
            ) : (
                Array.from({ length: rows }).map((_, rowIndex) => (
                    <div className="row cbsp-grid-layout-row" key={rowIndex}>
                        {productsToDisplay.slice(rowIndex * columns, rowIndex * columns + columns).map((product, index) => (
                            <div key={index} className={`col-${Math.floor(12 / columns)}`}>
                                <div className="cbsp-product-column">
                                    {showImage && (
                                        <img
                                            className="cbsp-product-img"
                                            src={product.image}
                                            alt={product.name || __('Product Image', 'cbsp')}
                                        />
                                    )}
                                    {showTitle && <p className="cbsp-product-title">{product.name}</p>}
                                    {showPrice && (
                                            <p className='cbsp-price'>
                                                {product.product_type === 'on_sale' ? (
                                                    <>
                                                        <span className="cbsp-regular-price"><del>{product.regular_price}</del></span>
                                                        {' '}
                                                        <span className="cbsp-sale-price"><ins>{product.sale_price}</ins></span>
                                                    </>
                                                ) : product.product_type === 'variable' ? (
                                                    <span className="cbsp-variable-price">{product.price}</span>
                                                ) : (
                                                    <span className="cbsp-simple-price">{product.price}</span>
                                                )}
                                            </p>
                                        )}
                                    {showViewButton && (
                                        <a href={product.product_url}>
                                            <button className="btn btn-primary cbsp-btn">{__('View Product', 'cbsp')}</button>
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ))
            )}
        </div>
    );
};

export default ProductLayout;
