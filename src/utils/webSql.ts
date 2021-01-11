import {app} from '../main'

const WebSql = function(){
    if((window as any).openDatabase){
        const dataBase = (window as any).openDatabase('basicData', '1.0','基础数据',60*1024*1024);
        app.config.globalProperties.$db = dataBase;
        app.config.globalProperties.tableList = ['TB_DIC']
        if (!dataBase){
            console.log("数据库创建失败！");
        }else{
            console.log("数据库创建成功！");
        }
    }else{
        console.log('不支持本地存储！');
    }
};
app.use(WebSql)