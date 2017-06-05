var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./../../01core/0Dom", "./../../01core/Url", "./TableRowDom", "react"], function (require, exports, domFile, urlFile, rowDomFile, React) {
    "use strict";
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
                            this.pBody())));
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
                this.props.Vm.search();
            };
            TableDomReact.prototype.clearClick = function () {
                this.props.Vm.searchData = [];
                this.props.Vm.colunmList.map(function (a) {
                    a.searchValue = "";
                });
                this.props.Vm.search();
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
                        _this.tableDataList = config.tableData;
                        _this.tableDataList.map(function (a) {
                            var _config = { tableRowData: a.tableRowData, columList: _this.colunmList };
                            var rowDom = new rowDomFile.TableRowDom.TableRowDomVm(_config);
                            _this.tableRowDomList.push(rowDom);
                        });
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
                                urlFile.Core.AkUrl.Current().openUrl("$panelTableInsertPage$" + JSON.stringify(colunmObj), true);
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
            TableDomVm.prototype.search = function () {
                var _this = this;
                var search = JSON.stringify(this.searchData);
                urlFile.Core.AkPost("/Common/SearchTable", { tableName: this.tableName, search: search, page: "" }, function (res) {
                    // this.tableDataList = res;
                    _this.tableDataList = res;
                    _this.tableRowDomList = [];
                    _this.tableDataList.map(function (a) {
                        var _config = { tableRowData: a.tableRowData, columList: _this.colunmList };
                        var rowDom = new rowDomFile.TableRowDom.TableRowDomVm(_config);
                        rowDom.IsChange = true;
                        _this.tableRowDomList.push(rowDom);
                    });
                    _this.forceUpdate("");
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
