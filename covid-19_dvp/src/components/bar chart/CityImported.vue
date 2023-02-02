<template>
    <div>
        <div id="importedBar">
        </div>
    </div>
</template>
    
<style lang="less" scoped>
#importedBar {
    box-sizing: border-box;
    width: auto;
    height: 17rem;
    margin: auto 5px;
    overflow: hidden;
}
</style>

<script>
import * as echarts from "echarts";
import api from '@/api'

export default {
    methods: {
        makeImportedBar: function () {
            api.getNcov().then((res) => {
                let myChart = echarts.init(document.getElementById('importedBar'));
                var option;
                var impotredData = [];
                var nameData = [];
                var valueData = [];
                var data = res.data.data.list;
                data.forEach(element => {
                    impotredData.push({
                        name: element.name,
                        value: element.jwsrNum
                    })
                });
                function fuc(a, b) {
                    return b.value - a.value
                }
                impotredData.sort(fuc)
                impotredData.forEach(element => {
                    nameData.push(element.name)
                    valueData.push(element.value)
                });
                nameData.splice(15)
                valueData.splice(15)
                option = {
                    title: {
                        text: '境外输入确诊',
                    },
                    tooltip: {
                        trigger: 'item',
                        showDelay: 0,
                        backgroundColor: "rgba(75, 75, 75, 0.5)",
                        transitionDuration: 0.1,
                    },
                    xAxis: {
                        data: nameData,
                        axisLabel: {
                            color: '#999'
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
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            color: '#999'
                        }
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
                        endValue: nameData[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
                    });
                });
                option && myChart.setOption(option, { lazyMode: true })
                window.addEventListener(
                    'resize',
                    () => {
                        setTimeout(() => {
                            myChart.resize()
                        }, 100)
                    },
                    false,
                )
            }).catch((error) => { });
        }
    },

    mounted() {
        setTimeout(() => {
            this.makeImportedBar()
        }, 100)

    },
}

</script>
