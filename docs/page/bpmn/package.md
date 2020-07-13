## 创建模型扩展

模型扩展被定义在一个的`JSON`文件中，格式如下：

```json
{
  "name": "QualityAssurance",
  "uri": "http://some-company/schema/bpmn/qa",
  // 前缀
  "prefix": "qa",
  "xml": {
    "tagAlias": "lowerCase"
  },
  "types": [
    // 新类型：qa:AnalyzedNode
    {
      "name": "AnalyzedNode",
      // 使用extends扩展现有类型
      "extends": [
        "bpmn:FlowNode"
      ],
      "properties": [
        {
          "name": "suitable",
          "isAttr": true,
          "type": "Integer"
        }
      ]
    },
    // 新类型：qa:AnalysisDetails
    {
      "name": "AnalysisDetails",
      // 如果将扩展元素添加到bpmn:ExtensionElements，则需要声明superClass属性
      "superClass": [ "Element" ],
      "properties": [
        {
          "name": "lastChecked",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "nextCheck",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "comments",
          "isMany": true,
          "type": "Comment"
        }
      ]
    },
    {
      "name": "Comment",
      "properties": [
        {
          "name": "author",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "text",
          "isBody": true,
          "type": "String"
        }
      ]
    }
  ],
  "emumerations": [],
  "associations": []
}
```

# 将模型扩展添加到bpmn-js

创建`bpmn-js`的实例时，通过moddleextensions属性配置添加模型扩展：