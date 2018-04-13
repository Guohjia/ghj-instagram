import React,{Component} from "react";
import Style from "./index.less";
import { icon as Icon } from "antd";
import PropTypes from "prop-types";

export default class Modal extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            this.props.show?
                <div className={Style.modal}> 
                    <div id="shadow" className="m-shadow">
                        <Icon className="Icon-close" type="close" onClick={this.props.goback}/>
                        {this.props.children}
                    </div>
                </div>:null
        )
    }
}

Modal.propTypes = {
    show: PropTypes.bool.isRequired,
    goback: PropTypes.func.isRequired,
    children: PropTypes.object.isRequired
}










