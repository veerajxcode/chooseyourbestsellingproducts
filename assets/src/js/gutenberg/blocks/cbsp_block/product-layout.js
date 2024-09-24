import { __ } from '@wordpress/i18n';

const ProductLayout = ({ products, columns, rows, showImage, showTitle, showPrice, showRating, showCartButton }) => {
    const productsToDisplay = products.slice(0, Math.min(products.length, columns * rows));

    return (
        <div className="container cbsp-container">
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <div className="row cbsp-grid-layout-row" key={rowIndex}>
                    {productsToDisplay.slice(rowIndex * columns, rowIndex * columns + columns).map((product, index) => (
                        <div key={index} className={`col-${Math.floor(12 / columns)}`}>
                            <div className="cbsp-product-column">
                                {showImage && (
                                    <img
                                        className="cbsp-product-img"
                                        src={product.image || '/path/to/fallback-image.jpg'}
                                        alt={product.name || __('Product Image', 'cbsp')}
                                    />
                                )}
                                <div className="cbsp-product-body">
                                    {showTitle && <h5>{product.name || __('No Title', 'cbsp')}</h5>}
                                    {showPrice && <p>{product.price || __('Price not available', 'cbsp')}</p>}
                                    {showRating && <p>{__('Rating Placeholder', 'cbsp')}</p>}
                                    {showCartButton && <button className="btn btn-primary">{__('Add to Cart', 'cbsp')}</button>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ProductLayout;
