var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./../../01core/Ioc", "./../../01core/Url", "./../../03page/BaseWebPage", "react"], function (require, exports, iocFile, urlFile, basewedPageFile, React) {
    "use strict";
    var TableInsertPage;
    (function (TableInsertPage) {
        var TableInsertPageAction = (function (_super) {
            __extends(TableInsertPageAction, _super);
            function TableInsertPageAction() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return TableInsertPageAction;
        }(basewedPageFile.Web.BaseWebPageStates));
        TableInsertPage.TableInsertPageAction = TableInsertPageAction;
        var TableInsertPageReact = (function (_super) {
            __extends(TableInsertPageReact, _super);
            function TableInsertPageReact() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.state = new TableInsertPageStates();
                return _this;
            }
            TableInsertPageReact.prototype.pSender = function () {
                var _this = this;
                return React.createElement("div", null,
                    React.createElement("div", null,
                        React.createElement("button", { type: "button", className: "btn btn-info", onClick: function () { _this.saveClick(); } }, "\u4FDD\u5B58")),
                    React.createElement("div", null, this.props.Vm.colunmList.map(function (a, index) {
                        if (!a.isHidden) {
                            return React.createElement("div", { key: index },
                                React.createElement("label", { "class": "col-sm-1 control-label" }, a.displayName),
                                React.createElement("div", { "class": "col-sm-4" },
                                    React.createElement("input", { type: a.controlType, value: _this.props.Vm.rowData[a.name], onChange: function (e) { _this.changeValue(e, a.name); } })));
                        }
                    })),
                    React.createElement("div", null,
                        React.createElement("button", { type: "button", className: "btn btn-info", onClick: function () { _this.saveClick(); } }, "\u4FDD\u5B58")));
            };
            TableInsertPageReact.prototype.changeValue = function (e, name) {
                var _val = e.target["value"];
                this.props.Vm.rowData[name] = _val;
                this.forceUpdate();
            };
            TableInsertPageReact.prototype.saveClick = function () {
                this.props.Vm.saveClick();
            };
            return TableInsertPageReact;
        }(basewedPageFile.Web.BaseWebPageReact));
        TableInsertPage.TableInsertPageReact = TableInsertPageReact;
        var TableInsertPageVm = (function (_super) {
            __extends(TableInsertPageVm, _super);
            function TableInsertPageVm(config) {
                var _this = _super.call(this) || this;
                _this.ReactType = TableInsertPageReact;
                _this.Title = "TableInsertPage页面";
                _this.colunmList = [];
                _this.rowData = [];
                return _this;
            }
            TableInsertPageVm.prototype.init = function (config) {
            };
            TableInsertPageVm.prototype.loadPage = function (callback) {
                var _this = this;
                this.colunmList = JSON.parse(this.Param1);
                this.colunmList.map(function (c) {
                    _this.rowData[c.name] = "";
                });
                if (callback) {
                    callback();
                }
            };
            TableInsertPageVm.prototype.saveClick = function () {
                urlFile.Core.AkPost("/Common/InsertTable", { tableName: "", data: JSON.stringify(this.rowData) }, function () {
                });
            };
            return TableInsertPageVm;
        }(basewedPageFile.Web.BaseWebPageVm));
        TableInsertPage.TableInsertPageVm = TableInsertPageVm;
        var TableInsertPageStates = (function (_super) {
            __extends(TableInsertPageStates, _super);
            function TableInsertPageStates() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return TableInsertPageStates;
        }(basewedPageFile.Web.BaseWebPageStates));
        TableInsertPage.TableInsertPageStates = TableInsertPageStates;
        var TableInsertPageProps = (function (_super) {
            __extends(TableInsertPageProps, _super);
            function TableInsertPageProps() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return TableInsertPageProps;
        }(basewedPageFile.Web.BaseWebPageProps));
        TableInsertPage.TableInsertPageProps = TableInsertPageProps;
        iocFile.Core.Ioc.Current().RegisterType("TABLEINSERTPAGE", basewedPageFile.Web.BaseWebPageVm, TableInsertPageVm);
    })(TableInsertPage = exports.TableInsertPage || (exports.TableInsertPage = {}));
});
