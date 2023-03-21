import React, { useState } from 'react';
import styles from "./FoodNavbar.module.css";


function FoodNavbar(props) {
    const [clickedIndex, setClickedIndex] = useState(0);

    function handleClick(index, filter) {
        setClickedIndex(index);
        props.handlefilter(filter);
    }

    return (
        <div className={styles.foodnavbar_container}>
            <p className={styles.resturant_count}>1296 resturants</p>
            <div className={styles.various_filters}>
                <p className={clickedIndex === 0 ? styles['clicked'] : ''} onClick={() => handleClick(0, 'RELEVANCE')}> Relevance</p>
                <p className={clickedIndex === 1 ? styles['clicked'] : ''} onClick={() => handleClick(1,'DELIVERY_TIME')}> Delivery Time</p>
                <p className={clickedIndex === 2 ? styles['clicked'] : ''} onClick={() => handleClick(2,'RATING')}>
                    Rating</p>
                <p className={clickedIndex === 3 ? styles['clicked'] : ''} onClick={() => handleClick(3,'COST_FOR_TWO')}>
                    Cost: Low To High</p>
                <p className={clickedIndex === 4 ? styles['clicked'] : ''} onClick={() => handleClick(4,'COST_FOR_TWO_H2L')}>
                    Cost: High To Low</p>
                {/* <p className={styles.filters}>
                    Filters 
                </p>
                <span><TuneOutlinedIcon fontSize='small' color='warning' /></span> */}
            </div>
        </div>
    )
}

export default FoodNavbar