import React from "react";
import "./instagram.less";
import Nav from "../nav/nav";
import FindUser from "../findUser/findUser"


let Instagram=()=>{
    return (
        <div className="instagram">
            <Nav />
            <FindUser />
        </div>
    )
}

export default Instagram