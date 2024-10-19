import Breadcrumb from "@common/Breadcrum";
import Title from "@common/Title";
import UserMenu from "@components/user/User";
import { useAppDispatch, useAppSelector } from "@redux/hook";
import { getAllOrders, Order } from "@redux/slices/orderSlice";
import { Container } from "@styles/styles";
import { breakpoints, defaultTheme } from "@styles/themes/default";
import { UserContent, UserDashboardWrapper } from "@styles/user";
import { currencyFormat } from "@ultils/helper";
import { get } from "http";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

const OrderDetailScreenWrapper = styled.main`
  .btn-and-title-wrapper {
    margin-bottom: 24px;
    .title {
      margin-bottom: 0;
    }

    .btn-go-back {
      margin-right: 12px;
      transition: ${defaultTheme.default_transition};

      &:hover {
        margin-right: 16px;
      }
    }
  }

  .order-d-top {
    background-color: ${defaultTheme.color_whitesmoke};
    padding: 26px 32px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.05);

    @media (max-width: ${breakpoints.sm}) {
      flex-direction: column;
      row-gap: 12px;
    }
  }
`;

const OrderDetailStatusWrapper = styled.div`
  margin: 0 36px;
  @media (max-width: ${breakpoints.sm}) {
    margin: 0 10px;
    overflow-x: scroll;
  }

  .order-status {
    height: 4px;
    margin: 50px 0;
    max-width: 580px;
    width: 340px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    margin-bottom: 70px;

    @media (max-width: ${breakpoints.sm}) {
      margin-right: 40px;
      margin-left: 40px;
    }

    &-dot {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);

      &:nth-child(1) {
        left: 0;
      }

      &:nth-child(2) {
        left: calc(33.3333% - 10px);
      }

      &:nth-child(3) {
        left: calc(66.6666% - 10px);
      }
      &:nth-child(4) {
        right: 0;
      }

      &.status-done {
        background-color: ${defaultTheme.color_outerspace};
        .order-status-text {
          color: ${defaultTheme.color_outerspace};
        }
      }

      &.status-current {
        position: absolute;
        &::after {
          content: "";
          position: absolute;
          width: 12px;
          height: 12px;
          background-color: ${defaultTheme.color_outerspace};
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 30;
          border-radius: 50%;
        }

        .order-status-text {
          color: ${defaultTheme.color_outerspace};
        }
      }
    }

    &-text {
      position: absolute;
      top: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const OrderDetailMessageWrapper = styled.div`
  background-color: ${defaultTheme.color_whitesmoke};
  max-width: 748px;
  margin-right: auto;
  margin-left: auto;
  min-height: 68px;
  padding: 16px 24px;
  border-radius: 8px;
  position: relative;
  margin-top: 80px;

  &::after {
    content: "";
    position: absolute;
    top: -34px;
    left: 20%;
    border-bottom: 22px solid ${defaultTheme.color_whitesmoke};
    border-top: 18px solid transparent;
    border-left: 18px solid transparent;
    border-right: 18px solid transparent;
  }

  @media (max-width: ${breakpoints.sm}) {
    margin-top: 10px;
  }
`;

const OrderDetailListWrapper = styled.div`
  padding: 24px;
  margin-top: 40px;
  border: 1px solid rgba(0, 0, 0, 0.05);

  @media (max-width: ${breakpoints.md}) {
    padding: 18px;
  }

  @media (max-width: ${breakpoints.md}) {
    padding: 12px;
  }

  .order-d-item {
    grid-template-columns: 80px 1fr 1fr 32px;
    gap: 20px;
    padding: 12px 0;
    border-bottom: 1px solid ${defaultTheme.color_whitesmoke};
    position: relative;

    @media (max-width: ${breakpoints.xl}) {
      grid-template-columns: 80px 3fr 2fr 32px;
      padding: 16px 0;
      gap: 16px;
    }

    @media (max-width: ${breakpoints.sm}) {
      grid-template-columns: 50px 3fr 2fr;
      gap: 16px;
    }

    @media (max-width: ${breakpoints.xs}) {
      grid-template-columns: 100%;
      gap: 12px;
    }

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      padding-bottom: 0;
      border-bottom: 0;
    }

    &-img {
      width: 80px;
      height: 80px;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

      @media (max-width: ${breakpoints.sm}) {
        width: 50px;
        height: 50px;
      }

      @media (max-width: ${breakpoints.sm}) {
        width: 100%;
        height: 100%;
      }
    }

    &-calc {
      p {
        display: inline-block;
        margin-right: 50px;

        @media (max-width: ${breakpoints.lg}) {
          margin-right: 20px;
        }
      }
    }

    &-btn {
      margin-bottom: auto;
      &:hover {
        color: ${defaultTheme.color_sea_green};
      }

      @media (max-width: ${breakpoints.sm}) {
        position: absolute;
        right: 0;
        top: 10px;
      }

      @media (max-width: ${breakpoints.xs}) {
        width: 28px;
        height: 28px;
        z-index: 5;
        background-color: ${defaultTheme.color_white};
        border-radius: 50%;
        right: 8px;
        top: 24px;
      }
    }
  }
