import React, { Fragment, useState } from 'react';
import Caraousel from "../Caraousel/Caraousel";
import CardContainer from "../Allresturants/CardContainer";
import FoodNavbar from "../FilterBar/FoodNavbar";
// import Login from "../Login/Login";
// import Navbar from "../Navbar/Navbar";
// import Signup from "../Signup/Signup";

function Home() {
    // const [isLoginSidebarOpen, setIsLoginSidebarOpen] = useState(false);
    // const [isSignupSidebarOpen, setIsSignupSidebarOpen] = useState(false);
    const [filter, setFilter] = useState('RELEVANCE');
    // const handleLoginSidebarOpen = () => {
    //     document.body.classList.add("body-fixed");
    //     setIsLoginSidebarOpen(true);
    // }
    // const handleSignupSidebarOpen = () => {
    //     document.body.classList.add("body-fixed");
    //     setIsSignupSidebarOpen(true);
    // }
    // const handleLoginSidebarClose = () => {
    //     document.body.classList.remove("body-fixed");
    //     setIsLoginSidebarOpen(false);
    // }
    // const handleSignupSidebarClose = () => {
    //     document.body.classList.remove("body-fixed");
    //     setIsSignupSidebarOpen(false);
    // }

    return (
        <Fragment>
            {/* <div className={(isLoginSidebarOpen || isSignupSidebarOpen) ? "overlay" : ''}></div>
            <Navbar handleLoginOpen={handleLoginSidebarOpen} handleSignupOpen={handleSignupSidebarOpen} />
            <Signup />
            <Login />
            <Login isOpen={isLoginSidebarOpen} isClose={handleLoginSidebarClose} />
            <Signup isOpen={isSignupSidebarOpen} isClose={handleSignupSidebarClose} /> */}
            <Caraousel />
            <FoodNavbar handlefilter={setFilter} />
            <CardContainer filter={filter} />
        </Fragment>
    )
}

export default Home