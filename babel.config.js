module.exports = {
  plugins: [
    [
      'import',
      {
        libraryName: 'element-plus',
        customName: (name) => {
          name = name.slice(3)
          return `element-plus/es/components/${name}/index.mjs`
          // return `element-plus/lib/components/${name}/index.js`
        },
        customStyleName: (name) => {
          return `element-plus/theme-chalk/${name}.css`
        }
      }
    ]
  ],
  presets: ['@vue/cli-plugin-babel/preset']
}
