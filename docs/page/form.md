# 基础组件定义

是否带出历史`historyType`:
```text
1、不回显
2、按问卷-回显自己上次录入 
3、按问卷-回显任何人上次录入
4、按门店-回显自己上次录入 
5、按门店-回显任何人上次录入
```

``` 问题
    表格组件如何设计，筛选条件？
    跳转？
    tab组件
    登录功能？
```

## 单行输入框
```json
{
    componentName: 'InputField',

    itemLabel: '单行输入框',                  // 标题
    itemValue: '',                          // 输入框的值
    defaultValue: '',                       // 默认值
    isRequired: false,                      // 是否必填(boolean)
    isReadOnly: false,                      // 是否只读(boolean)
    placeholder: '请输入',                   // 提示文字/输入框占位文本
    remark: '',                             // 备注/说明文字
    isDefaultShow: true,                    // 是否默认展示(boolean)
    validateRule: '',                       // 验证规则
    validateRuleMsg: '',                    // 验证出错提醒
    historyType: '',                        // 是否带出历史
    field: '',                              // 关联数据库字段
    fieldName: '',                          // 判断数据库字段名
    clearable: true,                        // 是否可清除

    minValue: null,                         // 最小长度
    maxValue: null                          // 最大长度
}
```

## 数字输入框
```json
{
    componentName: 'NumberField',

    itemLabel: '数字输入框',                      // 标题
    itemValue: '',                              // 输入框的值
    defaultValue: '',                           // 默认值
    isRequired: false,                          // 是否必填(boolean)
    isReadOnly: false,                          // 是否只读(boolean)
    placeholder: '请输入',                       // 提示文字/输入框占位文本
    remark: '',                                 // 备注/说明文字
    isDefaultShow: true,                        // 是否默认展示(boolean)
    validateRule: '',                           // 验证规则
    validateRuleMsg: '',                        // 验证出错提醒
    historyType: '',                            // 是否带出历史
    field: '',                                  // 关联数据库字段
    fieldName: '',                              // 判断数据库字段名
    clearable: true,                            // 是否可清除

    digits: 0,                                  // 数值精度    (number)
    minValue: null,                             // 最大值
    maxValue: null                              // 最小值
}
```

## 多行输入框
```json
{
    componentName: 'TextareaField',

    itemLabel: '多行输入框',                      // 标题
    itemValue: '',                              // 输入框的值
    defaultValue: '',                           // 默认值
    isRequired: false,                          // 是否必填(boolean)
    isReadOnly: false,                          // 是否只读(boolean)
    placeholder: '请输入',                       // 提示文字/输入框占位文本
    remark: '',                                 // 备注/说明文字
    isDefaultShow: true,                        // 是否默认展示(boolean)
    validateRule: '',                       // 验证规则
    validateRuleMsg: '',                    // 验证出错提醒
    historyType: '',                            // 是否带出历史
    field: '',                                  // 关联数据库字段
    fieldName: '',                              // 判断数据库字段名
    clearable: true,                            // 是否可清除

    rows: 3,                                    // 输入框默认行数
    minValue: null,                             // 最小长度
    maxValue: null                              // 最大长度
}
```

## 单选框 
```json
{
    componentName: 'RadioField',

    itemLabel: '单选框',                 // 标题
    itemValue: '',                      // 输入框的值
    defaultValue: '',                   // 默认值
    isRequired: false,                  // 是否必填(boolean)
    isReadOnly: false,                  // 是否只读(boolean)
    placeholder: '请选择',               // 提示文字
    remark: '',                         // 备注/说明文字
    isDefaultShow: true,                // 是否默认展示(boolean)
    validateRule: '',                   // 验证规则
    validateRuleMsg: '',                // 验证出错提醒
    historyType: '',                    // 是否带出历史
    field: '',                          // 关联数据库字段
    fieldName: '',                      // 判断数据库字段名
    clearable: true,                    // 是否可清除

    options: [{                         // 可选项数据源(Array)
        key: '1',                       // (String)
        value: '选项',                   // (String)
        disabled: false,                // 是否禁用当前选项 (boolean)
        hidden: false                   // 是否展示
    }],
    interface: {
        method: 'GET',                  // 接口方式
        url: '',                        // 请求地址
        param: ''                       // 参数
    }
}
```

