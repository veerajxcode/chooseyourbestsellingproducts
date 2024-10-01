import { __ } from '@wordpress/i18n';
import ProductLayout from './product-layout';

const Save = (props) => {
    const { attributes } = props;
    const { products, columns, rows, showImage, showTitle, showPrice, showViewButton } = attributes;

    return (
        <ProductLayout
            products={products}
            columns={columns}
            rows={rows}
            showImage={showImage}
            showTitle={showTitle}
            showPrice={showPrice}
            showViewButton={showViewButton}
        />
    );
};

export default Save;
