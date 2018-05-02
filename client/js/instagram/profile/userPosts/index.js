import React, { Component } from "react";
import Style from "./index.less";
import { Tabs,icon as Icon  } from "antd";
import { getPostsById } from "../../../util/request"
import InfiniteScroll from "../../../component/infiniteScroll";

export default class UserPosts extends Component {
    constructor(props){
        super(props)
        this.state={
            tabKey:"post"
        }
    }
    
    render(){
        const TabPane = Tabs.TabPane;
        return (
            <div className={Style.UserPosts}>
                <Tabs defaultActiveKey="post" onChange={this.tabsChange.bind(this)}>
                    <TabPane tab="帖子" key="post">
                        <InfiniteScroll singlePath="/profile/detail/" getPosts={getPostsById} postParams={{postIds:JSON.stringify(window.login_user.post)}}/>
                    </TabPane>
                    <TabPane tab="收藏夹" key="favorite">
                        {this.state.tabKey !== "favorite"?
                            <div className="u_loading"><Icon type="loading" style={{ fontSize: 30}}/></div>:
                            <InfiniteScroll singlePath="/profile/detail/" getPosts={getPostsById} postParams={{postIds:JSON.stringify(window.login_user.collect)}}/>
                        }
                    </TabPane>
                </Tabs>
            </div>
        )
    }

    tabsChange(key){
        if(this.state.key!=="favorite"&&key === "favorite"){
            this.setState({
                tabKey:"favorite"
            })
        }
    }
}