## 复选框
```json
{
    componentName: 'CheckBoxField',

    itemLabel: '多选框',                 // 标题
    itemValues: [],                     // 输入框的值
    defaultValue: [],                   // 默认值
    isRequired: false,                  // 是否必填(boolean)
    isReadOnly: false,                  // 是否只读(boolean)
    placeholder: '请选择',               // 提示文字
    remark: '',                         // 备注/说明文字
    isDefaultShow: true,                // 是否默认展示(boolean)
    historyType: '',                    // 是否带出历史
    field: '',                          // 关联数据库字段
    fieldName: '',                      // 判断数据库字段名
    clearable: true,                    // 是否可清除

    options: [{                         // 可选项数据源
        key: '1',
        value: '选项1',
        disabled: false,                // 是否禁用当前选项(boolean)
        hidden: false                   // 是否展示
    }, {                                // 可选项数据源
        key: '2',
        value: '选项2',
        disabled: false,                // 是否禁用当前选项(boolean)
        hidden: false                   // 是否展示
    }],
    interface: {
        method: 'GET',                  // 接口方式
        action: '',                     // 请求地址
        param: ''                       // 参数
    }
}
```
## 下拉单选择框
```json
{
    componentName: 'SelectField',

    itemLabel: '下拉单选框',              // 标题
    itemValue: '',                      // 输入框的值
    defaultValue: '',                   // 默认值
    isRequired: false,                  // 是否必填(boolean)
    isReadOnly: false,                  // 是否只读(boolean)
    placeholder: '请选择',               // 提示文字
    remark: '',                         // 备注/说明文字
    isDefaultShow: true,                // 是否默认展示(boolean)
    historyType: '',                    // 是否带出历史
    field: '',                          // 关联数据库字段
    fieldName: '',                      // 判断数据库字段名
    clearable: true,                    // 是否可清除

    filterable: false,                  // 是否支持搜索
    notFoundText: '无匹配数据',           // 当下拉列表为空时显示的内容
    options: [{                         // 可选项数据源
        key: '1',
        value: '选项',
        disabled: false,                // 是否禁用当前选项
        hidden: false                   // 是否展示
    }],
    interface: {                        // 可选数据源接口方式获取
        method: 'GET',                  // 接口方式
        action: '',                     // 请求地址
        param: ''                       // 参数
    }
}
```
## 下拉多选择框
```json
{
    componentName: 'SelectsField',

    itemLabel: '下拉多选框',              // 标题
    itemValues: [],                     // 输入框的值,多选时 value值为数组
    defaultValue: [],                   // 默认值
    isRequired: false,                  // 是否必填(boolean)
    isReadOnly: false,                  // 是否只读(boolean)
    placeholder: '请选择',               // 提示文字
    remark: '',                         // 备注/说明文字
    isDefaultShow: true,                // 是否默认展示(boolean)
    historyType: '',                    // 是否带出历史
    field: '',                          // 关联数据库字段
    fieldName: '',                      // 判断数据库字段名
    clearable: true,                    // 是否可清除

    filterable: false,                  // 是否支持搜索
    notFoundText: '无匹配数据',           // 当下拉列表为空时显示的内容
    options: [{                         // 可选项数据源
        key: '1',
        value: '选项1',
        disabled: false,                // 是否禁用当前选项
        hidden: false                   // 是否展示
    }, {                                // 可选项数据源
        key: '2',
        value: '选项2',
        disabled: false,                // 是否禁用当前选项
        hidden: false                   // 是否展示
    }],
    interface: {                        // 可选数据源接口方式获取
        method: 'GET',                  // 接口方式
        action: '',                     // 请求地址
        param: ''                       // 参数
    }
}
```

