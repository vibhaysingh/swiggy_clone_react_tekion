import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartLogo from '../../assets/CartLogo';
import swiggyLogo from "../../assets/Swiggy Logo.png";
import { useAuth } from '../../Store/Context/AuthContext';
import { loginSidebarActions } from "../../Store/loginSidebarSlice";
import { signupSidebarActions } from "../../Store/signupSidebarSlice";
import styles from "./Navbar.module.css";

export default function Navbar(props) {
    const showNavbar = useSelector((state) => state.displayNavbar.showNavbar)
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
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


    return (
        <React.Fragment>
            <div className={styles.navbar} style={{ visibility: showNavbar ? 'visible' : 'hidden' }}>
                <div className={styles.swiggy_logo}>
                    <img src={swiggyLogo} alt="Swiggy-Logo"></img>
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
