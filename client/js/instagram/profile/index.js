import React, { Component } from "react";
import ReactDOM from "react-dom";
import Style from "./index.less";
import { Tabs } from "antd";
import UserSetting from "./userSetting";
import User_IMG1 from "../../../imgs/curry.jpg";
import Nav from "../../component/nav";
// import { Redirect } from "react-router-dom";

export default class Profile  extends Component {
    constructor(props){
        super(props);
        // this.state = {
        //     redirectToReferrer:true  //这里应该根据什么来判断?=> cookie?
        // }
    }
    
    render(){
        const TabPane = Tabs.TabPane;
        const {userName,post,follower,following } = window.login_user;
        // const { redirectToReferrer } =this.state
        // if (redirectToReferrer) {
        //     // return <Redirect to="/login" />;
        // }
        return (
            <div className="instagram">
                <Nav />
                <div className={Style.Profile}>
                    <div className="m-infor">
                        <div className="m-infor-left m-Pic">
                            <img src={User_IMG1} />
                        </div>
                        <div className="m-infor-right">
                            <div className="m-name">
                                <h1 className="name">{userName}</h1>
                                <UserSetting />
                                {/* 这里添加modal退出登陆用的 */}
                            </div>
                            <div className="m-activity-num">
                                <span>{post}帖子</span>
                                <span className="follower">{follower}关注者</span>
                                <span>正在关注{following}</span>
                            </div>
                        </div>
                    </div>
                    <div className="m-activity">
                        <Tabs defaultActiveKey="post" onChange={this.tabsChange.bind(this)}>
                            <TabPane tab="帖子" key="post">这里是帖子</TabPane>
                            <TabPane tab="收藏夹" key="favorite">这里是收藏夹</TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        )
    }

    tabsChange(){
        console.log("tabsChange....")
    }   
}

ReactDOM.render(
    <Profile />,
    document.getElementById("root")
)