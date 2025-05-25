<template>
	<view style="padding: 30rpx;">
		<view style="display: flex;align-items: center;">
			<view @click="changeType(1)" style="font-size: 32rpx;"
				:style="{fontWeight: type == 1 ? 'bold' : '400', color: type == 1 ? '#000000' : '#757B8C'}">话费记录</view>
			<view @click="changeType(2)" style="font-size: 32rpx;margin-left: 72rpx;"
				:style="{fontWeight: type == 2 ? 'bold' : '400', color: type == 2 ? '#000000' : '#757B8C'}">电费记录</view>
		</view>
		<view
			style="margin-top: 32rpx;margin-bottom: 200rpx;box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);border-radius: 32rpx;padding: 30rpx;">
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

			<u-loadmore v-if="type == 1" :status="phone_load_status" @loadmore="loadMoreData"></u-loadmore>
			<u-loadmore v-else :status="ele_load_status" @loadmore="loadMoreData"></u-loadmore>
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
				phone_load_status: 'loadmore',
				ele_load_status: 'loadmore',
				phone_last_id: '',
				ele_last_id: ''
			};
		},
		onLoad() {
			this.getList()
		},
		methods: {
			changeType(e) {
				this.type = e
				if (this.type == 1) {
					if (this.phone_find) {
						this.cur_list = this.phone_list
					} else {
						this.getList()
					}
				} else {
					if (this.ele_find) {
						this.cur_list = this.ele_list
					} else {
						this.getList()
					}
				}
			},
			getList(loadMore = false) {
				uni.showLoading({
					title: '加载中',
					mask: true
				})

				this.$request('get', 'api/ConsumeQuery/history', {
					type: this.type,
					last_id: this.type == 1 ? this.phone_last_id : this.ele_last_id
				}).then(res => {
					uni.hideLoading()
					if (res.code) {
						if (this.type == 1) {
							if (res.data.list.length == 0) {
								this.phone_load_status = 'nomore'
								return
							}
							
							this.phone_find = true
							this.phone_last_id = res.data.last_id
							this.phone_load_status = res.data.last_id != '' ? 'loadmore' : 'nomore'
							
							if (!loadMore) {
								this.phone_list = res.data.list
							} else {
								for (const tmp of res.data.list) {
									this.phone_list.push(tmp)
								}
							}
							
							this.cur_list = this.phone_list
							
						} else {
							if (res.data.list.length == 0) {
								this.ele_load_status = 'nomore'
								return
							}
							
							this.ele_find = true
							this.ele_last_id = res.data.last_id
							this.ele_load_status = res.data.last_id != '' ? 'loadmore' : 'nomore'
							
							if (!loadMore) {
								this.ele_list = res.data.list
							} else {
								for (const tmp of res.data.list) {
									this.ele_list.push(tmp)
								}
							}
							
							this.cur_list = this.ele_list
						}

					}
				})
			},
			loadMoreData() {
				this.load_status = 'loading';
				this.getList(true)
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