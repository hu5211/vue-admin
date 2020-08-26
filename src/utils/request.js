import axios from "axios";
import { Message } from "element-ui";
// 创建axios
const BASEURL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API : process.env.VUE_APP_API;
const service = axios.create({
    baseURL: BASEURL,  // http://192.168.0.106:8080/devApi/  == http://www.web-jshtml.cn/productapi/productapi
    timeout: 15000,   // 超时
    // 网络请求接口，假设 5000
    // 1000 2000，
});

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做什么
    return config;
}, function (error) {
    // 对请求错误做什么
    return Promise.reject(error);
});

// 添加相应拦截器
service.interceptors.response.use(function (response) {
    // 对相应数据做什么
    let data = response.data;
    // 业务需求
    if (data.resCode !== 0) {
        Message.error(data.message);
        return Promise.reject(data);
    } else {
        return response;
        // return Promise.resolve(data);
    }
}, function (error) {
    // 对相应错误总什么
    return Promise.reject(error);
});

export default service;