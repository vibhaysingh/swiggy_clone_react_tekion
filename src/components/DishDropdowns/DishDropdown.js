import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from "../../pages/RestaurantDishesPage/ResturantsDishes.module.css";
import Modal from "../Cart/Modal/Modal";
import DishCard from '../DishCard/DishCard';
import {viewCartImageLink} from "../../constants/constant";

function DishDropdown(props) {

    const { dropdownHeading, restaurantName, area, resturantImageId } = props;
    const [clickedDropdown, setclickedDropdown] = useState([]);
    const handleclickedDropdown = (index) => {
        !clickedDropdown.includes(index) ? setclickedDropdown(() => [...clickedDropdown, index]) : setclickedDropdown(() => {
            return clickedDropdown.filter((item) => item !== index);
        })
    }
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const totalAmount = useSelector((state) => state.cart.totalCartprice);
    const navigate = useNavigate();
    const handleCartPopup = () => {
        navigate("/cart");
    }
    const [showModal, setShowModal] = useState(false);


    let dropdownHeadingAndDishes = [];

    dropdownHeading.forEach((heading) => {

        let headingCard = heading.card.card;
        if (headingCard.title) {
            let dropdownHeadingAndDish = {};
            dropdownHeadingAndDish.title = headingCard.title;
            dropdownHeadingAndDish.dishInfo = [];
            if (headingCard.categories) {

                headingCard.categories.forEach((category) => {

                    if (category.itemCards) {

                        category.itemCards.forEach((item) => {
                            if (item.card.info) {
                                dropdownHeadingAndDish.dishInfo.push(item.card.info);
                            }
                        })
                    }
                })
            }
            else if (headingCard.itemCards) {

                headingCard.itemCards.forEach((item) => {

                    if (item.card.info) {
                        dropdownHeadingAndDish.dishInfo.push(item.card.info);
                    }
                })
            }
            dropdownHeadingAndDishes.push(dropdownHeadingAndDish);

        }
    })




    return (
        <div className={styles.dishes_dropdown_container}>


            {
                dropdownHeadingAndDishes && dropdownHeadingAndDishes.map((heading, index) => {


                    return (
                        heading.dishInfo.length > 0 &&
                        <div className={styles.dish_dropdown} key={index}>
                            <div
                                className={styles.dish_heading}
                                onClick={() => { handleclickedDropdown(index) }}

                            >
                                <p >{`${heading.title} ${"(" + heading.dishInfo.length + ")"}`}
                                </p>
                                <span key={index}>{clickedDropdown.includes(index) ? <IoIosArrowUp key={index} size={'25px'} /> : <IoIosArrowDown size={'25px'} />}</span>
                            </div >

                            {


                                clickedDropdown.includes(index) && heading.dishInfo.map((dish, index) => {
                                    return (
                                        <DishCard
                                            dishInfo={dish}
                                            key={index}
                                            hideborder={index === heading.dishInfo.length - 1} restaurantName={restaurantName}
                                            area={area}
                                            resturantImageId={resturantImageId}
                                            handleModalShow={setShowModal}
                                        />
                                    )
                                })
                            }
                        </div>)
                })
            }


            <div className={styles.cart_popup}
                onClick={handleCartPopup}
                style={{ bottom: totalQuantity ? '0' : '-50px' }}
            >
                <div className={styles.totalCartItems_and_totalCartPrice}>
                    <div>{totalQuantity}{" "}Item</div>
                    <div>|</div>
                    <div>₹{totalAmount}</div>
                </div>
                <div className={styles.viewCart}>
                    <div>View Cart</div>
                    <div>
                        <img src={viewCartImageLink} alt="" />
                    </div>
                </div>
            </div>
            {<Modal handleModalShow={setShowModal} showModal={showModal} />}
        </div>
    )
}

export default DishDropdown