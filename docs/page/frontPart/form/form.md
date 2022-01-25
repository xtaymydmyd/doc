# 表单设计器

## 连接私服

```terminal
    <!-- 私服地址 -->
    npm config set registry http://maven.lord.tk:8601/repository/npm-public/
    <!-- 检查是否设置成功 -->
    npm config get registry
```

## 表单设计器 - NPM安装
```terminal
    <!-- Element UI 主题 -->
    npm install @lordar/vue-json-schema-form
    <!-- iview3 主题 -->
    npm install @lordar/vue2-form-iview3
    <!-- vant 主题 -->
    npm install @lordar/vue2-form-vant2
```

## 插件 - NPM安装
```terminal
    <!-- 引用element UI 组件库 -->
    npm install element-ui@2.15.5
    <!-- 引用 iview 3 组件库 -->
    npm install iview@3.2.2
    <!-- 引用 Vant 组件库 -->
    npm install vant@2.12.27
    <!-- 公式组件 -->
    npm install formula@3.15.0
    <!-- jsonpath -->
    npm install jsonpath@1.1.1
    <!-- element ui 地区选择 -->
    npm install element-china-area-data@5.0.2
```

## Element UI 插件 - 全局引用
```js
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
```



## 业务插件 - NPM安装
```terminal
<!-- 日期格式插件 -->
npm install moment@2.20.1
<!-- 地区选择 -->
npm install element-china-area-data@5.0.2
```