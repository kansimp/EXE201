import styled from "styled-components";
import ProductItem from "./ProductShopItem";
import { breakpoints } from "@styles/themes/default";
import { Post } from "@redux/slices/postSlice";
import ProductShopItem from "./ProductShopItem";

interface ProductListProps {
  products: Post[];
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

const ProductShopListPage: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div>
      <ProductListWrapper className="grid">
        {products?.map((product) => {
          return <ProductShopItem key={product.id} post={product} />;
        })}
      </ProductListWrapper>
    </div>
  );
};

export default ProductShopListPage;
