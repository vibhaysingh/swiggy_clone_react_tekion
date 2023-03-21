import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';
import loginSidebarSlice from "./loginSidebarSlice";
import signupSidebarSlice from "./signupSidebarSlice";
import uiSlice from './uiSlice';

export const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        displayNavbar: uiSlice.reducer,
        loginSideBar: loginSidebarSlice.reducer,
        signupSideBar: signupSidebarSlice.reducer
    },
})


export default store;