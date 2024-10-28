import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import myAxios from "@setup/axiosConfig";

export type Product = {
  product_id: number;
  product_name: string;
  description: string;
  price: number;
  status: string;
  image: string;
  stock: number;
  category_name: string;
  shop_name: string;
  createdDate: string;
  shopId: number;
};

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

// Async thunk for fetching products
export const getAllProducts = createAsyncThunk("products/getAllProducts", async () => {
  try {
    const response = await myAxios.get(
      `https://souvi-be-v1.onrender.com/product/all?pageNo=0&pageSize=10&sortBy=SORT_BY_DATE_DESC`
    );
    return response.data.content;
  } catch (error: any) {
    console.log(error);
  }
});

export const approveProduct = createAsyncThunk(
  "products/approve",
  async ({ productId, status }: { productId: number; status: string }) => {
    try {
      const response = await myAxios.put(
        `https://souvi-be-v1.onrender.com/product/approve?productId=${productId}&status=${status}`
      );
      return response.data.message; // Assuming the API returns the updated product
    } catch (error: any) {
      return console.log(error);
    }
  }
);
const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(approveProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(approveProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export default productsSlice.reducer;
