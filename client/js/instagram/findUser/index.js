import React,{Component} from "react";
import { Button,Icon } from "antd";
import Style from "./index.less";
import { getUsers } from "../../util/request"
import { connect } from "react-redux";
import { FOLLOW,UNFOLLOW } from "../../store/action/user";
import { reqFollow,reqUnFollow } from "../../util/request";
import PropTypes from "prop-types";

let TORENDER=false;
@connect(
    store => {
        TORENDER =!TORENDER;
        return {
            following:store.user.following,
            TORENDER:TORENDER
        }
    },
    dispatch => {
        return {
            onFollow:id=>{
                if(!window.login_user){return window.location.href = "/login";}
                reqFollow({id:id}).then(res =>{ dispatch(FOLLOW(id)) })
            },
            unFollow:id =>{
                reqUnFollow({id:id}).then(res =>{ dispatch(UNFOLLOW(id)) })
            }
        };
    }
)
export default class FindUser extends Component{
    constructor(props){
        super(props)
        this.state ={
            users:[],
            spin:false
        }
    }

    componentDidMount(){
        getUsers().then( res =>{
            this.setState({
                users:res.data.users,
                spin:false
            })
        })
    }

    moreUsers(){
        this.setState(Object.assign(this.state,{spin:true}))
        getUsers().then( res =>{
            this.setState(Object.assign(this.state,{users:res.data.users}))
            setTimeout(()=>{
                this.setState(Object.assign(this.state,{spin:false}))
            },800)
        })
    }

    followLoading(loading){
        this.setState(Object.assign(this.state,{
            follow_load:loading
        }))
    }

    render(){
        let {users,spin,follow_load} = this.state,renderUsers;
        let { following,onFollow,unFollow } =this.props;
        if(users.length>0){
            renderUsers=users.map((item)=>{
                return (
                    <li key={item._id}>
                        <a href="#" className="user_img"><img src={item.userImg} /></a>
                        <div className="name">
                            <a href="#">{item.userName}</a>
                            <span className="icon"></span>
                        </div>
                        { !following || following.indexOf(item._id) === -1?
                            <Button type="primary" loading={follow_load} onClick={()=>{onFollow(item._id)}}>关注</Button>:
                            <Button type="primary" loading={follow_load} className="btn_unfollow" onClick={()=>{unFollow(item._id)}}>已关注</Button>
                        }
                        
                    </li>
                )
            })
        }else{
            renderUsers = <li><Icon type="loading" style={{ fontSize: 30}}/></li>
        }

        return (
            <div  className={Style.findUser}>
                <div className="hd">
                    <a href="#" className="u_more" onClick={this.moreUsers.bind(this)}>
                        <span style={{ marginRight: 5 }}>查看更多</span>
                        <Icon type="reload" style={{ color: "#08c" }} spin={spin}/>
                    </a>
                    <h2>发现用户</h2>
                </div>
                <ul>
                    {renderUsers}
                </ul>
            </div>
        )
    }
}

FindUser.propTypes = {
    following: PropTypes.array,
    onFollow: PropTypes.func,
    unFollow: PropTypes.func
}
