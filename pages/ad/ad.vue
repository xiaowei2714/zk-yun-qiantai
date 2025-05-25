<template>
	<view>
		<u-navbar title="我的广告" @rightClick="rightClick" :autoBack="true">
			<view slot="right" style="font-weight: 400;font-size: 28rpx;color: #3742C5;">
				<u-icon name="plus" color="#3742C5" size="18"></u-icon>
			</view>
		</u-navbar>
		<view style="padding: 30rpx;margin-top: 80rpx;">

			<view style="margin-bottom: 200rpx;">

				<!-- 列表展示 -->
				<view v-for="(item, index) in list" :key="index"
					style="padding: 30rpx;box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);border-radius: 32rpx;margin-top: 38rpx;">
					<view style="display: flex;justify-content: space-between;align-items: center;">
						<view style="display: flex;align-items: center;">
							<view style="width: 44rpx;height: 44rpx;background: #464D57;border-radius: 28rpx;text-align: center;line-height: 44rpx;color: white;
							font-weight: bold;font-size: 26rpx;">{{item.first_nickname}}</view>
							<view style="font-weight: bold;font-size: 28rpx;margin-left: 10rpx;">{{item.nickname}}
							</view>
							<view style="margin-left: 10rpx;margin-top: 5rpx;">
								<image src="/static/jy-v.png" style="width: 28rpx;height: 28rpx;" mode=""></image>
							</view>
						</view>
						<view style="display: flex;align-items: center;">
							<view>
								<image src="/static/ad-sj.png" style="width: 23rpx;height: 23rpx;" mode=""></image>
							</view>
							<view style="margin-left: 10rpx;font-weight: 400;font-size: 24rpx;color: #3742C5;">上架</view>
							<view style="margin-left: 10rpx;">
								<u-switch @change="adStatusChange(item.id)" v-model="item.status_b"
									activeColor="#2EBD85" size="18"></u-switch>
							</view>
						</view>
					</view>
					<view style="display: flex;margin-top: 20rpx;align-items: center;">
						<view style="font-weight: 500;font-size: 24rpx;color: #A9ABB6;">成单量 {{ item.s_count }}</view>
						<view
							style="width: 1rpx;height: 20rpx;background-color: #E0E1E5;margin-left: 20rpx;margin-right: 20rpx;">
						</view>
						<view style="font-weight: 500;font-size: 24rpx;color: #A9ABB6;">成单率 {{ item.rate }}%</view>
						<view
							style="width: 1rpx;height: 20rpx;background-color: #E0E1E5;margin-left: 20rpx;margin-right: 20rpx;">
						</view>
						<view v-if="item.type == 1" style="font-weight: 500;font-size: 24rpx;color: #FFCC33;">买入
						</view>
						<view v-else style="font-weight: 500;font-size: 24rpx;color: #800080;">卖出
						</view>
					</view>
					<view style="display: flex;margin-top: 20rpx;align-items: center;">
						<view>
							<image src="/static/jy-time.png" style="width: 21rpx;height: 24rpx;" mode=""></image>
						</view>
						<view style="margin-left: 10rpx;font-weight: 500;font-size: 24rpx;color: #A9ABB6;">
							{{item.pay_time}}分钟
						</view>
					</view>
					<view style="margin-top: 20rpx;display: flex;justify-content: space-between;align-items: center;">
						<view>
							<span style="font-weight: bold;font-size: 28rpx;">￥</span>
							<span style="font-weight: bold;font-size: 44rpx;">{{item.price}}</span>
						</view>
						<view>
							<view v-if="item.pay_type.includes('zfb')"
								style="display: flex;align-items: center;justify-content: flex-end;">
								<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">支付宝</view>
								<view
									style="width: 6rpx;height: 20rpx;background: #06B4FD;border-radius: 4rpx;margin-left: 10rpx;">
								</view>
							</view>
							<view v-if="item.pay_type.includes('yhk')"
								style="display: flex;align-items: center;margin-top: 14rpx;justify-content: flex-end;">
								<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">银行借记卡</view>
								<view
									style="width: 6rpx;height: 20rpx;background: #F3AF55;border-radius: 4rpx;margin-left: 10rpx;">
								</view>
							</view>
							<view v-if="item.pay_type.includes('wx')"
								style="display: flex;align-items: center;margin-top: 14rpx;justify-content: flex-end;">
								<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">微信</view>
								<view
									style="width: 6rpx;height: 20rpx;background: #28C445;border-radius: 4rpx;margin-left: 10rpx;">
								</view>
							</view>
							<view v-if="item.pay_type.includes('usdt')"
								style="display: flex;align-items: center;margin-top: 14rpx;justify-content: flex-end;">
								<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">USDT</view>
								<view
									style="width: 6rpx;height: 20rpx;background: black;border-radius: 4rpx;margin-left: 10rpx;">
								</view>
							</view>
						</view>
					</view>
					<view style="display: flex;justify-content: space-between;align-items: center;margin-top: 30rpx;">
						<view>

							<view style="display: flex;">
								<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">限额</view>
								<view style="margin-left: 26rpx;font-weight: bold;font-size: 24rpx;">CNY
									{{(item.min_price * item.price).toFixed(2)}}-CNY
									{{(item.max_price * item.price).toFixed(2)}}
								</view>
							</view>
							<view style="display: flex;margin-top: 15rpx;">
								<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">可用</view>
								<view style="margin-left: 26rpx;font-weight: bold;font-size: 24rpx;">
									{{item.num.toFixed(2)}}
									Y币</view>
							</view>
						</view>
						<view @click="delAd(item.id)" style="width: 164rpx;height: 64rpx;background: #FCEFF1;border-radius: 24rpx;border: 2rpx solid #F6465D;font-weight: 400;font-size: 28rpx;color: #F6465D;
						text-align: center;line-height: 64rpx;">删除广告</view>
					</view>
				</view>

				<!-- 加载更多 -->
				<u-loadmore v-if="list.length != 0" :status="load_status" @loadmore="loadMoreData"
					style="margin-top: 35rpx;"></u-loadmore>
			</view>

			<!-- 发布广告 -->
			<view v-if="list.length == 0">
				<view style="margin-top: 234rpx;">
					<image src="/static/ad-no.png" style="width: 100%;height: 550rpx;" mode=""></image>
				</view>
				<view style="display: flex;justify-content: center;">
					<view @click="rightClick" style="width: 350rpx;height: 80rpx;background: #3742C5;border-radius: 32rpx;text-align: center;line-height: 80rpx;font-weight: bold;
						font-size: 28rpx;color: #FFFFFF;">发布广告</view>
				</view>
			</view>
		</view>

		<u-popup :show="showDel" mode="center" :round="32">
			<view style="width: 560rpx;background: white;border-radius: 32rpx;">
				<view
					style="height: 78rpx;background: #E3E8FF;border-radius: 32rpx 32rpx 0rpx 0rpx;font-weight: bold;font-size: 30rpx;line-height: 78rpx;text-align: center;">
					温馨提示
				</view>
				<view style="padding: 34rpx;">
					<view style="color: #757B8C;font-size: 28rpx;text-align: center;width: 100%;margin-top: 38rpx;">
						<span>您确定要删除该广告吗？删除后剩余Y币将退回至您的账户余额。</span>
					</view>
					<view style="display: flex;justify-content: space-between;margin-top: 74rpx;">
						<view @click="showDel = false" style="width: 220rpx;height: 80rpx;border-radius: 18rpx;font-weight: bold;font-size: 28rpx;color: #3742C5;text-align: center;
							line-height: 80rpx;border: 2rpx solid #3742C5;">取消</view>
						<view @click="submitDel" style="width: 220rpx;height: 80rpx;background: #3742C5;border-radius: 18rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;text-align: center;
							line-height: 80rpx;">确定</view>
					</view>
				</view>
			</view>
		</u-popup>
		<u-popup :show="showNo" mode="center" :round="32">
			<view style="width: 560rpx;background: white;border-radius: 32rpx;">
				<view
					style="height: 78rpx;background: #E3E8FF;border-radius: 32rpx 32rpx 0rpx 0rpx;font-weight: bold;font-size: 30rpx;line-height: 78rpx;text-align: center;">
					温馨提示
				</view>
				<view style="padding: 34rpx;">
					<view style="color: #757B8C;font-size: 28rpx;text-align: center;width: 100%;margin-top: 38rpx;">
						<span v-if="ad_perm == 1">您还没有发布广告的权限，请联系客服开通</span>
					</view>
					<view style="display: flex;justify-content: space-between;margin-top: 74rpx;">
						<view @click="back" style="width: 220rpx;height: 80rpx;border-radius: 18rpx;font-weight: bold;font-size: 28rpx;color: #3742C5;text-align: center;
							line-height: 80rpx;border: 2rpx solid #3742C5;">返回</view>
						<view @click="kfClick" style="width: 220rpx;height: 80rpx;background: #3742C5;border-radius: 18rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;text-align: center;
							line-height: 80rpx;">联系客服</view>
					</view>
				</view>
			</view>
		</u-popup>
		<nav-bar :nav-index="2" />
	</view>
