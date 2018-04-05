
import React,{Component} from "react";
import Style from "./index.less";
import { Input } from "antd";
import { icon as Icon } from "antd";

export default class CommentAction extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className={Style.CommentAction}>
                <div className="m-action_icon">
                    <span className="btn action_like"><Icon type="heart-o" className="icon"/></span>
                    <span className="btn action_cm"><Icon type="message" className="icon"/></span>
                    <span className="btn action_collect"><Icon type="tag-o" className="icon"/></span>
                    <div className="like_num">1001次赞</div>
                    <div className="com_date">1天前</div>
                </div>
                <div className="comment_input">
                    <Input placeholder="Add Comment" />
                </div>
            </div> 
        )

    }
}






