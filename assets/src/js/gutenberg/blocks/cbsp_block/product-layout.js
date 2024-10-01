import { __ } from '@wordpress/i18n';

const ProductLayout = ({ products, columns, rows, showImage, showTitle, showPrice, showViewButton }) => {
    // Check if products are being fetched or if there are no products
    const isLoading = !products || products.length === 0;

    // Message handling for different states
    let displayMessage = '';

    if (isLoading) {
        displayMessage = __('Loading Products...', 'cbsp');
    } else if (products.length === 0) {
        displayMessage = __('There are no products data available from last week. Would recommend you to add your products manually.', 'cbsp');
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
                                    <div className="cbsp-product-body">
                                        {showTitle && <h5 className="cbsp-title">{product.name || __('No Title', 'cbsp')}</h5>}
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
                            </div>
                        ))}
                    </div>
                ))
            )}
        </div>
    );
};

export default ProductLayout;
