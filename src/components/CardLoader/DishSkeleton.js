import React from 'react';
import styles from './DishSkeleton.module.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
function DishSkeleton() {
    return (
        <div className={styles.dishCardSkeleton_container}>
            <div className={styles.resturantDetails}>
                <Skeleton height={180} width={240} borderRadius={0} style={{ marginBottom: '30px' }} />
            </div>
        </div>
    )
}

export default DishSkeleton