<template>
<<<<<<< HEAD
  <div>
    <div class="home">
      <Header />
      <div class="blank" style="height: 100vh;"></div>
      <DailyInfo :DailyInfoData="DailyInfoData" />
      <TabView />
    </div>
    <div class="cover"></div>
    <Login />
=======
  <div class="home">
    <Header />
    <div class="blank" style="height: 100vh;"></div>
    <DailyInfo :DailyInfoData="DailyInfoData" />
    <TabView />
>>>>>>> fe33b65b667055bd0d038682577754640267fcd6
  </div>
</template>

<style lang="less">
.blank {
  clear: both;
  display: block;
  content: "";
  font-size: 0;
  width: 100%;
}
<<<<<<< HEAD

.home {
  position: relative;
  z-index: 99;
  background-color: rgb(255, 255, 255);
  padding: .9375rem .625rem;
}

.cover {
  position: fixed;
  box-sizing: content-box;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgb(247, 247, 247);
}
=======
>>>>>>> fe33b65b667055bd0d038682577754640267fcd6
</style>

<script>
// @ is an alias to /src
import Header from '@/components/Header'
<<<<<<< HEAD
import DailyInfo from '@/components/info/DailyInfo'
import TabView from '@/components/TabView'
import Login from '@/components/users/login'
import api from '@/api/getNcovAPI'
import userSystem from '@/api/userSystemAPI'

export default {
  name: 'HomeView',

=======
import DailyInfo from '@/components/DailyInfo'
import TabView from '@/components/TabView'
import api from '@/api'

export default {
  name: 'HomeView',
  
>>>>>>> fe33b65b667055bd0d038682577754640267fcd6
  components: {
    Header,
    DailyInfo,
    TabView,
<<<<<<< HEAD
    Login,
=======
>>>>>>> fe33b65b667055bd0d038682577754640267fcd6
  },

  data() {
    return {
      currentIndex: '1',
      DailyInfoData: {//最新疫情信息
        modifyTime: "",//截止时间
        currentConfirmedCount: "",//现存确诊
        confirmedCount: "",//累计确诊
        suspectedCount: "",//疑似病例
        seriousCount: "",//重症病例
        curedCount: "",//累计治愈
        deadCount: "",//累计死亡
        currentConfirmedIncr: "",//现存确诊变化
        confirmedIncr: "",//累计确诊变化
        curedIncr: "",//治愈变化
        deadIncr: "",//死亡变化
        suspectedIncr: "",//疑似变化
        seriousIncr: "",//重症变化
        cityImportData: [],//城市境外输入病例
      },
    }
  },

  methods: {
    getIndex(index) {
      this.currentIndex = index;
    },
  },

<<<<<<< HEAD
  created() {
    for (let key in this.DailyInfoData) {
      this.DailyInfoData[key] = "未公布";
    };

    userSystem.checkAPI().then((res) => {
      console.log(res);
    });

    api.getNcov().then((res) => {
      if (res.status === 200) {
        let data = res.data.data;
=======
  mounted() {
	  for (let key in this.DailyInfoData) {
	    this.DailyInfoData[key] = "未公布";
	  }
    api.getNcov().then((res) => {
      let data = res.data.data
      if (res.status === 200) {
>>>>>>> fe33b65b667055bd0d038682577754640267fcd6
        this.DailyInfoData.modifyTime = data.mtime;
        this.DailyInfoData.currentConfirmedCount = data.econNum;
        this.DailyInfoData.confirmedCount = data.gntotal;
        this.DailyInfoData.deadCount = data.deathtotal;
        this.DailyInfoData.curedCount = data.curetotal;
        this.DailyInfoData.suspectedCount = data.country.totalDoubtful;
      }
    }).catch((error) => { });
  }
}
</script>