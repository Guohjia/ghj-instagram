import React, { Component } from "react";
import ReactDOM from "react-dom";
import Style from "./index.less";
import UserSetting from "./userSetting";
import UserPosts from "./userPosts";
import Nav from "../../component/nav";
import { Upload,message } from "antd";
import { updateProtrait } from "../../util/request"
import { BrowserRouter as Router,Route} from "react-router-dom";
import Detail from "../detail";

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
                            </div>
                            <div className="m-activity-num">
                                <span>{post.length}帖子</span>
                                <span className="follower">{follower.length}关注者</span>
                                <span>正在关注{following.length}</span>
                            </div>
                        </div>
                    </div>
                    <Router>
                        <div className="m-activity">
                            <UserPosts />
                            <Route path="/detail" component={Detail}/>
                        </div>
                    </Router>
                </div>
            </div>
        )
    } 
}

ReactDOM.render(
    <Profile />,
    document.getElementById("root")
)