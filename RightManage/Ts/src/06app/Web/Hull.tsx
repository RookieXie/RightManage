import domFile = require("./../../01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("./../../01core/Util");
import iocFile = require("./../../01core/Ioc");
import urlFile = require("./../../01core/Url");
import eventFile = require("./../../01core/Event");
import basewedPageFile = require("./../../03page/BaseWebPage");
import TreeMenuFile = require("./../../02tool/Tree/TreeMenu");
import ModalDomFile = require("./../../02tool/ModalDom/ModalDom"); ModalDomFile;
import React = require("react");
import ReactDOM = require("react-dom");
import NoLoginDomFile = require("./../../03page/NoLoginDom");

export module Web {

    export class HullAction extends domCore.DomAction {
    }

    export class HullReact extends domCore.DomReact<HullProps, HullStates, HullAction> implements domCore.IReact {

        public state = new HullStates();
        public pSender(): React.ReactElement<any> {

            return <div>
                {this._creatModal()}
                {this.pHeader()}
                {this.props.Vm.PanelPageObj ? this._createPanel() : null}
                {this.pBody()}
            </div>;


        }

        public pHeader() {
            return <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">{this.props.Vm.NickName}</a>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="#">Dashboard</a></li>
                            <li><a href="#">Settings</a></li>
                            <li><a href="/RightManage/Home/Index">退出</a></li>
                            <li><a href="#">Help</a></li>
                        </ul>
                    </div></div>
            </nav>;
        }

        public pBody() {
            return <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3 col-md-2 sidebar">
                        {this._tDom(this.props.Vm.menuTree)}
                    </div>
                    <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                        {this.props.Vm.NickName == "未知" ? this._tDom(this.props.Vm.NoLoginDomObj):this._tDom(this.props.Vm.MainPageObj)}
                    </div>
                </div>
            </div>
        }
        private _creatModal(): React.ReactElement<any> {
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
        private _createPanel(): React.ReactElement<any> {
            var _reactPanel = (<div className="panel"><div className="slider">
                <div >
                    <h3 className="panelTile">{this.props.Vm.PanelPageObj.Title}</h3>
                    <a className="btn btn-default" onClick={() => { this.fun_closePanel() }}>Close Me</a>
                </div>
                {this._tDom(this.props.Vm.PanelPageObj)}
            </div>
            </div>);
            return _reactPanel;
        }
        private fun_closePanel() {
            this.props.Vm.PanelPageObj.dispose();
            this.props.Vm.PanelPageObj = null;
            this.forceUpdate();
        }
        protected pComponentDidMount() {
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
                            } else {
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

    export interface IHullVmConfig {
    }



    export class HullVm extends domCore.DomVm {
        public ReactType = HullReact;

        //public TableObj: tableFile.Web.TableDemoVm;
        public content: string = "haha";
        public HomeUrl: string = "$xbgTestPage$";

        public MainPageObj: basewedPageFile.Web.BaseWebPageVm;
        public PanelPageObj: basewedPageFile.Web.BaseWebPageVm;
        public WinPageObj: basewedPageFile.Web.BaseWebPageVm;
        public ShowTip: string;
        public menuTree: TreeMenuFile.TreeMenu.TreeMenuVm = new TreeMenuFile.TreeMenu.TreeMenuVm();
        public ModalDomObj: ModalDomFile.ModalDom.ModalDomVm;
        public NickName: string = "未知";
        public NoLoginDomObj: NoLoginDomFile.NoLoginDom.NoLoginDomVm = new NoLoginDomFile.NoLoginDom.NoLoginDomVm() ;
        public loadPage(config?: IHullVmConfig) {
           // urlFile.Core.AkUrl.Current().refresh();
            //this.forceUpdate("");
            urlFile.Core.AkPost("/RightManage/Home/Test", {}, (res) => {
                if (res.Content == "ok") {
                    this.content = res.Data;
                    //console.log(this.content);
                }
                urlFile.Core.AkUrl.Current().refresh();
                this.forceUpdate("");
            })
        }




        public constructor(config?: IHullVmConfig) {
            super();
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
            })
            this.ModalDomObj = new ModalDomFile.ModalDom.ModalDomVm({
                IsDebug: true,
                DomObj: this.WinPageObj

            });
            
        }


        private showPage(_name: string, panelName: string, param: string, p1: string, p2: string, p3: string, afterFun: Function) {
            iocFile.Core.Ioc.Current().FetchAsyInstance<basewedPageFile.Web.BaseWebPageVm>(
                _name,
                basewedPageFile.Web.BaseWebPageVm,
                (a: basewedPageFile.Web.BaseWebPageVm) => {
                    this.fpageShow(a, _name, panelName, param, p1, p2, p3, afterFun);
                },
                (a) => {
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
                }
            );

        }


        private fpageShow(_page: basewedPageFile.Web.BaseWebPageVm, _name: string, panelName: string, param: string, p1: string, p2: string, p3: string, afterFun: Function) {
            if (_page) {
                //this.state.IsPanel ? this.state.NoRoute1 = false : this.state.NoRoute = false;
                _page.Reset(p1, p2, p3);
                _page.IsChange = true;
                _page.ModuleName = _name;
                var isPanel: boolean = false;
                // alert("页面调用");
                _page.sys_MenuToggle();
                _page.sysPage_load((a?: Function) => {
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

                    urlFile.Core.AkUrl.Current().bindSendPage(panelName, (p: IPageActor, obj: any) => {
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

                        if (a) a();
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
                var _isDirect: boolean = true;
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







        public bindPage(a: string, afterFun: Function) {

            this.ShowTip = "正在载入数据";
            var _m = urlFile.Core.AkUrl.Current().getPageUrlModel(a);
            if (_m) {

                this.showPage(
                    _m.ModuleName,
                    _m.PanelName,
                    "",
                    _m.Param1,
                    _m.Param2,
                    _m.Param3,
                    afterFun);
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
    export class HullStates extends domCore.DomStates {
    }


    export class HullProps extends domCore.DomProps<HullVm>{
    }

    export interface IPageActor {
        FromPanelName: string;
        FromModulename: string;
        ToPanelName: string;
        ToModuleName?: string;

        Param1?: string;
        Param2?: string;
        Param3?: string;
    }

    export interface PageUrlMode {
        PanelName: string;
        ModuleName: string;
        Param1?: string;
        Param2?: string;
        Param3?: string;

    }




}
