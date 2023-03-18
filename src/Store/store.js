import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';
import uiSlice from './uiSlice';

export const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        displayNavbar: uiSlice.reducer,
    },
})


export default store;