import Vue from 'vue'
import App from './App.vue'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router/router'
import '@/style/global.css'
import axios from 'axios'

// 挂载在Vue原型链上,,,共享给所有Vue创建出来的对象,实例
Vue.prototype.$cuicui = axios

// 此条语句,配置生产环境下尽量少提示日志???
Vue.config.productionTip = false
// 每每要想在Vue项目中使用一个插件进来必须use注册一下
Vue.use(elementUi)

new Vue({
  render: h => h(App),
  // 挂载router路由管理器的实例,交给Vue开发人员去处理
  router
}).$mount('#app')
