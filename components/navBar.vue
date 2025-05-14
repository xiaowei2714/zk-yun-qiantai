<template>
	<view style="position: fixed;bottom: 74rpx;left: 0;width: 100%;">
		<view style="height: 118rpx;background: #FFFFFF;box-shadow: 0rpx 6rpx 20rpx 2rpx rgba(0,0,0,0.08);border-radius: 82rpx 82rpx 82rpx 82rpx;
			margin-left: 30rpx;margin-right: 30rpx;display: flex;align-items: center;">
			<view @click="changeNarBar(0, '/pages/index/index')" style="width: 25%;text-align: center;">
				<view>
					<image v-if="navIndex == 0" src="/static/index-1.png" style="width: 76rpx;height: 76rpx;" mode=""></image>
					<image v-else src="/static/index.png" style="width: 35rpx;height: 35rpx;" mode=""></image>
					<view v-if="navIndex != 0" style="font-size: 20rpx;color: #C6CCD6;">首页</view>
				</view>
			</view>
			<view @click="changeNarBar(1, '/pages/order/order')" style="width: 25%;text-align: center;">
				<view>
					<image v-if="navIndex == 1" src="/static/order-1.png" style="width: 76rpx;height: 76rpx;" mode=""></image>
					<image v-else src="/static/order.png" style="width: 35rpx;height: 35rpx;" mode=""></image>
					<view v-if="navIndex != 1" style="font-size: 20rpx;color: #C6CCD6;">订单</view>
				</view>
			</view>
			<view @click="changeNarBar(2, '/pages/extend/extend')" style="width: 25%;text-align: center;">
				<view>
					<image v-if="navIndex == 2" src="/static/tg-1.png" style="width: 76rpx;height: 76rpx;" mode=""></image>
					<image v-else src="/static/tg.png" style="width: 35rpx;height: 35rpx;" mode=""></image>
					<view v-if="navIndex != 2" style="font-size: 20rpx;color: #C6CCD6;">推广</view>
				</view>
			</view>
			<view @click="changeNarBar(3, '/pages/my/my')" style="width: 25%;text-align: center;">
				<view>
					<image v-if="navIndex == 3" src="/static/my-1.png" style="width: 76rpx;height: 76rpx;" mode=""></image>
					<image v-else src="/static/my.png" style="width: 35rpx;height: 35rpx;" mode=""></image>
					<view v-if="navIndex != 3" style="font-size: 20rpx;color: #C6CCD6;">我的</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"navBar",
		props: {
			navIndex: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				// navIndex: 0
			};
		},
		mounted() {
			// let navIndex = uni.getStorageSync('navIndex')
			// if (!navIndex) {
			// 	navIndex = 0
			// }
			// this.navIndex = navIndex
		},
		methods: {
			changeNarBar(navIndex, url) {
				// uni.setStorageSync('navIndex', navIndex)
				// this.navIndex = navIndex
				uni.redirectTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss">

</style>