## 级联单选择器
```json
{
    componentName: 'CascaderField',

    itemLabel: '级联单选择器',              // 标题
    itemValue: [],                        // 输入框的值
    isRequired: false,                    // 是否必填(boolean)
    isReadOnly: false,                    // 是否只读(boolean)
    placeholder: '请选择',                 // 提示文字
    remark: '',                           // 备注/说明文字
    isDefaultShow: true,                  // 是否默认展示(boolean)
    historyType: '',                      // 是否带出历史
    field: '',                            // 关联数据库字段
    fieldName: '',                        // 判断数据库字段名
    clearable: true,                      // 是否可清除

    fixedColumns: null,                   // 指定显示多少列，隐藏多余的(number),
    checkStrictly: true,                  // 是否严格的遵守父子节点不互相关联
    filterable: false,                    // 是否支持搜索
    notFoundText: '无匹配数据',             // 当下拉列表为空时显示的内容
    options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
                value: 'yizhi',
                label: '一致'
            }, {
                value: 'fankui',
                label: '反馈'
            }, {
                value: 'xiaolv',
                label: '效率'
            }, {
                value: 'kekong',
                label: '可控'
            }]
        }, {
            value: 'daohang',
            label: '导航',
            children: [{
                value: 'cexiangdaohang',
                label: '侧向导航'
            }, {
                value: 'dingbudaohang',
                label: '顶部导航'
            }]
        }]
    }],

    interface: {
        method: 'GET',                  // 接口方式
        action: '',                     // 请求地址
        param: ''                       // 参数
    }
}
```

## 级联多选择器
```json
{
    componentName: 'CascadersField',

    itemLabel: '级联多选择器',            // 标题
    itemValue: [],                      // 输入框的值
    isRequired: false,                  // 是否必填(boolean)
    isReadOnly: false,                  // 是否只读(boolean)
    placeholder: '请选择',               // 提示文字
    remark: '',                         // 备注/说明文字
    isDefaultShow: true,                // 是否默认展示(boolean)
    historyType: '',                    // 是否带出历史
    field: '',                          // 关联数据库字段
    fieldName: '',                      // 判断数据库字段名
    clearable: true,                    // 是否可清除

    fixedColumns: null,                 // 指定显示多少列，隐藏多余的(number),
    checkStrictly: false,               // 是否严格的遵守父子节点不互相关联
    filterable: false,                  // 是否支持搜索
    notFoundText: '无匹配数据',           // 当下拉列表为空时显示的内容
    options: [{
        name: '中国',
        value: 'china',
        parent: '0'                     // 为一级时可以不写 parent，但是此时允许为数字 0、空字符串或者字符串 '0'
    }],

    interface: {
        method: 'GET',                  // 接口方式
        action: '',                     // 请求地址
        param: ''                       // 参数
    }
}
```

## 日期选择器
```json
{
    componentName: 'DateField',

    itemLabel: '日期选择器',              // 标题
    itemValue: '',                      // 日期，可以是 JavaScript 的 Date，例如 new Date()，也可以是标准的日期格式
    defaultValue: '',
    isRequired: false,                  // 是否必填(boolean)
    isReadOnly: false,                  // 是否只读(boolean)
    placeholder: '请选择',               // 提示文字
    remark: '',                         // 备注/说明文字
    isDefaultShow: true,                // 是否默认展示(boolean)
    historyType: '',                    // 是否带出历史
    field: '',                          // 关联数据库字段
    fieldName: '',                      // 判断数据库字段名
    clearable: true,                    // 是否可清除

    dateType: 'date',                   // 显示类型，可选值为 date、datetime、year、month
    dateFormat: 'yyyy-MM-dd',           // 展示的日期格式"yyyy-MM-dd"、yyyy-MM-dd HH:mm:ss、yyyy、yyyy-MM
    minValue: null,                     // 限制日期范围的开始日期
    maxValue: null                      // 限制日期范围的结束日期
}
```
<!-- ## 定位
```json
{
    componentName: 'PositionField',
    props: {
        label: '定位',                   // 标题
        value: [],                      // 定位,经纬度

        deviation: 500,                 // 偏差值

    }
}
``` -->
## 地图
```json
{
    componentName: 'MapField',

    itemLabel: '地图',                  // 标题
    lat: '',
    lng: ''
}
```


