import axios from 'axios'
// import Vue from 'vue'
import setGetUInfo from '@/store/SessionStorage'
import JSONBig from 'json-bigint'

// 配置基URL路径
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

// 配置不使用axios默认json.parse去处理后端响应回来的jsjon字符串
axios.defaults.transformResponse = [(data) => {
  try {
    return JSONBig.parse(data)
  } catch (e) {
    return data
  }
}]

// 挂载在Vue原型链上,,,共享给所有Vue创建出来的对象,实例
// 疑问: 如果我在这里把axios给配置挂载Vue原型链上的话,,,我再把此文件引入到main.js中去
// 恰巧main.js中也引入了Vue模块  那我到底是挂载没挂载到原型链上呢???
// 因为我现在是在两个不同的js模块中在做操作,,,执行的顺序该是什么样子的????
// 结论: 在这里是能进行在原型链上的挂载上axios对象的,,,
// 但是不在这挂载,,,因为要在main.js中导入此文件,在此文件中导出的对象在main.js中使用
// 使用的方式就是在main.js上的导入的Vue进行挂载axios对象,,,如果在这里挂载上的话
// 在main.js中就在没地方要是使用此文件导出的变量了,,,又因为eslint的存在,,,
// 当你定义的变量没有使用的话,,,会报红提示你,,,校验你语法不规范,,,定义的变量就要使用,,,
// 否则会导致内存泄漏,,,浪费内存空间的问题,,,
// 综上所述: 是能在此挂载到Vue的原型链上的,,,但是不在这个文件中挂载,,,
// Vue.prototype.$cuicui = axios

// 配置使用axios每次发送请求时带着的一个请求头,,,
// 作用,,,目的,,,携带token令牌,,,具有向后台要数据的权限
/*  当页面刷新的时候就会执行入口文件 集成所有文件的文件main.js,,,就会执行设置请求头中的
    获取sessionstorage里面的数据,,,但是此时还没有登录,,,sessionstorage里面还没有存储user信息  所以获取到的是defined ,,但是当你这个时候再去登录
    上即使存上了session信息也已经晚了 这句代码不刷新的话 就不会再执行了
*/
// axios.defaults.headers.Authorization = `Bearer ${setGetUInfo.getUserToken().token}`

// ---------------------------------------------------------------------------------

// 配置axios的请求拦截器,,,
// 这才是配置使用axios每次发送请求时带着的一个请求头过去,,,
// 这样的话就有权限能向后台要数据了,,,
axios.interceptors.request.use(axiosDefaults => {
  axiosDefaults.headers.Authorization = `Bearer ${setGetUInfo.getUserToken().token}`
  return axiosDefaults
}, error => {
  return Promise.reject(error)
})

// ---------------------------------------------------------------------------------

// 配置axios的响应拦截器,,,
// axios响应拦截器  在响应来的路上,没来到之前需要去做的一些事情
axios.interceptors.response.use(response => response, error => {
  if (error.response.status === 401) window.location.hash = '#/login'
  // 说明后台的token有效期到时间了需要我们重新登录重新refresh一下token的值了
  return Promise.reject(error)
})

// ---------------------------------------------------------------------------------

// 将配置好的axios导出
export default axios
