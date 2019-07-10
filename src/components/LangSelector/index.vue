<template>
	<el-dropdown @command="handleCommand">
      <span class="el-dropdown-link lang-inner">
        <span id="language">中文</span><i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="zh:中文">中文</el-dropdown-item>
        <el-dropdown-item command="en:English">English</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
export default{
	methods:{
		//语言切换
        handleCommand(command){
          let array = command.split(':')   //转换为数组
          let lang = array[0] === '' ? 'zh' : array[0]
          this.$i18n.locale = lang
          let label = array[1]
          document.getElementById("language").innerHTML = label
        }
	}
}
</script>