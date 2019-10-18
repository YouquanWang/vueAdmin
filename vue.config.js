module.exports = {
  devServer: {
    proxy: {
      '/admin': {
        target: 'http://localhost:4000/',
        changeOrigin: true,
        pathRewrite: { }
      }
    }
  }
}
