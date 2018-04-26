import React from "react";
import ReactDOM from "react-dom";
import WrappedNormalLoginForm from "./signIn";
import WrappedRegistrationForm from "./signUp";
import "./index.less";

class SignInSignUp extends React.Component{ 
    constructor(props){
        super(props);
        this.state = {
            show:"ToSignIn"
        }
    }

    ToSignIn(){
        this.setState({
            show:"ToSignIn"
        })
    }

    ToSignUp(){
        this.setState({
            show:"ToSignUp"
        })
    }
    render(){
        const { show } = this.state
        return (
            <div className={`signInsignUpWrap ${show}`}>
                <div className="m-signUp">
                    <WrappedRegistrationForm ToSignIn={this.ToSignIn.bind(this)}/>
                </div>
                <div className="m-signIn">
                    <WrappedNormalLoginForm ToSignUp={this.ToSignUp.bind(this)}/>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <SignInSignUp />,
    document.getElementById("root")
)
