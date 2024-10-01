import { __ } from '@wordpress/i18n';
import ProductLayout from './product-layout';

const Save = (props) => {
    const { attributes } = props;
    const { products, columns, rows, showImage, showTitle, showPrice, showViewButton, isAutomatic } = attributes;

    // Determine the message based on the mode and whether there are products
    let message = '';
    if (isAutomatic && products.length === 0) {
        message = __('No weekly products available. Would recommend you to include products manually.', 'cbsp');
    } else if (!isAutomatic && products.length === 0) {
        message = __('Please select your products manually.', 'cbsp');
    }

    return (
        <ProductLayout
            products={products}
            columns={columns}
            rows={rows}
            showImage={showImage}
            showTitle={showTitle}
            showPrice={showPrice}
            showViewButton={showViewButton}
            message={message}
        />
    );
};

export default Save;
