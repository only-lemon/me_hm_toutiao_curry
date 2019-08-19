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
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道: ">
          <!-- 使用全局组件my-channel -->
          <my-channel v-model="formData.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期: ">
          <div class="block">
            <el-date-picker
              v-model="dataArr"
              type="daterange"
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
              @change="changeDate"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="filter()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 卡片之结果区域 -->
    <el-card>
      <div slot="header">根据筛选条件共查询到 {{total}} 条结果：</div>
      <!-- 表格组件 -->
      <el-table :data="articles">
        <el-table-column label="封面" width="180">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" fit="cover" style="width:120px;height:80px">
              <div slot="error">
                <img src="../../assets/images/error.gif" alt style="width:120px;height:80px" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="primary" @click="editArticle(scope.row.id)" icon="el-icon-edit" plain circle></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              plain
              circle
              @click="delete_(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <div style="text-align:center;margin-top:30px;">
        <el-pagination
          background
          layout="prev, pager, next, total"
          :total="total"
          :page-size="formData.per_page"
          :current-page="formData.page"
          @current-change="changePage"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
// import breadCrumb from '@/components/breadcrumb'
export default {
  // 注册,挂载局部组件
  // 注释掉是因为已经把所有公共级别的组件封装到了一个插件中
  // 此插件的功能就是注册组件为全局组件，使用的时候不用在每个组件中再导入
  // components: {
  //   breadCrumb
  // },

  data () {
    return {
      formData: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },

      // 频道下拉选项数据
      // channelOptions: [],

      // 日期数据
      dataArr: '',

      // 结果区域需要显示的数据
      articles: [],

      // 总计文章数量
      total: 0
    }
  },
  created () {
    // 当vue实例被创建后,当组件被创建成功后,第一时间拉取后台数据,
    // 在这里此时拉取的是文章频道的相关数据
    // this.gainArticleChannel()

    // 在此拉取所有文章列表的相关数据
    this.gainAllArticle()
  },
  methods: {
    // 拉取文章频道名称数据方法
    // async gainArticleChannel () {
    //   var {
    //     data: { data: ArticleChannel }
    //   } = await this.$cuicui.get('channels')
    //   // console.log('-------下面是文章频道的东西----------')
    //   // console.log(channelResult)
    //   this.channelOptions = ArticleChannel.channels
    // },

    // 拉取所有文章列表数据方法
    async gainAllArticle () {
      var {
        data: { data: allArticle }
      } = await this.$cuicui.get('articles', { params: this.formData })
      this.articles = allArticle.results
      this.total = allArticle.total_count
    },

    // 当改变页数时刷新对应页数中的数据
    changePage (newPage) {
      this.formData.page = newPage
      this.gainAllArticle()
    },

    // 当点击筛选按钮时进行的操作
    filter () {
      this.formData.page = 1
      this.gainAllArticle()
    },

    // 当用户选择日期后触发的方法
    changeDate (dateArr) {
      console.log(dateArr)
      if (dateArr) {
        this.formData.begin_pubdate = dateArr[0]
        this.formData.end_pubdate = dateArr[1]
      } else {
        this.formData.begin_pubdate = null
        this.formData.end_pubdate = null
      }
    },

    // 删除文章操作
    delete_ (id) {
      this.$confirm('亲，此操作将永久删除该文章, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$cuicui.delete(`articles/${id}`)
          this.$message.success('删除文章成功')
          this.gainAllArticle()
        })
        .catch(() => {})
    },

    // 比阿尼基文章操作
    editArticle (id) {
      this.$router.push({
        path: `/publish?id=${id}`
      })
    }
  }
  // watch: {
  //   'formData.channel_id': function (newVal) {
  //     if (!newVal) this.formData.channel_id = null
  //   }
  // }
}
</script>

<style scoped lang='less'>
.el-card {
  margin-bottom: 20px;
}
</style>
