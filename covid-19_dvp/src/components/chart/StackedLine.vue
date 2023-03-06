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
    height: 22rem;
}
</style>

<script>
import * as echarts from "echarts";


export default {
    data() {
        return {
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

        makeBar() {
            let myChart = echarts.init(document.getElementById(this.info.barName));
            let option = {
                legend: {},
                toolbox: {
                    show: true,
                    itemSize: this.getFontSize(1.1),
                    top: '5%',
                    right: '5%',
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        magicType: { type: ['line', 'bar', 'stack'] },
                        restore: {},
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
                    source: this.info.series,
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
                            value: this.info.series[0][1],
                        }
                    }
                ]
            };

            myChart.on('updateAxisPointer', function (event) {
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
            });
            myChart.setOption(option, { lazyMode: true });
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
        setTimeout(() => {
            this.makeBar();
        }, 300);
    },
}

</script>

