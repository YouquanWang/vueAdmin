<template>
  <menu-header>
  <div class="product-list">
    <el-table
    :data="list"
    style="width: 100%">
    <el-table-column
      label="ID"
      width="80">
      <template slot-scope="scope">
        {{ scope.row.id}}
      </template>
    </el-table-column>
    <el-table-column
      label="标题"
      width="300">
      <template slot-scope="scope">
        {{ scope.row.title}}
      </template>
    </el-table-column>
    <el-table-column
      label="缩略图"
      width="160">
      <template slot-scope="scope">
        <el-image
      style="width: 120px; height: 40px"
      :src="scope.row.pic"></el-image>
      </template>
    </el-table-column>
    <el-table-column
      label="置顶"
      width="80">
      <template slot-scope="scope">
<el-switch
  v-model="scope.row.istop"
  @change="changeStatus(scope.$index, scope.row,'istop')"
  >
</el-switch>
      </template>
    </el-table-column>
     <el-table-column
      label="推荐"
      width="80">
      <template slot-scope="scope">
<el-switch
  v-model="scope.row.recommend"
  @change="changeStatus(scope.$index, scope.row,'recommend')"
  >
</el-switch>
      </template>
    </el-table-column>
     <el-table-column
      label="状态"
      width="80">
      <template slot-scope="scope">
<el-switch
  v-model="scope.row.status"
  @change="changeStatus(scope.$index, scope.row,'status')"
  >
</el-switch>
      </template>
    </el-table-column>
    <el-table-column
      label="时间"
      width="160">
      <template slot-scope="scope">
        {{ scope.row.time }}
      </template>
    </el-table-column>
    <el-table-column fixed="right" width="160" label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
 <div class="page-pagination">
       <el-pagination
  background
  :current-page="params.page"
  layout="prev, pager, next"
  @current-change="changePage"
  :page-size="params.limit"
  :total="total">
</el-pagination>
 </div>
  </div>
</menu-header>
</template>

<script>
import MenuHeader from '@/components/Menu'
export default {
  data () {
    return {
      params: {
        page: Number.parseInt(this.$route.query.page) || 1,
        limit: 8
      },
      list: [],
      total: 0
    }
  },
  beforeRouteUpdate  (to, form, next) {
    this.params = {
      page: Number.parseInt(to.query.page) || 1,
      limit: 8
    }
    this.getListData()
    next()
  },
  mounted () {
    this.getListData()
  },
  methods: {
    handleEdit (index, row) {
      this.$router.push({ name: 'ProductListEdit', params: { id: row.id } })
    },
    handleDelete (index, row) {
      let id = row.id
      this.axios.post('/admin/product/delete', { id: id })
        .then((res) => {
          if (res.status === 1) {
            this.show = false
            this.getListData()
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
    getListData () {
      this.axios.post('/admin/product/list', this.params)
        .then((res) => {
          this.total = res.total
          let list = res.data
          list.forEach(item => {
            item.istop = Boolean(item.istop)
            console.log(item.istop)
            item.recommend = Boolean(item.recommend)
            item.status = Boolean(item.status)
          })
          this.list = list
          console.log(this.list)
        })
        .catch(error => {
          console.log(error)
        })
    },
    changePage (page) {
      this.$router.push({ name: 'ProductList', query: { page: page } })
    },
    changeStatus (index, row, statusName) {
      let args = {
        id: row.id,
        status: row[statusName] ? 1 : 0,
        statusName: statusName,
        dataBase: 'product'
      }
      this.axios.post('/admin/status', args)
        .then((res) => {
          if (res.status === 1) {
            this.$message({
              message: res.msg,
              type: 'success'
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

<style lang="scss" scoped>
.page-pagination{
    display: flex;
    flex-direction: row-reverse;
    padding-top:20px;
}
</style>
