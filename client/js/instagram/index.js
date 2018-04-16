import React from "react";
import "./index.less";
import Nav from "../component/nav";
import FindUser from "./findUser";
import Explore from "./explore";
// import Profile from "./profile";
import Detail from "./detail";
// import WrappedNormalLoginForm from "./signInsignUp";
import { BrowserRouter as Router,Route,Switch} from "react-router-dom";

const Instagram=()=>{
    return (
        <Router>
            {/* <Switch>
                <Route path="/login" component={WrappedNormalLoginForm}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/" component={()=><div className="User_Explore">
                    <Nav />
                    <FindUser />
                    <Explore />
                </div>}/>
            </Switch> */}
            <div className="instagram">
                <Nav />
                <Route path="/detail" component={Detail}/>
                <Switch>
                    {/* <Route path="/profile" component={Profile}/> */}
                    <Route path="/" component={()=><div className="User_Explore">
                        <FindUser />
                        <Explore />
                    </div>}/>
                </Switch>
            </div>
        </Router>
    )
}

export default Instagram