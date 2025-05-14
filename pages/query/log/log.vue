<template>
	<view style="padding: 30rpx;">
		<view style="display: flex;align-items: center;">
			<view @click="changeType(1)" style="font-size: 32rpx;" :style="{fontWeight: type == 1 ? 'bold' : '400', color: type == 1 ? '#000000' : '#757B8C'}">话费记录</view>
			<view @click="changeType(2)" style="font-size: 32rpx;margin-left: 72rpx;" :style="{fontWeight: type == 2 ? 'bold' : '400', color: type == 2 ? '#000000' : '#757B8C'}">电费记录</view>
		</view>
		<view style="margin-top: 32rpx;box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);border-radius: 32rpx;padding: 30rpx;">
			<view v-for="(item, index) in 8" :key="index" style="display: flex;align-items: center;justify-content: space-between;margin-bottom: 52rpx;">
				<view style="font-weight: 400;font-size: 28rpx;color: #757B8C;">19999992520 湖北移动 <span style="color: black;margin-left: 10rpx;">35.25</span></view>
				<view style="display: flex;align-items: center;">
					<view style="font-weight: bold;font-size: 24rpx;color: #3742C5;">历史记录</view>
					<view style="margin-left: 10rpx;">
						<image src="/static/info-right.png" style="width: 10rpx;height: 18rpx;" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		
		<nav-bar :nav-index="2"/>
	</view>
</template>

<script>
	import NavBar from '@/components/navBar3.vue'; // 引入组件
	export default {
		components: {
			NavBar // 注册组件
		},
		data() {
			return {
				type: 1
			};
		},
		onLoad() {
			
		},
		methods: {
			changeType(e) {
				this.type = e
			}
		}
	}
</script>

<style lang="scss">

</style>
