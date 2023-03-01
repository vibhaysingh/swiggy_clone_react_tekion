import React from 'react'

function Login() {
    return (
        <div id="mySidenav" className="sidenav">
            <a id="cross" href="javascript:void(0)" className="closebtn" onclick="closeNav()">×</a>
            <p className="navlogin">Login</p>
            <p className="create_acc"><span>or</span><a href> create an account</a></p>
            <div className="loginFood"><img src="./assets/login_food.png" alt /></div>
            <div className="loginInput"><input type="text" placeholder="Phone Number" /></div>
            <div className="loginButton"><button>LOGIN</button></div>
            <div className="terms">By clicking on Login, I accept the <strong>Terms &amp; Conditions</strong> &amp; <strong> Privacy
                Policy </strong> </div>
        </div>

    )
}

export default Login