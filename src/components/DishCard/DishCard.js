import React from 'react';
import Bestseller from '../../assets/Bestseller';
import VegIcons from '../../assets/VegIcons';
import styles from "../resturantDishes/ResturantsDishes.module.css";
import fallBackImage from '../../assets/Placeholder.png'


function DishCard(props) {



    const { dishInfo, hideborder } = props;
    console.log(dishInfo)
    const dishImageLink = `https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${dishInfo.cloudinaryImageId}`;

    const isVeg = dishInfo.isVeg === 1;

    const addImageFallback = (event) => {
       
            event.currentTarget.onerror = null;
            event.currentTarget.src = fallBackImage
    };


    return (
        <div className={styles.dish_card_container} hideBorder style={hideborder ? { borderBottom: '0px' } : {}} >
            <div className={styles.dish_card_content}>
                <div className={styles.dish_card_left_content}>
                    <div className={styles.veg_nonVeg_bestseller}>
                        <VegIcons veg={isVeg} />
                        {dishInfo.isBestSeller && <Bestseller />}
                    </div>
                    <p className={styles.dish_name}> {dishInfo.name}</p>
                    <p className={styles.dish_price}>₹ {Math.max(dishInfo.price ? dishInfo.price / 100 : 0, dishInfo.defaultPrice ? dishInfo.defaultPrice / 100 : 0)}</p>
                    <p className={styles.dish_description}>{dishInfo.description.replace(/[\[\]]/g, "")}</p>
                </div>
            </div>
            <div className={styles.dish_card_right_content} >

                <img src={dishImageLink} alt="" onError={addImageFallback} />
                <button className={styles.add_button}>ADD</button>
            </div>
        </div>
    )
}

export default DishCard

