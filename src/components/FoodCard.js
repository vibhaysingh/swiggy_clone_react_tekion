import StarRateIcon from '@mui/icons-material/StarRate';
import React, { useState } from 'react';
import { TbDiscount2 } from 'react-icons/tb';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from "./FoodCard.module.css";

<Skeleton width={140} height={140} />



function FoodCard(props) {

    const iconStyle = {
        fontSize: '14px',
        color: '#fff',
    };

    const { imgUrl, title, cuisines, rating, deliveryTime, costForTwo, offers } = props;
    let cuisinesString = "";
    for (let cuisine of cuisines) {
        cuisinesString = cuisinesString + cuisine + ", ";
    }


    cuisinesString = cuisinesString.slice(0, -2);


    const [quickView, setQuickView] = useState(false);

    const handleQuickView = () => {
        setQuickView(prev => !prev);
    }

    return (
        <div className={styles.card_container} onMouseEnter={handleQuickView} onMouseLeave={handleQuickView}>
            <img src={imgUrl} alt="CardImage"></img>
            <p className={styles.card_heading}>{title}</p>
            <p className={styles.card_description}>{cuisinesString}</p>
            <div className={styles.card_info}>
                <div className={`${styles['rating']} ${+rating < 4 ? styles['rating_color_below4'] : ''}`}>
                    <span className={styles.icon}><StarRateIcon style={iconStyle} /></span>
                    <span className={styles.text}>{rating}</span>
                </div>
                <div className={styles.dot}>•</div>
                <div className={styles.time}>{`${deliveryTime} MINS`}</div>
                <div className={styles.dot}>•</div>
                <div className={styles.price}>{costForTwo}</div>
            </div>

            <div className={styles.offers}>
                <span> <TbDiscount2 color="#8a584b" size={20} /></span>
                <p className={styles.offer_description}>{offers}</p>
            </div>
            <div className={styles['quickView']} style={{ opacity: `${quickView ? '100' : '0'}` }}>QUICK VIEW</div>
        </div>
    )
}

export default FoodCard