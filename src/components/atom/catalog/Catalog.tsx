import { Container, Section } from '@styles/styles';
import Title from '@common/Title';
import ProductList from '@atom/product/ProductList';
import { Post } from '@redux/slices/postSlice';

type CatalogProps = {
    catalogTitle: string;
    products: Post[];
};

const Catalog: React.FC<CatalogProps> = ({ catalogTitle, products }) => {
    return (
        <Section>
            <Container>
                <div className="categories-content">
                    <Title titleText={catalogTitle} />
                    <ProductList products={products} />
                </div>
            </Container>
        </Section>
    );
};

export default Catalog;
