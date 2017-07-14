define(["require", "exports", "./../../01core/0Dom", "./../../01core/Url", "./TableRowDom", "react", "./../../04col/Pagination"], function (require, exports, domFile, urlFile, rowDomFile, React, pageFile) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var domCore = domFile.Core;
    var TableDom;
    (function (TableDom) {
        class TableDomAction extends domCore.DomAction {
        }
        TableDom.TableDomAction = TableDomAction;
        class TableDomReact extends domCore.DomReact {
            constructor() {
                super(...arguments);
                this.state = new TableDomStates();
            }
            pSender() {
                return React.createElement("div", null,
                    React.createElement("div", { className: "row placeholders" }, this.pSearch()),
                    React.createElement("div", { className: "table-responsive" },
                        this.pButton(),
                        React.createElement("table", { className: "table table-bordered table-condensed table-hover" },
                            this.pHeader(),
                            this.pBody()),
                        React.createElement("div", { className: "bottomPager" }, this._tDom(this.props.Vm.PaginationVm))));
            }
            pComponentDidMount() {
                super.pComponentDidMount();
            }
            pHeader() {
                return React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", null,
                            React.createElement("input", { type: "checkbox", checked: this.props.Vm.isAllCheck, onClick: () => { this.allCheckClick(); } })),
                        this.props.Vm.colunmList.map((a, index) => {
                            if (!a.isHidden) {
                                return React.createElement("th", { key: index }, a.displayName);
                            }
                        })));
            }
            pBody() {
                return React.createElement("tbody", null, this.props.Vm.tableRowDomList.map(a => {
                    return this._tDom(a);
                }));
            }
            allCheckClick() {
                this.props.Vm.isAllCheck = !this.props.Vm.isAllCheck;
                this.props.Vm.tableRowDomList.map(r => {
                    r.isCheck = this.props.Vm.isAllCheck;
                    r.IsChange = true;
                });
                this.forceUpdate();
            }
            pSearch() {
                return React.createElement("div", null,
                    React.createElement("div", { className: "row" }, this.props.Vm.colunmList.map((a, index) => {
                        if (a.isSearch) {
                            return React.createElement("div", { className: "col-sm-5 col-md-6", key: index },
                                React.createElement("label", null, a.displayName),
                                React.createElement("span", null,
                                    React.createElement("input", { type: "text", value: a.searchValue, onChange: (e) => { this.inputChange(e, a); } })));
                        }
                    })),
                    React.createElement("div", null,
                        React.createElement("button", { type: "button", className: "btn btn-info", onClick: () => { this.searchClick(); } }, "\u641C\u7D22"),
                        React.createElement("button", { type: "button", className: "btn btn-info", onClick: () => { this.clearClick(); } }, "\u6E05\u7A7A")));
            }
            pButton() {
                return React.createElement("div", null, this.props.Vm.buttonList.map((b, index) => {
                    return React.createElement("a", { key: index, className: "btn btn-default", href: "javascript:void(0)", role: "button", onClick: () => { this.btnClick(b); } }, b.text);
                }));
            }
            btnClick(b) {
                this.props.Vm.btnClick(b);
            }
            inputChange(e, a) {
                var val = e.target["value"];
                var name = a.name;
                if (a.isSearchLike) {
                    name = name + "_Like";
                }
                var searchData = { name: name, value: val, pType: a.pType };
                this.props.Vm.searchData = this.props.Vm.searchData.filter(r => {
                    return r.name != name;
                });
                a.searchValue = val;
                this.props.Vm.searchData.push(searchData);
                this.forceUpdate();
            }
            searchClick() {
                this.props.Vm.search(0);
            }
            clearClick() {
                this.props.Vm.searchData = [];
                this.props.Vm.colunmList.map(a => {
                    a.searchValue = "";
                });
                this.props.Vm.search(0);
            }
        }
        TableDom.TableDomReact = TableDomReact;
        class TableDomVm extends domCore.DomVm {
            constructor(config) {
                super();
                this.ReactType = TableDomReact;
                this.colunmList = [];
                this.tableDataList = [];
                this.tableRowDomList = [];
                this.isAllCheck = false;
                this.buttonList = [];
                this.searchData = [];
                //默认的按钮
                var inserBtn = {
                    name: "Insert", text: "新增", isbatch: false, Function: (colunmObj, pageObj) => {
                        urlFile.Core.AkUrl.Current().openUrl("$panelTableInsertPage$" + JSON.stringify(colunmObj) + "$" + this.tableName, true);
                    }
                };
                var updateBtn = { name: "Update", text: "修改", isbatch: true, Function: (colunmObj, pageObj) => { } };
                var DelBtn = { name: "Delete", text: "删除", isbatch: true, Function: (pageObj) => { } };
                var DetailBtn = { name: "Detail", text: "详情", isbatch: true, Function: (colunmObj, pageObj) => { } };
                var ExcelBtn = { name: "Excel", text: "Excel导出", isbatch: false, Function: (colunmObj, pageObj) => { } };
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
                            });
                            if (add) {
                                this.buttonList.push(btn);
                            }
                        });
                    }
                }
            }
            search(PageIndex) {
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
                });
            }
            getSelectData() {
                var pageData = [];
                this.tableRowDomList.map(r => {
                    if (r.isCheck) {
                        pageData.push(r.tableRowData);
                    }
                });
                return pageData;
            }
            btnClick(b) {
                var pageObj = this.getSelectData();
                b.Function(this.colunmList, pageObj);
            }
            initPageData(pageConfig) {
                this.tableRowDomList = [];
                this.PaginationVm = new pageFile.tool.PaginationVm({ isPartHidden: true, IsPageSizeHidden: true, IsBidaStyle: false });
                var pager = pageConfig.Pager;
                this.PaginationVm.PageIndex = pager.PageIndex;
                this.PaginationVm.PageSize = pager.PageSize;
                this.PaginationVm.TotalCount = pager.TotalCount;
                this.PaginationVm.PageClickEvent = (pageIndex) => {
                    this.search(pageIndex);
                };
                this.tableDataList = pageConfig.ListData;
                this.tableDataList.map(a => {
                    var _config = { tableRowData: a.tableRowData, columList: this.colunmList };
                    var rowDom = new rowDomFile.TableRowDom.TableRowDomVm(_config);
                    this.tableRowDomList.push(rowDom);
                });
                this.forceUpdate("");
            }
        }
        TableDom.TableDomVm = TableDomVm;
        class TableDomStates extends domCore.DomStates {
        }
        TableDom.TableDomStates = TableDomStates;
        class TableDomProps extends domCore.DomProps {
        }
        TableDom.TableDomProps = TableDomProps;
    })(TableDom = exports.TableDom || (exports.TableDom = {}));
});
