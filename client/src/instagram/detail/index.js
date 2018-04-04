import React,{Component} from "react";
import Style from "./index.less";
// import { BrowserRouter as Router,Route,Link } from "react-router-dom";
import { icon as Icon } from "antd";

export default class Detail extends Component{
    constructor(props){
        super(props);
        this.detailId;
    }
    
    componentWillMount(){
        this.detailId=window.location.href.split("=")[1];
    }

    
    render(){
        // {this.detailId?} //没有detailId重定向到主页
        return (
            <div className={Style.detail}> 
                <div className="m-shadow">
                    <Icon type="close" style={{ fontSize: 30, color: "#fff",position: "absolute",right: "15px",top: "15px",cursor:"pointer"}}/>
                    <div className="m-detail">
                        <div className="m-pv">
                            <img src=""/>
                        </div>
                        <div className="m-ct">
                            这里是评论
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}














