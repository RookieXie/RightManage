"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var ReactDOM = require("react-dom");
var eventFile = require("./Event");
var Core;
(function (Core) {
    var DomReact = (function (_super) {
        __extends(DomReact, _super);
        function DomReact() {
            var _this = _super.apply(this, arguments) || this;
            _this.fIsNoChangeSign = false;
            _this.pNoNeedUpdate = false;
            _this.IsFirst = false;
            _this.pIsSetScreenHeight = false;
            _this.pIsSetScreenMaxHeight = false;
            _this.ScreenDomName = "";
            _this.IsListItem = false;
            _this.pReactEventDict = {};
            return _this;
        }
        DomReact.prototype.vM = function () {
            return this.props.Vm;
        };
        DomReact.prototype.listenEvent = function (event, fun) {
            var _fun = this.props.Vm.getEmit("React").addListener(event, fun);
            if (this.pReactEventDict[event]) {
                this.pReactEventDict[event].push(_fun);
            }
            else {
                this.pReactEventDict[event] = [_fun];
            }
        };
        DomReact.prototype.removeEvent = function (event) {
            var _this = this;
            if (event || event != "") {
                if (this.pReactEventDict[event] && this.pReactEventDict[event].length > 0) {
                    this.pReactEventDict[event].forEach(function (f) {
                        _this.props.Vm.getEmit("React").removeListener(event, f);
                    });
                    this.pReactEventDict[event] = null;
                }
            }
            else {
                var _loop_1 = function (name_1) {
                    if (this_1.pReactEventDict[name_1]) {
                        _events = this_1.pReactEventDict[name_1];
                        _events.forEach(function (f) {
                            _this.props.Vm.getEmit("React").removeListener(name_1, f);
                        });
                    }
                    this_1.pReactEventDict[name_1] = null;
                };
                var this_1 = this, _events;
                for (var name_1 in this.pReactEventDict) {
                    _loop_1(name_1);
                }
                this.pReactEventDict = {};
            }
        };
        DomReact.prototype._T_ = function (a, tplName) {
            if (tplName && tplName != "") {
                if (this.props.Vm.TplFunDic && this.props.Vm.TplFunDic[tplName]) {
                    return this.props.Vm.TplFunDic[tplName](a, this.props.Vm);
                }
            }
            else {
                return a;
            }
        };
        DomReact.prototype._tDom = function (dom, config) {
            if (config && config.fun) {
                return config.fun(dom);
            }
            else {
                if (dom) {
                    return dom.intoDom();
                }
                else {
                    if (config) {
                        if (config.nullNode) {
                            return config.nullNode;
                        }
                        else {
                            return null;
                        }
                    }
                }
            }
        };
        DomReact.prototype.setNoNeedUpdate = function (isNo) {
            this.pNoNeedUpdate = isNo;
        };
        DomReact.prototype.componentWillMount = function () {
            this.pComponentWillMount();
        };
        ;
        DomReact.prototype.componentWillUnmount = function () {
            this.pComponentWillUnmount();
        };
        ;
        DomReact.prototype.componentDidMount = function () {
            this.pComponentDidMount();
            this.IsFirst = true;
        };
        ;
        DomReact.prototype.pInstall = function () {
            var _this = this;
            this.fEventFun = this.props.Vm.onChangeHandle(function (val, callback) {
                _this.pFunForceUpdate(callback);
                return true;
            });
            this.listenEvent("setChange", function (a) {
                _this.fIsNoChangeSign = !a;
            });
        };
        ;
        DomReact.prototype.pUnInstall = function (vm) {
            if (vm) {
                this.removeEvent();
                vm.getEmit("React").removeListener(DomVm.fEVENT_CHANGE, this.fEventFun);
                vm.getEmit("React").removeAllListeners();
                if (!vm.IsListItem) {
                    vm.dispose();
                }
            }
            else {
            }
        };
        ;
        DomReact.prototype.componentDidUpdate = function (prevProps, prevState, prevContext) {
            this.pComponentDidUpdate(prevProps, prevState, prevContext);
        };
        DomReact.prototype.pComponentDidUpdate = function (prevProps, prevState, prevContext) {
            if (!(prevProps.Vm === this.props.Vm)) {
                this.pUnInstall(prevProps.Vm);
                this.pInstall();
                this.pDomLoad();
                console.log(this.props.Vm.getRegName() + "重新注册");
            }
        };
        DomReact.prototype.pFunForceUpdate = function (callback) {
            console.log(this.props.Vm.getRegName() + "调用update");
            this.forceUpdate(callback);
        };
        ;
        DomReact.prototype.shouldComponentUpdate = function (nextProps, nextState, nextContext) {
            console.log(this.props.Vm.getRegName() + "  判断是否更新" + this.props.Vm.IsChange);
            if (!nextProps.Vm.IsMulit) {
                if (!nextProps.Vm.NoNeedUpdate && !this.pNoNeedUpdate && nextProps.Vm.IsChange) {
                    nextProps.Vm.IsChange = false;
                    return true;
                }
                else
                    return false;
            }
            else {
                return true;
            }
        };
        DomReact.prototype.pDomLoad = function () {
        };
        DomReact.prototype.pDispatcher = function (action) {
        };
        ;
        DomReact.prototype.pComponentWillMount = function () {
            this.pInstall();
            console.log(this.props.Vm.getRegName() + "注册");
        };
        ;
        DomReact.prototype.pComponentWillUnmount = function () {
            this.pUnInstall();
        };
        ;
        DomReact.prototype.pComponentDidMount = function () {
            this.pDomLoad();
            var _msd = this.props.Vm.MetaShowData;
            if (_msd) {
                var _dom = ReactDOM.findDOMNode(this);
                if (_dom) {
                    var _$dom = $(_dom);
                    if (_$dom) {
                        _$dom.on("mousedown", function (event) {
                            if (event["which"] == 3) {
                                event.stopPropagation();
                                var _$t = $(this);
                                if (!_$t.hasClass("acs-module-warning")) {
                                    $(this).addClass("acs-module-warning");
                                    var _lis = "";
                                    if (_msd.List) {
                                        _msd.List.forEach(function (l) {
                                            _lis += ("<li>" + l + "</li>");
                                        });
                                    }
                                    var _$p = $("<div class='acs-module-warninHg-content'><h5>"
                                        + _msd.Name + "</h5><div>"
                                        + (_msd.Content ? _msd.Content : "未知组件") + "</div><ul class='list'>"
                                        + _lis + "</ul></div>");
                                    $("body").append(_$p);
                                    _$p.css({ top: event.clientY, left: event.clientX });
                                    _$t.data("div", _$p);
                                }
                                else {
                                    _$t.removeClass("acs-module-warning");
                                    _$t.data("div").remove();
                                }
                                return false;
                            }
                        });
                    }
                }
            }
            if (this.props.Vm.Height == 0) {
                if (this.pIsSetScreenHeight) {
                    var _dom = ReactDOM.findDOMNode(this);
                    if (_dom) {
                        var _$dom = $(_dom);
                        if (this.ScreenDomName && this.ScreenDomName != "") {
                            var _$dom = _$dom.find(this.ScreenDomName);
                        }
                        _$dom.height($(window).height() - 60 - 30 - 30 - 47);
                    }
                }
                if (this.pIsSetScreenMaxHeight) {
                    var _dom = ReactDOM.findDOMNode(this);
                    if (_dom) {
                        var _$dom = $(_dom);
                        if (this.ScreenDomName && this.ScreenDomName != "") {
                            var _$dom = _$dom.find(this.ScreenDomName);
                        }
                        _$dom.css("max-height", $(window).height() - 60 - 30 - 30 - 47);
                    }
                }
            }
            else {
                var _dom = ReactDOM.findDOMNode(this);
                if (_dom) {
                    var _$dom = $(_dom);
                    if (this.ScreenDomName && this.ScreenDomName != "") {
                        var _$dom = _$dom.find(this.ScreenDomName);
                    }
                    _$dom.height(this.props.Vm.Height);
                }
            }
        };
        ;
        DomReact.prototype.pSender = function () {
            return React.DOM.div(null, this.props.Vm.getRegName());
        };
        ;
        DomReact.prototype.pGetErrorName = function () {
            return "【dom】 【" + this.props.Vm.getRegName() + "】 【" + this.props.Vm.Id + "】";
        };
        DomReact.prototype.pGetDom = function () {
            try {
                var _dom = ReactDOM.findDOMNode(this);
                return _dom;
            }
            catch (exxx) {
                return null;
            }
        };
        DomReact.prototype.render = function () {
            console.log("【dom】：" + this.props.Vm.getRegName() + "  更新" + new Date().toLocaleTimeString());
            try {
                if (this.props.Vm.Error != "") {
                    var _str = this.props.Vm.Error;
                    this.props.Vm.Error = "";
                    throw _str;
                }
                if (this.props.Vm.CustomRenderFun) {
                    return this.props.Vm.CustomRenderFun(this.props.Vm);
                }
                else {
                    var res = this.pSender();
                    return res;
                }
            }
            catch (ee) {
                console.warn("组件异常：");
                console.warn(this);
                console.warn(ee);
                var str = this.pGetErrorName() + "   " + ee.toString();
                return React.DOM.span({ title: str, className: " fa fa-exclamation-triangle Hs-red " });
            }
        };
        return DomReact;
    }(React.Component));
    Core.DomReact = DomReact;
    var DomVm = (function () {
        function DomVm() {
            this.IsChange = true;
            this.fNoFirst = false;
            this.fOriValue = "";
            this.Id = "";
            this.Error = "";
            this.NoNeedUpdate = false;
            this.AppEventFunDic = {};
            this.IsDisposeAll = true;
            this.ffHasDispose = false;
            this.IsListItem = false;
            this.Height = 0;
            this.pDataValue = "";
            this.getRegName = function () {
                return this.pRegName;
            };
            this.fEventBus = new eventFile.Core.EventBus();
        }
        DomVm.prototype.getOriValue = function () {
            return this.fOriValue;
        };
        DomVm.prototype.toChange = function () {
            this.IsChange = true;
        };
        DomVm.prototype.RegistAppEvent = function (regData) {
            this.listenAppEvent(regData.Name, this.UniId, regData.Fun);
        };
        DomVm.prototype.pRegistAppEventByDom = function (regData) {
            if (regData.DomObj.UniId == this.UniId) {
                regData.DomObj.RegistAppEvent(regData);
            }
            else {
                alert("由于组件的unid不一致 ，导致无法注册 " + regData.Name + "  事件 ");
            }
        };
        DomVm.prototype.onCustomEvent = function (fun, sender) {
            this.pRegistAppEventByDom({ DomObj: sender, Fun: fun, Name: "123" });
        };
        DomVm.prototype.listenAppEvent = function (name, uniId, fun) {
            var _fun = eventFile.App.GetAppEvent().addListener(name + uniId, fun);
            this.AppEventFunDic[name + uniId] = _fun;
        };
        DomVm.prototype.emitAppEvent = function (name, sign) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            (_a = eventFile.App.GetAppEvent()).emit.apply(_a, [name + sign].concat(args));
            var _a;
        };
        DomVm.prototype.getCache = function (key, setFun) {
            if (!this["__vmCache_" + key]) {
                this["__vmCache_" + key] = setFun();
            }
            var _t = this["__vmCache_" + key];
            return _t;
        };
        DomVm.prototype.pGetEmit = function (name) {
            if (this.fEventBus == null) {
                this.fEventBus = new eventFile.Core.EventBus();
            }
            switch (name) {
                case "Custom":
                    this.fEmit = this.fEventBus.CustomEvent;
                    break;
                case "Hook":
                    this.fEmit = this.fEventBus.HookEvent;
                    break;
                case "React":
                    this.fEmit = this.fEventBus.ReactEvent;
                    break;
                case "Vm":
                default:
                    this.fEmit = this.fEventBus.VmEvent;
            }
            return this.fEmit;
        };
        DomVm.prototype.getEmit = function (name) {
            return this.pGetEmit(name);
        };
        DomVm.prototype.offEvent_ChangeEmit = function (fun) {
            this.pGetEmit("React").removeAllListeners(DomVm.fEVENT_CHANGE);
        };
        DomVm.prototype.onChangeHandle = function (fun) {
            var __this = this;
            var _fun = function () {
                fun.apply(__this, arguments);
            };
            return this.pGetEmit("React").addListener(DomVm.fEVENT_CHANGE, _fun);
        };
        DomVm.prototype.intoDom = function (key) {
            var children = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                children[_i - 1] = arguments[_i];
            }
            if (this) {
                if (key || key === 0) {
                    this.key = key;
                    return React.createElement(this.ReactType, { Vm: this, key: key }, children);
                }
                else {
                    return React.createElement(this.ReactType, { Vm: this }, children);
                }
            }
            else {
                return React.DOM.span({ className: "fa fa-exclamation-triangle" }, "（空的元素）");
            }
        };
        DomVm.prototype.intoDomR = function (reactType, key, childrenNode) {
            if (key) {
                this.key = key;
            }
            return React.createElement(reactType, { Vm: this }, childrenNode);
        };
        DomVm.prototype.initDataValue = function (val) {
            this.TempDataValue = val;
            this.pDataValue = val;
        };
        DomVm.prototype.pDataValueSet = function (val) {
            return this.fDataValueSet(val);
        };
        DomVm.prototype.forceUpdate = function (val, callback) {
            this.IsChange = true;
            this.pGetEmit("React").emit(DomVm.fEVENT_CHANGE, val, callback);
        };
        DomVm.prototype.pDataValueGet = function () {
            return this.pDataValue;
        };
        DomVm.prototype.pdataValue = function (val) {
            if (val === undefined) {
                return this.pDataValueGet();
            }
            else {
                this.pDataValueSet(val);
            }
        };
        DomVm.prototype.dataValue = function (val) {
            if (val === undefined) {
                return this.dataValueGet();
            }
            else {
                return this.dataValueSet(val);
            }
        };
        DomVm.prototype.setOriValue = function (val) {
            this.fOriValue = val;
            this.fDataValueSet(val);
        };
        DomVm.prototype.fDataValueSet = function (val) {
            if (val != this.pDataValue) {
                var _isCheck = this.pOnchange(val);
                if (_isCheck) {
                    this.pDataValue = val;
                    this.pGetEmit("React").emit(DomVm.fEVENT_CHANGE, val);
                }
                return _isCheck;
            }
            return false;
        };
        DomVm.prototype.fDataValueGet = function () {
            return this.pDataValueGet();
        };
        DomVm.prototype.vmdataValue = function (val) {
            if (val === undefined) {
                return this.vmDataValueGet();
            }
            else {
                return this.vmDataValueSet(val);
            }
        };
        DomVm.prototype.vmDataValueGet = function () {
            return this.fDataValueGet();
        };
        DomVm.prototype.vmDataValueSet = function (val) {
            this.fDataValueSet(val);
        };
        DomVm.prototype.dataValueGet = function () {
            return this.fDataValueGet();
        };
        DomVm.prototype.dataValueSet = function (val) {
            this.fDataValueSet(val);
        };
        DomVm.prototype.reactDataValueGet = function () {
            return this.fDataValueGet();
        };
        DomVm.prototype.pOnchange = function (val) {
            this.TempDataValue = val;
            var _isCheck = true;
            if (this.ChangeEventFun != null) {
                _isCheck = this.ChangeEventFun(val, this);
            }
            return _isCheck;
        };
        DomVm.prototype.reactDataValueSet = function (val) {
            return this.fDataValueSet(val);
        };
        DomVm.prototype.pDispose = function () {
            if (!this.ffHasDispose) {
                this.ffHasDispose = true;
                if (this.IsDisposeAll) {
                    for (var ns in this) {
                        var _p = this[ns];
                        if (_p && _p["dispose"] && $.isFunction(_p["dispose"])) {
                            _p["dispose"]();
                        }
                        else {
                            if ($.isArray(_p)) {
                                var _gg = _p;
                                _gg.forEach(function (a) {
                                    if (a && a["dispose"] && $.isFunction(a["dispose"])) {
                                        a["dispose"]();
                                    }
                                });
                            }
                        }
                    }
                }
                if (this.fEmit) {
                    this.fEmit.removeAllListeners();
                }
                if (this.AppEventFunDic) {
                    for (var n in this.AppEventFunDic) {
                        if (this.AppEventFunDic[n]) {
                            eventFile.App.GetAppEvent().removeListener(n, this.AppEventFunDic[n]);
                        }
                    }
                    this.AppEventFunDic = {};
                }
            }
        };
        DomVm.prototype.dispose = function () {
            this.pDispose();
        };
        return DomVm;
    }());
    DomVm.fEVENT_CHANGE = "event_change";
    Core.DomVm = DomVm;
    var DomProps = (function () {
        function DomProps() {
        }
        DomProps.prototype.children = function () {
        };
        return DomProps;
    }());
    Core.DomProps = DomProps;
    var DomStates = (function () {
        function DomStates() {
        }
        return DomStates;
    }());
    Core.DomStates = DomStates;
    var DomAction = (function () {
        function DomAction() {
        }
        return DomAction;
    }());
    Core.DomAction = DomAction;
})(Core = exports.Core || (exports.Core = {}));
