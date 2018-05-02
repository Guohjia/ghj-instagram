function dateDuration(date){
    if(!date){return;}
    let mintues = (new Date() -  new Date(date))/1000/60;
    switch(!!mintues){  //直接mintues不行？
        case mintues<60:
            return Math.floor(mintues)+"分钟前";
        case mintues<24*60:  
            return Math.floor(mintues/60)+"小时前";
        default:
            return Math.floor(mintues/1440)+"天前";
    }
}


export {
    dateDuration 
}