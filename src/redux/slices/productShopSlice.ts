import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import myAxios from "@setup/axiosConfig";

export type ProductShop = {
  description: string;
  price: number;
  status: string;
  image: string;
  stock: number;
  createdDate: string;
  shopId: number;
  product_id: number;
  product_name: string;
  category_name: string;
  shop_name: string;
  categoryId: number;
};
export type ProductEdit = {
  description: string;
  price: number;
  stock: number;
  product_id?: number;
  product_name: string;
};
interface ProductState {
  products: ProductShop[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

// Async thunk for fetching products
export const getAllProductsByShopId = createAsyncThunk(
  "products/fetchByShopId",
  async (shopId: number, { rejectWithValue }) => {
    try {
      const response = await myAxios.get(
        `https://souvi-be-v1.onrender.com/product/shop?shopId=${shopId}&pageNo=0&pageSize=10&sortBy=SORT_BY_DATE_DESC`
      );
      return response.data.content;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk for adding a new product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (
    productData: {
      description: string;
      price: number;
      image: string;
      stock: number;
      categoryId: number;
      shopId: number;
      product_name: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await myAxios.post("https://souvi-be-v1.onrender.com/product/new", productData);
      return response.data; // Assuming the API returns the created product
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const editPro = createAsyncThunk(
  "products/editProduct",
  async ({ productId, productData }: { productId: number; productData: ProductEdit }, { rejectWithValue }) => {
    try {
      const response = await myAxios.put(
        `https://souvi-be-v1.onrender.com/product/edit?productId=${productId}`,
        productData
      );
      return response.data; // Assuming the API returns the updated product
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsByShopId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProductsByShopId.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAllProductsByShopId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(editPro.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPro.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(editPro.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;
