<template>
  <div class="swipe">
    <div class="swipe-title">
<<<<<<< HEAD
      <div class="titleLeft">各省市病例数据榜单</div>
      <div class="titleRight">点击图表两侧切换榜单</div>
    </div>
    <el-carousel arrow="always" :loop='false' indicator-position="outside" v-if="loadingOver">
      <el-carousel-item>
        <infoBar :info="infoActive" />
      </el-carousel-item>
      <el-carousel-item>
        <infoBar :info="infoImported" />
      </el-carousel-item>
      <el-carousel-item>
        <infoBar :info="infoCount" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

=======
      <div class="titleLeft">各省市确诊数据榜单</div>
      <div class="titleRight">滑动以切换图表</div>
    </div>
    <van-swipe duration="800" :loop="false">
      <van-swipe-item width="350px">
        <CityImported />
      </van-swipe-item>
      <van-swipe-item width="350px">
        <CityActive />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
>>>>>>> fe33b65b667055bd0d038682577754640267fcd6
<style lang="less" scoped>
.swipe {
  box-sizing: border-box;
  width: 100%;
  margin-top: .9375rem;

<<<<<<< HEAD
  /deep/.el-carousel__arrow {
    height: 100%;
    background-color: rgba(250, 235, 215, 0);
    border-radius: 0;
  }

  /deep/.el-carousel__container {
    height: 14.5rem;

    i {
      display: none;
    }
  }

=======
>>>>>>> fe33b65b667055bd0d038682577754640267fcd6
  .swipe-title {
    text-align: start;
    font-weight: normal;
    margin-bottom: .3125rem;

    .titleLeft {
      color: black;
      padding-left: .625rem;
      border-left: .3125rem solid cornflowerblue;
      font-size: 1.375rem;
    }

    .titleRight {
      color: rgb(190, 190, 190);
      font-size: 1rem;
      padding-left: .3125rem;
    }

  }
}
</style>

<script>
<<<<<<< HEAD
import infoBar from '@/components/bar chart/infoBar.vue'
import api from '@/api/getNcovAPI'

export default {
  name: 'InfoSwipe',

  components: {
    infoBar,
  },

  data() {
    return {
      infoImported: {
        barID: 'imported',
        barName: '境外输入确诊',
        data: []
      },
      infoActive: {
        barID: 'active',
        barName: '现存确诊病例',
        data: []
      },
      infoCount: {
        barID: 'count',
        barName: '累计确诊病例',
        data: []
      },
      loadingOver: false,
    }
  },

  created() {
    api.getNcov().then((res) => {
      if (res.status === 200) {
        var data = res.data.data.list;
        data.forEach(element => {
          this.infoActive.data.push({
            name: element.name,
            value: element.econNum
          });
          this.infoImported.data.push({
            name: element.name,
            value: element.jwsrNum
          });
          this.infoCount.data.push({
            name: element.name,
            value: element.value
          });
        });
        function fuc(a, b) {
          return b.value - a.value;
        }
        this.infoActive.data.sort(fuc).slice(15)
        this.infoImported.data.sort(fuc).slice(15)
        this.infoCount.data.sort(fuc).slice(15)
      }
    }
    ).then(() => {
      console.log('数据获取完成');
      this.loadingOver = true;
    })
  }
=======
import CityImported from '@/components/bar chart/CityImported.vue'
import CityActive from '@/components/bar chart/CityActive.vue'

export default {
  name: 'InfoSwipe',
  components: {
    CityImported,
    CityActive,
  },
  data() {
    return {
    }
  },
>>>>>>> fe33b65b667055bd0d038682577754640267fcd6
}
</script>