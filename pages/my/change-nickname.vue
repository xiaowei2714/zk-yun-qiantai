<template>
	<view style="padding: 30rpx;">
		<view style="padding: 30rpx;background-color: white;border-radius: 32rpx;display: flex;justify-content: space-between;align-items: center;">
			<view style="font-weight: 400;font-size: 30rpx;">
				<input type="text" v-model="nickname" placeholder="请输入昵称" placeholder-style="font-weight: 400;font-size: 30rpx;" />
			</view>
			<view @click="delNickname">
				<image src="/static/change-close.png" style="width: 33rpx;height: 33rpx;" mode=""></image>
			</view>
		</view>
		
		<view style="position: fixed;bottom: 80rpx;left: 0;width: 100%;">
			<view style="padding: 30rpx;display: flex;justify-content: center;">
				<view @click="submit" style="width: 100%;height: 80rpx;background: #3742C5;border-radius: 32rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;text-align: center;
					line-height: 80rpx;">保存</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickname: '',
			};
		},
		onLoad(options) {
			this.nickname = options.nickname
		},
		methods: {
			submit() {
				if (!this.nickname) return uni.$u.toast('请输入新的昵称')
				uni.showLoading({
					title:'保存中',
					mask:true
				})
				this.$request('post', 'api/index/changeNickname',{
					nickname: this.nickname
				}).then(res => {
					if (res.code) {
						uni.$u.toast('保存成功')
					} else {
						uni.$u.toast(res.msg)
					}
				})
			},
			delNickname() {
				this.nickname = ''
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F8F8F8;
	}
</style>
