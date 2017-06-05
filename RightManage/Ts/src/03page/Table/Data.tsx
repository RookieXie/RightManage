import pageFile = require("./../../04col/Pagination");
export namespace TableData {
    export interface ITableButton {
        name: string;
        text: string;
        Function: any;
        isbatch: boolean;
    }
    export interface IButtonFun {
        (colunmObj: ITableColunm[], pageObj?: IRowData[]): void;
    }
    export interface ITableColunm {
        name: string;
        displayName: string;
        controlType: string;
        isHidden: boolean;
        isSearch: boolean;
        isSearchLike: boolean;
        searchValue: string;
        pType: string;
        orderNumbre: number;
    }
    export interface ITableData {
        tableRowData: IRowData;
    }
    export interface IRowData {
        [index: string]: any;
    }
    export interface ITableSearchData {
        name: string;
        value: string;
        pType: string;
    }
    export interface IPageSearch {
        PageSize: number;
        PageIndex: number;
    }
    export interface IPanationData {
        Pager: pageFile.tool.Pagination;
        ListData: Array<any>;
    }
}