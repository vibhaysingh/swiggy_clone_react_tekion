import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { cartActionsUI } from "../../Store/uiSlice";
import Login from "../Login/Login";
import Navbar from "../Navbar/Navbar";
import Signup from "../Signup/Signup";

function Navigation() {
    const location = useLocation();
    const dispatch = useDispatch();
    const isLoginSidebarOpen = useSelector((state) => state.loginSideBar).isLoginSidebarOpen;
    const isSignupSidebarOpen = useSelector((state) => state.signupSideBar).isSignupSidebarOpen;

    useEffect(() => {
        const path = location.pathname;
        if (path === '/orderConfirmed') {
            dispatch(cartActionsUI.toggleNavbar(false));
        }
        else {
            dispatch(cartActionsUI.toggleNavbar(true));
        }
    }, [location]);

    useEffect(() => {
      
        if(isLoginSidebarOpen||isSignupSidebarOpen){
            document.body.classList.add("body-fixed");
        }
        else{
            document.body.classList.remove("body-fixed");
        }
    
    }, [isLoginSidebarOpen, isSignupSidebarOpen])
    
    return (
        <Fragment>
            <div className={(isLoginSidebarOpen || isSignupSidebarOpen) ? "overlay" : ''}></div>
            <Navbar />
            <Login />
            <Signup />
        </Fragment>
    )
}

export default Navigation