import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/Login'
import Home from '@/views/Home'
import NotFound from '@/views/Error/404'
import Main from '@/views/Main'
import User from '@/views/SysManage/User'
import Menu from '@/views/SysManage/Menu'
import Dept from '@/views/SysManage/Dept'
import Role from '@/views/SysManage/Role'
import Material from '@/views/SysManage/Material'
import Log from '@/views/SysManage/Log'

import Server from '@/views/Monitor/Server'
import Task from '@/views/Monitor/Task'

import Clipboard from '@/views/clipboard'

Vue.use(Router)

const router = new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
    {
      path: '/',
      component: Home,
      name: '首页',
      children:[
         {
            path:'home',
            component:Main,
            name:'总统介绍'
         },{
            path:'user',
            component:User,
            name:'用户管理'
         },{
            path:'menu',
            component:Menu,
            name:'菜单管理'
         },{ 
            path: 'dept', 
            component: Dept, 
            name: '机构管理' 
         },{ 
            path: 'role', 
            component: Role, 
            name: '角色管理' 
         },{
            path:'material',
            component:Material,
            name:'素材管理'
         },{
            path:'log',
            component:Log,
            name:'日志管理'
         },{
            path: 'server', 
            component: Server, 
            name: '服务监控' 
         },{
            path: 'task', 
            component: Task, 
            name: '任务监控'
         },{
            path: 'clipboard', 
            component: Clipboard, 
            name: '剪贴板'
         }
      ]
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/404',
      name: '未找到',
      component: NotFound
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})

router.beforeEach((to, from, next)=>{
    let user = sessionStorage.getItem('user')
    if(to.path == '/login'){
        //若访问登录界面
        if(user){
            next('/home')
        }else{
            next()
        }
    }else{
      //若访问非登录界面
      if(!user){
          next('/login')
      }else{
          next()
      }
    }
})

export default router;