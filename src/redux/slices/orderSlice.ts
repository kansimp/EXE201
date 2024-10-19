import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import myAxios from "@setup/axiosConfig";

export interface Product {
  quantity: number;
  product_id: number;
  product_name: string;
  unit_price: number;
  line_total: number;
  image: string;
}

export type Order = {
  address: string;
  description: string;
  customer_order_id: number;
  orderCode: string;
  buyer_Id: string;
  buyer_name: string;
  customer_name: string;
  total_price: number;
  status: string;
  create_date: string;
  product_list: Product[];
  shop_id: number;
  shop_name: string;
  payment_id: string | null;
  payment_code: string | null;
  payment_method: string;
};

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

// Thunk để lấy dữ liệu orders từ API
export const getAllOrders = createAsyncThunk("orders/getAllOrders", async (buyerId: string, { rejectWithValue }) => {
  try {
    const response = await myAxios.get(
      `https://souvi-be-v1.onrender.com/order/buyer/details?pageNo=0&pageSize=10&sortBy=SORT_BY_DATE_DESC&buyerId=${buyerId}`
    );
    return response.data.content;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Something went wrong");
  }
});

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
