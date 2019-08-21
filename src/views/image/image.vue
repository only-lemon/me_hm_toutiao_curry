<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <bread-crumb>素材管理</bread-crumb>
      </div>
      <div class="btn-box">
        <el-radio-group v-model="requestParams.collect" @change="changeISCollect()" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" size="small" @click="openDialog()" style="float:right">添加素材</el-button>
      </div>
      <div class="img-list">
        <div class="img-item" v-for="item in images" :key="item.id">
          <img :src="item.url" />
          <!-- 要解析标签上的所有内容,难道标签上的属性就不属于标签上的内容了吗??? -->
          <!-- 只有innerHTML innerText才算是内容吗???不见得吧!!! -->
          <div class="footer" v-show="!requestParams.collect">
            <span @click="toggleISCollect(item)" class="el-icon-star-on" :class="{selected:item.is_collected}"></span>
            <span @click="delete_image_fodder(item.id)" class="el-icon-delete"></span>
          </div>
        </div>
      </div>
      <!-- page-size 这是一个起到计算总的页码数量的作用的属性 这个行内自定义属性存在的意义是根据 总条数total 和 每页显示多少条 来计算出一共有多少页 并且在视图中显示多个页的按钮出来,,, -->
      <el-pagination
        background
        layout="prev, pager, next, total"
        :total="total"
        :page-size="requestParams.per_page"
        :current-page="requestParams.page"
        @current-change="changePage"
      ></el-pagination>
      <!-- v-if="total > requestParams.per_page" -->
    </el-card>
    <!-- 上传素材所需要的两个组件 一个对话框组件 一个上传组件 -->
      <!-- 对话框组件 -->
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <!-- 上传组件 -->
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="headers"
        :show-file-list="false"
        :on-success="handleUploadSuccess"
        name="image"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import setGetUInfo from '@/store/SessionStorage'
export default {
  data () {
    return {
      requestParams: {
        collect: false,
        page: 1,
        per_page: 10
      },

      // 素材列表数据
      images: [],

      // 素材数据总条数
      total: 0,

      // 控制对话框的显示与隐藏
      dialogVisible: false,

      // 预览图片路径
      imageUrl: '',

      // 上传图片时的请求头重新设置下,因为在此不是我们自己发送请求,
      /**
       * 而是elementUI内部帮我们发送请求
       */
      headers: {
        Authorization: `Bearer ${setGetUInfo.getUserToken().token}`
      }

    }
  },
  created () {
    // 拉去后台全部素材数据
    this.gainImages()
  },
  methods: {
    // 拉去后台所有文章素材图片方法
    async gainImages () {
      var {
        data: { data: allImages }
      } = await this.$cuicui.get('user/images', { params: this.requestParams })
      this.images = allImages.results

      // 获取素材数据总条数
      this.total = allImages.total_count
    },

    // 切换全部或者收藏时请求数据方法
    changeISCollect () {
      this.requestParams.page = 1
      this.gainImages()
    },

    // 当点击第几页时,向后台请求回来第几页的数据来
    changePage (newPage) {
      this.requestParams.page = newPage
      // 因为参数发生变化 重新拉取数据
      this.gainImages()
    },

    // 控制对话框的显示与隐藏的方法
    openDialog () {
      this.dialogVisible = true
    },

    // 上传图片素材成功时要做的事情的方法
    handleUploadSuccess (response) {
      // 预览图片
      this.imageUrl = response.data.url
      // 提示上传成功信息
      this.$message.success('上传成功')
      // 2s后关闭对话框
      window.setTimeout(() => {
        this.dialogVisible = false
        // 回到第一页
        this.requestParams.page = 1
        // 重新拉取素材数据
        this.gainImages()
        // 清除上传图片组件上的预览图片效果
        this.imageUrl = ''
      }, 2000)
    },

    // 图片收藏功能实现方法
    async toggleISCollect (item) {
      var { data: { data: CollectState } } = await this.$cuicui.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      // 提示用户添加/取消收藏成功与否
      this.$message.success(CollectState.collect ? '添加收藏成功' : '取消收藏成功')
      /**
       * 局部更新当前图片的状态即可
       * 局部更新当前图片的状态 : 指的就是星星图标的style样式罢了,只是为了用户看到的
       * 样式是红还是白 代表的是收藏还是没收藏
       * 其实当点击完之后,是否已经收藏的结果已经存到服务器上了,,在此更新图片的状态
       * 是为了用户看到后知道这个素材这张图片是否已经收藏,,,
       */
      item.is_collected = CollectState.collect
    },

    // 删除图片素材功能方法
    delete_image_fodder (id) {
      // 添加一个elementUI弹框用来提醒用户是否确认此操作
      this.$confirm('此操作将永久删除该素材, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$cuicui.delete('user/images/' + id)
        this.$message.success('删除成功')
        this.gainImages()
      }).catch(() => {
        console.log('这儿呢,啥也不用干,,,')
      })
    }
  }
}
</script>

<style scoped lang='less'>
.img-list {
  margin-top: 20px;
}
.img-item {
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  position: relative;
  display: inline-block;
  margin-right: 50px;
  margin-bottom: 20px;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
  .footer {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 30px;
    line-height: 30px;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    text-align: center;
    width: 100%;
    span {
      margin: 0 20px;
      &.selected {
        color: hotpink;
      }
    }
  }
}
</style>
