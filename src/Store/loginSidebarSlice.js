import { createSlice } from '@reduxjs/toolkit';

const loginSideBarSlice = createSlice({
    name: 'loginSideBar',
    initialState: {
        isLoginSidebarOpen: false
    },
    reducers: {
        toggleLoginSidebarOpen(state, action) {
            state.isLoginSidebarOpen = !state.isLoginSidebarOpen;
        }
        
    }
})
export const loginSidebarActions = loginSideBarSlice.actions;
export default loginSideBarSlice;