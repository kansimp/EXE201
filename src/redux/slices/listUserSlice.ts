import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import myAxios from "@setup/axiosConfig";

type UserType = {
  email: string;
  address: string;
  gender: string | null;
  phone: string;
  avatar: string;
  account_id: string;
  first_name: string;
  last_name: string;
  is_locked: boolean;
  is_enable: boolean;
  role_id: number;
  role_name: string;
  shop_id: string | null;
  shop_name: string | null;
};

export const getAllUsers = createAsyncThunk("user/getAllUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await myAxios.get(
      `https://souvi-be-v1.onrender.com/admin/account-list?pageNo=0&pageSize=10&sortBy=SORT_BY_DATE_DESC&role=BUYER`
    );
    return response.data.content;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

type UserState = {
  loading: boolean;
  users: UserType[] | null;
  error: string | null;
};

const initialState: UserState = {
  loading: false,
  users: null,
  error: null,
};

const ListUserSlice = createSlice({
  name: "listUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.users = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.users = null;
      });
  },
});

export default ListUserSlice.reducer;
