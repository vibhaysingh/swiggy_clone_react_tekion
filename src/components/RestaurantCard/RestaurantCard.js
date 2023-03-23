import StarRateIcon from '@mui/icons-material/StarRate';
import React, { Fragment, useState } from 'react';
import { TbDiscount2 } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { getCuisineString, ratingStarStyle } from "./restaurantCard.helper";
import styles from "./RestaurantCard.module.css";

function RestaurantCard(props) {
    const { imgUrl, title, cuisines, rating, deliveryTime, costForTwo, offers, id } = props;
    const cuisinesString = getCuisineString(cuisines);
    const [quickView, setQuickView] = useState(false);
    const navigation = useNavigate();
    const handleQuickView = () => {
        setQuickView(prev => !prev);
    }
    const handleCardClick = () => {
        navigation(`/resturants/${id}`)
    }

    return (
        <Fragment>
            <div
                className={styles.card_container}
                onMouseEnter={handleQuickView}
                onMouseLeave={handleQuickView}
                onClick={handleCardClick}
            >
                <img src={imgUrl} alt=""></img>
                <p className={styles.card_heading}>{title}</p>
                <p className={styles.card_description}>{cuisinesString}</p>
                <div className={styles.card_info}>
                    <div className={`${styles.rating} ${+rating < 4 ? styles.ratingColorBelow4 : ''}`}>
                        <span className={styles.icon}>
                            <StarRateIcon style={ratingStarStyle} />
                        </span>
                        <span className={styles.text}>{rating}</span>
                    </div>
                    <div className={styles.dot}>•</div>
                    <div className={styles.time}>{`${deliveryTime} MINS`}</div>
                    <div className={styles.dot}>•</div>
                    <div className={styles.price}>{costForTwo}</div>
                </div>

                <div className={styles.offers}>
                    <span> <TbDiscount2 color="#8a584b" size={20} /></span>
                    <p className={styles.offerDescription}>{offers}</p>
                </div>
                <div className={styles['quickView']} style={{ opacity: `${quickView ? '100' : '0'}` }}>QUICK VIEW</div>
            </div>
        </Fragment>
    )
}

export default RestaurantCard