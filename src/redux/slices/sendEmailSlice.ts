import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Định nghĩa kiểu cho dữ liệu Reset Password
type sendEmailResetPasswordType = {
  email: string;
};

export const sendEmailResetPassword = createAsyncThunk(
  "user/resetPassword",
  async (resetData: sendEmailResetPasswordType) => {
    try {
      const request = await axios.post(
        `https://souvi-be-v1.onrender.com/auth/forgot-password?email=${resetData.email}`
      );
      const response = request.data.message;
      return response;
    } catch (error: any) {
      return error;
    }
  }
);

type sendEmailResetPasswordStateType = {
  loading: boolean | null;
  message: string | null;
  error: string | null;
};

// Trạng thái ban đầu
const initialState: sendEmailResetPasswordStateType = {
  loading: false,
  message: null,
  error: null,
};

// Tạo slice
const sendEmailResetPasswordSlice = createSlice({
  name: "sendEmailResetPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendEmailResetPassword.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
      })
      .addCase(sendEmailResetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = null;
      })
      .addCase(sendEmailResetPassword.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        if (action.payload === "Request failed with status code 400") {
          state.error = "Gửi yêu cầu thất bại, vui lòng thử lại";
        } else {
          state.error = action.payload as string;
        }
      });
  },
});

export default sendEmailResetPasswordSlice.reducer;
