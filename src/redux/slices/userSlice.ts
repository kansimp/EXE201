import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
type UserType = {
  rememberMe: boolean;
  email: string;
  password: string;
};
export const loginUser = createAsyncThunk("user/loginUser", async (UserCredential: UserType) => {
  const request = await axios.post(`https://souvi-be-v1.onrender.com/auth/signin`, UserCredential);
  const response = await request.data;
  localStorage.setItem("access_token", request.data.data.access_token);
  localStorage.setItem("refresh_token", request.data.data.refresh_token);
  return response;
});

type LoginType = {
  loading: boolean | null;
  message: string | null;
  error: string | null;
};
const initialState: LoginType = {
  loading: false,
  message: null,
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      // Đặt lại state về giá trị ban đầu khi người dùng đăng xuất
      state.loading = false;
      state.message = null;
      state.error = null;
      // Xóa token khỏi Local Storage
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload; // lam theo cai ta return
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        console.log(action.error.message);
        if (action.error.message === "Request failed with status code 400") {
          state.error = "dang nhap that bai";
        } else {
          state.error = action.error.message as string; //ep kieu string
        }
      });
  },
});
export const { logoutUser } = userSlice.actions; // Xuất action logoutUser
export default userSlice.reducer;
