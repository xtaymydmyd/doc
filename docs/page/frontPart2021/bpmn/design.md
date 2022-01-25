# 流程设计器

## 使用Bpmn-js开发设计器

关于bpmn-js如何使用建议搭建去github上面搜索，这里贴上官网地址： `https://github.com/bpmn-io/bpmn-js`

官网案例地址：`https://github.com/bpmn-io/bpmn-js-examples`

开发设计器时参考了霖呆呆的关于bpmn-js从0开发的一系列文章，地址： `https://juejin.cn/post/6844904017567416328`


### 1.1 自定义右边属性面板
```js
<template>
  <div>
    <el-container style="height: 700px">
      <el-aside width="80%" style="border: 1px solid #DCDFE6" >
        <div ref="canvas" style="width: 100%;height: 100%"></div>
      </el-aside>      
<el-main style="border: 1px solid #DCDFE6;background-color:#FAFAFA      ">
          <el-form label-width="auto" size="mini" label-position="top">
            <!-- 动态显示属性面板 -->            
<component :is= "propsComponent" :element= "element" :key= "key"></component>
          </el-form>
      </el-main>
    </el-container>
  </div>
</template>
```
我是通过propsComponent属性的变化来显示不同事件的属性，比如用户任务的属性、网关的属性
propsComponent属性是通过监听modeler、element来改变值的，代码如下：
```js
addModelerListener() {
        // 监听 modeler
        const bpmnjs = this.bpmnModeler
        const that = this
        // 'shape.removed', 'connect.end', 'connect.move'
        const events = ['shape.added', 'shape.move.end', 'shape.removed']
        events.forEach(function(event) {
          that.bpmnModeler.on(event, e => {
            var elementRegistry = bpmnjs.get('elementRegistry')
            var shape = e.element ? elementRegistry.get(e.element.id) : e.shape
            // console.log(shape)
            if (event === 'shape.added') {
              console.log('新增了shape');
              // 展示新增图形的属性
              that.key = e.element.id.replace('_label', '');
              that.propsComponent = bpmnHelper.getComponentByEleType(shape.type);
              that.element = e.element;
              
            } else if (event === 'shape.move.end') {
              console.log('移动了shape')
              // 展示新增图形的属性
              that.key = shape.id;
              that.propsComponent = bpmnHelper.getComponentByEleType(shape.type);
              that.element = e.shape;
            } else if (event === 'shape.removed') {
              console.log('删除了shape')
              // 展示默认的属性
              that.propsComponent = 'CommonProps'
            }
          })
        })
      },
      addEventBusListener() {
        // 监听 element
        let that = this
        const eventBus = this.bpmnModeler.get('eventBus')
        const eventTypes = ['element.click', 'element.changed', 'selection.changed']
        eventTypes.forEach(function(eventType) {
          eventBus.on(eventType, function(e) {
            if (eventType === 'element.changed') {
              that.elementChanged(e)
            } else if (eventType === 'element.click') {
              console.log('点击了element');
              if (!e || e.element.type == 'bpmn:Process') {
                that.key = '1';
                that.propsComponent = 'CommonProps'
                that.element = e.element;
              } else {
                // 展示新增图形的属性
                that.key = e.element.id;
                that.propsComponent = bpmnHelper.getComponentByEleType(e.element.type);
                that.element = e.element;
              }
              
            }
          })
        })
      },
```
由于vue的特殊性，在使用属性组件前，还需要引入组件
```js
components: {
    CommonProps,
    ProcessProps,
    StartEventProps,
    EndEventProps,
    IntermediateThrowEventProps,
    ExclusiveGatewayProps,
    ParallelGatewayProps,
    InclusiveGatewayProps,
    UserTaskProps,
    SequenceFlowProps,
    CallActivityProps
  },
```
接下来就是实现各个事件属性的页面了。
### 1.2 适配activiti
由于bpmn-js官方是适配camunda的，所以对activiti存在不兼容的地方，为了让bpmn-js能使用activiti，我们需要在BpmnModeler中扩展activiti 代码如下：
```js
import activitiModdleDescriptor from '../js/activiti.json';

this.bpmnModeler = new BpmnModeler({
          container: canvas,
          //添加属性面板，添加翻译模块
          additionalModules: [
              customTranslateModule,
              customControlsModule  
          ],
          //模块拓展，拓展activiti的描述
          moddleExtensions: {
              activiti: activitiModdleDescriptor
          }
        });
```
关于activiti.json文件，我建议你看自定义元模型示例

