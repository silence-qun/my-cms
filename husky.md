## husky 是一个 git hook 工具，可以帮助我们触发 git 提交的各个阶段：pre-commit、commit-msg、pre-push

#### 使用自动配置命令

`npx husky-init && npm install`
在执行命令时如果报错“标记“&&”不是此版本中的有效语句分隔符。”，将“&&”改为“;”即可
该命令执行的操作

- 安装 husky 插件
- 新建了 .husky 文件夹
- 在 package.json 文件中添加了 “"prepare": "husky install"” 命令
