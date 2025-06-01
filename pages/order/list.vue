<template>
	<view style="width: 100%;">
		<view style="background-color: white;padding-left: 30rpx;padding-right: 30rpx;">
			<view
				style="width: 100%;height: 70rpx;background: #F6F7F9;border-radius: 24rpx;display: flex;align-items: center;">
				<view style="margin-left: 30rpx;">
					<image src="/static/order-sous.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
				</view>
				<view style="margin-left: 15rpx;width: 100%;">
					<input @confirm="searchData" v-model="search" type="text" style="width: 100%;"
						placeholder="请输入卡号/订单号" placeholder-style="font-weight: 500;font-size: 26rpx;color: #757B8C;" />
				</view>
			</view>
			<view style="height: 10rpx;width: 1rpx;"></view>
			<view>
				<v-tabs v-model="activeTab" :lineScale="0.25" height="80rpx" activeColor="#3742C5" lineColor="#3742C5"
					:scroll="false" :tabs="['全部', '充值中', '已完成', '已失败']" @change="changeTab"></v-tabs>
			</view>
		</view>
		<view style="padding: 30rpx;padding-bottom: 30rpx;">
			<view v-for="(item, index) in list" :key="index" style="padding-bottom: 30rpx;">
				<view style="height: 442rpx;background: #FFFFFF;border-radius: 32rpx;position: relative;">
					<view v-if="item.status == 1" class="status_show">待充值</view>
					<view v-else-if="item.status == 2" class="status_show status_recharging">充值中</view>
					<view v-else-if="item.status == 3" class="status_show status_success">已完成</view>
					<view v-else-if="item.status == 4" class="status_show status_fail">已失败</view>
					<view style="padding-top: 24rpx;margin-left: 34rpx;">
						<view style="display: flex;">
							<view style="font-weight: bold;font-size: 28rpx;">订单：{{ item.sn }}</view>
							<view v-if="item.type == 1 || item.type == 2" class="type_show">
								{{ nameShow(item.type) }}
							</view>
							<view v-if="item.type == 3" class="type_show type_quickly_show">
								{{ nameShow(item.type) }}
							</view>
							<view v-if="item.type == 4" class="type_show type_card_show">{{ nameShow(item.type) }}
							</view>
						</view>
						<view style="margin-top: 10rpx;font-weight: 500;font-size: 24rpx;color: #A9ABB6;">
							{{ item.time }}
						</view>
					</view>
					<view style="width: 100%;opacity: 0.1;margin-top: 20rpx;height: 1rpx;background-color: #707070;">
					</view>
					<view style="margin-left: 34rpx;margin-top: 20rpx;margin-right: 32rpx;">
						<view style="display: flex;justify-content: space-between;">
							<view style="display: flex;align-items: center;">
								<view>
									<image v-if="item.type == 1 || item.type == 3" src="/static/order-huaf.png"
										style="width: 72rpx;height: 72rpx;" mode="">
									</image>
									<image v-if="item.type == 2" src="/static/qb-dfmx.png"
										style="width: 72rpx;height: 72rpx;" mode="">
									</image>
									<image v-if="item.type == 4" src="/static/lpk.png"
										style="width: 72rpx;height: 72rpx;" mode="">
									</image>
								</view>
								<view class="account_show">
									{{ item.account }}
									<span v-if="item.account_name != ''"
										class="account_type_show">({{ item.account_name }})</span>
								</view>
							</view>
							<view class="pay_price_show">
								￥{{ item.pay_price }}
							</view>
						</view>
						<view style="margin-top: 26rpx;display: flex;justify-content: space-between;">
							<view style="text-align: center;">
								<view style="font-weight: bold;font-size: 24rpx;">{{ item.price }}元</view>
								<view style="margin-top: 5rpx;font-weight: 400;font-size: 24rpx;color: #A9ABB6;">充值
								</view>
							</view>
							<view style="text-align: center;">
								<view style="font-weight: bold;font-size: 24rpx;">{{ item.balances_price }}元</view>
								<view style="margin-top: 5rpx;font-weight: 400;font-size: 24rpx;color: #A9ABB6;">已充
								</view>
							</view>
							<view style="text-align: center;">
								<view style="font-weight: bold;font-size: 24rpx;">{{ item.up_price }}元</view>
								<view style="margin-top: 5rpx;font-weight: 400;font-size: 24rpx;color: #A9ABB6;">初始
								</view>
							</view>
							<view style="text-align: center;">
								<view style="font-weight: bold;font-size: 24rpx;">{{ item.down_price }}元</view>
								<view style="margin-top: 5rpx;font-weight: 400;font-size: 24rpx;color: #A9ABB6;">当前
								</view>
							</view>
						</view>
						<view
							style="width: 100%;opacity: 0.1;margin-top: 22rpx;height: 1rpx;background-color: #707070;">
						</view>
						<view
							style="display: flex;justify-content: space-between;align-items: center;margin-top: 18rpx;">
							<view @click="detail(item.id)" style="font-weight: 400;font-size: 28rpx;color: #3742C5;">更多
							</view>
							<view style="display: flex;">
								<view v-if="item.status == 1" @click="cancelOrder(item.id)" class="cancel_order">
									取消订单
								</view>
								<view v-if="not_card && item.status != 4" @click="genBalance(item.id)"
									class="gen_balance">更新余额
								</view>
								<view @click="detail(item.id)" class="go_detail">查看详情</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<u-loadmore :status="load_status" @loadmore="loadMoreData"></u-loadmore>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 0,
				list: [],
				activeTab: 0,
				search: '',
				query_p: '',
				query_e: '',
				not_card: true,
				last_id: '',
				load_status: 'loadmore',
			};
		},
		onLoad(options) {
			if (options.type == 'oil') {
				uni.setNavigationBarTitle({
					title: '油卡订单'
				})
			} else if (options.type == 'electricity') {
				uni.setNavigationBarTitle({
					title: '电费订单'
				})
			} else if (options.type == 'mobile') {
				uni.setNavigationBarTitle({
					title: '话费订单'
				})
			} else if (options.type == 'quickly') {
				uni.setNavigationBarTitle({
					title: '话费快充订单'
				})
			} else if (options.type == 'card') {
				uni.setNavigationBarTitle({
					title: '礼品卡订单'
				})

				this.not_card = false
			}

			let newActiveTab = Number(options.index)

			this.activeTab = newActiveTab
			this.type = options.type

			// 列表
			this.getList()
		},
		methods: {
			getList(loadMore = false) {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.$request('get', 'api/consumeRecharge/list', {
					type: this.type,
					status: this.activeTab,
					search: this.search,
					last_id: this.last_id
				}).then(res => {
					uni.hideLoading()
					if (res.code) {
						if (res.data.list.length == 0) {
							this.load_status = 'nomore'
							return
						}

						this.query_p = res.data.query_p
						this.query_e = res.data.query_e
						this.last_id = res.data.last_id
						this.load_status = res.data.last_id != '' ? 'loadmore' : 'nomore'

						if (!loadMore) {
							this.list = res.data.list
						} else {
							for (const tmp of res.data.list) {
								this.list.push(tmp)
							}
						}
					}
				})
			},
			loadMoreData() {
				this.getList(true)
			},
			searchData() {
				this.list = []
				this.last_id = ''
				this.getList()
			},
			nameShow(value) {
				switch (value) {
					case 1:
						return '话费'

					case 2:
						return '电费'

					case 3:
						return '话费快充'

					case 4:
						return '礼品卡'

					default:
						return ''
				}
			},
			detail(id) {
				uni.navigateTo({
					url: '/pages/order/detail?id=' + id
				})
			},
			changeTab(e) {
				this.list = []
				this.last_id = ''
				this.activeTab = e
				this.getList()
			},
			cancelOrder(id) {
				const obj = this
				uni.showModal({
					title: '提示',
					content: '确认要取消充值吗？',
					showCancel: true, // 显示取消按钮
					cancelText: '取消',
					confirmText: '确定',
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
								title: '取消中',
								mask: true
							})
							obj.$request('post', 'api/consumeRecharge/cancelRecharge', {
								id: id
							}).then(res => {
								uni.hideLoading()
								if (res.code) {
									this.list = []
									this.last_id = ''
									obj.getList()
									uni.$u.toast(res.msg)
								} else {
									this.list = []
									this.last_id = ''
									obj.getList()
									uni.$u.toast(res.msg)
								}
							})
						} else if (res.cancel) {
							// 用户点击了取消按钮
							// console.log('用户点击了取消');
							// 可以在这里执行其他逻辑，比如不进行删除操作等
						}
					}
				});
			},
			genBalance(id) {
				let price = this.query_p
				if (this.type == 'electricity') {
					price = this.query_e
				}

				if (price === '') {
					uni.$u.toast('未设置更新余额功能，请联系客服')
					return
				}

				const obj = this
				uni.showModal({
					title: '提示',
					content: '需要花费' + price + 'Y币，确定要更新余额吗？',
					showCancel: true, // 显示取消按钮
					cancelText: '取消',
					confirmText: '确定',
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
								title: '更新中',
								mask: true
							})
							obj.$request('post', 'api/consumeRecharge/genBalance', {
								id: id
							}).then(res => {
								uni.hideLoading()
								if (res.code) {
									obj.getList()
									uni.$u.toast(res.msg)
								} else {
									uni.$u.toast(res.msg)
								}
							})
						} else if (res.cancel) {
							// 用户点击了取消按钮
							// console.log('用户点击了取消');
							// 可以在这里执行其他逻辑，比如不进行删除操作等
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F8F8F8;
	}

	.status_show {
		position: absolute;
		top: 0;
		right: 0;
		width: 132rpx;
		height: 58rpx;
		background: #5B87F0;
		border-radius: 0rpx 32rpx 0rpx 32rpx;
		text-align: center;
		font-weight: 500;
		font-size: 28rpx;
		color: #FFFFFF;
		line-height: 58rpx;
	}

	.status_recharging {
		background: #EB8E26;
	}

	.status_success {
		background: #7EC050;
	}

	.status_fail {
		background: #E47470;
	}

	.type_show {
		width: 68rpx;
		height: 38rpx;
		background: #3742C5;
		border-radius: 18rpx 18rpx 18rpx 0rpx;
		font-weight: 400;
		font-size: 24rpx;
		color: #FFFFFF;
		line-height: 38rpx;
		text-align: center;
		margin-left: 20rpx;
	}

	.type_quickly_show {
		width: 136rpx;
	}

	.type_card_show {
		width: 102rpx;
	}

	.account_show {
		margin-left: 14rpx;
		font-weight: 400;
		font-size: 30rpx;
		color: #000000;
		font-weight: bold;
		margin-top: -20rpx;
	}

	.account_type_show {
		font-weight: 400;
		font-size: 28rpx;
		color: #3742C5;
		margin-left: 10rpx;
	}

	.pay_price_show {
		font-weight: bold;
		font-size: 30rpx;
		color: #EB8E26;
		margin-top: 12rpx;
	}

	.cancel_order {
		width: 156rpx;
		height: 64rpx;
		background: #FAFAFA;
		border-radius: 32rpx;
		font-weight: 400;
		font-size: 28rpx;
		text-align: center;
		line-height: 64rpx;
	}

	.gen_balance {
		width: 156rpx;
		height: 64rpx;
		background: #FAFAFA;
		border-radius: 32rpx;
		font-weight: 400;
		font-size: 28rpx;
		text-align: center;
		line-height: 64rpx;
		margin-left: 14rpx;
	}

	.go_detail {
		width: 156rpx;
		height: 64rpx;
		background: #FAFAFA;
		border-radius: 32rpx;
		font-weight: 400;
		font-size: 28rpx;
		text-align: center;
		line-height: 64rpx;
		margin-left: 14rpx;
	}
</style>