####  关于activiti.json文件怎么配置🌟
```js
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
  "emumerations": [ ]}
```
例子： 我的项目中需要给用户任务添加自定义的属性 nodeType(节点类型)
```js
{  "name": "UserTask",  "isAbstract": true,   "extends": [    "bpmn:UserTask"  ],  "properties": [    {      "name": "nodeType",      "isAttr": true,      "type": "String"    },  ] }
```
### 1.3 关于部分扩展和完全自定义🌟
拿左侧工具栏来说，前端项目：src/edit-modeler/js/customController/CustomPalette.js文件
问：
可以看到我自定义了用户任务和调用活动节点，其他的节点我用bpmn-js自带的；
那如果我不想用bpmn-js自带的怎么办呢？
解答：
src/edit-modeler/js/customController/index.js文件
```js
import CustomContextPad from './CustomContextPad';
import CustomPalette from './CustomPalette';
export default {
    __init__: [ 'customContextPad', 'customPalette' ],
    customContextPad: [ 'type', CustomContextPad ],customPalette: [ 'type', CustomPalette ]
};
```

这里用的是customPalette，如果要完全自定义则换成paletteProvider;
同理：完全自定义contextPad用contextPadProvider,完全自定义属性面板用propertiesProvider
```js
import CustomContextPad from './CustomContextPad';
import CustomPalette from './CustomPalette';
export default {
    __init__: [ 'contextPadProvider', 'paletteProvider' ],
    contextPadProvider: [ 'type', CustomContextPad ],
    paletteProvider: [ 'type', CustomPalette ]
};
```
### 1.4 关于属性前缀🌟
问：
我们都知道，bpmn-js生成的xml文件属性前缀都是camunda，那如何换成我们需要的前缀呢？
答：
有两种方法
一种是扩展json文件，例如我们需要activiti前缀就扩展了activiti.json
第二种就是直接修改初始化xml文件，我们打开设计器时会importXML一个空节点的xml，我们需要在这个xml中加。
例如：我需要加一个normal的前缀，生成属性后为：normal:nodeType;我们在xml中加上这句话：
```js
xmlns:normal="flowable.org/bpmn/normal…
<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL"
    xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
    xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
    xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
    xmlns:normal="http://flowable.org/bpmn/normal"
    xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd"id="sample-diagram" targetNamespace="http://activiti.org/bpmn">
    <bpmn2:process id="Process_1" isExecutable="true"></bpmn2:process>
    <bpmndi:BPMNDiagram id="BPMNDiagram_1">
        <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1"></bpmndi:BPMNPlane>
    </bpmndi:BPMNDiagram>
</bpmn2:definitions>
```
xml中加上后，设计器生成的属性如何加？
其实很简单，我们updateProperties时可以加上前缀，例如：
```js
modeling.updateProperties(element, {'normal:nodeType': 'nodeType'})
```

