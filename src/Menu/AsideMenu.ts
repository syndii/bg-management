export default [
    {
        label: '门诊管理', // 标题
        value: 'user1', // 路由跳转地址
        index: '1', // 对应索引
        icon: 'OfficeBuilding',
        children: [
            {label: '新增患者', value: 'user1', index: '1-1'},
            {label: '流程管理', value: 'user2', index: '1-2'},
            {label: '项目划价', value: 'user3', index: '1-3'},
            {label: '项目缴费', value: 'user4', index: '1-4'},
            {label: '项目检查', value: 'user5', index: '1-5'},
            {label: '药品缴费', value: 'user6', index: '1-6'},
            {label: '门诊患者库', value: 'user7', index: '1-7'},
            {label: '医生管理', value: 'user8', index: '1-8'}
        ]
    },
    {
        label: '库存管理',
        value: 'two',
        index: '2',
        icon: 'Location',
        children: [
            {label: '采购管理', value: '1-1', index: '2-1'},
            {label: '入库管理', value: '1-2', index: '2-2'},
            {label: '出库管理', value: '1-3', index: '2-3'},
            {label: '仓库管理', value: '1-3', index: '2-4'},
            {label: '库存查询', value: '1-3', index: '2-5'},
            {label: '物品字典', value: '1-3', index: '2-6'},
            {label: '盘点管理', value: '1-3', index: '2-7'}
        ]
    },
    {
        label: '系统管理',
        value: '',
        index: '3',
        icon: 'Setting',
        children: [
            {label: '新增患者', value: '1-1', index: '3-1'},
            {label: '流程管理', value: '1-2', index: '3-2'},
            {label: '项目划价', value: '1-3', index: '3-3'},
            {label: '项目缴费', value: '1-3', index: '3-4'},
            {label: '项目检查', value: '1-3', index: '3-5'},
            {label: '药品缴费', value: '1-3', index: '3-6'},
            {label: '门诊患者库', value: '1-3', index: '3-7'}
        ]
    },
    {
        label: '住院管理',
        value: '3',
        index: '4',
        icon: 'School',
        children: [
            {label: '新增患者', value: '1-1', index: '4-1'},
            {label: '流程管理', value: '1-2', index: '4-2'},
            {label: '项目划价', value: '1-3', index: '4-3'},
            {label: '项目缴费', value: '1-3', index: '4-4'},
            {label: '项目检查', value: '1-3', index: '4-5'},
            {label: '药品缴费', value: '1-3', index: '4-6'},
            {label: '门诊患者库', value: '1-3', index: '4-7'}
        ]
    },
    {
        label: '短信中心',
        value: '4',
        index: '5',
        icon: 'Message',
        children: [
            {label: '院内公告', value: '1-1', index: '5-1'},
            {label: '短信通告', value: '1-2', index: '5-2'}
        ]
    },
    {
        label: '统计管理',
        value: '3',
        index: '6',
        icon: 'Coin',
        children: [
            {label: '新增患者', value: '1-1', index: '6-1'},
            {label: '流程管理', value: '1-2', index: '6-2'},
            {label: '项目划价', value: '1-3', index: '6-3'},
            {label: '项目缴费', value: '1-3', index: '6-4'},
            {label: '项目检查', value: '1-3', index: '6-5'},
            {label: '药品缴费', value: '1-3', index: '6-6'},
            {label: '门诊患者库', value: '1-3', index: '6-7'}
        ]
    },
    {
        label: '数据中心',
        value: '3',
        index: '7',
        icon: 'DocumentCopy',
        children: [
            {label: '新增患者', value: '1-1', index: '7-1'},
            {label: '流程管理', value: '1-2', index: '7-2'},
            {label: '项目划价', value: '1-3', index: '7-3'},
            {label: '项目缴费', value: '1-3', index: '7-4'},
            {label: '项目检查', value: '1-3', index: '7-5'},
            {label: '药品缴费', value: '1-3', index: '7-6'},
            {label: '门诊患者库', value: '1-3', index: '7-7'}
        ]
    },
    {
        label: '机构管理',
        value: '3',
        index: '7',
        icon: 'DocumentCopy',
        children: [
            {label: '机构配置', value: '1-1', index: '7-1'},
            {label: '项目管理', value: '1-2', index: '7-2'},
            {label: '审批配置', value: '1-3', index: '7-3'},
            {label: '打印配置', value: '1-3', index: '7-4'},
        ]
    }
]