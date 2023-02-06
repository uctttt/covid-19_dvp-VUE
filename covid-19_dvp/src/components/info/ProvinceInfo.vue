<template>
    <div>
        <el-card class="box-card topCard">
            <el-row>
                <div class="titel">
                    {{ province.name }}疫情数据
                </div>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-card class="box-card" shadow="never">
                        <div class="value">{{ province.econNum }}</div>
                        <div class="type">现存确诊</div>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card class="box-card" shadow="never">
                        <div class="value">{{ province.value }}</div>
                        <div class="type">累计确诊</div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-card class="box-card" shadow="never">
                        <div class="value">{{ province.jwsrNum }}</div>
                        <div class="type">境外输入</div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card class="box-card" shadow="never">
                        <div class="value">{{ province.cureNum }}</div>
                        <div class="type">累计治愈</div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card class="box-card" shadow="never">
                        <div class="value">{{ province.deathNum }}</div>
                        <div class="type">累计死亡</div>
                    </el-card>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="box-card">
            <el-table :data="provincesData" @sort-change='sort_change' stripe style="width: 100%">
                <el-table-column prop="name" label="地区名称" />
                <el-table-column prop="value" label="现存确诊" sortable="custom" />
                <el-table-column prop="totalNum" label="累计确诊" sortable="custom" />
            </el-table>
        </el-card>
    </div>
</template>

<style lang="less" scoped>
.topCard {
    /deep/.el-card__body {
        padding: .625rem;
    }

    .el-card {
        margin: .3125rem;
    }

    .type {
        font-size: 1rem;
    }

    .value {
        font-size: 1.25rem;
        font-weight: bold;
    }

    .titel {
        padding-left: .625rem;
        margin-bottom: .625rem;
        font-size: 1.25rem;
        font-weight: normal;
        border-left: .3125rem solid cornflowerblue;
    }
}

.el-card {
    margin: 1.25rem .625rem;
}
</style>

<script>
import api from '@/api/getNcovAPI'

export default {
    data() {
        return {
            province: [],
            provincesData: [],
        }
    },

    props: {
        provincesName: {
            type: String,
            default: '',
        },
    },

    methods: {
        sort_change(column) {
            this.proptype = column.prop;
            if (column.order === "descending") {
                this.provincesData.sort(this.desSort);
            } else if (column.order === "ascending") {
                this.provincesData.sort(this.ascSort);
            }
        },

        desSort(a, b) {
            return b[this.proptype] - a[this.proptype];
        },

        ascSort(a, b) {
            return a[this.proptype] - b[this.proptype];
        },
    },

    mounted() {
        api.getNcov().then((res) => {
            if (res.status === 200) {
                var data = res.data.data.list;
                data.forEach(element => {
                    if (element.name == this.provincesName) {
                        this.province = element
                    }
                });
                for (let i = 0; i < this.province.city.length; i++) {
                    if (this.province.city[i].mapName !== '') {
                        var temp = {
                            name: this.province.city[i].mapName,
                            value: this.province.city[i].econNum,
                            totalNum: this.province.city[i].conNum,
                            cureNum: this.province.city[i].cureNum,
                        }
                        this.provincesData.push(temp)
                    }
                }
            }
        })
    },
};
</script>