import * as React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Grid } from "@mui/material";
import styled from "styled-components";
import { useAppSelector } from "@redux/hook";
import { currencyFormat } from "@ultils/helper"; // Giả sử bạn đã có hàm này để định dạng tiền tệ
import { Post } from "@redux/slices/postSlice";
import { breakpoints, defaultTheme } from "@styles/themes/default";
import { commonCardStyles } from "@styles/card";

const ProductDetailWrapper = styled(Box)`
  padding: 20px;
`;

const ProductTitle = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
`;
const ProductCardWrapper = styled.div`
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
const ProductListWrapper = styled.div`
  column-gap: 20px;
  row-gap: 40px;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));

  @media (max-width: ${breakpoints.sm}) {
    gap: 12px;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;
const PostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const listPost = useAppSelector((state) => state.postShop.listPostByShop);
  const post = listPost.find((item) => item.id === Number(postId));

  return (
    <ProductDetailWrapper>
      <Typography variant="h4" gutterBottom>
        Thông tin sản phẩm
      </Typography>
      {post && post.products && post.products.length > 0 ? (
        <ProductListWrapper className="grid">
          {post.products.map((product) => (
            <ProductCardWrapper key={product.product_id}>
              <div className="product-img">
                <img className="object-fit-cover" src={product.image} alt="Ảnh sản phẩm" />
              </div>
              <div className="product-info">
                <ProductTitle className="font-normal">{product.product_name}</ProductTitle>
                <div className="flex items-center justify-between text-sm font-medium">
                  <span className="text-gray-400">{product.category_name}</span>
                  <span className="text-outerspace font-bold text-red-400">{currencyFormat(product.price)}</span>
                </div>
              </div>
            </ProductCardWrapper>
          ))}
        </ProductListWrapper>
      ) : (
        <Typography variant="body1">Không có sản phẩm nào.</Typography>
      )}
    </ProductDetailWrapper>
  );
};

export default PostDetail;
