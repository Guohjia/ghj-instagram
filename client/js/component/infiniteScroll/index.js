import React,{Component} from "react";
import Style from "./index.less";
import { icon as Icon } from "antd";
import { Link } from "react-router-dom";
import Waypoint from "react-waypoint";
import PropTypes from "prop-types";

export default class InfiniteScroll extends Component{
    constructor(props){
        super(props)
        this.state = {
            posts:[],
            postsNum:0, //索引位置
            done:false
        };
        this._handleWaypointEnter=this._handleWaypointEnter.bind(this);
        this.loadPosts=this.loadPosts.bind(this); 
    }

    componentDidMount(){
        this.loadPosts();
    }

    loadPosts(){
        let postsNum = this.state.postsNum;
        let { getPosts,postParams={} } =this.props;
        postParams.fromIndex=postsNum;
        getPosts(postParams).then((res)=>{
            let newLength= res.data.posts.length+this.state.postsNum,
                    newPosts = JSON.parse(JSON.stringify(this.state.posts));
            if(res.data.posts.length>3){
                newPosts.push(res.data.posts.splice(0,3),res.data.posts)
            }else{
                newPosts.push(res.data.posts.splice(0,3));
            }
            this.setState({
                posts:newPosts,
                postsNum:newLength,
                done:res.data.done
            })
        })
    }

    render(){
        const { posts,done } =this.state;
        if(posts.length === 0 && !done){
            return <div className="u-center" style={{ top: 500 }}><Icon type="loading" style={{ fontSize: 30}}/></div>;
        }else{
            let ExploreList=posts.map((item,index)=>{
                let addLi=Array.from(new Array(3-item.length%3));
                return (
                    <ul className="m_row" key={index}>
                        {
                            item.map((item)=>{
                                return (
                                    <li className="item" key={item._id}>
                                        <Link to={this.props.singlePath+item._id}>
                                            <img src={item.pvUrl} alt={item.content}/>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                        {
                            addLi.length!==3&&addLi.map((item,index)=>{
                                return (
                                    <li className="item" key={index}></li>
                                )
                            })
                        }
                    </ul>
                )
            })
            return (
                <div className={Style.explore}> 
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
        this.loadPosts();
        console.log("_handleWaypointEnter... to request getData");
    }
}

InfiniteScroll.propTypes = {
    getPosts: PropTypes.func.isRequired,
    postParams:PropTypes.object,
    singlePath: PropTypes.string.isRequired
}













