import { IMG_CDN_URL } from "../../constants/constant";
import styles from "./OfferCard.module.css";
import _ from "lodash";

function OfferCard(props) {
  const { offers } = props;

  return (
    offers && (
      <div className={styles.offersContainer}>
        {offers &&
          _.map(offers, (offer, index) => {
            const offerLink = `${IMG_CDN_URL}${offer?.info?.offerLogo}`;
            return (
              <div className={styles.offerContainer} key={index}>
                <div className={styles.offerHeading}>
                  <span className={styles.offerIcon}>
                    <img src={offerLink} alt="Offer" />
                  </span>
                  <span className={styles.offerDescription}>
                    {offer.info.header}
                  </span>
                </div>
                <div className={styles.offerCode}>
                  {`  ${offer.info?.couponCode} ${
                    offer.info?.description ? " |" : ""
                  } ${offer.info?.description}`}
                </div>
              </div>
            );
          })}
      </div>
    )
  );
}

export default OfferCard;
