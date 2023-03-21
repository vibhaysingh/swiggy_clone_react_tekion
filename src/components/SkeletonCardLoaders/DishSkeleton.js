import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './DishSkeleton.module.css';
function DishSkeleton() {
    return (
        <div className={styles.dishCardSkeleton_container}>
            <div className={styles.resturantDetails}>
                <Skeleton height={30}  borderRadius={0} style={{ marginBottom: '10px' }} />
                <Skeleton height={17} width={240} borderRadius={0} style={{ marginBottom: '10px' }} />
                <Skeleton height={17} width={240} borderRadius={0} style={{ marginBottom: '55px' }} />
            </div>
            <div className={styles.offerDetailes}>
                <Skeleton height={85}  borderRadius={0} style={{ marginBottom: '90px' }} />
            </div>
            <div className={styles.dishDetails}>
                <Skeleton height={70}borderRadius={0} style={{ marginBottom: '20px' }} count={5} />
            </div>
        </div>
    )
}

export default DishSkeleton