import { __ } from '@wordpress/i18n';
import ProductLayout from './product-layout';

const Save = (props) => {
    const { attributes } = props;
    const { products, columns, rows, showImage, showTitle, showPrice, showViewButton, mode } = attributes;

    // Check if there are no products and if the mode is 'tslw'
    const isLoading = !products || products.length === 0;
    const isTSLW = mode === 'tslw'; // Assuming 'mode' attribute is passed to determine Top Selling Last Week

    return (
        <div className="container cbsp-container">
            {isLoading ? (
                <p>{__('Loading products...', 'cbsp')}</p>
            ) : isTSLW && products.length === 0 ? (
                <p>{__('There are no best selling products available from last week. Would recommend you to include products manually.', 'cbsp')}</p>
            ) : (
                <ProductLayout
                    products={products}
                    columns={columns}
                    rows={rows}
                    showImage={showImage}
                    showTitle={showTitle}
                    showPrice={showPrice}
                    showViewButton={showViewButton}
                />
            )}
        </div>
    );
};

export default Save;
