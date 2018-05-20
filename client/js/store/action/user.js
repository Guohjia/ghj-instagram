import { reqLike } from "../../util/request";
import { LIKE_NUM } from "./post";

const LIKE = (id) => {
    return function (dispatch,getState) {
        reqLike({id:id}).then(res =>{ 
            dispatch({
                type: "LIKE",
                id:id
            });
            dispatch(LIKE_NUM) 
        })
    }
}


// const LIKE = (id) => ({
//     type: "LIKE",
//     id:id
// })

const UNLIKE = (id) => ({
    type: "UNLIKE",
    id:id
})

const COLLECT = (id) => ({
    type: "COLLECT",
    id:id
})

const UNCOLLECT = (id) => ({
    type: "UNCOLLECT",
    id:id
})

const FOLLOW = (id) => ({
    type: "FOLLOW",
    id:id
})

const UNFOLLOW = (id) => ({
    type: "UNFOLLOW",
    id:id
})

const POST = (id) => ({
    type: "POST",
    id:id
})

export {
    LIKE,
    UNLIKE,
    COLLECT,
    UNCOLLECT,
    FOLLOW,
    UNFOLLOW,
    POST
}