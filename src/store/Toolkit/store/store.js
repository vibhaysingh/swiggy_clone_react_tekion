import { configureStore } from '@reduxjs/toolkit';
import cartSlice from '../slices/cartSlice/cartSlice';
import loginSidebarSlice from "../slices/authSlice/loginSidebarSlice";
import signupSidebarSlice from "../slices/authSlice/signupSidebarSlice";
import toggleNavbarSlice from '../slices/toggleNavbarSlice/toggleNavbarSlice';

export const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        displayNavbar: toggleNavbarSlice.reducer,
        loginSideBar: loginSidebarSlice.reducer,
        signupSideBar: signupSidebarSlice.reducer
    },
})


export default store;