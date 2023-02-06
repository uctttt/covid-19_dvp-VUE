import axios from "../utils/request";


const base = {
    baseUrl: "/news/wap/fymap2020_data.d.json",
}

const baseiIsaaclin = {
	header:"https://lab.isaaclin.cn",
	ncovUrl:"/nCoV/api/overall",
    newsUrl: "/nCoV/api/news",
    rumorsUrl: "/nCoV/api/rumors",
}


const api = {
    //疫情数据
    getNcov() {
        return axios.get(base.baseUrl)
    },
	
	getNcovDX() {
        return axios.get(baseiIsaaclin.header+baseiIsaaclin.ncovUrl)
    },

	getNcovNews(page,num){
		if (page == ''||num=='') {
			return axios.get(baseiIsaaclin.header+baseiIsaaclin.newsUrl)
		} else{
			return axios.get(`${baseiIsaaclin.header}${baseiIsaaclin.newsUrl}?page=${page}&num=${num}`)
		}
	},

	getNcovRumors(){
		return axios.get(baseiIsaaclin.header+baseiIsaaclin.rumorsUrl)
	},
}

export default api;