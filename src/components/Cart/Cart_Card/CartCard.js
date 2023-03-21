import React from 'react';
import { FiMinus, FiPlus } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import VegIcons from '../../../assets/VegIcons';
import { cartActions } from '../../../Store/cartSlice';
import styles from "./CartCard.module.css";
function CartCard(props) {

    const dispatch = useDispatch();
    const { dishName, quantity, price, id } = props;
    const addToCartHandler = (id, name, price) => {
        const newItem = {
            id: id,
            name: name,
            price: +price,
        };
        dispatch(cartActions.addItemToCart(newItem));
    }

    const removeFromCartHandler = (foodId) => {
        dispatch(cartActions.removeItemFromCart(foodId));
    }
    return (

        <div className={styles.cartCard_container}>
            <div className={styles.veg_nonVeg}> <VegIcons veg={true} />
            </div>
            <div className={styles.cartCard_ItemName}>
                {dishName}
            </div>
            <div className={styles.add_button}
            >
                <span
                    className={styles.cartCard_decreaseItemCount} style={{ color: 'grey' }}
                    onClick={() => removeFromCartHandler(id)}
                ><FiMinus size={15} /></span>
                <span className={styles.cartCard_ItemCount}> {quantity}</span>
                <span className={styles.cartCard_increaseItemCount}
                    onClick={() => addToCartHandler(id, dishName, price)}
                    style={{ color: 'green' }}
                ><FiPlus size={15} /></span>
            </div>
            <div className={styles.cartCard_price}>₹{price * quantity} </div>
        </div>
    )
}

export default CartCard