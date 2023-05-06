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
      <DailyInfo :v-if="loaded && this.yourPosition" :DailyInfoData="DailyInfoData" />
      <div class="goRumors">
        <el-icon>
            <Warning />
          </el-icon>
        <a href="/rumors">
         疫情辟谣
        </a>
      </div>
      <div class="userPosition" v-if="isLogin">
        <el-collapse v-model="activeNames">
          <el-collapse-item name="1">
            <template #title>
              <div class="title">
                <el-icon>
                  <Location />
                </el-icon>
                {{ this.yourPosition.province }}疫情数据
              </div>
              <info-filled />
            </template>
            <div class="content">
              <el-row class="position-list">
                <el-col :span="8">
                  <li class="info-content">
                    <div class="mainData" style="color: rgb(255, 0, 0);">{{ yourPosition.confirmedCount }}</div>
                    <div class="dataType">累计确诊</div>
                  </li>
                </el-col>

                <el-col :span="8">
                  <li class="info-content">
                    <div class="mainData" style="color: rgb(0, 180, 0);">{{ yourPosition.curedCount }}</div>
                    <div class="dataType">累计治愈</div>
                  </li>
                </el-col>

                <el-col :span="8">
                  <li class="info-content">
                    <div class="mainData" style="color: rgb(80, 80, 80);border-right:none">{{ yourPosition.deadCount }}
                    </div>
                    <div class="dataType">累计死亡</div>
                  </li>
                </el-col>
              </el-row>
              <div class="checkMore">
                <a :href=address style="color: white;text-decoration: none;">查看更多</a>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <TabView :v-if="loaded" :RankInfo="RankInfo" :DailyInfoData="DailyInfoData" />
      <div class="coverBox" v-if="!isLogin">
        <el-button class="loginBtnBtm" @click="loginShow">登录查看更多</el-button>
      </div>
    </div>

    <el-backtop :right="100" :bottom="100" style="z-index: 999;"/>

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


  .goRumors {
    display: flex;
    vertical-align: middle;
    justify-content: center;
    margin-bottom: .9rem;
    .el-icon {
      margin: 0;
        font-size: 1.5rem;
        font-weight: bolder;
        color: rgb(255, 199, 15);
        margin-right: .2rem;
      }
    a {
      line-height: 1.6rem;
      font-size: 1.1rem;
      text-decoration: none;
      color: rgb(122, 122, 122);
    }
  }

  .userPosition {
    .title {
      font-size: 1.1rem;
      margin: 0 1rem;
    }

    .content {
      font-size: 1.3rem;

      .checkMore {
        background-color: rgb(100, 150, 250);
        margin: 1rem auto 0;
        border-radius: 2rem;
        width: 8rem;
      }
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

/deep/.el-backtop{
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translate(17.5rem);
  width: 2rem;
  height: 2rem;
  background-color: cornflowerblue;
  
  .el-backtop__icon {
    font-size: 1rem;
    color: white;
}
}
/deep/.el-backtop:hover{
  background-color: white;
  
  .el-backtop__icon {
    color: cornflowerblue;
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

.info-content {
  margin: .625rem 0;
  display: flex;
  justify-content: space-around;
  flex-direction: column;

  .mainData {
    height: 1.75rem;
    line-height: 1.75rem;
    font-size: 1.3rem;
    font-weight: 650;
    text-align: center;
    border-right: 1px solid rgb(151, 151, 151);
  }

  .dataType {
    color: rgb(54, 54, 54);
    font-size: 1.1rem;
    font-weight: bold;
    text-align: center;
  }
}
</style>

<script>
// @ is an alias to /src
import DailyInfo from '@/components/info/DailyInfo'
import Login from '@/components/users/login'
import TabView from '@/components/TabView'
import api from '@/api/getNcovAPI'
import axios from "../utils/request"
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
      yourPosition: {
        province: '',
        city: '',
        confirmedCount: "",//累计确诊
        curedCount: "",//累计治愈
        deadCount: "",//累计死亡
      },

      address: '',

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
    getChange(num) {
      var incr = '';
      if (num > 0) {
        incr = `较昨日+${num}`;
      } else if (num == 0) {
        incr = `较昨日无变化`;
      } else if (num < 0) {
        incr = `较昨日${num}`;
      } else {
        incr = `暂无数据`;
      }
      return incr
    },

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
    //调用会话存储
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    //调用store中的loginIn，改变其中isLogin的状态
    if (userInfo !== null) {
      this.$store.commit("loginIn", true);
      this.yourName = `欢迎，${userInfo.name}`;
      this.yourPosition.province = userInfo.position.province;
      this.yourPosition.city = userInfo.position.city;
      this.address = `/city/${this.yourPosition.province}`
    }

    //调用api获取数据
    api.getNcov().then((res) => {
      if (res.status === 200) {
        let data = res.data.data;
        // 排序规则
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

          if (element.name === this.yourPosition.province) {
            this.yourPosition.confirmedCount = element.econNum;
            this.yourPosition.deadCount = element.deathNum;
            this.yourPosition.curedCount = element.cureNum;
          }
        });
        // 排序并选取前15条数据
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

    axios.get("/baike/item/%E6%96%B0%E5%9E%8B%E5%86%A0%E7%8A%B6%E7%97%85%E6%AF%92%E8%82%BA%E7%82%8E/24282529?fr=aladdin").then(res=>{
      console.log(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  },

  mounted() {
    //检测页面滚动
    window.addEventListener('scroll', this.changeOpacity)
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