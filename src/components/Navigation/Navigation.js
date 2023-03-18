import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Login from "../Login/Login";
import Navbar from "../Navbar/Navbar";
import Signup from "../Signup/Signup";
import { cartActionsUI } from "../../Store/uiSlice";

function Navigation() {


    const location = useLocation();
    const dispatch = useDispatch();


    useEffect(() => {
        // Retrieve the URL path from the `location` object
        const path = location.pathname;

        // Update state depending on the URL path
        if (path === '/orderConfirmed') {
            dispatch(cartActionsUI.toggleNavbar(false));
        }
        else{
            dispatch(cartActionsUI.toggleNavbar(true));
        }
    }, [location]);

    const [isLoginSidebarOpen, setIsLoginSidebarOpen] = useState(false);
    const [isSignupSidebarOpen, setIsSignupSidebarOpen] = useState(false);
    const handleLoginSidebarOpen = () => {
        document.body.classList.add("body-fixed");
        setIsLoginSidebarOpen(true);
    }
    const handleSignupSidebarOpen = () => {
        document.body.classList.add("body-fixed");
        setIsSignupSidebarOpen(true);
    }
    const handleLoginSidebarClose = () => {
        document.body.classList.remove("body-fixed");
        setIsLoginSidebarOpen(false);
    }
    const handleSignupSidebarClose = () => {
        document.body.classList.remove("body-fixed");
        setIsSignupSidebarOpen(false);
    }

    return (
        <Fragment>
            <div className={(isLoginSidebarOpen || isSignupSidebarOpen) ? "overlay" : ''}></div>
            <Navbar handleLoginOpen={handleLoginSidebarOpen} handleSignupOpen={handleSignupSidebarOpen} />
            <Signup />
            <Login />
            <Login isOpen={isLoginSidebarOpen} isClose={handleLoginSidebarClose} />
            <Signup isOpen={isSignupSidebarOpen} isClose={handleSignupSidebarClose} />
        </Fragment>
    )
}

export default Navigation