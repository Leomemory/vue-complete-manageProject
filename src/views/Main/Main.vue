<template>
	<section class="content-container">
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

}
</script>

<style lang="scss">
.content-container {
  flex: 1;
  padding: 0px;
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
</style>