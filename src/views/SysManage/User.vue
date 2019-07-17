<template>
	<!-- User page -->
  <div class="page">
    <!-- <a href="javascript:;" @click="$store.dispatch('switch_dialog') ">点击</a>
    <t-dialog></t-dialog> -->

    <!--工具条-->
	<el-col :span="24" class="toolbar" style="padding-bottom: 0px;text-align: left;">
		<el-form :inline="true" :model="filters" @submit.native.prevent>
			<el-form-item>
				<el-input v-model="filters.name" placeholder="姓名"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="search">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleAdd">新增</el-button>
			</el-form-item>
		</el-form>
	</el-col>

			<!--列表-->
	<el-table :data="users" highlight-current-row @selection-change="selsChange" style="width: 100%;">
		<el-table-column type="selection" width="55"></el-table-column>
		<el-table-column type="index" width="60"></el-table-column>
		<el-table-column prop="name" label="姓名">
		</el-table-column>
		<el-table-column prop="sex" label="性别" :formatter="formatSex">
		</el-table-column>
		<el-table-column prop="age" label="年龄">
		</el-table-column>
		<el-table-column prop="birth" label="生日">
		</el-table-column>
		<el-table-column prop="addr" label="地址">
		</el-table-column>
		<el-table-column label="操作" width="150">
			<template slot-scope="scope">
				<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
				<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
			</template>
		</el-table-column>
	</el-table>

	<!--工具条-->
	<el-col :span="24" class="toolbar">
		<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0" style="float:left;">批量删除</el-button>
		<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
		</el-pagination>
	</el-col>

	<!--编辑界面-->
	<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :center="true">
	  <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
	    <el-form-item label="姓名" prop="name">
			<el-input v-model="editForm.name" auto-complete="off"></el-input>
		</el-form-item>
	    <el-form-item label="性别">
			<el-radio-group v-model="editForm.sex">
				<el-radio class="radio" :label=1>男</el-radio>
				<el-radio class="radio" :label=0>女</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="年龄">
			<el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
		</el-form-item>
		<el-form-item label="生日">
			<el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
		</el-form-item>
		<el-form-item label="地址">
			<el-input type="textarea" v-model="editForm.addr"></el-input>
		</el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click.native="dialogFormVisible=false">取消</el-button>
		<el-button v-if="dialogStatus=='create'" type="primary" @click="createData">添加</el-button>
        <el-button v-else type="primary" @click="updateData">修改</el-button>
	  </div>
	</el-dialog>
  </div>
</template>

