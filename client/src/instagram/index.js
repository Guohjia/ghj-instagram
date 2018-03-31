import React from "react";
import "./index.less";
import Nav from "./nav";
import FindUser from "./findUser";
import Explore from "./explore";

let Instagram=()=>{
    return (
        <div className="instagram">
            <Nav />
            <FindUser />
            <Explore />
        </div>
    )
}

export default Instagram