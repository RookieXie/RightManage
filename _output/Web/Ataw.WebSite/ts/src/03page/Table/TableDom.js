var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./../../01core/0Dom", "./../../01core/Url", "./TableRowDom", "react", "./../../04col/Pagination"], function (require, exports, domFile, urlFile, rowDomFile, React, pageFile) {
    "use strict";
    exports.__esModule = true;
    var domCore = domFile.Core;
    var TableDom;
    (function (TableDom) {
        var TableDomAction = (function (_super) {
            __extends(TableDomAction, _super);
            function TableDomAction() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return TableDomAction;
        }(domCore.DomAction));
        TableDom.TableDomAction = TableDomAction;
        var TableDomReact = (function (_super) {
            __extends(TableDomReact, _super);
            function TableDomReact() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.state = new TableDomStates();
                return _this;
            }
            TableDomReact.prototype.pSender = function () {
                return React.createElement("div", null,
                    React.createElement("div", { className: "row placeholders" }, this.pSearch()),
                    React.createElement("div", { className: "table-responsive" },
                        this.pButton(),
                        React.createElement("table", { className: "table table-bordered table-condensed table-hover" },
                            this.pHeader(),
                            this.pBody()),
                        React.createElement("div", { className: "bottomPager" }, this._tDom(this.props.Vm.PaginationVm))));
            };
            TableDomReact.prototype.pComponentDidMount = function () {
                _super.prototype.pComponentDidMount.call(this);
            };
            TableDomReact.prototype.pHeader = function () {
                var _this = this;
                return React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", null,
                            React.createElement("input", { type: "checkbox", checked: this.props.Vm.isAllCheck, onClick: function () { _this.allCheckClick(); } })),
                        this.props.Vm.colunmList.map(function (a, index) {
                            if (!a.isHidden) {
                                return React.createElement("th", { key: index }, a.displayName);
                            }
                        })));
            };
            TableDomReact.prototype.pBody = function () {
                var _this = this;
                return React.createElement("tbody", null, this.props.Vm.tableRowDomList.map(function (a) {
                    return _this._tDom(a);
                }));
            };
            TableDomReact.prototype.allCheckClick = function () {
                var _this = this;
                this.props.Vm.isAllCheck = !this.props.Vm.isAllCheck;
                this.props.Vm.tableRowDomList.map(function (r) {
                    r.isCheck = _this.props.Vm.isAllCheck;
                    r.IsChange = true;
                });
                this.forceUpdate();
            };
            TableDomReact.prototype.pSearch = function () {
                var _this = this;
                return React.createElement("div", null,
                    React.createElement("div", { className: "row" }, this.props.Vm.colunmList.map(function (a, index) {
                        if (a.isSearch) {
                            return React.createElement("div", { className: "col-sm-5 col-md-6", key: index },
                                React.createElement("label", null, a.displayName),
                                React.createElement("span", null,
                                    React.createElement("input", { type: "text", value: a.searchValue, onChange: function (e) { _this.inputChange(e, a); } })));
                        }
                    })),
                    React.createElement("div", null,
                        React.createElement("button", { type: "button", className: "btn btn-info", onClick: function () { _this.searchClick(); } }, "\u641C\u7D22"),
                        React.createElement("button", { type: "button", className: "btn btn-info", onClick: function () { _this.clearClick(); } }, "\u6E05\u7A7A")));
            };
            TableDomReact.prototype.pButton = function () {
                var _this = this;
                return React.createElement("div", null, this.props.Vm.buttonList.map(function (b, index) {
                    return React.createElement("a", { key: index, className: "btn btn-default", href: "javascript:void(0)", role: "button", onClick: function () { _this.btnClick(b); } }, b.text);
                }));
            };
            TableDomReact.prototype.btnClick = function (b) {
                this.props.Vm.btnClick(b);
            };
            TableDomReact.prototype.inputChange = function (e, a) {
                var val = e.target["value"];
                var name = a.name;
                if (a.isSearchLike) {
                    name = name + "_Like";
                }
                var searchData = { name: name, value: val, pType: a.pType };
                this.props.Vm.searchData = this.props.Vm.searchData.filter(function (r) {
                    return r.name != name;
                });
                a.searchValue = val;
                this.props.Vm.searchData.push(searchData);
                this.forceUpdate();
            };
            TableDomReact.prototype.searchClick = function () {
                this.props.Vm.search(0);
            };
            TableDomReact.prototype.clearClick = function () {
                this.props.Vm.searchData = [];
                this.props.Vm.colunmList.map(function (a) {
                    a.searchValue = "";
                });
                this.props.Vm.search(0);
            };
            return TableDomReact;
        }(domCore.DomReact));
        TableDom.TableDomReact = TableDomReact;
        var TableDomVm = (function (_super) {
            __extends(TableDomVm, _super);
            function TableDomVm(config) {
                var _this = _super.call(this) || this;
                _this.ReactType = TableDomReact;
                _this.colunmList = [];
                _this.tableDataList = [];
                _this.tableRowDomList = [];
                _this.isAllCheck = false;
                _this.buttonList = [];
                _this.searchData = [];
                if (config) {
                    if (config.tableColunms) {
                        _this.colunmList = config.tableColunms;
                    }
                    if (config.tableData) {
                        _this.initPageData(config.tableData);
                    }
                    if (config.tableName)
                        _this.tableName = config.tableName;
                    if (config.tableButtons) {
                        _this.buttonList = config.tableButtons;
                    }
                    else {
                        //默认的按钮
                        var inserBtn = {
                            name: "Insert", text: "新增", isbatch: false, Function: function (colunmObj, pageObj) {
                                urlFile.Core.AkUrl.Current().openUrl("$panelTableInsertPage$" + JSON.stringify(colunmObj) + "$" + _this.tableName, true);
                            }
                        };
                        var updateBtn = { name: "Update", text: "修改", isbatch: true, Function: function (colunmObj, pageObj) { } };
                        var DelBtn = { name: "Delete", text: "删除", isbatch: true, Function: function (pageObj) { } };
                        var DetailBtn = { name: "Detail", text: "详情", isbatch: true, Function: function (colunmObj, pageObj) { } };
                        var ExcelBtn = { name: "Excel", text: "Excel导出", isbatch: false, Function: function (colunmObj, pageObj) { } };
                        _this.buttonList.push(inserBtn);
                        _this.buttonList.push(updateBtn);
                        _this.buttonList.push(DelBtn);
                        _this.buttonList.push(DetailBtn);
                        _this.buttonList.push(ExcelBtn);
                    }
                }
                return _this;
            }
            TableDomVm.prototype.search = function (PageIndex) {
                var _this = this;
                var search = JSON.stringify(this.searchData);
                var _page = { PageIndex: PageIndex, PageSize: 10 };
                urlFile.Core.AkPost("/RightManage/Common/SearchTable", { tableName: this.tableName, search: search, pager: JSON.stringify(_page) }, function (res) {
                    // this.tableDataList = res;
                    _this.initPageData(res);
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
            };
            TableDomVm.prototype.getSelectData = function () {
                var pageData = [];
                this.tableRowDomList.map(function (r) {
                    if (r.isCheck) {
                        pageData.push(r.tableRowData);
                    }
                });
                return pageData;
            };
            TableDomVm.prototype.btnClick = function (b) {
                var pageObj = this.getSelectData();
                b.Function(this.colunmList, pageObj);
            };
            TableDomVm.prototype.initPageData = function (pageConfig) {
                var _this = this;
                this.tableRowDomList = [];
                this.PaginationVm = new pageFile.tool.PaginationVm({ isPartHidden: true, IsPageSizeHidden: true, IsBidaStyle: false });
                var pager = pageConfig.Pager;
                this.PaginationVm.PageIndex = pager.PageIndex;
                this.PaginationVm.PageSize = pager.PageSize;
                this.PaginationVm.TotalCount = pager.TotalCount;
                this.PaginationVm.PageClickEvent = function (pageIndex) {
                    _this.search(pageIndex);
                };
                this.tableDataList = pageConfig.ListData;
                this.tableDataList.map(function (a) {
                    var _config = { tableRowData: a.tableRowData, columList: _this.colunmList };
                    var rowDom = new rowDomFile.TableRowDom.TableRowDomVm(_config);
                    _this.tableRowDomList.push(rowDom);
                });
                this.forceUpdate("");
            };
            return TableDomVm;
        }(domCore.DomVm));
        TableDom.TableDomVm = TableDomVm;
        var TableDomStates = (function (_super) {
            __extends(TableDomStates, _super);
            function TableDomStates() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return TableDomStates;
        }(domCore.DomStates));
        TableDom.TableDomStates = TableDomStates;
        var TableDomProps = (function (_super) {
            __extends(TableDomProps, _super);
            function TableDomProps() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return TableDomProps;
        }(domCore.DomProps));
        TableDom.TableDomProps = TableDomProps;
    })(TableDom = exports.TableDom || (exports.TableDom = {}));
});
