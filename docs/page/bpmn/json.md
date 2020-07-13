# 审批人定义

## 指定成员
``` json
{
    candidateType: USERS,                     // 审批人类型：指定人
    candidateUsers: [{"zhangsan":"张三"}, {"lisi":"李四"}]     // 审批人列表
}
```

## 主管
```json
{
    candidateType: LEADER,                    // 审批人类型：主管
    leaderLevels: [1],                         // 指定主管级别，1个表示指定（直接）主管，多个时表示连续主管 
    upto: SUPERIOR,                           // 指不到主管如何处理：SUPERIOR上级，MANAGER管理员
    noneActionerAction: AUTO	                    // 审批人为空时	auto: 自动通过；admin: 自动转交给管理员	auto
}
```

## 角色
```json
{
    candidateType: GROUPS                    // 审批人类型：组（岗位、角色）
    candidateGroups: [{"group1":"组1"}, {"group2":"组2"}]    // 审批组列表
}
```

## 发起人自选
```json
{
    candidateType: SELECT                    // 审批人类型：发起人自选，自选变量在流程启动时指定，格式：TASK_DEF_KEY_USERS(GROUPS)
    selectScope: ALL                         // 自选范围，ALL所有人，USERS用户，GROUPS组
    selectUsers: []                          // 自选人员列表
    selectGroups: []                         // 自选组列表
}
```

## 发起人自己
``` json
{
    candidateType: STARTER                   // 审批人类型：发起人
}
```

## 连续多级主管
``` json
{
    candidateType: LEADER                    // 审批人类型：主管
    leaderLevels: [1]                         // 指定主管级别，1个表示指定（直接）主管，多个时表示连续主管 空：表示主管线上的主管
    upto: SUPERIOR                           // 指不到主管如何处理：SUPERIOR上级，MANAGER管理员
    stopAtGroups: true                       // 审批人是连续主管且是指定Group
    candidateGroups: [{"group1":"组1"}]              // 遇到指定组则停止

    noneActionerAction: AUTO	                    // 审批人为空时	auto: 自动通过；admin: 自动转交给管理员	auto
}
```

## 基础设置
```json
{
    ...
    multiInstance: true                      // 是否是多实例
    signType: ONE_VOTE_ADOPT                 // 会签类别：ONE_BY_ONE顺签（isSequential = true），ONE_VOTE_ADOPT或签（一票通过）(isSequential = false)，ONE_VOTE_VETO与签（一票否决）(isSequential = false)，SCALE比例通过
    // <multiInstanceLoopCharacteristics isSequential="false" flowable:collection="sys_multiinstance_assignees" flowable:elementVariable="sys_multiinstance_assignees_var"></multiInstanceLoopCharacteristics>
    signScale: 0.6                           // 会签通过比例

    turnBackType: FREE_STEP                  // 驳回类型，FREE_STEP指定节点，PREVIOUS_STEP上一节点，NONE不能驳回
    turnBackNodes: [{"node1":"节点1"}]                 // 驳回节点列表，只有并行网关才会出现多个节点

    dueDate: "2020-10-10 10:10:10"           // 到期时间
}
```