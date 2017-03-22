import domFile = require("./../../01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("./../../01core/Util");
import iocFile = require("./../../01core/Ioc");
import urlFile = require("./../../01core/Url");
import React = require("react");
import ReactDOM = require("react-dom");

export module ModalDom {
    export class ModalDomAction extends domCore.DomAction {
    }

    export class ModalDomReact extends domCore.DomReact<ModalDomProps, ModalDomStates, ModalDomAction> implements domCore.IReact {

        public state = new ModalDomStates();
        


        private open_fun() {
            this.props.Vm.open();
        }
        private close_fun() {
            this.props.Vm.close();
        }
        
        public pSender(): React.ReactElement<any> {
            return <div className={"md-modal md-effect-10 " + (this.props.Vm.IsModalShow ?"md-show":" hide")} id="modal-10">
                <div className="md-content">
                    <div className="md-nav">
                        {this.props.Vm.Title ? <h3 className="">{this.props.Vm.Title}</h3> : null}
                        <a className="" onClick={() => { this.close_fun(); }}>
                            <i className="icon-remove">Close me!</i>
                        </a>
                    </div>
                    <div>
                        <div className="content">{this._tDom(this.props.Vm.DomObj, { nullNode: <span > <i className=""></i>等待载入内容</span> })}</div>                        
                    </div>
                </div>
            </div>
        }
        protected pComponentDidMount() {
            super.pComponentDidMount();
            if ($(".md-show").length > 0) {
                $("body").addClass("Hf-overflow ");
            }

            $(window).resize(() => {
                this.setWidth();
            });
            this.setWidth();


        }

        private setWidth() {
            var _dom = this.pGetDom();
            if (_dom) {
                var _$dom = $(_dom).find(".ACT-MODAL-CONTENT");
                // _$dom.children(".Hc-modals-list").height($(window).height() - 60 - 30 - 30);
                // _$dom.children(".Hc-modals-list").addClass("Hg-overflow-auto");
                _$dom.css("height", ($(window).height() - 60 - 30 - 30 - 20) * 0.95 + "px").addClass("Hz-scroll Hg-overflow-auto");
            }
        }

        protected pInstall(): void {
            super.pInstall();
            if (this.props.Vm.IsModalShow) {
                if ($(".md-show").length > 0) {
                    $("body").addClass("Hf-overflow ");
                } else {
                    // $("body").addClass("Hf-overflow ");
                }
            }
        }


    }

    export interface IReactModalDomVm extends domCore.DomVm {
        IsModalShow?: boolean;
        ModalTop?: number;
        Title?: string;
        DomObj?: domCore.DomVm;
        ClassName?: string;

        open();
        close();
        IsDebug?: boolean;
        Width: string;
        Zindex: number;
    }

    export interface IModalFun {
        (modal: ModalDomVm, callBack: Function): void;
    }

    export interface IModalDomConfig {
        IsModalShow?: boolean;
        ModalTop?: number;
        Title?: string;
        DomObj?: domCore.DomVm;
        ModalShowingFun?: IModalFun;
        IsDebug?: boolean;
        ClassName?: string;
        UniId?: string;
        ModalCloseFun?: IModalFun;
        Width?: string;
        Zindex?: number;
    }

    export class ModalDomVm extends domCore.DomVm implements IReactModalDomVm {
        public ReactType = ModalDomReact;

        public IsModalShow: boolean;
        public ModalTop: number = 0;
        public Title: string;
        public DomObj: domCore.DomVm;
        public ModalShowFun: IModalFun;
        public IsNoFirst: boolean = false;
        public IsDebug: boolean = false;
        public ClassName: string;
        public UniId: string;
        public IsMulit: boolean = true;

        public ModalCloseFun: IModalFun;
        public Width: string;
        public Zindex: number;
        public constructor(config?: IModalDomConfig) {
            super();
            if (config) {
                if (config) {
                    if (config.IsModalShow) {
                        this.IsModalShow = config.IsModalShow;
                    }
                    if (config.ModalTop) {
                        this.ModalTop = config.ModalTop;
                    }
                    if (config.Title) {
                        this.Title = config.Title;
                    }
                    if (config.ModalShowingFun) {
                        this.ModalShowFun = config.ModalShowingFun;
                    }

                    if (config.ModalCloseFun) {
                        this.ModalCloseFun = config.ModalCloseFun;
                    }

                    if (config.IsDebug) {
                        this.IsDebug = config.IsDebug;
                    }
                    if (config.ClassName) {
                        this.ClassName = config.ClassName;
                    }
                    if (config.UniId) {
                        this.UniId = config.UniId;
                        this.listenAppEvent("modal-close", this.UniId, () => {
                            this.close();
                        })
                    }
                    if (config.DomObj) {
                        this.DomObj = config.DomObj;
                    }
                    if (config.Width) {
                        this.Width = config.Width;
                    }
                    if (config.Zindex) {
                        this.Zindex = config.Zindex;
                    }
                }
            }
        }

        public open() {

            this.IsModalShow = true;
            if (this.ModalShowFun) {
                this.ModalShowFun(this, () => {
                    if (!this.IsNoFirst) this.IsNoFirst = true;
                    this.forceUpdate("", () => {
                        if ($(".md-show").length > 0) {
                            $("body").addClass("Hf-overflow ");
                        } else {
                            $("body").removeClass("Hf-overflow ");
                        }
                    });
                });
            } else {
                if (!this.IsNoFirst) this.IsNoFirst = true;
                this.forceUpdate("", () => {
                    if ($(".md-show").length > 0) {
                        $("body").addClass("Hf-overflow ");
                    } else {
                        $("body").removeClass("Hf-overflow ");
                    }
                });
            }

        }
        public close() {
            // this.listenAppEvent("ModalDom-close", this.UniId);
            this.IsModalShow = false;
            if (this.ModalCloseFun) {
                this.ModalCloseFun(this, () => {

                });
            }
            this.DomObj = null;
            this.forceUpdate("", () => {
                if ($(".ACT-HAS-MPDAL").length > 0) {
                    $("body").addClass("Hf-overflow ");
                } else {
                    $("body").removeClass("Hf-overflow ");
                }
                this.IsChange = true;
            });
        }

    }
    export class ModalDomStates extends domCore.DomStates {
    }


    export class ModalDomProps extends domCore.DomProps<IReactModalDomVm>{
    }



}


