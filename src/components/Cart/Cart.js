import { useSelector } from 'react-redux';
import styles from "./Cart.module.css";
import CartCard from './Cart_Card/CartCard';
import EmptyCart from './EmptyCart/EmptyCart';
function Cart() {
    const cartItems = useSelector((state) => state.cart.items);
    const totalCartprice = useSelector((state) => state.cart.totalCartprice);
    const imageLink = `https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${cartItems[0]?.resturantImageId}`;

    return (
        cartItems.length ? (
            <div className={styles.cart_page}>
                <div className={styles.cart_container}>
                    <div className={styles.delivery_details}> </div>
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