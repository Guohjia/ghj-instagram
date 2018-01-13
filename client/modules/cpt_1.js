import React from "react";
import Style from "./styles/cpt_1.less";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// class CPT_1 extends React.Component{
//     constructor(props){
//         super(props);
//     }
//     render(){
//         const { count, onIncreaseClick,ondecreaseClick } = this.props =>
//         return (
//             <div className={Style.test}>
//                 <div className="ct">
//                     <button onClick={onIncreaseClick}>点我增加</button>
//                     <button onClick={ondecreaseClick}>点我减少</button>
//                     <h3>现在的数字是{count}</h3>
//                 </div>
//                 {count>5?<span>大于5啦</span>:null}
//             </div>
//         );
//     }
// }
//=>无状态组件可以由上面的写法变成这样,props部分可以解构赋值,注意,将这些数据挂在props上时要有选择性,提升性能.
//展示组件就是拿redux store中存储的state直接展示,完;容器组件(外层):进行与store的交互获取,获取之后传给内层的组件与改变store中的数据

const CPT_1=({ count, onIncreaseClick,ondecreaseClick })=>{
    return (
        <div className={Style.test}>
            <div className="ct">
                <button onClick={onIncreaseClick}>点我增加</button>
                <button onClick={ondecreaseClick}>点我减少</button>
                <h3>现在的数字是{count}</h3>
            </div>
            {count>5?<span>大于5啦</span>:null}
        </div>
    );
}
const increaseAction = { type: "INCREASE" }  
const decreaseAction={ type: "DECREASE"}
CPT_1.propTypes = {
    count:PropTypes.number.isRequired,
    onIncreaseClick: PropTypes.func.isRequired,
    ondecreaseClick: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    console.log(state)
    return {
        count: state.count
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        onIncreaseClick: () => dispatch(increaseAction),
        ondecreaseClick: () => dispatch(decreaseAction)
    }
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CPT_1)

