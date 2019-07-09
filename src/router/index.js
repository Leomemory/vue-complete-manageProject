import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/Login'
import Home from '@/views/Home'
import NotFound from '@/views/404'
import Main from '@/views/Main'
import User from '@/views/User'
import Menu from '@/views/Menu'
import Dept from '@/views/Dept'
import Role from '@/views/Role'

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
      name: '首页',
      component: Home,
      children:[
         {
            path:'',
            component:Main,
            name:'总统介绍'
         },{
            path:'/user',
            component:User,
            name:'用户管理'
         },{
            path:'/menu',
            component:Menu,
            name:'菜单管理'
         },{ 
            path: '/dept', 
            component: Dept, 
            name: '机构管理' 
         },{ 
            path: '/role', 
            component: Role, 
            name: '角色管理' 
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
    }
  ]
})

router.beforeEach((to, from, next)=>{
    let user = sessionStorage.getItem('user')
    if(to.path == '/login'){
        //若访问登录界面
        if(user){
            next({path:'/'})
        }else{
            next()
        }
    }else{
      //若访问非登录界面
      if(!user){
          next({path:'/login'})
      }else{
          next()
      }
    }
})

export default router;