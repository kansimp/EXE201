import { configureStore } from "@reduxjs/toolkit";
import addressReducer from "./slices/addressSlice";
import registerReducer from "./slices/registerSlice";
import userReducer from "./slices/userSlice";
import verifyReducer from "./slices/verifySlice";
import profileReducer from "./slices/profileSlice";
import sendEmailResetPasswordReducer from "./slices/sendEmailSlice";
import sidebarReducer from "./slices/sidebarSlice";
import changePasswordReducer from "./slices/changePassWord";
import cartReducer from "./slices/cartSlice";
import postReducer from "./slices/postSlice";
import postDetailReducer from "./slices/postdetailSlice";
import listUserReducer from "./slices/listUserSlice";
import wishListReducer from "./slices/wishlistSlice";
import authTokenReducer from "./slices/AuthTokenSlice";
import searchReducer from "./slices/searchSlice";
import categoryReducer from "./slices/categorySlice";
import OrderReducer from "./slices/orderSlice";
import paymentReducer from "./slices/paymentSlice";
import postShopReducer from "./slices/postShopSlice";
import shopProfileReducer from "./slices/shopProfileSlice";
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
    post: postReducer,
    postDetail: postDetailReducer,
    listUser: listUserReducer,
    wishlist: wishListReducer,
    authToken: authTokenReducer,
    search: searchReducer,
    category: categoryReducer,
    order: OrderReducer,
    payment: paymentReducer,
    postShop: postShopReducer,
    shopProfile: shopProfileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
