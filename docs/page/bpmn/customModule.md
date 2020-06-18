# 自定义建模器

首先，添加建模器目录，目录结构为 

```text
-| customPalette
    -| img
        -| start.png
        -| task.png
    -| CustomPalette.js
    -| customPalette.scss
    -| CustomRenderer.js
    -| index.js
    -| util.js
```
`img`目录主要是存放覆盖节点的图片，`CustomPalette.js`是重绘palette的核心，代码如下：

``` js
export default class CustomPalette {
    constructor(palette, create, elementFactory, globalConnect, bpmnFactory, translate) {
        this.create = create
        this.elementFactory = elementFactory
        this.globalConnect = globalConnect
        this.bpmnFactory = bpmnFactory
        this.translate = translate
        palette.registerProvider(this)
    }

// 这个函数就是绘制palette的核心
    getPaletteEntries() {
        const {
            bpmnFactory,
            create,
            elementFactory,
            translate
        } = this

        function dragEventFactory(type) {
            return function (event) {
                const businessObject = bpmnFactory.create(type)
                businessObject['custom'] = 1
                const shape = elementFactory.create('shape', {
                    type: type,
                    businessObject
                })
                create.start(event, shape)
            }
        }

        return {
            'create.start-event': {
                group: 'event',
                title: translate('bpmn:StartEvent'),
                className: 'icon-custom bpmn-icon-start',
                action: {
                    dragstart: dragEventFactory('bpmn:StartEvent')
                }
            },
            'create.task': {
                group: 'model',
                title: translate('bpmn:Task'),
                className: 'icon-custom bpmn-icon-task',
                action: {
                    dragstart: dragEventFactory('bpmn:Task')
                }
            }
        }
    }
}
CustomPalette.$inject = [
    'palette',
    'create',
    'elementFactory',
    'globalConnect',
    'bpmnFactory',
    'translate'
]
```

`customPalette.scss`是操作面板样式设置,代码如下： 
``` css
.djs-palette{
    .icon-custom {
        background-size: 60%;
        background-repeat: no-repeat;
        background-position: center 0;
        position: relative;
    
        .entry_text{
            margin-top: 70% !important;
        }
    }
    .bpmn-icon-start:before {
        content: "";
        width: 100%;
        height: 50%;
        position: absolute;
        background-repeat: no-repeat;
        background-size: auto 100%;
        background-position: center center;
        left: 0px;
        background-image: url('~process/components/bpmn/customPalette/img/start.png');
    }
    
    .bpmn-icon-task:before{
        content: "";
        width: 100%;
        height: 50%;
        position: absolute;
        background-repeat: no-repeat;
        background-size: auto 100%;
        background-position: center center;
        left: 0px;
        background-image: url('~process/components/bpmn/customPalette/img/task.png');
    }
}
```

`CustomRenderer.js`重写render函数，代码如下： 

```js
import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer' // 引入默认的renderer
import { customElements, customConfig } from './util'
import { append as svgAppend, create as svgCreate } from 'tiny-svg'

const HIGH_PRIORITY = 1500 // 最高优先级

export default class CustomRenderer extends BaseRenderer {
  // 继承BaseRenderer
    constructor(eventBus, bpmnRenderer) {
        super(eventBus, HIGH_PRIORITY)
        this.bpmnRenderer = bpmnRenderer
    }

    canRender(element) {
    // ignore labels
        return !element.labelTarget
    }

    drawShape(parentNode, element) {
        const type = element.type // 获取到类型
        if (customElements.includes(type)) {
            const { url, attr } = customConfig[type]
            const customIcon = svgCreate('image', { ...attr, href: url })
            element['width'] = attr.width
            element['height'] = attr.height
            svgAppend(parentNode, customIcon)
            return customIcon
        }
        const shape = this.bpmnRenderer.drawShape(parentNode, element)
        return shape
    }

    getShapePath(shape) {
        return this.bpmnRenderer.getShapePath(shape)
    }
}

CustomRenderer.$inject = ['eventBus', 'bpmnRenderer']

```

`index.js`重新定义export内容,代码如下：

```js
import CustomPalette from './CustomPalette'
import CustomRenderer from './CustomRenderer'

export default {
    __init__: ['customPalette', 'customRenderer'],
    customPalette: ['type', CustomPalette],
    customRenderer: ['type', CustomRenderer]
}
```

`util.js`定义节点，样例代码如下： 

```js
// import cake from './cake.png'
import start from './img/start.png'
import task from './img/task.png'

// 根据元素类型显示自定义图标
const customElements = ['bpmn:StartEvent', 'bpmn:Task'] // 自定义元素的类型，此时我们只需要自定义一种节点，所以数组只有一个元素
const customConfig = {
  // 自定义元素的配置
    'bpmn:StartEvent': {
        url: start,
        attr: { x: 0, y: 0, width: 36, height: 36 }
    },
    'bpmn:Task': {
        url: task,
        attr: { x: 0, y: 0, width: 100, height: 80 }
    }
}

export { customElements, customConfig }
```

在项目中使用，代码如下： 
```js
// 自定义platter
import customModule from './customPalette/index.js';
//========== 省略代码 ============
// 生成实例 （建模器）
this.bpmnModeler = new BpmnModeler({
    container: canvas,
    // 建模器
    additionalModules: [
        // 建模器（为节点增加不同的样式）
        customModule
    ]
});
//========== 省略代码 ============
```
