<template>
    <div>
        <div :id="info.barName" class="BarClass">
        </div>
    </div>
</template>
    
<style lang="less" scoped>
.BarClass {
    box-sizing: border-box;
    position: relative;
    height: 15rem;
}
</style>

<script>
import * as echarts from "echarts";


export default {
    data() {
        return {
            maxVal: 0,
            step: 0,
        }
    },

    props: {
        info: {
            type: Object,
            default: {},
        },
    },


    methods: {
        getFontSize(res) {
            let clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            if (!clientWidth) return;
            let fontSize;
            if (clientWidth <= 425) {
                fontSize = (clientWidth / 40);
            } else if (clientWidth <= 768) {
                fontSize = (clientWidth / 56);
            } else {
                fontSize = (clientWidth / 84);
            }
            if (!res) {
                return fontSize;
            } else {
                return fontSize * res;
            }
        },

        getFormat(maxVal) {
            let max = (maxVal + '').charAt(0);
            max = Number(max) + 1;
            let step = 0;
            for (let i = 1; i < (maxVal + '').length - 1; i++) {
                max += '0';
            }
            max = max + 0;
            if (maxVal >= 100000) {
                max = 100000;
            }
            step = max / 5;
            return {
                max, step
            }
        },

        makeBar() {
            let myChart = echarts.init(document.getElementById(this.info.barName));
            let nameData = [];
            let valueData = [];
            this.info.data.forEach(ele => {
                nameData.push(ele.name)
            });
            this.info.data.forEach(ele => {
                valueData.push(ele.value)
            });
            var option = {
                title: {
                    text: this.info.barName,
                    textStyle: {
                        fontSize: this.getFontSize(1.5),
                    },
                },
                grid: {
                    top: '18%',
                    left: '15%',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                xAxis: {
                    data: nameData,
                    axisLabel: {
                        color: '#999',
                        textStyle: {
                            fontSize: this.getFontSize(1.3),
                        },
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    z: 10
                },
                yAxis: {
                    max: this.maxVal,//最大值
                    min: 0,//最小值
                    interval: this.step,//间隔
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: '#999',
                        textStyle: {
                            fontSize: this.getFontSize(1.2),
                        },
                        formatter: function (val) {//Y轴显示
                            if (val == 0) {
                                return val
                            } else
                                if (val >= 100000) {
                                    return val = ">10万";
                                } else if (val >= 10000) {
                                    let str = val + '';
                                    return str.substring(-1, 1) + "万";
                                } else {
                                    return val
                                }
                        }
                    },

                },
                dataZoom: [
                    {
                        type: 'inside',
                        startValue: nameData[0],
                        endValue: nameData[4],
                        maxValueSpan: 7,
                        minValueSpan: 3
                    }
                ],
                series: [
                    {
                        type: 'bar',
                        showBackground: true,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#83bff6' },
                                { offset: 0.5, color: '#188df0' },
                                { offset: 1, color: '#188df0' }
                            ])
                        },
                        emphasis: {
                            itemStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    { offset: 0, color: '#2378f7' },
                                    { offset: 0.7, color: '#2378f7' },
                                    { offset: 1, color: '#83bff6' }
                                ])
                            }
                        },
                        data: valueData
                    }
                ]
            };
            const zoomSize = 4;
            myChart.on('click', function (params) {
                myChart.dispatchAction({
                    type: 'dataZoom',
                    startValue: nameData[Math.max(params.dataIndex - zoomSize / 2, 0)],
                    endValue: nameData[Math.min(params.dataIndex + zoomSize / 2, nameData.length - 1)]
                });
            });
            myChart.setOption(option);
            window.addEventListener(
                'resize',
                () => {
                    setTimeout(() => {
                        this.makeBar();
                        myChart.resize();
                    }, 300)
                },
                false,
            )
        }
    },

    created() {
        this.maxVal = this.getFormat(this.info.data[0].value).max;
        this.step = this.getFormat(this.info.data[0].value).step;
    },

    mounted() {
        setTimeout(() => {
            this.makeBar();
        }, 300)

    },
}

</script>

