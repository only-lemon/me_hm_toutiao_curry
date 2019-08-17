<template>
  <div class="container">
    <!-- 卡片之筛选条件区域  -->
    <el-card>
      <!-- 面包屑 -->
      <div slot="header" class="clearfix">
        <bread-crumb>内容管理</bread-crumb>
      </div>
      <!-- form表单布局 -->
      <el-form label-width="80px" size="small">
        <el-form-item label="状态: ">
          <el-radio-group v-model="formData.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="1">草稿</el-radio>
            <el-radio :label="2">待审核</el-radio>
            <el-radio :label="3">审核通过</el-radio>
            <el-radio :label="4">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道: ">
          <el-select v-model="formData.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期: ">
          <div class="block">
            <el-date-picker
              v-model="dataArr"
              type="daterange"
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 卡片之结果区域 -->
    <el-card>
      <div slot="header">根据筛选条件共查询到 0 条结果：</div>
      <!-- 表格组件 -->
      <el-table :data="articles">
        <el-table-column
          prop="id"
          label="文章编号"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          width="180"
        >
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <div style="text-align:center;margin-top:30px;">
        <el-pagination background layout="prev, pager, next, total" :total="31"></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
// import breadCrumb from '@/components/breadcrumb'
export default {
  // 注册,挂载局部组件
  // 注释掉是因为已经把所有公共级别的组件封装到了一个插件中
  // 此插件的功能就是注册组件为全局组件，使用的时候不用再每个组件中再导入
  // components: {
  //   breadCrumb
  // },

  data () {
    return {
      formData: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },

      // 频道下拉选项数据
      channelOptions: [{ label: 'js', value: '1000' }],

      // 日期数据
      dataArr: [],

      // 结果区域需要显示的数据
      articles: [
        { id: 1000, date: '2019-10-10' },
        { id: 1001, date: '2019-10-10' },
        { id: 1002, date: '2019-10-10' }
      ]
    }
  }
}
</script>

<style scoped lang='less'>
  .el-card{
    margin-bottom: 20px;
  }
</style>
