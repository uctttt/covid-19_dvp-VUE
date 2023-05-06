<template>
    <div>
        <div :id="oInfo.barName" class="BarClass">
        </div>
    </div>
    <div class="block">
        <el-date-picker v-model="date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
            :default-value="[new Date(2022, 1, 11), new Date(2022, 8, 10)]" :disabled-date="disabledDate"
            @change="outPut()" />
    </div>
</template>
    
<style lang="less" scoped>
.BarClass {
    box-sizing: border-box;
    position: relative;
    height: 22rem;
}

.block {
    margin-bottom: 1.5rem;

    /deep/.is-right {
        display: none;
    }
}
</style>

<script>
import * as echarts from "echarts";


export default {
    data() {
        return {
            date: '',
            selectedInfo: '',
            oInfo: {
                barName: 'stackedLine',
                series: [
                    ['times'],
                    ['累计确诊'],
                    ['当前确诊'],
                    ['累计治愈'],
                    ['累计死亡'],
                ],
            },
        }
    },

    props: {
        info: {
            default: {},
        },
    },


    methods: {
        //根据当前窗口宽度设定字体大小
        getFontSize(res) {
            let clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            if (!clientWidth) return;
            let fontSize;
            if (clientWidth <= 425) {
                fontSize = (clientWidth / 30);
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

        //防抖
        debounce(fuc, delay) {
            let timer = null;
            return function (...args) {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    fuc.apply(this, args);
                }, delay);
            };
        },

        disabledDate(val) {
            return val.getTime() > new Date(2022, 7, 10).getTime() || val.getTime() < new Date(2022, 0, 11).getTime()
        },

        reset() {
            this.selectedInfo = '';
            this.oInfo = {
                barName: 'stackedLine',
                series: [
                    ['times'],
                    ['累计确诊'],
                    ['当前确诊'],
                    ['累计治愈'],
                    ['累计死亡'],
                ],
            };
            let StackedLineData = this.info.historyData.slice(0, this.info.historyData.length);
            StackedLineData.reverse();
            StackedLineData.forEach(ele => {
                this.oInfo.series[0].push(ele.date)
                this.oInfo.series[1].push(ele.cn_conNum)
                this.oInfo.series[2].push(ele.cn_econNum)
                this.oInfo.series[3].push(ele.cn_cureNum)
                this.oInfo.series[4].push(ele.cn_deathNum)
            });
            this.selectedInfo = this.oInfo.series;
        },

        outPut() {
            if (!this.date) {
                this.reset();
                this.makeBar();
                return;
            }
            this.reset();
            let dateS = new Date(this.date[0]);
            let dateE = new Date(this.date[1]);
            const Ms = dateS.getMonth() + 1 < 10 ? '0' + (dateS.getMonth() + 1) : dateS.getMonth() + 1;
            const Me = dateE.getMonth() + 1 < 10 ? '0' + (dateE.getMonth() + 1) : dateE.getMonth() + 1;
            const Ds = dateS.getDate() + 1 <= 10 ? '0' + (dateS.getDate()) : dateS.getDate();
            const De = dateE.getDate() + 1 <= 10 ? '0' + (dateE.getDate()) : dateE.getDate();
            let startD = Ms + '.' + Ds;
            let endD = Me + '.' + De;
            let start = this.oInfo.series[0].indexOf(startD);
            let end = this.oInfo.series[0].lastIndexOf(endD) + 1;
            this.selectedInfo[0] = this.selectedInfo[0].slice(start, end);
            this.selectedInfo[0].unshift('times');
            this.makeBar();
        },

        makeBar() {
            let myChart = echarts.init(document.getElementById(this.oInfo.barName));
            let option = {
                legend: {},
                toolbox: {
                    show: true,
                    itemSize: this.getFontSize(1.1),
                    top: '5%',
                    right: '5%',
                    feature: {
                        // 缩放控制
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        // 可选的显示模式
                        magicType: { type: ['line', 'bar', 'stack'] },
                        // 重置图表
                        restore: {},
                        // 保存图表图片
                        saveAsImage: {}
                    }
                },

                tooltip: {
                    trigger: 'axis',
                    textStyle: {
                        fontSize: this.getFontSize(.8)
                    },
                },

                dataset: {
                    source: this.selectedInfo,
                },

                xAxis: {
                    type: 'category',
                    axisLabel: {
                        inside: false,
                        textStyle: {
                            fontSize: this.getFontSize()
                        },
                    },
                },

                yAxis: {
                    axisLabel: {
                        inside: false,
                        textStyle: {
                            fontSize: this.getFontSize()
                        },
                    },
                },

                grid: {
                    top: '50%',
                    left: '14%',
                },

                series: [
                    {
                        type: 'line',
                        smooth: true,
                        stack: false,
                        seriesLayoutBy: 'row',
                    },
                    {
                        type: 'line',
                        smooth: true,
                        stack: false,
                        seriesLayoutBy: 'row',
                    },
                    {
                        type: 'line',
                        smooth: true,
                        stack: false,
                        seriesLayoutBy: 'row',
                    },
                    {
                        type: 'line',
                        smooth: true,
                        stack: false,
                        seriesLayoutBy: 'row',
                    },
                    {
                        type: 'pie',
                        id: 'pie',
                        radius: '25%',
                        center: ['50%', '30%'],
                        emphasis: {
                            focus: 'self'
                        },
                        label: {
                            formatter: '{b}:({d}%)',
                            textStyle: {
                                fontSize: this.getFontSize(.85)
                            },
                        },
                        encode: {
                            itemName: 'times',
                            value: this.selectedInfo[0][1],
                        }
                    }
                ]
            };

            //根据折线图映射饼图
            myChart.on('updateAxisPointer', this.debounce(function (event) {
                const xAxisInfo = event.axesInfo[0];
                if (xAxisInfo) {
                    const dimension = xAxisInfo.value + 1;
                    myChart.setOption({
                        series: {
                            id: 'pie',
                            label: {
                                formatter: '{b}:{d}%'
                            },
                            encode: {
                                value: dimension,
                                tooltip: dimension
                            }
                        }
                    });
                }
            },350) );
            myChart.setOption(option);
            //监听窗口变化
            window.addEventListener(
                'resize',
                () => {
                    // 延时调用图表的重设大小方法
                    setTimeout(() => {
                        myChart.resize();
                    }, 300)
                },
            )
        }
    },

    created() {
        this.reset();
        setTimeout(() => {
            this.makeBar();
        }, 300);
    },
}

</script>

