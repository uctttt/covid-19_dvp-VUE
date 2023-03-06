<template>
  <div>
    <div class="home">
      <div class="header" :style='styleSet'>
        <img src="../../public/PIC/backGround-PIC-M.png" alt="">
      </div>
      <div class="blank" style="height: 100vh;"></div>
      <div class="topNav">
        <div class="loginBtnTop" @click="loginShow">{{ yourName }}</div>
      </div>
      <DailyInfo :v-if="loaded" :DailyInfoData="DailyInfoData" />
      <TabView :v-if="loaded" :RankInfo="RankInfo" :DailyInfoData="DailyInfoData" />
      <div class="coverBox" v-if="!isLogin">
        <el-button class="loginBtnBtm" @click="loginShow">登录查看更多</el-button>
      </div>
    </div>

    <div class="cover" v-if="!isLogin" />
    <Login @showLogin="loginShow" v-if="showLogin" />
  </div>
</template>

<style lang="less" scoped>
.blank {
  clear: both;
  content: "";
  font-size: 0;
  width: 100%;
}

.el-dialog {
  span {
    font-size: 1rem;
  }

  .el-button {
    font-size: .8rem;
  }
}

.home {
  position: relative;
  box-sizing: border-box;
  z-index: 99;
  background-color: rgb(255, 255, 255);

  .header {
    z-index: 999;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 80vh;
    pointer-events: none;

    img {
      width: 100%;
    }
  }

  .topNav {
    position: relative;
    width: 100%;
    height: 2.4rem;
    margin-bottom: 1rem;
    background-color: rgb(100, 135, 240);

    .loginBtnTop {
      position: absolute;
      right: 0;
      height: 2.4rem;
      line-height: 2.4rem;
      font-size: .9rem;
      color: rgb(255, 255, 255);
      padding: 0 1rem;
      scroll-margin-left: 1rem;
      min-width: 5.5rem;
      border: none;
      background-color: cornflowerblue;
      border-left: 1px solid rgb(135, 175, 250);
    }

    .loginBtnTop:hover {
      background-color: rgb(100, 150, 250);
      cursor: pointer;
    }
  }
}

.coverBox {
  position: absolute;
  z-index: 99;
  width: 100%;
  height: 15rem;
  background-image: linear-gradient(to top, cornflowerblue 20%, rgb(130, 175, 255) 65%, rgba(100, 148, 237, 0) 100%);

  .loginBtnBtm {
    color: cornflowerblue;
    border-radius: 1.5rem;
    margin: 5.5rem 0;
    padding: 0 2.5rem;
    font-size: 1.2rem;
    height: 3rem;
  }
}

.cover {
  position: fixed;
  box-sizing: content-box;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(210, 210, 210, 0.15);
}
</style>

<script>
// @ is an alias to /src
import DailyInfo from '@/components/info/DailyInfo'
import Login from '@/components/users/login'
import TabView from '@/components/TabView'
import api from '@/api/getNcovAPI'
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
  name: 'HomeView',

  components: {
    DailyInfo,
    TabView,
    Login,
  },

  data() {
    return {
      showLogin: false,
      isLogin: false,
      yourName: '未登录',

      styleSet: {
        opacity: 1,
      },
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
        cityNum: "",//确诊城市总数
        clearCity: "",//清零城市
        noClearCity: "",//未清零城市
        historyData: "",//历史数据
      },

      RankInfo: {
        activeRank: {
          barID: 'active',
          barName: '现存确诊病例',
          data: []
        },//现存确诊榜单
        importedRank: {
          barID: 'imported',
          barName: '境外输入确诊',
          data: []
        },//境外输入榜单
        countRank: {
          barID: 'count',
          barName: '累计确诊病例',
          data: []
        },//累计确诊榜单
      },
      loaded: false,
    }
  },

  methods: {
    changeOpacity() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      let opa = (1 - (scrollTop.toFixed(2) / 500)).toFixed(1);
      if (opa <= 0) {
        opa = 0
      }
      this.styleSet.opacity = opa
    },

    exit() {
      this.$store.commit("loginIn", false);
      this.yourName = '未登录';
      this.exitDialogVisible = false;
      sessionStorage.removeItem('userInfo');
      location.reload();
    },

    loginShow() {
      if (this.isLogin) {
        ElMessageBox.confirm(
          '是否退出当前账号?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '返回',
            type: 'warning',
          }
        )
          .then(() => {
            this.$store.commit("loginIn", false);
            this.yourName = '未登录';
            sessionStorage.removeItem('userInfo');
            location.reload();
          })
          .catch(() => {
          })
        return;
      }
      this.showLogin = !this.showLogin;
    },
  },

  created() {
    //将用户信息存储至会话
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    //调用store中的loginIn，改变其中isLogin的状态
    if (userInfo !== null) {
      this.$store.commit("loginIn", true);
      this.yourName = `欢迎，${userInfo.name}`;
    }
  },

  mounted() {
    //检测页面滚动
    window.addEventListener('scroll', this.changeOpacity)

    //调用api获取数据
    api.getNcov().then((res) => {
      if (res.status === 200) {
        let data = res.data.data;

        function fuc(a, b) {
          return b.value - a.value;
        }

        for (const key in this.DailyInfoData) {
          this.DailyInfoData[key] = '暂无数据'
        }

        data.list.forEach(element => {
          this.RankInfo.activeRank.data.push({
            name: element.name,
            value: element.econNum
          });
          this.RankInfo.importedRank.data.push({
            name: element.name,
            value: element.jwsrNum
          });
          this.RankInfo.countRank.data.push({
            name: element.name,
            value: element.value
          });
        });

        this.RankInfo.activeRank.data.sort(fuc).slice(15)
        this.RankInfo.importedRank.data.sort(fuc).slice(15)
        this.RankInfo.countRank.data.sort(fuc).slice(15)

        //测试用数据
        this.DailyInfoData.curedIncr = "200";
        this.DailyInfoData.seriousIncr = "15";
        this.DailyInfoData.confirmedIncr = "-50";
        this.DailyInfoData.deadIncr = "0";

        this.DailyInfoData.cityNum = data.caseClearCityInfo.ljCityNum;
        this.DailyInfoData.clearCity = data.caseClearCityInfo.ljClearCityNum;
        this.DailyInfoData.noClearCity = data.caseClearCityInfo.ljNoClearCityNum;
        this.DailyInfoData.historyData = data.historylist;
        this.DailyInfoData.modifyTime = data.mtime;
        this.DailyInfoData.currentConfirmedCount = data.econNum;
        this.DailyInfoData.confirmedCount = data.gntotal;
        this.DailyInfoData.deadCount = data.deathtotal;
        this.DailyInfoData.curedCount = data.curetotal;

        this.loaded = true;
      }
    }).catch((error) => {
      console.log(error);
    });
  },

  watch: {
    //监听store中的isLogin状态
    "$store._state.data.isLogin": {
      handler(newVal, oldVal) {
        this.isLogin = newVal
      },
      immediate: true
    }
  }
}
</script>