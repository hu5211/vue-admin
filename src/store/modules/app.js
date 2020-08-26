import { Login } from "@/api/login.js";
import { setToKen, removeToKen, removeUserName, setUserName, getUserName } from "@/utils/app.js";

const state = {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
    to_ken: "",
    username: getUserName() || false,
};

const getters = {
    isCollapse: state => {
        return state.isCollapse
    }
};

const mutations = {
    SET_COLLAPSE(state) {
        state.isCollapse = !state.isCollapse;
        sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));
    },
    SET_TOKEN(state, value) {
        state.to_ken = value;
    },
    SET_USERNAME(state, value) {
        state.username = value;
    }
};
const actions = { //异步回调
    login(content, repuestData) {
        return new Promise((resolve, rejece) => {
            //接口
            Login(repuestData).then((response) => {
                let data = response.data.data;
                content.commit("SET_TOKEN", data.token);
                content.commit("SET_USERNAME", data.username);
                setToKen(data.token);
                setUserName(data.username);
                resolve(response);
            }).catch(error => {
                rejece(error);
            })
        })
    },
    exit({ commit }) {
        return new Promise((resolve, rejece) => {
            removeToKen();
            removeUserName();
            commit("SET_TOKEN", "");
            commit("SET_USERNAME", "");
            resolve();
        });
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};