import React,{Component} from "react";
import Style from "./index.less";
import PropTypes from "prop-types";
import Comment from "./comment";
import Modal from "../../component/modal";
import { connect } from "react-redux";
import { FOLLOW,UNFOLLOW } from "../../store/action/post";
import { reqFollow,reqUnFollow } from "../../util/request";
import { getPost } from "../../util/request";
import { message } from "antd";

let TORENDER=false;
@connect(
    store => {
        TORENDER =!TORENDER;
        return {
            following:store.following,
            TORENDER:TORENDER
        }
    },
    dispatch => {
        return {
            onFollow:id=>{
                if(!window.login_user){return window.location.href = "/login";}
                if(window.login_user._id === id ){return message.info("你不用关注你自己哦😅")}
                reqFollow({id:id}).then(res =>{ dispatch(FOLLOW(id)) })
            },
            unFollow:id =>{
                reqUnFollow({id:id}).then(res =>{ dispatch(UNFOLLOW(id)) })
            }
        };
    }
)
export default class Detail extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:{},
            post:{}
        }
    }

    componentDidMount(){
        let postId=this.props.location.pathname.split("/detail/")[1];
        getPost({postId:postId}).then( res => {
            this.setState({
                user:res.data.user,
                post:res.data.post
            })
        })
    }

    render(){
        let { user,post } = this.state;
        let { following,onFollow,unFollow } =this.props;
        return (
            <Modal goback={this.props.history.goBack} show={true}>
                <div className={Style.detail}>
                    <div className="m-pv">
                        <img className="pv" src={post.pvUrl} />
                    </div>
                    <div className="m-ct">
                        <div className="user">
                            <img className="user_pic" src={user.userImg} />
                            <span className="user_name">{user.userName}   •</span>
                            { !following || following.indexOf(user._id) === -1?
                                <span className="attention_btn btn" onClick={()=>{onFollow(user._id)}}>关注</span>:
                                <span className="attention_btn btn" style={{color: "#262626"}} onClick={()=>{unFollow(user._id)}}>已关注</span>
                            }
                        </div>
                        <div style={{padding: "10px 25px",color: "#666"}}>{post.content}</div>
                        <Comment />
                    </div>
                </div>
            </Modal>
        )
    }
}


Detail.propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    following: PropTypes.array,
    onFollow: PropTypes.func,
    unFollow: PropTypes.func
}












