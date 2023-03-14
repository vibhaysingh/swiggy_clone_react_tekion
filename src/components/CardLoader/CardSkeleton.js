import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from "./CardSkeleton.module.css"
import 'react-loading-skeleton/dist/skeleton.css'
import { v4 as uuidv4 } from 'uuid';
function CardSkeleton({ count }) {
    const cards = [];
    for (let i = 0; i < count; i++) {
        cards.push(
            <div key={uuidv4()} className={styles['food-card']}>
                <div className={styles['food-card__image']}>
                    <Skeleton height={180} width={240} borderRadius={0} style={{ marginBottom: '30px' }} />
                </div>
                <div className={styles['food-card__content']}>
                    <Skeleton height={18} width={240} borderRadius={0}  style={{ marginBottom: '10px' }} />
                    <Skeleton height={15} width={240} borderRadius={0}  style={{ marginBottom: '15px' }} />
                    <Skeleton height={15} width={240} borderRadius={0} style={{ marginBottom: '45px' }} />
                </div>
            </div>
        );
    }
    return (
        <div className={`${styles.skeleton_container} ${count===4? styles['cards_4']:''}`}>{cards}</div>
  )
}

export default CardSkeleton