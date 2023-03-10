import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import DishCard from '../DishCard/DishCard';
import styles from "../resturantDishes/ResturantsDishes.module.css";

function DishDropdown(props) {

    console.log(props);

    const { menu, dropdownHeading } = props;


    const [clickedDropdown, setclickedDropdown] = useState([]);

    const handleclickedDropdown = (index) => {
        !clickedDropdown.includes(index) ? setclickedDropdown(()=>[...clickedDropdown, index]) : setclickedDropdown(()=>{
            return clickedDropdown.filter((item)=>item!==index);
        })
    }
    return (
        <div className={styles.dishes_dropdown_container}>
            {dropdownHeading && dropdownHeading.map((heading, index) => {
                return (
                  heading.entities?.length ?(
                    <div className={styles.dish_dropdown} >
                        <div
                            className={styles.dish_heading}
                            key={index}
                            onClick={() => { handleclickedDropdown(index) }}
                        >
                            <p>{`${heading.name} ${heading.entities.length ? `(${heading.entities.length})` : ''}`}</p>
                            <span  >{clickedDropdown.includes(index) ? <IoIosArrowUp size={'25px'} /> : <IoIosArrowDown size={'25px'} />}</span>
                        </div >
                        {
                            clickedDropdown.includes(index) && heading.entities && heading.entities.map((dish, index) => {
                                return (
                                    <DishCard dishInfo={menu && menu[dish.id]} key={index} hideborder={index === heading.entities.length-1}/>
                                )
                            })
                        }
                    </div>):(<></>)
                )
            })}

        </div>
    )
}

export default DishDropdown