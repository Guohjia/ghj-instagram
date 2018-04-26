import axios from "axios";
import { message } from "antd";

const myAxios = {
    post:(url,params)=>{
        return axios.post(url,params).then(res=>{
            if(res.data.code === 200){
                return res
            }else{
                message.error(res.data.message || "网络错误")
            }
        }).catch(function (error) {
            console.log(error);
        })
    },
    get:(url,params)=>{
        return axios.get(url,{params:params}).then(res=>{
            if(res.data.code === 200){
                return res
            }else{
                message.error(res.data.message || "网络错误")
            }
        }).catch(function (error) {
            console.log(error);
        })
    }
}

export default  myAxios