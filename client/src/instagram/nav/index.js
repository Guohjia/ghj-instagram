import React, { Component } from "react";
import axios from "axios"
import { Input } from "antd";
import Style from "./index.less";

export default class Nav extends Component{
    constructor(props){
        super(props)
        this.state={
            transformClass: "m-nav"
        }
        this.onScroll = this.onScroll.bind(this);
        this.testFetch = this.testFetch.bind(this)
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
                        <a href="#" onClick={this.testFetch}>推荐用户</a>
                        <a href="#">动态</a>
                        <a href="#">个人主页</a>
                    </div>
                </div>
            </div>     
        )
    }

    testFetch(){
        axios.get("/test")
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            }); 
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