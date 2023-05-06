<template>
    <div>
        <div id="topNav">
            <el-button type="primary" class="backBtn" @click="backHome">
                <el-icon>
                    <Back />
                </el-icon> 返回</el-button>
        </div>
        <Rumors />
    </div>
</template>

<style lang="less" scoped>
#topNav {
    display: flex;
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 2.75rem;
    margin-bottom: .625rem;
    background-color: rgb(100, 135, 240);
    z-index: 99;

    .backBtn {
        font-size: 1rem;
        height: 2.75rem;
        width: 6rem;
        border: none;
    background-color: cornflowerblue;
        border-right: 1px solid rgb(135, 175, 250);
    }
}
</style>

<script>
// @ is an alias to /src
import Rumors from '@/components/Rumors.vue'

export default {
    name: 'RumorsView',
    components: {
        Rumors
},
    methods: {
        backHome() {
            this.$router.push('/')
        }
    },
}
</script>