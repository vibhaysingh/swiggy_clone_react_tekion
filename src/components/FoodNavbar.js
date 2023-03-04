import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import React, { useState } from 'react';
import styles from "./FoodNavbar.module.css";


function FoodNavbar() {
    const [clickedIndex, setClickedIndex] = useState(0);

    function handleClick(index) {
        setClickedIndex(index);
    }

    return (
        <div className={styles.foodnavbar_container}>
            <p className={styles.resturant_count}>1296 resturants</p>
            <p className={styles.various_filters}>
                <p className={clickedIndex === 0 ? styles['clicked'] : ''} onClick={() => handleClick(0)}> Relevance</p>
                <p className={clickedIndex === 1 ? styles['clicked'] : ''} onClick={() => handleClick(1)}> Delivery Time</p>
                <p className={clickedIndex === 2 ? styles['clicked'] : ''} onClick={() => handleClick(2)}>
                    Rating</p>
                <p className={clickedIndex === 3 ? styles['clicked'] : ''} onClick={() => handleClick(3)}>
                    Cost: Low To High</p>
                <p className={clickedIndex === 4 ? styles['clicked'] : ''} onClick={() => handleClick(4)}>
                    Cost: High To Low</p>
                <p className={styles.filters}>
                    Filters 
                </p>
                <span><TuneOutlinedIcon fontSize='small' color='warning' /></span>
            </p>
        </div>
    )
}

export default FoodNavbar