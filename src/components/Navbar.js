import React from 'react'
import swiggyLogo  from "../assets/Swiggy Logo.png"
import styles from "./Navbar.module.css"

export default function Navbar(props) {
    
    const{handleLoginOpen,handleSignupOpen}=props;


    return (
        <React.Fragment>
            <div className={styles.navbar}>
                <div className={styles.swiggy_logo}>
                    <img src={swiggyLogo} alt="Swiggy-Logo"></img>
                </div>
                <div>
                    <button className={styles.login} onClick={handleLoginOpen}>Login</button>
                    <button className={styles.signup} onClick={handleSignupOpen}>Signup</button>
                </div>
            </div>           
        </React.Fragment>
    )
}
