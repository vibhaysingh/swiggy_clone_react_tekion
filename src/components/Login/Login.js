import React from 'react'
import sidebar_image from "../../assets/sidebar_food.png"
import styles from "./Login.module.css"

function Login(props) {
    return (
        <div className={`${styles.sidenav} ${props.isOpen ? styles['drawer_open'] : ''}`}>
            <div className={styles.cross} onClick={props.isClose}></div>
            <p className={styles.navlogin}>Login</p>
            <p className={styles.create_acc}><span>or</span><a href="true"> create an account</a></p>
            <div className={styles.loginFood}><img src={sidebar_image} alt='' /></div>
            <div className={styles.loginInput}><input type="text" placeholder="Phone Number" /></div>
            <div className={styles.loginButton}><button>LOGIN</button></div>
            <div className={styles.terms}>By clicking on Login, I accept the <strong>Terms &amp; Conditions</strong> &amp; <strong> Privacy Policy </strong>
            </div>
        </div>

    )
}

export default Login