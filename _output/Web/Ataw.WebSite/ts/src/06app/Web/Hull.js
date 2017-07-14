define(["require", "exports", "./../../01core/0Dom", "./../../01core/Util", "./../../01core/Ioc", "./../../01core/Url", "./../../03page/BaseWebPage", "./../../02tool/Tree/TreeMenu", "./../../02tool/ModalDom/ModalDom", "react", "./../../03page/NoLoginDom"], function (require, exports, domFile, utilFile, iocFile, urlFile, basewedPageFile, TreeMenuFile, ModalDomFile, React, NoLoginDomFile) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var domCore = domFile.Core;
    ModalDomFile;
    var Web;
    (function (Web) {
        class HullAction extends domCore.DomAction {
        }
        Web.HullAction = HullAction;
        class HullReact extends domCore.DomReact {
            constructor() {
                super(...arguments);
                this.state = new HullStates();
            }
            pSender() {
                return React.createElement("div", null,
                    this._creatModal(),
                    this.pHeader(),
                    this.props.Vm.PanelPageObj ? this._createPanel() : null,
                    this.pBody());
            }
            pHeader() {
                return React.createElement("nav", { className: "navbar navbar-inverse navbar-fixed-top" },
                    React.createElement("div", { className: "container-fluid" },
                        React.createElement("div", { className: "navbar-header" },
                            React.createElement("button", { type: "button", className: "navbar-toggle collapsed", "data-toggle": "collapse", "data-target": "#navbar", "aria-expanded": "false", "aria-controls": "navbar" },
                                React.createElement("span", { className: "sr-only" }, "Toggle navigation"),
                                React.createElement("span", { className: "icon-bar" }),
                                React.createElement("span", { className: "icon-bar" }),
                                React.createElement("span", { className: "icon-bar" })),
                            React.createElement("a", { className: "navbar-brand", href: "#" }, this.props.Vm.NickName)),
                        React.createElement("div", { id: "navbar", className: "navbar-collapse collapse" },
                            React.createElement("ul", { className: "nav navbar-nav navbar-right" },
                                React.createElement("li", null,
                                    React.createElement("a", { href: "#" }, "Dashboard")),
                                React.createElement("li", null,
                                    React.createElement("a", { href: "#" }, "Settings")),
                                React.createElement("li", null,
                                    React.createElement("a", { href: "/RightManage/Home/Index" }, "\u9000\u51FA")),
                                React.createElement("li", null,
                                    React.createElement("a", { href: "#" }, "Help"))))));
            }
            pBody() {
                return React.createElement("div", { className: "container-fluid" },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-sm-3 col-md-2 sidebar" }, this._tDom(this.props.Vm.menuTree)),
                        React.createElement("div", { className: "col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main" }, this.props.Vm.NickName == "未知" ? this._tDom(this.props.Vm.NoLoginDomObj) : this._tDom(this.props.Vm.MainPageObj))));
            }
            _creatModal() {
                if (this.props.Vm.WinPageObj) {
                    // alert();
                    this.props.Vm.ModalDomObj = new ModalDomFile.ModalDom.ModalDomVm({
                        DomObj: this.props.Vm.WinPageObj,
                        Title: this.props.Vm.WinPageObj.Title,
                        IsModalShow: true,
                        ModalCloseFun: (modal, fun) => {
                            this.props.Vm.WinPageObj.dispose();
                            this.props.Vm.WinPageObj = null;
                        },
                    });
                    return this.props.Vm.ModalDomObj.intoDom();
                }
                return null;
            }
            _createPanel() {
                var _reactPanel = (React.createElement("div", { className: "panel" },
                    React.createElement("div", { className: "slider" },
                        React.createElement("div", null,
                            React.createElement("h3", { className: "panelTile" }, this.props.Vm.PanelPageObj.Title),
                            React.createElement("a", { className: "btn btn-default", onClick: () => { this.fun_closePanel(); } }, "Close Me")),
                        this._tDom(this.props.Vm.PanelPageObj))));
                return _reactPanel;
            }
            fun_closePanel() {
                this.props.Vm.PanelPageObj.dispose();
                this.props.Vm.PanelPageObj = null;
                this.forceUpdate();
            }
            pComponentDidMount() {
                super.pComponentDidMount();
                this.props.Vm.loadPage();
                urlFile.Core.AkUrl.Current().bindHashChange((a, afterFun, isUrl) => {
                    //utilFile.Core.Util.ToggleLoading(true);
                    var _urls = a.split("#");
                    var _url = "";
                    var _menuUrl = "";
                    if (_urls.length > 0) {
                        if (_urls.length == 1) {
                            _menuUrl = _url = _urls[0];
                        }
                        else {
                            if (_urls.length == 2) {
                                _menuUrl = _urls[0] == "" ? _urls[1] : _urls[0];
                                _url = _urls[1];
                            }
                            else {
                                if (_urls[0] == "") {
                                    _menuUrl = _urls[1];
                                    _url = _urls[2];
                                }
                                else {
                                    _menuUrl = _urls[0];
                                    _url = _urls[1];
                                }
                            }
                        }
                    }
                    if (_url != "") {
                        // alert("调用bindPage");
                        this.props.Vm.bindPage(_url, afterFun);
                    }
                    else {
                        if (_menuUrl == "") {
                            urlFile.Core.AkUrl.Current().openUrl(this.props.Vm.HomeUrl);
                            //urlFile.Core.AkUrl.Current().openUrlByNoMenu(this.props.Vm.HomeUrl);
                        }
                    }
                });
            }
        }
        Web.HullReact = HullReact;
        class HullVm extends domCore.DomVm {
            constructor(config) {
                super();
                this.ReactType = HullReact;
                //public TableObj: tableFile.Web.TableDemoVm;
                this.content = "haha";
                this.HomeUrl = "$xbgTestPage$";
                this.menuTree = new TreeMenuFile.TreeMenu.TreeMenuVm();
                this.NickName = "未知";
                this.NoLoginDomObj = new NoLoginDomFile.NoLoginDom.NoLoginDomVm();
                if (window["RMSysObj"]) {
                    if (window["RMSysObj"]["NickName"]) {
                        this.NickName = window["RMSysObj"]["NickName"];
                    }
                }
                this.menuTree.NodeSelectClick(val => {
                    urlFile.Core.AkUrl.Current().openUrlByNoMenu(val.dataValueGet());
                    urlFile.Core.AkUrl.Current().openUrlByNoMenu(val.dataValueGet());
                    //this.bindPage(val)
                    return true;
                });
                this.ModalDomObj = new ModalDomFile.ModalDom.ModalDomVm({
                    IsDebug: true,
                    DomObj: this.WinPageObj
                });
            }
            loadPage(config) {
                // urlFile.Core.AkUrl.Current().refresh();
                //this.forceUpdate("");
                urlFile.Core.AkPost("/RightManage/Home/Test", {}, (res) => {
                    if (res.Content == "ok") {
                        this.content = res.Data;
                        //console.log(this.content);
                    }
                    urlFile.Core.AkUrl.Current().refresh();
                    this.forceUpdate("");
                });
            }
            showPage(_name, panelName, param, p1, p2, p3, afterFun) {
                iocFile.Core.Ioc.Current().FetchAsyInstance(_name, basewedPageFile.Web.BaseWebPageVm, (a) => {
                    this.fpageShow(a, _name, panelName, param, p1, p2, p3, afterFun);
                }, (a) => {
                    switch (panelName) {
                        case "win":
                            if (this.WinPageObj) {
                                this.WinPageObj.dispose();
                            }
                            this.WinPageObj = null;
                            break;
                        case "panel":
                            if (this.PanelPageObj) {
                                this.PanelPageObj.dispose();
                            }
                            this.PanelPageObj = null;
                            break;
                        default:
                            if (this.MainPageObj) {
                                this.MainPageObj.dispose();
                            }
                            this.MainPageObj = null;
                            this.ShowTip = "路由名称为 " + _name + " 的页面,脚本文件" + a + "载入失败....";
                            break;
                    }
                    try {
                        this.forceUpdate("", () => {
                            //  this.
                            utilFile.Core.Util.ToggleLoading(false);
                            if (afterFun) {
                                afterFun();
                            }
                        });
                    }
                    catch (ex) {
                        if (this.WinPageObj) {
                            this.WinPageObj.dispose();
                        }
                        if (this.PanelPageObj) {
                            this.PanelPageObj.dispose();
                        }
                        if (this.MainPageObj) {
                            this.MainPageObj.dispose();
                        }
                        this.ShowTip = ex;
                        this.forceUpdate("", () => {
                            //  this.
                            utilFile.Core.Util.ToggleLoading(false);
                        });
                    }
                });
            }
            fpageShow(_page, _name, panelName, param, p1, p2, p3, afterFun) {
                if (_page) {
                    //this.state.IsPanel ? this.state.NoRoute1 = false : this.state.NoRoute = false;
                    _page.Reset(p1, p2, p3);
                    _page.IsChange = true;
                    _page.ModuleName = _name;
                    var isPanel = false;
                    // alert("页面调用");
                    _page.sys_MenuToggle();
                    _page.sysPage_load((a) => {
                        let _panelName = _page.getForcePagePanelName();
                        if (_panelName != "") {
                            panelName = _panelName;
                        }
                        //_page.PanelName = panelName;
                        switch (panelName) {
                            case "win":
                                if (this.PanelPageObj)
                                    this.PanelPageObj.IsChange = false;
                                if (this.MainPageObj)
                                    this.MainPageObj.IsChange = false;
                                this.WinPageObj = _page;
                                this.ModalDomObj.Title = _page.Title;
                                break;
                            case "panel":
                                if (this.WinPageObj) {
                                    this.WinPageObj.dispose();
                                    this.WinPageObj = null;
                                    this.ModalDomObj.Title = null;
                                }
                                if (this.MainPageObj) {
                                    this.MainPageObj.IsChange = false;
                                }
                                this.PanelPageObj = _page;
                                break;
                            default:
                                if (this.WinPageObj) {
                                    this.WinPageObj.dispose();
                                    this.WinPageObj = null;
                                    this.ModalDomObj.Title = null;
                                }
                                if (this.PanelPageObj && param == "") {
                                    this.PanelPageObj.dispose();
                                    this.PanelPageObj = null;
                                }
                                if (this.MainPageObj) {
                                    this.MainPageObj.dispose();
                                }
                                this.MainPageObj = _page;
                                break;
                        }
                        urlFile.Core.AkUrl.Current().bindSendPage(panelName, (p, obj) => {
                            //alert("hull : " + obj);
                            _page.getEmit().emit("sendPage", p, obj);
                        });
                        urlFile.Core.AkUrl.Current().bindClosePage(panelName, () => {
                            //alert("hull : " + obj);
                            switch (panelName) {
                                case "win":
                                    this.WinPageObj.dispose();
                                    this.WinPageObj = null;
                                    break;
                                case "panel":
                                    this.PanelPageObj.dispose();
                                    this.PanelPageObj = null;
                                    break;
                                default:
                                    break;
                            }
                            this.forceUpdate("", () => {
                                utilFile.Core.Util.ToggleLoading(false);
                            });
                        });
                        this.forceUpdate("", () => {
                            if (a)
                                a();
                            utilFile.Core.Util.ToggleLoading(false);
                            if (_page.Title) {
                                document.title = _page.Title;
                            }
                            if (afterFun) {
                                afterFun();
                            }
                            _page.EndTime = new Date();
                            //  alert();
                            //this.emitAppEvent("/06app/web/Header/HeaderLinkActive.listenHeadWidth", "sys");
                        });
                        //alert();
                    });
                }
                else {
                    var _isDirect = true;
                    switch (panelName) {
                        case "win":
                            if (this.WinPageObj) {
                                this.WinPageObj.dispose();
                            }
                            this.WinPageObj = null;
                            alert("路由名称为 " + _name + " 的页面不存在");
                            break;
                        case "panel":
                            if (this.PanelPageObj) {
                                this.PanelPageObj.dispose();
                            }
                            this.PanelPageObj = null;
                            alert("路由名称为 " + _name + " 的页面不存在");
                            break;
                        default:
                            if (this.MainPageObj) {
                                this.MainPageObj.dispose();
                            }
                            this.MainPageObj = null;
                            if (_name != "MENU")
                                this.ShowTip = "路由名称为 " + _name + " 的页面不存在";
                            else {
                                this.ShowTip = "页面正在跳转......(" + panelName + " " + param + " " + p1 + " " + p2 + " " + p3 + ")";
                                _isDirect = false;
                            }
                            break;
                    }
                    if (_isDirect) {
                        this.forceUpdate("", () => {
                            if (_page) {
                                _page.EndTime = new Date();
                                this.emitAppEvent("/06app/web/Header/HeaderLinkActive.listenHeadWidth", "sys");
                            }
                            utilFile.Core.Util.ToggleLoading(false);
                        });
                    }
                }
            }
            //public menuBindHashChange(url: string, afterFun: Function, a: boolean) {
            //    if (!a) {
            //        if (url.toUpperCase() == this.HomeUrl.toUpperCase()) {
            //            //if (this.BreadDomObj) {
            //            //    this.BreadDomObj.setBreadShow("0");
            //            //}
            //            //this.MenuObj.resetRootNode();
            //            //this.emitAppEvent("/06app/web/Header/HeaderLinkActive", "", url.replace("#", ""));
            //        }
            //        else {
            //            var _isRes: boolean = false;
            //            var _m = urlFile.Core.AkUrl.Current().getPageUrlModel(url);
            //            var _code1: string = "";
            //            if (_m) {
            //                _code1 = urlFile.Core.AkUrl.Current().getUrlCode(_m);
            //            }
            //            else {
            //                _code1 = url;
            //            }
            //            if (!_isRes) {
            //                this.emitAppEvent("/06app/web/Header/HeaderLinkActive", "", url.replace("#", ""));
            //            }
            //        }
            //    }
            //}
            bindPage(a, afterFun) {
                this.ShowTip = "正在载入数据";
                var _m = urlFile.Core.AkUrl.Current().getPageUrlModel(a);
                if (_m) {
                    this.showPage(_m.ModuleName, _m.PanelName, "", _m.Param1, _m.Param2, _m.Param3, afterFun);
                }
                else {
                    this.ShowTip = a + " 路由格式错误  " + a;
                    this.forceUpdate("", () => {
                        utilFile.Core.Util.ToggleLoading(false);
                        if (afterFun) {
                            afterFun();
                        }
                    });
                }
            }
        }
        Web.HullVm = HullVm;
        class HullStates extends domCore.DomStates {
        }
        Web.HullStates = HullStates;
        class HullProps extends domCore.DomProps {
        }
        Web.HullProps = HullProps;
    })(Web = exports.Web || (exports.Web = {}));
});
