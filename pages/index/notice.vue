<template>
	<view>
		<view style="padding: 30rpx;padding-top: 30rpx;">
			<view style="">
				<view @click="detail(item.id)" v-for="(item, index) in list" :key="index" style="border-radius: 32rpx;border: 2rpx solid #F0F0F3;margin-bottom: 25rpx;">
					<view style="padding: 30rpx;border-bottom: 1rpx solid #F7F7F7;">
						<view style="font-weight: bold;font-size: 30rpx;color: black;">{{item.title}}</view>
						<view style="display: flex;margin-top: 22rpx;">
							<view>
								<image :src="item.pic" style="width: 140rpx;height: 114rpx;border-radius: 24rpx;" mode="aspectFill"></image>
							</view>
							<view class="multi-line-ellipsis" style="margin-left: 20rpx;color: #A9ABB6;font-size: 24rpx;margin-top: 10rpx;">
								{{item.content}}
							</view>
						</view>
					</view>
					<view style="padding: 30rpx;display: flex;justify-content: space-between;align-items: center;">
						<view style="color: #A9ABB6;font-size: 24rpx;">{{item.create_time}}</view>
						<view style="display: flex;align-items: center;">
							<view style="color: #A9ABB6;font-size: 24rpx;">查看详情</view>
							<view style="margin-left: 10rpx;margin-top: 3rpx;">
								<image src="/static/tk-right.png" style="width: 26rpx;height: 26rpx;" mode=""></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			
			
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			};
		},
		onLoad() {
			this.getList()
		},
		methods: {
			detail(id) {
				uni.navigateTo({
					url: '/pages/index/notice-detail?id=' + id
				})
			},
			getList() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.$request('get', 'api/index/getNoticeList').then(res => {
					uni.hideLoading()
					if (res.code) {
						this.list = res.data.list
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.multi-line-ellipsis {
	  display: -webkit-box;
	   -webkit-box-orient: vertical;
	   -webkit-line-clamp: 3;
	   overflow: hidden;
	   text-overflow: ellipsis;
	   
	   /* 兼容性补充 */
	   line-clamp: 3;
	   box-orient: vertical;
	   
	   /* 样式调整 */
	   line-height: 1.5em;
	   max-height: 4.5em; /* 1.5em × 3 */
	   word-break: break-word;
	   white-space: normal;
	}
</style>
