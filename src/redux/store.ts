import { configureStore } from '@reduxjs/toolkit';
import addressReducer from './slices/addressSlice';
import registerReducer from './slices/registerSlice';
import userReducer from './slices/userSlice';
import verifyReducer from './slices/verifySlice';
import profileReducer from './slices/profileSlice';
import sendEmailResetPasswordReducer from './slices/sendEmailSlice';
import sidebarReducer from './slices/sidebarSlice';
import changePasswordReducer from './slices/changePassWord';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
    reducer: {
        address: addressReducer,
        register: registerReducer,
        user: userReducer,
        verify: verifyReducer,
        profile: profileReducer,
        sendEmail: sendEmailResetPasswordReducer,
        sidebar: sidebarReducer,
        changePassword: changePasswordReducer,
        cart: cartReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
