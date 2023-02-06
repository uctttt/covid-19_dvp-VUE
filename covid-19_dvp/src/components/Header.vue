<template>
  <div class="header" :style='styleSet'>
    <img src="../../public/PIC/backGround-PIC-M.png" alt="">
  </div>
</template>

<style lang="less" >
.header {
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80vh;
  pointer-events:none;
  img {
    width: 100%;
  }
}
</style>

<script>
export default {
  data() {
    return {
      styleSet: {
        opacity: 1,
      }
    }
  },

  mounted() {
    window.addEventListener('scroll', this.changeOpacity)
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
  },
}


</script>