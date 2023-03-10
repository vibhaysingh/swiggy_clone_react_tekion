import React from 'react';
import RupeeIcon from '../../assets/RupeeIcon';
import TimerIcon from '../../assets/TimerIcon';
import styles from "../resturantDishes/ResturantsDishes.module.css";


function DeliveryTimeInfo(props) {

    const { costForTwoMsg, deliveryTime } = props;

    return (
        costForTwoMsg &&
        (<div className={styles.time_and_cost}>
            <span > <TimerIcon /> </span>
            <div className={styles.time}>{deliveryTime}</div>
            <span><RupeeIcon /></span>
            <div className={styles.cost}>{costForTwoMsg}</div>
        </div>)
    )

}

export default DeliveryTimeInfo