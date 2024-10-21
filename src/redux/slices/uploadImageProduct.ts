import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import myAxios from "@setup/axiosConfig";

interface ProductState {
  product: any;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  product: null,
  loading: false,
  error: null,
};

// Async thunk for uploading an image
export const uploadProductImage = createAsyncThunk(
  "profile/uploadUserImage",
  async (data: { productId: string; image: File }) => {
    const formData = new FormData();
    formData.append("picture_file ", data.image);
    const response = await myAxios.post(
      `https://souvi-be-v1.onrender.com/product/picture?productId=${data.productId}`,
      formData
    );
    return response.data;
  }
);

const UploadProductImageSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // Other reducers...
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadProductImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadProductImage.fulfilled, (state, action) => {
        state.loading = false;
        state.product = { ...state.product, avatar: action.payload.avatar }; // Update with new avatar URL
      })
      .addCase(uploadProductImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to upload image";
      });
  },
});

export default UploadProductImageSlice.reducer;
