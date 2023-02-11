import axios from "../utils/request";

const base = {
    headerUrl: "http://localhost:3000",
    loginUrl: "/login",
    registerUrl: "/register",
    resetUrl: "/reset",
    checkUserUrl: "/checkUser",
    checkAPIUrl: "/getUser",
    getKeyUrl: "/api/lwtpyzmsc/common/verify/getComplicateVerifyImage",
}


const userSystem = {
    //疫情数据
    login(data) {
        return axios.post(base.headerUrl + base.loginUrl, data)
    },

    register(data) {
        return axios.post(base.headerUrl + base.registerUrl, data)
    },

    reset(data) {
        return axios.post(base.headerUrl + base.resetUrl, data)
    },

    checkUser(data) {
        return axios.post(base.headerUrl + base.checkUserUrl, data)
    },

    checkAPI() {
        return axios.get(base.headerUrl + base.checkAPIUrl)
    },

    getKey() {
        return axios.post(base.getKeyUrl, {
            "codeType": "1",
        }, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "X-APISpace-Token": "m0rje371bcwkzow4y6pia2oznpiqymlt",
                "Authorization-Type": "apikey",
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }, )
    },
}

export default userSystem;