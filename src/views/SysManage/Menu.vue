<template>
	<!-- Menu page -->
	<div>
	   <span>简易省市二级联动</span>		
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

		<br>

		<!-- vue-area-linkage联动组件实现 -->  <!-- type有三种类型，all,text,code,可指定后打印出 -->
		<span>vue-area-linkage实现的省市二级联动</span>	
		<area-select v-model="selected" :data="pca" :level="1" type="text"  @change="getChangeVal"></area-select>

		<br><br>

		<!-- pca表示二级联动，pcaa表示三级联动 -->
		<span>vue-area-linkage实现的省市三级联动</span>	
		<area-select v-model="selecteds" :data="pcaa" :level="2" type="all" @change="changeArea"></area-select>

		<br><br>

		<span>element-ui的时间选择器组件</span>
        <el-form :inline="true" :model="times">
        	<el-form-item>
        		<span class="demonstration">开始时间</span>
				<el-date-picker
			      v-model="times.value1"
			      value-format="timestamp"
			      type="date"
			      placeholder="选择日期"
			      :picker-options="pickerOptionStart">
			    </el-date-picker>
        	</el-form-item>
        	<el-form-item>
        		<span class="demonstration">结束时间</span>
				<el-date-picker
			      v-model="times.value2"
			      value-format="timestamp"
			      type="date"
			      placeholder="选择日期"
			      :picker-options="pickerOptionEnd">
			    </el-date-picker>
        	</el-form-item>
	        <el-form-item>
			    <el-button type="primary" @click="onSearch">搜索</el-button>
			</el-form-item>
        </el-form>
        <p style="display: flex;width: 70%;margin: 0 auto;">
        	<span style="flex: 1" v-if="times.value1">{{times.value1 | formDate}}</span> 
            <span style="flex: 1" v-if="times.value2">{{times.value2 | formDate}}</span>
        </p>
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
			pcaa: pcaa,

			times:{
				value1:'',
			    value2:''
			},
			pickerOptionStart:{
				disabledDate: (time) => {
	            	if (this.times.value2) {
		              return (
		                time.getTime() > new Date(this.times.value2).getTime()
		              );
		            } else {
		              return time.getTime() > Date.now();
		            }	            }
			},
			pickerOptionEnd: {
	            disabledDate: (time) => {
	            	if (this.times.value1) {
		              return (
		                time.getTime() > Date.now() + 24*3600*1000 || time.getTime() < new Date(this.times.value1).getTime()
			              );
			          } else {
			              return time.getTime() > Date.now() + 24*3600*1000;
			          }
	            }
	        }
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
		},
        onSearch(){
			console.log(this.times);
		}
	},
	created(){
		this.getCityData()
	},
	filters: {
        formDate: function (value) {
            let year = new Date(value).getFullYear()
            let month = new Date(value).getMonth() + 1
            let date = new Date(value).getDate()
            let hour = new Date(value).getHours()
            let min = new Date(value).getMinutes()
            let sec = new Date(value).getSeconds()
            return year + '-' + (month < 10 ? '0' + month : month) + '-' + (date < 10 ? '0' + date : date) + " " + (hour < 10 ? '0' + hour : hour) + ":" + (min < 10 ? '0' + min : min) + ":" + (sec < 10 ? '0' + sec : sec)
        }
    }
  }
</script>

<style>
	
</style>
