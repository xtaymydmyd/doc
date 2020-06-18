# BPMN使用

## 配置项

`
"bpmn-js": "^7.0.0",
`

## 创建面板
``` html
<div class="canvas flex-1" ref="canvas"></div>
```
``` js
const canvas = this.$refs.canvas;
// 生成实例 （建模器）
this.bpmnModeler = new BpmnModeler({
    container: canvas,
    textRenderer: {
        defaultStyle: {
            fontFamily: '"Virgil"',
            fontWeight: 'normal',
            fontSize: 14,
            lineHeight: 1.1
        },
        externalStyle: {
            fontSize: 14,
            lineHeight: 1.1
        }
    },
});
```

监听事件
``` js
// 监听流程图改变事件
this.bpmnModeler.on("commandStack.changed", function() { });

// 监听节点选择变化 
this.bpmnModeler.on("selection.changed", e => {});

// 监听节点属性变化
this.bpmnModeler.on("element.changed", event => {});
```

``` css
@import '~bpmn-js/dist/assets/diagram-js.css';
@import '~bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
@import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
@import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
/* @import '~bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css'; */

@import "~bpmn-js/dist/assets/diagram-js.css";
@import "~bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
@import "~bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
@import "~bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css"; 
```

最简单的bpmn定义的xml

``` bpmn.xml
const bpmnXmlStr3 = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="test" name="test" isExecutable="true">
    <bpmn:startEvent id="Event_0d460sa" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="test">
      <bpmndi:BPMNShape id="Event_0d460sa_di" bpmnElement="Event_0d460sa">
        <dc:Bounds x="442" y="132" width="36" height="36" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`
```

将定义的xml导入到画板中
``` js
// 将字符串转换成图显示出来
this.bpmnModeler.importXML(bpmnXmlStr, err => {
    if (err) {
        // 导入失败
        console.error(err);
        return console.error('could not import BPMN 2.0 diagram', err);
    } else {
        // 导入成功
    }
});
```
给节点设置颜色
``` js
const elementRegistry = this.bpmnModeler.get('elementRegistry');
const modeling = this.bpmnModeler.get('modeling');
var element = elementRegistry.get("Event_0d460sa_di")
modeling.setColor([element], {
    stroke: 'green'
})
```

下载xml文件
``` js
this.bpmnModeler.saveXML({format: true}, (err, data) => {
    const dataTrack = 'bpmn'
    const a = document.createElement('a')
    const name = `diagram.${dataTrack}`
    a.setAttribute(
        'href',
        `data:application/bpmn20-xml;charset=UTF-8,${encodeURIComponent(data)}`
    )
    a.setAttribute('target', '_blank')
    a.setAttribute('dataTrack', `diagram:download-${dataTrack}`)
    a.setAttribute('download', name)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
})
```

下载图片SVG
``` js
this.bpmnModeler.saveSVG(function(err, svg) {
    const dataTrack = 'bpmn'
    const a = document.createElement('a')
    const name = 'diagram.svg'
    a.setAttribute(
        'href',
        `data:application/bpmn20-xml;charset=UTF-8,${encodeURIComponent(svg)}`
    )
    a.setAttribute('target', '_blank')
    a.setAttribute('dataTrack', `diagram:download-${dataTrack}`)
    a.setAttribute('download', name)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
});
```