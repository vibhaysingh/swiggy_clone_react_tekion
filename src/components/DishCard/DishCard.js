import React, { useState } from 'react';
import { FiMinus, FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Bestseller from '../../assets/Bestseller';
import fallBackImage from '../../assets/Placeholder.png';
import VegIcons from '../../assets/VegIcons';
import { cartActions } from '../../Store/cartSlice';
import styles from "../resturantDishes/ResturantsDishes.module.css";

function DishCard(props) {
    const resturantId = useParams().id;
    const resturantIdFromState = useSelector((state) => state.cart.resturantId);
    const cartItems = useSelector((state) => state.cart.items);
    const { dishInfo, hideborder, area, resturantName, resturantImageId, handleModalShow } = props;
    const dishImageLink = dishInfo.cloudinaryImageId ? (`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${dishInfo.cloudinaryImageId}`) : fallBackImage;
    const dishPrice = Math.max(dishInfo.price ? dishInfo.price / 100 : 0, dishInfo.defaultPrice ? dishInfo.defaultPrice / 100 : 0);
    const isVeg = dishInfo.isVeg === 1;
    const dispatch = useDispatch();
    const [isAddVisible, setisAddVisible] = useState(true);
    // const [itemCount, setitemCount] = useState(0);
    const itemCount = cartItems?.find((item) => item.id === dishInfo.id)?.quantity;
    const [addAnimation, setaddAnimation] = useState(false);


    const addToCartHandler = (id, name, price) => {
        const newItem = {
            id: id,
            name: name,
            price: price,
            resturantName: resturantName,
            area: area,
            isVeg: isVeg,
            resturantImageId: resturantImageId,
            resturantId: resturantId
        };
        dispatch(cartActions.addItemToCart(newItem));
    }

    const removeFromCartHandler = (foodId) => {

        dispatch(cartActions.removeItemFromCart(foodId));
        if (itemCount === 1) {
            setisAddVisible((prevState) => !prevState);
        }
     

    }
    // itemCount && setisAddVisible(true);
    console.log(itemCount);

    const handleAddVisible = () => {
        setisAddVisible((prevState) => !prevState)
    }

    const addAnimationHandler = () => {
        setaddAnimation((prevState) => !prevState);
        setTimeout(function () {
            setaddAnimation((prevState) => !prevState);
        }, 1000)
    }

    return (
        <div
            className={styles.dish_card_container}
            style={hideborder ? { borderBottom: '0px' } : {}}
        >
            <div className={styles.dish_card_content}>
                <div className={styles.dish_card_left_content}>
                    <div
                        className={styles.veg_nonVeg_bestseller}>
                        <VegIcons veg={isVeg} />
                        {dishInfo.isBestSeller && <Bestseller />}
                    </div>
                    <p className={styles.dish_name}> {dishInfo.name}</p>
                    <p className={styles.dish_price}>₹ {dishPrice}</p>
                    <p className={styles.dish_description}>{dishInfo.description.replace(/[\[\]]/g, "")}</p>
                </div>
            </div>
            <div className={styles.dish_card_right_content} >
                <img src={dishImageLink} alt="dishImage" />
                <div
                    className={`${styles['add_button']} ${addAnimation ? styles['animation'] : ''}`}
                    style={{ cursor: isAddVisible ? 'pointer' : 'default' }}
                    onClick={() => {
                       
                        (!resturantIdFromState || resturantId === resturantIdFromState) && !itemCount && handleAddVisible();
                        (!resturantIdFromState || resturantId === resturantIdFromState) && !itemCount && addToCartHandler(dishInfo.id, dishInfo.name, dishPrice);
                        (!resturantIdFromState || resturantId === resturantIdFromState) && !itemCount && addAnimationHandler();

                        resturantIdFromState && resturantId !== resturantIdFromState && handleModalShow((prevState) => !prevState);
                    }}
                >
                    {itemCount && <span
                        style={{ color: 'grey', cursor: 'pointer' }}
                        className={`${styles['cartCard_decreaseItemCount']} ${addAnimation ? styles['animation'] : ''}`}
                        onClick={() => {
                            removeFromCartHandler(dishInfo.id);
                            addAnimationHandler();
                        }}
                    ><FiMinus size={15} /></span>}
                    <span
                        className={styles.cartCard_ItemCount}
                    >
                        {!itemCount ? 'ADD' : itemCount}
                    </span>

                    {itemCount && <span

                        className={`${styles['cartCard_decreaseItemCount']} ${addAnimation ? styles['animation'] : ''}`}
                        style={{ color: 'green', cursor: 'pointer' }}
                        onClick={() => {
                            addToCartHandler(dishInfo.id, dishInfo.name, dishPrice);
                            addAnimationHandler();
                        }}
                    >
                        <FiPlus size={15} /></span>}
                </div>
            </div>
        </div >
    )
}

export default DishCard

