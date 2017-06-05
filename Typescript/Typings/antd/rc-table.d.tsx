
/// <reference path="../react/react.d.ts" />
declare namespace rcTables {

    import React = __React

    // Table
    enum RowSelectionType {
        checkbox,
        radio
    }
    type SelectedRowKeys = Array<any>
    interface RowSelection {
        type?: RowSelectionType | string,
        selectedRowKeys?: SelectedRowKeys,
        onChange?: (selectedRowKeys: SelectedRowKeys, selectedRows: any) => void,
        getCheckboxProps?: (record: any) => void,
        onSelect?: (record: any, selected: any, selectedRows: any) => void,
        onSelectAll?: (rselectedecord: any, selectedRows: any, changeRows: any) => void
    }
    interface Columns {
        /** React 需要的 key，建议设置*/
        key?: string,
        /** 列头显示文字*/
        title?: string | React.ReactNode,
        /** 列数据在数据项中对应的 key*/
        dataIndex?: string,
        /** 生成复杂数据的渲染函数，参数分别为当前列的值，当前列数据，列索引，@return里面可以设置表格[行/列合并](#demo-colspan-rowspan)*/
        render?: (text?: any, record?: any, index?: number) => React.ReactNode,
        /** 表头的筛选菜单项*/
        filters?: Array<any>,
        /** 本地模式下，确定筛选的运行函数*/
        onFilter?: Function,
        /** 是否多选*/
        filterMultiple?: boolean,
        /** 排序函数，本地排序使用一个函数，需要服务端排序可设为 true */
        sorter?: boolean | Function,
        /** 表头列合并,设置为 0 时，不渲染*/
        colSpan?: number,
        /** 列宽度*/
        width?: string | number,
        /** 列的 className*/
        className?: string
    }
    interface TableProps {
        /** 列表项是否可选择*/
        rowSelection?: RowSelection,
        /** 分页器*/
        pagination?: Object,
        /** 正常或迷你类型 : `default` or `small` */
        size?: string,
        /** 数据数组*/
        data: Array<any>,
        /** 表格列的配置描述*/
        columns: Columns,
        /** 表格行 key 的取值*/
        rowKey?: (record: any, index: number) => string,
        /** 额外的展开行*/
        expandedRowRender?: Function,
        /** 默认展开的行*/
        defaultExpandedRowKeys?: Array<string>,
        /** 分页、排序、筛选变化时触发*/
        onChange?: (pagination: Object, filters: any, sorter: any) => void,
        /** 页面是否加载中*/
        loading?: boolean,
        /** 默认文案设置，目前包括排序、过滤、空数据文案: `{ filterConfirm: '确定', filterReset: '重置', emptyText: '暂无数据' }` */
        locale?: Object,
        /** 展示树形数据时，每层缩进的宽度，以 px 为单位*/
        indentSize?: number,
        /** 处理行点击事件*/
        onRowClick?: (record: any, index: number) => void,
        /** 是否固定表头*/
        useFixedHeader?: boolean,
        /** 是否展示外边框和列边框*/
        bordered?: boolean,
        /** 是否显示表头*/
        showHeader?: boolean,
        /** 表格底部自定义渲染函数*/
        footer?: (currentPageData: Object) => void,
        scroll?: any;

    }
    /**
     * #Table
    展示行列数据。
    
    ## 何时使用
    
    - 当有大量结构化的数据需要展现时；
    - 当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时。*/
    export class Table extends React.Component<TableProps, {}> {
        render(): JSX.Element
    }
}

declare module "rc-table" {
    export = rcTables.Table;
}