import React,{Component} from "react";
import Style from "./index.less";
import LazyLoad from "react-lazyload";

//这里的图片以后可以改成点击切换用请求去抓抓图片;
import User_IMG1 from "../../../imgs/curry.jpg";
import User_IMG2 from "../../../imgs/trombone_2.jpg";
import User_IMG3 from "../../../imgs/trombone_3.jpg";

export default class Explore extends Component{
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
        let ExploreList=this.data.map((item,index)=>{
            return (
                <LazyLoad key={item.userId} height={200} offset={100} once>
                    <li key={index} className="item">
                        <img src={item.userPic} />
                    </li>
                </LazyLoad>
            )
        })
        return (
            <div className={Style.explore}> 
                <h2 className="title">探索</h2>
                <ul className="m_row">
                    {ExploreList}
                </ul>
                <ul className="m_row">
                    {ExploreList}
                </ul>
                <ul className="m_row">
                    {ExploreList}
                </ul>
                <ul className="m_row">
                    {ExploreList}
                </ul>
            </div>
        )
    }
}














