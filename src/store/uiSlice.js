import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'displayNavbar',
    initialState: {
        showNavbar: true,
    },
    reducers:{
        toggleNavbar(state,action){
            state.showNavbar = action.payload;
        }
    }
})
export const cartActionsUI = uiSlice.actions;
export default uiSlice;