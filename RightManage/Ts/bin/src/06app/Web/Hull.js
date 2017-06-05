var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./../../01core/0Dom", "./../../01core/Util", "./../../01core/Ioc", "./../../01core/Url", "./../../03page/BaseWebPage", "./../../02tool/Tree/TreeMenu", "./../../02tool/ModalDom/ModalDom", "react"], function (require, exports, domFile, utilFile, iocFile, urlFile, basewedPageFile, TreeMenuFile, ModalDomFile, React) {
    "use strict";
    var domCore = domFile.Core;
    ModalDomFile;
    var Web;
    (function (Web) {
        var HullAction = (function (_super) {
            __extends(HullAction, _super);
            function HullAction() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return HullAction;
        }(domCore.DomAction));
        Web.HullAction = HullAction;
        var HullReact = (function (_super) {
            __extends(HullReact, _super);
            function HullReact() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.state = new HullStates();
                return _this;
            }
            HullReact.prototype.pSender = function () {
                return React.createElement("div", null,
                    this._creatModal(),
                    this.pHeader(),
                    this.props.Vm.PanelPageObj ? this._createPanel() : null,
                    this.pBody());
            };
            HullReact.prototype.pHeader = function () {
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
                                    React.createElement("a", { href: "#" }, "Profile")),
                                React.createElement("li", null,
                                    React.createElement("a", { href: "#" }, "Help"))))));
            };
            HullReact.prototype.pBody = function () {
                return React.createElement("div", { className: "container-fluid" },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-sm-3 col-md-2 sidebar" }, this._tDom(this.props.Vm.menuTree)),
                        React.createElement("div", { className: "col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main" }, this._tDom(this.props.Vm.MainPageObj))));
            };
            HullReact.prototype._creatModal = function () {
                var _this = this;
                if (this.props.Vm.WinPageObj) {
                    // alert();
                    this.props.Vm.ModalDomObj = new ModalDomFile.ModalDom.ModalDomVm({
                        DomObj: this.props.Vm.WinPageObj,
                        Title: this.props.Vm.WinPageObj.Title,
                        IsModalShow: true,
                        ModalCloseFun: function (modal, fun) {
                            _this.props.Vm.WinPageObj.dispose();
                            _this.props.Vm.WinPageObj = null;
                        }
                    });
                    return this.props.Vm.ModalDomObj.intoDom();
                }
                return null;
            };
            HullReact.prototype._createPanel = function () {
                var _this = this;
                var _reactPanel = (React.createElement("div", { className: "panel" },
                    React.createElement("div", { className: "slider" },
                        React.createElement("div", null,
                            React.createElement("h3", { className: "panelTile" }, this.props.Vm.PanelPageObj.Title),
                            React.createElement("a", { className: "btn btn-default", onClick: function () { _this.fun_closePanel(); } }, "Close Me")),
                        this._tDom(this.props.Vm.PanelPageObj))));
                return _reactPanel;
            };
            HullReact.prototype.fun_closePanel = function () {
                this.props.Vm.PanelPageObj.dispose();
                this.props.Vm.PanelPageObj = null;
                this.forceUpdate();
            };
            HullReact.prototype.pComponentDidMount = function () {
                var _this = this;
                _super.prototype.pComponentDidMount.call(this);
                this.props.Vm.loadPage();
                urlFile.Core.AkUrl.Current().bindHashChange(function (a, afterFun, isUrl) {
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
                        _this.props.Vm.bindPage(_url, afterFun);
                    }
                    else {
                        if (_menuUrl == "") {
                            urlFile.Core.AkUrl.Current().openUrl(_this.props.Vm.HomeUrl);
                            urlFile.Core.AkUrl.Current().openUrlByNoMenu(_this.props.Vm.HomeUrl);
                        }
                    }
                });
            };
            return HullReact;
        }(domCore.DomReact));
        Web.HullReact = HullReact;
        var HullVm = (function (_super) {
            __extends(HullVm, _super);
            function HullVm(config) {
                var _this = _super.call(this) || this;
                _this.ReactType = HullReact;
                //public TableObj: tableFile.Web.TableDemoVm;
                _this.content = "haha";
                _this.HomeUrl = "$xbgTestPage$";
                _this.menuTree = new TreeMenuFile.TreeMenu.TreeMenuVm();
                _this.NickName = "未知";
                if (window["RMSysObj"]) {
                    if (window["RMSysObj"]["NickName"]) {
                        _this.NickName = window["RMSysObj"]["NickName"];
                    }
                }
                _this.menuTree.NodeSelectClick(function (val) {
                    urlFile.Core.AkUrl.Current().openUrlByNoMenu(val.dataValueGet());
                    urlFile.Core.AkUrl.Current().openUrlByNoMenu(val.dataValueGet());
                    //this.bindPage(val)
                    return true;
                });
                _this.ModalDomObj = new ModalDomFile.ModalDom.ModalDomVm({
                    IsDebug: true,
                    DomObj: _this.WinPageObj
                });
                return _this;
            }
            HullVm.prototype.loadPage = function (config) {
                var _this = this;
                urlFile.Core.AkPost("/Home/Test", {}, function (res) {
                    if (res.Content == "ok") {
                        _this.content = res.Data;
                    }
                    urlFile.Core.AkUrl.Current().refresh();
                    _this.forceUpdate("");
                });
            };
            HullVm.prototype.showPage = function (_name, panelName, param, p1, p2, p3, afterFun) {
                var _this = this;
                iocFile.Core.Ioc.Current().FetchAsyInstance(_name, basewedPageFile.Web.BaseWebPageVm, function (a) {
                    _this.fpageShow(a, _name, panelName, param, p1, p2, p3, afterFun);
                }, function (a) {
                    switch (panelName) {
                        case "win":
                            if (_this.WinPageObj) {
                                _this.WinPageObj.dispose();
                            }
                            _this.WinPageObj = null;
                            break;
                        case "panel":
                            if (_this.PanelPageObj) {
                                _this.PanelPageObj.dispose();
                            }
                            _this.PanelPageObj = null;
                            break;
                        default:
                            if (_this.MainPageObj) {
                                _this.MainPageObj.dispose();
                            }
                            _this.MainPageObj = null;
                            _this.ShowTip = "路由名称为 " + _name + " 的页面,脚本文件" + a + "载入失败....";
                            break;
                    }
                    try {
                        _this.forceUpdate("", function () {
                            //  this.
                            utilFile.Core.Util.ToggleLoading(false);
                            if (afterFun) {
                                afterFun();
                            }
                        });
                    }
                    catch (ex) {
                        if (_this.WinPageObj) {
                            _this.WinPageObj.dispose();
                        }
                        if (_this.PanelPageObj) {
                            _this.PanelPageObj.dispose();
                        }
                        if (_this.MainPageObj) {
                            _this.MainPageObj.dispose();
                        }
                        _this.ShowTip = ex;
                        _this.forceUpdate("", function () {
                            //  this.
                            utilFile.Core.Util.ToggleLoading(false);
                        });
                    }
                });
            };
            HullVm.prototype.fpageShow = function (_page, _name, panelName, param, p1, p2, p3, afterFun) {
                var _this = this;
                if (_page) {
                    //this.state.IsPanel ? this.state.NoRoute1 = false : this.state.NoRoute = false;
                    _page.Reset(p1, p2, p3);
                    _page.IsChange = true;
                    _page.ModuleName = _name;
                    var isPanel = false;
                    // alert("页面调用");
                    _page.sys_MenuToggle();
                    _page.sysPage_load(function (a) {
                        var _panelName = _page.getForcePagePanelName();
                        if (_panelName != "") {
                            panelName = _panelName;
                        }
                        //_page.PanelName = panelName;
                        switch (panelName) {
                            case "win":
                                if (_this.PanelPageObj)
                                    _this.PanelPageObj.IsChange = false;
                                if (_this.MainPageObj)
                                    _this.MainPageObj.IsChange = false;
                                _this.WinPageObj = _page;
                                _this.ModalDomObj.Title = _page.Title;
                                break;
                            case "panel":
                                if (_this.WinPageObj) {
                                    _this.WinPageObj.dispose();
                                    _this.WinPageObj = null;
                                    _this.ModalDomObj.Title = null;
                                }
                                if (_this.MainPageObj) {
                                    _this.MainPageObj.IsChange = false;
                                }
                                _this.PanelPageObj = _page;
                                break;
                            default:
                                if (_this.WinPageObj) {
                                    _this.WinPageObj.dispose();
                                    _this.WinPageObj = null;
                                    _this.ModalDomObj.Title = null;
                                }
                                if (_this.PanelPageObj && param == "") {
                                    _this.PanelPageObj.dispose();
                                    _this.PanelPageObj = null;
                                }
                                if (_this.MainPageObj) {
                                    _this.MainPageObj.dispose();
                                }
                                _this.MainPageObj = _page;
                                break;
                        }
                        urlFile.Core.AkUrl.Current().bindSendPage(panelName, function (p, obj) {
                            //alert("hull : " + obj);
                            _page.getEmit().emit("sendPage", p, obj);
                        });
                        urlFile.Core.AkUrl.Current().bindClosePage(panelName, function () {
                            //alert("hull : " + obj);
                            switch (panelName) {
                                case "win":
                                    _this.WinPageObj.dispose();
                                    _this.WinPageObj = null;
                                    break;
                                case "panel":
                                    _this.PanelPageObj.dispose();
                                    _this.PanelPageObj = null;
                                    break;
                                default:
                                    break;
                            }
                            _this.forceUpdate("", function () {
                                utilFile.Core.Util.ToggleLoading(false);
                            });
                        });
                        _this.forceUpdate("", function () {
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
                        this.forceUpdate("", function () {
                            if (_page) {
                                _page.EndTime = new Date();
                                _this.emitAppEvent("/06app/web/Header/HeaderLinkActive.listenHeadWidth", "sys");
                            }
                            utilFile.Core.Util.ToggleLoading(false);
                        });
                    }
                }
            };
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
            HullVm.prototype.bindPage = function (a, afterFun) {
                this.ShowTip = "正在载入数据";
                var _m = urlFile.Core.AkUrl.Current().getPageUrlModel(a);
                if (_m) {
                    this.showPage(_m.ModuleName, _m.PanelName, "", _m.Param1, _m.Param2, _m.Param3, afterFun);
                }
                else {
                    this.ShowTip = a + " 路由格式错误  " + a;
                    this.forceUpdate("", function () {
                        utilFile.Core.Util.ToggleLoading(false);
                        if (afterFun) {
                            afterFun();
                        }
                    });
                }
            };
            return HullVm;
        }(domCore.DomVm));
        Web.HullVm = HullVm;
        var HullStates = (function (_super) {
            __extends(HullStates, _super);
            function HullStates() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return HullStates;
        }(domCore.DomStates));
        Web.HullStates = HullStates;
        var HullProps = (function (_super) {
            __extends(HullProps, _super);
            function HullProps() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return HullProps;
        }(domCore.DomProps));
        Web.HullProps = HullProps;
    })(Web = exports.Web || (exports.Web = {}));
});