<script>
// import dialog from '@/components/dialog.vue'
import utils from '@/utils/table'
export default {
	data(){
		return{
			filters: {
		        name: ''
		    },
		    users: [],   //用户列表
            total: 0,    //用来分页，查询到的数据总数
            page: 1,    //当前页
            sels: [], // 列表选中列

            dialogStatus: '',   //同textMap一起使用，判断传入标题
		    textMap: {
		       create: '新建',
		       update: '编辑'
		    },
            editForm: {      //编辑页面数据
	          id: '0',
	          name: '',
	          sex: 1,
	          age: 0,
	          birth: '',
	          addr: ''
	        },
            dialogFormVisible: false,    //新增或编辑页面是否显示
            editFormRules:{
            	name: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
            }
		}
	},
	created(){
		console.log(this.textMap['update'])
	},
	components:{
	    // "t-dialog":dialog
	},
	methods:{
		//获取用户列表
		getUsers(){
			const para = {
		        page: this.page,
		        name: this.filters.name
		    }
			this.$api.table.getUserListPage(para).then(res=>{
				console.log('获取用户列表success',res)
				this.total = res.data.total
                this.users = res.data.users
			}).catch(err=>{
				console.log(err)
			})
		},
		//查询
		search(){
			this.page=1
			this.getUsers()
		},
		// 性别显示转换
	    formatSex: function(row, column) {
	      return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知'
	    },
	    //全选多选单选
		selsChange(val){
			this.sels = val
		},
		// 显示新增界面
		handleAdd(){
			this.dialogStatus = 'create'
			this.dialogFormVisible = true
			this.editForm = {
			  id:'0',
	          name: '',
	          sex:1,
	          age:'0',
	          birth:'',
	          addr: ''
	        }
		},
		// 显示编辑界面
	    handleEdit(index, row) {
	    	console.log(index,row);
	    	this.dialogStatus = 'update';
	    	this.dialogFormVisible = true
	    	this.editForm = Object.assign({}, row)     //导入现有字段的关键一步

	    },
	    //删除单个用户
	    handleDel(index, row) {
	    	console.log(index,row);
	    	this.$confirm('确认删除该记录吗?', '提示', {
		        type: 'warning'
		    }).then(()=>{
		    	  const para = { id: row.id }
		          this.$api.table.removeUser(para).then(res => {
		            this.$message({
		              message: '删除成功',
		              type: 'success'
		            })
		            this.getUsers()
		          })
		    }).catch(()=>{})
	    },
	    //切换选中页面
	    handleCurrentChange(val) {
	      this.page = val
	      this.getUsers()
	    },
	    //批量删除
	    batchRemove(){
	    	var ids = this.sels.map(item=>item.id).toString()   //map找出要删除用户的id
	    	console.log('要删除的用户id',ids);
	    	this.$confirm('确认删除选中记录吗？', '提示', {
		        type: 'warning'
		    }).then(()=>{
		    	const para = { ids: ids }
		    	this.$api.table.batchRemoveUser(para).then(res=>{
		    		this.$message({
		              message: '删除成功',
		              type: 'success'
		            })
		    		this.getUsers()
		    	})
		    }).catch(()=>{})
	    },
	    //添加
	    createData(){
	    	// valid为true则可以完成新增，为false则拒绝执行
	    	this.$refs.editForm.validate(valid=>{
	    		// console.log(valid);
	    		if(valid){
	    			this.$confirm('确认提交吗？','提示',{})
	    			.then(()=>{
	    				this.editForm.id= (Math.random() * 10000000).toString(16).substr(0, 5) + '-' + (new Date()).getTime() + '-' + Math.random().toString().substr(2, 5)    //mock a id
	    				 console.log(this.editForm.id)
	    				 const para = Object.assign({}, this.editForm)
                         console.log(para)
                         para.birth = !para.birth || para.birth === ''? '' : utils.formatDate.format(new Date(para.birth),'yyyy-MM-dd')
                         this.$api.table.addUser(para).then(res=>{
                         	this.$message({
			                  message: '提交成功',
			                  type: 'success'
			                })
			                this.$refs['editForm'].resetFields()
			                this.dialogFormVisible = false
			                this.getUsers()
                         })
	    			}).catch(err=>{console.log(err)})
	    		}
	    	})
	    },
	    //编辑
	    updateData(){
	    	this.$refs.editForm.validate(valid=>{
	    		if(valid){
	    			this.$confirm('确认提交吗？','提示',{})
	    			.then(()=>{
	    				const para = Object.assign({},this.editForm)
	    				para.birth = !para.birth || para.birth ===''? '' : utils.formatDate.format(new Date(para.birth), 'yyyy-MM-dd')
	    				this.$api.table.editUser(para).then(res=>{
	    					this.$message({
			                  message: '提交成功',
			                  type: 'success'
			                })
			                this.$refs['editForm'].resetFields()
			                this.dialogFormVisible = false
			                this.getUsers()
	    				})
	    			}).catch(err=>{console.log(err)})
	    		}
	    	})
	    }

	},
	mounted(){
		this.getUsers()
	}
}
</script>

<style lang="scss" scoped>
.page{
	padding: 20px;
    box-sizing: border-box;
    overflow-y: scroll;
}
</style>
