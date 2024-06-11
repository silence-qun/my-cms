const babel = require('@babel/core')
const { getOptions } = require('loader-utils')

module.exports = function (context) {
  const callback = this.async()

  const options = getOptions(this)

  babel.transform(context, options, (err, res) => {
    if (err) {
      callback(err)
    } else {
      callback(null, res.code)
    }
  })
}
