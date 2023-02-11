<template>
	<div>
		<el-tabs v-model="activeName" class="demo-tabs" stretch="true">
			<el-tab-pane label="国内疫情" name="first" class="tabNav">
				<ChinaMap />
				<div class="loginMsg" v-if="isLogin">
					<InfoSwipe />
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

</style>

<script>
import WorldInfo from '@/components/info/WroldInfo.vue'
import InfoSwipe from "@/components/InfoSwipe.vue"
import ChinaMap from "@/components/map/MapView.vue"
import WorldMap from "@/components/map/WorldMapView.vue"
import New from "@/components/New.vue"

export default {
	name: 'TabView',

	components: {
		WorldInfo,
		InfoSwipe,
		ChinaMap,
		WorldMap,
		New,
	},

	data() {
		return {
			activeName: 'first',
			isLogin: false,
		}
	},

	watch: {
		"$store._state.data.isLogin": {
			handler(newVal, oldVal) {
				this.isLogin=newVal
			},
			immediate: true
		}
	}
}
</script>
