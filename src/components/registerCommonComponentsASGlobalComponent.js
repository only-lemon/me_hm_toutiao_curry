
/*
 *  Author  : 崔文情
 *  Date    : 2019/8/17 08:55 Sat
 *  Email   : 2865653500@qq.com
 *  Version : V1.0.0
 */

/* 模块功能: 注册components目录下的组件为全局组件, */
/* 因为components目录下的组件都为公共级别的组件 */
/* 目的: 就是为了提取封装,在别处使用公共级别的组件时,直接使用无需在每个文件中再一次次导入 */

import breadCrumb from '@/components/breadcrumb'
import MyChannel from '@/components/my_channel'

export default {
  install (ISVue) {
    console.log('我是注册components目录下的组件为全局组件的函数,此时我被调用了!!!')
    // 参数1为: 组件名称
    // 参数2位: 组件,template,视图区域,每个Vue创建出来的实例,对象
    ISVue.component(breadCrumb.name, breadCrumb)
    ISVue.component(MyChannel.name, MyChannel)
  }
}
