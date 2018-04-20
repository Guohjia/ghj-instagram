
import React,{Component} from "react";
import Style from "./index.less";
import { Input } from "antd";
import { icon as Icon } from "antd";
import { connect } from "react-redux";
import actionLike from "../../../../store/action/post";
import PropTypes from "prop-types";
import { Like,unLike } from "../../../../util/request"
@connect(
    store => {
        console.log(store.like)  //貌似由于再store中like依然为数组,因此改变时无法重新进入render?
        // let { initUser } = store;
        return {
            like:store.like
            // LIKE:store.LIKE
        }
    },
    dispatch => {
        return {
            onLike:(like,targetId)=>{
                if(like.indexOf(targetId) === -1){
                    like.push(targetId);
                }
                Like({id:targetId}).then(function (response) {
                    // console.log(response);
                    dispatch(actionLike(like))
                })
            },
            unLike:(like,targetId) =>{
                let newLike = like.filter((item)=>(item!==targetId));
                console.log(newLike)
                unLike({id:targetId}).then(function (response) {
                    // console.log(response);
                    dispatch(actionLike(newLike))
                })
            }
        };
    }
)
export default class CommentAction extends Component{
    constructor(props){
        super(props)
    }

    render(){
        console.log(this.props);
        let { like = [],onLike,unLike } = this.props,targetId = location.pathname.split("/detail/")[1];
        return (
            <div className={Style.CommentAction}>
                <div className="m-action_icon">
                    <span className="btn action_like">
                        {like.indexOf(targetId) !==-1?
                            <Icon type="heart" style={{ color: "rgb(255,57,70)" }} className="icon" onClick={()=>{unLike(like,targetId)}}/>
                            :<Icon type="heart-o" className="icon" onClick={()=>{onLike(like,targetId)}}/>}
                    </span>
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



CommentAction.propTypes = {
    onLike: PropTypes.func,
    unLike: PropTypes.func,
    like: PropTypes.array
}


