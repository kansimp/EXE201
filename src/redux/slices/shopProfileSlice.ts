import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import myAxios from "@setup/axiosConfig";

export type ShopProfile = {
  contact: string | null | undefined;
  description: string | null;
  address: string | null;
  shop_id: number | null;
  shop_name: string | null;
  reputation: number | null;
  shop_avatar: string | null | undefined;
  is_locked: boolean | null;
  enable: boolean | null;
  created_date: number;
};

type ProfileType = {
  loading: boolean | null;
  user: ShopProfile | null;
  error: string | null;
};
const initialState: ProfileType = {
  loading: false,
  user: null,
  error: null,
};

// Async thunk for fetching the user profile
export const shopProfile = createAsyncThunk<ShopProfile, { shopId: number | undefined }>(
  "profile/ShopProfile",
  async ({ shopId }, thunkAPI) => {
    try {
      const response = await myAxios.get(`https://souvi-be-v1.onrender.com/shop/get?shopId=${shopId}`);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching user profile:", error);
      return thunkAPI.rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

const shopProfileSlice = createSlice({
  name: "Shopprofile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(shopProfile.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(shopProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // lam theo cai ta return
        state.error = null;
      })
      .addCase(shopProfile.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        console.log(action.error.message);
        if (action.error.message === "Request failed with status code 400") {
          state.error = " that bai";
        } else {
          state.error = action.error.message as string; //ep kieu string
        }
      });
  },
});

export default shopProfileSlice.reducer;
