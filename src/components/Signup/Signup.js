import React, {useState} from 'react'
import sidebar_food from "../../assets/sidebar_food.png"
import styles from "./Signup.module.css"

function Signup(props) {
    return (
        <div className={`${styles.sidenav} ${props.isOpen ? styles['drawer_open'] : ''}`}>
            <div className={styles.cross} onClick={props.isClose}></div>
            <p className={styles.navSignup}>
                Sign up
            </p>
            <p className={styles.signup_acc}>
                <span>or </span><a href="true"> login to your account</a>
            </p>
            <div className={styles.signupfood}>
                <img src={sidebar_food} alt="" />
            </div>
            <div className={`${styles.signupinput} ${styles.input1}`}>
                <input type="text" placeholder="Phone Number" />
            </div>
            <div className={`${styles.signupinput} ${styles.input2}`}>
                <input type="text" placeholder="Name" />
            </div>
            <div className={`${styles.signupinput} ${styles.input3}`}>
                <input type="text" placeholder="Email" />
            </div>
            <p className={styles.referral}>
                Have a referral code?
            </p>
            <div className={styles.signupbutton}>
                <button>CONTINUE</button>
            </div>
            <div className={styles.signup_terms}>
                By creating an account, I accept the <strong>Terms &amp; Conditions</strong> &amp;<strong>Privacy Policy</strong>
            </div>

        </div>
    )
}

export default Signup