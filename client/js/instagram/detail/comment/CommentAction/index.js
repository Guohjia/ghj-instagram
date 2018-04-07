
import React,{Component} from "react";
import Style from "./index.less";
import { Input } from "antd";
import { icon as Icon } from "antd";
import { connect } from "react-redux";
import actionLike from "../../../../store/action/comment";
import PropTypes from "prop-types";
import axios from "axios";

@connect(
    store => {
        //console.log(store);
        return {
            LIKE:store.LIKE
        }
    },
    dispatch => {
        return {
            onLike:id=>{
                axios.get("/api/actionGetLike", {
                    params:{
                        activityId:id
                    }
                })
                    .then(function (response) {
                        console.log(response);
                        dispatch(actionLike(id))
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                axios.post("/api/actionLike",{
                    activityId:id
                })
                // //   post('/api/get-users-to-explore')
                // //     .then(p => dispatch({ type: 'GET_USERS_TO_EXPLORE', payload: p.data }))
                // //     .catch(e => console.log(e))
                // console.log(id)
                // dispatch(actionLike(id))
            }
        };
    }
)
export default class CommentAction extends Component{
    constructor(props){
        super(props);
    }

    // componentWillReceiveProps(){
    //     console.log("componentWillReceiveProps")
    // }

    render(){
        // console.log(this.props);
        let { LIKE,onLike } = this.props;
        return (
            <div className={Style.CommentAction}>
                <div className="m-action_icon">
                    <span className="btn action_like">
                        {LIKE?
                            <Icon type="heart" style={{ color: "rgb(255,57,70)" }} className="icon" onClick={()=>{onLike(111)}}/>
                            :<Icon type="heart-o" className="icon" onClick={()=>{onLike(111)}}/>}
                    </span>
                    <span className="btn action_cm"><Icon type="message" className="icon"/></span>
                    <span className="btn action_collect"><Icon type="tag-o" className="icon"/></span>
                    <div className="like_num">1001次赞</div>
                    <div className="com_date">1天前</div>
                </div>
                <div className="comment_input">     
                    <Input placeholder="Add Comment" />
                </div>
            </div> 
        )

    }
}



CommentAction.propTypes = {
    onLike: PropTypes.func,
    LIKE: PropTypes.bool
    // // location: PropTypes.object.isRequired
    // pathname: PropTypes.string.isRequired
}


