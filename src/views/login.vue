<template>
  <div class="container">
    <el-card class="my-card"></el-card>
  </div>
</template>

<script>
export default {
  name: 'login'
}
</script>

<style lang="less" scoped>
.container{
  width: 100%;
  height: 100%;
  position: absolute;
  background:url("../assets/images/login_bg.jpg") no-repeat center / cover;
  .my-card {
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-60%)
  }
}
</style>
