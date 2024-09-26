import { __ } from '@wordpress/i18n';

const ProductLayout = ({ products, columns, rows, showImage, showTitle, showPrice, showViewButton }) => {
    // Check if products are being fetched
    const isLoading = !products || products.length === 0;

    const productsToDisplay = products ? products.slice(0, Math.min(products.length, columns * rows)) : [];

    return (
        <div className="container cbsp-container">
            {isLoading ? (
                <p>{__('Loading products...', 'cbsp')}</p>
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
                                        {showTitle && <h5 className='cbsp-title'>{product.name || __('No Title', 'cbsp')}</h5>}
                                        {showPrice && <p className='cbsp-price'>{product.price || __('Price not available', 'cbsp')}</p>}
                                        {showViewButton && <a href={product.product_url} ><button className="btn btn-primary cbsp-btn">{__('View Product', 'cbsp')}</button></a>}
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
