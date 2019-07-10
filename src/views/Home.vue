<template>
  <div class="page">
      <el-row class="container">
        <!-- 头部区域 -->
        <head-bar @isCollapse="isCollapse"></head-bar>

        <el-col :span="24" class="main">
            <!-- 左侧导航菜单栏 -->
            <menu-bar :isCollapse="isCollap"></menu-bar>
            <!-- 右侧主内容区域 -->
            <Main></Main>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import HeadBar from "./HeadBar/HeadBar"
import MenuBar from "./MenuBar/MenuBar"
import Main from "./Main/Main"
export default {
  name: 'Home',
  data(){
    return{
      isCollap:false
    }
  },
  components:{
    HeadBar,
    MenuBar,
    Main
  },
  methods:{
    isCollapse(val){
      this.isCollap = val
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  width: 100%;
  .main {
    display: flex;
    position: absolute;
    top: 60px;  
    bottom: 0px;
    overflow: hidden;
  }
}
</style>













