import React from 'react';
import '../styles/test.less'

export default class Test extends React.Component{
    constructor(props){
        super(props)
        this.state={
            yes:'我让你变成橘色吧嘿嘿哈哈'
        }
    }
    render(){
        return (
            <div className="say">
                <div className="word"> 
                    终于我成功啦,你怎么看?我看{this.state.yes}
                </div>
            </div>
        )
    }
}

