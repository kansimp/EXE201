import { newProducts } from '@components/pages/Home/Home';
import { Section } from '@styles/styles';
import Title from '@common/Title';
import ProductList from './ProductList';

const ProductSimilar = () => {
    return (
        <Section>
            <Title titleText={'Similar Products'} />
            <ProductList products={newProducts.slice(0, 4)} />
        </Section>
    );
};

export default ProductSimilar;
