<template>
	<view style="padding: 30rpx;">
		<view
			style="background: #F6F7F9;border-radius: 32rpx;display: flex;padding: 6rpx;width: 290rpx;justify-content: space-between;">
			<view @click="changeType(1)"
				style="width: 144rpx;height: 68rpx;border-radius: 28rpx;font-weight: 400;font-size: 32rpx;text-align: center;line-height: 68rpx;"
				:style="{background: type == 1 ? '#FFFFFF' : '#F6F7F9',color: type == 1 ? '#000000' : '#A9ABB6',
				boxShadow: type == 1 ? '0rpx 4rpx 30rpx 2rpx rgba(0,0,0,0.08)' : ''}">买入</view>
			<view @click="changeType(2)"
				style="width: 144rpx;height: 68rpx;border-radius: 28rpx;font-weight: 400;font-size: 32rpx;text-align: center;line-height: 68rpx;"
				:style="{background: type == 2 ? '#FFFFFF' : '#F6F7F9',color: type == 2 ? '#000000' : '#A9ABB6',
				boxShadow: type == 2 ? '0rpx 4rpx 30rpx 2rpx rgba(0,0,0,0.08)' : ''}">卖出</view>
		</view>

		<view style="margin-bottom: 200rpx;">
			
			<!-- 列表 -->
			<view v-for="(item, index) in list" :key="index"
				style="box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);padding: 30rpx;border-radius: 32rpx;margin-top: 35rpx;">
				<view style="display: flex;align-items: center;">
					<view style="width: 44rpx;height: 44rpx;background: #464D57;border-radius: 28rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;text-align: center;
					line-height: 44rpx;">{{item.first_nickname}}</view>
					<view style="margin-left: 14rpx;font-weight: bold;font-size: 28rpx;">{{item.nickname}}</view>
					<view style="margin-left: 12rpx;">
						<image src="/static/jy-v.png" style="width: 28rpx;height: 28rpx;" mode=""></image>
					</view>
				</view>
				<view style="display: flex;margin-top: 20rpx;align-items: center;">
					<view style="font-weight: 500;font-size: 24rpx;color: #A9ABB6;">成单量 {{ item.s_cou }}</view>
					<view
						style="width: 1rpx;height: 20rpx;background-color: #E0E1E5;margin-left: 20rpx;margin-right: 20rpx;">
					</view>
					<view style="font-weight: 500;font-size: 24rpx;color: #A9ABB6;">成单率 {{ item.rate }}%</view>
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
							<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">数量</view>
							<view style="margin-left: 26rpx;font-weight: bold;font-size: 24rpx;">{{item.num.toFixed(2)}}
								Y币
							</view>
						</view>
						<view style="display: flex;margin-top: 15rpx;">
							<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">限额</view>
							<view style="margin-left: 26rpx;font-weight: bold;font-size: 24rpx;">CNY
								{{(item.min_price * item.price).toFixed(2)}}-CNY
								{{(item.max_price * item.price).toFixed(2)}}
							</view>
						</view>
					</view>
					<view v-if="item.type == 1" @click="buy(item.id)" style="width: 136rpx;height: 64rpx;background: #2EBD85;border-radius: 32rpx;font-weight: 400;font-size: 28rpx;color: #FFFFFF;
					text-align: center;line-height: 64rpx;">买入</view>
					<view v-else @click="buy(item.id)" style="width: 136rpx;height: 64rpx;background: #F6465D;border-radius: 32rpx;font-weight: 400;font-size: 28rpx;color: #FFFFFF;
					text-align: center;line-height: 64rpx;">卖出</view>
				</view>
			</view>

			<!-- 加载更多 -->
			<u-loadmore v-if="list.length != 0" :status="load_status" @loadmore="loadMoreData"
				style="margin-top: 35rpx;"></u-loadmore>
		</view>
		
		<view v-if="list.length == 0" style="margin-top: 200rpx;">
			<u-empty mode="list" />
		</view>

		<nav-bar :nav-index="0" />
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
				type: 1,
				list: [],
				last_id: '',
				load_status: 'loadmore',
			};
		},
		onLoad() {
			this.getList()
		},
		methods: {
			getList(loadMore = false) {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.$request('get', 'api/ad/list', {
					type: this.type,
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
			buy(id) {
				uni.navigateTo({
					url: '/pages/market/buy?id=' + id
				})
			},
			changeType(e) {
				this.type = e
				this.last_id = ''
				this.load_status = 'loadmore'
				this.list = []
				this.getList()
			}
		}
	}
</script>

<style lang="scss">

</style>