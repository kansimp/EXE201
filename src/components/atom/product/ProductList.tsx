import styled from 'styled-components';
import ProductItem from './ProductItem';
import { breakpoints } from '@styles/themes/default';

// Định nghĩa kiểu dữ liệu cho sản phẩm
interface Product {
    id: string;
    title: string;
    brand: string;
    price: number;
    imgSource: string;
}

interface ProductListProps {
    products: Product[];
}

const ProductListWrapper = styled.div`
    column-gap: 20px;
    row-gap: 40px;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));

    @media (max-width: ${breakpoints.sm}) {
        gap: 12px;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
`;

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    return (
        <ProductListWrapper className="grid">
            {products?.map((product) => {
                return <ProductItem key={product.id} product={product} />;
            })}
        </ProductListWrapper>
    );
};

export default ProductList;
