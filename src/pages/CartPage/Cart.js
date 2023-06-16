import _, { set } from "lodash";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useState, useRef, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import foodImageLink from "../../assets/images/sidebar_food.png";
import CartCard from "../../components/CartCard/CartCard";
import { useAuth } from "../../store/Context/AuthContext/AuthContext";
import { loginSidebarActions } from "../../store/Toolkit/slices/authSlice/loginSidebarSlice";
import { signupSidebarActions } from "../../store/Toolkit/slices/authSlice/signupSidebarSlice";
import { cartActions } from "../../store/Toolkit/slices/cartSlice/cartSlice";
import PaymentIframe from "../PaymentIframe/PaymentIframe";
import EmptyCart from "../EmptyCartPage/EmptyCart";
import styles from "./Cart.module.css";
// import { TransactionTokenContext } from "../../store/Context/TransactionToken/TransactionToken";
import { Oval } from "react-loader-spinner";
import TpaySDK from "../../components/TPaySDK/TpaySDK";


function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalCartprice = useSelector((state) => state.cart.totalCartprice);

  cosnt [transactionToken,setTransactionToken]= useState('');

  // const [addressInput, setAddressInput] = useState("");
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
    navigate("/orderConfirmed", {
      state: {
        cartItems: cartItems,
        totalCartprice: totalCartprice,
      },
    });
    dispatch(cartActions.clearCart());
  };

  // const handleAddressInput = (event) => {
  //   setAddressInput(event.target.value);
  // };

  /// Iframe code starts here -------------------------------------------------------------------------------------- ///

  const [isTransactionFailed, setIsTransactionFailed] = useState(false);
  const [isIFrameLoading, setisIFrameLoading] = useState(true);
  const [transactionToken, setTransactionToken] = useState('')

  const getTransactionToken = async () => {
    axios
      .post(
        "https://tst-tpay-sdk.tekion.xyz/api/tpay-sdk-api/p/v1/transactions/initiate",
        {
          amount: totalCartprice,
          currency: "USD",
          idempotencyKey: uuidv4(),
          notes: "test-notes",
          clientOrderId: "client-order-id-1",
          surchargeDisabled: true,
          metadata: {
            key1: "value1",
          },
          enablePaymentModes: [],
          disablePaymentModes: [],
        },
        {
          headers: {
            "x-client-id": "tpay_oBuYibDweO",
            "x-client-secret":
              "cskstg_2ZZsu7Xh9yJ2cGg5cXQZ314LJe5DGj2naJLGv+sz",
            "Content-Type": "application/json",
          },
        }
      )
      .then(
        (response) => {
          const token = _.get(response, "data.data.transactionToken");
          setTransactionToken(token);
          console.log("tokesn ", token);
        },
        (error) => {
          console.log(error);
        }
      );
  };
 
  // useEffect(() => {

  //   if (transactionToken === "" && totalCartprice > 0) {
  //     getTransactionToken();
  //   }
  // }, [transactionToken]);

  const {pathname} = useLocation();
  if(pathname==='/cart'){
    getTransactionToken();
  }

  // const eventType = _.property("data.type");
  // const eventValue = _.property("data.value");
  // const eventOrigin = _.property("origin");

  const TEKION_SDK_IFRAME_URL = "https://tst-tpay-sdk.tekion.xyz/tpay-sdk-ui/";

  const SDK_EVENT_TYPE = {
    TRANSACTION_SUCCESSFUL: "transaction_successful",
    TRANSACTION_FAILURE: "transaction_failure",
    TRANSACTION_IN_PROGRESS: "transaction_in_progress",
    SDK_LOADED: "sdk_loaded",
    TRANSACTION_LOCK: "transaction_lock",
    IFRAME_READY: "iframe_ready",
    IFRAME_PROPS: "iframe_props",
  };
  const ACCEPTED_ORIGINS = "*";

  

  // const postMessageToIframe = (type, iFrameRef, value, data) =>
  //   iFrameRef?.current?.contentWindow?.postMessage(
  //     { type, value, ...data },
  //     ACCEPTED_ORIGINS
  //   );

  // const handleIFrameReady = (iFrameRef) => {
  //   // const { iFrameRef } = params;
  //   // const { transactionToken } = getState();
  //   postMessageToIframe(IFRAME_EVENT_TYPE.IFRAME_PROPS, iFrameRef, {
  //     transactionToken,
  //     isDealerApp: false,
  //     loader: 0,
  //   });
  // };

  // const handleTransactionSuccess = async (payload) => {
  //   handleConfirmedOrder();
  //   setIsTransactionFailed(false);
  // };

  // const handleFailedTransaction = () => {
  //   setIsTransactionFailed(true);
  //   alert("Payment Failed, Please Try again!");

  //   console.log("payment failed ");
  // };

  // const iFrameRef = useRef(null);
  // const windowMessageHandler = (iFrameRef) => (event) => {
  //   if (_.includes(TEKION_SDK_IFRAME_URL, eventOrigin(event))) {
  //     switch (eventType(event)) {
  //       case IFRAME_EVENT_TYPE.SDK_ON_LOAD:
  //         setisIFrameLoading(false);
  //         break;
  //       case IFRAME_EVENT_TYPE.TRANSACTION_SUCCESSFUL:
  //         const payload = eventValue(event);
  //         handleTransactionSuccess(payload);
  //         break;
  //       case IFRAME_EVENT_TYPE.IFRAME_READY:
  //         handleIFrameReady(iFrameRef);
  //         break;
  //       default:
  //         handleFailedTransaction();
  //     }
  //   }
  // };
  // const addIframeListener = (iFrameRef) => {
  //   if (typeof window === "undefined") return;
  //   window.addEventListener("message", windowMessageHandler(iFrameRef));
  // };
  // const onFrameLoad = () => {
  //   addIframeListener(iFrameRef);
  // };

  const postMessageToParent = (type, value, data) =>
  window.parent.postMessage({ type, value, ...data }, ACCEPTED_ORIGINS);

  const successCallBack = ({ params = EMPTY_OBJECT }) => {
    const { response } = params;
    console.log("succesCallback ",params);
    postMessageToParent(SDK_EVENT_TYPE.TRANSACTION_SUCCESSFUL, { response });
  };
  
  const failureCallBack = ({ params = EMPTY_OBJECT }) => {
    const { error } = params;
    console.log("succesCallback ",params);
    postMessageToParent(SDK_EVENT_TYPE.TRANSACTION_FAILURE, { error });
  };
  
  const onProgressCallBack = ({ params = EMPTY_OBJECT }) => {
    const { value } = params;
    console.log("onProgressCallBack ",params);
    postMessageToParent(SDK_EVENT_TYPE.TRANSACTION_IN_PROGRESS, value);
  };
  
  const onSdkLoadCallBack = ({ params = EMPTY_OBJECT }) => {
    const { value } = params;
    console.log("onSdkLoadCallBack ",params);
    postMessageToParent(SDK_EVENT_TYPE.SDK_LOADED, value);
  };
  
  const onTransactionLockCallBack = ({ params = EMPTY_OBJECT }) => {
    const { value } = params;
    console.log("onTransactionLockCallBack ",params);
    postMessageToParent(SDK_EVENT_TYPE.TRANSACTION_LOCK, value);
  };

  const handleRetryButton = () => {
    window.location.reload();
    setIsTransactionFailed(false);
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
          {/* <div className={styles.deliveryAdressInputDetails}>
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
          </div> */}
          <div className={styles.paymentContainer}>
            <div className={styles.paymentHeading}>Payment</div>
            <div className={styles.totalAmount}>
              {" "}
              Your total cart value is{" "}
              <strong>$ {totalCartprice || 0}. </strong>
              {!currentUser
                ? "Login to proceed your payment."
                : "Proceed to payment to confirm your order."}
            </div>
            {currentUser && (
              <div
                className={styles.iframe}
                // onClick={handleConfirmedOrder}
              >
                {/* Click to Confirm Your Payment */}
                {isIFrameLoading&&<Oval
                  height={40}
                  width={40}
                  color="#494DAC"
                  wrapperStyle={{
                    position:'absolute',
                    top:'50%',
                    left:'50%',
                    transform: 'translate(-50%, -50%)',
                    
                  }}
                  wrapperClass=""
                  visible={isIFrameLoading}
                  ariaLabel="oval-loading"
                  secondaryColor="#8f91e4"
                  strokeWidth={3}
                  strokeWidthSecondary={3}
                />}
               {transactionToken!=='' && 
               <TpaySDK 
                    transactionToken={transactionToken} 
                    onSuccess={successCallBack}
                    onFailure={failureCallBack}
                    onProgress={onProgressCallBack}
                    onSdkLoad={onSdkLoadCallBack}
                    onTransactionLock={onTransactionLockCallBack}
                  />
               }
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
              {_.map(cartItems, (item, index) => {
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
                ${Number(totalCartprice).toFixed(2) || 0}
              </p>
            </div>
            {isTransactionFailed && (
              <div className={styles.retryButton}>
                <button onClick={handleRetryButton}>Retry</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <EmptyCart />
  );
}

export default Cart;
