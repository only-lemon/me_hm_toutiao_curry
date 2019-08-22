<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <bread-crumb>粉丝管理</bread-crumb>
      </div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">
          <div class="fans-list">
            <div class="fans-item" v-for="item in fansList" :key="item.id.toString()">
              <el-avatar style="width:80px;height:80px" :src="item.photo"></el-avatar>
              <p style="font-size:12px">{{item.name}}</p>
              <el-button plain type="primary" size="mini">+关注</el-button>
            </div>
          </div>
          <el-pagination
            style="margin-top:20px"
            v-if="total > requestParams.per_page"
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="requestParams.per_page"
            :current-page="requestParams.page"
            @current-change="changePager"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="chart">
          <div ref="dom" style="width:600px;height:400px"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
// 导入echarts,,,js代码,echarts,,,js文件,,,echarts,,,js模块,,,echarts,,,js包
// 老师还叫echarts是数据可视化js插件,,,还叫js插件,,,插入一个文件,,,插入一个里面是js代码的文件
// 插入里面是一个js代码的文件,,,就当然运行里面的js代码了,,,变量啥的,,,函数方法啥的当然就可以在当前写js代码的文件中使用了呗,,,
import echarts from 'echarts'

export default {

  data () {
    return {
      requestParams: {
        page: 1,
        per_page: 24
      },
      activeName: 'chart',
      total: 0,
      fansList: []
    }
  },

  created () {
    this.getFansList()
  },

  mounted () {
    const dom = this.$refs.dom
    const myChart = echarts.init(dom)
    const option = {
      color: ['hotpink'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
    myChart.setOption(option)
  },

  methods: {
    // 分页
    changePager (newPage) {
      this.requestParams.page = newPage
      this.getFansList()
    },
    async getFansList () {
      const {
        data: { data }
      } = await this.$cuicui.get('followers', { params: this.requestParams })
      this.fansList = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>
.fans-item {
  text-align: center;
  width: 136px;
  height: 170px;
  border: 1px dashed #ddd;
  padding-top: 15px;
  display: inline-block;
  margin-right: 25px;
  margin-bottom: 20px;
}
</style>
