# json 配置须知
```json
{
  "name": "self",
  "uri": "https://self",
  "prefix": "se", // 前缀
  "xml": {
    "tagAlias": "lowerCase" // xml 标签转为小写驼峰
  },
  "types": [ // 自定义标签类型数组
    {
      // name: 自定义标签名，在xml中显示为 se:attrOne 
      "name": "AttrOne",
      
      // isAbstract: 规定在实例文档中是否可以使用复杂类型。
      // 如果该值为 true，则元素不能直接使用该复杂类型，而是必须使用从该复杂类型派生的复杂类型。
      "isAbstract": true,
      
      /**
       * extends: Some meta-models require it to plug-in new properties that to certain existing model elements. 
       *          This can be acomplished using the extends field
       * 一些元模型要求它为某些现有模型元素插入新属性。可以使用扩展字段来完成
       * 比如 camunda 中的 camunda:FormalExpression extends => bpmn:FormalExpression,
       * 并且在camunda:FormalExpression 中声明的属性 Properties: { name: "resource", type: "String", isAttr: true }
       * 则创建的连线条件 moddle.create("bpmn:FormalExpression") 可以设置新定义属性 resource
       * 打印结果如下: businessObject: {
       *     $type: "bpmn:SequenceFlow"
       *     conditionExpression: { 
       *         $type: "bpmn:FormalExpression"
       *         language: "123123"
       *         resource: "123123123"
       *     }
       * }
       */
      "extends": [], // 扩展选中的类型属性，每次创建数组内的元素实例时都会自动插入新的属性AttrOne
      
      /**
       * superClass: Types can inherit from one or more super types by specifying the superClass property.
       * 指定向上继承所有超类的属性。
       * 例如 camunda:FormalExpression extends 
       * 	=> bpmn:FormalExpression superClass
       *	=> bpmn:Expression superClass
       *	=> bpmn:BaseElement
       * 按照类型结构层级顺序，依次将属性添加到该类型上
       * 如果继承其他自定义配置文件的属性（比如 b.json [ prefix: "b", types: [{ name: "TextB" }] ]）
       * 则当前文件的superClass必须写完整的带前缀的名称 superClass: [ "b:TextB" ]
       * 如果要将该类型作为标签插入到xml中，继承的superClass超类中必须包含 BaseElement 或者 Element 类型
       */
      "superClass": [
        "Element"
      ],
      
      // 自定义标签属性
      "properties": [
        {
          // name: 属性名
          "name": "name",
          
          // type: 属性值类型，可以为任意基础类型或者其他自定义类型。
          // 比如属性值需要设置为另一个自定义类型 AttrTwo时，则 "type": "AttrTwo"
          "type": "String",
          
          // isAttr: 作为标签属性，体现为<se:attrOne name="xxx"></se:attrOne>
          "isAttr": true
          
          // isBody: 属性值插入到标签内部，体现为<se:attrOne>xxx</se:attrOne>; 
          // 另外 isBody 为 true 时，name 只能设置为 value
          // "isBody": false
          
          // isMany: 属性值是否用数组保存，注意与其他配置的互斥：type不能为String、Number等简单类型，isAttr不能为true等等
          // "isMany": true
          
          // default: 默认值
          // "default": "xxx"
          
          // redefines: 重新定义从超类型继承的属性、重写名称、类型和限定符
          // "redefines": String
          
          // isReference: 是否通过其 id 属性引用另一个对象作为属性值，通常在任务节点/网关等设置默认路径时使用
          // "isReference": false
          
          // "xml": {
          //	  serialize: 添加关于如何序列化的额外注释。支持的值:xsi -- 类型序列化为数据类型，而不是元素
          //      "serialize": "xsi:type"
          //  }
        },
        {
          "name": "value",
          "type": "Number",
          "isAttr": "true",
          "default": 2
        }
      ]
    },
    {
      "name": "AttrTwo",
      "superClass": [
        "Element"
      ],
      "meta": {
        "allowedIn": [ "*" ] // 允许进入哪些元素标签内
      },
      "properties": [
        {
          "name": "value",
          "type": "String",
          "isBody": true // 作为内容填充，体现为<se:attrOne>xxx</se:attrOne>
        }
      ]
    }
  ],
  // The enumerations and associations properties are reserved for future use.
  // 枚举和关联属性保留供将来使用。
  enumerations: [],
  associations: []
}
```

博主说明

```json
{
  "name": "Activiti", // 标识是activiti
  "uri": "http://activiti.org/bpmn", // 添加activiti的命名空间
  "prefix": "activiti", // 属性前缀
  "xml": {
    "tagAlias": "lowerCase"
  },
  "associations": [],
  "types": [
    {
      "name": "Process", // <bpmn2:process> 标签
      "isAbstract": true, 
      "extends": [
        "bpmn:Process" // 继承自<bpmn2:process>
      ],
      "properties": [ // 这个标签的属性
        {
          "name": "candidateStarterGroups", // 属性名
          "isAttr": true,  // 是否是属性
          "type": "String" // 属性类型
        },
        {
          "name": "candidateStarterUsers",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "versionTag",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "historyTimeToLive",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "isStartableInTasklist",
          "isAttr": true,
          "type": "Boolean",
          "default": true // 给属性添加默认值，但这个默认值没有写入xml中
        },
        {
          "name":"executionListener", // 监听器属性
          "isAbstract": true, // 抽象
          "type":"Expression" // 类型是表达式
        }
      ]
    },
    // 在这里接着加其他节点
    
    
  ],
  "emumerations": [ ]
}
```

要给用户任务添加自定义的属性 nodeType(节点类型)

```json
{
  "name": "UserTask",
  "isAbstract": true, 
  "extends": [
    "bpmn:UserTask"
  ],
  "properties": [
    {
      "name": "nodeType",
      "isAttr": true,
      "type": "String"
    },
  ] 
}
```
