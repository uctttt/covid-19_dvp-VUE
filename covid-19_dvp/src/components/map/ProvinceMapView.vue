<template>
    <div>
        <div class="map">
            <div id="province" />
        </div>
    </div>
</template>

<style lang="less" scoped>
.map {
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    padding: 0 .3125rem;
    border-radius: .9375rem;


    #province {
        box-sizing: border-box;
        width: 25rem;
        height: 20rem;
        border-radius: .9375rem;
        border: solid .125rem rgba(100, 148, 237, 0.4);
        overflow: hidden;
    }
}
</style>

<script>
import * as echarts from "echarts";
import api from '@/api/getNcovAPI'
import "@/../node_modules/echarts/map/js/china"
import "@/../node_modules/echarts/map/js/world"
import "@/../node_modules/echarts/map/js/province/anhui"
import "@/../node_modules/echarts/map/js/province/anhui"
import "@/../node_modules/echarts/map/js/province/aomen"
import "@/../node_modules/echarts/map/js/province/beijing"
import "@/../node_modules/echarts/map/js/province/chongqing"
import "@/../node_modules/echarts/map/js/province/fujian"
import "@/../node_modules/echarts/map/js/province/gansu"
import "@/../node_modules/echarts/map/js/province/guangdong"
import "@/../node_modules/echarts/map/js/province/guangxi"
import "@/../node_modules/echarts/map/js/province/guizhou"
import "@/../node_modules/echarts/map/js/province/hainan"
import "@/../node_modules/echarts/map/js/province/hebei"
import "@/../node_modules/echarts/map/js/province/heilongjiang"
import "@/../node_modules/echarts/map/js/province/henan"
import "@/../node_modules/echarts/map/js/province/hubei"
import "@/../node_modules/echarts/map/js/province/hunan"
import "@/../node_modules/echarts/map/js/province/jiangsu"
import "@/../node_modules/echarts/map/js/province/jiangxi"
import "@/../node_modules/echarts/map/js/province/jilin"
import "@/../node_modules/echarts/map/js/province/liaoning"
import "@/../node_modules/echarts/map/js/province/neimenggu"
import "@/../node_modules/echarts/map/js/province/ningxia"
import "@/../node_modules/echarts/map/js/province/qinghai"
import "@/../node_modules/echarts/map/js/province/shandong"
import "@/../node_modules/echarts/map/js/province/shanghai"
import "@/../node_modules/echarts/map/js/province/shanxi"
import "@/../node_modules/echarts/map/js/province/shanxi1"
import "@/../node_modules/echarts/map/js/province/sichuan"
import "@/../node_modules/echarts/map/js/province/taiwan"
import "@/../node_modules/echarts/map/js/province/tianjin"
import "@/../node_modules/echarts/map/js/province/xianggang"
import "@/../node_modules/echarts/map/js/province/xinjiang"
import "@/../node_modules/echarts/map/js/province/xizang"
import "@/../node_modules/echarts/map/js/province/yunnan"
import "@/../node_modules/echarts/map/js/province/zhejiang"

export default {
    data() {
        return {
            province: [],
            provincesData: [],
            myChartProvince: null
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

        getFontSize(res) {
            let clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            if (!clientWidth) return;
            let fontSize;
            if (clientWidth <= 425) {
                fontSize = (clientWidth / 30);
            } else if (clientWidth <= 768) {
                fontSize = (clientWidth / 58);
            } else {
                fontSize = (clientWidth / 88);
            }
            if (!res) {
                return fontSize;
            } else {
                return fontSize * res;
            }
        },

        makeProvinceMap() {
            var option = {
                //导航栏
                visualMap: {
                    align: "left",
                    show: true,
                    x: 'left',
                    y: 'bottom',
                    type: "piecewise",
                    backgroundColor: "rgba(75, 75, 75, 0.5)",
                    textStyle: {
                        fontSize: this.getFontSize(1.1),
                        color: '#ffffff',
                        fontWeight: "bold",
                    },
                    pieces: [
                        { min: 0, max: 0, color: "#FFFFFF" },
                        { min: 1, max: 9, color: "#FDFDCF" },
                        { min: 10, max: 99, color: "#ffb19b" },
                        { min: 100, max: 999, color: "#f54655" },
                        { min: 1000, max: 9999, color: "#b41724" },
                        { min: 9999, color: "#4e4e4e" }
                    ]
                },
                //浮框
                tooltip: {
                    trigger: 'item',
                    showDelay: 0,
                    textStyle: {
                        fontSize: this.getFontSize(),
                    },
                    backgroundColor: "rgba(75, 75, 75, 0.5)",
                    transitionDuration: 0.2,
                    formatter: function (params) {
                        return "现存确诊人数<br/>" + params.data.name +
                            ':' + params.data.value;
                    }
                },
                //配置属性
                series: {
                    type: "map",// 配置图表类型
                    map: this.province.name, // 市/区级地图
                    roam: true,// 是否允许自动缩放
                    zoom: 1.1,// 地图缩放比例
                    scaleLimit: {
                        max: 3,
                        min: 1
                    },
                    label: {      // 配置字体
                        normal: {
                            show: false,
                            textStyle: {
                                fontWeight: "bold",
                                fontSize: this.getFontSize(1.5),
                                textBorderColor: 'rgba(255, 255, 255, 0.6)',
                                textBorderWidth: 3,
                            },
                        }
                    },
                    itemStyle: {  // 配置地图样式
                        emphasis: { // 选中的区域颜色及阴影效果等
                            areaColor: 'rgba(255,180,0,0.8)',
                            shadowColor: 'rgba(0,0,0,0.5)',
                            shadowOffsetX: 1,
                            shadowOffsetY: 1,
                            shadowBlur: 20,
                            borderWidth: 0,
                        }
                    },
                    data: this.provincesData,
                },
            }
            this.myChartProvince.setOption(option, { lazyMode: true });
            window.addEventListener(
                'resize',
                () => {
                    setTimeout(() => {
                        this.myChartProvince.resize();
                    }, 300)
                }
            )
        }
    },

    created() {
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
        }).then(()=>{
            setTimeout(() => {
            this.myChartProvince = echarts.init(document.getElementById("province"));
            this.makeProvinceMap();
        }, 300)
        })
        .catch((error) => { });
    },

    mounted() {
       
    },
};
</script>
