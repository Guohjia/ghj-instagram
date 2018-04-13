import React, { Component } from "react";
import Style from "./index.less";
import { icon as Icon } from "antd";
import Modal from "../../../component/modal";

export default class UserSetting extends Component {
    constructor(props){
        super(props)
        this.state = {
            setting:false
        }
        this.showModal = this.showModal.bind(this)
    }

    render(){
        return (
            <div className={Style.UserSetting}>
                <Icon type="tool" className="u-Control" onClick={()=>{this.setState({setting:true})}}/>
                <Modal goback={()=>{this.setState({setting:false})}} show={this.state.setting}>
                    <div className="m-options">
                        <ul>
                            <li className="password">更改密码</li>
                            <li className="exit">退出</li>
                            <li className="cancel" onClick={()=>{this.setState({setting:false})}}>取消</li>
                        </ul>
                    </div>
                </Modal>
                {/* 这里添加modal退出登陆用的 */}
            </div>
        )
    }

    showModal(){

    }
}