## 图片上传
```json
{
    componentName: 'UploadImageField',

    itemLabel: '图片上传',               // 标题
    itemValues: [{                      // 上传文件内容
        id: '',
        size: ''
    }],
    isRequired: false,                 // 是否必填(boolean)
    isReadOnly: false,                 // 是否只读(boolean)
    placeholder: '请上传',              // 提示文字/输入框占位文本
    remark: '',                        // 备注/说明文字
    isDefaultShow: true,               // 是否默认展示(boolean)
    historyType: '',                   // 是否带出历史
    field: '',                         // 关联数据库字段
    fieldName: '',                     // 判断数据库字段名

    quality: 1,                        // 图片质量（高500K、中300K、低100K）
    uploadType: [],                    // 图片上传方式，如果为空表示所有方式(camera:拍照、album:相册中选择)
    watermarksData: [],                // 水印数据
    minValue: null,                    // 图片上传最小张数限制
    maxValue: null,                    // 图片上传最大张数限制

    interface: {
        method: 'GET',                 // 接口方式
        action: '',                    // 请求地址
        param: ''                      // 参数
    }
}
```

## 评分
```json
{
    componentName: 'RateField',

    itemLabel: '评分',                  // 标题
    itemValue: 5,                      // 输入框的值
    defaultValue: 0,
    itemLabelPositon: 'left',           // 表单域标签的位置,left 为左对齐，right 为右对齐，top 会置于表单域顶部
    isRequired: false,                  // 是否必填(boolean)
    isReadOnly: false,                  // 是否只读(boolean)
    placeholder: '请选择',               // 提示文字
    remark: '',                         // 备注/说明文字
    isDefaultShow: true,                // 是否默认展示(boolean)
    historyType: '',                    // 是否带出历史
    field: '',                          // 关联数据库字段
    fieldName: '',                      // 判断数据库字段名

    minValue: 0,                        // 评分最小值
    maxValue: 5                         // 评分最大值
}
```
## 图片显示
```json
{
    componentName: 'PreviewImageField',

    itemLabel: '图片显示',               // 标题
    itemValue: '',                      // 值
    remark: '',                         // 备注/说明文字
    isDefaultShow: true,                // 是否默认展示(boolean)
    field: '',                          // 关联数据库字段
    fieldName: ''                       // 判断数据库字段名
}
```


## 说明文字/文本块
```json
{
    componentName: 'TextField',

    itemLabel: '说明文字',               // 标题
    itemValue: '请输入说明文字',          // 值
    remark: '',                         // 备注/说明文字
    isDefaultShow: true,                // 是否默认展示(boolean)
    field: '',                          // 关联数据库字段
    fieldName: '',                      // 判断数据库字段名

    textColor: '',                      // 字体颜色
    url: ''                             // 跳转地址
}
```

## 组/明细
```json
{
    componentName: 'GroupField',

    itemLabel: '组/名细',                // 标题
    remark: '',                         // 备注/说明文字
    isDefaultShow: true,                // 是否默认展示(boolean)
    unfold: true,                       // 是否默认展开(boolean)
    display: '',                        // inline 子组件在一行；line: 子组件以列表形势展示

    childrens: []                       // 子组件列表
}
```

## 表格
```json
{
    componentName: 'TableField',

    itemLabel: '表格',                  // 标题
    remark: '',                         // 备注/说明文字
    isDefaultShow: true,                // 是否默认展示(boolean)

    column: [{                          // 表头内容
        title: '名称',
        align: 'center'
    }, {
        title: '内容',
        align: 'center'
    }],
    childrens: []                       // 子组件列表
}
```