### 1.5 由于属性面板是自定义的，修改了属性面板的属性值，如何同步到xml中；以及我在图形上修改了属性如何同步属性面板🌟
项目是vue架构，那就充分发挥vue的优势: 监听
部分代码如下：
```js
watch: {
    id (newVal, oldVal) {
        const bpmnModeler = this.bpmnModeler();
        const modeling = bpmnModeler.get('modeling');
        modeling.updateProperties(this.element,{'id':newVal});
    },
    name(newVal, oldVal){
        const bpmnModeler = this.bpmnModeler();
        const modeling = bpmnModeler.get('modeling');
        modeling.updateProperties(this.element,{'name':newVal});
    },
        // 监控element值，当发生改变时获取响应的属性element: {deep: true,immediate: true,handler(newVal, oldVal) {if(newVal) {const bpmnModeler = this.bpmnModeler(); // 我这里由于项目原因用的是方法获取bpmnModelerthis.id = newVal.businessObject.get('id');this.name = newVal.businessObject.get('name');// 初始化赋值const modeling = bpmnModeler.get('modeling');modeling.updateProperties(this.element,{'name':this.name});modeling.updateProperties(this.element,{'process_namespace':this.process_namespace});modeling.updateProperties(this.element,{'process_id':this.id});}}}
    }
```
由于element是一个复杂的类型，所以深度监听一定要打开。
同步xml：用的是modeling.updateProperties方法，也可以使用newVal.businessObject.$attrs['name'] = this.name修改
修改图形属性同步属性面板：由于深度监听了element，所以修改了图形属性就等于修改了element，所以这里会监听到
### 1.6 如何添加监听器🌟
可以查看src\edit-modeler\components\CommonProps.vue这个文件
### 1.7 如何添加自定义的标签🌟
我建议你看：![自定义元模型示例](github.com/bpmn-io/bpm…)
### 1.8 如何添加多实例🌟
这里提供代码添加的方法，可以直接在图形中点击扳手设置多实例
```js
const moddle = bpmnModeler.get('moddle');
loopCharacteristics = moddle.create('bpmn:MultiInstanceLoopCharacteristics');loopCharacteristics['collection'] = 'flow_assignee';
loopCharacteristics['elementVariable'] = 'flow_assignee';
let completionCondition = elementsHelper.createElement('bpmn:FormalExpression', { 
    body: '${mulitiInstance.completeTask(execution,passResult,mulitiActivityId)}' 
}, loopCharacteristics, bpmnFactory);
loopCharacteristics['completionCondition'] = completionCondition;modeling.updateProperties(element, { loopCharacteristics: loopCharacteristics });
```
1.9 获取全部节点和根节点🌟
```js
// 获取全部节点，也可以用来获取根节点
bpmnModeler._definitions.rootElements[0]
// 根节点
bpmnModeler.get('canvas').getRootElement()
```
1.10 如何给节点的同级添加节点🌟
例如：
给SequenceFlow的同级添加了BoundaryEvent,只要获取根节点下的所有节点然后push进入你添加的节点就行了
```js
bpmnModeler._definitions.rootElements[0].flowElements.push(boundaryEvent);
```

1.11 默认导入的空xml，给标签的id赋动态值报：没有可展示的流程/协作🌟

我的默认空xml如下：

最后生成的xml如下：

可以看到上图中id是以数字开头的， 就是这里导致的😂😂😂
只要开头是字母就没事了，例如：id = `T-${uuidv4()}`;
此处应有掌声👏👏👏
1.12 BpmnViewer流程追踪展示流程图，但是流程图被遮挡🌟
加入下代码可解决
```js
const currentViewbox = this.bpmnViewer.get('canvas').viewbox()      
const widthWindow = window.outerWidth;      
const heightWindow = window.outerHeight;      
const elementMid = {        
    x: widthWindow / 2,        
    y: heightWindow / 2      
}      
this.bpmnViewer.get('canvas').viewbox({        
    x: elementMid.x - currentViewbox.width / 2,        
    y: elementMid.y - currentViewbox.height / 2,        
    width: currentViewbox.width,        
    height: currentViewbox.height      
})      
const width = document.getElementById('canvas').offsetWidth      
this.bpmnViewer.get('canvas').zoom(width / this.width)
```
1.13 xml中有两个相同的属性🌟

