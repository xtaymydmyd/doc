# 异步同步

## 写法一

```js
...
// 调用方式
this.salaryInfo = await this.getRulePreviewInfo()
...
getRulePreviewInfo(params) {
    return new Promise((resolve, reject) => {
        this.$orgAPI.getRulePreviewInfo(params).then(res => {
            if(res.status == '0') {
                resolve(res.data || {})
            }else {
                reject(res.message || '获取薪资信息失败')
            }
        }).catch(message => {
            reject(message || '网络异常')
        })
    })
}
```

## 写法二
```js
// common.js文件下
uploadData(name, param) {
    ...
    return new Promise((resolve, reject) => {
        http.apiPost(type[name], param).then(res => {
            if (res.code == 0) {
                resolve(res.extData)
            } else {
                reject()
            }
        }).catch(msg => {
            reject()
        })
    })
},
// 调用方式
uploadData('image', d.data[0].data).then(res => {
    ....
}).catch((error) => {
    ....
})
```