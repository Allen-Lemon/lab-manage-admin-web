//统一封装axios的请求
import service from "./http";
import  qs from 'qs'
//import axios from 'axios';

//登录注册的方法,(传入请求类型、请求的url、请求的参数)
const authReq = (method, url, params) => {
    return service({
        method: method,
        url: url,
        header: {
            //请求是以from表单来提交，不是json
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: params,
        traditional: true,
        transformRequest: [
            //对请求的参数进行编码
            function (data) {
                console.log("请求authreq中的data:" + data);
                let ret = ''
                if (data !== null) {
                    for (let it in data) {
                        ret +=
                            encodeURIComponent(it) +
                            '=' +
                            encodeURIComponent(data[it]) +
                            '&'
                    }
                }
                return ret
            }
        ]
    }).then(res => res);
};

const req = (method, url, params) => {
    return service({
        method: method,
        url: url,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: params,
        traditional: true,
        transformRequest: [
            function (data) {
                let ret = ''
                for (let it in data) {
                    ret +=
                        encodeURIComponent(it) +
                        '=' +
                        encodeURIComponent(data[it]) +
                        '&'
                }
                return ret
            }
        ]
    }).then(res => res);
};

//使用qs对get的参数设置
const  query = (method, url, params) => {
    return service({
        method: method,
        url: url,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params:  params
    }).then(res => res);
};

const submit = (method, url, params) => {
    return service({
        method: method,
        url: url,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: params ,
        traditional: true,
        indices: false,
        transformRequest: [
            function (data) {
               return qs.stringify(data)
        }
        ]
    }).then(res => res);
};
export {authReq, req, query,submit};