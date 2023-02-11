<template>
  <div>
    <div class="home">
      <Header />
      <div class="blank" style="height: 100vh;"></div>
      <div class="topNav">
        <div class="loginBtnTop" @click="loginShow">{{ yourName }}</div>
      </div>
      <DailyInfo :DailyInfoData="DailyInfoData" />
      <TabView />
      <div class="coverBox" v-if="!isLogin">
        <el-button class="loginBtnBtm" @click="loginShow">登陆查看更多</el-button>
      </div>
    </div>
    <div class="cover" v-if="!isLogin" />
    <Login @showLogin="loginShow" v-if="showLogin" />

    <el-dialog v-model="exitDialogVisible" title="提示" width="22rem" :before-close="handleClose" :show-close='false'>
      <span>是否退出当前账号？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="exitDialogVisible = false">返回</el-button>
          <el-button type="primary" @click="exit">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
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
  background-image: linear-gradient(to top,cornflowerblue 20%, rgb(130, 175, 255) 65%, rgba(100, 148, 237, 0) 100%);

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
import Header from '@/components/Header'
import DailyInfo from '@/components/info/DailyInfo'
import Login from '@/components/users/login'
import TabView from '@/components/TabView'
import api from '@/api/getNcovAPI'

export default {
  name: 'HomeView',

  components: {
    Header,
    DailyInfo,
    TabView,
    Login,
  },

  data() {
    return {
      showLogin: false,
      isLogin: false,
      exitDialogVisible: false,
      yourName: '未登陆',
      DailyInfoData: {//最新疫情信息
        modifyTime: "未公布",//截止时间
        currentConfirmedCount: "未公布",//现存确诊
        confirmedCount: "未公布",//累计确诊
        suspectedCount: "未公布",//疑似病例
        seriousCount: "未公布",//重症病例
        curedCount: "未公布",//累计治愈
        deadCount: "未公布",//累计死亡
        currentConfirmedIncr: "未公布",//现存确诊变化
        confirmedIncr: "未公布",//累计确诊变化
        curedIncr: "未公布",//治愈变化
        deadIncr: "未公布",//死亡变化
        suspectedIncr: "未公布",//疑似变化
        seriousIncr: "未公布",//重症变化
      },
    }
  },

  methods: {
    exit() {
      this.$store.commit("loginIn", false);
      this.yourName = '未登陆';
      this.exitDialogVisible = false;
      sessionStorage.removeItem('userInfo');
      location.reload();
    },

    loginShow() {
      if (this.isLogin) {
        this.exitDialogVisible = true;
        return;
      }
      this.showLogin = !this.showLogin;
    },
  },

  created() {
    //将用户信息存储至会话数据
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    //调用store中的loginIn，改变其中isLogin的状态
    if (userInfo !== null) {
      console.log(userInfo);
      this.$store.commit("loginIn", true);
      this.yourName = `欢迎，${userInfo.name}`;
    }

    //调用api获取数据
    api.getNcov().then((res) => {
      if (res.status === 200) {
        let data = res.data.data;
        this.DailyInfoData.modifyTime = data.mtime;
        this.DailyInfoData.currentConfirmedCount = data.econNum;
        this.DailyInfoData.confirmedCount = data.gntotal;
        this.DailyInfoData.deadCount = data.deathtotal;
        this.DailyInfoData.curedCount = data.curetotal;
        this.DailyInfoData.suspectedCount = data.country.totalDoubtful;
      }
    }).catch((error) => { });
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