`;

const breadcrumbItems = [
  { label: "Home", link: "/" },
  { label: "Order", link: "/order" },
  { label: "Order Details", link: "/order_detail" },
];

const OrderDetailScreen = () => {
  const dispatch = useAppDispatch();
  const { orderCode } = useParams<{ orderCode: string }>();
  const order = useAppSelector((state) => state.order.orders.find((o) => o.orderCode === orderCode)) || null;
  console.log("oooooo", order);

  useEffect(() => {
    if (orderCode && !order) {
      // Check if orderCode is not undefined
      dispatch(getAllOrders(orderCode));
    }
  }, [orderCode, order, dispatch]);

  if (!order) {
    return <div>Loading...</div>;
  }
  return (
    <OrderDetailScreenWrapper className="page-py-spacing">
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        <UserDashboardWrapper>
          <UserMenu />
          <UserContent>
            <div className="flex items-center justify-start btn-and-title-wrapper">
              <Link to="/order" className="btn-go-back inline-flex items-center justify-center text-xxl">
                <i className="bi bi-chevron-left"></i>
              </Link>
              <Title titleText={"Order Details"} />
            </div>
            <div className="order-d-wrapper">
              <div className="order-d-top flex justify-between items-start">
                <div className="order-d-top-l">
                  <h4 className="text-title-md text-gray-150 order-d-no font-bold">Mã đặt hàng: {order.orderCode}</h4>
                  <p className="text-title-sm  text-gray-150 font-bold ">{order.create_date}</p>
                  <p className="text-title-sm  text-gray-150 font-bold ">Địa chỉ : {order.address}</p>
                </div>
                <div className="order-d-top-r text-title-md text-gray-150 font-semibold">
                  Tổng tiền: <span className="text-outerspace text-black-50">{currencyFormat(order.total_price)}</span>
                </div>
              </div>
              <OrderDetailListWrapper className="order-d-list mb-12">
                {order.product_list?.map((product) => {
                  return (
                    <div className="order-d-item grid" key={product.product_id}>
                      <div className="order-d-item-img w-20 h-20 rounded-lg overflow-hidden shadow-md flex justify-center items-center">
                        <img src={product.image} alt="" className="w-full h-full object-cover" />
                      </div>

                      <div className="order-d-item-info">
                        <p className="text-title-sm font-bold">{product.product_name}</p>
                        <p className="text-title-xsm font-bold">
                          Giá sản phẩm :{" "}
                          <span className="font-bold text-gray-150">{currencyFormat(product.unit_price)}</span>
                        </p>
                        <p className="text-title-xsm font-bold">
                          Shop : <span className="font-bold text-gray-150">{order.shop_name}</span>
                        </p>
                      </div>
                      <div className="order-d-item-calc">
                        <p className="font-bold text-title-xsm">
                          Số lượng : <span className="text-gray-150">{product.quantity}</span>
                        </p>
                        <p className="font-bold text-title-xsm">
                          Đơn giá : <span className="text-gray-150">{currencyFormat(product.line_total)}</span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </OrderDetailListWrapper>
            </div>
          </UserContent>
        </UserDashboardWrapper>
      </Container>
    </OrderDetailScreenWrapper>
  );
};

export default OrderDetailScreen;