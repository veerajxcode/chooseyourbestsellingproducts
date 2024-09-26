import { __ } from '@wordpress/i18n';

const ProductLayout = ({currencySymbol, products, columns, rows, showImage, showTitle, showPrice, showViewButton }) => {
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
                                        src={product.image}
                                        alt={product.name || __('Product Image', 'cbsp')}
                                    />
                                )}
                                <div className="cbsp-product-body">
                                    {showTitle && <h5 className='cbsp-title'>{product.name || __('No Title', 'cbsp')}</h5>}
                                    {(currencySymbol || showPrice) && (
                                        <p className='cbsp-price'>
                                            {currencySymbol && <span className='cbsp-currency-symbol'>{currencySymbol}</span>}
                                            {showPrice && <span className='cbsp-price'>{product.price || __('Price not available', 'cbsp')}</span>}
                                        </p>
                                    )}
                                    {/*showPrice && <p className='cbsp-price'>{product.price || __('Price not available', 'cbsp')}</p>*/}
                                    {showViewButton && <a href="#"><button className="btn btn-primary cbsp-btn">{__('View Product', 'cbsp')}</button></a>}
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
