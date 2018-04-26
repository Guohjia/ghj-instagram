
import React,{Component} from "react";
import Style from "./index.less";
import { Input } from "antd";
import { icon as Icon } from "antd";
import { connect } from "react-redux";
import { LIKE,UNLIKE,COLLECT,UNCOLLECT } from "../../../../store/action/post";
import PropTypes from "prop-types";
import { reqLike,reqUnLike,reqCollect,reqUnCollect } from "../../../../util/request";

let TORENDER=false; 
//渲染控制,貌似connect对返回对象的watch只有一层;
//question:如果里面的数组改变,是不会触发重新render的 => 后续可能要优化
@connect(
    store => {
        TORENDER=!TORENDER;
        return {
            like:store.like,
            collect:store.collect,
            TORENDER:TORENDER
        }
    },
    dispatch => {
        return {
            onLike:id=>{
                reqLike({id:id}).then(res =>{ dispatch(LIKE(id)) })
            },
            unLike:id =>{
                reqUnLike({id:id}).then(res =>{ dispatch(UNLIKE(id)) })
            },
            onCollect:id=>{
                reqCollect({id:id}).then(res =>{ dispatch(COLLECT(id)) })
            },
            unCollect:id =>{
                reqUnCollect({id:id}).then(res =>{ dispatch(UNCOLLECT(id)) })
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
        let { like = [],collect = [],onLike,unLike,onCollect,unCollect } = this.props,targetId = location.pathname.split("/detail/")[1];
        return (
            <div className={Style.CommentAction}>
                <div className="m-action_icon">
                    <span className="btn action_like">
                        {like.indexOf(targetId) !==-1?
                            <Icon type="heart" style={{ color: "rgb(255,57,70)" }} className="icon" onClick={()=>{unLike(targetId)}}/>
                            :<Icon type="heart-o" className="icon" onClick={()=>{onLike(targetId)}}/>}
                    </span>
                    <span className="btn action_cm"><Icon type="message" className="icon"/></span>
                    <span className="btn action_collect">
                        {collect.indexOf(targetId) !==-1?
                            <Icon type="star" style={{ color: "rgb(255,57,70)" }} className="icon" onClick={()=>{unCollect(targetId)}}/>
                            :<Icon type="star-o" className="icon" onClick={()=>{onCollect(targetId)}}/>}
                    </span>
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
    onCollect: PropTypes.func,
    unCollect: PropTypes.func,
    like: PropTypes.array,
    collect: PropTypes.array
}


