import Breadcrumb from "@common/Breadcrum";
import Title from "@common/Title";
import UserMenu from "@components/user/User";
import { Container } from "@styles/styles";
import { breakpoints, defaultTheme } from "@styles/themes/default";
import { UserContent, UserDashboardWrapper } from "@styles/user";
import styled from "styled-components";
import OrderItemList from "./OrderItemList";
import orderImage from "@images/keptoc.jpg";
import { useAppDispatch, useAppSelector } from "@redux/hook";
import { useEffect, useState } from "react";
import { getAllOrders } from "@redux/slices/orderSlice";
import { userProfile } from "@redux/slices/profileSlice";

const OrderListScreenWrapper = styled.div`
  .order-tabs-contents {
    margin-top: 40px;
  }
  .order-tabs-head {
    min-width: 170px;
    padding: 12px 0;
    border-bottom: 3px solid ${defaultTheme.color_whitesmoke};

    &.order-tabs-head-active {
      border-bottom-color: ${defaultTheme.color_outerspace};
      &.active {
        border-bottom-color: ${defaultTheme.color_black};
      }

      &.cancelled {
        border-bottom-color: ${defaultTheme.color_red};
      }

      &.completed {
        border-bottom-color: ${defaultTheme.color_yellow_green};
      }
    }

    @media (max-width: ${breakpoints.lg}) {
      min-width: 120px;
    }

    @media (max-width: ${breakpoints.xs}) {
      min-width: 80px;
    }
  }
`;

const breadcrumbItems = [
  { label: "Home", link: "/" },
  { label: "Order", link: "/order" },
];

const OrderListScreen = () => {
  const dispatch = useAppDispatch();
  const buyerId = useAppSelector((state) => state.profile.user?.account_id);
  const orderData = useAppSelector((state) => state.order.orders) || [];
  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);
  useEffect(() => {
    const fetchOrders = async () => {
      if (buyerId) {
        await dispatch(getAllOrders(buyerId));
      }
    };
    fetchOrders();
  }, [dispatch, buyerId]);
  const [activeTab, setActiveTab] = useState("active");

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  const completedOrders = orderData.filter((order) => order.status === "PAID");
  const pendingOrders = orderData.filter((order) => order.status === "PENDING");
  const processingOrders = orderData.filter((order) => order.status === "PROCESSING");
  const cancelledOrders = orderData.filter((order) => order.status === "CANCELLED");
  return (
    <OrderListScreenWrapper className="page-py-spacing">
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        <UserDashboardWrapper>
          <UserMenu />
          <UserContent>
            <Title titleText={"My Orders"} />
            <div className="order-tabs mb-12">
              <div className="order-tabs-heads">
                <button
                  type="button"
                  className={`order-tabs-head text-xl italic ${
                    activeTab === "active" ? "order-tabs-head-active active" : ""
                  }`}
                  onClick={() => handleTabClick("active")}
                >
                  Đang họat động
                </button>
                <button
                  type="button"
                  className={`order-tabs-head text-xl italic ${
                    activeTab === "cancelled" ? "order-tabs-head-active cancelled" : ""
                  }`}
                  onClick={() => handleTabClick("cancelled")}
                >
                  Đã hủy
                </button>
                <button
                  type="button"
                  className={`order-tabs-head text-xl italic ${
                    activeTab === "completed" ? "order-tabs-head-active completed" : ""
                  }`}
                  onClick={() => handleTabClick("completed")}
                >
                  Đã thanh toán
                </button>
              </div>

              <div className="order-tabs-contents">
                {activeTab === "active" && (
                  <div className="order-tabs-content">
                    <OrderItemList orders={[...pendingOrders, ...processingOrders]} />
                  </div>
                )}
                {activeTab === "cancelled" && (
                  <div className="order-tabs-content">
                    <OrderItemList orders={cancelledOrders} />
                  </div>
                )}
                {activeTab === "completed" && (
                  <div className="order-tabs-content">
                    <OrderItemList orders={completedOrders} />
                  </div>
                )}
              </div>
            </div>
          </UserContent>
        </UserDashboardWrapper>
      </Container>
    </OrderListScreenWrapper>
  );
};

export default OrderListScreen;
