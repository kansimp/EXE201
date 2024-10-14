// profileSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import myAxios from "@setup/axiosConfig";

interface ProfileState {
  user: any;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  user: null,
  loading: false,
  error: null,
};

// Async thunk for uploading an image
export const uploadUserImage = createAsyncThunk(
  "profile/uploadUserImage",
  async (data: { userId: string; image: File }) => {
    const formData = new FormData();
    formData.append("profile_pic", data.image);
    const response = await myAxios.post(`https://souvi-be-v1.onrender.com/account/image?id=${data.userId}`, formData);
    return response.data;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // Other reducers...
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadUserImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadUserImage.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, avatar: action.payload.avatar }; // Update with new avatar URL
      })
      .addCase(uploadUserImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to upload image";
      });
  },
});

export default profileSlice.reducer;
