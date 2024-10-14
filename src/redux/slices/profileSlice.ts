import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import myAxios from "@setup/axiosConfig";

interface UserProfile {
  account_id: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  address: string | null;
  gender: string | null;
  dob: [number, number, number] | null;
  phone: string | null;
  avatar: string | null | undefined;
  locked: boolean | null;
  enable: boolean | null;
}

type ProfileType = {
  loading: boolean | null;
  user: UserProfile | null;
  error: string | null;
};
const initialState: ProfileType = {
  loading: false,
  user: null,
  error: null,
};

// Async thunk for fetching the user profile
export const userProfile = createAsyncThunk<UserProfile, void>("profile/UserProfile", async () => {
  try {
    const response = await myAxios.get(`https://souvi-be-v1.onrender.com/account/profile`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userProfile.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // lam theo cai ta return
        state.error = null;
      })
      .addCase(userProfile.rejected, (state, action) => {
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

export default profileSlice.reducer;
