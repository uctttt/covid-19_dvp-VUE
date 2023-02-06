<template slot-scope="scope">
	<div>
		<div class="dailyInfo-title">海外疫情数据统计</div>
		<div class="dailyInfo-body">
			<ul class="dailyInfo-list">
				<li class="info-content">
					<div class="mainData" style="color: rgb(255, 75, 0);">{{ getData(this.currentConfirmedCount) }}
					</div>
					<div class="dataType">现存确诊</div>
				</li>
				<li class="info-content">
					<div class="mainData" style="color: rgb(255, 0, 0);">{{ getData(this.confirmedCount) }}
					</div>
					<div class="dataType">累计确诊</div>
				</li>
				<li class="info-content">
					<div class="mainData" style="color: rgb(0, 180, 0);">{{ getData(this.curedCount) }}
					</div>
					<div class="dataType">累计治愈</div>
				</li>
				<li class="info-content">
					<div class="mainData" style="color: rgb(80, 80, 80);">{{ getData(this.deadCount) }}
					</div>
					<div class="dataType">累计死亡</div>
				</li>
			</ul>
			<div id="infoTbale">
				<el-card class="box-card">
					<el-input v-model="search" placeholder="搜索地区名称" @input='limitInput' clearable />
					<el-table :data="TD.slice(0, loadLimit)" @sort-change='sort_change' stripe style="width: 100%">
						<el-table-column type="index" :index="indexMethod" />
						<el-table-column prop="name" label="地区名称" />
						<el-table-column prop="econNum" label="现存确诊" sortable="custom" />
						<el-table-column prop="conNum" label="累计确诊" sortable="custom" />
					</el-table>
					<div class="bottomBtn" @click="loadMore" v-if="!loadAll && !inSearch">
						<div>加载更多</div>
						<el-icon>
							<CaretBottom />
						</el-icon>
					</div>
					<div class="bottomBtn" @click="toTop" v-if="loadAll && !inSearch">
						<el-icon>
							<CaretTop />
						</el-icon>
						<div>返回顶部</div>
					</div>
				</el-card>
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
.dailyInfo-title {
	margin-top: .625rem;
	font-size: 1.5rem;
	color: black;
	padding-left: .625rem;
	font-weight: normal;
	border-left: .3125rem solid cornflowerblue;
}

.dailyInfo-body {
	padding: 0 .625rem;

	.bottomBtn {
		display: flex;
		width: 18.75rem;
		margin: .3125rem auto;
		flex-direction: column;
		--bg: cornflowerblue;
		position: relative;
		background: var(--bg);
		color: var(--text-color);
		font-weight: bold;
		text-transform: uppercase;
		transition: 0.3s;
		border-radius: .3125rem;
		opacity: 0.8;
		letter-spacing: .0625rem;
		box-shadow: cornflowerblue 0rem .4375rem .125rem, #000 0rem .5rem .3125rem;

		.el-icon {
			width: 100%;
			margin: auto;
			color: #fff;
		}

		div {
			margin-top: .3125rem;
			text-align: center;
			font-size: 1.4375rem;
			color: #fff;
		}
	}

	.bottomBtn:hover {
		opacity: 1;
	}

	.bottomBtn:active {
		top: .25rem;
		box-shadow: cornflowerblue 0px 3px 2px, #000 0px 3px 5px;
	}
}

div {
	width: 100%;
	padding: auto;
	text-align: left;

	.el-card {
		box-sizing: border-box;
		margin: .625rem 0;

		/deep/ .el-card__body {
			padding-bottom: .3125rem;
		}
	}

	.dailyInfo-list {
		padding: .5rem 0;
		margin: .625rem auto;
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		justify-content: space-around;
		border: .125rem solid rgb(200, 200, 200, 0.3);
		border-radius: .625rem;
		box-shadow: .125rem .125rem .1875rem #e0e0e0,
			-0.125rem -0.125rem .1875rem #ffffff;

		.info-content {
			width: 50%;
			margin: .375rem 0;
			display: flex;
			justify-content: space-around;
			flex-direction: column;

			.mainData {
				height: 1.75rem;
				line-height: 1.75rem;
				font-weight: bold;
				font-size: 1.625rem;
				text-align: center;
			}

			.dataType {
				font-size: 1.125rem;
				font-weight: bold;
				text-align: center;
			}
		}
	}
}
</style>

<script>
import api from '@/api/getNcovAPI'

export default {
	data() {
		return {
			countriesData: [],
			currentConfirmedCount: "", //现存确诊
			confirmedCount: "", //累计确诊
			curedCount: "", //累计治愈
			deadCount: "", //累计死亡
			search: "",
			loadLimit: 30,
			loadAll: false,
			inSearch: false,
		}
	},

	props: {},

	methods: {
		limitInput() {
			this.search = this.search.replace(/[^\u4E00-\u9FA5]/g, '')
		},

		sort_change(column) {
			this.proptype = column.prop;
			if (column.order === "descending") {
				this.countriesData.sort(this.desSort);
			} else if (column.order === "ascending") {
				this.countriesData.sort(this.ascSort);
			}
		},

		desSort(a, b) {
			return b[this.proptype] - a[this.proptype];
		},

		ascSort(a, b) {
			return a[this.proptype] - b[this.proptype];
		},

		getData(num) {
			let result = num + '';
			return result.slice(0, -4) + "万";
		},

		loadMore() {
			if (this.loadLimit + 30 < this.TD.length) {
				this.loadLimit += 30;
			} else {
				this.loadLimit = this.TD.length;
				this.loadAll = true;
			}
		},

		toTop() {
			let scrollTop = document.getElementById('infoTbale').scrollHeight;
			let timber = setInterval(() => {
				window.scrollTo(0, scrollTop -= 25);
				if (scrollTop <= document.body.scrollHeight - document.getElementById('infoTbale')
					.scrollHeight) {
					clearInterval(timber);
				}
			}, 5);
		},
	},

	created() {
		api.getNcov().then((res) => {
			if (res.status === 200) {
				let data = res.data.data;
				this.countriesData = data.otherlist;
				this.currentConfirmedCount = data.othertotal.ecertain;
				this.confirmedCount = data.othertotal.certain;
				this.deadCount = data.othertotal.die;
				this.curedCount = data.othertotal.recure;
			}
		}).catch((error) => { });

	},

	computed: {
		TD: function () {
			var search = this.search;
			if (search) {
				this.inSearch = true;
				return this.countriesData.filter(function (keyWord) {
					return Object.keys(keyWord).some(function (key) {
						return String(keyWord[key]).indexOf(search) > -1;
					})
				})
			}
			this.inSearch = false;
			this.loadLimit = 30;
			this.loadAll = false;
			return this.countriesData;
		},
	}
}
</script>
