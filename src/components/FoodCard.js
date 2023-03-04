import StarRateIcon from '@mui/icons-material/StarRate';
import React, { useState } from 'react';
import { TbDiscount2 } from 'react-icons/tb';
import cardImage from "../assets/food5.png";
import styles from "./FoodCard.module.css";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

<Skeleton width={140} height={140} />



function FoodCard() {

    const iconStyle = {
        fontSize: '14px',
        color: '#fff',
    };

    const [quickView, setQuickView] = useState(false);

    const handleQuickView = () => {
        setQuickView(prev => !prev);
    }

    return (
        <div className={styles.card_container} onMouseEnter={handleQuickView} onMouseLeave={handleQuickView}>
            <img src={cardImage} alt="CardImage"></img>
            <p className={styles.card_heading}>Meghna Foods</p>
            <p className={styles.card_description}>Biryani, Andhra, South Indian, North Indian, Chinese, Seafood</p>
            <div className={styles.card_info}>
                <div className={styles.rating}>
                    <span className={styles.icon}><StarRateIcon style={iconStyle} /></span>
                    <span className={styles.text}>4.3</span>
                </div>
                <div className={styles.dot}>•</div>
                <div className={styles.time}>43 MINS</div>
                <div className={styles.dot}>•</div>
                <div className={styles.price}>500 FOR TWO</div>
            </div>

            <div className={styles.offers}>
                <span> <TbDiscount2 color="#8a584b" size={20} /></span>
                <p className={styles.offer_description}>FREE DELIVERY</p>
            </div>
            <div className={styles['quickView']} style={{ opacity: `${quickView ? '100' : '0'}` }}>QUICK VIEW</div>
        </div>
    )
}

export default FoodCard