import Breadcrumb from "@common/Breadcrum";
import UserMenu from "@components/user/User";
import { BaseLinkGreen } from "@styles/button";
import { Container } from "@styles/styles";
import { UserContent, UserDashboardWrapper } from "@styles/user";
import styled from "styled-components";
import wishlist from "@images/wishlist.svg";
import { Link } from "react-router-dom";

const WishListEmptyScreenWrapper = styled.main`
  .wishlist-empty-content {
    max-width: 514px;
    margin-right: auto;
    margin-left: auto;

    .heart-img {
      margin-right: auto;
      margin-left: auto;
      width: 140px;
      height: 140px;
      border-radius: 50%;
      background: #f0f9f4;
      margin-bottom: 40px;
    }

    .btn-continue {
      margin-top: 20px;
    }
  }
`;

const breadcrumbItems = [
  { label: "Home", link: "/" },
  { label: "Wishlist", link: "/wishlist" },
];

const WishListEmptyScreen = () => {
  return (
    <WishListEmptyScreenWrapper className="content-main page-empty-wishlist page-py-spacing mb-40">
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        <UserDashboardWrapper>
          <UserMenu />
          <UserContent>
            <div className="wishlist-empty-content text-center">
              <div className="heart-img flex items-center justify-center">
                <img src={wishlist} alt="" />
              </div>
              <h3 className="text-xxl font-semibold">Danh sách yêu thích của bạn rỗng.</h3>
              <p className="text-gray text-base">
                Bạn chưa có sản phẩm nào trong danh sách mong muốn. Bạn sẽ tìm thấy rất nhiều sản phẩm thú vị trên trang
                Cửa hàng.
              </p>
              <Link to="/product">
                <BaseLinkGreen className="btn-continue">Tiép tục mua sắm</BaseLinkGreen>
              </Link>
            </div>
          </UserContent>
        </UserDashboardWrapper>
      </Container>
    </WishListEmptyScreenWrapper>
  );
};

export default WishListEmptyScreen;
