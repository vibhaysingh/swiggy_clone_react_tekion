import React, { useState } from 'react';
import { FiMinus, FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Bestseller from '../../assets/svgIcons/Bestseller';
import VegIcons from '../../assets/svgIcons/VegIcons';
import { cartActions } from '../../store/Toolkit/slices/cartSlice/cartSlice';
import { getDishDetails } from './dishCard.helper';
import styles from "./DishCard.module.css";

function DishCard(props) {

    const { dishInfo, hideborder, area, restaurantName, resturantImageId, handleModalShow } = props;
    const resturantId = useParams().id;
    const resturantIdFromState = useSelector((state) => state.cart.resturantId);
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const [addAnimation, setAddAnimation] = useState(false);
    const { dishImageLink, dishPrice, isVeg, itemCount } = getDishDetails(dishInfo, cartItems);

    const addToCartHandler = (id, name, price) => {
        const newItem = {
            id: id,
            name: name,
            price: price,
            restaurantName: restaurantName,
            area: area,
            isVeg: isVeg,
            resturantImageId: resturantImageId,
            resturantId: resturantId
        };
        dispatch(cartActions.addItemToCart(newItem));
    }

    const removeFromCartHandler = (foodId) => {
        dispatch(cartActions.removeItemFromCart(foodId));
    }

    const handleAddButtonClick = () => {
        (!resturantIdFromState || resturantId === resturantIdFromState) && !itemCount && addToCartHandler(dishInfo.id, dishInfo.name, dishPrice);
        (!resturantIdFromState || resturantId === resturantIdFromState) && !itemCount && addAnimationHandler();
        resturantIdFromState && resturantId !== resturantIdFromState && handleModalShow((prevState) => !prevState);
    }

    const addAnimationHandler = () => {
        setAddAnimation((prevState) => !prevState);
        setTimeout(function () {
            setAddAnimation((prevState) => !prevState);
        }, 1000);
    }

    return (
        <div
            className={styles.dishCardContainer}
            style={hideborder ? { borderBottom: '0px' } : {}}
        >
            <div >
                <div >
                    <div
                        className={styles.vegNonvegBestseller}>
                        <VegIcons veg={isVeg} />
                        {dishInfo.isBestseller && <Bestseller />}
                    </div>
                    <p className={styles.dishName}> {
                        dishInfo.name}
                    </p>
                    <p className={styles.dishPrice}>
                        ₹ {dishPrice}
                    </p>
                    <p className={styles.dishDescription}>
                        {dishInfo?.description?.replace(/[[\]]/g, "")}
                    </p>
                </div>
            </div>
            <div className={styles.dishCardRightContent} >
                <img src={dishImageLink} alt="" />
                <div
                    className={`${styles.addButton} ${addAnimation ? styles.animation : ''}`}
                    style={{ cursor: !itemCount ? 'pointer' : 'default' }}
                    onClick={handleAddButtonClick}
                >
                    {itemCount &&
                        <span
                            className={`${styles.decreaseItemCount} ${addAnimation ? styles.animation : ''}`}
                            onClick={() => {
                                removeFromCartHandler(dishInfo.id);
                                addAnimationHandler();
                            }}
                        >
                            <FiMinus size={15} />
                        </span>}
                    <span
                        className={styles.cartCard_ItemCount}
                    >
                        {!itemCount ? 'ADD' : itemCount}
                    </span>

                    {itemCount &&
                        <span
                            className={`${styles.increaseItemCount} ${addAnimation ? styles.animation : ''}`}
                            onClick={() => {
                                addToCartHandler(dishInfo.id, dishInfo.name, dishPrice);
                                addAnimationHandler();
                            }}
                        >
                            <FiPlus size={15} />
                        </span>}
                </div>
            </div>
        </div >
    )
}

export default DishCard

