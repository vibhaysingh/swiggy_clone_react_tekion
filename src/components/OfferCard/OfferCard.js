import React from 'react';
import styles from '../resturantDishes/ResturantsDishes.module.css';

function OfferCard(props) {
    const { offers } = props;
    return (offers &&
        (<div className={styles.offers_container}>
            {offers && offers.map((offer, index) => {

                let offerLink = `https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_28,h_28/${offer?.info?.offerLogo}`

                return (
                    <div className={styles.offer_container} key={index}>
                        <div className={styles.offer_heading}>
                            <span className={styles.offer_icon}>
                                <img src={offerLink} alt="Offer" />
                            </span>
                            <span className={styles.offer_description}>
                                {offer.info.header}
                            </span>
                        </div>
                        <div className={styles.offer_code}>
                            {`  ${offer.info?.couponCode} ${offer.info?.description ? ' |' : ''} ${offer.info?.description}`}
                        </div>
                    </div>
                )
            }
            )}
        </div>)
    )
}

export default OfferCard