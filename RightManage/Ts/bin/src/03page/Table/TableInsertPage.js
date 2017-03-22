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
define(["require", "exports", "./../../01core/Ioc", "./../../03page/BaseWebPage", "react"], function (require, exports, iocFile, basewedPageFile, React) {
    "use strict";
    exports.__esModule = true;
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
                return React.createElement("div", null, this.props.Vm.colunmList.map(function (a, index) {
                    if (!a.isHidden) {
                        return React.createElement("div", { key: index },
                            React.createElement("label", { "class": "col-sm-1 control-label" }, a.displayName),
                            React.createElement("div", { "class": "col-sm-4" },
                                React.createElement("input", { type: a.controlType })));
                    }
                }));
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
                return _this;
            }
            TableInsertPageVm.prototype.init = function (config) {
            };
            TableInsertPageVm.prototype.loadPage = function (callback) {
                this.colunmList = JSON.parse(this.Param1);
                if (callback) {
                    callback();
                }
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
