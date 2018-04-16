import React, { Component } from "react";
import { Input } from "antd";
import Style from "./index.less";

export default class Nav extends Component{
    constructor(props){
        super(props)
        this.state={
            transformClass: "m-nav"
        }
        this.onScroll = this.onScroll.bind(this);
    }

    render(){
        return (
            <div className={Style.nav} ref={nav=>this.nav=nav} onScroll={this.onScroll}>
                <div className={this.state.transformClass}>
                    <div className="u-icon icon_left">
                        <a href="#">Ghj_Instagram</a>
                    </div>
                    <div className="search">
                        <Input placeholder="搜索"/>
                    </div>
                    <div className="u-icon icon_right">
                        <a href="javascript:void(0)">推荐用户</a>
                        <a href="javascript:void(0)">动态</a>
                        <a href="/profile">个人主页</a>
                    </div>
                </div>
            </div>     
        )
    }

    onScroll(event){
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