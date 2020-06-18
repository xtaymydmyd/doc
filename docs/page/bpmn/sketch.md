# BPMN.js粗略风格

首页，引入以下js文件
```js
    <script src="http//at.alicdn.com/t/font_1043853_b5q09j84968.js"></script>
    <!-- sketchy distro -->
    <script src="https://unpkg.com/bpmn-js-sketchy/dist/index.umd.js"></script>

    <!-- app misc -->
    <script src="https://unpkg.com/downloadjs@1.4.7/download.js"></script>
    <script src="https://unpkg.com/file-drops@0.4.0/dist/file-drops.umd.js"></script>
```
在new bpmnModule中添加
```js
// 生成实例 （建模器）
this.bpmnModeler = new BpmnModeler({
    container: canvas,
    // 建模器
    additionalModules: [
        // 粗略风格引入
        BpmnJSSketchy,
    ]
});
```