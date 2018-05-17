import React, { Component } from "react";
import Style from "./index.less";
import { Upload,message } from "antd";
import { updateProtrait } from "../../../util/request";
import UserSetting from "../userSetting";

const Upload_Token = "HjqY4nn-N7JIBvt1YPDzj4gHjhEte-asl4hQdxHz:NHVUgiTeHWyxR3RqQWIP0y4OKrE=:eyJzY29wZSI6Im11c2ljIiwiZGVhZGxpbmUiOjE4NjI4NDUyMDB9";
export default class UserInfor extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { userName,post,follower,following,userImg } = window.login_user;
        return (
            <div className={Style.UserInfor}>
                <div className="m-infor-left m-Pic">
                    <Upload
                        action="http://upload.qiniup.com/"
                        data={{ token: Upload_Token }}
                        onChange={this.handleChange.bind(this)}
                    >
                        <img src={userImg} />
                    </Upload>
                </div>
                <div className="m-infor-right">
                    <div className="m-name">
                        <h1 className="name">{userName}</h1>
                        <UserSetting />
                    </div>
                    <div className="m-activity-num">
                        <span>{post.length}帖子</span>
                        <span className="follower">{follower.length}关注者</span>
                        <span>正在关注{following.length}</span>
                    </div>
                </div>
            </div>
        )
    }

    handleChange = ({ fileList,file }) => {
        if(file.status === "error"){message.error("上传图片出错");return;}
        if(file.status!== "done"){return;}
        let { response } = file;
        if(response.hash){
            let userImg="http://ovqcrw9cu.bkt.clouddn.com/"+response.hash+"?imageView2/1/w/150/h/150/format/png/q/75|imageslim";
            this.setState({
                userImg:userImg
            })
            updateProtrait({userImg:userImg}).then(()=>{message.success("成功更新头像")})
        }
    }
}