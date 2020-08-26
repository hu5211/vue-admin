import Vue from "vue";
// 自定义全局组件
import SvgIcon from "./SvgIcon.vue";
Vue.component('svg-icon', SvgIcon);

/**
 * 解析svg 
 * require.context; 读取指定目录文件
 * 1.目录2.是否遍历子级目录3.定义遍历文件规则
 * es6
 * */
const req = require.context('./svg', false, /\.svg$/); //正则匹配.svg的文件
const requireAll = requireContext => {
    return requireContext.keys().map(requireContext)
};
requireAll(req);