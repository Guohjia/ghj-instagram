import React,{Component} from "react";
import Style from "./index.less";
import InfiniteScroll from "../../component/infiniteScroll";
import { getPosts } from "../../util/request";

export default class Explore extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className={Style.explore}> 
                <h2 className="title">探索</h2>
                <div className="m_Infinite">
                    <InfiniteScroll getPosts={getPosts}/>
                </div>
            </div>
        )
    }
}














