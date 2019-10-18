<template>
  <menu-header>
  <div class="admin">
     <div class="input-item">
         <span>上传主图</span>
         <el-upload
  class="avatar-uploader"
  action="/admin/upload"
  :show-file-list="false"
  :with-credentials="true"
  :on-success="uploadSuccess">
  <img v-if="params.logo" :src="params.logo" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
     </div>
     <div class="input-item">
        <span>用户名</span>
        <el-input
    placeholder="请输入用户名"
    v-model="params.username">
  </el-input>
     </div>
    <div class="input-item">
        <span>密码</span>
        <el-input
    placeholder="请输入密码"
    type="password"
    v-model="params.password">
  </el-input>
     </div>
    <div class="input-item">
        <span>确认密码</span>
        <el-input
    placeholder="请确认密码"
    type="password"
    v-model="surePass">
  </el-input>
     </div>
  <div class="input-item">
    <span></span>
    <el-button type="primary" @click="submit">提交</el-button>
  </div>
  </div>
</menu-header>
</template>

<script>
import MenuHeader from '@/components/Menu'
import { userInfo } from '@/storage/index'
export default {
  data () {
    return {
      params: {
        logo: '',
        username: '',
        password: ''
      },
      surePass: ''
    }
  },
  mounted () {
    userInfo.get(true).then((res) => {
      this.params.logo = res.logo
      this.params.username = res.username
    })
  },
  methods: {
    uploadSuccess (res, file) {
      this.params.logo = res.imgUrl
    },
    submit () {
      if (!this.params.username) {
        this.$message.error('请输入用户名')
        return false
      }
      if (!this.params.logo) {
        this.$message.error('请上传头像')
        return false
      }
      if (!this.params.password) {
        this.$message.error('请输入密码')
        return false
      }
      if (this.surePass !== this.params.password) {
        this.$message.error('两次密码输入不一致')
        return false
      }
    }
  },
  components: {
    MenuHeader
  }
}
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<style lang="scss" scoped>
.el-input{
    width: 500px;
}
.input-item{
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  span{
      min-width: 120px;
      text-align: right;
      margin-right: 30px;
  }
}
.starus-item{
  margin-right: 30px;
  strong{
      margin-right: 10px;
  }
}
</style>
