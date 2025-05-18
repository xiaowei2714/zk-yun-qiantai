<template>
	<view style="padding: 30rpx;">
		<view style="display: flex;align-items: center;">
			<view @click="changeType(1)" style="font-size: 32rpx;"
				:style="{fontWeight: type == 1 ? 'bold' : '400', color: type == 1 ? '#000000' : '#757B8C'}">话费记录</view>
			<view @click="changeType(2)" style="font-size: 32rpx;margin-left: 72rpx;"
				:style="{fontWeight: type == 2 ? 'bold' : '400', color: type == 2 ? '#000000' : '#757B8C'}">电费记录</view>
		</view>
		<view
			style="margin-top: 32rpx;box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);border-radius: 32rpx;padding: 30rpx;">
			<view v-for="(item, index) in cur_list" :key="index" class="row_f">
				<view class="row_f_a">
					{{ item.account }} {{ item.type }}
					<span class="row_f_b">{{ item.balance }}</span>
				</view>
				<view @click="goHistory(item.account)" class="row_f_c">
					<view class="row_f_d">历史记录</view>
					<view class="row_f_e">
						<image src="/static/info-right.png" class="row_f_f" mode=""></image>
					</view>
				</view>
			</view>
		</view>

		<nav-bar :nav-index="2" />
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
				type: 1,
				cur_list: [],
				phone_find: false,
				phone_list: [],
				ele_find: false,
				ele_list: [],
			};
		},
		onLoad() {
			this.getList()
		},
		methods: {
			changeType(e) {
				this.type = e
				this.getList()
			},
			getList() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				if (this.type == 1) {
					if (this.phone_find) {
						this.cur_list = this.phone_list
						uni.hideLoading()
						return
					}
				} else {
					if (this.ele_find) {
						this.cur_list = this.ele_list
						uni.hideLoading()
						return
					}
				}

				this.$request('get', 'api/ConsumeQuery/history', {
					type: this.type
				}).then(res => {
					uni.hideLoading()
					if (res.code) {
						if (this.type == 1) {
							this.phone_find = true
							this.phone_list = res.data.list
						} else {
							this.ele_find = true
							this.ele_list = res.data.list
						}

						this.cur_list = res.data.list
					}
				})
			},
			goHistory(value) {
				if (this.type == 1) {
					uni.navigateTo({
						url: '/pages/query/hf-query?account=' + value
					})
				} else {
					uni.navigateTo({
						url: '/pages/query/df-query?account=' + value
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.row_f {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 52rpx;
	}

	.row_f_a {
		font-weight: 400;
		font-size: 28rpx;
		color: #757B8C;
	}

	.row_f_b {
		color: black;
		margin-left: 10rpx;
	}

	.row_f_c {
		display: flex;
		align-items: center;
	}

	.row_f_d {
		font-weight: bold;
		font-size: 24rpx;
		color: #3742C5;
	}

	.row_f_e {
		margin-left: 10rpx;
	}

	.row_f_f {
		width: 10rpx;
		height: 18rpx;
	}
</style>