import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [], 
        totalQuantity: 0,
        totalCartprice:0,
    },
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === newItem.id);
            state.totalQuantity++;
            state.totalCartprice+=newItem.price;
            if (!existingItem) {
                state.items.push({

                    id: newItem.id,
                    name: newItem.name,
                    price: newItem.price,
                    quantity: 1,
                    resturantName: newItem.resturantName,
                    area: newItem.area,
                    totalPrice: newItem.price,
                    isVeg:newItem.isVeg,
                    resturantImageId: newItem.resturantImageId

                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        },
        removeItemFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
            state.totalQuantity--;
            state.totalCartprice-=existingItem.price;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter((item) => item.id !== id);
            } else {
                existingItem.quantity--;
            }
        },
    }

});

export const cartActions = cartSlice.actions;
export default cartSlice;