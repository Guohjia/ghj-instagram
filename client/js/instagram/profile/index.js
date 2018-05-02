import React, { Component } from "react";
import ReactDOM from "react-dom";
import Style from "./index.less";
import UserPosts from "./userPosts";
import UserInfor from "./userInfor";
import Nav from "../../component/nav";
import { BrowserRouter as Router,Route} from "react-router-dom";
import Detail from "../detail";
import store from "../../store/store";
import { Provider } from "react-redux";

export default class Profile  extends Component {
    constructor(props){
        super(props);
    }

  
    render(){
        return (
            <div className="instagram">
                <Nav />
                <div className={Style.Profile}>
                    <div className="m-infor">
                        <UserInfor />
                    </div>
                    <Router>
                        <div className="m-activity">
                            <UserPosts />
                            <Route path="/profile/detail/" component={Detail}/>
                        </div>
                    </Router>
                </div>
            </div>
        )
    } 
}

ReactDOM.render(
    <Provider store={store}>
        <Profile />
    </Provider>,
    document.getElementById("root")
)