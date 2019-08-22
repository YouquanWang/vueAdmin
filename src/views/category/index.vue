<template>
  <menu-header>
  <div class="category">
     <el-tree
      :data="list"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node }">
        <span>{{ node.data.name }}</span>
        <span>
          <el-button
            size="mini"
            type="primary"
            @click="add(node)">
            添加
          </el-button>
           <el-button
            size="mini"
            type="success"
            @click="editCategory(node)">
            编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="remove(node)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
     <el-dialog :visible.sync="show" title="添加分类">
  <el-form>
    <el-form-item label="父级分类">
      <el-input :disabled="true" v-model="category.parentName" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="分类名称">
      <el-input v-model="category.name" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="show = false">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </div>
</el-dialog>
  <el-dialog :visible.sync="editShow" title="编辑分类">
  <el-form>
    <el-form-item label="分类名称">
      <el-input v-model="edit.editName" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editShow = false">取 消</el-button>
    <el-button type="primary" @click="editSubmit">确 定</el-button>
  </div>
</el-dialog>
  </div>
</menu-header>
</template>

<script>
import MenuHeader from '@/components/Menu'
export default {
  data () {
    return {
      list: [],
      show: false,
      editShow: false,
      edit: {
        editId: '',
        editName: ''
      },
      category: {
        parentId: '',
        parentName: '',
        name: ''
      }
    }
  },
  mounted () {
    this.getCategory()
  },
  methods: {
    getCategory () {
      this.axios.post('/admin/category/list')
        .then((res) => {
          this.list = res.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    add (node) {
      let data = node.data
      this.category.parentName = data.name
      this.category.parentId = data.id
      this.show = true
    },
    submit () {
      if (!this.category.name) {
        this.$message.error('请输入分类名称')
        return false
      }
      let args = {
        name: this.category.name,
        pid: this.category.parentId
      }
      this.axios.post('/admin/category/add', args)
        .then((res) => {
          if (res.status === 1) {
            this.show = false
            this.getCategory()
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1000
            })
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    remove (node) {
      let data = node.data
      this.axios.post('/admin/category/delete', { id: data.id })
        .then((res) => {
          if (res.status === 1) {
            this.show = false
            this.getCategory()
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1000
            })
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    editCategory (node) {
      let data = node.data
      this.edit.editName = data.name
      this.edit.editId = data.id
      this.editShow = true
    },
    editSubmit () {
      if (!this.edit.editName) {
        this.$message.error('请输入分类名称')
        return false
      }
      let args = {
        name: this.edit.editName,
        id: this.edit.editId
      }
      this.axios.post('/admin/category/edit', args)
        .then((res) => {
          if (res.status === 1) {
            this.editShow = false
            this.getCategory()
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1000
            })
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
    MenuHeader
  }
}
</script>

<style>
.el-tree-node{
  /* margin-bottom: 10px; */
}
.el-tree-node.is-expanded>.el-tree-node__children{
  padding-top: 20px;
}
</style>

<style lang="scss" scoped>
.custom-tree-node{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
