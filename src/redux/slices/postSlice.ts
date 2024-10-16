import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllPostByDateDesc = createAsyncThunk('post/getAllPostByDateDesc', async () => {
    const response = await axios.get(
        'https://souvi-be-v1.onrender.com/post/all?pageNo=0&pageSize=100&sortBy=SORT_BY_DATE_DESC',
    );
    return response.data.data.content;
});
export const getAllPostByPage = createAsyncThunk('post/getAllPostByPage', async (page: number) => {
    const response = await axios.get(
        `https://souvi-be-v1.onrender.com/post/all?pageNo=${page}&pageSize=6&sortBy=SORT_BY_DATE_DESC`,
    );
    return response.data.data;
});
type searchProp = {
    page: number;
    key: string | null;
};
export const getAllPostBySearch = createAsyncThunk('post/getAllPostBySearch', async ({ page, key }: searchProp) => {
    const response = await axios.get(
        `https://souvi-be-v1.onrender.com/post/all?pageNo=${page}&pageSize=6&sortBy=SORT_BY_DATE_DESC&keyword=${key}`,
    );
    return response.data.data;
});
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
    listPost: Post[];
    listPostByPage: Post[];
    total_pages: number;
    isLoading: boolean;
    isError: boolean;
};
const initialState: PostType = {
    listPost: [],
    listPostByPage: [],
    total_pages: 0,
    isLoading: false,
    isError: false,
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllPostByDateDesc.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getAllPostByDateDesc.fulfilled, (state, action: PayloadAction<Post[]>) => {
                state.isLoading = false;
                state.isError = false;
                state.listPost = action.payload;
            })
            .addCase(getAllPostByDateDesc.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
        builder
            .addCase(getAllPostByPage.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getAllPostByPage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listPostByPage = action.payload.content;
                state.total_pages = action.payload.total_pages;
            })
            .addCase(getAllPostByPage.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
        builder
            .addCase(getAllPostBySearch.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getAllPostBySearch.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listPostByPage = action.payload.content;
                state.total_pages = action.payload.total_pages;
            })
            .addCase(getAllPostBySearch.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});
export default postSlice.reducer;
