<template>
    <div>
        <div id="topNav">
<<<<<<< HEAD
            <el-button type="primary" class="backBtn" @click="backHome">
                <el-icon>
                    <Back />
                </el-icon> 返回</el-button>
        </div>
        <ProvinceMap :provincesName="this.city" />
        <ProvinceInfo :provincesName="this.city"/>
=======
            <van-button type="primary" class="backBtn" @click="backHome">﹤返回</van-button>
        </div>
        <ProvinceMap :provincesName="this.city" />
>>>>>>> fe33b65b667055bd0d038682577754640267fcd6
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
<<<<<<< HEAD
        font-size: 1rem;
        height: 2.75rem;
        width: 6rem;
        border: none;
        background-color: rgb(94, 144, 236);
=======
        font-size: 16px;
        height: 2.75rem;
        width: 6rem;
        border: none;
        background-color:rgb(94, 144, 236);
>>>>>>> fe33b65b667055bd0d038682577754640267fcd6
        border-right: 1px solid rgb(164, 193, 247);
    }
}
</style>

<script>
// @ is an alias to /src
import ProvinceMap from '@/components/map/ProvinceMapView.vue'
<<<<<<< HEAD
import ProvinceInfo from '@/components/info/ProvinceInfo.vue'
=======
>>>>>>> fe33b65b667055bd0d038682577754640267fcd6

export default {
    name: 'CityView',
    components: {
<<<<<<< HEAD
    ProvinceMap,
    ProvinceInfo,
    ProvinceInfo
},
=======
        ProvinceMap,
    },
>>>>>>> fe33b65b667055bd0d038682577754640267fcd6
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