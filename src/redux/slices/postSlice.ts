import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllPostByDateDesc = createAsyncThunk('post/getAllPostByDateDesc', async () => {
    const response = await axios.get(
        'https://souvi-be-v1.onrender.com/post/all?pageNo=0&pageSize=10&sortBy=SORT_BY_DATE_DESC',
    );
    return response.data.data.content;
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
    isLoading: boolean;
    isError: boolean;
};
const initialState: PostType = {
    listPost: [],
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
    },
});
export default postSlice.reducer;
