// authSlice.ts
import { decodeToken } from "@components/utils/tokenUtils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  role: string | null;
}

const initialState: AuthState = {
  token: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<{ token: string }>) => {
      const decoded = decodeToken(action.payload.token);

      // Kiểm tra nếu token hợp lệ và chưa hết hạn
      if (decoded) {
        state.token = action.payload.token;
        state.role = decoded.role;
      } else {
        console.warn("Token không hợp lệ hoặc đã hết hạn");
        state.token = null;
        state.role = null;
      }
    },
    clearAuthData: (state) => {
      state.token = null;
      state.role = null;
    },
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;

export default authSlice.reducer;
