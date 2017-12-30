import React from "react";
import Style from "./styles/cpt_1.less";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class CPT_1 extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const { count, onIncreaseClick } = this.props
        return (
            <div className={Style.test}>
                <div className="ct">
                    <button onClick={onIncreaseClick}>点我增加</button>
                    <h3>现在的数字是{count}</h3>
                </div>
                {count>5?<span>大于5啦</span>:null}
            </div>
        );
    }
}

const increaseAction = { type: "INCREASE" }  

CPT_1.propTypes = {
    count:PropTypes.number.isRequired,
    onIncreaseClick: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    console.log(state)
    return {
        count: state.count
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        onIncreaseClick: () => dispatch(increaseAction)
    }
}
  
const Counter = connect(
    mapStateToProps,
    mapDispatchToProps
)(CPT_1)

module.exports={Counter};