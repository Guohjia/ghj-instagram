import React,{Component} from "react";
import { Button } from "antd";
import Style from "../styles/findUser.less";

import User_IMG1 from "../../imgs/curry.jpg";
import User_IMG2 from "../../imgs/van.jpg";
import User_IMG3 from "../../imgs/syz.jpg";

export default class FindUser extends Component{
    constructor(props){
        super(props)
        
        this.data=[
            {
                userPic:User_IMG1,
                userId:"30",
                userName:"Stephen Curry"
            },
            {
                userPic:User_IMG2,
                userId:"15",
                userName:"Jorgen van Rijen"
            },
            {
                userPic:User_IMG3,
                userId:"47",
                userName:"孙燕姿"
            }
        ]
    }

    render(){
        const user=this.data.map((item)=>{
            return (
                <li key={item.userId}>
                    <a href="#" className="user_img"><img src={item.userPic} /></a>
                    <div className="name">
                        <a href="#">{item.userName}</a>
                        <span className="icon"></span>
                    </div>
                    <Button type="primary">关注</Button>
                </li>
            )
        })

        return (
            <div  className={Style.findUser}>
                <div className="hd">
                    <a href="#">查看更多</a>
                    <h2>发现用户</h2>
                </div>
                <ul>
                    {user}
                </ul>
            </div>
        )
    }
}