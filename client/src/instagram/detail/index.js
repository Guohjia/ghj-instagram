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
        console.log(this.props)
    }

    
    render(){
        // {this.detailId?} //没有detailId重定向到主页
        let  detailId=this.props.location.pathname.split("/detail/")[1]
        return (
            <div className={Style.detail}> 
                <div className="m-shadow">
                    <Icon className="Icon-close" type="close" onClick={this.props.history.goBack.bind(this)}/>
                    <div className="m-detail">
                        <div className="m-pv">
                            <img src=""/>
                        </div>
                        <div className="m-ct">
                            <h1>detailId:{detailId}</h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}














