# prettier

#### 第一步：项目安装插件：prettier

`npm install prettier -D`

#### 第二步：编辑器需要安装插件：Prettier - Code formatter

#### 第三步：配置格式化规则文件：.prettierrc

- useTabs: 使用 tab 缩进还是空格缩进，false 为使用空格
- tabWidth: tab 是空格的情况下是几个空格，选择 2 个
- printWidth: 行字符的长度，推荐 80
- singleQuote: 使用单引号还是双引号，true 为单引号
- trailingComma: 多行输入的末尾是否添加逗号，none 为不添加
- semi: 语句末尾是否要加分号，false 为不添加

#### 第四步：配置忽略格式化的文件：.prettierignore

#### 第五步：在 package.json 中配置格式化脚本

```
{
  "scripts": {
    "prettier": "prettier --write ."
  },
}
```

#### 与 eslint 冲突问题

安装插件，如果在创建 vue3 项目时选择了 prettier ，那么这些插件是自动安装的
`npm install eslint-config-prettier eslint-plugin-prettier -D`
在 .eslintrc.js 文件中 加入以下代码即可（创建项目时选择 prettier 自动配好）

```
module.exports = {
  extends: ['plugin:prettier/recommended'],
}
```
