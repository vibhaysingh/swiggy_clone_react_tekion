import { createSlice } from '@reduxjs/toolkit';
import _ from "lodash";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        totalQuantity: 0,
        totalCartprice: 0,
        resturantId: null,
    },
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = _.find(state.items, (item) => item.id === newItem.id);
            state.totalQuantity++;
            state.totalCartprice += newItem.price;
            if (!state.resturantId)
                state.resturantId = newItem.resturantId;
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    name: newItem.name,
                    price: newItem.price,
                    quantity: 1,
                    restaurantName: newItem.restaurantName,
                    area: newItem.area,
                    totalPrice: newItem.price,
                    isVeg: newItem.isVeg,
                    resturantImageId: newItem.resturantImageId
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
            localStorage.setItem('cartItems', JSON.stringify(state.items));
            localStorage.setItem('totalQuantity', JSON.stringify(state.totalQuantity));
            localStorage.setItem('totalCartprice', JSON.stringify(state.totalCartprice));
            localStorage.setItem('resturantId', JSON.stringify(state.resturantId));

            
        },
        removeItemFromCart(state, action) {
            const id = action.payload;
            const existingItem = _.find(state.items, (item) => item.id === id);
            state.totalQuantity--;
            state.totalCartprice -= existingItem.price;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter((item) => item.id !== id);
            } else {
                existingItem.quantity--;
            }
            localStorage.setItem('cartItems', JSON.stringify(state.items));
            localStorage.setItem('totalQuantity', JSON.stringify(state.totalQuantity));
            localStorage.setItem('totalCartprice', JSON.stringify(state.totalCartprice));
            localStorage.setItem('resturantId', JSON.stringify(state.resturantId));
        },
        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalCartprice = 0;
            state.resturantId = null;
            localStorage.removeItem('cartItems', JSON.stringify(state.items));
            localStorage.setItem('totalQuantity', JSON.stringify(state.totalQuantity));
            localStorage.removeItem('totalCartprice', JSON.stringify(state.totalCartprice));
            localStorage.removeItem('resturantId', JSON.stringify(state.resturantId));
        },
        initCart(state,action){
            state.items = action.payload.cartItems||[];
            state.totalQuantity = action.payload.totalQuantity||0;
            state.totalCartprice = action.payload.totalCartprice||0;
            state.resturantId = action.payload.resturantId||null;
        }
    }

});

export const cartActions = cartSlice.actions;
export default cartSlice;
