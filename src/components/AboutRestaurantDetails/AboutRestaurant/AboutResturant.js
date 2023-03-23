import StarRateIcon from '@mui/icons-material/StarRate';
import React from 'react';
// import styles from "../../pages/RestaurantDishesPage/ResturantsDishes.module.css";
import styles from "./AboutResturant.module.css";

function AboutResturant(props) {
    const { restaurantName, avgRating, ratingCount, cuisines, area } = props;

    return (restaurantName &&
        (<div className={styles.restaurantInfoContainer}>
            <div>
                <p className={styles.restaurantName} >
                    {restaurantName}
                </p>
                <p className={styles.resturantCuisine}>
                    {cuisines && cuisines.map((cuisine, index) => cuisine + (index < cuisines.length - 1 ? ', ' : ''))}
                </p>
                <p className={styles.resturantLocation}>
                    {area}
                </p>
            </div>
            <div className={styles.restaurantRatingContainer}>
                <div className={styles.rating}>
                    <span>
                        <StarRateIcon style={{ fontSize: "19px" }} />
                    </span>
                    <span >{avgRating}</span>
                </div>
                <div className={styles.ratingCount}>
                    {ratingCount}
                </div>
            </div>
        </div>)
    )
}
export default AboutResturant