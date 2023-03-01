import React from 'react'

function Signup() {
    return (
        <div id="mySidenavSignup" className="sidenavSignup">
            <a id="cross" href="javascript:void(0)" className="closebtnSignup" onclick="closeNavSignup()">×</a>
            <p className="navloginSignup">Sign up</p>
            <p className="create_accSignup"><span>or </span><a href> login to your account</a></p>
            <div className="loginFoodSignup"><img src="./assets/login_food.png" alt /></div>
            <div className="loginInputSignup input1"><input type="text" placeholder="Phone Number" /></div>
            <div className="loginInputSignup input2"><input type="text" placeholder="Name" /></div>
            <div className="loginInputSignup input3"><input type="text" placeholder="Email" /></div>
            <p className="referral">Have a referral code?</p>
            <div className="loginButtonSignup"><button>CONTINUE</button></div>
            <div className="termsSignup">By creating an account, I accept the <strong>Terms &amp; Conditions</strong> &amp;
                <strong>Privacy Policy</strong></div>
        </div>

    )
}

export default Signup