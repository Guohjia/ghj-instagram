import React from 'react';
import Style from '../styles/cpt_2.less'

export default class Test extends React.Component{
    constructor(props){
        super(props)
        this.state={
            color:'蓝色'
        }
    }
    render(){
        return (
            <div className={Style.test}>
                <div className="local"> 
                    我是组件二{this.state.color}，我们类名开发时都取一样但是颜色不同
                </div>
                <div className="global">
                    我是全局的颜色,虽然我的样式文件没有写我的属性,但是我被组件一的样式文件污染了
                </div>
            </div>
        )
    }
}

