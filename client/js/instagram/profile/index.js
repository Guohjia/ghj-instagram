import React, { Component } from "react";
import Style from "./index.less";

export default class Profile  extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className={Style.Profile}>
                <h1>个人主页</h1>
            </div>
        )
    }
}