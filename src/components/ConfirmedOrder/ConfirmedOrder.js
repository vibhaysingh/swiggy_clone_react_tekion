import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ConfirmedOrder.module.css';



function ConfirmedOrder() {
  const [isVisible, setIsVisible] = useState(true);

  const location = useLocation();
  const { cartItems, totalCartprice } = location.state;

  console.log(location.state)


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const navigate = useNavigate();

  const handleGoBackHomepage = () => {
    navigate('/');
  }

  return (

    <div className={styles.confirmedOrderOuterContainer}>
      <div className={styles.confirmedOrderContainer}>

        {isVisible && <div className={styles.paymentSuccesfull}>
          Payment Successful. Your order will arrive in 32 minutes.
        </div>}
        <div className={styles.orderSummary}>
          Order Summary
        </div>

        <div className={styles.orderDetailsContainer}>

          {cartItems.map((item, index) => {
            return (<div className={styles.itemInfo}>
              <div className={styles.itemName}> {index + 1}. {item.name}</div>
              <div className={styles.itemPrice}> ₹ {item.price}</div>
            </div>)
          })}
        </div>

        <div className={styles.totalPaidAmountContainer}>

          <div className={styles.totalPaidAmountText}>Total Paid Amount </div>
          <div className={styles.totalPaidAmount}>₹ {totalCartprice}</div>
        </div>
      </div>
      <div onClick={handleGoBackHomepage} className={styles.goToHomebutton}>
        Still Hungry ? Order More !
      </div>
    </div>
  )
}

export default ConfirmedOrder