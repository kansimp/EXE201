import Breadcrumb from "@common/Breadcrum";
import Title from "@common/Title";
import UserMenu from "@components/user/User";
import { Container } from "@styles/styles";
import { breakpoints, defaultTheme } from "@styles/themes/default";
import { UserContent, UserDashboardWrapper } from "@styles/user";
import styled from "styled-components";
import OrderItemList from "./OrderItemList";
import orderImage from "@images/keptoc.jpg";

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

const orderData = [
  {
    id: "order_1",
    order_no: "#5558760098",
    order_date: "2 June 2023 2:40 PM",
    status: "Delivered",
    delivery_date: "8 June 2023",
    payment_method: "Cash on Delivery",
    items: [
      {
        id: "product_01",
        name: "Printed white coat",
        color: "White",
        quantity: 1,
        price: 23,
        imgSource: orderImage,
      },
      {
        id: "product_02",
        name: "Stretchy jumper for women",
        color: "Maroon",
        quantity: 5,
        price: 21,
        imgSource: orderImage,
      },
      {
        id: "product_03",
        name: "Black Color Hoodie",
        color: "Black",
        quantity: 10,
        price: 90,
        imgSource: orderImage,
      },
    ],
  },
  {
    id: "order_2",
    order_no: "#8958360118",
    order_date: "2 June 2023 2:40 PM",
    status: "inprogress",
    delivery_date: "12 August 2023",
    payment_method: "Online Payment",
    items: [
      {
        id: "product_04",
        name: "Stretchy jumper for women",
        color: "Maroon",
        quantity: 5,
        price: 21,
        imgSource: orderImage,
      },
      {
        id: "product_05",
        name: "Printed white coat",
        color: "White",
        quantity: 1,
        price: 23,
        imgSource: orderImage,
      },
      {
        id: "product_08",
        name: "Black Color Hoodie",
        color: "Black",
        quantity: 10,
        price: 90,
        imgSource: orderImage,
      },
    ],
  },
];
const OrderListScreen = () => {
  return (
    <OrderListScreenWrapper className="page-py-spacing">
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        <UserDashboardWrapper>
          <UserMenu />
          <UserContent>
            <Title titleText={"My Orders"} />
            <div className="order-tabs">
              <div className="order-tabs-heads">
                <button
                  type="button"
                  className="order-tabs-head text-xl italic order-tabs-head-active"
                  data-id="active"
                >
                  Active
                </button>
                <button type="button" className="order-tabs-head text-xl italic" data-id="cancelled">
                  Cancelled
                </button>
                <button type="button" className="order-tabs-head text-xl italic" data-id="completed">
                  Completed
                </button>
              </div>

              <div className="order-tabs-contents">
                <div className="order-tabs-content" id="active">
                  <OrderItemList orders={orderData} />
                </div>
                <div className="order-tabs-content" id="cancelled">
                  Cancelled content
                </div>
                <div className="order-tabs-content" id="completed">
                  Completed content
                </div>
              </div>
            </div>
          </UserContent>
        </UserDashboardWrapper>
      </Container>
    </OrderListScreenWrapper>
  );
};

export default OrderListScreen;
