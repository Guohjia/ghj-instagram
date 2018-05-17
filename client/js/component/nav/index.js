import React, { Component } from "react";
import { Input } from "antd";
import Modal from "../modal";
import Post from "./post"
import Style from "./index.less";

export default class Nav extends Component{
    constructor(props){
        super(props)
        this.state={
            transformClass: "m-nav",
            post:false
        }
        this.onScroll = this.onScroll.bind(this);
        this.toPost = this.toPost.bind(this);
    }

    render(){
        return (
            <div className={Style.nav} ref={nav=>this.nav=nav} onScroll={this.onScroll}>
                <div className={this.state.transformClass}>
                    <div className="u-icon icon_left">
                        <a href="javascript:void(0)" className="bg_icon" onClick={this.toPost}>Ghj_Instagram</a>
                        <Modal goback={()=>{this.setState({post:false})}} show={this.state.post}>
                            <div className="m-post">
                                <Post modalClose={()=>{this.setState({post:false})}}/>
                            </div>
                        </Modal>
                    </div>
                    <div className="search">
                        <Input placeholder="搜索"/>
                    </div>
                    <div className="u-icon icon_right">
                        <a href="/" className="bg_icon bg_icon_index">首页</a>
                        <a href="javascript:void(0)" className="bg_icon bg_icon_post">动态</a>
                        <a href="/profile" className="bg_icon bg_icon_profile">个人主页</a>
                    </div>
                </div>
            </div>     
        )
    }
    toPost(){
        if(!window.login_user){return window.location.href = "/login";}
        this.setState({post:true})
    }
    onScroll(event){
        if(!event.srcElement.scrollingElement){return;}
        let scroll_Y=event.srcElement.scrollingElement.scrollTop;
        scroll_Y>0?this.setState({
            transformClass:"m-nav m-nav-scroll"
        }):this.setState({
            transformClass:"m-nav"
        });
    }
    componentDidMount(){
        window.addEventListener("scroll",this.onScroll)
    }

    componentWillUnmount(){
        window.removeEventListener("scroll",this.onScroll);
    }
}