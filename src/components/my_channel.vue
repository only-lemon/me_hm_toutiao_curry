<template>
  <el-select :value="value" clearable placeholder="请选择" @change="alterChannelID">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  data () {
    return {

      // 频道下拉选项数据
      channelOptions: []
    }
  },

  // 用来接收父组件传递过来的值
  props: ['value'],

  created () {
    // 当vue实例被创建后,当组件被创建成功后,第一时间拉取后台数据,
    // 在这里此时拉取的是文章频道的相关数据
    this.gainArticleChannel()
  },
  methods: {
    // 拉取文章频道名称数据方法
    async gainArticleChannel () {
      var {
        data: { data: ArticleChannel }
      } = await this.$cuicui.get('channels')
      // console.log('-------下面是文章频道的东西----------')
      // console.log(channelResult)
      this.channelOptions = ArticleChannel.channels
    },

    // 用来触发input事件,,,子组件传递给父组件的值的方法
    alterChannelID (selectValue) {
      // 后端不支持空字符串问题
      if (!selectValue) selectValue = null
      // 提交给父组件的数据
      this.$emit('input', selectValue)
    }

  }
  // watch: {
  //   'myValue': function (newVal) {
  //     if (!newVal) this.myValue = null
  //   }
  // }
}
</script>

<style lang="less" scoped>
</style>
