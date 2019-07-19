<template>
	<!-- Menu page -->
	<div>
       <el-form :inline="true" :model="formInline">
			<el-select v-model="formInline.province" placeholder = "请选择" @change="choseProvince">
	            <el-option v-for="item in provinces" :value="item.code" :label="item.name" :key = "item.code">

	            </el-option>
	        </el-select>

	        <el-select v-model="formInline.city" placeholder = "请选择" @change="choseCity">
	            <el-option v-for="item in cities" :value="item.code" :label="item.name" :key = "item.code">
	            	
	            </el-option>
	        </el-select>

	        <el-form-item>
			    <el-button type="primary" @click="onSubmit">查询</el-button>
			</el-form-item>
		</el-form>
      </div>
</template>

<script>
import axios from 'axios'
export default{
	data(){
		return{
			mapJson:'../../../static/map.json',
			formInline:{
				province:'',
				city:''
			},
			provinces:[],
			cities:[]
		}
	},
	methods:{
		getCityData(){
			axios.get(this.mapJson).then(res=>{
				console.log('success',res)
				this.provinces = res.data.provinces
				 // this.formInline.province = res.data.provinces[0].name
			}).catch(err=>{
				console.log(err)
			})
		},
		choseProvince(value){
			// console.log(value)
			for(var item of this.provinces){
				if(item.code === value){
					this.cities = item.cities
					this.formInline.city = item.cities[0].name
				}
			}
		},
		choseCity(val){
			// console.log(val)
		},
		onSubmit(){
			console.log(this.formInline)
		}
	},
	created(){
		this.getCityData()
	}
  }
</script>

<style>
	
</style>
















