<template>
	<view style="padding: 30rpx;">
		<view style="font-weight: bold;font-size: 32rpx;margin-left: 10rpx;">姓名</view>
		<view
			style="display: flex;align-items: center;height: 80rpx;background: #F6F7F9;border-radius: 32rpx;margin-top: 18rpx;">
			<input type="text" v-model="name" style="margin-left: 34rpx;width: 100%;" placeholder="请输入您的姓名"
				placeholder-style="font-weight: 400;font-size: 32rpx;color: #A9ABB6;" />
		</view>
		<view v-if="type == 'wx'">
			<view style="font-weight: bold;font-size: 32rpx;margin-left: 10rpx;margin-top: 72rpx;">微信账号</view>
			<view
				style="display: flex;align-items: center;height: 80rpx;background: #F6F7F9;border-radius: 32rpx;margin-top: 18rpx;">
				<input v-model="wechat" type="text" style="margin-left: 34rpx;width: 100%;" placeholder="请输入您的微信账号"
					placeholder-style="font-weight: 400;font-size: 32rpx;color: #A9ABB6;" />
			</view>
		</view>
		<view v-if="type == 'zfb'">
			<view style="font-weight: bold;font-size: 32rpx;margin-left: 10rpx;margin-top: 72rpx;">支付宝账号</view>
			<view
				style="display: flex;align-items: center;height: 80rpx;background: #F6F7F9;border-radius: 32rpx;margin-top: 18rpx;">
				<input v-model="alipay" type="text" style="margin-left: 34rpx;width: 100%;" placeholder="请输入您的支付宝账号"
					placeholder-style="font-weight: 400;font-size: 32rpx;color: #A9ABB6;" />
			</view>
		</view>
		<view v-if="type == 'yhk'">
			<view style="font-weight: bold;font-size: 32rpx;margin-left: 10rpx;margin-top: 72rpx;">银行卡号</view>
			<view
				style="display: flex;align-items: center;height: 80rpx;background: #F6F7F9;border-radius: 32rpx;margin-top: 18rpx;">
				<input v-model="bank_card" type="text" style="margin-left: 34rpx;width: 100%;" placeholder="请输入您的银行卡号"
					placeholder-style="font-weight: 400;font-size: 32rpx;color: #A9ABB6;" />
			</view>
		</view>
		<view v-if="type == 'usdt'">
			<view style="font-weight: bold;font-size: 32rpx;margin-left: 10rpx;margin-top: 72rpx;">TRC20地址</view>
			<view
				style="display: flex;align-items: center;height: 80rpx;background: #F6F7F9;border-radius: 32rpx;margin-top: 18rpx;">
				<input v-model="trc" type="text" style="margin-left: 34rpx;width: 100%;" placeholder="请输入您的TRC20地址"
					placeholder-style="font-weight: 400;font-size: 32rpx;color: #A9ABB6;" />
			</view>
		</view>

		<view v-if="type !== 'yhk'">
			<view style="font-weight: bold;font-size: 32rpx;margin-left: 10rpx;margin-top: 72rpx;">收款二维码（选填）</view>
			<view @click="uploadImage" style="display: flex;align-items: center;border-radius: 32rpx;margin-top: 18rpx;">
				<view v-if="qrcode == ''"
					style="width: 244rpx;height: 244rpx;background: #F6F7F9;border-radius: 32rpx;border: 2rpx dashed #C6CAD6;">
					<view style="text-align: center;margin-top: 70rpx;">
						<view>
							<image src="/static/sk-sc.png" style="width: 44rpx;height: 53rpx;" mode=""></image>
						</view>
						<view style="font-weight: 400;font-size: 26rpx;color: #A9ABB6;">上传</view>
					</view>
				</view>
				<view>
					<image style="width: 244rpx;height: 244rpx;border-radius: 32rpx;" :src="qrcode" mode=""></image>
				</view>
			</view>
		</view>

		<view style="margin-top: 116rpx;padding: 25rpx;background: #ECF0F9;border-radius: 32rpx;">
			<view style="display: flex;align-items: center;">
				<view>
					<image src="/static/sk-ts.png" style="width: 24rpx;height: 24rpx;" mode=""></image>
				</view>
				<view style="margin-left: 8rpx;font-weight: bold;font-size: 24rpx;">温馨提示：</view>
			</view>
			<view style="margin-top: 18rpx;font-weight: 500;font-size: 24rpx;color: #757B8C;line-height: 40rpx;">
				在交易过程中，会向买家显示添加的付款方式的详细信息以进行付款，而卖家将看到买家的真实姓名。请确保信息正确、真实。
			</view>
		</view>
		<view @click="submit" style="margin-top: 182rpx;height: 80rpx;border-radius: 32rpx;font-weight: bold;font-size: 28rpx;color: #FFFFFF;text-align: center;
			line-height: 80rpx;" :style="buttonStyle">
			确认
		</view>
	</view>
</template>

