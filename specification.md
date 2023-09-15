# 代码规范配置信息

- [prettier](#prettier)
- [husky](#husky)
- [commitizen](#commitizen)
- [commitlint](#commitlint)

## prettier[↑](#代码规范配置信息)

#### 代码格式化

1. 项目安装插件：prettier

```bash
npm install prettier -D
```

2. 编辑器需要安装插件：Prettier - Code formatter

3. 配置格式化规则文件：.prettierrc

- useTabs: 使用 tab 缩进还是空格缩进，false 为使用空格
- tabWidth: tab 是空格的情况下是几个空格，选择 2 个
- printWidth: 行字符的长度，推荐 145
- singleQuote: 使用单引号还是双引号，true 为单引号
- trailingComma: 多行输入的末尾是否添加逗号，none 为不添加
- semi: 语句末尾是否要加分号，false 为不添加

4. 配置忽略格式化的文件：.prettierignore

5. 在 package.json 中配置格式化脚本

```json
{
  "scripts": {
    "prettier": "prettier --write ."
  }
}
```

#### 与 eslint 冲突问题

安装插件，如果在创建 vue3 项目时选择了 prettier ，那么这些插件是自动安装的

```bash
npm install eslint-config-prettier eslint-plugin-prettier -D
```

在 .eslintrc.js 文件中 加入以下代码即可（创建项目时选择 prettier 自动配好）

```javascript
module.exports = {
  extends: ['plugin:prettier/recommended']
}
```

## husky[↑](#代码规范配置信息)

#### 是一个 git hook 工具，可以帮助我们触发 git 提交的各个阶段：pre-commit、commit-msg、pre-push

使用自动配置命令

```bash
npx husky-init && npm install
```

在执行命令时如果报错“标记“&&”不是此版本中的有效语句分隔符。”，将“&&”改为“;” ，或将 && 加上引号 '&&'
该命令执行的操作

- 安装 husky 插件
- 新建了 .husky 文件夹  
  ![husky_pic_0](./src/assets/md_img/husky_pic_0.jpg 'husky_pic_0')
- 在 package.json 文件中添加了 “"prepare": "husky install"” 命令
  ```json
  {
    "scripts": {
      "prepare": "husky install"
    }
  }
  ```

## commitizen[↑](#代码规范配置信息)

#### 帮助我们编写规范 commit message 的工具

1. 安装 commitizen

```bash
npm install commitizen -D
```

2. 安装 cz-conventional-changelog，并且初始化

```bash
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```

该命令会安装 cz-conventional-changelog，并且在 package.json 中配置。如果该命令报错，可手动安装配置。

```json
{
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
}
```

3. 提交代码  
   使用命令 `npx cz`，也可以在 package.json 文件中配置运行命令
   ```json
   {
     "scripts": {
       "commit": "cz"
     }
   }
   ```

- 选择 Type ：Select the type of change that you're committing
  Type | 作用
  ---- | ----
  feat | 新增特性（feature）
  fix | 修复 Bug （Bug fix）
  docs | 修改文档（documentation）
  style | 代码格式修改（white-space、formatting、missing semi colons，etc）
  refactor | 代码重构（refactor）
  pref | 改善性能（A code change that improves performance）
  test | 测试（when adding missing tests）
  build | 变更项目构建或外部依赖（如 scopes：webpack、gulp、npm 等）
  ci | 更改配置文件和 package.json 的 scripts 命令
  chore | 变更构建流程或辅助工具（比如更改测试环境）
  revert | 代码回退

  ![cz_pic_0](./src/assets/md_img/cz_pic_0.jpg 'cz_pic_0')
  ![cz_pic_1](./src/assets/md_img/cz_pic_1.jpg 'cz_pic_1')

- 填写本次修改的范围（作用域）：What is the scope of this change (e.g. component or file name)
- 填写提交的信息：Write a short, imperative tense description of the change (max 90 chars)
- 填写提交的详细信息描述：Provide a longer description of the change
- 是否是一次重大的更改：Are there any breaking changes
- 是否影响某个 open issue ：Does this change affect any open issues

  ![cz_pic_2](./src/assets/md_img/cz_pic_2.jpg 'cz_pic_2')

## commitlint[↑](#代码规范配置信息)

#### 提交验证

虽然按 cz 规范了提交风格，依然可以通过 git commit 来提交不规范的 git 风格信息，可用 commitlint 来限制提交

1.  安装 @commitlint/config-conventional 和 @commitlint/cli

```bash
npm install @commitlint/config-conventional @commitlint/cli -D
```

2. 在根目录创建 commitlint.config.js 文件，配置 commitlint

```javascript
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```

3. 使用 husky 生成 commit-msg 文件，验证提交信息

```bash
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```
