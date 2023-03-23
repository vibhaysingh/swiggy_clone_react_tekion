import React from 'react';
import { useNavigate } from 'react-router-dom';
import emptyCartLink from '../../../assets/images/emptyCart.png';
import styles from './EmptyCart.module.css';
function EmptyCart() {

    const navigate = useNavigate();
    const redirectHandler = () => {
        navigate("/");
    }
   
    return (
        <div className={styles.emptyCart_container}>
            <div className={styles.emptyCart_image}>
                <img src={emptyCartLink} alt="" />
            </div>
            <div className={styles.yourEmptyCart}>Your Cart is Empty</div>
            <div className={styles.goHome}>You can go to home page to view more restaurants</div>

            <div className={styles.goBackHomeButton} onClick={redirectHandler}>
                See restaurants near you
            </div>
        </div>
    )
}

export default EmptyCart