import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { cartActionsUI } from "../../Store/uiSlice";
import Login from "../Login/Login";
import Navbar from "../Navbar/Navbar";
import Signup from "../Signup/Signup";
import {addFixedBody} from "../../utils/fixedBody.helper";
import {removeFixedBody} from "../../utils/fixedBody.helper";
function Navigation() {
    const location = useLocation();
    const dispatch = useDispatch();
    const isLoginSidebarOpen = useSelector((state) => state.loginSideBar).isLoginSidebarOpen;
    const isSignupSidebarOpen = useSelector((state) => state.signupSideBar).isSignupSidebarOpen;
    const homePageOverlay = "overlay";
    const orderConfirmedPath="/orderConfirmed";

    useEffect(() => {
        const currentPath = location.pathname;
        if (currentPath === orderConfirmedPath) {
            dispatch(cartActionsUI.toggleNavbar(false));
        }
        else {
            dispatch(cartActionsUI.toggleNavbar(true));
        }
    }, [location]);

    useEffect(() => {
        if(isLoginSidebarOpen||isSignupSidebarOpen){
            addFixedBody();
        }
        else{
            removeFixedBody();
        }
    }, [isLoginSidebarOpen, isSignupSidebarOpen])
    
    return (
        <Fragment>
            <div className={(isLoginSidebarOpen || isSignupSidebarOpen) ? homePageOverlay : ''}></div>
            <Navbar />
            <Login />
            <Signup />
        </Fragment>
    )
}
export default Navigation