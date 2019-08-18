import Vue from 'vue'
import App from './App.vue'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router/router'
import '@/style/global.css'
// import axios from 'axios'
import axios from '@/axios/apI_axios'
import myPlugin from '@/components/registerCommonComponentsASGlobalComponent'

// 挂载在Vue原型链上,,,共享给所有Vue创建出来的对象,实例
Vue.prototype.$cuicui = axios

// 注册自己封装成的插件     --->  自己封装承成的插件  使用成功!!!
Vue.use(myPlugin)

console.log('---------------下面有请Vue闪亮登场------------------')
console.dir(Vue)
// var Vue_ = Vue

// 此条语句,配置生产环境下尽量少提示日志???
Vue.config.productionTip = false
// 每每要想在Vue项目中使用一个插件进来必须use注册一下
Vue.use(elementUi)

var app_ = new Vue({
  render: h => h(App),
  // 挂载router路由管理器的实例,交给Vue开发人员去处理
  router
}).$mount('#app')

console.log('---------------下面有请app_闪亮登场------------------')
console.dir(app_)
console.log(app_.scope)
