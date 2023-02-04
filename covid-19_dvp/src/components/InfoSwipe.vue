<template>
  <div class="swipe">
    <div class="swipe-title">
      <div class="titleLeft">各省市病例数据榜单</div>
      <div class="titleRight">点击图表两侧切换榜单</div>
    </div>
    <el-carousel :interval="10000" arrow="always" :loop='false' indicator-position="outside">
      <el-carousel-item>
        <CityActive />
      </el-carousel-item>
      <el-carousel-item>
        <CityCount />
      </el-carousel-item>
      <el-carousel-item>
        <CityImported />
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
    height: 14.5rem;
    i{
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
import CityImported from '@/components/bar chart/CityImported.vue'
import CityActive from '@/components/bar chart/CityActive.vue'
import CityCount from '@/components/bar chart/CityCount.vue'

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
}
</script>