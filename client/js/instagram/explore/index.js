import React,{Component} from "react";
import Style from "./index.less";
import { icon as Icon } from "antd";
import { Link } from "react-router-dom";
import Waypoint from "react-waypoint";
import { getPosts } from "../../util/request"


export default class Explore extends Component{
    constructor(props){
        super(props)
        this.state = {
            posts:[],
            postsNum:0, //索引位置
            done:false
        };
        this._handleWaypointEnter=this._handleWaypointEnter.bind(this); 
    }

    componentDidMount(){
        let params = {
            number:6,
            fromIndex:0
        }
        getPosts(params).then((res)=>{
            let posts,done;
            res.data.posts.length>3?posts=[res.data.posts.splice(0,3),res.data.posts]:posts=[res.data.posts.splice(0,3)];
            if(posts.length<6){done=true;}
            this.setState({
                posts:posts,
                postsNum:posts.length,
                done:done
            })
        })
    }
    render(){
        const { posts,done } =this.state;
        if(posts.length === 0 && !done){
            return <div className="u-center" style={{ top: 500 }}><Icon type="loading" style={{ fontSize: 30}}/></div>;
        }else{
            let ExploreList=posts.map((item,index)=>{
                return (
                    <ul className="m_row" key={index}>
                        {
                            item.map((item)=>{
                                return (
                                    <li className="item" key={item._id}>
                                        <Link to={`/detail/${item._id}`}>
                                            <img src={item.pvUrl} />
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                )
            })
            return (
                <div className={Style.explore}> 
                    <h2 className="title">探索</h2>
                    <div>
                        <div className="m-ExploreList">
                            {ExploreList}
                        </div>
                        {done?<div className="finish_exp" style={{ textAlign: "center",marginTop: 100,fontSize: 16,color: "#666" }}>哥,这回真没了😭</div>:
                            <Waypoint topOffset={800} onEnter={this._handleWaypointEnter}>
                                <div className="u-infinite">
                                    <Icon type="loading" style={{ fontSize: 30}}/>
                                </div>
                            </Waypoint>
                        } 
                    </div>
                </div>
            )
        }
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














