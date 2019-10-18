import Vue from 'vue'
import Router from 'vue-router'
import { isLogin } from './storage'
const Index = () => import('@/views/index')
const Login = () => import('@/views/login')
const ProductList = () => import('@/views/productlist')
const ProductListAdd = () => import('@/views/productlist/add')
const ProductListEdit = () => import('@/views/productlist/edit')
const Category = () => import('@/views/category')
const adminSetting = () => import('@/views/admin/setting')
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      title: '会员管理'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      title: '登录'
    },
    {
      path: '/product/list',
      name: 'ProductList',
      component: ProductList,
      title: '产品列表'
    },
    {
      path: '/product/list/add',
      name: 'ProductListAdd',
      component: ProductListAdd,
      title: '产品列表'
    },
    {
      path: '/product/list/edit/:id',
      name: 'ProductListEdit',
      component: ProductListEdit,
      title: '编辑产品'
    },
    {
      path: '/category',
      name: 'Category',
      component: Category,
      title: '分类管理'
    },
    {
      path: '/admin/setting',
      name: 'adminSetting',
      component: adminSetting,
      title: '设置'
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && (!isLogin.get() || isLogin.get() === '0')) {
    next({ name: 'Login', params: { toPage: to } })
    console.log(111)
  } else {
    next()
    console.log(222)
  }
})

export default router
