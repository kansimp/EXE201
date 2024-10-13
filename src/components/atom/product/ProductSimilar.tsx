import { newProducts } from '@components/pages/Home/Home';
import { Section } from '@styles/styles';
import Title from '@common/Title';
import ProductList from './ProductList';

const ProductSimilar = () => {
    return (
        <Section>
            <Title titleText={'Các Sản Phẩm Liên Quan'} />
            {/* <ProductList products={newProducts.slice(0, 4)} /> */}
        </Section>
    );
};

export default ProductSimilar;
