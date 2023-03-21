export function checkEmailValidity(email) {
    const checkValidEmailregex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return checkValidEmailregex.test(email);
}
export function checkPhoneNumberValidity(phoneNumber) {
    return (phoneNumber.length === 10);
}
export function checkNameValidity(nameString) {
    return (nameString.trim() !== '');
}
export const checkNumberOnlyRegex = (/^[0-9\b]+$/);
export const intialSignupState = {
    phoneNumber: '',
    name: '',
    email: '',
    isphoneNumberValid: null,
    isEmailValid: null,
    isNameValid: null,
    isSignupDataValid: null,
    isEmailFocus: null,
    isPhoneNumberFocus: null,
    isNameFocus: null,
}
const signupReducer = (state, action) => {

    if (action.type === 'USER_PHONE_INPUT') {
        return {
            ...state,
            phoneNumber: action.phoneNumber,
            isSignupDataValid: (state.isEmailValid===true && state.isphoneNumberValid===true && state.isNameValid===true)
        }
    }

    if (action.type === 'USER_NAME_INPUT') {
        return {
            ...state,
            name: action.name,
            isSignupDataValid: (state.isEmailValid === true && state.isphoneNumberValid === true && state.isNameValid === true)
        }
    }
    if (action.type === 'USER_EMAIL_INPUT') {

        return {
            ...state,
            email: action.email,
            isSignupDataValid: (state.isEmailValid === true && state.isphoneNumberValid === true && state.isNameValid === true)
        }
    }
    if (action.type === 'PHONE_INPUT_BLUR') {

        return {
            ...state,
            isphoneNumberValid: checkPhoneNumberValidity(state.phoneNumber),
            isPhoneNumberFocus: false,
            isSignupDataValid: (state.isEmailValid === true && state.isphoneNumberValid === true && state.isNameValid === true)
        }
    }
    if (action.type === 'EMAIL_INPUT_BLUR') {
        return {
            ...state,
            isEmailValid: checkEmailValidity(state.email),
            isEmailFocus: false,
            isSignupDataValid: (state.isEmailValid === true && state.isphoneNumberValid === true && state.isNameValid === true)
        }
    }
    if (action.type === 'NAME_INPUT_BLUR') {
        return {
            ...state,
            isNameValid: checkNameValidity(state.name),
            isNameFocus: false,
            isSignupDataValid: (state.isEmailValid === true && state.isphoneNumberValid === true && state.isNameValid === true)
        }
    }
    if (action.type === 'PHONE_INPUT_FOCUS') {

        return {
            ...state,
            isPhoneNumberFocus: true,
            isSignupDataValid: (state.isEmailValid === true && state.isphoneNumberValid === true && state.isNameValid === true)
        }
    }
    if (action.type === 'EMAIL_INPUT_FOCUS') {

        return {
            ...state,
            isEmailFocus: true,
            isSignupDataValid: (state.isEmailValid === true && state.isphoneNumberValid === true && state.isNameValid === true)
        }
    }
    if (action.type === 'NAME_INPUT_FOCUS') {

        return {
            ...state,
            isNameFocus: true,
            isSignupDataValid: (state.isEmailValid === true && state.isphoneNumberValid === true && state.isNameValid === true)
        }
    }
    if (action.type === 'CLEAR_SIGNUP') {

        return intialSignupState;
    }
    return intialSignupState;
};
export { signupReducer };

