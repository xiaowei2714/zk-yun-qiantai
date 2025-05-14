<template>
	<view style="width: 100%;">
		<view style="height: 20rpx;background-color: white;"></view>
		<view>
			<v-tabs v-model="activeTab" :lineScale="0.25" height="80rpx" activeColor="#3742C5" lineColor="#3742C5"
				:scroll="false" :tabs="['直邀好友', '间接好友', '三级好友']" @change="changeTab"></v-tabs>
		</view>
		<view style="padding: 25rpx;display: flex;justify-content: space-between;font-size: 24rpx;color: #A9ABB6;">
			<view>
				<span v-if="activeTab == 0">直邀好友</span>
				<span v-if="activeTab == 1">间接好友</span>
				<span v-if="activeTab == 2">三级好友</span>
				<span style="color: #EB8E26;">{{list.length}}</span>人
			</view>
			<view style="display: flex;">
				<view>今日收益 <span style="color: black;margin-left: 10rpx;">{{todayTotal ? todayTotal : '0.00'}}Y币</span></view>
				<view style="margin-left: 20rpx;">总收益 <span style="color: black;margin-left: 10rpx;">{{total ? total : '0.00'}}Y币</span></view>
			</view>
		</view>
		<view style="margin-bottom: 20rpx;padding: 30rpx;display: flex;justify-content: space-between;background-color: white;" v-for="(item, index) in list" :key="index">
			<view style="display: flex;">
				<view style="width: 76rpx;height: 76rpx;">
					<image :src="item.avatar" style="width: 100%;height: 100%;border-radius: 100rpx;" mode=""></image>
				</view>
				<view style="margin-left: 20rpx;">
					<view style="font-weight: bold;font-size: 28rpx;">{{item.nickname}}</view>
					<view style="font-weight: 500;font-size: 24rpx;color: #A9ABB6;margin-top: 10rpx;">{{item.create_time}}</view>
				</view>
			</view>
			<view style="display: flex;justify-content: space-around;">
				<view style="text-align: center;">
					<view style="font-weight: 500;font-size: 24rpx;color: #A9ABB6;">今日收益</view>
					<view style="font-weight: 500;font-size: 24rpx;color: #3742C5;margin-top: 10rpx;">{{item.xjTodayTotal}}</view>
				</view>
				<view style="text-align: center;margin-left: 45rpx;margin-right: 45rpx;">
					<view style="font-weight: 500;font-size: 24rpx;color: #A9ABB6;">总收益</view>
					<view style="font-weight: 500;font-size: 24rpx;color: #3742C5;margin-top: 10rpx;">{{item.xjTotal}}</view>
				</view>
				<view style="text-align: center;">
					<view style="font-weight: 500;font-size: 24rpx;color: #A9ABB6;">折扣</view>
					<view style="font-weight: 500;font-size: 24rpx;color: #EB8E26;margin-top: 10rpx;">设置</view>
				</view>
			</view>
		</view>
		<view v-if="list.length == 0" style="margin-top: 100rpx;">
			<u-empty mode="list" />
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeTab: 0,
				list: [],
				todayTotal: '',
				total: ''
			};
		},
		onLoad(options) {
			if (options.type) {
				this.activeTab = parseInt(options.type)
			}
			this.getList()
		},
		methods: {
			getList() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.$request('get', 'api/index/getFriendList',{type: this.activeTab}).then(res => {
					uni.hideLoading()
					if (res.code) {
						this.list = res.data.list
						this.todayTotal = res.data.todayTotal
						this.total = res.data.total
					}
				})
			},
			changeTab(e) {
				this.activeTab = e
				this.getList()
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F8F8F8;
	}
</style>