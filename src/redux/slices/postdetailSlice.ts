import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Post, Product } from './postSlice';

export const getPostDetail = createAsyncThunk('post/getPostDetail', async (id: number) => {
    const response = await axios.get(`https://souvi-be-v1.onrender.com/post/details?postId=${id}`);
    return response.data.data;
});
interface ProductParams {
    id: number;
    productId: number;
}
export const getProductChoose = createAsyncThunk('post/getProductChoose', async ({ id, productId }: ProductParams) => {
    const response = await axios.get(`https://souvi-be-v1.onrender.com/post/details?postId=${id}`);
    const product: Product = response.data.data.products.find((p: Product) => p.product_id === productId);
    return product;
});

type PostDetailType = {
    postDetail: Post | null;
    productDetail: Product | null;
    isLoading: boolean;
    isError: boolean;
};
const initialState: PostDetailType = {
    postDetail: null,
    productDetail: null,
    isLoading: false,
    isError: false,
};

const postDetailSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPostDetail.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getPostDetail.fulfilled, (state, action: PayloadAction<Post>) => {
                state.isLoading = false;
                state.isError = false;
                state.postDetail = action.payload;
            })
            .addCase(getPostDetail.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
        builder
            .addCase(getProductChoose.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getProductChoose.fulfilled, (state, action: PayloadAction<Product>) => {
                state.isLoading = false;
                state.isError = false;
                state.productDetail = action.payload;
            })
            .addCase(getProductChoose.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});
export default postDetailSlice.reducer;
