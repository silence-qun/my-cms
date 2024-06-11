function format(a) {
  return a.toLocaleString('zh-CN',{style: 'currency',currency: 'CNY'})
}

module.exports = {
  format
}