const marked = require('marked')
const hljs = reuqire('highlight.js')

module.exports = function (context) {
  marked.setOptions({
    highlight: function (code, lang) {
      return hljs.highlight(lang, code).value
    },
  })

  const HTMLContent = marked(context)

  return HTMLContent

  // 当不使用 html-loader 时，返回 moduleCode
  // return moduleCode
}
