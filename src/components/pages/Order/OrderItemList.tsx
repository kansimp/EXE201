import PropTypes from "prop-types";
import OrderItem from "./OrderItem";
import { Order } from "@redux/slices/orderSlice";

interface OrderItemListProps {
  orders: Order[]; // Changed to an array of Order
}

const OrderItemList: React.FC<OrderItemListProps> = ({ orders }) => {
  console.log("or", orders);

  return (
    <div>
      {orders?.map((order) => (
        <OrderItem key={order.customer_order_id} order={order} />
      ))}
    </div>
  );
};

export default OrderItemList;

OrderItemList.propTypes = {
  orders: PropTypes.array.isRequired, // Ensure orders is required and an array
};
