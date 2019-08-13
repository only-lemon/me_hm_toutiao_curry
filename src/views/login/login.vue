<template>
  <div class="container">
    <el-card class="my-card">
      <img src="../../assets/images/logo_index.png" alt />
      <!-- 使用elementUI组件库,,框架的,,form组件 -->
      <el-form :model="loginForm"
               :rules="loginVerifyRules"
               ref = "integralVerify"
      >
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width:236px;margin-right:10px"
          ></el-input>
          <el-button type="primary">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="bool">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" style="width:100%" @click="login()">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    const checkMobile = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) { return callback(new Error('手机格式不对啊!')) }
      callback()
    }
    return {
      loginForm: {
        mobile: '16600286830',
        code: '246810'
      },
      bool: true,
      loginVerifyRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 别人组件的函数调用: 通过DOM对象去调用
      // 对整个表单进行校验
      this.$refs.integralVerify.validate((validated) => {
        if (validated) {
          console.log('登录表单数据全部通过验证!!!')
          // 校验成功发起登录请求操作!!!
          this.$cuicui.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm).then((result) => {
            // 暂时先留着这个登录的打印结果
            // 等后期写代码的时候,,要看返回的数据结构时在拐过头来看看
            console.log(result)
            // loginSuccess skip to login page ...
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.$message.info('登录失败 -----> 手机号或验证码错误!')
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  width: 100%;
  height: 100%;
  position: absolute;
  background:url("../../assets/images/login_bg.jpg") no-repeat center / cover;
  .my-card {
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-60%);
    img {
      width: 200px;
      display: block;
      margin: 0 auto 30px;

    }
  }
}
</style>
