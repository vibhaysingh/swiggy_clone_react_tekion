import React from 'react'
import swiggyLogo  from "../assets/Swiggy Logo.png"
import styles from "./Navbar.module.css"

export default function Navbar() {
  
    function openSideBar(){
        console.log("first");
    }


    return (
        <React.Fragment>
            <div className={styles.navbar}>
                <div className={styles.swiggy_logo}>
                    <img src={swiggyLogo} alt="Swiggy-Logo"></img>
                </div>
                <div>
                    <button className={styles.login} onClick={openSideBar}>Login</button>
                    <button className={styles.signup} onClick={openSideBar}>Signup</button>
                </div>
            </div>
            
        </React.Fragment>
    )
}
