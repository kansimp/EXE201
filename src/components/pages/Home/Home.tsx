import styled from 'styled-components';
import Hero from '@atom/hero/Hero';
import Featured from '@atom/featured/Featured';
import Category from '@atom/category/Category';
import Catalog from '@atom/catalog/Catalog';
import Feedback from '@atom/feedback/Feedback';
import nen from '@images/banchay.jpg';
import spMoi from '@images/spmoi.jpg';

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
const newProducts = [
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
        price: 123000,
    },
];
function Home() {
    return (
        <HomeScreenWrapper>
            <Hero />
            <Featured />
            <Category />
            <Catalog catalogTitle={'Các Sản Mới'} products={bestSaler} />
            <Catalog catalogTitle={'Các Sản Phẩm Bán Chạy'} products={newProducts} />
            <Feedback />
        </HomeScreenWrapper>
    );
}

export default Home;
