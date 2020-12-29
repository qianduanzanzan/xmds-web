const path = require('path');        //引入path模块
function resolve(dir){
    return path.join(__dirname,dir)  //path.join(__dirname)设置绝对路径
}
module.exports={
    chainWebpack:(config)=>{
        config.resolve.alias
            //set第一个参数：设置的别名，第二个参数：设置的路径
        	//根据需要进行配置
            .set('@',resolve('./src'))
            .set('assets',resolve('.src/assets'))
            .set('components',resolve('./src/components'))
            .set('views',resolve('.src/views'))
    },

    devServer:{
    	port: 8081,	// 端口
        proxy:{
            '/service':{ // 路径中有 /service 的请求都会走这个代理,可以自己定义一个,下面移除即可
                target:'http://127.0.0.0',    // 目标代理接口地址,实际跨域要访问的接口,这个地址会替换掉 axios.defaults.baseURL
                secure:false,
                changeOrigin:true,  // 开启代理，在本地创建一个虚拟服务端
                ws:false,       // 是否启用  websockets;
                pathRewrite:{   // 去掉 路径中的  /service  的这一截
                    '^/service':''
                }
            }
        }
    }
}