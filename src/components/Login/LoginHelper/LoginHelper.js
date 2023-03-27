export function checkEmailValidity(email) {
    const checkValidEmailregex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return checkValidEmailregex.test(email);
}
export function checkPhoneNumberValidity(phoneNumber) {
    return (phoneNumber.length === 10);
}
export const checkNumberOnlyRegex = (/^[0-9\b]+$/);
export const intialLoginState = {
    phoneNumber: '',
    isphoneNumberValid: null,
    isPhoneNumberFocus: null,
}

const loginReducer = (state, action) => {

    if (action.type === 'USER_PHONE_INPUT') {
        return {
            ...state,
            phoneNumber: action.phoneNumber,
            isSignupDataValid: (state.isEmailValid === true && state.isphoneNumberValid === true && state.isNameValid === true)
        }
    }

    if (action.type === 'PHONE_INPUT_BLUR') {

        return {
            ...state,
            isphoneNumberValid: checkPhoneNumberValidity(state.phoneNumber),
            isPhoneNumberFocus: false,
        }
    }
   
    if (action.type === 'PHONE_INPUT_FOCUS') {

        return {
            ...state,
            isPhoneNumberFocus: true,
        }
    }
    if (action.type === 'CLEAR_LOGIN') {

        return intialLoginState;
    }
    return intialLoginState;
};
export { loginReducer };

