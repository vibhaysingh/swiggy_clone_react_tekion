import React from 'react';
import RupeeIcon from '../../../assets/svgIcons/RupeeIcon';
import TimerIcon from '../../../assets/svgIcons/TimerIcon';
import styles from "./DeliveryTimeInfo.module.css"
function DeliveryTimeInfo(props) {
    const { costForTwoMsg, deliveryTime } = props;
    return (
        costForTwoMsg &&
        (<div className={styles.timeAndCost}>
            <span > <TimerIcon /> </span>
            <div className={styles.time}>{deliveryTime} {" MINS"}</div>
            <span><RupeeIcon /></span>
            <div className={styles.cost}>{costForTwoMsg}</div>
        </div>)
    )
}
export default DeliveryTimeInfo