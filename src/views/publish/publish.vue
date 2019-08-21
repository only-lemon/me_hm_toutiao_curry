<template>
  <div class='container'>
    <el-card>
      <div slot="header">
        <bread-crumb>发布文章</bread-crumb>
      </div>
      <el-form label-width="100px">
        <el-form-item label="标题: ">
          <el-input v-model="publishArtilceFormData.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容: ">富文本</el-form-item>
        <el-form-item label="封面: ">
          <el-radio-group v-model="publishArtilceFormData.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div class="img-btn">
            <img src="../../assets/images/default.png" alt="">
          </div>
        </el-form-item>
        <el-form-item label="频道: ">
          <!-- 使用自己之前封装好的频道组件 -->
          <my-channel v-model="publishArtilceFormData.channel_id"></my-channel>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">发表</el-button>
          <el-button type="info">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      publishArtilceFormData: {
        // 频道ID数据
        channel_id: null,

        // 文章标题数据
        title: null,

        // 封面数据
        cover: {
          type: 1
        }
      }
    }
  }
}
</script>

<style scoped lang='less'>
.img-btn{
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  img{
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
