import React from 'react';
import Style from '../styles/cpt_1.less'

export default class CPT_1 extends React.Component{
    constructor(props){
        super(props)
        this.state={
            color:'红色'
        }
    }
    render(){
        return (
            <div className={Style.test}>
                <div className="local"> 
                    我是组件一{this.state.color}，我们类名开发时都取一样但是颜色不同
                </div>
                <div className="global">
                    我是全局的颜色,都一样
                </div>
            </div>
        )
    }
}

