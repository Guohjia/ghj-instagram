import React,{Component} from "react";
import Style from "./index.less";
import PropTypes from "prop-types";
import Comment from "./comment";
import Modal from "../../component/modal";
import User_IMG1 from "../../../imgs/curry.jpg";
import { getPost } from "../../util/request";

export default class Detail extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:{},
            post:{}
        }
    }

    componentDidMount(){
        let postId=this.props.location.pathname.split("/detail/")[1];
        getPost({postId:postId}).then( res => {
            this.setState({
                user:res.data.user,
                post:res.data.post
            })
        })
    }

    render(){
        const { user,post } = this.state;
        return (
            <Modal goback={this.props.history.goBack} show={true}>
                <div className={Style.detail}>
                    <div className="m-pv">
                        <img className="pv" src={post.pvUrl} />
                    </div>
                    <div className="m-ct">
                        <div className="user">
                            <img className="user_pic" src={User_IMG1} />
                            <span className="user_name">{user.userName}   •</span>
                            <span className="attention_btn btn">关注</span>
                        </div>
                        <div style={{padding: "10px 25px",color: "#666"}}>{post.content}</div>
                        <Comment />
                    </div>
                </div>
            </Modal>
        )
    }
}


Detail.propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
}












