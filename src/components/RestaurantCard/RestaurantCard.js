import StarRateIcon from '@mui/icons-material/StarRate';
import React, { Fragment, useState } from 'react';
import { TbDiscount2 } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import styles from "./FoodCard.module.css";

function FoodCard(props) {
    const { imgUrl, title, cuisines, rating, deliveryTime, costForTwo, offers, id } = props;
    let cuisinesString = "";
    for (let cuisine of cuisines) {
        cuisinesString = cuisinesString + cuisine + ", ";
    }
    cuisinesString = cuisinesString.slice(0, -2);

    const [quickView, setQuickView] = useState(false);
    const handleQuickView = () => {
        setQuickView(prev => !prev);
    }
    const navigation = useNavigate();
    const handleCardClick = () => {
        navigation(`/resturants/${id}`)
    }

    return (
        <Fragment>
            <div className={styles.card_container} onMouseEnter={handleQuickView} onMouseLeave={handleQuickView} onClick={handleCardClick}>
                <img src={imgUrl} alt="CardImage"></img>
                <p className={styles.card_heading}>{title}</p>
                <p className={styles.card_description}>{cuisinesString}</p>
                <div className={styles.card_info}>
                    <div className={`${styles['rating']} ${+rating < 4 ? styles['rating_color_below4'] : ''}`}>
                        <span className={styles.icon}><StarRateIcon style={{
                            fontSize: '14px',
                            color: '#fff',
                        }} /></span>
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

export default FoodCard