<template>
	<!-- Dept Page -->
  <div class="dept">
    <h3>图片转 base64 后上传</h3>
  	<el-upload
        ref="imgBroadcastUpload"
        :auto-upload="false" multiple
        :file-list="diaLogForm.imgBroadcastList"
        list-type="picture-card"
        :on-change="imgBroadcastChange"
        :on-remove="imgBroadcastRemove"
        accept="image/jpg,image/png,image/jpeg"
        action="">
        <i class="el-icon-plus"></i>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
    </el-upload>
    <el-button @click="submitData">submitData</el-button>

    <hr>
    
    <h3>用户头像上传</h3>
    <el-upload
	  class="avatar-uploader"
	  action="https://jsonplaceholder.typicode.com/posts/"
	  :show-file-list="false"
	  :on-success="handleAvatarSuccess"
	  :before-upload="beforeAvatarUpload">
	  <img v-if="imageUrl" :src="imageUrl" class="avatar">
	  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
	</el-upload>

	<hr>

	<div>
		<h3>搜索联想学校</h3>
		<input type="text" placeholder="输入学校" @input="insertSchool" v-model="schoolName" value="schoolName">
	    <div v-bind:class="classObject">
			<span v-if="showSchool.length === 0 && schoolName.length > 0">暂无该学校！</span>
			<ul>
			    <li v-for="(v, k) in showSchool" :key="k" v-on:click="selectValue(v)">{{v.name}}</li>
			</ul>
	    </div>
	</div>

	<hr>

  </div>
</template>

<script>
import { uploadImgToBase64,URLImgToBase64 } from '@/utils/base64'

import _ from 'lodash'
import { schoolInfo } from '@/utils/schoolinfo';
import { checkChinese } from '@/utils/schoolReg';

export default {
  name: 'dept',
  data () {
    return {
    	diaLogForm: {
            imgBroadcastList:[],  // 储存选中的图片列表
            imgsStr:''     // 后端需要的多张图base64字符串 , 分割
        },

        imageUrl:'',

        schoolName: '',
        showSchool: [],
	    detailInfo: {},
	    isActive: false
    }
  },
  computed: {
    classObject: function () {
      return {
        active: this.isActive,
        empty: !this.isActive,
      }
    }
  },
  methods:{
  	//图片转 base64 后上传
	// 图片选择后 保存在 diaLogForm.imgBroadcastList  对象中
    imgBroadcastChange (file, fileList) {
        const isLt2M = file.size / 1024 / 1024 < 2  // 上传头像图片大小不能超过 2MB
        if (!isLt2M) {
          this.diaLogForm.imgBroadcastList = fileList.filter(v => v.uid !== file.uid)
          this.$message.error('图片选择失败，每张图片大小不能超过 2MB,请重新选择!')
        } else {
          this.diaLogForm.imgBroadcastList.push(file)
        }
    },
      // 有图片移除后 触发
    imgBroadcastRemove (file, fileList) {
        this.diaLogForm.imgBroadcastList = fileList
    },
    // 提交弹窗数据
    async submitDialogData () {
        const imgBroadcastListBase64 = []
        console.log('图片转base64开始...')
        this.dialogFormLoading = true
        // 并发 转码轮播图片list => base64
        const filePromises = this.diaLogForm.imgBroadcastList.map(async file => {
          if (file.raw) {  // 如果是本地文件
            const response = await uploadImgToBase64(file.raw)
            return response.result.replace(/.*;base64,/, '')
          } else { // 如果是在线文件
            const response = await URLImgToBase64(file.url)
            return response.replace(/.*;base64,/, '')
          }
        })
        // 按次序输出 base64图片
        for (const textPromise of filePromises) {
          imgBroadcastListBase64.push(await textPromise)
        }
        console.log('图片转base64结束...')
        this.diaLogForm.imgsStr = imgBroadcastListBase64.join()
        console.log(this.diaLogForm)
    },
    submitData(){
    	this.submitDialogData()
    },

    // 用户头像上传
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
    beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
    },

    //搜索联想
    insertSchool(e){
    	let nval = e.target.value
	    if (!nval) return

	    this.isActive = checkChinese(nval) && nval.length >= 2
	    let midValue = []
	    if (this.isActive) {
	        let schoolValue = _.flatten(_.cloneDeep(schoolInfo))
	        _.forEach(schoolValue, s => {
	          if (s.name.includes(nval)) midValue.push(s)
	        })
	        if (midValue.length > 5) midValue.splice(5, midValue.length)
	    }
	    this.showSchool = midValue
    },
    selectValue(item){
    	if (!item) return;

    	this.schoolName = item.name
    	this.isActive = false;
    }
  }
}
</script>

<style lang="scss" scoped>
ul>li{
	list-style:none;
}
ul>li:hover{
	background:red;
}
.active {
    display: block;
}
.empty{
    display: none
}
.dept{
	.avatar-uploader {
		/deep/ .el-upload {
			border: 1px dashed #d9d9d9;
		    border-radius: 6px;
		    cursor: pointer;
		    position: relative;
		    overflow: hidden;
		    .avatar-uploader-icon {
			    font-size: 28px;
			    color: #8c939d;
			    width: 178px;
			    height: 178px;
			    line-height: 178px;
			    text-align: center;
			}
			.avatar {
			    width: 178px;
			    height: 178px;
			    display: block;
			}	    
		}
	}
}

</style>
