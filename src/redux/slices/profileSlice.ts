// src/redux/userSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UserProfile {
  account_id: string;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  gender: string;
  dob: [number, number, number];
  phone: string;
  avatar: string;
  locked: boolean;
  enable: boolean;
}

interface UserState {
  profile: UserProfile | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Initial state
const initialState: UserState = {
  profile: null,
  status: "idle",
  error: null,
};

// Async thunk for fetching the user profile
export const UserProfile = createAsyncThunk<UserProfile, string>("user/UserProfile", async (userId, thunkAPI) => {
  try {
    const response = await axios.get(`/api/users/${userId}`);
    return response.data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const profileSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(UserProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(UserProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(UserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default profileSlice.reducer;
