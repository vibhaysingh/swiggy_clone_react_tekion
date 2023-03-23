import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from "./restaurantCardSkeleton.module.css"
import 'react-loading-skeleton/dist/skeleton.css'
function RestaurantCardSkeleton({ count }) {
    const restaurantsCards = [];
    for (let i = 0; i < count; i++) {
        restaurantsCards.push
        (
            <div key={i} >
                <div>
                    <Skeleton height={180} width={240} borderRadius={0} style={{ marginBottom: '30px' }} />
                </div>
                <div>
                    <Skeleton height={18} width={240} borderRadius={0}  style={{ marginBottom: '10px' }} />
                    <Skeleton height={15} width={240} borderRadius={0}  style={{ marginBottom: '15px' }} />
                    <Skeleton height={15} width={240} borderRadius={0} style={{ marginBottom: '45px' }} />
                </div>
            </div>
        );
    }
    return (
        <div className={`${styles.skeletonContainer} ${count===4? styles.fourCards:''}`}>{restaurantsCards}</div>
  )
}

export default RestaurantCardSkeleton