</template>

<script>
	import NavBar from '@/components/navBar2.vue'; // 引入组件
	export default {
		components: {
			NavBar // 注册组件
		},
		data() {
			return {
				list: [],
				ad_perm: null,
				sj: false,
				showNo: false,
				id: 0,
				showDel: false,
				last_id: '',
				load_status: 'loadmore',
			};
		},
		onShow() {
			this.getList()
		},
		methods: {
			getList(loadMore = false) {
				uni.showLoading({
					title: '加载中',
					mask: true,
				})
				this.$request('get', 'api/ad/mList', {
					last_id: this.last_id
				}).then(res => {
					uni.hideLoading()
					if (res.code) {
						if (res.data.list.length == 0) {
							this.load_status = 'nomore'
							return
						}

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
				this.load_status = 'loading';
				this.getList(true)
			},
			submitDel() {
				uni.showLoading({
					title: '删除中',
					mask: true
				})
				this.$request('post', 'api/ad/del', {
					id: this.id
				}).then(res => {
					uni.hideLoading()
					if (res.code) {
						this.getList()
						uni.$u.toast('删除成功')
						this.showDel = false
					} else {
						uni.$u.toast(res.msg)
					}
				})
			},
			delAd(id) {
				this.id = id
				this.showDel = true
			},
			adStatusChange(id) {
				uni.showLoading({
					title: '切换中',
					mask: true
				})
				this.$request('post', 'api/ad/statusChange', {
					id: id
				}).then(res => {
					uni.hideLoading()
					if (res.code) {
						uni.$u.toast('切换成功')
					} else {
						this.getList()
						uni.$u.toast(res.msg)
					}
				})
			},
			kfClick() {
				uni.navigateTo({
					url: '/pages/my/kf'
				})
			},
			back() {
				this.showNo = false
			},
			rightClick() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.$request('get', 'api/ad/perm').then(res => {
					uni.hideLoading()
					if (res.code) {
						this.ad_perm = res.data.ad_perm
						if (res.data.ad_perm == 1) {
							this.showNo = true
						} else {
							uni.navigateTo({
								url: '/pages/ad/add'
							})
							this.showNo = false
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">

</style>