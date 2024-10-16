import styled from 'styled-components';
import Hero from '@atom/hero/Hero';
import Featured from '@atom/featured/Featured';
import Category from '@atom/category/Category';
import Catalog from '@atom/catalog/Catalog';
import Feedback from '@atom/feedback/Feedback';
import nen from '@images/banchay.jpg';
import spMoi from '@images/spmoi.jpg';
import { useAppDispatch, useAppSelector } from '@redux/hook';
import { getAllPostByDateDesc } from '@redux/slices/postSlice';
import { useEffect } from 'react';

const HomeScreenWrapper = styled.main``;
const bestSaler = [
    {
        id: '1',
        imgSource: nen,
        title: 'Nến Thơm Cute',
        brand: 'sgShop',
        price: 123000,
    },
    {
        id: '2',
        imgSource: nen,
        title: 'Nến Thơm Cute',
        brand: 'sgShop',
        price: 123000,
    },
    {
        id: '3',
        imgSource: nen,
        title: 'Nến Thơm Cute',
        brand: 'sgShop',
        price: 123000,
    },
    {
        id: '4',
        imgSource: nen,
        title: 'Nến Thơm Cute',
        brand: 'sgShop',
        price: 123000,
    },
    {
        id: '5',
        imgSource: nen,
        title: 'Nến Thơm Cute',
        brand: 'sgShop',
        price: 123000,
    },
];
export const newProducts = [
    {
        id: '1',
        imgSource: spMoi,
        title: 'Móc Khóa Labubu',
        brand: 'sgShop',
        price: 123000,
    },
    {
        id: '2',
        imgSource: spMoi,
        title: 'Móc Khóa Labubu',
        brand: 'sgShop',
        price: 123000,
    },
    {
        id: '3',
        imgSource: spMoi,
        title: 'Móc Khóa Labubu',
        brand: 'sgShop',
        price: 123000,
    },
    {
        id: '4',
        imgSource: spMoi,
        title: 'Móc Khóa Labubu',
        brand: 'sgShop',
        price: 123000,
    },
    {
        id: '5',
        imgSource: spMoi,
        title: 'Móc Khóa Labubu',
        brand: 'sgShop',
        price: 160000,
    },
];
function Home() {
    const dispatch = useAppDispatch();
    const listPostByDateDesc = useAppSelector((state) => state.post.listPost);
    useEffect(() => {
        dispatch(getAllPostByDateDesc());
    }, []);
    return (
        <HomeScreenWrapper>
            <Hero />
            <Featured />
            <Category />
            {listPostByDateDesc.length > 0 ? (
                <Catalog catalogTitle={'Các Sản Phẩm Mới'} products={listPostByDateDesc.slice(-8)} />
            ) : (
                <>Loading</>
            )}
            {listPostByDateDesc.length > 0 ? (
                <Catalog catalogTitle={'Các Sản Phẩm Bán Chạy'} products={listPostByDateDesc.slice(0, 8)} />
            ) : (
                <>Loading</>
            )}

            <Feedback />
        </HomeScreenWrapper>
    );
}

export default Home;
