<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<u-form :model="userInfo" ref="uForm">
				<u-form-item label="手机号" label-width="auto" prop="mobile">
					<u-input v-model="userInfo.mobile" />
				</u-form-item>
				<u-form-item label="密码" label-width="auto" prop="password">
					<u-input v-model="userInfo.password" />
				</u-form-item>
			</u-form>
			<u-button type="primary" @click="submit">提交</u-button>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import md5 from '@/js_sdk/js-md5/src/md5.js'
	export default {
		data() {
			return {
				title:'Hello',
				userInfo:{
					mobile:"",
					password:""
				},
				rules: {
					mobile: [
						{
							required: true,
							message: '请输入手机号',
							// 可以单个或者同时写两个触发验证方式
							trigger: ['change','blur'],
						}
					],
					password: [
						{
							required: true,
							min: 6,
							max: 6,
							message: '请输入6位密码',
							trigger: ['change','blur'],
						}
					]
				},
				
				show: false,
				list: [
					{
						value: '1',
						label: '江'
					},
					{
						value: '2',
						label: '湖'
					}
				],
			}
		},
		computed:{
			...mapState(['userName'])
		},
		onLoad() {

		},
		methods: {
			formReset(){
				this.userInfo = {
					mobile:"",
					password:""
				}
			},
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						let mobile = this.userInfo.mobile;
						let password =  md5(this.userInfo.password)
						this.$store.dispatch('LOGIN', { mobile, password}).then((res) => {
							//console.log(res);
						})
					} else {
						console.log('验证失败');
					}
				});
			}
		},
		mounted() {
			//this.$u.toast('Hello uView!');
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style lang="scss" scoped>
.logo { width:246rpx; height:158rpx; margin:236rpx auto 124rpx; display:block;}
</style>
