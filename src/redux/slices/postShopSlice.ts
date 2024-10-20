import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllPostsByShopId = createAsyncThunk(
  "post/getPostsByShopId",
  async ({ shopId, page }: { shopId: number | undefined; page: number }) => {
    const response = await axios.get(
      `https://souvi-be-v1.onrender.com/post/shop?shopId=${shopId}&pageNo=${page}&pageSize=9&sortBy=SORT_BY_DATE_DESC`
    );
    return response.data.data;
  }
);

export type Product = {
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
};

export type Post = {
  id: number;
  title: string;
  description: string;
  status: string;
  createdDate: string;
  products: Product[];
};

type PostType = {
  listPostByShop: Post[];
  total_pages: number;
  isLoading: boolean;
  isError: boolean;
};

const initialState: PostType = {
  listPostByShop: [],
  total_pages: 0,
  isLoading: false,
  isError: false,
};

const postShopSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPostsByShopId.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(
        getAllPostsByShopId.fulfilled,
        (state, action: PayloadAction<{ content: Post[]; total_pages: number }>) => {
          state.isLoading = false;
          state.isError = false;
          state.listPostByShop = action.payload.content;
          state.total_pages = action.payload.total_pages;
        }
      )
      .addCase(getAllPostsByShopId.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default postShopSlice.reducer;
