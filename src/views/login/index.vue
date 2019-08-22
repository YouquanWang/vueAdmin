<template>
  <el-form ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="params.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="params.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="submit" :loading="loading">登录</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
import { isLogin } from '@/storage'
let fromPage = null
export default {
  beforeRouteEnter (to, from, next) {
    fromPage = from
    next()
  },
  beforeRouteLeave (to, from, next) {
    next()
  },
  data () {
    return {
      toPage: this.$route.params.toPage,
      loading: false,
      params: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submit () {
      this.loading = true
      if (!this.params.username) {
        this.$message.error('用户名不能为空')
        return false
      }
      if (!this.params.password) {
        this.$message.error('密码不能为空')
        return false
      }
      this.axios.post('/admin/login', this.params)
        .then((res) => {
          this.loading = false
          isLogin.set('1')
          let page = this.toPage || fromPage
          if (!page.name) {
            this.$router.replace({name: 'Index'})
          } else {
            this.$router.replace({name: page.name, params: page.params, query: page.query})
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
 .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
 }
</style>
