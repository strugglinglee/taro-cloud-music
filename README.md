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
