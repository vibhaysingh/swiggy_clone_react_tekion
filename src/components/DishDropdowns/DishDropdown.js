import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { viewCartImageLink } from "../../constants/constant";
import styles from "./DishDropdown.module.css"
import Modal from "../Modal/Modal";
import DishCard from '../DishCard/DishCard';
import { addToCartBottomPopup, getDropdownHeadingAndDishes } from './dishdropdown.helper';

function DishDropdown(props) {
    const { dropdownHeading, restaurantName, area, resturantImageId } = props;
    const [clickedDropdown, setclickedDropdown] = useState([]);
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const totalAmount = useSelector((state) => state.cart.totalCartprice);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleClickedDropdown = (index) => {
        !clickedDropdown.includes(index) ? setclickedDropdown(() => [...clickedDropdown, index]) : setclickedDropdown(() => {
            return clickedDropdown.filter((item) => item !== index);
        })
    }
    const handleCartPopup = () => {
        navigate("/cart");
    }
    const dropdownHeadingAndDishes = getDropdownHeadingAndDishes(dropdownHeading);
    return (
        <div>
            {
                dropdownHeadingAndDishes && dropdownHeadingAndDishes.map((heading, index) => {
                    return (
                        heading.dishInfo.length > 0 &&
                        <div className={styles.dishDropdown} key={index}>
                            <div
                                className={styles.dishHeading}
                                onClick={() => { handleClickedDropdown(index) }}
                            >
                                <p>
                                    {`${heading.title} ${"(" + heading.dishInfo.length + ")"}`}
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
            {addToCartBottomPopup(handleCartPopup, totalQuantity, totalAmount, viewCartImageLink, styles)}
            {<Modal handleModalShow={setShowModal} showModal={showModal} />}
        </div>
    )
}

export default DishDropdown
