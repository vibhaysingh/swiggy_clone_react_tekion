import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import sidebar_image from "../../assets/images/sidebar_food.png";
import { useAuth } from "../../store/Context/AuthContext/AuthContext";
import { loginSidebarActions } from "../../store/Toolkit/slices/authSlice/loginSidebarSlice";
import { signupSidebarActions } from "../../store/Toolkit/slices/authSlice/signupSidebarSlice";
import {
  checkNumberOnlyRegex,
  intialLoginState,
  loginReducer,
} from "./Helper/Helper";
import styles from "./Login.module.css";

function Login(props) {
  const [loginState, dispatchLoginState] = useReducer(
    loginReducer,
    intialLoginState
  );
  const { setCurrentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isUserFound, setIsUserFound] = useState(true);
  const isLoginSidebarOpen = useSelector(
    (state) => state.loginSideBar
  ).isLoginSidebarOpen;

  const phoneNumberChangeHandler = (event) => {
    if (
      event.target.value === "" ||
      checkNumberOnlyRegex.test(event.target.value)
    ) {
      setIsUserFound(true);
      dispatchLoginState({
        type: "USER_PHONE_INPUT",
        phoneNumber: event.target.value,
      });
      dispatchLoginState({ type: "PHONE_INPUT_FOCUS" });
    }
  };
  const validatePhoneNumberHandler = (event) => {
    dispatchLoginState({ type: "PHONE_INPUT_BLUR" });
    if (event.target.value === "") {
      dispatchLoginState({ type: "PHONE_INPUT_FOCUS" });
    }
  };
  useEffect(() => {
    !isLoginSidebarOpen && dispatchLoginState({ type: "CLEAR_LOGIN" });
    setIsUserFound(true);
    setIsUserFound(true);
  }, [isLoginSidebarOpen]);

  useEffect(() => {
    const currentUserFromLocalStorage = JSON.parse(
      localStorage.getItem("currentUser")
    );
    setCurrentUser(currentUserFromLocalStorage);
  }, []);

  const handleLogin = () => {
    dispatchLoginState({ type: "PHONE_INPUT_BLUR" });
    if (!loginState.isphoneNumberValid) return;
    setLoading(true);
    const userDetail = JSON.parse(localStorage.getItem(loginState.phoneNumber));
    if (!userDetail) {
      setTimeout(() => {
        setIsUserFound(false);
        setLoading(false);
        dispatchLoginState({ type: "CLEAR_LOGIN" });
      }, 2000);
      return;
    }

    setTimeout(() => {
      setLoading(false);
      dispatch(loginSidebarActions.toggleLoginSidebarOpen());
      setCurrentUser({
        userName: userDetail.name,
        phoneNumber: userDetail.phoneNumber,
      });
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          userName: userDetail.name,
          phoneNumber: userDetail.phoneNumber,
        })
      );
      dispatchLoginState({ type: "CLEAR_LOGIN" });
    }, 2000);

    setIsUserFound(true);
  };

  const dispatch = useDispatch();

  const handleLoginSidebarClose = () => {
    dispatch(loginSidebarActions.toggleLoginSidebarOpen());
    dispatchLoginState({ type: "CLEAR_LOGIN" });
  };

  const handleCreateAnAccount = () => {
    dispatch(loginSidebarActions.toggleLoginSidebarOpen());
    dispatch(signupSidebarActions.toggleSignupSidebarOpen());
  };

  return (
    <div
      className={`${styles.sidenav} ${
        isLoginSidebarOpen ? styles["drawer_open"] : ""
      }`}
    >
      <div className={styles.cross} onClick={handleLoginSidebarClose}></div>
      <p className={styles.navlogin}>Login</p>
      <p className={styles.create_acc}>
        <span>or</span>
        <span
          className={styles.createAnAccount}
          onClick={handleCreateAnAccount}
        >
          {" "}
          create an account
        </span>
      </p>
      <div className={styles.loginFood}>
        <img src={sidebar_image} alt="" />
      </div>
      <div className={styles.loginInput}>
        {loginState.isphoneNumberValid === false &&
          loginState.isPhoneNumberFocus === false && (
            <p className={styles.invalidPhoneNumber}>Invalid Phone Number</p>
          )}
        {!isUserFound && (
          <p className={styles.userNotFound}>User not found! Please Signup.</p>
        )}
        <input
          type="text"
          placeholder="Phone Number"
          value={loginState.phoneNumber || ""}
          onChange={phoneNumberChangeHandler}
          onBlur={validatePhoneNumberHandler}
          maxLength="10"
        />
      </div>
      <div className={styles.loginButton} onClick={handleLogin}>
        <button>{loading ? "Logging..." : "LOGIN"}</button>
      </div>
      <div className={styles.terms}>
        By clicking on Login, I accept the{" "}
        <strong>Terms &amp; Conditions</strong> &amp;{" "}
        <strong> Privacy Policy </strong>
      </div>
    </div>
  );
}

export default Login;
