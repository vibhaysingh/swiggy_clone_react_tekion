import React, { useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import sidebar_food from "../../assets/images/sidebar_food.png";
import { useAuth } from '../../store/Context/AuthContext/AuthContext';
import { loginSidebarActions } from "../../store/Toolkit/slices/authSlice/loginSidebarSlice";
import { signupSidebarActions } from "../../store/Toolkit/slices/authSlice/signupSidebarSlice";
import { checkNumberOnlyRegex, intialSignupState, signupReducer } from './ Helper/Helper';
import styles from "./Signup.module.css";

function Signup(props) {
    const [signupState, dispatchSignupState] = useReducer(signupReducer,
        intialSignupState);
    const { setCurrentUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [userAlreadyExists, setIsUserAlreadyExits] = useState(false);
    const isSignupSidebarOpen = useSelector((state) => state.signupSideBar).isSignupSidebarOpen;

    const phoneNumberChangeHandler = (event) => {
        if (event.target.value === "" || checkNumberOnlyRegex.test(event.target.value)) {
            dispatchSignupState({ type: 'USER_PHONE_INPUT', phoneNumber: event.target.value });
            dispatchSignupState({ type: 'PHONE_INPUT_FOCUS' })
        }
    }
    const nameChangeHandler = (event) => {
        dispatchSignupState({ type: 'USER_NAME_INPUT', name: event.target.value });
        dispatchSignupState({ type: 'NAME_INPUT_FOCUS' })
    }
    const emailChangeHandler = (event) => {
        dispatchSignupState({ type: 'USER_EMAIL_INPUT', email: event.target.value });
        dispatchSignupState({ type: 'EMAIL_INPUT_FOCUS' })

    }
    const validatePhoneNumberHandler = (event) => {
        dispatchSignupState({ type: 'PHONE_INPUT_BLUR' })
        if (event.target.value !== "") {
            dispatchSignupState({ type: 'PHONE_INPUT_FOCUS' })
        }
    }

    const validateEmailHandler = (event) => {
        dispatchSignupState({ type: 'EMAIL_INPUT_BLUR' })
        if (event.target.value !== "") {
            dispatchSignupState({ type: 'EMAIL_INPUT_FOCUS' })
        }
    }

    const validateNameHandler = (event) => {
        dispatchSignupState({ type: 'NAME_INPUT_BLUR' })
        if (event.target.value !== "") {
            dispatchSignupState({ type: 'NAME_INPUT_FOCUS' })
        }

    }
    useEffect(() => {
        !isSignupSidebarOpen && dispatchSignupState({ type: 'CLEAR_SIGNUP' });
        !isSignupSidebarOpen && setIsUserAlreadyExits(false);
    }, [isSignupSidebarOpen])


    const handleSignup = () => {

        dispatchSignupState({ type: 'NAME_INPUT_BLUR' });
        dispatchSignupState({ type: 'PHONE_INPUT_BLUR' });
        dispatchSignupState({ type: 'EMAIL_INPUT_BLUR' });
        const userFoundInLocalStorage = JSON.parse(localStorage.getItem(signupState.phoneNumber));
        if (userFoundInLocalStorage) {
            setLoading(true);
            setTimeout(() => {
                setIsUserAlreadyExits(true);
                setLoading(false);
                dispatchSignupState({ type: 'CLEAR_SIGNUP' });
                return;
            }, 1500);

            return;
        }

        if (!signupState.isSignupDataValid || loading) return;
        setLoading(true);



        setTimeout(() => {
            setLoading(false);
            dispatchSignupState({ type: 'CLEAR_SIGNUP' });
            dispatch(signupSidebarActions.toggleSignupSidebarOpen());
            setCurrentUser({ userName: signupState.name, phoneNumber: signupState.phoneNumber });
            localStorage.setItem("currentUser", JSON.stringify({ userName: signupState.name, phoneNumber: signupState.phoneNumber }));
            localStorage.setItem(signupState.phoneNumber, JSON.stringify({ name: signupState.name, email: signupState.email, phoneNumber: signupState.phoneNumber }));

        }, 1500);


    }
    const dispatch = useDispatch();

    const handleSignupSidebarClose = () => {
        dispatch(signupSidebarActions.toggleSignupSidebarOpen());
        dispatchSignupState({ type: 'CLEAR_SIGNUP' });
    }
    const handleLoginToYourAccount = () => {
        dispatch(loginSidebarActions.toggleLoginSidebarOpen());
        dispatch(signupSidebarActions.toggleSignupSidebarOpen());
    }

    return (
        <div className={`${styles.sidenav} ${isSignupSidebarOpen ? styles['drawer_open'] : ''}`}>
            <div className={styles.cross} onClick={handleSignupSidebarClose}></div>
            <p className={styles.navSignup}>
                Sign up
            </p>
            <p className={styles.signup_acc}>
                <span>or </span><span className={styles.loginYourAccount} onClick={handleLoginToYourAccount}> login to your account</span>
            </p>
            <div className={styles.signupfood}>
                <img src={sidebar_food} alt="" />
            </div>
            <div className={`${styles.signupinput} ${styles.input1}`}>
                {userAlreadyExists && <p className={styles.userAlreadyExists}>User already exists. Please login to continue.</p>}
                {(signupState.isphoneNumberValid === false && signupState.isPhoneNumberFocus === false) && <p className={styles.invalidPhoneNumber}>Invalid Phone Number</p>}
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={signupState.phoneNumber || ''}
                    onChange={phoneNumberChangeHandler}
                    onBlur={validatePhoneNumberHandler}
                    maxLength="10"
                />
            </div>
            <div className={`${styles.signupinput} ${styles.input2}`}>
                {(signupState.isNameValid === false && signupState.isNameFocus === false) && <p>Name cannot be empty</p>}
                <input
                    type="text"
                    placeholder="Name"
                    value={signupState.name || ''}
                    onChange={nameChangeHandler}
                    onBlur={validateNameHandler}
                />
            </div>
            <div className={`${styles.signupinput} ${styles.input3}`}>
                {(signupState.isEmailValid === false && signupState.isEmailFocus === false) && <p>Please enter valid email</p>}
                <input
                    type="text"
                    placeholder="Email"
                    value={signupState.email || ''}
                    onChange={emailChangeHandler}
                    onBlur={validateEmailHandler}
                />
            </div>
            <p className={styles.referral}>
                Have a referral code?
            </p>
            <div className={styles.signupbutton} onClick={handleSignup}>
                <button>{loading ? 'Signing...' : 'CONTINUE'}</button>
            </div>
            <div className={styles.signup_terms} >
                By creating an account, I accept the <strong>Terms &amp; Conditions</strong> &amp;<strong>Privacy Policy</strong>
            </div>

        </div>
    )
}

export default Signup