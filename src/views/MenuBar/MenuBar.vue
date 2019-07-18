<template>
	<aside class="aside" :class="isCollapse?'logo-collapse-width':''">
        <!--导航菜单-->
        <el-menu default-active="1-2" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect" :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">{{$t("sys.sysMng")}}</span>
            </template>
            <el-menu-item index="1-1" @click="$router.push('user')">{{$t("sys.userMng")}}</el-menu-item>
            <el-menu-item index="1-2" @click="$router.push('menu')">{{$t("sys.menuMng")}}</el-menu-item>
            <el-menu-item index="1-3" @click="$router.push('dept')">{{$t("sys.deptMng")}}</el-menu-item>
            <el-menu-item index="1-4" @click="$router.push('role')">{{$t("sys.roleMng")}}</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
               <i class="el-icon-menu"></i>
               <span slot="title">{{$t("sys.sysMonitor")}}</span>
            </template>
            <el-menu-item index="2-1" @click="$router.push('server')">{{$t("sys.ServiceMonitor")}}</el-menu-item>
            <el-menu-item index="2-2" @click="$router.push('task')">{{$t("sys.TaskMonitor")}}</el-menu-item>
          </el-submenu>
          <el-menu-item index="3" @click="$router.push('clipboard')">
            <i class="el-icon-document"></i>
            <span slot="title">{{$t("sys.clipboard")}}</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">{{$t("sys.Nav4")}}</span>
          </el-menu-item>
        </el-menu>
    </aside>
</template>

<script>
import { mapState } from 'vuex'
export default{
	props:{
		isCollapse:{
			type:Boolean,
			default:false
		}
	},
  computed:{
    ...mapState({
       menuTree:state=>state.menu.menuTree
    })
  },
	methods:{
		  handleopen(key, keyPath){
	      console.log(key, keyPath);
	    },
	    handleclose(key, keyPath){
	      console.log(key, keyPath);
	    },
	    handleselect(a, b){
	      // console.log('handleselect')
	    },
	    select(){
	      //
	    }
	}
}
</script>

<style lang="scss">

.aside{
    transition: width .28s;
    width: 230px;
    position: fixed;
    top: 60px;
    bottom: 0;
    left: 0;
    z-index: 101;
    background:#fff;
    overflow: hidden;
    .el-menu {
      height: 100%;
      text-align: left;
    }
}
.logo-collapse-width{
  flex: 0 0 65px;
  width: 65px;
}
</style>




















