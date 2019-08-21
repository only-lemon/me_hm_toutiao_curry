<template>
  <div class='publishArticle_container'>
    <el-card>
      <div slot="header">
        <bread-crumb>{{articleId?'修改':'发布'}}文章</bread-crumb>
      </div>
      <el-form label-width="100px">
        <el-form-item label="标题: ">
          <el-input v-model="publishArtilceFormData.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容: ">
          <!-- 使用富文本插件 -->
          <quill-editor v-model="publishArtilceFormData.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面: ">
          <el-radio-group v-model="publishArtilceFormData.cover.type" @change="changeType">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- <div class="img-btn">
            <img src="../../assets/images/default.png" alt="">
          </div> -->
          <!-- 将来在此使用封面组件 -->
          <div v-if="publishArtilceFormData.cover.type === 1">
            <my-cover v-model="publishArtilceFormData.cover.images[0]"></my-cover>
          </div>
          <div v-if="publishArtilceFormData.cover.type === 3">
            <my-cover v-model="publishArtilceFormData.cover.images[0]"></my-cover>
            <my-cover v-model="publishArtilceFormData.cover.images[1]"></my-cover>
            <my-cover v-model="publishArtilceFormData.cover.images[2]"></my-cover>
          </div>
        </el-form-item>
        <el-form-item label="频道: ">
          <!-- 使用自己之前封装好的频道组件 -->
          <my-channel v-model="publishArtilceFormData.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="!articleId">
          <el-button type="primary" @click="submit(0)">发表</el-button>
          <el-button type="info"    @click="submit(1)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="success" @click="update(0)">修改</el-button>
          <el-button type="info"    @click="update(1)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  created () {
    this.articleId = this.$route.query.id
    // 如果ID在地址栏存储  代表是修改逻辑  才有必要去获取文章数据
    if (this.articleId) {
      this.getArticle()
    }
  },

  methods: {
    // 获取文章数据
    async getArticle () {
      const { data: { data } } = await this.$cuicui.get('articles/' + this.articleId)
      this.publishArtilceFormData = data
    },
    // 切换封面类型 重置图片数据
    changeType () {
      this.publishArtilceFormData.cover.images = []
    },

    // 发表还是存入草稿的业务逻辑方法
    async submit (draft) {
      // 发请求
      await this.$cuicui.post(`articles?draft=${draft}`, this.publishArtilceFormData)
      // 提示
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      // 跳转内容管理
      this.$router.push('/article')
    },

    // 修改或者存入草稿的方法
    async update (draft) {
      // 发请求
      await this.$cuicui.put(`articles/${this.articleId}?draft=${draft}`, this.publishArtilceFormData)
      // 提示
      this.$message.success(draft ? '修改至草稿成功' : '修改成功')
      // 跳转内容管理
      this.$router.push('/article')
    }

  },

  watch: {
    $route () {
      if (!this.$route.query.id) {
        this.articleId = null
        this.publishArtilceFormData = {
          title: null,
          content: null,
          cover: {
            type: 1,
            images: []
          },
          channel_id: null
        }
      }
    }
  },

  data () {
    return {

      // 发布文章时所需要提交到后台的数据
      publishArtilceFormData: {
        // 频道ID数据
        channel_id: null,

        // 富文本数据
        content: null,

        // 文章标题数据
        title: null,

        // 封面数据
        cover: {
          type: 1,
          images: []
        }
      },

      // 地址栏的文章ID
      articleId: null,

      // 富文本配置选项
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['image']
          ]
        }
      }
    }
  }
}
</script>

<style scoped lang='less'></style>
