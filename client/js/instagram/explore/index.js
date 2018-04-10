import React,{Component} from "react";
import Style from "./index.less";
import { icon as Icon } from "antd";
import { BrowserRouter as Router,Route,Link } from "react-router-dom";
import Detail from "../detail";
import Waypoint from "react-waypoint";

//这里的图片以后可以改成点击切换用请求去抓抓图片;
import User_IMG1 from "../../../imgs/curry.jpg";
import User_IMG2 from "../../../imgs/trombone_2.jpg";
import User_IMG3 from "../../../imgs/trombone_3.jpg";

export default class Explore extends Component{
    constructor(props){
        super(props)
        this.state = {
            data:[
                [
                    {
                        userPic:User_IMG1,
                        userId:"30",
                        userName:"Stephen Curry"
                    },
                    {
                        userPic:User_IMG2,
                        userId:"12",
                        userName:"Jorgen van Rijen"
                    },
                    {
                        userPic:User_IMG3,
                        userId:"17",
                        userName:"孙燕姿"
                    }
                ],
                [
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
            ]
        };
        this._handleWaypointEnter=this._handleWaypointEnter.bind(this); 
    }

    render(){
        let ExploreList=this.state.data.map((item,index)=>{
            // const url=`/detail/${item[index].userId}`  //其实应该是动态id
            return (
                <ul className="m_row" key={index}>
                    <li className="item">
                        <Link to={`/detail/${item[0].userId}`}>
                            <img src={item[0].userPic} />
                        </Link>
                    </li>
                    <li className="item">
                        <Link to={`/detail/${item[1].userId}`}>
                            <img src={item[1].userPic} />
                        </Link>
                    </li>
                    <li className="item">
                        <Link to={`/detail/${item[2].userId}`}>
                            <img src={item[2].userPic} />
                        </Link>
                    </li>
                </ul>
            )
        })
        return (
            <div className={Style.explore}> 
                <h2 className="title">探索</h2>
                <Router>
                    <div>
                        <div className="m-ExploreList">
                            {ExploreList}
                        </div>
                        <Waypoint topOffset={800} onEnter={this._handleWaypointEnter}>
                            <div className="u-infinite">
                                <Icon type="loading" style={{ fontSize: 30}}/>
                            </div>
                        </Waypoint>
                        <div className="m-detail">
                            <Route path="/detail" component={Detail}/>
                        </div>
                    </div>
                </Router>
            </div>
        )
    }

    _handleWaypointEnter(){
        console.log("_handleWaypointEnter... to request getData");
        // let copyState = JSON.parse(JSON.stringify(this.state));
        // copyState.data.push([
        //     {
        //         userPic:User_IMG1,
        //         userId:"30",
        //         userName:"Stephen Curry"
        //     },
        //     {
        //         userPic:User_IMG2,
        //         userId:"15",
        //         userName:"Jorgen van Rijen"
        //     },
        //     {
        //         userPic:User_IMG3,
        //         userId:"47",
        //         userName:"孙燕姿"
        //     }
        // ],[
        //     {
        //         userPic:User_IMG1,
        //         userId:"30",
        //         userName:"Stephen Curry"
        //     },
        //     {
        //         userPic:User_IMG2,
        //         userId:"15",
        //         userName:"Jorgen van Rijen"
        //     },
        //     {
        //         userPic:User_IMG3,
        //         userId:"47",
        //         userName:"孙燕姿"
        //     }
        // ])
        // this.setState(copyState)
    }
}