<script>
	import color from '../../uni_modules/uview-ui/libs/config/color';

	export default {
		data() {
			return {
				type: '',
				name: '',
				wechat: '',
				qrcode: '',
				alipay: '',
				bank_card: '',
				trc: '',
				imageUrl: '',
				scenc: '',
				id: 0
			};
		},
		computed: {
			// 计算按钮样式
			buttonStyle() {
				if (this.type == 'wx') {
					return {
						backgroundColor: this.name && this.wechat ? '#3742C5' : '#D7D9F4', // 有内容时蓝色，无内容时灰色
					}
				} else if (this.type == 'zfb') {
					return {
						backgroundColor: this.name && this.alipay ? '#3742C5' : '#D7D9F4', // 有内容时蓝色，无内容时灰色
					}
				} else if (this.type == 'yhk') {
					return {
						backgroundColor: this.name && this.bank_card ? '#3742C5' : '#D7D9F4', // 有内容时蓝色，无内容时灰色
					}
				} else if (this.type == 'usdt') {
					return {
						backgroundColor: this.name && this.trc ? '#3742C5' : '#D7D9F4', // 有内容时蓝色，无内容时灰色
					}
				}

			}
		},
		onLoad(options) {
			this.type = options.type
			this.scenc = options.scenc
			if (options.type == 'wx') {
				if (options.scenc == 'add') {
					uni.setNavigationBarTitle({
						title: '添加微信', // 新标题
					});
				} else {
					uni.setNavigationBarTitle({
						title: '编辑微信', // 新标题
					});
				}
			} else if (options.type == 'zfb') {
				if (options.scenc == 'add') {
					uni.setNavigationBarTitle({
						title: '添加支付宝', // 新标题
					});
				} else {
					uni.setNavigationBarTitle({
						title: '编辑支付宝', // 新标题
					});
				}
			} else if (options.type == 'usdt') {
				if (options.scenc == 'add') {
					uni.setNavigationBarTitle({
						title: '添加USDT', // 新标题
					});
				} else {
					uni.setNavigationBarTitle({
						title: '编辑USDT', // 新标题
					});
				}
			} else if (options.type == 'yhk') {
				if (options.scenc == 'add') {
					uni.setNavigationBarTitle({
						title: '添加银行卡', // 新标题
					});
				} else {
					uni.setNavigationBarTitle({
						title: '编辑银行卡', // 新标题
					});
				}
			}
			if (this.scenc == 'edit') {
				this.getOnePayType()
			}
		},
		methods: {
			getOnePayType() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.$request('get','api/index/getOnePayType',{type: this.type}).then(res => {
					uni.hideLoading()
					if (res.code) {
						this.id = res.data.info.id
						this.name = res.data.info.name
						if (this.type == 'wx') {
							this.wechat = res.data.info.wechat
							this.qrcode = res.data.info.qrcode
						}
						if (this.type == 'zfb') {
							this.alipay = res.data.info.alipay
							this.qrcode = res.data.info.qrcode
						}
						if (this.type == 'yhk') {
							this.bank_card = res.data.info.bank_card
						}
						if (this.type == 'usdt') {
							this.trc = res.data.info.trc
							this.qrcode = res.data.info.qrcode
						}
						
					}
				})
			},
			uploadImage() {
				// 1. 选择图片
				uni.chooseImage({
					count: 1, // 默认1张
					// sizeType: ['compressed'], // 压缩图
					sourceType: ['album', 'camera'], // 相册或相机
					success: (res) => {
						const tempFilePath = res.tempFilePaths[0]
						this.imageUrl = tempFilePath

						// 2. 上传图片
						this.uploadFile(tempFilePath)
					},
					fail: (err) => {
						uni.$u.toast('选择图片失败')
					}
				})
			},
			uploadFile(filePath) {
				uni.showLoading({
					title: '上传中...'
				})
				let token = uni.getStorageSync('token')
				uni.uploadFile({
					url: this.$apiUrl + 'api/upload/image', // 替换为你的上传接口
					filePath: filePath,
					name: 'file', // 后端接收的字段名
					header: {
						token: token
					},
					// formData: {
					// 	'userId': '123' // 附加参数
					// },
					success: (res) => {
						uni.hideLoading()
						if (res.statusCode === 200) {
							const data = JSON.parse(res.data)
							uni.$u.toast('上传成功')
							this.qrcode = data.data.uri
							// console.log('服务器返回数据:', data)
						} else {
							uni.$u.toast('上传失败')
						}
					},
					fail: (err) => {
						uni.hideLoading()
						uni.$u.toast('上传失败')
					}
				})
			},
			submit() {
				if (this.type == 'wx') {
					if (this.name == '') {
						return uni.$u.toast('请输入您的姓名')
					} else if (this.wechat == '') {
						return uni.$u.toast('请输入您的微信账号')
					}
				}
				if (this.type == 'zfb') {
					if (this.name == '') {
						return uni.$u.toast('请输入您的姓名')
					} else if (this.alipay == '') {
						return uni.$u.toast('请输入您的支付宝账号')
					}
				}
				if (this.type == 'yhk') {
					if (this.name == '') {
						return uni.$u.toast('请输入您的姓名')
					} else if (this.bank_card == '') {
						return uni.$u.toast('请输入您的银行卡号')
					}
				}
				if (this.type == 'usdt') {
					if (this.name == '') {
						return uni.$u.toast('请输入您的姓名')
					} else if (this.trc == '') {
						return uni.$u.toast('请输入您的TRC20地址')
					}
				}
				
				uni.showLoading({
					title: this.scenc == 'add' ? '添加中' : '编辑中',
					mask: true
				})
				this.$request('post','api/index/addPayType',{
					id: this.id,
					type: this.type,
					name: this.name,
					wechat: this.wechat,
					qrcode: this.qrcode,
					alipay: this.alipay,
					bank_card: this.bank_card,
					trc: this.trc,
					scenc: this.scenc
				}).then(res => {
					uni.hideLoading()
					if (res.code) {
						uni.$u.toast(this.scenc == 'add' ? '添加成功' : '编辑成功')
						setTimeout(() => {
							uni.navigateBack(1)
						}, 1500)
					} else {
						uni.$u.toast(res.msg)
					}
				})
			}
		}
	}
</script>

<style lang="scss">

</style>