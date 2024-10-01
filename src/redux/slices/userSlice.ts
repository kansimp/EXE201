import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
type UserType = {
  rememberMe: boolean;
  email: string;
  password: string;
};
export const loginUser = createAsyncThunk("user/loginUser", async (UserCredential: UserType) => {
  const request = await axios.post(`https://souvi-be-v1.onrender.com/auth/signin`, UserCredential);
  const response = await request.data.data;
  localStorage.setItem("user", JSON.stringify(response));
  return response;
});
type LoginType = {
  loading: boolean | null;
  user: string | null;
  error: string | null;
};
const initialState: LoginType = {
  loading: false,
  user: null,
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // lam theo cai ta return
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        console.log(action.error.message);
        if (action.error.message === "Request failed with status code 400") {
          state.error = "dang nhap that bai";
        } else {
          state.error = action.error.message as string; //ep kieu string
        }
      });
  },
});

export default userSlice.reducer;
