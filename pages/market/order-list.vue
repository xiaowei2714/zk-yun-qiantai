<template>
	<view>
		<view style="padding: 30rpx;display: flex;justify-content: space-between;">
			<view style="width: 626rpx;height: 70rpx;background: #F6F7F9;border-radius: 24rpx;display: flex;align-items: center;">
				<view style="margin-left: 30rpx;">
					<image src="/static/order-sous.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
				</view>
				<view style="margin-left: 10rpx;">
					<input type="text" style="font-weight: 500;font-size: 26rpx;width: 100%;" placeholder="请输入搜索内容" placeholder-style="font-weight: 500;font-size: 26rpx;color: #D4D6DC;" />
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
		<view style="padding: 30rpx;">
			<view @click="detail" style="padding: 30rpx;box-shadow: 0rpx 6rpx 32rpx 2rpx rgba(0,0,0,0.08);border-radius: 32rpx;margin-top: 20rpx;">
				<view style="display: flex;justify-content: space-between;align-items: center;">
					<view>
						<span style="color: #2EBD85;font-size: 32rpx;font-weight: bold;">买入</span>
						<span style="font-size: 32rpx;font-weight: bold;margin-left: 10rpx;">USDT</span>
					</view>
					<view v-if="activeTab == 0 || activeTab == 1" style="width: 122rpx;height: 60rpx;background: #FDF3E9;border-radius: 22rpx;font-weight: 400;font-size: 24rpx;color: #EB8E26;
						text-align: center;line-height: 60rpx;">请付款</view>
					<view v-if="activeTab == 2" style="width: 226rpx;height: 60rpx;background: #EAECEF;border-radius: 22rpx;font-weight: 400;font-size: 24rpx;
						text-align: center;line-height: 60rpx;">等待卖家确认收款</view>
					<view v-if="activeTab == 4" style="width: 122rpx;height: 60rpx;background: #EAECEF;border-radius: 22rpx;font-weight: 400;font-size: 24rpx;
						text-align: center;line-height: 60rpx;">已完成</view>
					<view v-if="activeTab == 5" style="width: 122rpx;height: 60rpx;background: #EAECEF;border-radius: 22rpx;font-weight: 400;font-size: 24rpx;color: #B7BAC7;
						text-align: center;line-height: 60rpx;">已取消</view>
				</view>
				<view v-if="activeTab == 0 || activeTab == 1" style="margin-top: 15rpx;display: flex;justify-content: flex-end;">
					<view style="display: flex;align-items: center;">
						<view>
							<image src="/static/jy-time.png" style="width: 25rpx;height: 28rpx;" mode=""></image>
						</view>
						<view style="font-weight: 400;font-size: 24rpx;color: #B7BAC7;margin-left: 10rpx;margin-top: -5rpx;">倒计时4:58</view>
					</view>
				</view>
				<view style="margin-top: 24rpx;">
					<view style="display: flex;justify-content: space-between;">
						<view style="display: flex;align-items: center;">
							<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">总额</view>
						</view>
						<view style="font-weight: bold;font-size: 24rpx;">￥ 300.00</view>
					</view>
					<view style="display: flex;justify-content: space-between;margin-top: 20rpx;">
						<view style="display: flex;align-items: center;">
							<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">单价</view>
						</view>
						<view style="font-weight: bold;font-size: 24rpx;">￥ 7.18</view>
					</view>
					<view style="display: flex;justify-content: space-between;margin-top: 20rpx;">
						<view style="display: flex;align-items: center;">
							<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">数量</view>
						</view>
						<view style="font-weight: bold;font-size: 24rpx;">41.78 USDT</view>
					</view>
					<view style="display: flex;justify-content: space-between;margin-top: 20rpx;">
						<view style="display: flex;align-items: center;">
							<view style="font-weight: 400;font-size: 24rpx;color: #A9ABB6;">订单号</view>
						</view>
						<view style="font-weight: bold;font-size: 24rpx;display: flex;align-items: center;color: #A9ABB6;">
							<view>22688744475179954176</view>
							<view style="margin-left: 15rpx;">
								<image src="/static/jy-fz.png" style="width: 24rpx;height: 24rpx;" mode=""></image>
							</view>
						</view>
					</view>
					<view style="margin-top: 20rpx;display: flex;justify-content: space-between;align-items: center;">
						<view style="display: flex;align-items: center;">
							<view style="font-weight: bold;font-size: 24rpx;">大水港-资金安全</view>
							<view style="margin-left: 10rpx;">
								<image src="/static/jy-xx.png" style="width: 22rpx;height: 22rpx;" mode=""></image>
							</view>
						</view>
						<view style="font-weight: bold;font-size: 24rpx;color: #A9ABB6;">2024-11-10 09:51:23</view>
					</view>
				</view>
			</view>
			
			
			<view style="width: 100%;font-weight: 400;font-size: 26rpx;color: #A9ABB6;text-align: center;margin-top: 56rpx;">点击或上拉加载更多</view>
		</view>
		
		
		
		
		<nav-bar :nav-index="1"/>
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
				activeTab: 0
			};
		},
		onLoad() {
			
		},
		methods: {
			detail() {
				uni.navigateTo({
					url: '/pages/market/order-detail-success'
				})
			},
			changeTab(e) {
				this.activeTab = e
				// console.log(e)
			}
		}
	}
</script>

<style lang="scss">

</style>
