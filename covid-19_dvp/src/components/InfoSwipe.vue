<template>
  <div class="swipe">
    <div class="swipe-title">
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
<style lang="less" scoped>
.swipe {
  box-sizing: border-box;
  width: 100%;
  margin-top: .9375rem;

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