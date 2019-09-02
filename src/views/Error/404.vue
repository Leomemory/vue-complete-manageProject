<template>
  <div class="page">
    <h2>404</h2>
    <el-button @click="$router.go(-1)">返回上一级</el-button>
    <el-button type="primary" @click="$router.push('/home')">进入首页</el-button>
  </div>
</template>

<script>
export default {
	
}
</script>

<style>
	
</style>