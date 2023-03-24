import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import foodImageLink from "../../assets/images/sidebar_food.png";
import CartCard from "../../components/CartCard/CartCard";
import { useAuth } from "../../store/Context/AuthContext/AuthContext";
import { loginSidebarActions } from "../../store/Toolkit/slices/authSlice/loginSidebarSlice";
import { signupSidebarActions } from "../../store/Toolkit/slices/authSlice/signupSidebarSlice";
import { cartActions } from "../../store/Toolkit/slices/cartSlice/cartSlice";
import EmptyCart from "../EmptyCartPage/EmptyCart";
import styles from "./Cart.module.css";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalCartprice = useSelector((state) => state.cart.totalCartprice);
  const [addressInput, setAddressInput] = useState("");
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const handleLoginSidebarOpen = () => {
    dispatch(loginSidebarActions.toggleLoginSidebarOpen());
  };
  const handleSignupSidebarOpen = () => {
    dispatch(signupSidebarActions.toggleSignupSidebarOpen());
  };
  const imageLink = `https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${cartItems[0]?.resturantImageId}`;

  const navigate = useNavigate();
  const handleConfirmedOrder = () => {
    setTimeout(() => {
      navigate("/orderConfirmed", {
     
        state: {
          cartItems: cartItems,
          totalCartprice: totalCartprice,
        },
      });
      dispatch(cartActions.clearCart());
    }, 1500);
  };

  const handleAddressInput = (event) => {
    setAddressInput(event.target.value);
  };

  return cartItems.length ? (
    <div className={styles.cart_page}>
      <div className={styles.cart_container}>
        <div className={styles.delivery_details}>
          <div className={styles.accountPage}>
            <div className={styles.accountImage}>
              <img src={foodImageLink} alt="" />
            </div>
            <div className={styles.accountHeading}>Account</div>
            {!currentUser && (
              <div className={styles.accountDescription}>
                To place your order now, log in to your existing account or sign
                up.
              </div>
            )}

            {!currentUser && (
              <div className={styles.loginSignupButtonContainer}>
                <div
                  className={styles.loginButton}
                  onClick={handleLoginSidebarOpen}
                >
                  <p>Have an Account</p>
                  <p>LOGIN</p>
                </div>
                <div
                  className={styles.signupButton}
                  onClick={handleSignupSidebarOpen}
                >
                  <p>New to Swiggy</p>
                  <p>SIGNUP</p>
                </div>
              </div>
            )}
            {currentUser && (
              <div className={styles.loggedInUser}>
                {currentUser.userName} {" |"} {currentUser.phoneNumber}
              </div>
            )}
          </div>
          <div className={styles.deliveryAdressInputDetails}>
            <div className={styles.addressHeading}>Delivery address</div>
            <div className={styles.inputAdress}>
              {!currentUser && <p>Login to Enter Your Address</p>}
              {currentUser && (
                <textarea
                  onChange={handleAddressInput}
                  rows="4"
                  cols="50"
                  placeholder="Enter Your Full Address"
                ></textarea>
              )}
            </div>
          </div>
          <div className={styles.paymentContainer}>
            <div className={styles.paymentHeading}>Payment</div>
            <div className={styles.totalAmount}>
              {" "}
              Your total cart value is{" "}
              <strong>Rs {totalCartprice || 0}. </strong>
              {!currentUser
                ? "Login to proceed your payment."
                : "Proceed to payment to confirm your order."}
            </div>
            {addressInput && currentUser && (
              <div
                className={styles.paymentButton}
                onClick={handleConfirmedOrder}
              >
                Click to Confirm Your Payment
              </div>
            )}
          </div>
        </div>
        <div className={styles.cartItems_container}>
          <div className={styles.cartItems_inner_container}>
            <div className={styles.restaurantName_container}>
              <div className={styles.restaurantName_image}>
                <img src={imageLink} alt=""></img>
              </div>
              <div className={styles.resturantNam_right_container}>
                <div className={styles.restaurantName_heading}>
                  {cartItems[0]?.restaurantName}
                </div>
                <div className={styles.restaurantName_location}>
                  {" "}
                  {cartItems[0]?.area}
                </div>
                <div className={styles.restaurantName_underline}></div>
              </div>
            </div>
            <div className={styles.cart_cards}>
              {cartItems.map((item, index) => {
                return (
                  <CartCard
                    key={index}
                    dishName={item.name}
                    quantity={item.quantity}
                    price={item.price}
                    id={item.id}
                  />
                );
              })}
            </div>
            <div className={styles.totalAmount_container}>
              <p className={styles.to_pay}>TO PAY</p>
              <p className={styles.totalprice}>
                ₹{Number(totalCartprice).toFixed(2) || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <EmptyCart />
  );
}

export default Cart;
