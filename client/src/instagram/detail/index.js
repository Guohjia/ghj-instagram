import React,{Component} from "react";
import Style from "./index.less";
// import { BrowserRouter as Router,Route,Link } from "react-router-dom";
import { icon as Icon } from "antd";

export default class Detail extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <div className={Style.detail}> 
                <div className="m-shadow">
                    <Icon type="close" style={{ fontSize: 30, color: "#fff",position: "absolute",right: "15px",top: "15px",cursor:"pointer"}}/>
                    <div className="m-detail">
                        <div className="m-pv">
                            <img src=""/>
                        </div>
                        <div className="m-ct">
                            这里是评论内容
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}














