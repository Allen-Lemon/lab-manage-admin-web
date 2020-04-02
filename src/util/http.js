//对axios的请求跟响应进行拦截
import axios from 'axios'
import store from "../store";
import router from "../router";
import content from "../main";
//设置axios请求的头地址跟超时时间
const service = axios.create({
    baseURL: "http://localhost:8050",
    timeout: 20000
})
//设置axios的请求request的拦截，这里主要是在头信息中加上请求的token
service.interceptors.request.use(config => {
        //判断当前的vuex中是否存在token
        /*if (this.$store.getters.userInfo.token){
            //在请求头加上token
            config.headers.Authorization = `token ${this.$store.getters.userInfo.token}`
        }*/
        return config;
    },
    error => {
        //请求出现错误
        console.log("请求过程中出现不可预知的错误");
        return Promise.reject(error);
    }
);


//设置服务端响应（response）的拦截
service.interceptors.response.use(response => {
      /*  console.log("拦截器返回的response:" + JSON.stringify(response));*/
        if (response.data.code == 0 || response.data.code == 200) {
            return response.data;
        } else {
            return response;
        }
    },
    error => {
        //出现错误根据错误的状态码来做出处理
        let code = 0;
        console.log("在axios中的response错误:" + error)
        try {
            code = error.response.code;
        } catch (e) {
            //当前响应的数据中是否有错误信息为响应超时
            if (error.toString().indexOf("Error: timeout") !== -1) {
                /* this.$toast.error({
                     title: '错误提示',
                     message: "请求超时",
                     showMethod: 'slideInDown',
                     hideMethod: 'jello'
                 });*/
            }
        }
        //如果错误码不为o，则执行下面的方法，在js中0表示false,不为0的表示true
        if (code) {
            //用户没有权限访问，这里的状态码是由后端定义
            if (code == 401) {
                content.$toast.error({
                    title: '错误提示',
                    message: "用户没有权限",
                    showMethod: 'slideInDown',
                    hideMethod: 'jello'
                });
            } else if (code == 405 || code == 10401) {
                //用户没有登录
                console.log("您请重新登录");
                //清空vuex中全局数据并清空本地的token
                store.dispatch('logout').then(() => {
                    location.reload(); //重新实例化vue-router对象
                })
                //跳转到登录页面去,time:是防止浏览器缓存
                router.push({path: '/login', query: {time: new Date().getTime()}})
            } else {
                //打印出错误信息
                const errorMsg = error.response;
                console.log("错误信息：" + errorMsg)
                if (errorMsg !== undefined) {
                    content.$toast.error({
                        title: '错误提示',
                        message: errorMsg,
                        showMethod: 'slideInDown',
                        hideMethod: 'jello'
                    });
                }
            }
        } else {
            //接口请求失败
            content.$toast.error({
                title: '错误提示',
                message: '接口请求失败',
                showMethod: 'slideInDown',
                hideMethod: 'jello'
            });
        }
        //返回错误的信息
        return Promise.reject(error)
    });

//对外暴露一个接口来供调用者使用
export default service;