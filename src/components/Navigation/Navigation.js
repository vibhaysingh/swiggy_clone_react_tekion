import React, { Fragment, useState } from 'react';
import Login from "../Login/Login";
import Navbar from "../Navbar/Navbar";
import Signup from "../Signup/Signup";

function Navigation() {
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