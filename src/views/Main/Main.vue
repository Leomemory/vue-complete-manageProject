<template>
	<section class="content-container" :class="isCollapse?'content-container-width':''">
        <div class="grid-content bg-purple-light">
            <el-col :span="24" class="breadcrumb-container">
                <el-breadcrumb separator="/" class="breadcrumb-inner">
                    <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                        {{ item.name }}
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
            <el-col :span="24" class="content-wrapper">
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </el-col>
        </div>
    </section> 
</template>

<script>
export default{
  props:{
    isCollapse:{
      type:Boolean,
      default:false
    }
  }
}
</script>

<style lang="scss">

.content-container{
  padding: 0px;
  width:100%;
  min-height: 100%;
  transition: margin-left .28s;
  margin-left: 230px;
  .breadcrumb-container {
    height: 28px;
    .breadcrumb-inner {
        padding: 10px;  
        border-color: rgba(38, 86, 114, 0.2);
        border-bottom-width: 1px;
        border-bottom-style: solid;
        background: rgba(138, 158, 170, 0.2);
    }
  }
  .content-wrapper {
    background-color: #fff;
    box-sizing: border-box;
  }
}
.content-container-width{
  margin-left:65px;
  overflow-y:a
}
</style>
