<template>
	<view style="padding: 30rpx;">
		<view style="padding: 30rpx;display: flex;justify-content: space-between;align-items: center;border-bottom: 1rpx solid #F5F5F8;">
			<view style="">
				<view style="font-weight: bold;font-size: 30rpx;">消息通知</view>
				<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">订单状态变更等重要通知</view>
			</view>
			<view style="font-weight: 400;font-size: 30rpx;color: #A9ABB6;">{{order_success_notice == 1 || order_fail_notice == 1 ? '已开启' : '未开启'}}</view>
		</view>
		<view style="padding: 30rpx;display: flex;justify-content: space-between;align-items: center;border-bottom: 1rpx solid #F5F5F8;">
			<view style="">
				<view style="font-weight: bold;font-size: 30rpx;">订单充值成功通知</view>
			</view>
			<view style="">
				<u-switch v-model="order_success_notice" activeColor="#3742C5" inactiveColor="#D9D9D9" @change="changeOne"></u-switch>
			</view>
		</view>
		<view style="padding: 30rpx;display: flex;justify-content: space-between;align-items: center;">
			<view style="">
				<view style="font-weight: bold;font-size: 30rpx;">订单充值失败通知</view>
			</view>
			<view style="">
				<u-switch v-model="order_fail_notice" activeColor="#3742C5" inactiveColor="#D9D9D9" @change="changeTwo"></u-switch>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				order_success_notice: false,
				order_fail_notice: false
			};
		},
		onLoad() {
			this.getInfo()
		},
		methods: {
			getInfo() {
				uni.showLoading({
					title:'加载中',
					mask:true
				})
				this.$request('get','api/index/getEmailStatus').then(res => {
					uni.hideLoading()
					if (res.code) {
						this.order_success_notice = res.data.order_success_notice == 1 ? true : false
						this.order_fail_notice = res.data.order_fail_notice == 1 ? true : false
					}
				})
			},
			changeOne(e) {
				uni.showLoading({
					title:'设置中',
					mask:true
				})
				this.$request('post','api/index/changeEmailStatus',{type: 'order_success_notice',value: e}).then(res=>{
					uni.hideLoading()
					if (res.code) {
						uni.$u.toast('设置成功')
					} else {
						uni.$u.toast(res.msg)
					}
				})
			},
			changeTwo(e) {
				uni.showLoading({
					title:'设置中',
					mask:true
				})
				this.$request('post','api/index/changeEmailStatus',{type: 'order_fail_notice',value: e}).then(res=>{
					uni.hideLoading()
					if (res.code) {
						uni.$u.toast('设置成功')
					} else {
						uni.$u.toast(res.msg)
					}
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
