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

		<!-- vue-area-linkage联动组件实现 -->  <!-- type有三种类型，all,text,code,可指定后打印出 -->
		<area-select v-model="selected" :data="pca" :level="1" type="text"  @change="getChangeVal"></area-select>

		<!-- pca表示二级联动，pcaa表示三级联动 -->
		<area-select v-model="selecteds" :data="pcaa" :level="2" type="all" @change="changeArea"></area-select>
      </div>
</template>

<script>
import axios from 'axios'
import { pca, pcaa } from 'area-data';
export default{
	data(){
		return{
			mapJson:'../../../static/map.json',
			formInline:{
				province:'',
				city:''
			},
			provinces:[],
			cities:[],

			selected:[],
			selecteds:[],
			pca: pca,
			pcaa: pcaa
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
		},
		getChangeVal(cal){
			console.log(cal);
		},
		changeArea(val){
			console.log(val);
		}
	},
	created(){
		this.getCityData()
	}
  }
</script>

<style>
	
</style>
















