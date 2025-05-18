<template>
	<view style="width: 100%;">
		<view style="padding: 30rpx;padding-bottom: 245rpx;">
			<view style="font-weight: bold;font-size: 32rpx;padding-top: 22rpx;">{{shop_name}}</view>
			<view style="margin-top: 22rpx;">
				<image :src="index_banner" style="width: 100%;height: 336rpx;" mode=""></image>
			</view>
			<view @click="toPage('/pages/index/notice')" style="margin-top: 26rpx;display: flex;justify-content: space-between;">
				<view style="display: flex;align-items: center;">
					<view style="width: 50rpx;height: 50rpx;background: #EDEEFA;border-radius: 16rpx 16rpx 16rpx 16rpx;display: flex;justify-content: center;align-items: center;">
						<view>
							<image src="/static/index-notice.png" style="width: 29rpx;height: 25rpx;" mode=""></image>
						</view>
					</view>
					<!-- <view style="">暂时没有开工！开工会通知！请勿轻信他人...</view> -->
					<view style="width: 500rpx;font-weight: 400;font-size: 28rpx;margin-left: 16rpx;" >
						 <swiper
						      vertical
						      autoplay
						      :interval="3000" 
						      circular 
						      :duration="500" 
						      class="notice-swiper"
						    >
						      <!-- 遍历公告列表 -->
						      <swiper-item v-for="item in notice" :key="item.id">
						        <view class="notice-item">
						          {{ item.title }}
						        </view>
						      </swiper-item>
						    </swiper>
					</view>
				</view>
				<view >
					<image src="/static/index-notice-right.png" style="width: 13rpx;height: 22rpx;" mode=""></image>
				</view>
			</view>
			<view style="margin-top: 44rpx;display: flex;justify-content: space-between;">
				<view @click="toPage('/pages/index/mobile-recharge')" style="width: 290rpx;height: 250rpx;background: #FCF2E9;border-radius: 32rpx 32rpx 32rpx 32rpx;padding: 24rpx;
					position: relative;">
					<image src="/static/index-huaf.png" style="width: 54rpx;height: 54rpx;" mode=""></image>
					<view style="font-weight: bold;font-size: 32rpx;margin-top: 14rpx;">话费充值</view>
					<view style="font-weight: 300;font-size: 26rpx;color: #B4B4B4;margin-top: 6rpx;">充值享8折优惠</view>
					<view style="position: absolute;right: 10rpx;bottom: 0;">
						<image src="/static/hfcz.png" style="width: 134rpx;height: 122rpx;" mode=""></image>
					</view>
				</view>
				<view> 
					<view @click="toPage('/pages/index/electricity-recharge')" style="width: 330rpx;height: 136rpx;background: #ECF0F9;border-radius: 32rpx 32rpx 32rpx 32rpx;padding-top: 1rpx;">
						<view style="display: flex;align-items: center;margin-left: 38rpx;margin-top: 19rpx;">
							<view>
								<image src="/static/index-dianf.png" style="width: 54rpx;height: 54rpx;" mode=""></image>
							</view>
							<view style="font-weight: bold;font-size: 28rpx;margin-left: 16rpx;margin-top: -15rpx;">电费充值</view>
						</view>
						<view style="font-weight: 300;font-size: 24rpx;color: #A9ABB6;text-align: center;margin-top: -10rpx;">帮充挣佣金</view>
					</view>
					<view @click="toPage('/pages/index/quickly-recharge')" style="width: 330rpx;height: 136rpx;background: #ECF0F9;border-radius: 32rpx 32rpx 32rpx 32rpx;padding-top: 1rpx;margin-top: 28rpx;">
						<view style="display: flex;align-items: center;margin-left: 38rpx;margin-top: 19rpx;">
							<view>
								<image src="/static/index-youka.png" style="width: 54rpx;height: 54rpx;" mode=""></image>
							</view>
							<view style="font-weight: bold;font-size: 28rpx;margin-left: 16rpx;margin-top: -15rpx;">话费快充</view>
						</view>
						<view style="font-weight: 300;font-size: 24rpx;color: #A9ABB6;text-align: center;margin-top: -10rpx;">最高 6.5 折</view>
					</view>
				</view>
			</view>
			<view style="font-weight: bold;font-size: 32rpx;margin-top: 34rpx;">热门推荐</view>
			<view style="display: flex;flex-wrap: wrap;justify-content: space-between;">
				<view @click="toPage('/pages/query/hf-query')" style="width: 330rpx;background: #FFFFFF;box-shadow: 0rpx 6rpx 26rpx 2rpx rgba(0,0,0,0.08);margin-top: 22rpx;
					border-radius: 32rpx 32rpx 32rpx 32rpx;position: relative;padding-bottom: 30rpx;">
					<view style="position: absolute;top: 0;left: 0;background-color: #E5E6F8;width: 126rpx;height: 48rpx;border-radius: 32rpx 0rpx 32rpx 0rpx;
						">
						<view style="text-align: center;line-height: 48rpx;font-weight: 500;font-size: 26rpx;color: #3742C5;">9.70折</view>
					</view>
					<view style="width: 100%;display: flex;justify-content: center;margin-top: 48rpx;">
						<view style="border-radius: 28rpx;border: 2rpx solid #ECEEF4;width: 110rpx;height: 110rpx;">
							<image src="/static/hfcx.png" style="width: 100%;height: 100%;border-radius: 28rpx;" mode=""></image>
						</view>
					</view>
					<view style="text-align: center;margin-top: 10rpx;font-weight: bold;font-size: 30rpx;">话费查询</view>
					<view style="text-align: center;margin-top: 8rpx;font-weight: 400;font-size: 24rpx;color: #A9ABB6;">1小时成交量：100533</view>
					<view style="margin-top: 20rpx;display: flex;justify-content: center;">
						<view style="width: 222rpx;height: 58rpx;background: #EB8E26;border-radius: 34rpx;color: white;font-weight: bold;font-size: 28rpx;
							text-align: center;line-height: 58rpx;">
							立即下单
						</view>
					</view>
				</view>
				
				<view @click="toPage('/pages/index/gifts')" style="width: 330rpx;background: #FFFFFF;box-shadow: 0rpx 6rpx 26rpx 2rpx rgba(0,0,0,0.08);margin-top: 22rpx;
					border-radius: 32rpx 32rpx 32rpx 32rpx;position: relative;padding-bottom: 30rpx;">
					<view style="position: absolute;top: 0;left: 0;background-color: #E5E6F8;width: 126rpx;height: 48rpx;border-radius: 32rpx 0rpx 32rpx 0rpx;
						">
						<view style="text-align: center;line-height: 48rpx;font-weight: 500;font-size: 26rpx;color: #3742C5;">4.33折</view>
					</view>
					<view style="width: 100%;display: flex;justify-content: center;margin-top: 48rpx;">
						<view style="border-radius: 28rpx;border: 2rpx solid #ECEEF4;width: 110rpx;height: 110rpx;">
							<image src="/static/lpk.png" style="width: 100%;height: 100%;border-radius: 28rpx;" mode=""></image>
						</view>
					</view>
					<view style="text-align: center;margin-top: 10rpx;font-weight: bold;font-size: 30rpx;">礼品卡</view>
					<view style="text-align: center;margin-top: 8rpx;font-weight: 400;font-size: 24rpx;color: #A9ABB6;">1小时成交量：3230</view>
					<view style="margin-top: 20rpx;display: flex;justify-content: center;">
						<view style="width: 222rpx;height: 58rpx;background: #EB8E26;border-radius: 34rpx;color: white;font-weight: bold;font-size: 28rpx;
							text-align: center;line-height: 58rpx;">
							立即下单
						</view>
					</view>
				</view>
				
			</view>
			
		</view>
		<nav-bar :nav-index="0"/>
	</view>
