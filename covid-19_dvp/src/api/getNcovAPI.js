import axios from "@/utils/request";


const base = {
    baseUrl: "/news/wap/fymap2020_data.d.json",
}

const baseiIsaaclin = {
    header: "https://lab.isaaclin.cn",
    ncovUrl: "/nCoV/api/overall",
    newsUrl: "/nCoV/api/news",
    rumorsUrl: "/nCoV/api/rumors",
    provinceUrl: "/nCoV/api/area?latest=1&province="
}
const api = {
    //获取疫情数据（新浪）
    getNcov() {
        return axios.get(base.baseUrl)
    },

    //获取疫情数据（丁香园）
    getNcovDX() {
        return axios.get(baseiIsaaclin.header + baseiIsaaclin.ncovUrl)
    },

    //获取疫情省市数据（丁香园）
    getNcovProvince(province) {
        return axios.get(baseiIsaaclin.header + baseiIsaaclin.provinceUrl + province)
    },

    //获取疫情新闻（丁香园）
    getNcovNews(page, num) {
        if (page == '' || num == '') {
            return axios.get(baseiIsaaclin.header + baseiIsaaclin.newsUrl)
        } else {
            return axios.get(`${baseiIsaaclin.header}${baseiIsaaclin.newsUrl}?page=${page}&num=${num}`)
        }
    },

    //获取疫情辟谣（丁香园）
    getNcovRumors() {
        return axios.get(baseiIsaaclin.header + baseiIsaaclin.rumorsUrl)
    },

    //获取用户地理位置
    getPosition() {
        return axios.get("/poi/ws/location/v1/ip?key=WDTBZ-EOPRG-5ONQY-IDVMO-NXIIK-C4B7A")
    }
}

export default api;