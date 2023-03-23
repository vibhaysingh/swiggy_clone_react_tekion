import React, { useState } from 'react';
import {filters,filterDisplayName} from "./restaurantsFilterBar.helper";
import styles from "./RestaurantsFilterBar.module.css";
function RestaurantsFilterBar(props) {
    const [clickedIndex, setClickedIndex] = useState(0);
    function handleClick(index, filter) {
        setClickedIndex(index);
        props.handlefilter(filter);
    }

    return (
        <div className={styles.restaurantFilterbarContainer}>
            <p className={styles.restaurantTotalCount}>1296 resturants</p>
            <div className={styles.filterButtons}>
                {filters.map((filter,index)=>{
                   return(
                       <p
                           className={clickedIndex === index ? styles.clicked : ''}
                           onClick={() => handleClick(index, filter)}
                           key={index}
                       >
                           {filterDisplayName[index]}
                       </p>
                   )
                })}
            </div>
        </div>
    )
}
export default RestaurantsFilterBar