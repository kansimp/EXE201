import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Định nghĩa kiểu trạng thái ban đầu cho tính năng đổi mật khẩu
type ChangePasswordState = {
  loading: boolean;
  message: string | null; // Thông báo thành công
  error: string | null; // Thông báo lỗi
};

const initialState: ChangePasswordState = {
  loading: false,
  message: null,
  error: null,
};

export const changePassword = createAsyncThunk<string, { token: string; newPassword: string }>(
  "profile/changePassword",
  async ({ token, newPassword }) => {
    try {
      const response = await axios.post(
        `https://souvi-be-v1.onrender.com/auth/reset-password?Password=${newPassword}&token=${token}`
      );
      return response.data.message;
      console.log("res", response.data.message);
    } catch (error: any) {
      console.error("Error changing password:", error);
    }
  }
);
const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        console.error(action.error.message);
      });
  },
});

export default changePasswordSlice.reducer;
