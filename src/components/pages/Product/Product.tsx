import styled from 'styled-components';
import { Container, ContentStylings, Section } from '@styles/styles';
import Breadcrumb from '@common/Breadcrumb';
import { Link } from 'react-router-dom';
import ProductList from '@atom/product/ProductList';
import { newProducts } from '@pages/Home/Home';
import Title from '@common/Title';
import { breakpoints, defaultTheme } from '@styles/themes/default';
import ProductFilter from '@atom/product/ProductFilter';
import { useAppDispatch, useAppSelector } from '@redux/hook';
import { getAllPostByDateDesc } from '@redux/slices/postSlice';
import { useEffect, useState } from 'react';
import ProductListPage from '@components/atom/product/ProductListPage';
import PaginationControlled from '@components/atom/Pagination/Pagination';
import { useLocation } from 'react-router-dom';
import PaginationSearch from '@components/atom/Pagination/PaginationSearch';

// Define breadcrumb type
type BreadcrumbItem = {
    label: string;
    link: string;
};

const ProductsContent = styled.div`
    grid-template-columns: 320px auto;
    margin: 20px 0;

    @media (max-width: ${breakpoints.xl}) {
        grid-template-columns: 260px auto;
    }

    @media (max-width: ${breakpoints.lg}) {
        grid-template-columns: 100%;
        row-gap: 24px;
    }
`;

const ProductsContentLeft = styled.div`
    border: 1px solid rgba(190, 188, 189, 0.4);
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.05) 0 10px 50px;
    overflow: hidden;

    @media (max-width: ${breakpoints.lg}) {
        display: grid;
    }
`;

const ProductsContentRight = styled.div`
    padding: 16px 40px;

    .products-right-top {
        margin-bottom: 40px;
        @media (max-width: ${breakpoints.lg}) {
            margin-bottom: 24px;
        }
        @media (max-width: ${breakpoints.sm}) {
            flex-direction: column;
            row-gap: 16px;
            align-items: flex-start;
        }
    }

    .products-right-nav {
        column-gap: 16px;
        li {
            a.active {
                color: ${defaultTheme.color_purple};
            }
        }
    }

    @media (max-width: ${breakpoints.lg}) {
        padding-left: 12px;
        padding-right: 12px;
    }

    @media (max-width: ${breakpoints.sm}) {
        padding-left: 0;
        padding-right: 0;
    }

    .product-card-list {
        grid-template-columns: repeat(auto-fill, repeat(290px, auto));
    }

    .product-card {
        padding-left: 0;
        padding-right: 0;
    }
`;

const DescriptionContent = styled.div`
    .content-stylings {
        margin-left: 32px;
        @media (max-width: ${breakpoints.sm}) {
            margin-left: 0;
        }
    }
`;

const ProductListScreen: React.FC = () => {
    const breadcrumbItems: BreadcrumbItem[] = [
        { label: 'Trang Chủ', link: '/' },
        { label: 'Sản Phẩm', link: '/product' },
    ];
    const dispatch = useAppDispatch();
    const listPostByPage = useAppSelector((state) => state.post.listPostByPage);
    const isLoading = useAppSelector((state) => state.post.isLoading);
    const location = useLocation();
    const path = location.pathname;
    // const k = location.search;
    // const queryString = k.split('?')[1];
    // const params = new URLSearchParams(queryString);
    // let keyword = params.get('keyword');
    // const [flag, setFlag] = useState(0);
    // useEffect(() => {
    //     setFlag(flag + 1);
    // }, [keyword]);
    const searchValue = useAppSelector((state) => state.search.searchValue);
    return (
        <main className="page-py-spacing">
            <Container>
                <Breadcrumb items={breadcrumbItems} />
                <ProductsContent className="grid items-start">
                    <ProductsContentLeft>
                        <ProductFilter />
                    </ProductsContentLeft>
                    <ProductsContentRight>
                        <div className="products-right-top flex items-center justify-between">
                            <h4 className="text-xxl"></h4>
                            <ul className="products-right-nav flex items-center justify-end flex-wrap">
                                <li>
                                    <Link to="/" className="active text-lg font-semibold">
                                        Đề xuất
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {isLoading ? (
                            <div>Loading...</div>
                        ) : listPostByPage ? (
                            <ProductListPage products={listPostByPage} />
                        ) : (
                            <div>Không có sản phẩm nào</div>
                        )}

                        {/* số lượng product hiện ra */}
                        {searchValue === '' ? (
                            <div className="mt-20 flex justify-center">
                                <PaginationControlled></PaginationControlled>
                            </div>
                        ) : (
                            <div className="mt-20 flex justify-center">
                                <PaginationSearch search={searchValue}></PaginationSearch>
                            </div>
                        )}
                    </ProductsContentRight>
                </ProductsContent>
            </Container>
            <Section>
                <Container>
                    <DescriptionContent>
                        <Title titleText={'Clothing for Everyone Online'} />
                        <ContentStylings className="text-base content-stylings">
                            <h4>Reexplore Clothing Collection Online at Achats.</h4>
                            <p>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed, molestiae ex atque
                                similique consequuntur ipsum sapiente inventore magni ducimus sequi nemo id, numquam
                                officiis fugit pariatur esse, totam facere ullam?
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur nam magnam placeat
                                nesciunt ipsa amet, vel illo veritatis eligendi voluptatem!
                            </p>
                            <h4>One-stop Destination to Shop Every Clothing for Everyone: Achats.</h4>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo iure doloribus optio
                                aliquid id. Quos quod delectus, dolor est ab exercitationem odio quae quas qui
                                doloremque. Esse natus minima ratione reiciendis nostrum, quam, quisquam modi aut, neque
                                hic provident dolorem.
                            </p>
                            <p>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi laborum dolorem deserunt
                                aperiam voluptate mollitia.
                            </p>
                            <Link to="/">See More</Link>
                        </ContentStylings>
                    </DescriptionContent>
                </Container>
            </Section>
        </main>
    );
};

export default ProductListScreen;
