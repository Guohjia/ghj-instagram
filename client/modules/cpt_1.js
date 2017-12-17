import React from "react";
import Style from "../styles/cpt_1.less";

export default class CPT_1 extends React.Component{
    constructor(props){
        super(props);
        this.state={
            color:"红色"
        };
    }
    render(){
        return (
            <div className={Style.test}>
                <span>background-contain</span>
                <p>
                    contain, on the other hand, says to always show the whole image,
                    even if that leaves a little space to the sides or bottom.
                    <br/>(显示整张图片即可(但也会尽量去填容器,先填满宽/高中小的一方面,另外一边自适应),即使宽度/高度没填满,也可以多填一张)
                </p>
                <div className="imgWrap img_test1"></div>
                <span>background-cover</span>
                <p>cover tells the browser to make sure the image always covers the entire container, 
                        even if it has to stretch the image or cut a little bit off one of the edges.
                    <br/>(宽高必须都铺满或超过容器宽高,先去填满容器宽高中的大的一方面,另外一方面自适应) 
                </p>
                <div className="imgWrap img_test2"></div>
            </div>
        );
    }
}

