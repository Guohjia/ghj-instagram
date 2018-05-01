import React, { Component } from "react";
import Style from "./index.less";
import { Tabs } from "antd";
export default class UserPosts extends Component {
    constructor(props){
        super(props)
    }

    render(){
        const TabPane = Tabs.TabPane;
        return (
            <div className={Style.UserPosts}>
                <Tabs defaultActiveKey="post" onChange={this.tabsChange.bind(this)}>
                    <TabPane tab="帖子" key="post">这里是帖子</TabPane>
                    <TabPane tab="收藏夹" key="favorite">这里是收藏夹</TabPane>
                </Tabs>
            </div>
        )
    }

    tabsChange(){
        console.log("tabsChange....")
    }  
}