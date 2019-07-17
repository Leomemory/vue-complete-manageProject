<template>
  <div class="page">
    <h2>Main page</h2>
  </div>
</template>

<script>
export default {
	methods:{
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

<style>
	
</style>