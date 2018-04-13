import React,{Component} from "react";
import Style from "./index.less";
import PropTypes from "prop-types";
import Comment from "./comment";
import Modal from "../../component/modal";
import User_IMG1 from "../../../imgs/curry.jpg";



export default class Detail extends Component{
    constructor(props){
        super(props);
    }
        
    render(){
        // {this.detailId?} //没有detailId重定向到主页
        // let  detailId=this.props.location.pathname.split("/detail/")[1]
        return (
            <Modal goback={this.props.history.goBack} show={true}>
                <div className={Style.detail}>
                    <div className="m-pv">
                        <img className="pv" src={User_IMG1} />
                    </div>
                    <div className="m-ct">
                        <div className="user">
                            <img className="user_pic" src={User_IMG1} />
                            <span className="user_name">stephencurry30   •</span>
                            <span className="attention_btn btn">关注</span>
                        </div>
                        <Comment />
                    </div>
                </div>
            </Modal>
        )
    }
}


Detail.propTypes = {
    history: PropTypes.object.isRequired
}












