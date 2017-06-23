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
define(["require", "exports", "./../../01core/0Dom", "react"], function (require, exports, domFile, React) {
    "use strict";
    exports.__esModule = true;
    var domCore = domFile.Core;
    var ModalDom;
    (function (ModalDom) {
        var ModalDomAction = (function (_super) {
            __extends(ModalDomAction, _super);
            function ModalDomAction() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return ModalDomAction;
        }(domCore.DomAction));
        ModalDom.ModalDomAction = ModalDomAction;
        var ModalDomReact = (function (_super) {
            __extends(ModalDomReact, _super);
            function ModalDomReact() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.state = new ModalDomStates();
                return _this;
            }
            ModalDomReact.prototype.open_fun = function () {
                this.props.Vm.open();
            };
            ModalDomReact.prototype.close_fun = function () {
                this.props.Vm.close();
            };
            ModalDomReact.prototype.pSender = function () {
                var _this = this;
                return React.createElement("div", { className: "md-modal md-effect-10 " + (this.props.Vm.IsModalShow ? "md-show" : " hide"), id: "modal-10" },
                    React.createElement("div", { className: "md-content" },
                        React.createElement("div", { className: "md-nav" },
                            this.props.Vm.Title ? React.createElement("h3", { className: "" }, this.props.Vm.Title) : null,
                            React.createElement("a", { className: "", onClick: function () { _this.close_fun(); } },
                                React.createElement("i", { className: "icon-remove" }, "Close me!"))),
                        React.createElement("div", null,
                            React.createElement("div", { className: "content" }, this._tDom(this.props.Vm.DomObj, { nullNode: React.createElement("span", null,
                                    " ",
                                    React.createElement("i", { className: "" }),
                                    "\u7B49\u5F85\u8F7D\u5165\u5185\u5BB9") })))));
            };
            ModalDomReact.prototype.pComponentDidMount = function () {
                var _this = this;
                _super.prototype.pComponentDidMount.call(this);
                if ($(".md-show").length > 0) {
                    $("body").addClass("Hf-overflow ");
                }
                $(window).resize(function () {
                    _this.setWidth();
                });
                this.setWidth();
            };
            ModalDomReact.prototype.setWidth = function () {
                var _dom = this.pGetDom();
                if (_dom) {
                    var _$dom = $(_dom).find(".ACT-MODAL-CONTENT");
                    // _$dom.children(".Hc-modals-list").height($(window).height() - 60 - 30 - 30);
                    // _$dom.children(".Hc-modals-list").addClass("Hg-overflow-auto");
                    _$dom.css("height", ($(window).height() - 60 - 30 - 30 - 20) * 0.95 + "px").addClass("Hz-scroll Hg-overflow-auto");
                }
            };
            ModalDomReact.prototype.pInstall = function () {
                _super.prototype.pInstall.call(this);
                if (this.props.Vm.IsModalShow) {
                    if ($(".md-show").length > 0) {
                        $("body").addClass("Hf-overflow ");
                    }
                    else {
                        // $("body").addClass("Hf-overflow ");
                    }
                }
            };
            return ModalDomReact;
        }(domCore.DomReact));
        ModalDom.ModalDomReact = ModalDomReact;
        var ModalDomVm = (function (_super) {
            __extends(ModalDomVm, _super);
            function ModalDomVm(config) {
                var _this = _super.call(this) || this;
                _this.ReactType = ModalDomReact;
                _this.ModalTop = 0;
                _this.IsNoFirst = false;
                _this.IsDebug = false;
                _this.IsMulit = true;
                if (config) {
                    if (config) {
                        if (config.IsModalShow) {
                            _this.IsModalShow = config.IsModalShow;
                        }
                        if (config.ModalTop) {
                            _this.ModalTop = config.ModalTop;
                        }
                        if (config.Title) {
                            _this.Title = config.Title;
                        }
                        if (config.ModalShowingFun) {
                            _this.ModalShowFun = config.ModalShowingFun;
                        }
                        if (config.ModalCloseFun) {
                            _this.ModalCloseFun = config.ModalCloseFun;
                        }
                        if (config.IsDebug) {
                            _this.IsDebug = config.IsDebug;
                        }
                        if (config.ClassName) {
                            _this.ClassName = config.ClassName;
                        }
                        if (config.UniId) {
                            _this.UniId = config.UniId;
                            _this.listenAppEvent("modal-close", _this.UniId, function () {
                                _this.close();
                            });
                        }
                        if (config.DomObj) {
                            _this.DomObj = config.DomObj;
                        }
                        if (config.Width) {
                            _this.Width = config.Width;
                        }
                        if (config.Zindex) {
                            _this.Zindex = config.Zindex;
                        }
                    }
                }
                return _this;
            }
            ModalDomVm.prototype.open = function () {
                var _this = this;
                this.IsModalShow = true;
                if (this.ModalShowFun) {
                    this.ModalShowFun(this, function () {
                        if (!_this.IsNoFirst)
                            _this.IsNoFirst = true;
                        _this.forceUpdate("", function () {
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
                    this.forceUpdate("", function () {
                        if ($(".md-show").length > 0) {
                            $("body").addClass("Hf-overflow ");
                        }
                        else {
                            $("body").removeClass("Hf-overflow ");
                        }
                    });
                }
            };
            ModalDomVm.prototype.close = function () {
                var _this = this;
                // this.listenAppEvent("ModalDom-close", this.UniId);
                this.IsModalShow = false;
                if (this.ModalCloseFun) {
                    this.ModalCloseFun(this, function () {
                    });
                }
                this.DomObj = null;
                this.forceUpdate("", function () {
                    if ($(".ACT-HAS-MPDAL").length > 0) {
                        $("body").addClass("Hf-overflow ");
                    }
                    else {
                        $("body").removeClass("Hf-overflow ");
                    }
                    _this.IsChange = true;
                });
            };
            return ModalDomVm;
        }(domCore.DomVm));
        ModalDom.ModalDomVm = ModalDomVm;
        var ModalDomStates = (function (_super) {
            __extends(ModalDomStates, _super);
            function ModalDomStates() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return ModalDomStates;
        }(domCore.DomStates));
        ModalDom.ModalDomStates = ModalDomStates;
        var ModalDomProps = (function (_super) {
            __extends(ModalDomProps, _super);
            function ModalDomProps() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return ModalDomProps;
        }(domCore.DomProps));
        ModalDom.ModalDomProps = ModalDomProps;
    })(ModalDom = exports.ModalDom || (exports.ModalDom = {}));
});
