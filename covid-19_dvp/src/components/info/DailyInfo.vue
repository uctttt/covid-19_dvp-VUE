<template>
	<div>
		<div class="dailyInfo-title">
			<div>国内疫情数据统计</div>
			<div class="aboutIco" @click="aboutPage">
				<el-icon color="rgb(200, 200, 200)">
					<Warning />
				</el-icon>
			</div>
		</div>

		<div class="dailyInfo-body">
			<span class="nowDate">截至<span class="date">{{ getDate(DailyInfoData.modifyTime) }}</span>全国疫情数据统计</span>
			<el-row class="dailyInfo-list">
				<el-col :span="8">
					<li class="info-content">
						<div class="dataChanges"><span :class="getChange(DailyInfoData.currentConfirmedIncr).change">{{
							getChange(DailyInfoData.currentConfirmedIncr).incr
						}}</span>
						</div>
						<div class="mainData" style="color: rgb(255, 75, 0);">{{ DailyInfoData.currentConfirmedCount }}
						</div>
						<div class="dataType">现存确诊</div>
					</li>
				</el-col>
				<el-col :span="8">
					<li class="info-content">
						<div class="dataChanges"><span :class="getChange(DailyInfoData.confirmedIncr).change">{{
							getChange(DailyInfoData.confirmedIncr).incr
						}}</span>
						</div>
						<div class="mainData" style="color: rgb(255, 0, 0);">{{ DailyInfoData.confirmedCount }}</div>
						<div class="dataType">累计确诊</div>
					</li>
				</el-col>
				<el-col :span="8">
					<li class="info-content">
						<div class="dataChanges"><span :class="getChange(DailyInfoData.suspectedIncr).change">{{
							getChange(DailyInfoData.suspectedIncr).incr
						}}</span>
						</div>
						<div class="mainData" style="color: rgb(87, 117, 172);">{{ DailyInfoData.suspectedCount }}</div>
						<div class="dataType">疑似病例</div>
					</li>
				</el-col>
				<el-col :span="8">
					<li class="info-content">
						<div class="dataChanges"><span :class="getChange(DailyInfoData.seriousIncr).change">{{
							getChange(DailyInfoData.seriousIncr).incr
						}}</span>
						</div>
						<div class="mainData" style="color: rgb(120, 0, 0);">{{ DailyInfoData.seriousCount }}</div>
						<div class="dataType">重症病例</div>
					</li>
				</el-col>
				<el-col :span="8">
					<li class="info-content">
						<div class="dataChanges"><span :class="getChange(DailyInfoData.curedIncr).change">{{
							getChange(DailyInfoData.curedIncr).incr
						}}</span></div>
						<div class="mainData" style="color: rgb(0, 180, 0);">{{ DailyInfoData.curedCount }}</div>
						<div class="dataType">累计治愈</div>
					</li>
				</el-col>
				<el-col :span="8">
					<li class="info-content">
						<div class="dataChanges"><span :class="getChange(DailyInfoData.deadIncr).change">{{
							getChange(DailyInfoData.deadIncr).incr
						}}</span></div>
						<div class="mainData" style="color: rgb(80, 80, 80);">{{ DailyInfoData.deadCount }}</div>
						<div class="dataType">累计死亡</div>
					</li>
				</el-col>
			</el-row>
		</div>
	</div>

	<el-card class="about" v-show="showAbout" >
		<div class="aboutTitle" @touchmove.prevent @mousewheel.prevent>—— 关于页面 ——</div>
		<div class="aboutContent">
			<p>
				1.数据来源：本页面及其下子页面展示数据皆采集自网络上公开数据或为虚构测试数据，与真实情况存在一定差距，请酌情观看;
			</p>
			<br>
			<p>
				2.数据更新时间：因采集需要，本页面更新数据时间将与官方数据发布时间存在一定时间延迟。
			</p>
		</div>
	</el-card>
	<div class="blackBackground" v-show="showAbout" @click="closeAbout" @touchmove.prevent @mousewheel.prevent>
	</div>
</template>

<style lang="less" scoped>
.dailyInfo-title {
	display: flex;
	justify-content: space-between;
	font-size: 1.4rem;
	color: black;
	padding-left: .625rem;
	border-left: .3125rem solid cornflowerblue;

	.aboutIco {
		width: auto;
		margin-right: .5rem;
	}
}

.dailyInfo-body {
	padding: .5rem;
}

div {
	width: 100%;
	padding: auto;
	text-align: left;

	.nowDate {
		margin: .625rem 0;
		font-size: .8rem;
		color: black;

		.date {
			color: cornflowerblue;
		}
	}

	.dailyInfo-list {
		margin: .625rem 0;
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		justify-content: space-around;
		border: .125rem solid rgb(200, 200, 200, 0.3);
		border-radius: .625rem;
		box-shadow: .125rem .125rem .1875rem #e0e0e0,
			-0.125rem -0.125rem .1875rem #ffffff;

		.info-content {
			margin: .625rem 0;
			display: flex;
			justify-content: space-around;
			flex-direction: column;

			.dataChanges {
				font-size: .9rem;
				text-align: center;

				.add {
					color: rgb(250, 0, 0);
					font-weight: lighter;
				}

				.reduce {
					color: rgb(80, 190, 70);
					font-weight: lighter;
				}

				.noChange {
					color: rgb(150, 150, 150);
					font-weight: lighter;
				}
			}

			.mainData {
				height: 1.75rem;
				line-height: 1.75rem;
				font-size: 1.4rem;
				font-weight: 650;
				text-align: center;
			}

			.dataType {
				font-size: 1.2rem;
				font-weight: bold;
				text-align: center;
			}
		}
	}
}

.about {
	z-index: 999;
	position: fixed;
	left: 50%;
	top: 50%;
	width: auto;
	transform: translate(-50%, -50%);

	.aboutTitle {
		text-align: center;
		margin-bottom: 1.4rem;
		font-size: 1.7rem;
		font-weight: bold;
		color: cornflowerblue;
	}

	.aboutContent {
		width: 18rem;
		height: 10rem;
		overflow: scroll;
		overscroll-behavior:contain;
		background-color: rgba(200, 200, 200, 0.3);
		padding: 1rem;
		font-size: 1rem;
		line-height: 1.5rem;
		text-indent: 1rem;
	}
}

.blackBackground {
	z-index: 998;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: rgba(0, 0, 0, 0.075);
	width: 100vw;
	height: 100vh;
}
</style>

<script>
export default {
	data() {
		return {
			showAbout: false,
		}
	},

	props: {
		DailyInfoData: {
			type: Object,
			default: function () {
				return {}
			},
		},
	},

	methods: {
		aboutPage() {
			this.showAbout = true;
		},

		closeAbout() {
			this.showAbout = false;
		},

		getDate(time) {
			const date = new Date(time);
			const Y = date.getFullYear();
			const M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
			const D = date.getDate() + 1 <= 10 ? '0' + (date.getDate()) : date.getDate();
			const h = date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours();
			const m = date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes();
			return ` ${Y}年 ${M}月${D}日 ${h}时${m}分 `;
		},

		getChange(num) {
			var change = '';
			var incr = '';
			if (num > 0) {
				change = 'add';
				incr = `较昨日+${num}`;
			} else if (num == 0) {
				change = 'noChange';
				incr = `较昨日无变化`;
			} else if (num < 0) {
				change = 'reduce';
				incr = `较昨日${num}`;
			} else {
				change = 'noChange';
				incr = `暂无数据`;
			}
			return {
				change: change,
				incr: incr,
			};
		}
	},
}
</script>
