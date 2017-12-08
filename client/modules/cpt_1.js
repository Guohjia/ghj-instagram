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
                <span>这张图片大于8k,file-loader返回编码后的路径直接发请求处理图片</span>
                <div className="img img_test1"></div>
                <span>这张图片小于8k,url-loader处理,base64,打包进入css,节约请求,但是css文件会变大</span>
                <div className="img img_test2"></div>
            </div>
        )
    }
}

