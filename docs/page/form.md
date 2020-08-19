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
    模块？
```

## 单行输入框
```json
{
    componentName: 'InputField',        // 组件名称
    hmId: '',                           // 随机生成组件ID
    props: {
        label: '输入框',                 // 标题
        value: '',                      // 输入框的值
        defaultValue: '',               // 默认值
        labelPositon: 'left',           // 表单域标签的位置,left 为左对齐，right 为右对齐，top 会置于表单域顶部
        required: false,                // 是否必填(boolean)
        readonly: false,                // 是否只读(boolean)
        clearable: false,               // 是否可清空(boolean)
        placeholder: '请输入',           // 提示文字/输入框占位文本
        remark: '',                     // 备注/说明文字
        isDefaultShow: true,            // 是否默认展示(boolean)
        pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]+$/, // 表单验证规则(正则)
        message: '名称中不能包含特殊字符',  
        historyType: ''                 // 是否带出历史
        field: '',                      // 关联数据库字段     
        fieldName: '',                  // 判断数据库字段名 

        min: null,                      // 最小长度
        max: null,                      // 最大长度
    }
}
```

## 数字输入框
```json
{
    componentName: 'NumberField',   // 组件名称
    hmId: '',                       // 随机生成组件ID
    props: {
        label: '数字输入框',          // 标题
        value: '',                  // 输入框的值
        defaultValue: '',           // 默认值
        labelPositon: 'left',       // 表单域标签的位置,left 为左对齐，right 为右对齐，top 会置于表单域顶部
        required: false,            // 是否必填(boolean)
        readonly: false,            // 是否只读(boolean)
        clearable: false,           // 是否可清空(boolean)
        placeholder: '请输入',       // 提示文字/输入框占位文本
        remark: '',                 // 备注/说明文字
        isDefaultShow: true,        // 是否默认展示(boolean)
        historyType: ''             // 是否带出历史
        field: '',                  // 关联数据库字段     
        fieldName: '',              // 判断数据库字段名 

        precision: 0,               // 数值精度	(number)
        min: null,                  // 最大值
        max: null,                  // 最小值 
    }
}
```

## 多行输入框
```json
{
    componentName: 'TextareaField',     // 组件名称
    hmId: '',                           // 随机生成组件ID
    props: {
        label: '多行输入框',              // 标题
        value: '',                      // 输入框的值
        defaultValue: '',               // 默认值
        labelPositon: 'left',           // 表单域标签的位置,left 为左对齐，right 为右对齐，top 会置于表单域顶部
        required: false,                // 是否必填(boolean)
        readonly: false,                // 是否只读(boolean)
        clearable: false,               // 是否可清空(boolean)
        placeholder: '请输入',           // 提示文字/输入框占位文本
        remark: '',                     // 备注/说明文字
        isDefaultShow: true,            // 是否默认展示(boolean)
        pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]+$/, // 表单验证规则(正则)
        message: '名称中不能包含特殊字符',  
        historyType: ''                 // 是否带出历史
        field: '',                      // 关联数据库字段     
        fieldName: '',                  // 判断数据库字段名 

        rows: 3,                        // 输入框默认行数
        min: null,                      // 最小长度
        max: null,                      // 最大长度
    }
}
```

## 单选框 
```json
{
    componentName: 'RadioField',
    props: {
        label: '单选框标题',                 // 标题
        value: '',                      // 输入框的值
        labelPositon: 'left',           // 表单域标签的位置,left 为左对齐，right 为右对齐，top 会置于表单域顶部
        required: false,                // 是否必填(boolean)
        readonly: false,                // 是否只读(boolean)
        placeholder: '请选择',           // 提示文字
        clearable: false,               // 是否可以清空选项，只在单选时有效(boolean)
        remark: '',                     // 备注/说明文字
        isDefaultShow: true,            // 是否默认展示(boolean)
        pattern: '正则公式',             // 表单验证规则(正则)
        message: '',  
        historyType: ''                 // 是否带出历史
        field: '',                      // 关联数据库字段     
        fieldName: '',                  // 判断数据库字段名 

        options: [{                     // 可选项数据源(Array)
            key: '1',                   // (String)
            value: '选项',               // (String)
            disabled: false,            // 是否禁用当前选项 (boolean)
            hidden: false,              // 是否展示
        }]
    },
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
    props: {
        label: '多选框',                 // 标题
        values: [],                     // 输入框的值
        labelPositon: 'left',           // 表单域标签的位置,left 为左对齐，right 为右对齐，top 会置于表单域顶部
        required: false,                // 是否必填(boolean)
        readonly: false,                // 是否只读(boolean)
        placeholder: '请选择',           // 提示文字
        clearable: false,               // 是否可以清空选项，只在单选时有效(boolean)
        remark: '',                     // 备注/说明文字
        isDefaultShow: true,            // 是否默认展示(boolean)
        historyType: ''                 // 是否带出历史
        field: '',                      // 关联数据库字段     
        fieldName: '',                  // 判断数据库字段名 

        options: [{                     // 可选项数据源
            key: '1',
            value: '选项',
            disabled: false,            // 是否禁用当前选项(boolean)
            hidden: false,              // 是否展示
        }]
    },
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
    props: {
        label: '下拉选择器',              // 标题
        value: '',                      // 输入框的值
        labelPositon: 'left',           // 表单域标签的位置,left 为左对齐，right 为右对齐，top 会置于表单域顶部
        required: false,                // 是否必填(boolean)
        readonly: false,                // 是否只读(boolean)
        placeholder: '请选择',           // 提示文字
        remark: '',                     // 备注/说明文字
        isDefaultShow: true,            // 是否默认展示(boolean)
        historyType: ''                 // 是否带出历史
        field: '',                      // 关联数据库字段     
        fieldName: '',                  // 判断数据库字段名 

        clearable: false,               // 是否可以清空选项，只在单选时有效(boolean)
        filterable: false,              // 是否支持搜索
        notFoundText: '无匹配数据',       // 当下拉列表为空时显示的内容
        options: [{                     // 可选项数据源
            key: '1',
            value: '选项',
            disabled: false,            // 是否禁用当前选项
            hidden: false,              // 是否展示
        }]
    },
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
    componentName: 'SelectField',
    props: {
        label: '下拉选择器',              // 标题
        values: [],                     // 输入框的值,多选时 value值为数组 
        labelPositon: 'left',           // 表单域标签的位置,left 为左对齐，right 为右对齐，top 会置于表单域顶部
        required: false,                // 是否必填(boolean)
        readonly: false,                // 是否只读(boolean)
        placeholder: '请选择',           // 提示文字
        remark: '',                     // 备注/说明文字
        isDefaultShow: true,            // 是否默认展示(boolean)
        historyType: ''                 // 是否带出历史
        field: '',                      // 关联数据库字段     
        fieldName: '',                  // 判断数据库字段名 

        filterable: false,              // 是否支持搜索
        notFoundText: '无匹配数据',       // 当下拉列表为空时显示的内容
        options: [{                     // 可选项数据源
            key: '1',
            value: '选项',
            disabled: false,            // 是否禁用当前选项
            hidden: false,              // 是否展示
        }]
    },
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
    props: {
        label: '级联选择器',              // 标题
        value: '',                      // 输入框的值
        labelPositon: 'left',           // 表单域标签的位置,left 为左对齐，right 为右对齐，top 会置于表单域顶部
        required: false,                // 是否必填(boolean)
        readonly: false,                // 是否只读(boolean)
        placeholder: '请选择',           // 提示文字
        remark: '',                     // 备注/说明文字
        isDefaultShow: true,            // 是否默认展示(boolean)
        historyType: ''                 // 是否带出历史
        field: '',                      // 关联数据库字段     
        fieldName: '',                  // 判断数据库字段名 

        fixedColumns: ''                // 指定显示多少列，隐藏多余的(number),
        checkStrictly: false,           // 是否严格的遵守父子节点不互相关联
        filterable: false,              // 是否支持搜索
        notFoundText: '无匹配数据',       // 当下拉列表为空时显示的内容
        options: [{
            name: '中国',
            value: 'china',
            parent: '0'                 // 为一级时可以不写 parent，但是此时允许为数字 0、空字符串或者字符串 '0'
        }]
    },
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
    componentName: 'CascaderField',
    props: {
        label: '级联选择器',              // 标题
        value: [],                      // 输入框的值
        labelPositon: 'left',           // 表单域标签的位置,left 为左对齐，right 为右对齐，top 会置于表单域顶部
        required: false,                // 是否必填(boolean)
        readonly: false,                // 是否只读(boolean)
        placeholder: '请选择',           // 提示文字
        remark: '',                     // 备注/说明文字
        isDefaultShow: true,            // 是否默认展示(boolean)
        historyType: ''                 // 是否带出历史
        field: '',                      // 关联数据库字段     
        fieldName: '',                  // 判断数据库字段名 

        fixedColumns: ''                // 指定显示多少列，隐藏多余的(number),
        checkStrictly: false,           // 是否严格的遵守父子节点不互相关联
        filterable: false,              // 是否支持搜索
        notFoundText: '无匹配数据',       // 当下拉列表为空时显示的内容
        options: [{
            name: '中国',
            value: 'china',
            parent: '0'                 // 为一级时可以不写 parent，但是此时允许为数字 0、空字符串或者字符串 '0'
        }]
    },
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
    props: {
        label: '日期选择器',              // 标题
        value: '',                      // 日期，可以是 JavaScript 的 Date，例如 new Date()，也可以是标准的日期格式
        labelPositon: 'left',           // 表单域标签的位置,left 为左对齐，right 为右对齐，top 会置于表单域顶部
        required: false,                // 是否必填(boolean)
        readonly: false,                // 是否只读(boolean)
        placeholder: '请选择',           // 提示文字
        remark: '',                     // 备注/说明文字
        isDefaultShow: true,            // 是否默认展示(boolean)
        historyType: ''                 // 是否带出历史
        field: '',                      // 关联数据库字段     
        fieldName: '',                  // 判断数据库字段名 

        type: 'date'                    // 显示类型，可选值为 date、datetime、year、month
        format: '',                     // 展示的日期格式"yyyy-MM-dd"、yyyy-MM-dd HH:mm:ss、yyyy、yyyy-MM
        min: null,                      // 限制日期范围的开始日期
        max: null,                      // 限制日期范围的结束日期 
    }
}
```
<!-- ## 定位
```json
{
    componentName: 'PositionField',
    props: {
        label: '定位',                   // 标题
        value: [],                      // 定位,经纬度
        labelPositon: 'left',           // 表单域标签的位置,left 为左对齐，right 为右对齐，top 会置于表单域顶部

        deviation: 500,                 // 偏差值

    }
}
``` -->
## 地图
```json
{
    componentName: 'PositionField',
    props: {
        label: '查看地图',                // 标题
        lat: '',
        lng: '',
        labelPositon: 'left',           // 表单域标签的位置,left 为左对齐，right 为右对齐，top 会置于表单域顶部
    }
}
```


## 图片上传
```json
{
    componentName: 'UploadImageField',
    props: {
        label: '图片上传',                // 标题
        values: [{                      // 上传文件内容
            id: '',
            size: ''
        }],                     
        labelPositon: 'left',           // 表单域标签的位置,left 为左对齐，right 为右对齐，top 会置于表单域顶部
        required: false,                // 是否必填(boolean)
        readonly: false,                // 是否只读(boolean)
        placeholder: '请上传',           // 提示文字/输入框占位文本
        remark: '',                     // 备注/说明文字
        isDefaultShow: true,            // 是否默认展示(boolean)
        historyType: ''                 // 是否带出历史
        field: '',                      // 关联数据库字段     
        fieldName: '',                  // 判断数据库字段名 

        quality: 1                      // 图片质量（高500K、中300K、低100K）
        uploadType: [],                 // 图片上传方式，如果为空表示所有方式(camera:拍照、album:相册中选择)
        watermarksData: []              // 水印数据
        min: null                       // 图片上传最小张数限制
        max: null                       // 图片上传最大张数限制
    },
    interface: {
        method: 'GET',                  // 接口方式
        action: '',                     // 请求地址
        param: ''                       // 参数
    }
}
```

## 评分
```json
{
    componentName: 'previewImageField',
    props: {
        label: '级联选择器',              // 标题
        value: [],                      // 输入框的值
        labelPositon: 'left',           // 表单域标签的位置,left 为左对齐，right 为右对齐，top 会置于表单域顶部
        required: false,                // 是否必填(boolean)
        readonly: false,                // 是否只读(boolean)
        placeholder: '请选择',           // 提示文字
        remark: '',                     // 备注/说明文字
        isDefaultShow: true,            // 是否默认展示(boolean)
        historyType: ''                 // 是否带出历史
        field: '',                      // 关联数据库字段     
        fieldName: '',                  // 判断数据库字段名 

        min: 0                       // 评分最小值 
        max: 5                       // 评分最大值
    }
}
```
## 图片显示
```json
{
    componentName: 'previewImageField',
    props: {
        label: '说明文字/文本块',          // 标题
        value: '请输入说明文字',           // 值
        labelPositon: 'left',           // 表单域标签的位置,left、top
        remark: '',                     // 备注/说明文字
        isDefaultShow: true,            // 是否默认展示(boolean)
        field: '',                      // 关联数据库字段     
        fieldName: '',                  // 判断数据库字段名 
    }
}
```


## 说明文字/文本块
```json
{
    componentName: 'TextField',
    props: {
        label: '说明文字/文本块',          // 标题
        value: '请输入说明文字',           // 值
        labelPositon: 'left',           // 表单域标签的位置,left、top
        remark: '',                     // 备注/说明文字
        isDefaultShow: true,            // 是否默认展示(boolean)
        field: '',                      // 关联数据库字段     
        fieldName: '',                  // 判断数据库字段名 

        textColor: '',                  // 字体颜色
        url: ''                         // 跳转地址
    }
}
```

## 组/明细
```json
{
    componentName: 'GroupField',
    props: {
        label: '明细',               // 标题
        remark: ''                  // 备注/说明文字
        isDefaultShow: true,        // 是否默认展示(boolean)
        unfold: true,               // 是否默认展开(boolean)
        display: ''                 // inline 子组件在一行；line: 子组件以列表形势展示
    },
    childrens: []                   // 子组件列表
}
```

## 表格
```json
{
    componentName: 'GroupField',
    props: {
        label: '表格',               // 标题
        remark: ''                  // 备注/说明文字
        isDefaultShow: true,        // 是否默认展示(boolean)

        column: [{                  // 表头内容
            title: 'Name',
            align: 'center',
            width: 150
        },{
            title: 'Content',
            align: 'center',
            width: 150
        }]
    },
    childrens: []                   // 子组件列表
}
```

