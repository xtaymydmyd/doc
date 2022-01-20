# render函数 (场景：iview -> table)

## render函数组成
```text
-| 标签名称/
-| 标签属性/
    -| class｜对象/
    -| style｜对象/
    -| attrs｜对象/
    -| props｜对象/
    -| on｜事件/
    -| nativeOn｜事件/
    -| scopedSlots
    -| directives
    -| slot
    -| key
    -| ref
    -| refinFor
-| 子元素数组/

```

### class | 对象
```text
class: {
	"form_item_block": true
}
与 `v-bind:class` 的 API 相同，接受一个字符串、对象或字符串和对象组成的数组
```

### style｜对象
```text
style:{
	fontSize: '12px'
}
与 `v-bind:style` 的 API 相同，接受一个字符串、对象，或对象组成的数组
```

### attrs｜对象
```text
attrs:{
	id: 'form_item_123'
}
// 普通的 HTML attribute，会加到 BaseButton 最外层的元素上
```

### props｜对象
```text
props：{
	type: 'warning';
	size: 'large',
}
组件 prop，就是我们正常使用子组件时的那些 props
```

### on | 事件
```text
on: {
    click: ()=> {

    },
    dblclick: ()=> {

    },
    hook:mounted: () => {

    }
}
子组件 `$emit` 的事件才能接收到，否则在下一个属性才能监听到
```
### nativeOn | 事件
```text
仅用于组件，用于监听原生事件，而不是组件内部使用 `vm.$emit` 触发的事件
```
### scopedSlots
```text
作用域插槽的格式为：{ name: props => VNode | Array<VNode> }
```
### directives
```text
自定义指令
```
### slot
```text
如果组件是其它组件的子组件，需为插槽指定名称
```
## 介绍 
1. render方法的实质就是生成template模板； 
2. 通过调用一个方法来生成，而这个方法是通过render方法的参数传递给它的； 
3. 这个方法有三个参数，分别提供标签名，标签相关属性，标签内部的html内容 
4. 通过这三个参数，可以生成一个完整的模板

!>https://blog.csdn.net/qq78827534/article/details/80792514 (render函数介绍，以及 render: h => h(App))

备注： 
> 1、render方法可以使用JSX语法，但需要Babel plugin插件；

> 2、render方法里的第三个参数可以使用函数来生成多个组件（特别是如果他们相同的话），只要生成结果是一个数组，且数组元素都是VNode即可；

```js
...
columns : [{
    title : '标题',
    key : 'account',
    render: (h , params) => {
        return h('div', {
            class : 'flex user_info flex-align-items'
        },[
            h('img' , {
                class : 'header_wrap' , 
                attrs : {
                    src : params.row.headUrl ? params.row.headUrl : defaultHeader
                }
            }), 
            h('div' , {
                class : 'info_wrap'
            },[
                h('div' , {
                    class :'name'
                } , params.row.userName),
                h('div' , {
                    class :'account'
                } , params.row.account)
            ])
        ])
    }
},{
    title : '部门',
    key : 'deptName'
},{
    title : '评价人数',
    align: 'center',
    key : 'totalEvaluators',
    render: (h , params) => {
        return h('div' , params.row.totalEvaluators + '人')
    }
},{
    title : '评价均分',
    key : 'svgScore',
    width : 180,
    render: (h , params) => {
        return h('div' , {
            class : 'eve_wrap flex  flex-align-items'
        },[
            h('div' , {
                class : 'progress_wrap flex-1'
            },[
                h('div' , {
                    style : {
                        width : '100%'
                    },
                    class: 'progress_percent'
                })
            ]),
            h('div' ,{
                class : 'progress_text'
            }, params.row.svgScore + '分')
        ])
    }
},{
    title : '操作' ,
    key : 'id',
    width : 210,
    render : (h , params) => {
        return h('div' , {
            class : 'opera_wrap flex flex-align-items'
        },[
            h('div' , {
                class : 'opera_text',
                on: {
                    click:()=>{
                        
                    }
                }
            } , '二维码'),
            h('div' , {
                class : 'opera_text',
                on: {
                    click:()=>{
                        this.$router.push({
                            path : 'detailList',
                            query : {
                                account : params.row.account
                            }
                        })
                    }
                }
            } , '评价记录'),
            h('div' , {
                class : 'opera_line'
            }),
            h('Dropdown' , [
                h('div' , {
                    class : 'flex flex-align-items'
                },[
                        h('div' , {
                        class : 'dropdown_text'
                    } , '更多'),
                    h('Icon',{
                        props:{
                            type:'arrow-down-b'
                        }
                    }),
                ]),
                h('DropdownMenu' , {
                    slot : 'list',
                },[
                    h('DropdownItem' , {
                        nativeOn : {
                            click : () => {
                                
                            }
                        }
                    } , '编辑'),
                    h('DropdownItem' , {
                        nativeOn : {
                            click : () => {

                            }
                        }
                    } , '删除') 
                ])
            ])
        ])
    }
}],
...
```

