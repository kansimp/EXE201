import { Container, Section } from '@styles/styles';
import Title from '@common/Title';
import ProductList from '@atom/product/ProductList';

// Định nghĩa kiểu dữ liệu cho props
interface CatalogProps {
    catalogTitle: string;
    products: Array<{
        id: string;
        title: string;
        brand: string;
        price: number;
        imgSource: string;
    }>;
}

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
