import domFile = require("./../01core/0Dom");
import urlFile = require("./../01core/Url");
import eventFile = require("./../01core/Event");
/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/react/react-dom.d.ts" />
import React = require("react");
import ReactDOM = require("react-dom");
import iocFile = require("./../01core/Ioc");

export module Web {

    export interface IPageActor {
        FromPanelName: string;
        FromModulename: string;
        ToPanelName: string;
        ToModuleName?: string;

        Param1?: string;
        Param2?: string;
        Param3?: string;
    }

    export interface IToPage {
        ToPanelName: string;
        ToModuleName?: string;
    }

    export class BaseWebPageAction extends domFile.Core.DomAction {

    }

    export class BaseWebPageReact<P extends BaseWebPageProps<BaseWebPageVm>, S extends BaseWebPageStates, A extends BaseWebPageAction> extends domFile.Core.DomReact<P, S, A> implements domFile.Core.IReact {


        public pSender(): React.ReactElement<any> {
            return null;

        }

    }

    export class BaseWebPageProps<V extends BaseWebPageVm> extends domFile.Core.DomProps<V>{



    }

    export interface ICallBackFun {
        (fun?: IUpdateFun): void;
    }

    export interface IUpdateFun {
        (): void;
    }

    export interface IBaseWebPageConfig {
        Title: string;
    }

    export class BaseWebPageVm extends domFile.Core.DomVm {
        public ReactType = null;;
        public Param1: string = "";
        public Param2: string = "";
        public Param3: string = "";
        public ModuleName = "";
        public Title: string = "";
        public PanelName: string = "";

        public BeginTime: Date;
        public EndTime: Date;
        protected pIsHullAutoHide: boolean = false;
        protected pIsHullAutoShow: boolean = false;

        public PageUrl: string;
        protected IsDisposeAll: boolean = true;
        private fHasDispose: boolean = false;

        public constructor(config?: IBaseWebPageConfig) {
            super();
            if (config) {
                this.Title = config.Title;
            }
            this.UniId = this.Title + "(" + eventFile.App.getUniId() + ")";
            this.BeginTime = new Date();
            this.getEmit().addListener("sendPage", (config: IPageActor, obj: any) => {
                this.ReceivePageSend(config, obj);
            })

        }

        public getForcePagePanelName(): string {
            return "";
        }

        public SendPageActor(toPage: IToPage, obj: any) {

            var _config: IPageActor = {
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

        protected ReceivePageSend(config: IPageActor, obj: any) {
            // alert( fromName + " to "+  panelName);
        }

        public Reset(p1?: string, p2?: string, p3?: string) {
            this.Param1 = p1;
            this.Param2 = p2;
            this.Param3 = p3;
        }
        public senderPage(callback?: Function) {
            this.forceUpdate("", () => { if (callback) callback(); });
        }

        public forceToggleMenu(isExpand: boolean) {
            this.emitAppEvent("Hull-Menu-Toggle-Page-NoSender", "sys", isExpand);
        }

        public sys_MenuToggle() {
            if (this.pIsHullAutoHide) {
                this.emitAppEvent("Hull-Menu-Toggle-Page-NoSender", "sys", true);
            }
            if (this.pIsHullAutoShow) {
                this.emitAppEvent("Hull-Menu-Toggle-Page-NoSender", "sys", false);
            }
        }

        public sysPage_load(callback?: ICallBackFun) {

            this.loadPage(callback);
            // callback();
        }

        protected loadPage(callback?: ICallBackFun) {
            if (callback) {
                callback();
            }
        }

        protected closePage() {
            urlFile.Core.AkUrl.Current().closePage(this.PanelName);
        }

        protected pDispose() {

            super.pDispose();

        }



    }

    export class BaseWebPageStates extends domFile.Core.DomStates {




    }

}

export function _reg(name: string, path: string, src?: string) {
    if (!src) {
        src = "./../";
    }
    iocFile.Core.Ioc.Current().RegisterTypeSrc(name, Web.BaseWebPageVm, src + path);
}