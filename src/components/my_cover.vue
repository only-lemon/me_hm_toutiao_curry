<template>
  <div class="my_cover_container">
    <!-- 图片按钮,点击之后在素材库选择封面图或者上传一张封面图 -->
    <div class="img-btn" @click="openDialog()">
      <img :src="value || defaultImage" alt />
    </div>
    <!-- 点击图片按钮之后的对话框组件 -->
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <!-- 单选框 -->
          <el-radio-group v-model="reqParams.collect" @change="changeCollect" size="mini">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 列表 -->
          <div class="img-list">
            <div
              class="img-item"
              :class="{selected:selectedImageUrl===item.url}"
              @click="selectedImageUrl=item.url"
              v-for="item in images"
              :key="item.id"
            >
              <img :src="item.url" alt />
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            v-if="total > reqParams.per_page"
            background
            layout="prev, pager, next, total"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="changePager"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleSuccess"
            name="image"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import setGetUInfo from '@/store/SessionStorage'
import defaultImage from '../assets/images/default.png'

export default {
  // 组件名称  将来使用组件的时候自定义标签名字就是这个
  name: 'my-cover',

  // 接受父组件传递过来的地址
  props: ['value'],

  // 当前组件中的数据状态state  --> 突发奇想到了vuex才这么写上这句注释的,,,
  data () {
    return {
      // 点击素材库单选框时向后台发送的请求参数请求素材的所需要的参数
      reqParams: {
        // collect默认为false代表请求全部素材的数据
        // 为true代表请求后台的收藏素材数据
        collect: false,

        // 请求第几页的素材数据回来
        page: 1,

        // 每页显示多少条数据
        per_page: 8

      },

      // 全部素材图片的总条数
      total: 0,

      // 设置请求头因为不是我们发送请求 而是elementUI去发送的请求
      // 所以当时我们设置的headers是没有用的,它elementUI必须从我们这获取到headers
      // 设置在它们用的发送请求的方法上才行
      headers: {
        Authorization: `Bearer ${setGetUInfo.getUserToken().token}`
      },

      // 记录当前你点击的图片素材的URL
      selectedImageUrl: null,

      // 图片素材全部的数据
      images: [],

      // 控制对话框的显示与隐藏  --> 默认隐藏对话框
      dialogVisible: false,

      // 激活tab选项卡的哪一个
      activeName: 'image',

      // 上传成功时的图片地址
      uploadImageUrl: null,

      // 默认图片
      // value: defaultImage,

      defaultImage
    }
  },

  methods: {
    // 点击图片按钮时打开对话框组件的方法
    openDialog () {
      this.dialogVisible = true

      // 清空你选中或者上传的图片地址
      this.selectedImageUrl = null
      this.uploadImageUrl = null

      // 当点击图片按钮打开对话框是向后台发送请求获取全部图片素材数据
      this.gainImages()
    },

    // changePager当点击第几页时请求回来第几页对应的数据
    changePager (newPage) {
      this.reqParams.page = newPage
      this.gainImages()
    },

    // 请求后台数据方法
    async gainImages () {
      const {
        data: { data }
      } = await this.$cuicui.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },

    // 切换收藏与全部的方法
    changeCollect () {
      this.reqParams.page = 1
      this.gainImages()
    },

    // 上传图片素材成功时要去做事情的方法
    handleSuccess (response) {
      // 在此只是预览图片
      this.uploadImageUrl = response.data.url
    },

    // 确认图片
    confirmImage () {
      if (this.activeName === 'image') {
        // this.value = this.selectedImageUrl
        this.$emit('input', this.selectedImageUrl)
      } else {
        // this.value = this.uploadImageUrl
        this.$emit('input', this.uploadImageUrl)
      }
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.my_cover_container{
  display: inline-block;
  margin-right: 20px;
}
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
.img-list {
  margin-top: 10px;
  .img-item {
    width: 160px;
    height: 120px;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 15px;
    margin-bottom: 10px;
    position: relative;
    &.selected {
      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2) url(../assets/images/selected.png)
          no-repeat center / 50px 50px;
      }
    }
    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: contain;
    }
  }
}
</style>
