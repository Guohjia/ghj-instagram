
import React,{Component} from "react";
import Style from "./index.less";
import { Input } from "antd";
import { icon as Icon } from "antd";
import { connect } from "react-redux";
import { LIKE,UNLIKE } from "../../../../store/action/post";
import PropTypes from "prop-types";
import { reqLike,reqUnLike } from "../../../../util/request";

let TORENDER=false; 
//渲染控制,貌似connect对返回对象的watch只有一层;
//question:如果里面的数组改变,是不会触发重新render的 => 后续可能要优化
@connect(
    store => {
        TORENDER=!TORENDER;
        return {
            like:store.like,
            TORENDER:TORENDER
        }
    },
    dispatch => {
        return {
            onLike:id=>{
                reqLike({id:id}).then(function (res) {
                    if(res.data.code === 200){ //question:有点丑能不能封装下
                        dispatch(LIKE(id))
                    }else{
                        console.log("网络出错")
                    }
                })
            },
            unLike:id =>{
                reqUnLike({id:id}).then(function (res) {
                    if(res.data.code === 200){
                        dispatch(UNLIKE(id))
                    }else{
                        console.log("网络出错")
                    }
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
        // console.log(this.props)
        let { like = [],onLike,unLike } = this.props,targetId = location.pathname.split("/detail/")[1];
        return (
            <div className={Style.CommentAction}>
                <div className="m-action_icon">
                    <span className="btn action_like">
                        {like.indexOf(targetId) !==-1?
                            <Icon type="heart" style={{ color: "rgb(255,57,70)" }} className="icon" onClick={()=>{unLike(targetId)}}/>
                            :<Icon type="heart-o" className="icon" onClick={()=>{onLike(targetId)}}/>}
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


