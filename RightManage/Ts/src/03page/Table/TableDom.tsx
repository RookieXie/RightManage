import domFile = require("./../../01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("./../../01core/Util");
import iocFile = require("./../../01core/Ioc");
import urlFile = require("./../../01core/Url");
import rowDomFile = require("./TableRowDom");
import dataFile = require("./Data");
import React = require("react");
import ReactDOM = require("react-dom");
import pageFile = require("./../../04col/Pagination");

export module TableDom {
    export class TableDomAction extends domCore.DomAction {
    }

    export class TableDomReact extends domCore.DomReact<TableDomProps, TableDomStates, TableDomAction> implements domCore.IReact {

        public state = new TableDomStates();

        public pSender(): React.ReactElement<any> {
            return <div>
                <div className="row placeholders">{this.pSearch()}</div>
                <div className="table-responsive">
                    {this.pButton()}
                    <table className="table table-bordered table-condensed table-hover">
                        {this.pHeader()}
                        {this.pBody()}
                    </table>
                    <div className="bottomPager">{this._tDom(this.props.Vm.PaginationVm)}</div>
                </div></div>;
        }
        protected pComponentDidMount() {
            super.pComponentDidMount();

        }
        private pHeader() {
            return <thead><tr><th><input type="checkbox" checked={this.props.Vm.isAllCheck} onClick={() => { this.allCheckClick() }} /></th>
                {
                    this.props.Vm.colunmList.map((a, index) => {
                        if (!a.isHidden) {
                            return <th key={index}>{a.displayName}</th>
                        }
                    })
                }</tr></thead>;
        }
        private pBody() {
            return <tbody>{this.props.Vm.tableRowDomList.map(a => {
                return this._tDom(a);
            })}</tbody>
        }
        private allCheckClick() {
            this.props.Vm.isAllCheck = !this.props.Vm.isAllCheck;
            this.props.Vm.tableRowDomList.map(r => {
                r.isCheck = this.props.Vm.isAllCheck;
                r.IsChange = true;
            })
            this.forceUpdate();
        }

        private pSearch() {
            return <div><div className="row">{
                this.props.Vm.colunmList.map((a, index) => {
                    if (a.isSearch) {
                        return <div className="col-sm-5 col-md-6" key={index}>
                            <label>{a.displayName}</label>
                            <span>
                                <input type="text" value={a.searchValue} onChange={(e) => { this.inputChange(e, a) }} />
                            </span>
                        </div>
                    }
                })
            }</div>
                <div>
                    <button type="button" className="btn btn-info" onClick={() => { this.searchClick() }}>搜索</button>
                    <button type="button" className="btn btn-info" onClick={() => { this.clearClick() }}>清空</button>
                </div>
            </div>;

        }
        private pButton() {
            return <div>
                {this.props.Vm.buttonList.map((b, index) => {
                    return <a key={index} className="btn btn-default" href="javascript:void(0)" role="button" onClick={() => { this.btnClick(b) }}>{b.text}</a>
                })}
            </div>
        }
        private btnClick(b: dataFile.TableData.ITableButton) {
            this.props.Vm.btnClick(b);
        }
        private inputChange(e: React.FormEvent, a: dataFile.TableData.ITableColunm) {
            var val = e.target["value"];
            var name = a.name;
            if (a.isSearchLike) {
                name = name + "_Like";
            }
            var searchData: dataFile.TableData.ITableSearchData = { name: name, value: val, pType: a.pType };
            this.props.Vm.searchData = this.props.Vm.searchData.filter(r => {
                return r.name != name;
            });
            a.searchValue = val;
            this.props.Vm.searchData.push(searchData);
            this.forceUpdate();
        }
        private searchClick() {
            this.props.Vm.search(0);
        }
        private clearClick() {
            this.props.Vm.searchData = [];
            this.props.Vm.colunmList.map(a => {
                a.searchValue = "";
            })
            this.props.Vm.search(0);
        }
    }

    export interface IReactTableDomVm extends domCore.DomVm {
        colunmList: dataFile.TableData.ITableColunm[];
        tableDataList: dataFile.TableData.ITableData[];
        tableRowDomList: rowDomFile.TableRowDom.TableRowDomVm[];
        isAllCheck: boolean;
        buttonList: dataFile.TableData.ITableButton[];
        search(PageIndex: number);
        searchData: dataFile.TableData.ITableSearchData[];
        pageSearch: dataFile.TableData.IPageSearch;
        btnClick(b: dataFile.TableData.ITableButton);
        PaginationVm: pageFile.tool.PaginationVm;
    }
    export interface ITableDomConfig {
        tableColunms: dataFile.TableData.ITableColunm[];
        tableData: dataFile.TableData.IPanationData;
        tableButtons?: dataFile.TableData.ITableButton[];
        tableName: string;
    }
    export class TableDomVm extends domCore.DomVm implements IReactTableDomVm {
        public ReactType = TableDomReact;
        public colunmList: dataFile.TableData.ITableColunm[] = [];
        public tableDataList: dataFile.TableData.ITableData[] = [];
        public tableRowDomList: rowDomFile.TableRowDom.TableRowDomVm[] = [];
        public isAllCheck: boolean = false;
        public buttonList: dataFile.TableData.ITableButton[] = [];
        public searchData: dataFile.TableData.ITableSearchData[] = [];
        public pageSearch: dataFile.TableData.IPageSearch;
        public tableName: string;
        public PaginationVm: pageFile.tool.PaginationVm;
        public constructor(config?: ITableDomConfig) {
            super();
            //默认的按钮
            var inserBtn: dataFile.TableData.ITableButton = {
                name: "Insert", text: "新增", isbatch: false, Function: (colunmObj, pageObj) => {
                    urlFile.Core.AkUrl.Current().openUrl("$panelTableInsertPage$" + JSON.stringify(colunmObj) + "$" + this.tableName, true);
                }
            };
            var updateBtn: dataFile.TableData.ITableButton = { name: "Update", text: "修改", isbatch: true, Function: (colunmObj, pageObj) => { } };
            var DelBtn: dataFile.TableData.ITableButton = { name: "Delete", text: "删除", isbatch: true, Function: (pageObj) => { } };
            var DetailBtn: dataFile.TableData.ITableButton = { name: "Detail", text: "详情", isbatch: true, Function: (colunmObj, pageObj) => { } };
            var ExcelBtn: dataFile.TableData.ITableButton = { name: "Excel", text: "Excel导出", isbatch: false, Function: (colunmObj, pageObj) => { } };
            this.buttonList.push(inserBtn);
            this.buttonList.push(updateBtn);
            this.buttonList.push(DelBtn);
            this.buttonList.push(DetailBtn);
            this.buttonList.push(ExcelBtn);
            if (config) {
                if (config.tableColunms) {
                    this.colunmList = config.tableColunms;
                }
                if (config.tableData) {
                    this.initPageData(config.tableData);
                }
                if (config.tableName)
                    this.tableName = config.tableName;
                if (config.tableButtons) {
                    config.tableButtons.map(btn => {
                        var add = true;
                        this.buttonList.map(a => {
                            if (a.name == btn.name) {
                                add = false;
                                a.Function = btn.Function;
                                //{...a,Function:btn.Function} 无效
                            }
                        })
                        if (add) {
                            this.buttonList.push(btn);
                        }
                    })
                }
            }

        }

        public search(PageIndex: number) {
            var search = JSON.stringify(this.searchData);
            var _page = { PageIndex: PageIndex, PageSize: 10 };
            urlFile.Core.AkPost("/RightManage/Common/SearchTable", { tableName: this.tableName, search: search, pager: JSON.stringify(_page) }, (res) => {
                // this.tableDataList = res;
                this.initPageData(res);
                //this.tableDataList = res;
                //this.tableRowDomList = []
                //this.tableDataList.map(a => {
                //    var _config: rowDomFile.TableRowDom.ITableRowDomConfig = { tableRowData: a.tableRowData, columList: this.colunmList };
                //    var rowDom: rowDomFile.TableRowDom.TableRowDomVm = new rowDomFile.TableRowDom.TableRowDomVm(_config);
                //    rowDom.IsChange = true;
                //    this.tableRowDomList.push(rowDom);
                //})
                //this.forceUpdate("");
            })
        }
        public getSelectData(): dataFile.TableData.IRowData[] {
            var pageData: dataFile.TableData.IRowData[] = [];
            this.tableRowDomList.map(r => {
                if (r.isCheck) {
                    pageData.push(r.tableRowData)
                }
            })
            return pageData;
        }
        public btnClick(b: dataFile.TableData.ITableButton) {
            var pageObj = this.getSelectData();
            b.Function(this.colunmList, pageObj);
        }

        public initPageData(pageConfig: dataFile.TableData.IPanationData) {
            this.tableRowDomList = [];
            this.PaginationVm = new pageFile.tool.PaginationVm({ isPartHidden: true, IsPageSizeHidden: true, IsBidaStyle: false });
            var pager = pageConfig.Pager;
            this.PaginationVm.PageIndex = pager.PageIndex;
            this.PaginationVm.PageSize = pager.PageSize;
            this.PaginationVm.TotalCount = pager.TotalCount;

            this.PaginationVm.PageClickEvent = (pageIndex) => {
                this.search(pageIndex);
            }
            this.tableDataList = pageConfig.ListData
            this.tableDataList.map(a => {
                var _config: rowDomFile.TableRowDom.ITableRowDomConfig = { tableRowData: a.tableRowData, columList: this.colunmList };
                var rowDom: rowDomFile.TableRowDom.TableRowDomVm = new rowDomFile.TableRowDom.TableRowDomVm(_config);
                this.tableRowDomList.push(rowDom);
            })
            this.forceUpdate("");
        }
    }
    export class TableDomStates extends domCore.DomStates {
    }


    export class TableDomProps extends domCore.DomProps<IReactTableDomVm>{
    }



}