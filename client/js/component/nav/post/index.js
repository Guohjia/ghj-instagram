import React, { Component } from "react";
import Style from "./index.less";
import { message,Input,Button } from "antd";
import PicturesWall from "./Upload";
import { sendPost } from "../../../util/request";
import { POST } from "../../../store/action/user";
import store from "../../../store/store";
import PropTypes from "prop-types";

export default class Post extends Component{
    constructor(props){
        super(props)
        this.state={
            pvUrl: "",
            content:"",
            pubLoading:false
        }
    }

    render(){
        const { TextArea } = Input;
        return (
            <div className={`${Style.Post} u-center`}>
                <div className="m-postContent">
                    <TextArea rows={4} placeholder="说些什么吧..." onBlur={this.getContent.bind(this)} ref={textArea=>this.textArea=textArea}/>
                </div>
                <div className="m-postUpload u-clear">
                    <PicturesWall getUrl={this.getUrl.bind(this)}/>
                </div>
                <div className="post_btn">
                    <Button type="primary" loading={this.state.pubLoading} onClick={this.publish.bind(this)}>
                        发布动态
                    </Button>
                </div>
            </div>     
        )
    }
    
    getContent(event){
        if(!event.target.value){return;}
        let textValue = event.target.value;
        this.setState(Object.assign(this.state,{content:textValue}))
    }
    
    getUrl(url){
        if(!url){return;}
        this.setState(Object.assign(this.state,{pvUrl:url}))
    }

    publish(){
        if(!this.state.content.trim()){message.info("说些什么再发布吧");return;}
        if(!this.state.pvUrl){message.info("上传图片分享下吧");return;}
        this.setState(Object.assign(this.state,{pubLoading:true})) //回调函数里面设置为false;
        let { content,pvUrl } = this.state;
        let post = {
            content:content,
            pvUrl:"http://ovqcrw9cu.bkt.clouddn.com/"+pvUrl,
            commentNum: 0,
            likeNum: 0,
            collectNum: 0,
            from:window.login_user._id
        }
        
        sendPost(post).then((res)=>{
            this.setState(Object.assign(this.state,{pubLoading:false}));
            store.dispatch(POST(res.data.id))
            this.props.modalClose();
            message.success("发布成功👍🤣");
            window.location.reload();
        })
    }
}


Post.propTypes = {
    modalClose: PropTypes.func.isRequired
}