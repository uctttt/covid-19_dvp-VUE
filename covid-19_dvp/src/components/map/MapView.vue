<template>
    <div>
        <div class="map">
            <div id="china"></div>
        </div>
    </div>
</template>

<script>
import * as echarts from "echarts";
import api from '@/api'
import china from '@/../node_modules/echarts/map/json/china.json'
echarts.registerMap('china', china)

export default {
    data() {
        return {
            myChart: null
        }
    },
    methods: {
        makeChinaMap() {
            api.getNcov().then((res) => {
                if (res.status === 200) {
                    var provinceData = [];
                    this.myChart = echarts.init(document.getElementById("china"));
                    var data = res.data.data.list;
                    for (let i = 0; i < data.length; i++) {
                        var temp = {
                            name: data[i].name,
                            value: data[i].econNum,
                        }
                        provinceData.push(temp);
                    }
                    provinceData.push({
                        name: '南海诸岛',
                        value: provinceData.find(item => item.name == '海南').value,
                    });

                    var option = {
                        backgroundColor: "rgba(230, 230, 230, 0.3)",
                        title: {},
                        tooltip: {},
                        //左侧小导航图标
                        visualMap: {
                            align: "left",
                            show: true,
                            x: 'left',
                            y: 'bottom',
                            type: "piecewise",
                            backgroundColor: "rgba(75, 75, 75, 0.3)",
                            textStyle: {
                                fontSize: 12,
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
                            backgroundColor: "rgba(75, 75, 75, 0.5)",
                            transitionDuration: 0.2,
                            formatter: function (params) {
                                return "现存确诊人数<br/>" + params.data.name +
                                    ':' + params.data.value + '<br/><a href="/city/' + params.data.name + '" style="color: #FFFFFF;">查看详情</a>';
                            }
                        },
                        //配置属性
                        series: {
                            name: "国内省/市现存确诊人数",
                            type: "map",// 配置图表类型
                            map: "china", // 中国地图
                            roam: true,// 是否允许自动缩放
                            zoom: 1.23,// 地图缩放比例
                            scaleLimit: {
                                max: 7,
                                min: 1
                            },
                            label: {      // 配置字体
                                normal: {
                                    show: false,
                                    textStyle: {
                                        fontWeight: "bold",
                                        fontSize: 18,
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
                            data: provinceData//数据来源
                        }
                    }
                    this.myChart.setOption(option, { lazyMode: true });
                    window.addEventListener(
                        'resize',
                        () => {
                            setTimeout(() => {
                                this.myChart.resize();
                            }, 100)
                        },
                        false,
                    )
                }
            }).catch((error) => { });
        }
    },

    mounted() {
        setTimeout(() => {
            this.makeChinaMap();
        }, 300)
    },
};
</script>

<style lang="less" scoped>
.map {
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    padding: 0 .3125rem;
    width: 100%;
    height: 18.75rem;
    border-radius: .9375rem;

    #china {
        box-sizing: border-box;
        width: 95vw;
        height: 18.75rem;
        border-radius: .9375rem;
        border: solid .125rem rgba(100, 148, 237, 0.4);
        overflow: hidden;
    }
}
</style>
