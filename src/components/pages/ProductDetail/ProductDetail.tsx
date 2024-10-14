import styled from 'styled-components';
import { Container } from '@styles/styles';
import Breadcrumb from '@common/Breadcrumb';
import { product_one } from './data';
import ProductPreview from '@atom/product/ProductPreview';
import { Link, useParams } from 'react-router-dom';
import { BaseLinkGreen } from '@styles/button';
import { currencyFormat } from '../../utils/helper';
import { breakpoints, defaultTheme } from '@styles/themes/default';
import ProductDescriptionTab from '@atom/product/ProductDescriptionTab';
import ProductSimilar from '@atom/product/ProductSimilar';
import ProductServices from '@atom/product/ProductServices';
import { useAppDispatch, useAppSelector } from '@redux/hook';
import { addItem } from '@redux/slices/cartSlice';
import { useEffect } from 'react';
import { getPostDetail } from '@redux/slices/postdetailSlice';

const DetailsScreenWrapper = styled.main`
    margin: 40px 0;
`;

const DetailsContent = styled.div`
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;

    @media (max-width: ${breakpoints.xl}) {
        gap: 24px;
        grid-template-columns: 3fr 2fr;
    }

    @media (max-width: ${breakpoints.lg}) {
        grid-template-columns: 100%;
    }
`;

const ProductDetailsWrapper = styled.div`
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 24px;

    @media (max-width: ${breakpoints.sm}) {
        padding: 16px;
    }

    @media (max-width: ${breakpoints.xs}) {
        padding: 12px;
    }

    .prod-title {
        margin-bottom: 10px;
    }
    .rating-and-comments {
        column-gap: 16px;
        margin-bottom: 20px;
    }
    .prod-rating {
        column-gap: 10px;
    }
    .prod-comments {
        column-gap: 10px;
    }
    .prod-add-btn {
        min-width: 160px;
        column-gap: 8px;
        &-text {
            margin-top: 2px;
        }
    }

    .btn-and-price {
        margin-top: 36px;
        column-gap: 16px;
        row-gap: 10px;

        @media (max-width: ${breakpoints.sm}) {
            margin-top: 24px;
        }
    }
`;

const ProductSizeWrapper = styled.div`
    .prod-size-top {
        gap: 20px;
    }
    .prod-size-list {
        gap: 12px;
        margin-top: 16px;
        @media (max-width: ${breakpoints.sm}) {
            gap: 8px;
        }
    }

    .prod-size-item {
        position: relative;
        height: 38px;
        width: 38px;
        cursor: pointer;

        @media (max-width: ${breakpoints.sm}) {
            width: 32px;
            height: 32px;
        }

        input {
            position: absolute;
            top: 0;
            left: 0;
            width: 38px;
            height: 38px;
            opacity: 0;
            cursor: pointer;

            @media (max-width: ${breakpoints.sm}) {
                width: 32px;
                height: 32px;
            }

            &:checked + span {
                color: ${defaultTheme.color_white};
                background-color: ${defaultTheme.color_outerspace};
                border-color: ${defaultTheme.color_outerspace};
            }
        }

        span {
            width: 38px;
            height: 38px;
            border-radius: 8px;
            border: 1.5px solid ${defaultTheme.color_silver};
            text-transform: uppercase;

            @media (max-width: ${breakpoints.sm}) {
                width: 32px;
                height: 32px;
            }
        }
    }
`;

const ProductColorWrapper = styled.div`
    margin-top: 32px;

    @media (max-width: ${breakpoints.sm}) {
        margin-top: 24px;
    }

    .prod-colors-top {
        margin-bottom: 16px;
    }

    .prod-colors-list {
        column-gap: 12px;
    }

    .prod-colors-item {
        position: relative;
        width: 22px;
        height: 22px;
        transition: ${defaultTheme.default_transition};

        &:hover {
            scale: 0.9;
        }

        input {
            position: absolute;
            top: 0;
            left: 0;
            width: 22px;
            height: 22px;
            opacity: 0;
            cursor: pointer;

            &:checked + span {
                outline: 1px solid ${defaultTheme.color_gray};
                outline-offset: 3px;
            }
        }

        .prod-colorbox {
            border-radius: 100%;
            width: 22px;
            height: 22px;
            display: inline-block;
        }
    }
`;

const ProductDetailsScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const postDetail = useAppSelector((state) => state.postDetail.postDetail);
    const productDetail = useAppSelector((state) => state.postDetail.productDetail);
    const items = useAppSelector((state) => state.cart.items);
    const { id } = useParams();
    const numericId = Number(id);
    useEffect(() => {
        dispatch(getPostDetail(numericId));
    }, []);

    const stars = Array.from({ length: 5 }, (_, index) => (
        <span
            key={index}
            className={`text-yellow ${
                index < Math.floor(product_one.rating)
                    ? 'bi bi-star-fill'
                    : index + 0.5 === product_one.rating
                    ? 'bi bi-star-half'
                    : 'bi bi-star'
            }`}
        ></span>
    ));

    const breadcrumbItems = [
        { label: 'Trang chủ', link: '/' },
        { label: `${postDetail?.products[0].category_name}`, link: '' },
    ];

    return (
        <DetailsScreenWrapper>
            <Container>
                <Breadcrumb items={breadcrumbItems} />
                <DetailsContent className="grid">
                    {postDetail ? <ProductPreview post={postDetail} id={numericId} /> : <>Loading ...</>}
                    {productDetail ? (
                        <ProductDetailsWrapper>
                            <h2 className="prod-title font-bold text-2xl">{productDetail?.product_name}</h2>
                            <div className="flex items-center rating-and-comments flex-wrap">
                                <div className="prod-rating flex items-center text-yellow-400">
                                    {stars}
                                    {/* <span className="text-gray-700 text-xs"></span> */}
                                </div>
                                <div className="prod-comments flex items-start">
                                    <span className="prod-comment-icon text-gray-700">
                                        <i className="bi bi-chat-left-text"></i>
                                    </span>
                                    <span className="prod-comment-text text-sm text-gray-700">{10} comment(s)</span>
                                </div>
                            </div>

                            <ProductSizeWrapper>
                                <div className="prod-size-top flex items-center flex-wrap">
                                    <p className="text-sm font-semibold text-outerspace">
                                        Tên Cửa Hàng: {productDetail?.shop_name}
                                    </p>
                                    <Link to="/" className="text-sm text-gray-700 font-thin">
                                        Ghé Thăm Cửa Hàng &nbsp; <i className="bi bi-arrow-right"></i>
                                    </Link>
                                    <p className="text-sm font-semibold text-outerspace">
                                        Mô Tả: {productDetail?.description}
                                    </p>
                                </div>
                            </ProductSizeWrapper>
                            <ProductColorWrapper>
                                <div className="prod-colors-top flex items-center flex-wrap">
                                    <p className="text-lg font-semibold text-outerspace">Chọn Màu: </p>
                                </div>
                                <div className="prod-colors-list flex items-center">
                                    {product_one?.colors?.map((color, index) => (
                                        <div className="prod-colors-item" key={index}>
                                            <input type="radio" name="colors" />
                                            <span className="prod-colorbox" style={{ background: `${color}` }}></span>
                                        </div>
                                    ))}
                                </div>
                            </ProductColorWrapper>
                            <div className="btn-and-price flex items-center flex-wrap">
                                <BaseLinkGreen
                                    as={BaseLinkGreen}
                                    className="prod-add-btn"
                                    onClick={() => {
                                        dispatch(addItem({ id: product_one.id }));
                                    }}
                                >
                                    <span className="prod-add-btn-icon">
                                        <i className="bi bi-cart2"></i>
                                    </span>
                                    <span className="prod-add-btn-text">Thêm vào giỏ hàng</span>
                                </BaseLinkGreen>
                                <span className="prod-price text-xl font-bold text-outerspace text-red-500">
                                    ₫{productDetail?.price}
                                </span>
                            </div>
                            <ProductServices />
                        </ProductDetailsWrapper>
                    ) : (
                        <>Loading ...</>
                    )}
                </DetailsContent>
                <ProductDescriptionTab post={postDetail} />
                <ProductSimilar />
            </Container>
        </DetailsScreenWrapper>
    );
};

export default ProductDetailsScreen;
