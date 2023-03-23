import { createSlice } from '@reduxjs/toolkit';

const toggleNavbarSlice = createSlice({
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
export const toggleNavbarActions = toggleNavbarSlice.actions;
export default toggleNavbarSlice;