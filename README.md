# taro-cloud-music

项目练手：仿写网抑云音乐

接口文档参考：
<https://binaryify.github.io/NeteaseCloudMusicApi>

技术选型：
taro + vue3 + pinia + ts

接口示例：
<https://cloud-music-api-alpha.vercel.app/dj/program?rid=336355127>

## 开发过程

### 安装cli

使用 `npx` 可以不用全局先安装 cli 工具，直接下载最新 Taro3 工程

```shell
npx @tarojs/cli init WechatAppDemo
```

### 本地安装 cli 确保项目基本运行

```shell
yarn add @tarojs/cli
```

### 编译为小程序

```shell
yarn dev:weapp
```

## 代码规范

- 代码规范 ESlint
- 代码格式化 Prettier
- 提交规范 CommitLint

### 安装依赖

```shell
yarn add @vue/eslint-config-prettier @vue/eslint-config-typescript eslint-plugin-prettier -D
```

解决 Eslint 和 Prettier 的冲突需设置.eslintrc.js 和 .prettierrc

添加 Ts 检查命令

```shell
yarn add vue-tsc -D
```

`package.json`中添加检查命令

```json
"scripts":{
  "tsc": "vue-tsc --noEmit --skipLibCheck",
  "lint": "eslint --ext .vue --ext .js --ext .ts src/"
}
```

添加 husky pre-commit Git 钩子来保证代码提交时 Ts 检查和 Eslint 检查都符合规范

```shell
# https://github.com/typicode/husky
# https://typicode.github.io/husky/#/?id=articles
yarn add husky -D
# 初始化 husky
npx husky install
# 测试命令
npx husky add .husky/pre-commit "echo test"
```

编辑 pre-commit 执行 Eslint 检查和 Ts 检查

配置 commitlint 提高提交时的规范

```shell
yarn add  @commitlint/{config-conventional,cli} -D
# Configure commitlint to use conventional config
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
# Add hook
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
# 首次安装不起作用可以运行 npx husky install
```
