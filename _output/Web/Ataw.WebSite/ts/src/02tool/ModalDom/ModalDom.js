define(["require", "exports", "./../../01core/0Dom", "react"], function (require, exports, domFile, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var domCore = domFile.Core;
    var ModalDom;
    (function (ModalDom) {
        class ModalDomAction extends domCore.DomAction {
        }
        ModalDom.ModalDomAction = ModalDomAction;
        class ModalDomReact extends domCore.DomReact {
            constructor() {
                super(...arguments);
                this.state = new ModalDomStates();
            }
            open_fun() {
                this.props.Vm.open();
            }
            close_fun() {
                this.props.Vm.close();
            }
            pSender() {
                return React.createElement("div", { className: "md-modal md-effect-10 " + (this.props.Vm.IsModalShow ? "md-show" : " hide"), id: "modal-10" },
                    React.createElement("div", { className: "md-content" },
                        React.createElement("div", { className: "md-nav" },
                            this.props.Vm.Title ? React.createElement("h3", { className: "" }, this.props.Vm.Title) : null,
                            React.createElement("a", { className: "", onClick: () => { this.close_fun(); } },
                                React.createElement("i", { className: "icon-remove" }, "Close me!"))),
                        React.createElement("div", null,
                            React.createElement("div", { className: "content" }, this._tDom(this.props.Vm.DomObj, { nullNode: React.createElement("span", null,
                                    " ",
                                    React.createElement("i", { className: "" }),
                                    "\u7B49\u5F85\u8F7D\u5165\u5185\u5BB9") })))));
            }
            pComponentDidMount() {
                super.pComponentDidMount();
                if ($(".md-show").length > 0) {
                    $("body").addClass("Hf-overflow ");
                }
                $(window).resize(() => {
                    this.setWidth();
                });
                this.setWidth();
            }
            setWidth() {
                var _dom = this.pGetDom();
                if (_dom) {
                    var _$dom = $(_dom).find(".ACT-MODAL-CONTENT");
                    // _$dom.children(".Hc-modals-list").height($(window).height() - 60 - 30 - 30);
                    // _$dom.children(".Hc-modals-list").addClass("Hg-overflow-auto");
                    _$dom.css("height", ($(window).height() - 60 - 30 - 30 - 20) * 0.95 + "px").addClass("Hz-scroll Hg-overflow-auto");
                }
            }
            pInstall() {
                super.pInstall();
                if (this.props.Vm.IsModalShow) {
                    if ($(".md-show").length > 0) {
                        $("body").addClass("Hf-overflow ");
                    }
                    else {
                        // $("body").addClass("Hf-overflow ");
                    }
                }
            }
        }
        ModalDom.ModalDomReact = ModalDomReact;
        class ModalDomVm extends domCore.DomVm {
            constructor(config) {
                super();
                this.ReactType = ModalDomReact;
                this.ModalTop = 0;
                this.IsNoFirst = false;
                this.IsDebug = false;
                this.IsMulit = true;
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
                            });
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
            open() {
                this.IsModalShow = true;
                if (this.ModalShowFun) {
                    this.ModalShowFun(this, () => {
                        if (!this.IsNoFirst)
                            this.IsNoFirst = true;
                        this.forceUpdate("", () => {
                            if ($(".md-show").length > 0) {
                                $("body").addClass("Hf-overflow ");
                            }
                            else {
                                $("body").removeClass("Hf-overflow ");
                            }
                        });
                    });
                }
                else {
                    if (!this.IsNoFirst)
                        this.IsNoFirst = true;
                    this.forceUpdate("", () => {
                        if ($(".md-show").length > 0) {
                            $("body").addClass("Hf-overflow ");
                        }
                        else {
                            $("body").removeClass("Hf-overflow ");
                        }
                    });
                }
            }
            close() {
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
                    }
                    else {
                        $("body").removeClass("Hf-overflow ");
                    }
                    this.IsChange = true;
                });
            }
        }
        ModalDom.ModalDomVm = ModalDomVm;
        class ModalDomStates extends domCore.DomStates {
        }
        ModalDom.ModalDomStates = ModalDomStates;
        class ModalDomProps extends domCore.DomProps {
        }
        ModalDom.ModalDomProps = ModalDomProps;
    })(ModalDom = exports.ModalDom || (exports.ModalDom = {}));
});
