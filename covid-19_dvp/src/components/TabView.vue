<template>
	<div>
		<el-tabs v-model="activeName" class="demo-tabs" :stretch="true">
			<el-tab-pane label="国内疫情" name="first" class="tabNav">
				<ChinaMap />

				<div class="loginMsg" v-if="isLogin">

					<div class="swipe" v-if="loaded">
						<div class="chartTitle">
							<div class="titleFirst">各省市疫情数据榜单</div>
							<div class="titleSecond">点击图表两侧切换榜单</div>
						</div>
						<el-carousel arrow="always" indicator-position="outside" :autoplay=false>
						    <!-- 现存确诊病例榜单 -->
							<el-carousel-item>
								<category :info="infoActive" />
							</el-carousel-item>
							<!-- 累计确诊病例榜单 -->
							<el-carousel-item>
								<category :info="infoCount" />
							</el-carousel-item>
							<!-- 境外输入病例榜单 -->
							<el-carousel-item>
								<category :info="infoImported" />
							</el-carousel-item>
						</el-carousel>
					</div>

					<div class="chartTitle">
						<div class="titleFirst">全国疫情变化趋势</div>
					</div>
					<StackedLine :info="DailyInfoData" v-if="loaded" />

					<div class="cityClearProgress" v-if="loaded">
						<div class="chartTitle">
							<div class="titleFirst">累计确诊城市 <span>{{ DailyInfoData.cityNum }}</span></div>
						</div>
						<div class="content">
							<div class="clear">
								<span>{{ DailyInfoData.clearCity }}</span>
								无病例城市
							</div>
							<el-progress :stroke-width="20" :percentage="clearProgress" stroke-linecap="butt"
								type="dashboard">
								<span class="percentage-text">清零进度</span>
								<br>
								<span class="percentage-value">{{ clearProgress }}%</span>
							</el-progress>
							<div class="noClear">
								<span>{{ DailyInfoData.noClearCity }}</span>
								感染城市
							</div>
						</div>
					</div>

					<New />

				</div>
			</el-tab-pane>
			<el-tab-pane label="世界疫情" name="second" class="tabNav">

				<WorldMap />

				<div class="loginMsg" v-if="isLogin">

					<WorldInfo />

				</div>

			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<style lang="less">
.demo-tabs {
	.el-tabs__header {
		position: sticky;
		top: 0;
		background-color: #fff;
		z-index: 99;
	}

	.el-tabs__item {
		color: gray;
		font-size: 1.2rem;
		margin: .3rem 0;
	}
}

.loginMsg {
	.cityClearProgress {

		.content {
			height: auto;
			padding: 1rem 0;
			margin: .6rem 1rem;
			display: flex;
			justify-content: space-around;
			background-color: rgba(200, 200, 200, 0.1);

			.el-progress {
				width: 8rem;
				height: 8rem;

				.el-progress-circle {
					svg {
						width: 8rem;
						height: 8rem;

						path:first-child {
							stroke: rgb(225, 20, 20);
						}
					}
				}
			}

			.noClear {
				display: flex;
				flex-direction: column;
				justify-content: center;
				min-width: 5rem;

				span {
					font-size: 2rem;
					font-weight: bold;
					color: rgb(225, 20, 20);
				}
			}

			.clear {
				display: flex;
				flex-direction: column;
				justify-content: center;
				min-width: 5rem;

				span {
					font-size: 2rem;
					font-weight: bold;
					color: rgb(35, 160, 255);
				}
			}

			.percentage-text {
				font-size: .9rem;
			}

			.percentage-value {
				font-size: 1.6rem;
			}
		}
	}

}

.swipe {
	box-sizing: border-box;
	width: 100%;
	margin-top: .9375rem;

	/deep/.el-carousel__arrow {
		height: 100%;
		background-color: rgba(250, 235, 215, 0);
		border-radius: 0;
	}

	/deep/.el-carousel__container {
		height: 15rem;

		i {
			display: none;
		}
	}
}

.chartTitle {
	text-align: start;
	font-weight: normal;
	margin-bottom: .8rem;

	.titleFirst {
		color: black;
		padding-left: .625rem;
		border-left: .3125rem solid cornflowerblue;
		font-size: 1.375rem;

		span {
			font-size: 1.5rem;
			font-weight: bold;
			color: rgb(225, 20, 20);
		}
	}

	.titleSecond {
		color: rgb(190, 190, 190);
		font-size: 1rem;
		padding-left: .3125rem;
	}
}
</style>

<script>
import WorldInfo from '@/components/info/WroldInfo.vue'
import category from '@/components/chart/Category.vue'
import StackedLine from "@/components/chart/StackedLine.vue"
import ChinaMap from "@/components/map/MapView.vue"
import WorldMap from "@/components/map/WorldMapView.vue"
import New from "@/components/New.vue"

export default {
	name: 'TabView',

	components: {
		WorldInfo,
		category,
		StackedLine,
		ChinaMap,
		WorldMap,
		New,
	},

	data() {
		return {
			activeName: 'first',
			isLogin: false,
			loaded: false,
			clearProgress: 0,

			infoImported: {
				barID: 'imported',
				barName: '境外输入确诊',
				data: []
			},
			infoActive: {
				barID: 'active',
				barName: '现存确诊病例',
				data: []
			},
			infoCount: {
				barID: 'count',
				barName: '累计确诊病例',
				data: []
			},
		}
	},

	props: {
		DailyInfoData: {
			type: Object,
			default: function () {
				return {}
			},
		},
		RankInfo: {
			type: Object,
			default: function () {
				return {}
			},
		},
	},

	modules: {

	},

	created() {
		function stop() {
			clearInterval(getClearProgress);
		}

		const getClearProgress = setInterval(() => {
			this.clearProgress = (this.DailyInfoData.clearCity / this.DailyInfoData.cityNum).toFixed(2) * 100;
			if (!isNaN(this.clearProgress)) {
				this.infoImported = this.RankInfo.importedRank;
				this.infoActive = this.RankInfo.activeRank;
				this.infoCount = this.RankInfo.countRank;

				this.loaded = true;
				stop();
			}
		}, 300);
	},

	mounted() {
	},

	watch: {
		"$store._state.data.isLogin": {
			handler(newVal, oldVal) {
				this.isLogin = newVal
			},
			immediate: true
		}
	}
}
</script>
