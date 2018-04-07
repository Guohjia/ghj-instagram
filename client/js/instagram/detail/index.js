import React,{Component} from "react";
import Style from "./index.less";
// import { BrowserRouter as Router,Route,Link } from "react-router-dom";
import { icon as Icon } from "antd";
import User_IMG1 from "../../../imgs/curry.jpg";
import PropTypes from "prop-types";
import Comment from "./comment";

export default class Detail extends Component{
    constructor(props){
        super(props);
    }
    
    componentWillMount(){
        // console.log(this.props)
    }

    
    render(){
        // {this.detailId?} //没有detailId重定向到主页
        // let  detailId=this.props.location.pathname.split("/detail/")[1]
        return (
            <div className={Style.detail}> 
                <div className="m-shadow">
                    <Icon className="Icon-close" type="close" onClick={this.props.history.goBack.bind(this)}/>
                    <div className="m-detail">
                        <div className="m-pv">
                            <img className="pv" src={User_IMG1} />
                        </div>
                        <div className="m-ct">
                            <div className="user">
                                <img className="user_pic" src={User_IMG1} />
                                <span className="user_name">stephencurry30   •</span>
                                <span className="attention_btn btn">关注</span>
                            </div>
                            <Comment />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


Detail.propTypes = {
    history: PropTypes.object.isRequired
    // // location: PropTypes.object.isRequired
    // pathname: PropTypes.string.isRequired
}












