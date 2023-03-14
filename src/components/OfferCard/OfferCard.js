import React from 'react';
import styles from '../resturantDishes/ResturantsDishes.module.css';

function OfferCard(props) {

    const offers = props.offers;



    return ( offers && 
        (<div className={styles.offers_container}>
            {offers&&offers.map((offer,index) => {
                let offerLink = `https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_28,h_28/${offer?.offer_logo}`
                return (
                    <div className={styles.offer_container} key={index}>
                        <div className={styles.offer_heading}>
                            <span className={styles.offer_icon}>
                                <img src={offerLink} alt="Offer" />
                            </span>
                            <span className={styles.offer_description}>
                                {offer.header}
                            </span>
                        </div>
                        <div className={styles.offer_code}>
                            {`  ${offer?.coupon_code} ${offer?.description?' |': ''} ${offer?.description}`}
                        </div>
                    </div>
                )
            })}
        </div>)
    )
}

export default OfferCard