
import React,{Component} from "react";
import Style from "./index.less";
import { Input } from "antd";
import { icon as Icon,Modal } from "antd";
import { connect } from "react-redux";
import { LIKE,UNLIKE,COLLECT,UNCOLLECT } from "../../../../store/action/user";
import { LIKE_NUM,UNLIKE_NUM,COLLECT_NUM,UNCOLLECT_NUM } from "../../../../store/action/post";
import PropTypes from "prop-types";
import { reqLike,reqUnLike,reqCollect,reqUnCollect,reqComment } from "../../../../util/request";
import { dateDuration } from "../../../../util/fn";

let TORENDER=false; 

//渲染控制,貌似connect对返回对象的watch只有一层;
//question:如果里面的数组改变,是不会触发重新render的 => 后续可能要优化
@connect(
    store => {
        TORENDER=!TORENDER;
        console.log(store)
        return {
            like:store.user.like,
            likeNum:store.post.likeNum,
            collectNum:store.post.collectNum,
            collect:store.user.collect,
            TORENDER:TORENDER
        }
    },
    dispatch => {
        return {
            onLike:id=>{
                reqLike({id:id}).then(res =>{ dispatch(LIKE(id));dispatch(LIKE_NUM) })
            },
            unLike:id =>{
                reqUnLike({id:id}).then(res =>{ dispatch(UNLIKE(id));dispatch(UNLIKE_NUM) })
            },
            onCollect:id=>{
                reqCollect({id:id}).then(res =>{ dispatch(COLLECT(id));dispatch(COLLECT_NUM) })
            },
            unCollect:id =>{
                reqUnCollect({id:id}).then(res =>{ dispatch(UNCOLLECT(id));dispatch(UNCOLLECT_NUM) })
            }
        };
    }
)
export default class CommentAction extends Component{
    constructor(props){
        super(props);
        this.state = {
            commentValue:"",
            logIn_Modal:false
        }

        this.ifLogin = this.ifLogin.bind(this);
    }

    render(){
        // console.log(this.props)
        let { like = [],collect = [],onLike,unLike,onCollect,unCollect,likeNum=0,collectNum=0 } = this.props,postId = location.pathname.split("/detail/")[1];
        return (
            <div className={Style.CommentAction}>
                <div className="m-action_icon">
                    <span className="btn action_like">
                        {like.indexOf(postId) !==-1?
                            <Icon type="heart" style={{ color: "rgb(255,57,70)" }} className="icon" onClick={()=>{unLike(postId)}}/>
                            :<Icon type="heart-o" className="icon" onClick={()=>{if(this.ifLogin())onLike(postId)}}/>}
                    </span>
                    <span className="btn action_cm" onClick={()=>{this.commentInput.focus()}}><Icon type="message" className="icon"/></span>
                    <span className="btn action_collect">
                        {collect.indexOf(postId) !==-1?
                            <Icon type="star" style={{ color: "rgb(255,57,70)" }} className="icon" onClick={()=>{unCollect(postId)}}/>
                            :<Icon type="star-o" className="icon" onClick={()=>{if(this.ifLogin())onCollect(postId)}}/>}
                    </span>
                    <div  className="u-clear">
                        {likeNum>0?<div className="like_num">{likeNum}次赞</div>:null}
                        {collectNum>0?<div className="collect_num">{collectNum}次收藏</div>:null}
                    </div>
                    <div className="com_date">{dateDuration(this.props.postDuration)}</div>
                </div>
                <div className="comment_input">     
                    <Input placeholder="Add Comment" value={ this.state.commentValue } onInput={ this.onInput.bind(this) } 
                        ref={input=>this.commentInput=input} onPressEnter={e =>{if(this.ifLogin())this.onComment.call(this,e,postId)}}/>
                </div>
                <Modal
                    title="还未登录不能操作哦 😣"
                    visible={this.state.logIn_Modal}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel.bind(this)}
                    okText="现在就去登录"
                    cancelText="不了,我随便逛逛就行"
                >
                    <p style={{color: "#333",fontSize:16,textAlign:"center"}}>登录后再来操作吧  😉</p>
                </Modal>
            </div> 
        )

    }

    handleOk(){
        window.location.href = "/login";
    }

    handleCancel(){
        this.setState(Object.assign(this.state,{logIn_Modal:false}))
    }

    ifLogin(){
        if(!window.login_user){
            this.setState(Object.assign(this.state,{logIn_Modal:true}))
            return false;
        }else{
            return true;
        }
    }

    onInput(e){
        this.setState(Object.assign(this.state,{commentValue:e.target.value}));
    }

    onComment(e,post){
        if(!e.target.value){return;}
        let content = e.target.value;
        reqComment({
            content:content,
            userName:window.login_user.userName,
            post:post
        }).then(res =>{
            let newComment = {
                content:content,
                userName:window.login_user.userName,
                _id:res.data.id
            };
            this.props.addComment(newComment);
            this.setState(Object.assign(this.state,{commentValue:""}));
        })
    }
}



CommentAction.propTypes = {
    onLike: PropTypes.func,
    unLike: PropTypes.func,
    onCollect: PropTypes.func,
    unCollect: PropTypes.func,
    like: PropTypes.array,
    likeNum:PropTypes.number,
    collectNum:PropTypes.number,
    collect: PropTypes.array,
    addComment: PropTypes.func,
    postDuration:PropTypes.string
}


