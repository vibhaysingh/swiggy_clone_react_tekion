import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CartLogo from '../../assets/svgIcons/CartLogo';
import swiggyLogo from "../../assets/images/Swiggy Logo.png";
// import PayTekFoods from "../../assets/images/ayTekFoods"
import { useAuth } from '../../store/Context/AuthContext/AuthContext';
import { loginSidebarActions } from "../../store/Toolkit/slices/authSlice/loginSidebarSlice";
import { signupSidebarActions } from "../../store/Toolkit/slices/authSlice/signupSidebarSlice";
import styles from "./Navbar.module.css";

export default function Navbar(props) {
    const showNavbar = useSelector((state) => state.displayNavbar.showNavbar)
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    // const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    // const totalQuantity = JSON.parse(localStorage.getItem("totalQuantity"));
    const { currentUser, setCurrentUser } = useAuth();
    const [isGettingLoggedout, setisGettingLoggedout] = useState(false);

    const handleLogout = () => {

        setisGettingLoggedout(true);
        setTimeout(() => {

            setCurrentUser(null);
            localStorage.removeItem("currentUser");
            setisGettingLoggedout(false);
        }, 1500);

    }
    const dispatch = useDispatch();
    const handleLoginSidebarOpen = () => {
        dispatch(loginSidebarActions.toggleLoginSidebarOpen());
    }
    const handleSignupSidebarOpen = () => {

        dispatch(signupSidebarActions.toggleSignupSidebarOpen());
    }
    
    const navigate  = useNavigate();

    const handleNavigateToHomePage = ()=>{
        navigate("/");
    }

    return (
        <React.Fragment>
            <div className={styles.navbar} style={{ visibility: showNavbar ? 'visible' : 'hidden' }}>
                <div className={styles.swiggy_logo} onClick={handleNavigateToHomePage}>
                    <img src={'https://com-tekioncloud-cdms-global.s3.us-west-1.amazonaws.com/DMS/common/paytek.svg'} alt="Paytek-Logo"></img>
                </div>

                <div className={styles.nav_buttons}>
                    <div className={styles.cart_button}>
                        <Link className={styles.cart_button_link} to={"/cart"}>
                            <div className={styles.cart_logo}>
                                <CartLogo />
                                <span className={styles.cart_quantity}>{totalQuantity}</span>
                            </div>

                            <div className={styles.cart_text}>Cart</div>
                        </Link>
                    </div>
                    {!currentUser && <button className={styles.login} onClick={handleLoginSidebarOpen}>Login</button>}

                    {currentUser && <button className={styles.login} >{currentUser.userName}</button>}

                    {!currentUser && <button className={styles.signup} onClick={handleSignupSidebarOpen}>Signup</button>}

                    {currentUser && <button className={styles.signup} onClick={handleLogout}>{isGettingLoggedout ? 'Logging Out...' : 'Logout'}</button>}

                </div>
            </div>
        </React.Fragment>
    )
}