如果你在扩展的xxx.json文件中，比如activiti.json文件；你在json文件中配置了用户任务的属性flowable:assignee;这个属性是会被添加在businessObject下，那如果我们要通过businessObject.attrs\['flowable:assignee'\]修改，属性会被添加在businessObject.attrs这个下面，所以生成xml时会生成两个
1.14 清理画布
```js
bpmnModeler.clear()
```
1.15 设置默认流
```js
const newDefaultFlow = elementRegistry.get(element.id).businessObject;
modeling.updateProperties(targetElement, { default: newDefaultFlow });
```
1.16 主子流程调用
活动节点中的属性flowable:calledElementType="id"可以是id也可以是key，id表示的是流程定义表中的id， key也就是定义表中的key字段
1.17 禁用一些画布的操作
```js
const bpmnModeler = new BpmnModeler({
      container: '#canvas',
      additionalModules:[
        BpmnModeler, {
          paletteProvider:['value',''], // 禁用左面板
          labelEditingProvider:['value', ''], // 禁用编辑
          contextPadProvider: ['value', ''], // 禁用点击出现的contextPad
          bendpoints: [ 'value', {} ], // 禁止流程线变换waypoints
          zoomScroll:['value',''],// 禁止画布滚动
          moveCanvas:['value',''],// 禁止拖拽
        }
      ],
      height: '400px'
    });
```
如果后端传给前端的是json文件，不是xml；请大胆的怼回去🤔️🤔️🤔️
1.18 隐藏bpmnjs图标
```js
.bjs-powered-by {
    display:none !important;
}

或者：
// 删除 bpmn logo  bpmn.io官方要求不给删或者隐藏，否则侵权   内部使用const bjsIoLogo = document.querySelector('.bjs-powered-by');while (bjsIoLogo.firstChild) {  bjsIoLogo.removeChild(bjsIoLogo.firstChild);}
```
1.19 超时自动完成


