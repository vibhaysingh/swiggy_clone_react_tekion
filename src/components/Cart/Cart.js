import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import foodImageLink from "../../assets/sidebar_food.png";
import { cartActions } from '../../Store/cartSlice';
import styles from "./Cart.module.css";
import CartCard from './Cart_Card/CartCard';
import EmptyCart from './EmptyCart/EmptyCart';
function Cart() {
    const cartItems = useSelector((state) => state.cart.items);
    const totalCartprice = useSelector((state) => state.cart.totalCartprice);

    const imageLink = `https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${cartItems[0]?.resturantImageId}`;

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const handleConfirmedOrder = () => {

        setTimeout(() => {
            navigate("/orderConfirmed", {
                state: {
                    cartItems: cartItems,
                    totalCartprice: totalCartprice
                }
            });
            dispatch(cartActions.clearCart());
        }, 1500)
    }

    return (
        cartItems.length || 1 ? (
            <div className={styles.cart_page}>
                <div className={styles.cart_container}>
                    <div className={styles.delivery_details}>
                        <div className={styles.accountPage}>
                            <div className={styles.accountImage}><img src={foodImageLink} alt="" /></div>
                            <div className={styles.accountHeading}>Account</div>
                            <div className={styles.accountDescription}>To place your order now, log in to your existing account or sign up.</div>

                            <div className={styles.loginSignupButtonContainer}>
                                <div className={styles.loginButton}>
                                    <p>Have an Account</p>
                                    <p>LOGIN</p>
                                </div>
                                <div className={styles.signupButton}>
                                    <p>New to Swiggy</p>
                                    <p>SIGNUP</p>
                                </div>
                            </div>

                        </div>
                        <div className={styles.deliveryAdressInputDetails}>

                            <div className={styles.addressHeading}>Delivery address</div>
                            <div className={styles.inputAdress}>

                                <textarea rows="4" cols="50" placeholder='Enter Your Full Address'>

                                </textarea>
                            </div>
                        </div>
                        <div className={styles.paymentContainer}>
                            <div className={styles.paymentHeading}>
                                Payment
                            </div>
                            <div className={styles.totalAmount}> Your total cart value is  <strong>Rs {totalCartprice || 0}. </strong>Proceed to payment to confirm your order.</div>
                            <div
                                className={styles.paymentButton}
                                onClick={handleConfirmedOrder}
                            >
                                Click to Confirm Your Payment
                            </div>
                        </div>
                    </div>
                    <div className={styles.cartItems_container}>
                        <div className={styles.cartItems_inner_container}>
                            <div className={styles.resturantName_container}>
                                <div className={styles.resturantName_image}>
                                    <img src={imageLink} alt=''></img>
                                </div>
                                <div className={styles.resturantNam_right_container}>
                                    <div className={styles.resturantName_heading}>{cartItems[0]?.resturantName}
                                    </div>
                                    <div className={styles.resturantName_location}> {cartItems[0]?.area}
                                    </div>
                                    <div className={styles.resturantName_underline}>

                                    </div>
                                </div>

                            </div>
                            <div className={styles.cart_cards}>
                                {cartItems.map((item, index) => {
                                    return (<CartCard
                                        key={index}
                                        dishName={item.name}
                                        quantity={item.quantity}
                                        price={item.price}
                                        id={item.id}
                                    />)
                                })}


                            </div>
                            <div className={styles.totalAmount_container}>
                                <p className={styles.to_pay}>TO PAY</p>
                                <p className={styles.totalprice}>₹{totalCartprice || 0}</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>) : <EmptyCart />

    )
}

export default Cart