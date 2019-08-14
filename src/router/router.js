import Vue from 'vue'
import VueRouter from 'vue-router'
import LOGIN from '@/views/login/login'
import HOME from '@/views/home/home'
import WELCOME from '@/views/welcome/welcome'
import IS404 from '@/views/404/404'
import SETTING from '@/views/setting/setting'
import FANS from '@/views/fans/fans'
import COMMENT from '@/views/comment/comment'
import PUBLISH from '@/views/publish/publish'
import IMAGE from '@/views/image/image'
import ARTICLE from '@/views/article/article'
import setGetUserInformation from '@/store/SessionStorage'

// 每每要想在Vue项目中使用一个插件进来必须use注册一下
Vue.use(VueRouter)

// 创建router路由管理器的实例,对象,车的实例,车的对象
var router = new VueRouter({
  // 配置选项需要传入对象的形式来进行配置

  // 配置路由规则
  routes: [
    // 配置用户瞎写的路由,,,对应上的路由规则,,,再对应上的404页面
    {
      path: '*',
      component: IS404
    },
    { path: '/',
      component: HOME,
      // 一个路由规则只服务于一个组件
      children: [
        {
          path: '/',
          component: WELCOME
        },
        {
          // 路由规则数组,,,中的每一个对象就是对应上的就是一个路由规则
          path: '/article',
          component: ARTICLE
        },
        {
          path: '/image',
          component: IMAGE
        },
        {
          path: '/publish',
          component: PUBLISH
        },
        {
          path: '/comment',
          component: COMMENT
        },
        {
          path: '/fans',
          component: FANS
        },
        {
          path: '/setting',
          component: SETTING
        }
      ]
    },
    {
      path: '/login',
      component: LOGIN
    },
    // 配置用户瞎写的路由,,,对应上的路由规则,,,再对应上的404页面
    {
      path: '*',
      component: IS404
    }

  ]
})

// 拦截未登录路由跳转
// 导航守卫,,,每次跳转路由前要做的事情在此去做!!!
router.beforeEach((to, from, next) => {
  console.log('------to: 之--------- 用来接收目标路由对象 ------ 源码中传过来的参数为: route变量 -------')
  console.log(to)
  console.log('------from: 之--------- 来接收当前路由对象 ------ 源码中传过来的参数为: current变量 -------')
  console.log(from)
  console.log('------next: 之--------- 将来用来接收一个函数作为实参的形参 ------ 源码中传过来的参数为: function(to){...}函数 -------')
  console.log(next)
  if (to.path !== '/login' && !setGetUserInformation.getUserToken().token) return next('/login')
  next()
})

// 导出路由管理器的实例router
export default router
