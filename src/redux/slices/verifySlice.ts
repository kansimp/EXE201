import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const verifyUser = createAsyncThunk("user/verifyUser", async (data: string) => {
  const response = await axios.get(`https://souvi-be-v1.onrender.com/auth/activation?code=${data}`);
  return response.data.message;
});

const initialState = {
  message: "",
  isLoading: false,
  isError: false,
};

const verifySlice = createSlice({
  name: "verify",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = action.payload;
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.message = "Xác minh email không thành công !";
        state.isLoading = false;
        state.isError = true;
      });
  },
});
export default verifySlice.reducer;
