<template>
  <div class="home">
    <Header />
    <div class="blank" style="height: 100vh;"></div>
    <DailyInfo :DailyInfoData="DailyInfoData" />
    <TabView />
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
</style>

<script>
// @ is an alias to /src
import Header from '@/components/Header'
import DailyInfo from '@/components/DailyInfo'
import TabView from '@/components/TabView'
import api from '@/api'

export default {
  name: 'HomeView',
  
  components: {
    Header,
    DailyInfo,
    TabView,
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

  mounted() {
	  for (let key in this.DailyInfoData) {
	    this.DailyInfoData[key] = "未公布";
	  }
    api.getNcov().then((res) => {
      let data = res.data.data
      if (res.status === 200) {
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