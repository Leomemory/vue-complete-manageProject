<template>
	<!-- Menu page -->
	<div class="page">
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

        <br><br>

        <span>图片预览组件封装</span>
        <el-table style="width: 60%;margin: 0 auto;" :data="tableData">
            <el-table-column
                label="注册时间">
                <template slot-scope="scope">
                    {{ scope.row.created}}
                </template>
            </el-table-column>
             <el-table-column
                label="姓名">
                <template slot-scope="scope">
                    {{ scope.row.name}}
                </template>
            </el-table-column>
        	<el-table-column
		        label="评论内容"
		      >
	        <template slot-scope="scope">
	          <span v-html="scope.row.content"></span>
	          <el-button v-if="scope.row.images.length>0" :data-img="scope.row.images" type="text" size="small" @click="$imgPreview">查看图片</el-button>
	        </template>
	      </el-table-column>
        </el-table>

        <br><br>

        <span>导入excel文件</span>
		<el-upload
		  class="upload-demo"
		  action="https://jsonplaceholder.typicode.com/posts/"
		  :on-preview="handlePreview"
		  :on-remove="handleRemove"
		  :before-remove="beforeRemove"
		  multiple
		  :limit="3"
		  :on-exceed="handleExceed"
		  :file-list="fileList">
		  <el-button size="small" type="primary">点击上传</el-button>
		</el-upload>

		<br><br>

		<span>el-radio点击取消选中</span>
		<div>
			<el-radio-group v-model="sel_radio">
	     	    <el-radio border v-for="item in radioItem" :key="item.id" :label="item.en" @click.native.prevent="clickitem(item.en)">{{item.label}}</el-radio>
			</el-radio-group>
		</div>
		<div class="show">我的选择是： <span>{{this.sel_radio}}</span></div>

		<br><br>


    </div>
</template>

<script>
import axios from 'axios'
import { pca, pcaa } from 'area-data';
import XLSX from 'xlsx'
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
	        },

	        tableData:[{
	        	created:'2019-07-21',
	        	name:'章三',
	        	content:'金融头条',
	        	images:require('@/assets/201907220945.jpg')
	        },{
	        	created:'2019-07-22',
	        	name:'李四',
	        	content:'后会有期',
	        	images:[require('@/assets/201907220946.jpg'),require('@/assets/201907220947.jpg'),require('@/assets/201907220945.jpg')]
	        }],

	        fileList:[],

	        sel_radio:null,
	        radioItem:[
	          {label: "今天", en: 'today'},
	          {label: "昨天", en: 'yesterday'},
	          {label: "近七天", en: 'week'},
	          {label: "近三十天", en: 'month'}
	        ]	
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
		},
		handleRemove(file, fileList) {
	        console.log('handleRemove信息',file, fileList);
	    },
	    handlePreview(file) {
	        console.log('handlePreview信息',file);
	    },
	    handleExceed(files, fileList) {
	        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
	    },
	    beforeRemove(file, fileList) {
	        return this.$confirm(`确定移除 ${ file.name }？`);
	    },
	    //radio点击取消
	    clickitem(val){
	    	val  ===this.sel_radio ? this.sel_radio = null : this.sel_radio = val
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

<style lang="scss" scoped>
.page{
	& > span{
		font-size:18px;
	}
	.upload-demo{
		width:40%;
		margin:0 auto;
	}
}
</style>
