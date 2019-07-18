<template>
  <!-- Main page -->
  <div class="page">
    <div class="item">
      <h4>数据展示</h4>
      <nxdata-display :option="option"></nxdata-display>
    </div>
  </div>
</template>

<script>
import nxdataDisplay from '@/components/nxdataDisplay.vue'
export default {
	data(){
		return{
			option: {
		        span: 8,
		        color: '#15A0FF',
		        data: [
		          {
		            count: 1000,
		            title: '日活跃数'
		          },
		          {
		            count: 3000,
		            title: '月活跃数'
		          },
		          {
		            count: 20000,
		            title: '年活跃数'
		          }
		        ]
		    }
		}
	},
	components:{
		nxdataDisplay
	},
	methods:{
		//用来测试axios请求是否有效的方法
		getUser(){
			this.$api.user.getUser().then(res=>{
				console.log('success',res)
			}).catch(err=>{
				console.log(err)
			})
		}
	},
	created(){
		this.getUser()
	}
}
</script>

<style lang="scss">

</style>