import React, { Component } from "react";
import ReactDOM from "react-dom";
import Style from "./index.less";
import { Tabs } from "antd";
import UserSetting from "./userSetting";
import Nav from "../../component/nav";
import { Upload,message } from "antd";
import { updateProtrait } from "../../util/request"

const Upload_Token = "HjqY4nn-N7JIBvt1YPDzj4gHjhEte-asl4hQdxHz:NHVUgiTeHWyxR3RqQWIP0y4OKrE=:eyJzY29wZSI6Im11c2ljIiwiZGVhZGxpbmUiOjE4NjI4NDUyMDB9";
export default class Profile  extends Component {
    constructor(props){
        super(props);
        const { userName,post,follower,following,userImg } = window.login_user;
        this.state = {
            userName:userName,
            post:post,
            follower:follower,
            following:following,
            userImg:userImg
        }
    }

    handleChange = ({ fileList,file }) => {
        if(file.status === "error"){message.error("上传图片出错");return;}
        if(file.status!== "done"){return;}
        let { response } = file;
        if(response.hash){
            let userImg="http://ovqcrw9cu.bkt.clouddn.com/"+response.hash+"?imageView2/1/w/150/h/150/format/png/q/75|imageslim";
            this.setState(Object.assign(this.state,{
                userImg:userImg
            }))
            updateProtrait({userImg:userImg}).then(()=>{message.success("成功更新头像")})
        }
    }
  
    render(){
        const TabPane = Tabs.TabPane;
        const { userName,post,follower,following,userImg } = this.state;
        return (
            <div className="instagram">
                <Nav />
                <div className={Style.Profile}>
                    <div className="m-infor">
                        <div className="m-infor-left m-Pic">
                            <Upload
                                action="http://upload.qiniup.com/"
                                data={{token:Upload_Token}}
                                onChange={this.handleChange.bind(this)}
                            >
                                <img src={userImg} />
                            </Upload>
                        </div>
                        <div className="m-infor-right">
                            <div className="m-name">
                                <h1 className="name">{userName}</h1>
                                <UserSetting />
                                {/* 这里添加modal退出登陆用的 */}
                            </div>
                            <div className="m-activity-num">
                                <span>{post.length}帖子</span>
                                <span className="follower">{follower.length}关注者</span>
                                <span>正在关注{following.length}</span>
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