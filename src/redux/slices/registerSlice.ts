import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RegisterType } from '@components/pages/Register/Register';
import { RegisterShopType } from '@components/pages/Register/RegisterShop';
export const createBuyer = createAsyncThunk('user/createBuyer', async (data: RegisterType, { rejectWithValue }) => {
    try {
        const response = await axios.post('https://souvi-be-v1.onrender.com/auth/registration', data);
        return response.data.message;
    } catch (error: any) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue('An unknown error occurred');
        }
    }
});

export const createSeller = createAsyncThunk(
    'user/createSeller',
    async (data: RegisterShopType, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://souvi-be-v1.onrender.com/auth/registration', data);
            return response.data.message;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue('An unknown error occurred');
            }
        }
    },
);

const initialState = {
    message: '',
    isLoading: false,
    isError: false,
};

const registerSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createBuyer.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(createBuyer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = action.payload;
            })
            .addCase(createBuyer.rejected, (state, action) => {
                state.message = 'Yêu cầu đăng ký không thành công. Tài khoản đã tồn tại !';
                state.isLoading = false;
                state.isError = true;
            });
        builder
            .addCase(createSeller.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(createSeller.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = action.payload;
            })
            .addCase(createSeller.rejected, (state, action) => {
                state.message = 'Yêu cầu đăng ký không thành công. Tài khoản đã tồn tại !';
                state.isLoading = false;
                state.isError = true;
            });
    },
});
export default registerSlice.reducer;
