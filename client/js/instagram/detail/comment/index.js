import React,{Component} from "react";
import Style from "./index.less";
import CommentAction from "./CommentAction";
import { getComments } from "../../../util/request";

const post = location.pathname.split("/detail/")[1];
export default class Comment extends Component{
    constructor(props){
        super(props)
        this.state={
            comments:[],
            fromIndex:0,
            done:false
        }
    }

    componentDidMount(){
        this.loadComments();
    }

    render(){
        let comments= this.state.comments.map((item,index)=>{
            return (
                <li className="comment_item" key={item._id}>
                    <a className="cm_Name">{item.userName}</a>
                    <span className="cm_ct">{item.content}</span>
                </li>
            )
        })
        return (
            <div className={Style.Comment}>
                <div className="m-comment">
                    <ul>{comments}</ul>
                    <div className="loadMore">
                        {this.state.done?
                            <span>暂无更多</span>:
                            <span className="btn" onClick={this.loadComments.bind(this)}>加载更多</span>
                        }
                    </div>
                </div>
                <CommentAction addComment={this.addComment.bind(this)}/>
            </div>
        )

    }

    addComment(comment){
        let newState =  JSON.parse(JSON.stringify(this.state));
        newState.comments.unshift(comment);
        this.setState(newState);
    }

    loadComments(){
        let { fromIndex,comments } = this.state;
        getComments({fromIndex:fromIndex,post:post}).then( res =>{
            let newIndex = fromIndex+res.data.comments.length;
            let newComments = comments.concat(res.data.comments);
            this.setState({
                fromIndex:newIndex,
                comments:newComments,
                done:res.data.done
            });
        })
    }
}