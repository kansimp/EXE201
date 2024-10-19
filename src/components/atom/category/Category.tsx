import styled from 'styled-components';
import { Container, Section } from '@styles/styles';
import Title from '@common/Title';
import Slider from 'react-slick';
import CustomNextArrow from '@common/CustomNextArrow';
import CustomPrevArrow from '@common/CustomPrevArrow';
import { newArrivalData } from './data';
import { commonCardStyles } from '@styles/card';
import { breakpoints } from '@styles/themes/default';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@redux/hook';
import { getAllCategory } from '@redux/slices/categorySlice';
import { changeSearchValue } from '@redux/slices/searchSlice';
import { useNavigate } from 'react-router-dom';

const ProductCardBoxWrapper = styled.div`
    ${commonCardStyles}
    .product-img {
        height: 262px;
        width: 262px;
    }

    @media (max-width: ${breakpoints.sm}) {
        padding-left: 6px;
        padding-right: 6px;
    }
`;

const ArrivalSliderWrapper = styled.div`
    .custom-prev-arrow {
        top: 43%;
        left: -18px;
        @media (max-width: ${breakpoints.xxl}) {
            left: 24px;
        }

        @media (max-width: ${breakpoints.xs}) {
            left: 4px;
        }
    }

    .custom-next-arrow {
        top: 43%;
        right: -18px;
        @media (max-width: ${breakpoints.xxl}) {
            right: 24px;
        }

        @media (max-width: ${breakpoints.xs}) {
            right: 4px;
        }
    }
`;

const Category: React.FC = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        centerMode: true,
        variableWidth: true,
    };
    const dispatch = useAppDispatch();
    const listCategory = useAppSelector((state) => state.category.categories);
    useEffect(() => {
        dispatch(getAllCategory());
    }, []);
    const navigate = useNavigate();
    return (
        <Section>
            <Container>
                <Title titleText={'Các Loại Mặt Hàng'} />
                <ArrivalSliderWrapper>
                    <Slider nextArrow={<CustomNextArrow />} prevArrow={<CustomPrevArrow />} {...settings}>
                        {listCategory?.map((newArrival) => {
                            return (
                                <ProductCardBoxWrapper
                                    key={newArrival.category_id}
                                    onClick={() => {
                                        dispatch(changeSearchValue(newArrival.name));
                                        navigate(`/search?keyword=${newArrival.name}`);
                                    }}
                                >
                                    <div className="product-img">
                                        <img
                                            className="object-fit-cover"
                                            src={newArrival.image}
                                            alt={newArrival.name} // Thêm thuộc tính alt cho hình ảnh
                                        />
                                    </div>
                                    <div className="product-info">
                                        <p className="font-semibold text-xl">{newArrival.name}</p>
                                    </div>
                                </ProductCardBoxWrapper>
                            );
                        })}
                    </Slider>
                </ArrivalSliderWrapper>
            </Container>
        </Section>
    );
};

export default Category;
