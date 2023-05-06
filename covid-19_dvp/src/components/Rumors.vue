<template>
    <div class="main" v-for="item in rumorsList">
        <el-collapse v-model="activeNames">
            <el-collapse-item name="1">
                <template #title>
                    <div class="title">
                        {{ item.title }}
                    </div>
                    <info-filled />
                </template>
                <div class="content">
                    <div class="mainSummary">{{ item.mainSummary }}</div>
                    <div class="body">{{ item.body }}</div>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<style lang="less" scoped>
.main {
    width: 100%;
    /deep/.el-collapse-item__header{
        height: 4rem;
        .el-icon{
            width: 1rem;
            height: 1rem;
            svg{
                width: 1rem;
            height: 1rem;
            }
        }
    }
    .title{
        margin-left: 1rem;
        font-size: 1.3rem;
    }
    .content{
        padding:0 1rem;
        font-size: .9rem;
        text-align: left;
        text-indent:2em;
        .mainSummary{
        font-size: 1.1rem;
        margin-bottom: .3rem;
        color: cornflowerblue;
        }
    }
}
</style>

<script>
import api from '@/api/getNcovAPI'

export default {
    data() {
        return {
            rumorsList: ''
        }
    },

    props: {},

    methods: {

    },

    created() {
        api.getNcovRumors().then((res) => {
            if (res.status === 200) {
                let data = res.data;
                this.rumorsList = data.results;
            }
        }).catch((error) => { });
    },


}
</script>
