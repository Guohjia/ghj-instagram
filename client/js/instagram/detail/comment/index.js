import React,{Component} from "react";
import Style from "./index.less";
import CommentAction from "./CommentAction";


export default class Comment extends Component{
    constructor(props){
        super(props)
        this.state={
            comments:[]
        }
        // this.comments=[
        //     {
        //         content:"i t is fair though he’s been on plenty of other nba teams lol, they just have the right system for guys to work in 🤷🏻‍♂️",
        //         user:"btudes_24@brandon_westbrook0",
        //         date:"2018-04-05"
        //     },
        //     {
        //         content:"it 💯",
        //         user:"cal.ch3Deserves",
        //         date:"2018-04-04"
        //     },
        //     {
        //         content:"he replacing shaun for pg position soon cause shaun gettin up there in age",
        //         user:"Calvertis Holden",
        //         date:"2018-04-03"
        //     },
        //     {
        //         content:"i t is fair though he’s been on plenty of other nba teams lol, they just have the right system for guys to work in 🤷🏻‍♂️",
        //         user:"btudes_24@brandon_westbrook0",
        //         date:"2018-04-01"
        //     },
        //     {
        //         content:"it 💯",
        //         user:"cal.ch3Deserves",
        //         date:"2018-04-09"
        //     },
        //     {
        //         content:"he replacing shaun for pg position soon cause shaun gettin up there in age",
        //         user:"Calvertis Holden",
        //         date:"2018-04-13"
        //     }
        // ]
    }

    render(){
        let comments= this.state.comments.map((item,index)=>{
            return (
                <li className="comment_item" key={item.id}>
                    <a className="cm_Name">{item.user}</a>
                    <span className="cm_ct">{item.content}</span>
                </li>
            )
        })
        return (
            <div className={Style.Comment}>
                <div className="m-comment">
                    <ul>{comments}</ul>
                    <div className="btn loadMore">加载更多</div>
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
}