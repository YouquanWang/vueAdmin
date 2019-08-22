module.exports = {
  devServer: {
    proxy: {
      '/admin': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        pathRewrite: { }
      }
    }
  }
}
