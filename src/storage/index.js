
const isLogin = extend('isLogin', sessionStorage)
function extend (key, storage = localStorage) {
  return {
    get () {
      return storage.getItem(key)
    },
    set (value) {
      setData(key, value, storage)
    },
    remove () {
      storage.removeItem(key)
    }
  }
}
function setData (key, value, storage = localStorage) {
  try {
    storage.setItem(key, value)
  } catch (e) {
  }
}
function clearUser () {
  isLogin.remove()
}
export {
  isLogin,
  clearUser
}
