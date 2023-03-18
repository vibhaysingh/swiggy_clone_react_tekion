import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartLogo from '../../assets/CartLogo';
import swiggyLogo from "../../assets/Swiggy Logo.png";
import styles from "./Navbar.module.css";

export default function Navbar(props) {
    const showNavbar = useSelector((state) => state.displayNavbar.showNavbar)
    const { handleLoginOpen, handleSignupOpen } = props;
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);

    return (
        <React.Fragment>
            <div className={styles.navbar} style={{visibility:showNavbar?'visible':'hidden'}}>
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
                    <button className={styles.login} onClick={handleLoginOpen}>Login</button>
                    <button className={styles.signup} onClick={handleSignupOpen}>Signup</button>

                </div>
            </div>
        </React.Fragment>
    )
}
