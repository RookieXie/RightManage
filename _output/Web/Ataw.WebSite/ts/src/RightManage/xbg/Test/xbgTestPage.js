var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./../../../01core/Ioc", "./../../../01core/Url", "./../../../03page/BaseWebPage", "./../../../03page/Table/TableDom", "react"], function (require, exports, iocFile, urlFile, basewedPageFile, tableDomFile, React) {
    "use strict";
    var xbgTestPage;
    (function (xbgTestPage) {
        var xbgTestPageAction = (function (_super) {
            __extends(xbgTestPageAction, _super);
            function xbgTestPageAction() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return xbgTestPageAction;
        }(basewedPageFile.Web.BaseWebPageStates));
        xbgTestPage.xbgTestPageAction = xbgTestPageAction;
        var xbgTestPageReact = (function (_super) {
            __extends(xbgTestPageReact, _super);
            function xbgTestPageReact() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.state = new xbgTestPageStates();
                return _this;
            }
            xbgTestPageReact.prototype.pSender = function () {
                var _this = this;
                return React.createElement("div", null,
                    React.createElement("div", null,
                        React.createElement("button", { type: "button", className: "btn btn-info", onClick: function () { _this.testClick(); } }, "\u6D4B\u8BD5")),
                    this._tDom(this.props.Vm.tableDomObj));
            };
            xbgTestPageReact.prototype.testClick = function () {
                this.props.Vm.testClick();
            };
            return xbgTestPageReact;
        }(basewedPageFile.Web.BaseWebPageReact));
        xbgTestPage.xbgTestPageReact = xbgTestPageReact;
        var xbgTestPageVm = (function (_super) {
            __extends(xbgTestPageVm, _super);
            function xbgTestPageVm(config) {
                var _this = _super.call(this) || this;
                _this.ReactType = xbgTestPageReact;
                _this.Title = "xbgTestPage页面;";
                _this.pageContent = "1";
                return _this;
            }
            xbgTestPageVm.prototype.init = function (config) {
            };
            xbgTestPageVm.prototype.testClick = function () {
                urlFile.Core.AkPost("/Home/Test1", {}, function (res) {
                    console.table(res);
                });
            };
            xbgTestPageVm.prototype.loadPage = function (callback) {
                var _this = this;
                var _page = { PageIndex: 0, PageSize: 10 };
                urlFile.Core.AkPost("/Common/GetTable", { tableName: "Test", pager: _page }, function (res) {
                    //this.pageContent = res;
                    var btns = { name: "Insert", text: "新增", isbatch: false, Function: function () { alert("Insert"); } };
                    var _config = { tableColunms: res.tableColunms, tableData: res.tableData, tableName: "Test" };
                    _this.tableDomObj = new tableDomFile.TableDom.TableDomVm(_config);
                    // console.log(res);
                    if (callback) {
                        callback();
                    }
                });
            };
            return xbgTestPageVm;
        }(basewedPageFile.Web.BaseWebPageVm));
        xbgTestPage.xbgTestPageVm = xbgTestPageVm;
        var xbgTestPageStates = (function (_super) {
            __extends(xbgTestPageStates, _super);
            function xbgTestPageStates() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return xbgTestPageStates;
        }(basewedPageFile.Web.BaseWebPageStates));
        xbgTestPage.xbgTestPageStates = xbgTestPageStates;
        var xbgTestPageProps = (function (_super) {
            __extends(xbgTestPageProps, _super);
            function xbgTestPageProps() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return xbgTestPageProps;
        }(basewedPageFile.Web.BaseWebPageProps));
        xbgTestPage.xbgTestPageProps = xbgTestPageProps;
        iocFile.Core.Ioc.Current().RegisterType("XBGTESTPAGE", basewedPageFile.Web.BaseWebPageVm, xbgTestPageVm);
    })(xbgTestPage = exports.xbgTestPage || (exports.xbgTestPage = {}));
});
