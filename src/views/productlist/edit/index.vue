<template>
  <menu-header>
   <div class="add-product">
     <div class="input-item">
        <span>标题</span>
        <el-input
    placeholder="请输入标题"
    v-model="params.title">
  </el-input>
     </div>
         <div class="input-item">
        <span>选择分类</span>
        <el-cascader
    v-model="params.catid"
    :props="props"
    :show-all-levels="false"
    :options="categoryList">
    </el-cascader>
     </div>
     <div class="input-item">
         <span>上传主图</span>
         <el-upload
  class="avatar-uploader"
  action="/admin/upload"
  :show-file-list="false"
  :with-credentials="true"
  :on-success="uploadSuccess"
  :before-upload="beforeUpload">
  <img v-if="params.pic" :src="params.pic" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
     </div>
     <div class="input-item">
         <span>上传组图</span>
         <el-upload
  action="/admin/upload"
  :with-credentials="true"
  list-type="picture-card"
  :on-preview="imgPreview"
  :file-list="groupImgList"
  :on-success="moreSuccess"
  :on-change="onChange"
  :on-remove="imgRemove">
  <i class="el-icon-plus"></i>
</el-upload>
     </div>
     <div class="input-item">
      <span>产品发布</span>
       <div class="starus-item">
           <strong>置顶</strong>
             <el-switch
  v-model="params.istop">
</el-switch>
       </div>
       <div class="starus-item">
    <strong>推荐</strong>
<el-switch
  v-model="params.recommend">
</el-switch>
       </div>
       <div class="starus-item">
           <strong>状态</strong>
           <el-switch
  v-model="params.status">
</el-switch>
       </div>
     </div>
  <div class="input-item" v-for="(item, index) in attrList" :key="index">
    <span>{{item.name}}</span>
    <el-select change="change" v-model="params.attr[item.id]" multiple placeholder="请选择">
    <el-option
      v-for="subItem in item.children"
      :key="subItem.value"
      :label="subItem.name"
      :value="subItem.id">
    </el-option>
  </el-select>
  </div>
  <div class="input-item">
    <span>内容</span>
    <vue-editor id="editor" :useCustomImageHandler="true" @imageAdded="imageAdded" v-model="params.content"></vue-editor>
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
import { VueEditor } from 'vue2-editor'
export default {
  data () {
    return {
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      attrList: [],
      categoryList: [],
      groupImgList: [],
      props: {
        value: 'id',
        label: 'name',
        emitPath: false
      },
      params: {
        id: this.$route.params.id,
        title: '',
        pic: '',
        catid: '',
        istop: false,
        status: true,
        recommend: false,
        content: '',
        attr: [],
        groupImg: []
      }
    }
  },
  mounted () {
    this.getProductInfo()
    this.getCategory()
    this.getAttribute()
  },
  methods: {
    change () {
      console.log(this.params.attr)
    },
    getProductInfo () {
      this.axios.post('/admin/product/info', { id: this.params.id })
        .then((res) => {
          if (res.status === 1) {
            let data = res.data[0]
            this.params.title = data.title
            this.params.pic = data.pic
            this.params.catid = data.catid
            if (data.istop === 1) {
              this.params.istop = true
            } else {
              this.params.istop = false
            }
            if (data.recommend === 1) {
              this.params.recommend = true
            } else {
              this.params.recommend = false
            }
            if (data.status === 1) {
              this.params.status = true
            } else {
              this.params.status = false
            }
            this.params.content = data.content
            data.attr.split('-')[0].split(',').forEach((item) => {
              this.params.attr[1].push(Number.parseInt(item))
            })
            data.attr.split('-')[1].split(',').forEach((item) => {
              this.params.attr[2].push(Number.parseInt(item))
            })
            data.groupImg.split('-').forEach((item) => {
              this.groupImgList.push(JSON.parse(item))
            })
            console.log(this.params)
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getAttribute () {
      this.axios.post('/admin/attribute/list')
        .then((res) => {
          let _this = this
          this.attrList = res.data
          this.attrList.forEach((item) => {
            _this.params.attr[item.id] = ''
          })
        })
    },
    getCategory () {
      this.axios.post('/admin/category/list')
        .then((res) => {
          this.categoryList = res.data
        })
    },
    uploadSuccess (res, file) {
      this.params.pic = res.imgUrl
    },
    beforeUpload () {},
    imgPreview (file) {
    },
    onChange (file, fileList) {
    },
    imgRemove (file, fileList) {
      fileList.forEach((item) => {
        this.params.groupImg.push({ name: item.name, url: item.response.imgUrl })
      })
    },
    moreSuccess (res, file, fileList) {
      fileList.forEach((item) => {
        this.params.groupImg.push({ name: item.name, url: item.response.imgUrl })
      })
    },
    imageAdded (file, Editor, cursorLocation, resetUploader) {
      let formData = new FormData()
      formData.append('file', file)
      console.log(formData.get('file'))
      // console.log(file)
      console.log(formData)
      this.axios.post('/admin/upload', formData)
        .then((res) => {
          console.log(res)
          let url = res.imgUrl
          Editor.insertEmbed(cursorLocation, 'image', url)
          resetUploader()
        })
        .catch(err => {
          console.log(err)
        })
    },
    submit () {
      if (!this.params.title) {
        this.$message.error('请输入标题')
        return false
      }
      if (!this.params.pic) {
        this.$message.error('请输上传主图')
        return false
      }
      if (!this.params.catid) {
        this.$message.error('请选择分类')
        return false
      }
      if (!this.params.attr.length) {
        this.$message.error('请选择属性')
        return false
      }
      if (!this.params.groupImg.length) {
        this.$message.error('请上传组图')
        return false
      }
      if (!this.params.content) {
        this.$message.error('请填写产品详情')
        return false
      }
      let params = {
        title: this.params.title,
        pic: this.params.pic,
        catid: this.params.catid,
        istop: this.params.istop,
        status: this.params.status,
        recommend: this.params.recommend,
        content: this.params.content,
        attr: this.params.attr.toString(),
        groupImg: this.params.groupImg.toString()
      }
      this.axios.post('/admin/product/add', params)
        .then((res) => {
          let _this = this
          if (res.status === 1) {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            _this.$router.push({ name: 'ProductList' })
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  components: {
    MenuHeader,
    VueEditor
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
</style>>
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
