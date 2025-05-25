<template>
	<view style="width: 100%;">
		<!-- <view style="padding: 30rpx;background-color: white;">
			<view style="padding: 20rpx;display: flex;align-items: center;background-color: #F6F7F9;border-radius: 24rpx;">
				<view style="margin-left: 10rpx;">
					<image src="/static/order-sous.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
				</view>
				<view style="width: 100%;margin-left: 16rpx;">
					<input type="text" style="width: 100%;" placeholder="搜索交易记录" placeholder-style="font-weight: 500;font-size: 26rpx;color: #757B8C;" />
				</view>
			</view>
		</view> -->
		<view style="padding: 30rpx;">
			<view style="display: flex;">
				<view @click="changeTab(-1)" style="width: 112rpx;height: 60rpx;background: #FFFFFF;border-radius: 30rpx;font-weight: bold;font-size: 26rpx;
					text-align: center;line-height: 60rpx;margin-right: 20rpx;" :style="{color: activeTab == -1 ? '#3742C5' : ''}">全部
				</view>
				<view @click="changeTab(1)" style="width: 112rpx;height: 60rpx;background: #FFFFFF;border-radius: 30rpx;font-weight: bold;font-size: 26rpx;
					color: #333333;text-align: center;line-height: 60rpx;margin-right: 20rpx;"
					:style="{color: activeTab == 1 ? '#3742C5' : ''}">话费</view>
				<view @click="changeTab(2)" style="width: 112rpx;height: 60rpx;background: #FFFFFF;border-radius: 30rpx;font-weight: bold;font-size: 26rpx;
					color: #333333;text-align: center;line-height: 60rpx;margin-right: 20rpx;"
					:style="{color: activeTab == 2 ? '#3742C5' : ''}">电费</view>
				<view @click="changeTab(3)" style="width: 112rpx;height: 60rpx;background: #FFFFFF;border-radius: 30rpx;font-weight: bold;font-size: 26rpx;
					color: #333333;text-align: center;line-height: 60rpx;margin-right: 20rpx;"
					:style="{color: activeTab == 3 ? '#3742C5' : ''}">返佣</view>
				<view @click="changeTab(4)" style="width: 112rpx;height: 60rpx;background: #FFFFFF;border-radius: 30rpx;font-weight: bold;font-size: 26rpx;
					color: #333333;text-align: center;line-height: 60rpx;" :style="{color: activeTab == 4 ? '#3742C5' : ''}">查询</view>
			</view>
			<view style="margin-top: 30rpx;background: #FFFFFF;border-radius: 32rpx;">
				<view style="padding: 32rpx;">
					<view style="display: flex;align-items: center;justify-content: space-between;">
						<view @click="dateShow = true" style="display: flex;align-items: center;margin-top: 5rpx;">
							<view style="font-weight: bold;font-size: 28rpx;">{{dateStr ? dateStr : '今日'}}</view>
							<view style="margin-left: 20rpx;margin-top: -15rpx;">
								<image src="/static/qb-xial.png" style="width: 16rpx;height: 11rpx;" mode=""></image>
							</view>
						</view>
						<view style="display: flex;">
							<view @click="changeTab2(1)" style="width: 100rpx;height: 40rpx;border-radius: 24rpx;font-weight: 400;font-size: 24rpx;
								text-align: center;line-height: 40rpx;margin-right: 20rpx;"
								:style="{color: activeTab2 == 1 ? '#3742C5' : '#B7BAC7', border: activeTab2 == 1 ? '2rpx solid #3742C5' : '2rpx solid rgba(183,186,199,0.45)'}">
								近七天</view>
							<view @click="changeTab2(2)" style="width: 100rpx;height: 40rpx;border-radius: 24rpx;font-weight: 400;font-size: 24rpx;
								text-align: center;line-height: 40rpx;margin-right: 20rpx;"
								:style="{color: activeTab2 == 2 ? '#3742C5' : '#B7BAC7', border: activeTab2 == 2 ? '2rpx solid #3742C5' : '2rpx solid rgba(183,186,199,0.45)'}">
								近半月</view>
							<view @click="changeTab2(3)" style="width: 100rpx;height: 40rpx;border-radius: 24rpx;font-weight: 400;font-size: 24rpx;
								text-align: center;line-height: 40rpx;margin-right: 20rpx;"
								:style="{color: activeTab2 == 3 ? '#3742C5' : '#B7BAC7', border: activeTab2 == 3 ? '2rpx solid #3742C5' : '2rpx solid rgba(183,186,199,0.45)'}">
								近一月</view>
						</view>
					</view>

					<view style="display: flex;margin-top: 22rpx;margin-bottom: 5rpx;">
						<view style="font-weight: 400;font-size: 24rpx;">支出 Y币 {{zhichu}}</view>
						<view style="font-weight: 400;font-size: 24rpx;margin-left: 42rpx;">收入 Y币 {{shouru}}</view>
					</view>
				</view>
				<view style="height: 1rpx;background-color: #F4F4F4;width: 100%;"></view>

				<!-- 列表 -->
				<view style="padding: 30rpx;">
					<view v-for="(item, index) in list" :key="index"
						style="margin-top: 20rpx;display: flex;margin-bottom: 40rpx;">
						<view style="display: flex;width: 100%;">
							<view>
								<image src="/static/order-huaf.png" style="width: 90rpx;height: 90rpx;" mode=""></image>
							</view>
							<view style="margin-left: 18rpx;width: 100%;">
								<view style="display: flex;justify-content: space-between;">
									<view style="font-weight: bold;font-size: 25rpx;">{{item.desc}}</view>
									<view style="font-weight: bold;font-size: 25rpx;color: #EB8E26;">
										<span v-if="item.change_type == 2">-</span>
										<span v-if="item.change_type == 1">+</span>
										{{item.change_money}} Y币
									</view>
								</view>
								<view style="display: flex;justify-content: space-between;">
									<view style="margin-top: 14rpx;font-weight: 400;font-size: 24rpx;color: #A9ABB6;">
										{{item.create_time}}
									</view>
									<view style="font-weight: 400;font-size: 24rpx;color: #3742C5;">
										<view v-if="item.type == 13 && item.change_type == 2">
											冻结资产余额<br />
											{{item.changed_money}} Y币
										</view>
										<view v-else>余额 {{item.changed_money}} Y币</view>
									</view>
								</view>
							</view>
						</view>
					</view>

					<!-- 加载更多 -->
					<u-loadmore v-if="list.length != 0" :status="load_status" @loadmore="loadMoreData"
						style="margin-top: 35rpx;"></u-loadmore>
				</view>
			</view>
		</view>

		<u-datetime-picker :show="dateShow" @cancel="dateShow = false" @close="dateShow = false" @confirm="dateConfirm"
			v-model="date" mode="date"></u-datetime-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeTab: -1,
				activeTab2: 0,
				date: Number(new Date()),
				dateStr: '',
				dateShow: false,
				list: [],
				shouru: '',
				zhichu: '',
				last_id: '',
				load_status: 'loadmore',
			};
		},
		onLoad() {
			this.dateStr = this.timestampToDate(this.date)
			this.getList()
		},
		onReady() {
			// 微信小程序需要用此写法
			this.dateStr = this.timestampToDate(this.date)
		},
		methods: {
			getList(loadMore = false) {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.$request('get', 'api/index/getMoneyLogList', {
					type: this.activeTab,
					date_type: this.activeTab2,
					date: this.dateStr,
					last_id: this.last_id
				}).then(res => {
					uni.hideLoading()
					if (res.code) {
						if (res.data.list.length == 0) {
							this.last_id = ''
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
						
						this.shouru = res.data.shouru
						this.zhichu = res.data.zhichu
					}
				})
			},
			loadMoreData() {
				this.load_status = 'loading';
				this.getList(true)
			},
			timestampToDate(timestamp) {
				const date = new Date(timestamp); // 如果是秒级时间戳需要乘以1000
				const year = date.getFullYear();
				const month = String(date.getMonth() + 1).padStart(2, '0');
				const day = String(date.getDate()).padStart(2, '0');

				return `${year}-${month}-${day}`;
			},
			dateConfirm(e) {
				this.date = e.value
				this.dateStr = this.timestampToDate(this.date)
				this.dateShow = false
				this.activeTab2 = 0
				this.last_id = ''
				this.load_status = 'loadmore'
				this.list = []
				this.getList()
				// console.log(e)
			},
			changeTab2(e) {
				this.activeTab2 = e
				this.last_id = ''
				this.load_status = 'loadmore'
				this.list = []
				this.getList()
			},
			changeTab(e) {
				this.activeTab = e
				this.last_id = ''
				this.load_status = 'loadmore'
				this.list = []
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