import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DishCard from '../DishCard/DishCard';
import Modal from "../Cart/Modal/Modal"
import styles from "../resturantDishes/ResturantsDishes.module.css";

function DishDropdown(props) {
    const { menu, dropdownHeading, resturantName, area, resturantImageId } = props;
    const [clickedDropdown, setclickedDropdown] = useState([]);
    const handleclickedDropdown = (index) => {
        !clickedDropdown.includes(index) ? setclickedDropdown(() => [...clickedDropdown, index]) : setclickedDropdown(() => {
            return clickedDropdown.filter((item) => item !== index);
        })
    }
    const viewCartLink = "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_28,h_28/ChatbotAssets/Checkout_Cart";
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const totalAmount = useSelector((state) => state.cart.totalCartprice);
    const navigate = useNavigate();
    const handleCartPopup = () => {
        navigate("/cart");
    }
    const [showModal, setShowModal] = useState(false);
    return (
        <div className={styles.dishes_dropdown_container}>
            {dropdownHeading && dropdownHeading.map((heading, index) => {
                return (
                    heading.entities?.length ? (
                        <div className={styles.dish_dropdown} key={index}>
                            <div
                                className={styles.dish_heading}

                                onClick={() => { handleclickedDropdown(index) }}
                            >
                                <p>{`${heading.name} ${heading.entities.length ? `(${heading.entities.length})` : ''}`}</p>
                                <span  >{clickedDropdown.includes(index) ? <IoIosArrowUp size={'25px'} /> : <IoIosArrowDown size={'25px'} />}</span>
                            </div >
                            {
                                clickedDropdown.includes(index) && heading.entities && heading.entities.map((dish, index) => {
                                    return (
                                        <DishCard 
                                        dishInfo={menu && menu[dish.id]} 
                                        key={index} 
                                        hideborder={index === heading.entities.length - 1} resturantName={resturantName} 
                                        area={area} 
                                        resturantImageId={resturantImageId} 
                                        handleModalShow={setShowModal}
                                        />
                                    )
                                })
                            }
                        </div>) : (<></>)
                )
            })}
            <div className={styles.cart_popup}
                onClick={handleCartPopup}
                style={{bottom:totalQuantity?'0':'-50px'}}
            >
                <div className={styles.totalCartItems_and_totalCartPrice}>
                    <div>{totalQuantity}{" "}Item</div>
                    <div>|</div>
                    <div>₹{totalAmount}</div>
                </div>
                <div className={styles.viewCart}>
                    <div>View Cart</div>
                    <div>
                        <img src={viewCartLink} alt="" />
                    </div>
                </div>
            </div>
           {<Modal handleModalShow={setShowModal} showModal={showModal}/>}
        </div>
    )
}

export default DishDropdown