<template>
	<aside class="aside" :class="isCollapse?'logo-collapse-width':''">
        <!--导航菜单-->
        <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" :unique-opened="true" :router="true" @select="handleselect" :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">{{$t("sys.sysMng")}}</span>
            </template>
            <el-menu-item index="/user" @click="$router.push('/user')">{{$t("sys.userMng")}}</el-menu-item>
            <el-menu-item index="/menu" @click="$router.push('/menu')">{{$t("sys.menuMng")}}</el-menu-item>
            <el-menu-item index="/dept" @click="$router.push('/dept')">{{$t("sys.deptMng")}}</el-menu-item>
            <el-menu-item index="/role" @click="$router.push('/role')">{{$t("sys.roleMng")}}</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
               <i class="el-icon-menu"></i>
               <span slot="title">{{$t("sys.sysMonitor")}}</span>
            </template>
            <el-menu-item index="/server" @click="$router.push('/server')">{{$t("sys.ServiceMonitor")}}</el-menu-item>
            <el-menu-item index="/task" @click="$router.push('/task')">{{$t("sys.TaskMonitor")}}</el-menu-item>
          </el-submenu>
          <el-menu-item index="/clipboard" @click="$router.push('/clipboard')">
            <i class="el-icon-document"></i>
            <span slot="title">{{$t("sys.clipboard")}}</span>
          </el-menu-item>
          <!-- <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">{{$t("sys.Nav4")}}</span>
          </el-menu-item> -->
        </el-menu>
    </aside>
</template>

<script>
export default{
  data(){
    return{
      activeIndex:""
    }
  },
	props:{
		isCollapse:{
			type:Boolean,
			default:false
		}
	},
  created(){
    this.activeIndex = this.$route.path
  },
	methods:{
	    handleselect(index){
        //
	    }
  },
  watch:{
      $route(to,from) {           
        // console.log(this.$route.path);
        this.activeIndex = this.$route.path
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




















