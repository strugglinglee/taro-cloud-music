# 在Nut-UI中使用iconfont

> [NutUI官方文档教程](https://nutui.jd.com/#/zh-CN/component/icon)

## 第一步：在iconfont中的操作

### 1. 官网搜索关键词添加至购物车

![alt](https://images-snowy.vercel.app/music/iconfont-add.png)

### 2. 添加至项目

![alt](https://images-snowy.vercel.app/music/iconfont-step2.png)

### 3. 下载到本地并存放至项目文件中

![alt](https://images-snowy.vercel.app/music/iconfont-step3.png)

> 只有部分文件需要
![alt](https://images-snowy.vercel.app/music/iconfont-step4.png)


## 第二步：项目入口文件 main.js 引用 iconfont.css

```shell
import './assets/font/iconfont.css';
```
## 第三步：使用

```htm
<!-- 
  font-class-name 指定类名为默认 iconfont
  class-prefix 指定默认 icon
  name 值根据 iconfont.css 中值对应填写 
-->
<nut-icon font-class-name="iconfont" class-prefix="icon" name="close" />
```