</template>

<script>                                                        
	import NavBar from '@/components/navBar.vue'; // 引入组件
	export default {
		components: {
			NavBar // 注册组件
		},
		data() {
			return {
				shop_name: '',
				index_banner: '',
				notice: []
			}
		},
		onLoad() {
			this.getIndexConfig()
		},
		methods: {
			getIndexConfig() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.$request('get', 'api/index/getIndexConfig').then(res => {
					uni.hideLoading()
					if (res.code) {
						this.shop_name = res.data.shop_name
						this.index_banner = res.data.index_banner
						this.notice = res.data.notice
					}
				})
			},
			toPage(url) {
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss">
	.notice-swiper {
		width: 100%;
	  height: 40rpx; /* 公告栏高度 */
	  // background-color: #f8f8f8; /* 背景色 */
	  // border-radius: 4px; /* 圆角 */
	  overflow: hidden; /* 隐藏溢出内容 */
	}
	
	.notice-item {
	  display: flex;
	  align-items: center;
	  // justify-content: center;
	  height: 100%;
	  font-size: 14px;
	  color: #333;
	  white-space: nowrap; /* 防止文字换行 */
	  text-overflow: ellipsis; /* 文字超出显示省略号 */
	  overflow: hidden; /* 隐藏溢出内容 */
	}
</style>