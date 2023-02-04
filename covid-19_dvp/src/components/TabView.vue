<template>
	<div>
		<el-tabs v-model="activeName" class="demo-tabs" stretch="true">
			<el-tab-pane label="国内疫情" name="first" class="tabNav">
				<ChinaMap />
				<InfoSwipe />
				<New/>
			</el-tab-pane>
			<el-tab-pane label="世界疫情" name="second" class="tabNav">
				<WorldMap />
				<WorldInfo />
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

		.el-tabs__item{
			color: gray;
			font-size: .9375rem;
		}
	}
</style>

<script>
	import WorldInfo from '@/components/info/WroldInfo.vue'
	import InfoSwipe from "@/components/InfoSwipe.vue"	
	import New from "@/components/New.vue"
	import ChinaMap from "@/components/map/MapView.vue"
	import WorldMap from "@/components/map/WorldMapView.vue"
	
	export default {
		name: 'TabView',
		components: {
		    WorldInfo,
		    InfoSwipe,
		    New,
		    ChinaMap,
		    WorldMap,
		},
		data() {
			return {
				activeName: 'first'
			}
		},
	}
</script>
