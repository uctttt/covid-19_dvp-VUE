<template>
	<div class="new" id="newPage">
		<el-card>
			<div class="title">疫情时讯</div>
			<div class="body">
				<el-input v-model="search" placeholder="搜索新闻标题/时间/内容" clearable />
				<div class="data" v-for="item in TD.slice(0, loadLimit)">
					<el-row>
						<el-col :span="5">
							<div class="newsDate">{{ item.pubDate }}</div>
						</el-col>
						<el-col :span="18" :offset="1">
							<div class="newsTitle">{{ item.title }}</div>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="5">
							<div class="showNew" @click="openContent(item)">
								查看内容
							</div>
						</el-col>
						<el-col :span="9" :offset="10">
							<div class="newsFrom">来自:{{ item.infoSource }}</div>
						</el-col>
					</el-row>
				</div>
				<div class="noData" v-show="TD == ''">暂无数据</div>
			</div>
			<div class="bottomBtn" @click="loadMore" v-if="!loadAll">
				<div>加载更多</div>
				<el-icon>
					<CaretBottom />
				</el-icon>
			</div>
			<div class="bottomBtn" @click="toTop" v-if="loadAll">
				<el-icon>
					<CaretTop />
				</el-icon>
				<div>返回顶部</div>
			</div>
		</el-card>

		<el-card class="newContent" @touchmove.prevent @mousewheel.prevent v-show="showContent">
			<div class="contentBody">
				<el-card>
					<div class="contentTitle">{{ this.newsContent.title }}</div>
					<div class="contentFrom">本条新闻来自：<span>{{ this.newsContent.infoSource }}</span></div>
					<div class="contentTime">{{ this.newsContent.pubDate }}</div>
					<div class="content">
						{{ this.newsContent.summary }}<span title="前往站外网址" class="goOutside"
							@click="goOutsideCheck">……查看更多</span>
					</div>
				</el-card>
			</div>
		</el-card>
		<div class="blackBackground" v-show="showContent" @click="closeContent" @touchmove.prevent @mousewheel.prevent>
		</div>
	</div>
</template>

<style lang="less" scoped>
.new {
	padding: .625rem;

	.el-input {
		height: 1.5rem;
		font-size: .8rem;
	}

	.noData {
		margin: 1.125rem 0;
		font-weight: normal;
	}

	.blackBackground {
		z-index: 98;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: rgba(0, 0, 0, 0.075);
		width: 100vw;
		height: 100vh;
	}

	.newContent {
		z-index: 99;
		position: fixed;
		width: 24rem;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -45%);

		.contentTitle {
			font-size: 1.375rem;
			font-weight: normal;
			padding-top: .5rem;
			padding-bottom: .9375rem;
			border-bottom: 1px solid #e4e4e4a1;
		}

		.contentFrom {
			text-align: end;
			font-size: .875rem;
			color: #616161;
			font-weight: normal;
			margin: .625rem;

			span {
				color: #4b4b4b;
				;
			}
		}

		.contentTime {
			font-size: .875rem;
			text-align: end;
			color: #777777;
			font-weight: normal;
			margin: .625rem;

		}

		.content {
			padding: 0 1rem;
			font-size: 1rem;
			text-indent: 2rem;
			font-weight: normal;
			text-align: left;
			margin-bottom: 1.125rem;

			.goOutside {
				color: rgb(100, 148, 237);
				font-size: .9375rem;
				font-weight: normal;
				text-align: left;
			}

			.goOutside:hover {
				color: rgb(78, 130, 226);
				cursor: pointer;
			}
		}
	}

	.data {
		border-top: 1px solid #e4e4e4a1;
		font-style: normal;
		font-weight: normal;
		font-size: .9375rem;
		padding: .625rem 0;

		.showNew {
			padding: .1rem 0;
			font-size: .875rem;
			color: gray;
			border: 1px solid #e4e4e4a1;
			border-radius: .5rem;
		}

		.showNew:hover {
			color: cornflowerblue;
			border: 1px solid cornflowerblue;
			cursor: pointer;
		}

		.newsDate {
			margin: .5rem auto;
			font-size: .8125rem;
			color: cornflowerblue;
		}

		.newsTitle {
			margin-bottom: .4375rem;
			min-height: 2.75rem;
			font-size: 1.25rem;
			text-align: start;
		}

		.newsFrom {
			color: gray;
		}
	}

	/deep/.el-card__body {
		padding: .9375rem;
	}

	.title {
		font-size: 1.7rem;
		margin: .8rem auto 1.2rem;
	}

	.bottomBtn {
		display: flex;
		width: 15.75rem;
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
			font-size: 1.2375rem;
			color: #fff;
		}
	}

	.bottomBtn:hover {
		opacity: 1;
	}

	.bottomBtn:active {
		top: 4px;
		box-shadow: cornflowerblue 0rem .1875rem .125rem, #000 0rem .1875rem .3125rem;
	}
}
</style>

<script>
import api from '@/api/getNcovAPI'
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
	data() {
		return {
			newsList: [],
			newsContent: [],
			search: "",
			loadLimit: 10,
			loadAll: false,
			showContent: false,
		}
	},

	props: {},

	methods: {
		goOutsideCheck() {
			ElMessageBox.confirm(
				'是否打开站外网址?',
				'提示',
				{
					confirmButtonText: '确定',
					cancelButtonText: '返回',
					type: 'warning',
				}
			)
				.then(() => {
					window.open(this.newsContent.sourceUrl);
					this.newsContent = '';
					this.showContent = false;
				})
				.catch(() => {
				})
		},

		openContent(item) {
			this.showContent = true;
			this.newsContent = item;
			console.log(this.newsContent);
			console.log(this.newsContent.summary);
		},

		closeContent() {
			this.newsContent = '';
			this.showContent = false;
		},

		getDate(time) {
			const date = new Date(Number(time))
			const Y = date.getFullYear()
			const M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
			const D = date.getDate() + 1 < 10 ? '0' + (date.getDate()) : date.getDate()
			return `${Y}-${M}-${D}`
		},

		loadMore() {
			if (this.loadLimit + 10 < this.TD.length) {
				this.loadLimit += 10;
			} else {
				this.loadLimit = this.TD.length;
				this.loadAll = true;
			}
		},

		toTop() {
			let scrollTop = document.getElementById('newPage').scrollHeight;
			let timber = setInterval(() => {
				window.scrollTo(0, scrollTop -= 25);
				if (scrollTop <= document.body.scrollHeight - document.getElementById('newPage')
					.scrollHeight) {
					clearInterval(timber);
				}
			}, 5);
		},
	},

	mounted() {
		api.getNcovNews(1, 50).then((res) => {
			if (res.status === 200) {
				let data = res.data
				data.results.forEach(ele => {
					if (ele.sourceUrl != '') {
						this.newsList.push(ele);
					}
				})
			}
			this.newsList.forEach(ele => {
				ele.pubDate = this.getDate(ele.pubDate);
			})
		}).catch((error) => { });
	},

	computed: {
		TD: function () {
			var search = this.search;
			if (search) {
				return this.newsList.filter(function (keyWord) {
					return Object.keys(keyWord).some(function (key) {
						return String(keyWord[key]).indexOf(search) > -1;
					})
				})
			}
			this.loadLimit = 10;
			this.loadAll = false;
			return this.newsList;
		},
	}
}
</script>