xml如下：
```js
<sequenceFlow id="Flow_1hu7yoy" sourceRef="Activity_1ig8oe5" targetRef="Event_1xmxdxy" />
    <serviceTask id="Activity_1ig8oe5">
      <incoming>Flow_1tvddwv</incoming>
      <outgoing>Flow_1hu7yoy</outgoing>
    </serviceTask>
    <boundaryEvent id="Event_1bi4wq0" attachedToRef="Activity_1ig8oe5">
      <timerEventDefinition id="TimerEventDefinition_0wsqmm3" />
    </boundaryEvent>
```
timerEventDefinition里的时间属性添加一下就ok啦
2 后端activiti实现
具体怎么搭建activiti环境，相信大家都能百度到，我只介绍怎么将bpmn-js和activiti兼容
### 3.1 解析BPMN文件
如图，展示了一个XML格式的流程文件如何经过几个大的步骤部署到引擎的过程 
### 3.2 先由前端传xml保存到后端开始
http请求将携带主要的两个参数，bpmn_xml和svg_xml
由于activiti保存在数据库中的是json文件，所以我们需要将bpmn_xml文件转换成json
activiti官方提供的转换方法并不能满足我，我自定义了转换方法和解析器，activiti官方也允许你自定义解析器
先上方法：
```js
public static JsonNode converterXmlToJson(String bpmnXml) {
        // 创建转换对象
        BpmnXMLConverter bpmnXMLConverter = new BpmnXMLConverter();
        // XMLStreamReader读取XML资源
        XMLInputFactory xmlInputFactory = XMLInputFactory.newInstance();
        StringReader stringReader = new StringReader(bpmnXml);
        XMLStreamReader xmlStreamReader = null;
        try {
            xmlStreamReader = xmlInputFactory.createXMLStreamReader(stringReader);
        } catch (XMLStreamException e) {
            e.printStackTrace();
        }
        // UserTaskXMLConverter类是我自定义的
        BpmnXMLConverter.addConverter(new UserTaskXMLConverter());
        // 把xml转换成BpmnModel对象
        BpmnModel bpmnModel = bpmnXMLConverter.convertToBpmnModel(xmlStreamReader);
        // BpmnJsonConverter类是我自定义的
        // 创建转换对象
        BpmnJsonConverter bpmnJsonConverter = new BpmnJsonConverter();
        // 把BpmnModel对象转换成json
        JsonNode jsonNodes = bpmnJsonConverter.convertToJson(bpmnModel);
        // 返回的json会被保存到数据库中
        return jsonNodes;
    }
```
以上代码使用了Activiti的`activiti-bpmn-converter`模块提供的BpmnModel对象与XML的互转功能，通过创建`org.activiti.bpmn.converter.BpmnXMLConverter`类对象调用相应的方法即可实现BpmnModel对象与XML之间的转换操作。
首先，自定义类`UserTaskXMLConverter`是因为我的用户任务事件中有自定义的属性；在将xml转为BpmnModel时，如果是用户任务事件就会走我自定义的`UserTaskXMLConverter`类
然后是将BpmnModel转为json，注意每个bpmnModel.attributes下存方着所有属性
### 3.3 自定义的BpmnJsonConverter文件
Activiti提供的`activiti-json-converter`模块中提供了`BpmnJsonConverter`类，我们对比一下我自定义的和官方的 
发现，我们自定义的类中的static中有几个Custom开头的类，见名知义，这些类是关于用户任务、流程、网关的转换类。
问：为何要自定义这些类呢？
答：
1. 因为前端自定义属性（例如：多实例属性、默认流程属性）使用官方的toBpmnModel转换是会丢失自定义属性的,我们自定义类主要是将自定义属性放在attribute中，并且转换多实例属性为Activiti的BPMN规范接受。
2. convertElementToJson时加上自定义的属性键值
```js
用户任务自定义属性转换相关代码：
// 多实例类型
String multiInstanceType = getPropertyValueAsString(PROPERTY_MULTIINSTANCE_TYPE, elementNode);
// 通过权重
String multiInstanceCondition = getPropertyValueAsString(PROPERTY_MULTIINSTANCE_CONDITION, elementNode);
if (StringUtils.isNotEmpty(multiInstanceType) && !"none".equalsIgnoreCase(multiInstanceType)) {
    String name = getPropertyValueAsString(PROPERTY_NAME, elementNode);
    MultiInstanceLoopCharacteristics multiInstanceObject = new MultiInstanceLoopCharacteristics();
    if ("sequential".equalsIgnoreCase(multiInstanceType))     {
        multiInstanceObject.setSequential(true);
    } else {
        multiInstanceObject.setSequential(false);
    }
    if (StringUtils.isNotEmpty(multiInstanceCondition)) {
        try {
            Integer.valueOf(multiInstanceCondition);
        } catch (Exception ex) {
            throw new WorkflowApiException(name + "配置成了会签，但通过权重不是一个整数");
        }
        multiInstanceObject.setCompletionCondition("${nextTaskEvaluator.isComplete(execution," + multiInstanceCondition + ")}");
    } else {
        throw new WorkflowApiException(name + "配置成了会签，但没有配置通过权重");
    }
}
```
### 3.4 Bpmn解析处理器
Activiti支持在解析BPMN资源文件时允许自定义BPMN解析处理器（BpmnParseHandler）参与，可以在开始解析一个元素（Element）或解析完之后调用自定义的BPMN解析处理器，在自定义的解析处理器中，我们可以更改一些BPMN对象的属性。
添加BPMN解析处理器可以在Activiti引擎配置文件中配置属性“preBpmnParseHandlers”和“postBpmnParseHandlers”。下面的代码针对Pre（前置）和Post（后置）类型分别添加了一个解析处理器 
上面的代码添加了两种类型的BPMN解析处理器，之所以区分类型是为了更细致地划分处理器类型；Pre类型处理器是总是排在第一位执行，也就是在所有流程文件中定义地元素之前，而Post类型的处理器被放在最后执行，也就是所有流程文件中定义的而元素之后。如果解析处理器有特定的顺序要求，就可以用Pre和Post类型来区分。 


