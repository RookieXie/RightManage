define(["require", "exports", "./../01core/0Dom", "./../01core/Url", "./../01core/Event", "./../01core/Ioc"], function (require, exports, domFile, urlFile, eventFile, iocFile) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Web;
    (function (Web) {
        class BaseWebPageAction extends domFile.Core.DomAction {
        }
        Web.BaseWebPageAction = BaseWebPageAction;
        class BaseWebPageReact extends domFile.Core.DomReact {
            pSender() {
                return null;
            }
        }
        Web.BaseWebPageReact = BaseWebPageReact;
        class BaseWebPageProps extends domFile.Core.DomProps {
        }
        Web.BaseWebPageProps = BaseWebPageProps;
        class BaseWebPageVm extends domFile.Core.DomVm {
            constructor(config) {
                super();
                this.ReactType = null;
                this.Param1 = "";
                this.Param2 = "";
                this.Param3 = "";
                this.ModuleName = "";
                this.Title = "";
                this.PanelName = "";
                this.pIsHullAutoHide = false;
                this.pIsHullAutoShow = false;
                this.IsDisposeAll = true;
                this.fHasDispose = false;
                if (config) {
                    this.Title = config.Title;
                }
                this.UniId = this.Title + "(" + eventFile.App.getUniId() + ")";
                this.BeginTime = new Date();
                this.getEmit().addListener("sendPage", (config, obj) => {
                    this.ReceivePageSend(config, obj);
                });
            }
            ;
            getForcePagePanelName() {
                return "";
            }
            SendPageActor(toPage, obj) {
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
            }
            ReceivePageSend(config, obj) {
                // alert( fromName + " to "+  panelName);
            }
            Reset(p1, p2, p3) {
                this.Param1 = p1;
                this.Param2 = p2;
                this.Param3 = p3;
            }
            senderPage(callback) {
                this.forceUpdate("", () => { if (callback)
                    callback(); });
            }
            forceToggleMenu(isExpand) {
                this.emitAppEvent("Hull-Menu-Toggle-Page-NoSender", "sys", isExpand);
            }
            sys_MenuToggle() {
                if (this.pIsHullAutoHide) {
                    this.emitAppEvent("Hull-Menu-Toggle-Page-NoSender", "sys", true);
                }
                if (this.pIsHullAutoShow) {
                    this.emitAppEvent("Hull-Menu-Toggle-Page-NoSender", "sys", false);
                }
            }
            sysPage_load(callback) {
                this.loadPage(callback);
                // callback();
            }
            loadPage(callback) {
                if (callback) {
                    callback();
                }
            }
            closePage() {
                urlFile.Core.AkUrl.Current().closePage(this.PanelName);
            }
            pDispose() {
                super.pDispose();
            }
        }
        Web.BaseWebPageVm = BaseWebPageVm;
        class BaseWebPageStates extends domFile.Core.DomStates {
        }
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
