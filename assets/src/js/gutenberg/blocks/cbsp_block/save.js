import { __ } from '@wordpress/i18n';
import ProductLayout from './product-layout';

const Save = (props) => {
    const { attributes } = props;
    const { products, columns, rows, showImage, showTitle, showPrice, showViewButton,isAutomatic } = attributes;

    // Determine the message based on the mode and whether there are products
    let message = '';

    // Display appropriate messages based on the mode and product selection
    if (isAutomatic && products.length === 0) {
        message = __('No top selling products available from last week. Add your products manually.', 'cbsp');
    } else if (!isAutomatic && products.length === 0) {
        message = __('Select your top selling products manually.', 'cbsp');
    }

    return (
        <div>
            {message ? (
                <p>{message}</p> // Show message if products are not available
            ) : (
                <ProductLayout
                    products={products}
                    columns={columns}
                    rows={rows}
                    showImage={showImage}
                    showTitle={showTitle}
                    showPrice={showPrice}
                    showViewButton={showViewButton}
                    isManualMode={!isAutomatic} // Pass manual mode flag
                />
            )}
        </div>
    );
};

export default Save;
