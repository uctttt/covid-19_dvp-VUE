<template>
    <div>
        <div class="map">
            <div id="china" />
        </div>
        <div class="slider-demo-block">
            <el-slider v-model="zoom" :step="1" :min="1" :max="3" :show-tooltip="false" @input="mapZoom" />
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

    #china {
        box-sizing: border-box;
        width: 21.875rem;
        height: 17rem;
        border-radius: .9375rem;
        border: solid .125rem rgba(100, 148, 237, 0.4);
        overflow: hidden;
    }
}

/deep/.el-slider {
    width: 20rem;
    height: 2rem;
    margin: auto;

    .el-slider__runway {
        height: .5rem;
        border-radius: 1rem;

        .el-slider__button {
            height: 1.1rem;
            width: 1.1rem;
        }

        .el-slider__bar {
            height: .5rem;
            border-radius: 1rem;
        }
    }
}
</style>

<script>
import * as echarts from "echarts";
import api from '@/api/getNcovAPI'
import china from '@/../node_modules/echarts/map/json/china.json'
echarts.registerMap('china', china)

export default {
    data() {
        return {
            myChart: null,
            provinceData: [],
            zoom: 1,
            isLogin: false,
        }
    },

    methods: {
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

        makeChinaMap() {
            var option = {
                backgroundColor: "rgba(230, 230, 230, 0.3)",
                //导航栏
                visualMap: {
                    align: "left",
                    show: true,
                    x: 'left',
                    y: 'bottom',
                    type: "piecewise",
                    backgroundColor: "rgba(75, 75, 75, 0.3)",
                    textStyle: {
                        fontSize: this.getFontSize(0.9),
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
                    triggerOn: 'click',//事件
                    enterable: true,//允许操作
                    showDelay: 0,
                    textStyle: {
                        fontSize: this.getFontSize(1.1),
                    },
                    backgroundColor: "rgba(75, 75, 75, 0.5)",
                    transitionDuration: 0.2,
                    formatter: function (params) {
                        return `现存确诊人数<br/>${params.data.name}:${params.data.value}<br/><a href=/city/${params.data.name} style="color: #FFFFFF;text-decoration: none;">查看详情</a>`;
                    }
                },
                //配置属性
                series: {
                    name: "国内省/市现存确诊人数",
                    type: "map",// 配置图表类型
                    map: "china", // 中国地图
                    roam: "move",// 允许滑动
                    zoom: this.zoom,// 地图缩放比例
                    label: {      // 配置字体
                        normal: {
                            show: false,
                            textStyle: {
                                fontWeight: "bold",
                                fontSize: this.getFontSize(1.4),
                                textBorderColor: 'rgba(255, 255, 255, 0.6)',
                                textBorderWidth: 3,
                            },
                        }
                    },
                    itemStyle: {  // 配置地图样式
                        normal: {
                            borderColor: 'rgba(255,255,255,0.3)',
                            borderWidth: 1
                        },
                        emphasis: { // 选中的区域颜色及阴影效果等
                            areaColor: 'rgba(255,180,0,0.7)',
                            shadowColor: 'rgba(0,0,0,0.3)',
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowBlur: 20,
                            borderWidth: 0,
                        }
                    },
                    data: this.provinceData//数据来源
                }
            }
            this.myChart.setOption(option, { lazyMode: true });
            window.addEventListener(
                'resize',
                () => {
                    setTimeout(() => {
                        this.makeChinaMap();
                        this.myChart.resize();
                    }, 300)
                }
            )
        },

        mapZoom() {
            this.myChart.setOption({
                series: {
                    zoom: this.zoom,
                }
            });
        },
    },

    created() {
        api.getNcov().then((res) => {
            if (res.status === 200) {
                var data = res.data.data.list;
                for (let i = 0; i < data.length; i++) {
                    var temp = {
                        name: data[i].name,
                        value: data[i].econNum,
                    }
                    this.provinceData.push(temp);
                }
                this.provinceData.push({
                    name: '南海诸岛',
                    value: this.provinceData.find(item => item.name == '海南').value,
                });
            }
        }).then(() => {
            setTimeout(() => {
                this.myChart = echarts.init(document.getElementById("china"));
                this.makeChinaMap();
            }, 300)
        }).catch((error) => { });
    },

    watch: {
        "$store._state.data.isLogin": {
            handler(newVal, oldVal) {
                this.isLogin = newVal
            },
            immediate: true
        }
    }
};
</script>




