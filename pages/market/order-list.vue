<template>
	<view>
		<view style="padding: 30rpx;display: flex;justify-content: space-between;">
			<view
				style="width: 626rpx;height: 70rpx;background: #F6F7F9;border-radius: 24rpx;display: flex;align-items: center;">
				<view style="margin-left: 30rpx;">
					<image src="/static/order-sous.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
				</view>
				<view style="margin-left: 10rpx;">
					<input @confirm="searchData" v-model="search" type="text" style="font-weight: 500;font-size: 26rpx;width: 100%;" placeholder="请输入搜索内容"
						placeholder-style="font-weight: 500;font-size: 26rpx;color: #D4D6DC;" />
				</view>
			</view>
			<view style="text-align: center;">
				<view>
					<image src="/static/jy-o-ss.png" style="width: 29rpx;height: 28rpx;" mode=""></image>
				</view>
				<view style="font-weight: 400;font-size: 20rpx;margin-top: -10rpx;">筛选</view>
			</view>
		</view>
		<view style="border-bottom: 1rpx solid #F4F4F4;">
			<v-tabs v-model="activeTab" :lineScale="0.25" height="80rpx" activeColor="black" lineColor="#3742C5"
				:scroll="false" :tabs="['全部', '未付款', '已付款', '申诉', '已完成', '已取消']" @change="changeTab"></v-tabs>
		</view>

		<view style="padding: 30rpx;margin-bottom: 200rpx;">
			
			<!-- 列表 -->
			<view v-for="(item, index) in list" :key="index" @click="detail(item.id, item.status)"
				style="padding: 30rpx;box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);border-radius: 32rpx;margin-top: 20rpx;">
				<view style="display: flex;justify-content: space-between;align-items: center;">
					<view>
						<span v-if="item.is_buy" style="color: #2EBD85;font-size: 32rpx;font-weight: bold;">买入</span>
						<span v-if="!item.is_buy" style="color: #F6465D;font-size: 32rpx;font-weight: bold;">卖出</span>
						<span style="font-size: 32rpx;font-weight: bold;margin-left: 10rpx;">USDT</span>
					</view>
					<view v-if="item.status == 1 && item.is_buy" style="width: 122rpx;height: 60rpx;background: #FDF3E9;border-radius: 22rpx;font-weight: 400;font-size: 24rpx;color: #EB8E26;
						text-align: center;line-height: 60rpx;">
						请付款
					</view>
					<view v-if="item.status == 1 && !item.is_buy" style="width: 160rpx;height: 60rpx;background: #FDF3E9;border-radius: 22rpx;font-weight: 400;font-size: 24rpx;color: #EB8E26;
						text-align: center;line-height: 60rpx;">
						请等待付款
					</view>
					<view v-if="item.status == 2 && item.is_buy" style="width: 226rpx;height: 60rpx;background: #EAECEF;border-radius: 22rpx;font-weight: 400;font-size: 24rpx;
						text-align: center;line-height: 60rpx;">
						等待卖家确认收款
					</view>
					<view v-if="item.status == 2 && !item.is_buy" style="width: 140rpx;height: 60rpx;background: #EAECEF;border-radius: 22rpx;font-weight: 400;font-size: 24rpx;
						text-align: center;line-height: 60rpx;">
						确认收款
					</view>
					<view v-if="item.status == 4" style="width: 122rpx;height: 60rpx;background: #EAECEF;border-radius: 22rpx;font-weight: 400;font-size: 24rpx;
						text-align: center;line-height: 60rpx;">已完成</view>
					<view v-if="item.status == 5" style="width: 122rpx;height: 60rpx;background: #EAECEF;border-radius: 22rpx;font-weight: 400;font-size: 24rpx;color: #B7BAC7;
						text-align: center;line-height: 60rpx;">已取消</view>
				</view>
				<view v-if="item.status == 1" style="margin-top: 15rpx;display: flex;justify-content: flex-end;">
					<view style="display: flex;align-items: center;">
						<view>
							<image src="/static/jy-time.png" style="width: 25rpx;height: 28rpx;" mode=""></image>
						</view>
						<view
							style="font-weight: 400;font-size: 24rpx;color: #B7BAC7;margin-left: 10rpx;margin-top: -5rpx;">
							倒计时{{ item.countdown }}</view>
					</view>
				</view>
				<view style="margin-top: 24rpx;">
					<view style="display: flex;justify-content: space-between;">
						<view style="display: flex;align-items: center;">
							<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">总额</view>
						</view>
						<view style="font-weight: bold;font-size: 24rpx;">￥{{ item.price }}</view>
					</view>
					<view style="display: flex;justify-content: space-between;margin-top: 20rpx;">
						<view style="display: flex;align-items: center;">
							<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">单价</view>
						</view>
						<view style="font-weight: bold;font-size: 24rpx;">￥{{ item.dan_price }}</view>
					</view>
					<view style="display: flex;justify-content: space-between;margin-top: 20rpx;">
						<view style="display: flex;align-items: center;">
							<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">数量</view>
						</view>
						<view style="font-weight: bold;font-size: 24rpx;">{{ item.num }} Y币</view>
					</view>
					<view style="display: flex;justify-content: space-between;margin-top: 20rpx;">
						<view style="display: flex;align-items: center;">
							<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">订单号</view>
						</view>
						<view
							style="font-weight: bold;font-size: 24rpx;display: flex;align-items: center;color: #A9ABB6;">
							<view>{{ item.order_no }}</view>
							<view @click="copy(item.order_no)" style="margin-left: 15rpx;">
								<image src="/static/jy-fz.png" style="width: 24rpx;height: 24rpx;" mode=""></image>
							</view>
						</view>
					</view>
					<view style="margin-top: 20rpx;display: flex;justify-content: space-between;align-items: center;">
						<view style="display: flex;align-items: center;">
							<view style="font-weight: bold;font-size: 24rpx;">{{ item.nickname }}</view>
							<view style="margin-left: 10rpx;">
								<image src="/static/jy-xx.png" style="width: 22rpx;height: 22rpx;" mode=""></image>
							</view>
						</view>
						<view style="font-weight: bold;font-size: 24rpx;color: #A9ABB6;">{{ item.time }}</view>
					</view>
				</view>
			</view>
			
			<!-- 加载更多 -->
			<u-loadmore v-if="list.length != 0" :status="load_status" @loadmore="loadMoreData"
				style="margin-top: 35rpx;"></u-loadmore>
				
			<view style="margin-bottom: 200rpx;"></view>
		</view>
		
		<nav-bar :nav-index="1" />
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
				activeTab: 0,
				search: '',
				list: [],
				timer: null,
				last_id: '',
				load_status: 'loadmore',
			};
		},
		onLoad() {

		},
		onShow() {
			this.getList()
		},
		methods: {
			getList(loadMore = false) {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.$request('get', 'api/ad/adOrderList', {
					status: this.activeTab,
					search: this.search,
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
						
						this.startCountdown()
					}
				})
			},
			loadMoreData() {
				this.load_status = 'loading';
				this.getList(true)
			},
			searchData() {
				this.list = []
				this.last_id = ''
				this.getList()
			},
			changeTab(e) {
				this.activeTab = e
				this.last_id = ''
				this.list = []
				this.load_status = 'loadmore'
				this.getList()
			},
			detail(id, status) {
				if (status == 1) {
					uni.navigateTo({
						url: '/pages/market/order?id=' + id
					})
				} else if (status == 2) {
					uni.navigateTo({
						url: '/pages/market/order-detail?id=' + id
					})
				} else if (status == 4) {
					uni.navigateTo({
						url: '/pages/market/order-detail-success?id=' + id
					})
				} else if (status == 5) {
					uni.navigateTo({
						url: '/pages/market/cancel-order?id=' + id
					})
				}
			},
			padZero(num) {
				return num < 10 ? `0${num}` : num;
			},
			updateCountdown() {
				const now = Date.now();
				// console.log(this.info.expire_time)
				let i = 0;
				for (let key in this.list) {
					const info = this.list[key]
					if (info.status != 1) {
						continue
					}
					if (info.countdown == '00:00') {
						continue
					}

					if (info.id == 28) {
						console.log(info.countdown)
					}

					i++;
					const futureTimestamp = info.expire_time * 1000;
					const diff = futureTimestamp - now;
					// console.log(futureTimestamp, now)
					if (diff <= 0) {
						this.list[key].countdown = '00:00';
						continue
						// clearInterval(this.timer);
						// return;
					}

					const minutes = Math.floor(diff / 1000 / 60);
					const seconds = Math.floor((diff / 1000) % 60);

					this.list[key].countdown = `${this.padZero(minutes)}:${this.padZero(seconds)}`;
				}

				// if (i == 0) {
				// 	clearInterval(this.timer);
				// }
			},
			startCountdown() {
				this.updateCountdown();
				// this.timer = setInterval(this.updateCountdown, 1000);
			},
			copy(value) {
				event.stopPropagation()

				// #ifdef H5
				this.$copyText(value).then(
					res => {
						uni.$u.toast('复制成功')
					}
				)
				// #endif
				// #ifdef APP-PLUS
				uni.setClipboardData({
					data: value,
					success: () => {
						uni.$u.toast('复制成功')
					},
					fail: () => {
						uni.$u.toast('复制失败')
					}
				});
				// #endif
			}
		},
	}
</script>

<style lang="scss">

</style>