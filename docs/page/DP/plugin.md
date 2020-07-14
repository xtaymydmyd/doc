# DP在线插件使用文档

## 定位

调用方法`bridge.gps`,有两个回调事件，一个成功，一个失败
```js
bridge.gps(function(location){
    console.log(location)
}, function(error){
    console.log(error)
});
```

成功返回数据如下：
```json
{
    "address": "中国江苏省南京市玄武区梅园新村街道中山东路237-1号",
    "city": "南京",
    "district": "玄武区",
    "lat": "32.047559",
    "loc": "32.047559,118.803354",
    "long": "118.803354",
    "time": "2020-07-13 18:48:30"
}
```

## 拍照
```js
var dd = {};
option.size = "200"; // 图片大小
bridge.camera(option, function(data){
    console.log(data)
}, function(error){
    console.log(data)
});
```

成功返回数据如下：
```json
{
    "image": "base64位图片字符串",
    "msg": "拍照",
}
```

### option参数如下

| 属性 | 名称 | 说明 | 默认 | 
| ------ | ------ | ------ | ------ | 
| size | 图片大小 | 以K为单位，例如 size=100 表示图片大小为100K | 无 |