import React, { Component } from "react";
import Style from "./index.less";
import { Tabs } from "antd";
import { icon as Icon } from "antd";
import User_IMG1 from "../../../imgs/curry.jpg";

export default class Profile  extends Component {
    constructor(props){
        super(props)
    }

    render(){
        const TabPane = Tabs.TabPane;
        return (
            <div className={Style.Profile}>
                <div className="m-infor">
                    <div className="m-infor-left m-Pic">
                        <img src={User_IMG1} />
                    </div>
                    <div className="m-infor-right">
                        <div className="m-name">
                            <span className="name">GuohJia</span>
                            <Icon type="tool" className="setting"/>
                            {/* 这里添加modal退出登陆用的 */}
                        </div>
                        <div className="m-activity-num">
                            <a href="#">0帖子</a>
                            <a href="#" className="follower">0关注者</a>
                            <a href="#">正在关注0</a>
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
        )
    }

    tabsChange(){
        console.log("tabsChange....")
    }   
}