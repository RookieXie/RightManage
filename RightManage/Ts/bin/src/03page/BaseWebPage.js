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
define(["require", "exports", "./../01core/0Dom", "./../01core/Url", "./../01core/Event", "./../01core/Ioc"], function (require, exports, domFile, urlFile, eventFile, iocFile) {
    "use strict";
    exports.__esModule = true;
    var Web;
    (function (Web) {
        var BaseWebPageAction = (function (_super) {
            __extends(BaseWebPageAction, _super);
            function BaseWebPageAction() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return BaseWebPageAction;
        }(domFile.Core.DomAction));
        Web.BaseWebPageAction = BaseWebPageAction;
        var BaseWebPageReact = (function (_super) {
            __extends(BaseWebPageReact, _super);
            function BaseWebPageReact() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            BaseWebPageReact.prototype.pSender = function () {
                return null;
            };
            return BaseWebPageReact;
        }(domFile.Core.DomReact));
        Web.BaseWebPageReact = BaseWebPageReact;
        var BaseWebPageProps = (function (_super) {
            __extends(BaseWebPageProps, _super);
            function BaseWebPageProps() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return BaseWebPageProps;
        }(domFile.Core.DomProps));
        Web.BaseWebPageProps = BaseWebPageProps;
        var BaseWebPageVm = (function (_super) {
            __extends(BaseWebPageVm, _super);
            function BaseWebPageVm(config) {
                var _this = _super.call(this) || this;
                _this.ReactType = null;
                _this.Param1 = "";
                _this.Param2 = "";
                _this.Param3 = "";
                _this.ModuleName = "";
                _this.Title = "";
                _this.PanelName = "";
                _this.pIsHullAutoHide = false;
                _this.pIsHullAutoShow = false;
                _this.IsDisposeAll = true;
                _this.fHasDispose = false;
                if (config) {
                    _this.Title = config.Title;
                }
                _this.UniId = _this.Title + "(" + eventFile.App.getUniId() + ")";
                _this.BeginTime = new Date();
                _this.getEmit().addListener("sendPage", function (config, obj) {
                    _this.ReceivePageSend(config, obj);
                });
                return _this;
            }
            ;
            BaseWebPageVm.prototype.getForcePagePanelName = function () {
                return "";
            };
            BaseWebPageVm.prototype.SendPageActor = function (toPage, obj) {
                var _config = {
                    FromPanelName: this.PanelName,
                    FromModulename: this.ModuleName,
                    ToPanelName: toPage.ToPanelName,
                    ToModuleName: toPage.ToModuleName,
                    Param1: this.Param1,
                    Param2: this.Param2,
                    Param3: this.Param3
                };
                urlFile.Core.AkUrl.Current().SendToPage(_config, obj);
            };
            BaseWebPageVm.prototype.ReceivePageSend = function (config, obj) {
                // alert( fromName + " to "+  panelName);
            };
            BaseWebPageVm.prototype.Reset = function (p1, p2, p3) {
                this.Param1 = p1;
                this.Param2 = p2;
                this.Param3 = p3;
            };
            BaseWebPageVm.prototype.senderPage = function (callback) {
                this.forceUpdate("", function () { if (callback)
                    callback(); });
            };
            BaseWebPageVm.prototype.forceToggleMenu = function (isExpand) {
                this.emitAppEvent("Hull-Menu-Toggle-Page-NoSender", "sys", isExpand);
            };
            BaseWebPageVm.prototype.sys_MenuToggle = function () {
                if (this.pIsHullAutoHide) {
                    this.emitAppEvent("Hull-Menu-Toggle-Page-NoSender", "sys", true);
                }
                if (this.pIsHullAutoShow) {
                    this.emitAppEvent("Hull-Menu-Toggle-Page-NoSender", "sys", false);
                }
            };
            BaseWebPageVm.prototype.sysPage_load = function (callback) {
                this.loadPage(callback);
                // callback();
            };
            BaseWebPageVm.prototype.loadPage = function (callback) {
                if (callback) {
                    callback();
                }
            };
            BaseWebPageVm.prototype.closePage = function () {
                urlFile.Core.AkUrl.Current().closePage(this.PanelName);
            };
            BaseWebPageVm.prototype.pDispose = function () {
                _super.prototype.pDispose.call(this);
            };
            return BaseWebPageVm;
        }(domFile.Core.DomVm));
        Web.BaseWebPageVm = BaseWebPageVm;
        var BaseWebPageStates = (function (_super) {
            __extends(BaseWebPageStates, _super);
            function BaseWebPageStates() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return BaseWebPageStates;
        }(domFile.Core.DomStates));
        Web.BaseWebPageStates = BaseWebPageStates;
    })(Web = exports.Web || (exports.Web = {}));
    function _reg(name, path, src) {
        if (!src) {
            src = "./../";
        }
        iocFile.Core.Ioc.Current().RegisterTypeSrc(name, Web.BaseWebPageVm, src + path);
    }
    exports._reg = _reg;
});
