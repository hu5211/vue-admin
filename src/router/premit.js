import router from "./index.js";
import store from "../store/index.js";
import { getToKen, removeToKen, removeUserName } from "@/utils/app.js";

const whiteRouter = ['/login'];  //indexof方法，判断数组是否存在指定每个对象，不存在返回-1
// 路由守卫
router.beforeEach((to, from, next) => {
    if (getToKen()) {
        if (to.path === "/login") {
            removeToKen();
            removeUserName();
            store.commit("app/SET_TOKEN", "");
            store.commit("app/SET_USERNAME", "");
            next();  //to
        } else {
            next();  //to
        }
    } else {
        if (whiteRouter.indexOf(to.path) !== -1) {  //存在
            next();  //to
        } else {
            next("/login");  //路由指向
        };
    }
}) 