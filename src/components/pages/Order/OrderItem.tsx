import styled from "styled-components";
import PropTypes from "prop-types";
import { breakpoints, defaultTheme } from "@styles/themes/default";
import { currencyFormat } from "@ultils/helper";
import { BaseLinkGreen } from "@styles/button";
import { type } from "@testing-library/user-event/dist/type";
import { Order } from "@redux/slices/orderSlice";
import { useNavigate } from "react-router-dom";

interface OrderItemProps {
  order: Order;
}
const OrderItemWrapper = styled.div`
  margin: 30px 0;
  border-bottom: 1px solid ${defaultTheme.color_anti_flash_white};

  .order-item-title {
    margin-bottom: 12px;
  }

  .order-item-details {
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 24px 32px;
    border-radius: 8px;

    @media (max-width: ${breakpoints.sm}) {
      padding: 20px 24px;
    }

    @media (max-width: ${breakpoints.xs}) {
      padding: 12px 16px;
    }
  }

  .order-info-group {
    @media (max-width: ${breakpoints.sm}) {
      flex-direction: column;
    }
  }

  .order-info-item {
    width: 50%;

    span {
      &:nth-child(2) {
        margin-left: 4px;
      }
    }

    &:nth-child(even) {
      text-align: right;
      @media (max-width: ${breakpoints.lg}) {
        text-align: left;
      }
    }

    @media (max-width: ${breakpoints.sm}) {
      width: 100%;
      margin: 2px 0;
    }
  }

  .order-overview {
    margin: 28px 0;
    gap: 12px;

    @media (max-width: ${breakpoints.lg}) {
      margin: 20px 0;
    }

    @media (max-width: ${breakpoints.sm}) {
      flex-direction: column;
    }

    &-img {
      width: 100px;
      height: 100px;
      border-radius: 6px;
      overflow: hidden;
    }

    &-content {
      grid-template-columns: 100px auto;
      gap: 18px;
    }

    &-info {
      ul {
        span {
          &:nth-child(2) {
            margin-left: 4px;
          }
        }
      }
    }
  }
`;

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  console.log("eee", order);
  const navigate = useNavigate();
  return (
    <OrderItemWrapper>
      <div className="order-item-details">
        <div className="flex justify-between items-center pb-5">
          <h3 className="text-gray-800 order-item-title font-bold">Mã đặt hàng: {order.orderCode}</h3>
          <BaseLinkGreen onClick={() => navigate(`/order-detail/${order.orderCode}`)}>Xem chi tiết</BaseLinkGreen>
        </div>
        <div className="order-info-group flex flex-wrap">
          <div className="order-info-item">
            <span className="text-black-50 font-bold">Ngày đặt hàng:</span>
            <span className="text-gray-150 font-bold">{order.create_date}</span>
          </div>
          <div className="order-info-item">
            <span className="text-black-50 font-bold">Trạng thái:</span>
            <span className="text-gray-150 font-bold">
              {order.status === "PENDING"
                ? "Chờ thanh toán"
                : order.status === "PROCESSING"
                ? "Đang xử lý"
                : order.status === "CANCELLED"
                ? "Đã hủy"
                : order.status === "PAID"
                ? "Đã thanh toán"
                : order.status}
            </span>
          </div>
          <div className="order-info-item">
            <span className="text-black-50 font-bold">Địa chỉ:</span>
            <span className="text-gray-150 font-bold">{order.address}</span>
          </div>
          <div className="order-info-item">
            <span className="text-black-50 font-bold">Phương thức thanh toán:</span>
            <span className="text-gray-150 font-bold">{order.payment_method}</span>
          </div>
        </div>
      </div>
    </OrderItemWrapper>
  );
};

export default OrderItem;
