<template>
  <div class="swipe">
    <div class="swipe-title">
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

<style lang="less" scoped>
.swipe {
  box-sizing: border-box;
  width: 100%;
  margin-top: .9375rem;

  /deep/.el-carousel__arrow {
    height: 100%;
    background-color: rgba(250, 235, 215, 0);
    border-radius: 0;
  }

  /deep/.el-carousel__container {
    height: 15rem;
    i {
      display: none;
    }
  }

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
}
</script>