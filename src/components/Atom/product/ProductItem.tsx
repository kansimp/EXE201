import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { commonCardStyles } from '@styles/card';
import { breakpoints, defaultTheme } from '@styles/themes/default';

// Định nghĩa kiểu dữ liệu cho sản phẩm
interface Product {
    id: string;
    title: string;
    brand: string;
    price: number;
    imgSource: string;
}

interface ProductItemProps {
    product: Product;
}

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

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
    return (
        <ProductCardWrapper key={product.id} to="/product/details">
            <div className="product-img">
                <img className="object-fit-cover" src={product.imgSource} alt={product.title} />
                <button type="button" className="product-wishlist-icon flex items-center justify-center bg-white">
                    <i className="bi bi-heart"></i>
                </button>
            </div>
            <div className="product-info">
                <p className="font-normal">{product.title}</p>
                <div className="flex items-center justify-between text-sm font-medium">
                    <span className="text-gray-400">{product.brand}</span>
                    <span className="text-outerspace font-bold text-red-400">₫{product.price}</span>
                </div>
            </div>
        </ProductCardWrapper>
    );
};

export default ProductItem;
