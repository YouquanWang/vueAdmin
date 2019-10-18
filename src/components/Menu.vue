<template>
<el-row class="container">
  <el-col :span="24" class="header">
    <el-col :span="10" class="logo logo-width">
      后台管理
    </el-col>
    <el-col :span="10">
      <div class="tools">
        <i class="fa fa-align-justify"></i>
      </div>
    </el-col>
    <el-col :span="4" class="userinfo">
      <el-dropdown trigger="hover">
        <span class="el-dropdown-link userinfo-inner"><img :src="logo"/>{{username}}</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>我的消息</el-dropdown-item>
          <el-dropdown-item @click.native="$router.push({name: 'adminSetting'})">设置</el-dropdown-item>
          <el-dropdown-item divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-col>
  <el-col :span="24" class="main">
    <aside class="menu-expanded">
      <!--导航菜单-->
     <el-menu default-active="1-4-1" class="el-menu-vertical-demo">
  <el-submenu index="1">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span slot="title">产品管理</span>
    </template>
    <el-menu-item-group>
      <el-menu-item @click="$router.push({name: 'ProductList'})" index="1-1">产品列表</el-menu-item>
      <el-menu-item @click="$router.push({name: 'ProductListAdd'})" index="1-2">添加产品</el-menu-item>
    </el-menu-item-group>
  </el-submenu>
   <el-submenu index="2">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span slot="title">会员管理</span>
    </template>
    <el-menu-item-group>
      <el-menu-item index="2-1">会员列表</el-menu-item>
    </el-menu-item-group>
  </el-submenu>
   <el-submenu index="3">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span slot="title">分类管理</span>
    </template>
    <el-menu-item-group>
      <el-menu-item @click="$router.push({name: 'Category'})" index="3-1">分类列表</el-menu-item>
    </el-menu-item-group>
  </el-submenu>
</el-menu>
    </aside>
    <section class="content-container">
      <div class="grid-content bg-purple-light">
        <el-col :span="24" class="content-wrapper">
          <transition name="fade" mode="out-in">
            <slot></slot>
          </transition>
        </el-col>
      </div>
    </section>
  </el-col>
</el-row>
</template>

<script>
import { userInfo } from '@/storage/index'
export default {
  data () {
    return {
      logo: '',
      username: ''
    }
  },
  mounted () {
    userInfo.get(true).then((res) => {
      this.logo = res.logo
      this.username = res.username
    })
  }
}
</script>>

<style scoped lang="scss">
$color-primary: #20a0ff;
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  .header {
    height: 60px;
    line-height: 60px;
    background: $color-primary;
    color:#fff;
    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;
      .userinfo-inner {
        cursor: pointer;
        color:#fff;
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 10px 0px 10px 10px;
          float: right;
        }
      }
    }
    .logo {
      //width:230px;
      height:60px;
      font-size: 22px;
      padding-left:20px;
      padding-right:20px;
      img {
        width: 40px;
        float: left;
        margin: 10px 10px 10px 18px;
      }
      .txt {
        color:#fff;
      }
    }
    .logo-width{
      width:230px;
    }
    .logo-collapse-width{
      width:60px
    }
    .tools{
      padding: 0px 23px;
      width:14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }
  .main {
    display: flex;
    // background: #324057;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
    aside {
      flex:0 0 230px;
      width: 230px;
      // position: absolute;
      // top: 0px;
      // bottom: 0px;
      .el-menu{
        height: 100%;
      }
      .collapsed{
        width:60px;
        .item{
          position: relative;
        }
        .submenu{
          position:absolute;
          top:0px;
          left:60px;
          z-index:99999;
          height:auto;
          display:none;
        }

      }
    }
    .menu-collapsed{
      flex:0 0 60px;
      width: 60px;
    }
    .menu-expanded{
      flex:0 0 230px;
      width: 230px;
    }
    .content-container {
      // background: #f1f2f7;
      flex:1;
      // position: absolute;
      // right: 0px;
      // top: 0px;
      // bottom: 0px;
      // left: 230px;
      overflow-y: scroll;
      padding: 20px;
      .breadcrumb-container {
        //margin-bottom: 15px;
        .title {
          width: 200px;
          float: left;
          color: #475669;
        }
        .breadcrumb-inner {
          float: right;
        }
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
</style>
