import React from 'react';
import { useDispatch } from 'react-redux';
import { cartActions } from "../../../store/cartSlice";
import Backdrop from '../Backdrop/Backdrop';
import styles from "./Modal.module.css";

function Modal(props) {
    const { handleModalShow, showModal } = props;
    const dispatch = useDispatch();
    const handleClickNo = () => {
        handleModalShow((prevState) => !prevState);
    }
    const handleClickYes = () => {
        dispatch(cartActions.clearCart());
        handleModalShow((prevState) => !prevState);
    }
    return (
        <>
            <div className={styles.modalContainer} style={{ bottom: showModal ? '8%' : '-25%' }}>
                <div className={styles.itemInTheCart}>
                    Items already in cart

                </div>
                <div className={styles.itemInTheCartDescription}>
                    Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?
                </div>
                <div className={styles.modalButtons}>
                    <div className={styles.noButton}
                        onClick={handleClickNo}
                    >NO
                    </div>
                    <div
                        onClick={handleClickYes}
                        className={styles.yesButton}>Yes, Start Afresh</div>
                </div>
               
            </div>
           {showModal&& <Backdrop handleModalShow={handleModalShow} />}
        </>


    );
}

export default Modal;