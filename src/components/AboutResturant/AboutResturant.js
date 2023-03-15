import StarRateIcon from '@mui/icons-material/StarRate';
import React from 'react';
import styles from "../resturantDishes/ResturantsDishes.module.css";

function AboutResturant(props) {

    const { resturantName, avgRating, ratingCount, cuisines, area } = props;

    return (resturantName &&
        (<div className={styles.resturant_info}>
            <div className={styles.resturant_name_info}>
                <p className={styles.resturant_name} >
                    {resturantName }
                </p>
                <p className={styles.resturant_cuisine}>
                    {cuisines && cuisines.map((cuisine, index) => cuisine + (index < cuisines.length - 1 ? ', ' : ''))}
                </p>
                <p className={styles.resturant_location}> {area}
                </p>
            </div>
            <div className={styles.resturat_rating_container}>
                <div className={styles.rating}>
                    <span className={styles.star_icon}><StarRateIcon style={{
                        fontSize: '20px',
                        color: '#3d9b6d',
                        fontWeight: '700'
                    }} /></span>
                    <span className={styles.rating_text}>{avgRating}</span>
                </div>
                <div className={styles.rating_count}>
                    {ratingCount}
                </div>
            </div>
        </div>)
    )
}

export default AboutResturant