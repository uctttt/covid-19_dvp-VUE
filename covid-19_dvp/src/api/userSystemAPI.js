import axios from "../utils/request";


const base = {
    header: "http://localhost:3000",
    loginUrl: "/login",
    registerUrl: "/register",
    checkUrl: "/getUser",
}


const userSystem = {
    //疫情数据
    login() {
        return axios.post(base.header + base.loginUrl)
    },

    register() {
        return axios.post(base.header + base.registerUrl)
    },

    checkAPI() {
        return axios.get(base.header + base.checkUrl)
    },
}

export default userSystem;