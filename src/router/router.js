import Vue from 'vue'
import VueRouter from 'vue-router'
import LOGIN from '@/views/login/login'
import HOME from '@/views/home/home'
import WELCOME from '@/views/welcome/welcome'

// 每每要想在Vue项目中使用一个插件进来必须use注册一下
Vue.use(VueRouter)

// 创建router路由管理器的实例,对象,车的实例,车的对象
var router = new VueRouter({
  // 配置选项需要传入对象的形式来进行配置

  // 配置路由规则
  routes: [
    { path: '/',
      component: HOME,
      // 一个路由规则只服务于一个组件
      children: [{
        path: '/',
        component: WELCOME
      }]
    },
    {
      path: '/login',
      component: LOGIN
    }
  ]
})

// 导出路由管理器的实例router
export default router
