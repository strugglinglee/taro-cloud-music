# taro-cloud-music

## 项目计划

仿写网抑云音乐

### 技术选型

taro + vue3 + pinia + ts

### 后端

#### 接口文档参考

<https://binaryify.github.io/NeteaseCloudMusicApi>

#### 参考项目

<https://github.com/Binaryify/NeteaseCloudMusicApi>

直接在 Vercel 下部署,不需要自己的服务器

#### 操作方法

- fork 参考项目
- 在 Vercel 官网点击 New Project
- 点击 Import Git Repository 并选择你 fork 的此项目并点击import
- 点击 PERSONAL ACCOUNT 的 select
- 直接点Continue
- PROJECT NAME自己填,FRAMEWORK PRESET 选 Other 然后直接点 Deploy 接着等部署完成即可

#### 接口示例

<https://cloud-music-api-alpha.vercel.app/dj/program?rid=336355127>

## 开发过程

### 安装cli

使用 `npx` 可以不用全局先安装 cli 工具，直接下载最新 Taro3 工程

```shell
npx @tarojs/cli init taro-cloud-music
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

### 设置.eslintrc.js 和 .prettierrc

解决 Eslint 和 Prettier 的冲突需设置.eslintrc.js 和 .prettierrc

### 添加 Ts 检查命令

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

### 添加 husky

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

### 配置 commitlint 提高提交时的规范

```shell
yarn add  @commitlint/{config-conventional,cli} -D
# Configure commitlint to use conventional config
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
# Add hook
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
# 首次安装不起作用可以运行 npx husky install
```

## 状态管理-pinia

> Pinia 最初是为了探索 Vuex 的下一次迭代会是什么样子，结合了 Vuex 5 核心团队讨论中的许多想法。最终， Pinia 已经实现了Vuex 5 中想要的大部分内容，并决定实现它 取而代之的是新的建议。
> 与 Vuex 相比，Pinia 提供了一个更简单的 API，具有更少的规范，提供了 Composition-API 风格的 API，最重要的是，在与 TypeScript 一起使用时具有可靠的类型推断支持。

一个 Store （如 Pinia）是一个实体，它持有未绑定到您的组件树的状态和业务逻辑。换句话说，它托管全局状态。它有点像一个始终存在并且每个人都可以读取和写入的组件。

它有三个概念，state、getters 和 actions 并且可以安全地假设这些概念等同于组件中的“数据”、“计算”和“方法”。

<https://pinia.web3doc.top/getting-started.html>

### 安装

```shell
yarn add pinia
yarn add taro-plugin-pinia
```

### 初始化stores

src/stores/index.ts

```ts
import { App } from 'vue'
import { createPinia } from 'pinia'
export const store = createPinia()

export function setupStore(app: App) {
  app.use(store)
}
```

### 在app.ts中全局注册Pinia

```ts
import { setupStore } from '@/stores'
setupStore(App)
```


## 引入NutUI组件库

[参考此文档进行组件库的引入](https://nutui.jd.com/#/guide/starttaro)

- 首先下载 @tarojs/plugin-html

```shell
yarn add @tarojs/plugin-html
```

- 在项目中配置

```js
// config/index.js
config = {
  // ...
  plugins: ['@tarojs/plugin-html']
  // 给 sass-loader 传递选项 ！！！！ 按需加载方式必须配置
  sass: {
      data: `@import "@nutui/nutui-taro/dist/styles/variables.scss";`,
  }
}

```

- 配置 nutui 375尺寸
```js
// config/index.js
config = {
  // ...
  designWidth: 375,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1
  }
}
```

- 推荐使用按需加载
babel-plugin-import 是一款 babel 插件，它会在编译过程中将 import 语句自动转换为按需引入的方式。

```shell
npm install babel-plugin-import --save-dev
```

在 .babelrc 或 babel.config.js 中添加配置：

```js
{
  // ...
  plugins: [
    [
      "import",
      {
        "libraryName": "@nutui/nutui-taro",
        "libraryDirectory": "dist/packages/_es",
        // customName自定义兼容国际化使用
        "customName": (name, file) => {
          if (name == 'Locale') {
            return '@nutui/nutui-taro/dist/packages/locale/lang';
          } else {
            return `@nutui/nutui-taro/dist/packages/_es/${name}`;
          }
        },
        "style": (name, file) => name.toLowerCase().replace('_es/', '') + '/index.scss',
        "camel2DashComponentName": false
      },
      'nutui3-taro'
    ]
  ]
}
```

- 全局注册
```js
import { createApp } from "vue";
import App from "./App.vue";
import { Button, Cell, Icon } from "@nutui/nutui-taro";
createApp(App).use(Button).use(Cell).use(Icon);
```
