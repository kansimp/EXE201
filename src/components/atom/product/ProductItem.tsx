<<<<<<< HEAD
import { Link } from "react-router-dom";
import styled from "styled-components";
import { commonCardStyles } from "@styles/card";
import { breakpoints, defaultTheme } from "@styles/themes/default";
import { Post } from "@redux/slices/postSlice";
import { useDispatch } from "react-redux";
import { addItemWishList } from "@redux/slices/wishlistSlice";
=======
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { commonCardStyles } from '@styles/card';
import { breakpoints, defaultTheme } from '@styles/themes/default';
import { Post } from '@redux/slices/postSlice';
import { currencyFormat } from '@ultils/helper';
>>>>>>> 46d3505ba39e89264696232aac6abd134fbc6777

interface ProductItemProps {
  post: Post;
}
const ProductTitle = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
`;

const ProductCardWrapper = styled(Link)`
  ${commonCardStyles}
  @media(max-width: ${breakpoints.sm}) {
    padding-left: 0;
    padding-right: 0;
  }

  .product-img {
    height: 270px;
    position: relative;

    @media (max-width: ${breakpoints.sm}) {
      height: 320px;
    }
  }

  .product-wishlist-icon {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 32px;
    height: 32px;
    border-radius: 100%;

    &:hover {
      background-color: ${defaultTheme.color_yellow};
      color: ${defaultTheme.color_white};
    }
  }
`;

const ProductItem: React.FC<ProductItemProps> = ({ post }) => {
  const prices = post.products.map((product) => product.price);

<<<<<<< HEAD
  const highestPrice = Math.max(...prices);
  const lowestPrice = Math.min(...prices);
  const dispatch = useDispatch();
  return (
    <ProductCardWrapper key={post.id} to={`/product/${post.id}`}>
      <div className="product-img">
        <img className="object-fit-cover" src={post.products[0].image} alt="Ảnh sản phẩm" />
        <button
          type="button"
          className="product-wishlist-icon flex items-center justify-center bg-white"
          onClick={(e) => {
            e.preventDefault(); // Ngăn điều hướng của thẻ cha khi bấm nút
            e.stopPropagation(); // Ngăn sự kiện click lan truyền lên cha
            dispatch(addItemWishList(post));
          }}
        >
          <i className="bi bi-heart"></i>
        </button>
      </div>
      <div className="product-info">
        <ProductTitle className="font-normal">{post.title}</ProductTitle>
        <div className="flex items-center justify-between text-sm font-medium">
          <span className="text-gray-400">{post.products[0].shop_name}</span>
          <span className="text-outerspace font-bold text-red-400">
            ₫{lowestPrice} - ₫{highestPrice}
          </span>
        </div>
      </div>
    </ProductCardWrapper>
  );
=======
    const highestPrice = Math.max(...prices);
    const lowestPrice = Math.min(...prices);
    return (
        <ProductCardWrapper key={post.id} to={`/product/${post.id}`}>
            <div className="product-img">
                <img className="object-fit-cover" src={post.products[0].image} alt="Ảnh sản phẩm" />
                <button type="button" className="product-wishlist-icon flex items-center justify-center bg-white">
                    <i className="bi bi-heart"></i>
                </button>
            </div>
            <div className="product-info">
                <ProductTitle className="font-normal">{post.title}</ProductTitle>
                <div className="flex items-center justify-between text-sm font-medium">
                    <span className="text-gray-400">{post.products[0].shop_name}</span>
                    <span className="text-outerspace font-bold text-red-400">
                        {currencyFormat(lowestPrice)}-{currencyFormat(highestPrice)}
                    </span>
                </div>
            </div>
        </ProductCardWrapper>
    );
>>>>>>> 46d3505ba39e89264696232aac6abd134fbc6777
};

export default ProductItem;
