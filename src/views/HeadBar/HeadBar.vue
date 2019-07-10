<template>
    <el-col :span="24" class="header">
        <el-col :span="5" class="logo" :class="isCollapse?'logo-collapse-width':'logo-width'">
            <img :src="this.logo" /> {{isCollapse?sysName:sysName}}
        </el-col>
        <el-col :span="1">
            <div class="tools" @click.prevent="collapse">
                <i class="el-icon-menu"></i>
            </div>
        </el-col>
        <el-col :span="10">
            <div class="hearNavBar">
              <el-menu :default-active="activeIndex" class="el-menu-demo" background-color="#4b5f6e" text-color="#fff"
                  active-text-color="#ffd04b" mode="horizontal" @select="handleSelectHearNavBar">
                <el-menu-item index="1" @click="$router.push('/')">{{$t("common.home")}}</el-menu-item>
                <el-menu-item index="2">{{$t("common.msgCenter")}}</el-menu-item>
                <el-menu-item index="3">{{$t("common.doc")}}</el-menu-item>
              </el-menu>
            </div>
        </el-col>
        <el-col :span="6" class="userinfo">
            <!-- 主题颜色切换 -->
            <span class="el-dropdown-link">
               <theme-picker></theme-picker>
            </span>

            <!-- 中英文语言切换 -->
            <lang-selector></lang-selector>

            <el-dropdown trigger="hover">
                <span class="el-dropdown-link userinfo-inner"><img :src="this.userAvatar" /> {{userName}}</span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>{{$t("common.myMsg")}}</el-dropdown-item>
                    <el-dropdown-item>{{$t("common.config")}}</el-dropdown-item>
                    <el-dropdown-item divided @click.native="logout">{{$t("common.logout")}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
    </el-col>
</template>

<script>
import ThemePicker from '@/components/ThemePicker'
import LangSelector from '@/components/LangSelector'
import mock from '@/mock/index.js'
export default {
    data(){
        return {
           isCollapse:false,
           logo:null,
           sysName:'',
           activeIndex:'1',
           userAvatar:'',
           userName:''
        }
    },
    components:{
        ThemePicker,
        LangSelector
    },
    mounted(){
        this.sysName = 'Leo'
        this.logo = require('@/assets/logo.png')
        var user = sessionStorage.getItem('user')
        if(user){
            this.userName = user
            this.userAvatar = require('@/assets/user.jpeg')
        }
    },
    methods:{
      //折叠导航栏
      collapse: function() {
          this.isCollapse = !this.isCollapse;
          this.$emit('isCollapse',this.isCollapse)
      },
      handleSelectHearNavBar(key, keyPath){
          console.log(key, keyPath);
      },
      logout(){
          var _this = this;
          _this.$confirm('确定要退出么？','提示',{
             type:'warning'
          }).then(()=>{
             sessionStorage.removeItem('user');
             this.$router.push("/login")
          }).catch(()=>{})
      },
    }
}
</script>

<style lang="scss">
.header {
    height: 60px;
    line-height: 60px;
    background: #4b5f6e;
    color: #fff;
    .userinfo {
      text-align: right;
      padding-right: 15px;
      float: right;
      .lang-inner {
        font-size: 15px;
        cursor: pointer;
        color: #fff;
      }
      .userinfo-inner {
        font-size: 20px;
        cursor: pointer;
        color: #fff;
        img {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          margin: 10px 0px 10px 10px;
          float: right;
        }
      }
    }
    .logo {
      height: 60px;
      font-size: 22px;
      padding-left: 0px;
      padding-right: 0px;
      border-color: rgba(238, 241, 146, 0.5);
      border-right-width: 1px;
      border-right-style: solid;
      background: #4b5f6e;
      text-align: left;
      img {
          width: 40px;
          height: 40px;
          border-radius: 0px;
          margin: 10px 10px 10px 10px;
          float: left;
      }
      .txt {
        color: #fff;
      }
    }
    .logo-width {
      width: 230px;
    }
    .logo-collapse-width {
      width: 65px;
    }
    .tools {
      padding-left: 10px;
      padding-right: 10px;
      text-align: center;
      width: 40px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
    .hearNavBar {
      background: #4b5f6e;
      padding: 0px 0px;
      width: 100%;
      height: 60px;
      line-height: 60px;
      font-size: 29px;
      cursor: pointer;
    }
  }
</style>














