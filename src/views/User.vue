<template>
  <div class="page">
    <h2>User page</h2>

    <a href="javascript:;" @click="$store.dispatch('switch_dialog') ">点击</a>
    <t-dialog></t-dialog>
  </div>
</template>

<script>
import dialog from '../components/dialog.vue'
export default {
	components:{
	    "t-dialog":dialog
	  }
}
</script>

<style>
	
</style>