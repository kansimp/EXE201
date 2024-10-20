import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import myAxios from '@setup/axiosConfig';

type ProductCheckOut = {
    quantity: number;
    product_id: number;
    product_name: string;
    unit_price: number;
    line_total: number;
};
type DataCheckOut = {
    description: string;
    phone: string;
    products: ProductCheckOut[];
    account_id: string | null | undefined;
    customer_name: string;
    shipped_address: string;
    total_price: number;
    payment_date: string;
};
export type DataCheckOutSuccess = {
    id: string | null;
    code: string | null;
    status: string | null;
    orderCode: string | null;
    cancel: boolean | null;
};
export const createPayment = createAsyncThunk('payment/createPayment', async (data: DataCheckOut) => {
    const response = await myAxios.post('https://souvi-be-v1.onrender.com/payment/create-payment-link', data);
    return response.data;
});
export const paymentSuccess = createAsyncThunk('payment/paymentSuccess', async (data: DataCheckOutSuccess) => {
    const response = await myAxios.get(
        `https://souvi-be-v1.onrender.com/payment/success?id=${data.id}&code=${data.code}&status=${data.status}&orderCode=${data.orderCode}&cancel=${data.cancel}`,
    );
    return response.data;
});
export const paymentCancel = createAsyncThunk('payment/paymentCancel', async (data: DataCheckOutSuccess) => {
    const response = await myAxios.get(
        `https://souvi-be-v1.onrender.com/payment/cancel?id=${data.id}&code=${data.code}&status=${data.status}&orderCode=${data.orderCode}&cancel=${data.cancel}`,
    );
    return response.data;
});

type CategoryState = {
    isLoading: boolean;
    linkPayment: string;
    isError: boolean;
};

const initialState: CategoryState = {
    isLoading: false,
    linkPayment: '',
    isError: false,
};

const ListCategorySlice = createSlice({
    name: 'createPayment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPayment.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(createPayment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.linkPayment = action.payload;
                state.isError = false;
            })
            .addCase(createPayment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            });
        builder
            .addCase(paymentSuccess.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(paymentSuccess.fulfilled, (state, action) => {
                state.isLoading = false;

                state.isError = false;
            })
            .addCase(paymentSuccess.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            });
        builder
            .addCase(paymentCancel.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(paymentCancel.fulfilled, (state, action) => {
                state.isLoading = false;

                state.isError = false;
            })
            .addCase(paymentCancel.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export default ListCategorySlice.reducer;
