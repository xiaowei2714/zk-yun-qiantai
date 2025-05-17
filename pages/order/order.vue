<template>
	<view style="width: 100%;">
		<view style="padding: 30rpx;padding-bottom: 245rpx;">
			<view style="display: flex;margin-top: 100rpx;width: 100%;align-items: center;">
				<view @click="login"
					style="width: 140rpx;height: 140rpx;background-color: #CEB29D;border-radius: 100%;">
					<image :src="userInfo.avatar" style="width: 100%;height: 100%;border-radius: 100%;" mode=""></image>
				</view>
				<view v-if="userInfo.id" style="margin-left: 32rpx;width: 75%;" @click="login">
					<view style="display: flex;">
						<view style="font-weight: bold;font-size: 32rpx;">{{userInfo.nickname}}</view>
						<view v-if="userInfo.is_substation" style="margin-left: 26rpx;border: 2rpx solid #3742C5;border-radius: 28rpx;color: #3742C5;font-size: 24rpx;font-weight: 500;
							text-align: center;width: 138rpx;height: 48rpx;line-height: 48rpx;">分站站长</view>
					</view>
					<view style="display: flex;justify-content: space-between;margin-top: 15rpx;">
						<view style="display: flex;align-items: center;">
							<view style="width: 30rpx;height: 30rpx;background: #A9ABB6;border-radius: 6rpx;text-align: center;line-height: 30rpx;
								font-weight: 500;font-size: 24rpx;color: #FFFFFF;">ID</view>
							<view style="margin-left: 20rpx;font-weight: 500;font-size: 24rpx;color: #A9ABB6;">
								{{userInfo.sn}}
							</view>
						</view>
						<view>
							<image src="/static/index-notice-right.png" style="width: 13rpx;height: 22rpx;" mode="">
							</image>
						</view>
					</view>
					<view style="display: flex;align-items: center;margin-top: -10rpx;">
						<view>
							<image src="/static/order-email.png" style="width: 30rpx;height: 25rpx;" mode=""></image>
						</view>
						<view style="margin-left: 20rpx;font-weight: 500;font-size: 24rpx;color: #A9ABB6;">
							{{userInfo.account}}
						</view>
					</view>
				</view>
				<view v-else style="font-weight: bold;font-size: 32rpx;margin-left: 20rpx;">点击登录</view>
			</view>
			<view style="margin-top: 80rpx;font-weight: bold;font-size: 32rpx;">话费订单</view>
			<view style="margin-top: 48rpx;display: flex;flex-wrap: wrap;">
				<view @click="toOrderList('mobile', 0)" style="width: 25%;text-align: center;">
					<view>
						<image src="/static/order-quanb.png" style="width: 45rpx;height: 45rpx;" mode=""></image>
					</view>
					<view style="margin-top: 10rpx;font-weight: 400;font-size: 24rpx;color: #9C9EA8;">全部</view>
				</view>
				<view @click="toOrderList('mobile', 1)" class="num_p_show">
					<view class="num_show">
						{{ cou.pi }}
					</view>
					<view>
						<image src="/static/order-chongzz.png" style="width: 45rpx;height: 45rpx;" mode=""></image>
					</view>
					<view style="margin-top: 10rpx;font-weight: 400;font-size: 24rpx;color: #9C9EA8;">充值中</view>
				</view>
				<view @click="toOrderList('mobile', 2)" class="num_p_show">
					<view class="num_show">
						{{ cou.ps }}
					</view>
					<view>
						<image src="/static/order-yiwanc.png" style="width: 45rpx;height: 45rpx;" mode=""></image>
					</view>
					<view style="margin-top: 10rpx;font-weight: 400;font-size: 24rpx;color: #9C9EA8;">已完成</view>
				</view>
				<view @click="toOrderList('mobile', 3)" class="num_p_show">
					<view class="num_show">
						{{ cou.pf }}
					</view>
					<view>
						<image src="/static/order-yiqux.png" style="width: 45rpx;height: 45rpx;" mode=""></image>
					</view>
					<view style="margin-top: 10rpx;font-weight: 400;font-size: 24rpx;color: #9C9EA8;">已取消</view>
				</view>
			</view>
			<view style="margin-top: 66rpx;font-weight: bold;font-size: 32rpx;">电费订单</view>
			<view style="margin-top: 48rpx;display: flex;flex-wrap: wrap;">
				<view @click="toOrderList('electricity', 0)" style="width: 25%;text-align: center;">
					<view>
						<image src="/static/order-quanb.png" style="width: 45rpx;height: 45rpx;" mode=""></image>
					</view>
					<view style="margin-top: 10rpx;font-weight: 400;font-size: 24rpx;color: #9C9EA8;">全部</view>
				</view>
				<view @click="toOrderList('electricity', 1)" class="num_p_show">
					<view class="num_show">
						{{ cou.ei }}
					</view>
					<view>
						<image src="/static/order-chongzz.png" style="width: 45rpx;height: 45rpx;" mode=""></image>
					</view>
					<view style="margin-top: 10rpx;font-weight: 400;font-size: 24rpx;color: #9C9EA8;">充值中</view>
				</view>
				<view @click="toOrderList('electricity', 2)" class="num_p_show">
					<view class="num_show">
						{{ cou.es }}
					</view>
					<view>
						<image src="/static/order-yiwanc.png" style="width: 45rpx;height: 45rpx;" mode=""></image>
					</view>
					<view style="margin-top: 10rpx;font-weight: 400;font-size: 24rpx;color: #9C9EA8;">已完成</view>
				</view>
				<view @click="toOrderList('electricity', 3)" class="num_p_show">
					<view class="num_show">
						{{ cou.ef }}
					</view>
					<view>
						<image src="/static/order-yiqux.png" style="width: 45rpx;height: 45rpx;" mode=""></image>
					</view>
					<view style="margin-top: 10rpx;font-weight: 400;font-size: 24rpx;color: #9C9EA8;">已取消</view>
				</view>
			</view>
		</view>
		<nav-bar :nav-index="1" />
	</view>
</template>

<script>
	import NavBar from '@/components/navBar.vue'; // 引入组件
	export default {
		components: {
			NavBar // 注册组件
		},
		data() {
			return {
				userInfo: {},
				cou: {}
			};
		},
		onLoad() {
			this.getInfo()

			// 列表
			this.getSum()
		},
		// onShow() {
		// 	this.getInfo()
		// },
		methods: {
			getInfo() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.$request('get', 'api/index/getUserInfo').then(res => {
					uni.hideLoading()
					if (res.code) {
						this.userInfo = res.data.info
					}
				})
			},
			getSum() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.$request('get', 'api/consumeRecharge/everyCount').then(res => {
					uni.hideLoading()
					if (res.code) {
						this.cou = res.data
					}
				})
			},
			login() {
				if (this.userInfo.id) {
					uni.navigateTo({
						url: '/pages/my/my-info'
					})
				} else {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
			},
			toOrderList(type, index) {
				uni.navigateTo({
					url: '/pages/order/list?type=' + type + '&index=' + index
				})
			}
		}
	}
</script>

<style lang="scss">
	.num_p_show {
		width: 25%;
		text-align: center;
		position: relative;
	}

	.num_show {
		position: absolute;
		top: -30rpx;
		right: 32rpx;
		width: 40rpx;
		height: 40rpx;
		border-radius: 100%;
		background-color: red;
		font-weight: bold;
		font-size: 22rpx;
		color: #FFFFFF;
		text-align: center;
		line-height: 40rpx;
	}
</style>