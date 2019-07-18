<template>
	<div>
		 <el-tabs v-model="activeName">
		    <el-tab-pane label="Use Clipboard Directly" name="first">
		    	<el-input v-model="inputData" placeholder="Please input" style="width:400px;max-width:100%;" />
		        <el-button type="primary" @click="handleCopy(inputData,$event)">
		          copy
		        </el-button>
		    </el-tab-pane>
		    <el-tab-pane label="Use Clipboard By v-directive" name="second">
		    	<el-input v-model="inputInfo" placeholder="Please input" style="width:400px;max-width:100%;" />
		        <el-button type="success" v-clipboard:copy="inputInfo" v-clipboard:success="clipboardSuc">
		           copy
		        </el-button>
		    </el-tab-pane>
		  </el-tabs>
	</div>
</template>

<script>
import clip from '@/utils/clipboard' // use clipboard directly
import clipboard from '@/directive/clipboard/index' // use clipboard by v-directive
export default{
	data() {
      return {
        activeName: 'first',
        inputData:'you are not alone !',
        inputInfo:'Life is a wonderful journey. Make it your journey and not someone else’s !'
      }
    },
    directives: {
	    clipboard
	},
    methods: {
      handleCopy(text,event){
      	 // console.log(text)
      	 // console.log(event)
      	 clip(text,event)
      },
      clipboardSuc(){
      	this.$message({
	        message: '复制成功！',
	        type: 'success',
	        duration: 1500
	     })
      }
    }
}
</script>

<style lang="scss">

</style>