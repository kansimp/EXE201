import { configureStore } from '@reduxjs/toolkit';
import addressReducer from './slices/addressSlice';
import registerReducer from './slices/registerSlice';
import userReducer from './slices/userSlice';
import verifyReducer from './slices/verifySlice';

export const store = configureStore({
    reducer: {
        address: addressReducer,
        register: registerReducer,
        user: userReducer,
        verify: verifyReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
