import React from "react";
import ReactDOM from "react-dom"
// import WrappedNormalLoginForm from "./signIn";
import WrappedRegistrationForm from "./signUp";
import "./index.css";


// const SignInSignUp = () =>{
//     return (
//         <div className={Style.SignInSignUp}>
//             <WrappedNormalLoginForm />
//             <WrappedRegistrationForm />
//         </div>
//     )
// }


// export default SignInSignUp
ReactDOM.render(
    <WrappedRegistrationForm />,
    document.getElementById("root")
)
