# 审批人定义

## 指定成员
``` json
{
    "approveType": "target_approval",
    "approve": {
        "approvals": [{
            "value": "张三",
            "type": 0,
            "id": 1
        }]
    },
    "actType": "ONE_BY_ONE", 
    "turnDown": {
        "turnDownMethod": "return",
        "turnDownId": "",
    },
    "deadline": ""
}
```

## 主管
``` json
{
    "approveType": "target_management",
    "approve": {
        "level": 3,
        "autoUp": true
    },
    "actType": "AND", 
    "turnDown": {
        "turnDownMethod": "return",
        "turnDownId": "",
    },
    "noneActionerAction": "auto",
    "deadline": ""
}
```

## 角色
``` json
{
    "approveType": "target_role",
    "approve": {
        "approvals": [{
            "value": "XXX主管",
            "type": 4,
            "id": 1
        }]
    },
    "actType": "AND", 
    "turnDown": {
        "turnDownMethod": "admin",
        "turnDownId": "",
    },
    "noneActionerAction": "auto",
    "deadline": ""
}
```
## 发起人自选
``` json
{
    "approveType": "target_select",
    "approve": {
        "multiType": "single",
        "rangeType": "approvals",
        "approvals": [{
            "value": "XXX主管",
            "type": 4,
            "id": 1
        }]
    },
    "actType": "AND", 
    "turnDown": {
        "turnDownMethod": "admin",
        "turnDownId": "",
    },
    "noneActionerAction": "auto",
    "deadline": ""
}
```

## 发起人自己
``` json
{
    "approveType": "target_originator",
    "approve": {},
    "actType": "AND", 
    "turnDown": {
        "turnDownMethod": "admin",
        "turnDownId": "",
    },
    "noneActionerAction": "auto",
    "deadline": ""
}
```

## 连续多级主管
``` json
{
    "approveType": "target_managers_role",
    "approve": {
        "endAtType": "role_and_manage", 
        "approvals": [{
            "value": "XXX主管",
            "type": 4,
            "id": 1
        }],
        "deptDepthFlag" : false,
        "deptDepth": "1",

        // endAtType : manage是
        "supInAddresslist": "4"
    }, 
    "actType": "AND", 
    "turnDown": {
        "turnDownMethod": "admin",
        "turnDownId": "",
    },
    "noneActionerAction": "auto",
    "deadline": ""
}
```




| 属性 | 名称 | 说明 | 默认 |
| ------ | ------ | ------ | ------ |
| approveType | 类型 | 1: 指定成员、2: 主管、3:角色、4:发起人自选、5:发起人自己、6:连续多级主管 | 1 |
| level | 发起人的“N”级主管 | 1 ~ 20级主管 | 1 |
| autoUp | 找不到主管时，审批流程 | true: 由上级主管代审批；false: 不需要上级主管代审批 | true |
| multiType | 自选个数 | single: 自选一人；multiplayer: 自选多人 | 1 |
| range | 自选选择范围 | allStaff:从所有人中选 approvals:从指定成员中选 role:指定角色 | allStaff |
| endAtType | 审批终点：指定角色或指定通讯地录中N级主管 | role_and_manage：指定角色 manage：通讯录中N及主管 | 1 |
| deptDepthFlag | 是否”同时不起过发起人向上的N级主管“ | true 或 false | false |
| deptDepth | 不超过的第n级主管 endAtType=1生效 | 1 ~ 20级主管 |  |
| turnDownMethod | 驳回方式 | return: 原路驳回 ， node: 选择某个节点驳回 | return |
| turnDownId | 驳回节点ID | 驳回节点Id |  |
| deadline | 期限设置 | 审批期限设置 |  |
| supInAddresslist | 通讯录中的第几级级主管 endAtType=2生效 | 1 ~ 20级主管 |  |
| actType | 审批方式 | ONE_BY_ONE：依次审批；AND：会签（须所审批人同意）；OR: 或签（一名审批人同意或拒绝即可） | auto |
| noneActionerAction | 审批人为空时 | auto: 自动通过；admin: 自动转交给管理员 | auto |

### 用户

| 属性 | 名称 | 说明 |
| ------ | ------ | ------ |
| type | 类型 | 0: 部门，1:成员，2:岗位，3:群组，4:角色 |
| value | 名称 | ”本科生“ |
| key | 用户唯一标识 | '1' |