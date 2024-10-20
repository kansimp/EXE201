import styled from "styled-components";
import { Container, ContentStylings, Section } from "@styles/styles";
import Breadcrumb from "@common/Breadcrumb";
import { Link, useParams } from "react-router-dom";
import Title from "@common/Title";
import { breakpoints, defaultTheme } from "@styles/themes/default";
import ProductFilter from "@atom/product/ProductFilter";
import { useAppDispatch, useAppSelector } from "@redux/hook";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductShopListPage from "./ProductShopListPage";
import PaginationControlledShop from "@components/atom/Pagination/PaginationShop";
import { getAllPostsByShopId } from "@redux/slices/postShopSlice";
import { shopProfile } from "@redux/slices/shopProfileSlice";
import avartar from "@images/hero1.jpg";

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
const ShopItemWrapper = styled.div`
  margin: 30px 0;
  border-bottom: 1px solid ${defaultTheme.color_anti_flash_white};

  .order-item-details {
    display: flex;
    align-items: center;
    padding: 24px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    gap: 16px;

    @media (max-width: ${breakpoints.sm}) {
      flex-direction: column;
      align-items: flex-start;
      padding: 20px;
    }
  }

  .order-item-title {
    margin-bottom: 12px;
  }
  .order-info {
    margin-left: 300px;
  }

  .order-info-group {
    display: grid;
    grid-template-columns: repeat(1, 1fr); /* Tạo 2 cột */

    gap: 12px;

    @media (max-width: ${breakpoints.sm}) {
      grid-template-columns: 1fr; /* Khi màn hình nhỏ, chỉ có 1 cột */
    }
  }

  .order-info-item {
    display: flex;
    justify-content: space-between;
    width: 100%;

    span {
      &:nth-child(2) {
        margin-left: 4px;
      }
    }
  }

  .order-image {
    width: 100px;
    height: 100px;
    border-radius: 8px;
    overflow: hidden;
    flex-shrink: 0;
  }
`;

const ProductShopListScreen: React.FC = () => {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Trang Chủ", link: "/" },
    { label: "Sản Phẩm", link: "/product" },
  ];
  const { shopId } = useParams();
  const idShop: number = parseInt(shopId as string);
  const dispatch = useAppDispatch();
  const listShopPostByPage = useAppSelector((state) => state.postShop.listPostByShop);
  const isLoading = useAppSelector((state) => state.post.isLoading);
  const location = useLocation();
  const profileShop = useAppSelector((state) => state.shopProfile.user);
  console.log("a", profileShop);

  const path = location.pathname;
  useEffect(() => {
    if (shopId) {
      dispatch(getAllPostsByShopId({ shopId: idShop, page: 0 }));
      dispatch(shopProfile({ shopId: idShop }));
    }
  }, [dispatch, shopId]);

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
            <ShopItemWrapper>
              <div className="order-item-details">
                <div className="order-image">
                  <img src={avartar} alt="Order" className="w-full h-full object-cover" />
                </div>
                <div className="order-info">
                  <div className="flex items-center pb-5">
                    <span className="text-black-50 font-bold">Tên cửa hàng :</span>
                    <span className="text-gray-150 font-bold ml-3">{profileShop?.shop_name}</span>
                  </div>
                  <div className="order-info-group">
                    <div className="order-info-item">
                      <span className="text-black-50 font-bold">Liên hệ:</span>
                      <span className="text-gray-150 font-bold">{profileShop?.contact}</span>
                    </div>
                    <div className="order-info-item">
                      <span className="text-black-50 font-bold">Địa chỉ:</span>
                      <span className="text-gray-150 font-bold">{profileShop?.address}</span>
                    </div>
                    <div className="order-info-item">
                      <span className="text-black-50 font-bold">Mô tả:</span>
                      <span className="text-gray-150 font-bold">{profileShop?.description}</span>
                    </div>
                  </div>
                </div>
              </div>
            </ShopItemWrapper>

            <div className="products-right-top flex items-center justify-between">
              <h4 className="text-xxl"></h4>
              <ul className="products-right-nav flex items-center justify-end flex-wrap">
                <li>
                  <Link to="/" className="active text-lg font-semibold">
                    Đề xuất
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-lg font-semibold">
                    Giá tăng dần
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-lg font-semibold">
                    Giá giảm dần
                  </Link>
                </li>
              </ul>
            </div>

            {isLoading === true ? <>Loading...</> : <ProductShopListPage products={listShopPostByPage} />}
            {/* số lượng product hiện ra */}
            {searchValue === "" ? (
              <div className="mt-20 flex justify-center">
                <PaginationControlledShop></PaginationControlledShop>
              </div>
            ) : (
              <></>
            )}
          </ProductsContentRight>
        </ProductsContent>
      </Container>
      <Section>
        <Container>
          <DescriptionContent>
            <Title titleText={"Clothing for Everyone Online"} />
            <ContentStylings className="text-base content-stylings">
              <h4>Reexplore Clothing Collection Online at Achats.</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed, molestiae ex atque similique consequuntur
                ipsum sapiente inventore magni ducimus sequi nemo id, numquam officiis fugit pariatur esse, totam facere
                ullam?
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur nam magnam placeat nesciunt ipsa
                amet, vel illo veritatis eligendi voluptatem!
              </p>
              <h4>One-stop Destination to Shop Every Clothing for Everyone: Achats.</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo iure doloribus optio aliquid id. Quos quod
                delectus, dolor est ab exercitationem odio quae quas qui doloremque. Esse natus minima ratione
                reiciendis nostrum, quam, quisquam modi aut, neque hic provident dolorem.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi laborum dolorem deserunt aperiam
                voluptate mollitia.
              </p>
              <Link to="/">See More</Link>
            </ContentStylings>
          </DescriptionContent>
        </Container>
      </Section>
    </main>
  );
};

export default ProductShopListScreen;
