import { createSlice } from '@reduxjs/toolkit';

const signupSideBarSlice = createSlice({
    name: 'signupSideBar',
    initialState: {
        isSignupSidebarOpen: false
    },
    reducers: {
        toggleSignupSidebarOpen(state, action) {
            state.isSignupSidebarOpen = !state.isSignupSidebarOpen;
        }

    }
})
export const signupSidebarActions = signupSideBarSlice.actions;
export default signupSideBarSlice;