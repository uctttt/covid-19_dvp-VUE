<template>
    <div>
        <div id="topNav">
            <el-button type="primary" class="backBtn" @click="backHome">
                <el-icon>
                    <Back />
                </el-icon> 返回</el-button>
        </div>
        <ProvinceMap :provincesName="this.city" />
        <ProvinceInfo :provincesName="this.city"/>
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
    background-color: cornflowerblue;
    z-index: 99;

    .backBtn {
        font-size: 1rem;
        height: 2.75rem;
        width: 6rem;
        border: none;
        background-color: rgb(94, 144, 236);
        border-right: 1px solid rgb(164, 193, 247);
    }
}
</style>

<script>
// @ is an alias to /src
import ProvinceMap from '@/components/map/ProvinceMapView.vue'
import ProvinceInfo from '@/components/info/ProvinceInfo.vue'

export default {
    name: 'CityView',
    components: {
    ProvinceMap,
    ProvinceInfo,
    ProvinceInfo
},
    methods: {
        backHome() {
            this.$router.push('/')
        }
    },
    props: {
        city: {
            type: String,
            default: '',
        }
    }
}
</script>