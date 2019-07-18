<template>
	<div class="nxdataDisplay">
		<el-row :span="24">
	      <el-col v-for="(item,index) in data" :key="index" :span="span">
	        <div class="item" :style="{color:color}">
	          <h5 class="count">
	          	<nxcount-up :start="14" :end="item.count"></nxcount-up>
	          </h5>
	          <span class="splitLine"></span>
	          <p class="title">{{item.title}}</p>
	        </div>
	      </el-col>
	    </el-row>
	</div>
</template>

<script>
import nxcountUp from '@/components/nxcountUp.vue'
export default{
	props: {
	    option: {
	      type: Object,
	      default: () => {}
	    }
	},
	data(){
		return{
			data:this.option.data,
			span: this.option.span || 8,
			color: this.option.color || 'rgb(63, 161, 255)'
		}
	},
	components:{
		nxcountUp
	}
}
</script>

<style lang="scss">
.nxdataDisplay{
  .item {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 5px 0;
    text-align: center;
  }
  
  .count {
    margin: 8px 0;
    font-weight: bold;
    font-size: 32px;
    color: #15A0FF;
  }
  
  .title {
    color: #999;
  }
  
  .splitLine {
    display: block;
    margin: 0 auto;
    width: 24px;
    height: 1px;
    background: #9B9B9B;
  }
}
</style>
