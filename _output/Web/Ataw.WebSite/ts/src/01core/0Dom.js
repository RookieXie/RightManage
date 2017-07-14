define(["require", "exports", "react", "react-dom", "./Event"], function (require, exports, React, ReactDOM, eventFile) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //import jqueryExtend = require("./JQueryExtend");
    var Core;
    (function (Core) {
        class DomReact extends React.Component {
            constructor() {
                super(...arguments);
                this.fIsNoChangeSign = false;
                this.pNoNeedUpdate = false;
                this.IsFirst = false;
                this.pIsSetScreenHeight = false;
                this.pIsSetScreenMaxHeight = false;
                this.ScreenDomName = "";
                this.IsListItem = false;
                this.pReactEventDict = {};
            }
            //  public setIsLis
            vM() {
                return this.props.Vm;
            }
            listenEvent(event, fun) {
                var _fun = this.props.Vm.getEmit("React").addListener(event, fun);
                if (this.pReactEventDict[event]) {
                    this.pReactEventDict[event].push(_fun);
                }
                else {
                    this.pReactEventDict[event] = [_fun];
                }
            }
            removeEvent(event) {
                if (event || event != "") {
                    if (this.pReactEventDict[event] && this.pReactEventDict[event].length > 0) {
                        this.pReactEventDict[event].forEach((f) => {
                            this.props.Vm.getEmit("React").removeListener(event, f);
                        });
                        this.pReactEventDict[event] = null;
                    }
                }
                else {
                    for (let name in this.pReactEventDict) {
                        if (this.pReactEventDict[name]) {
                            var _events = this.pReactEventDict[name];
                            _events.forEach((f) => {
                                this.props.Vm.getEmit("React").removeListener(name, f);
                            });
                        }
                        this.pReactEventDict[name] = null;
                    }
                    this.pReactEventDict = {};
                }
            }
            _T_(a, tplName) {
                if (tplName && tplName != "") {
                    if (this.props.Vm.TplFunDic && this.props.Vm.TplFunDic[tplName]) {
                        return this.props.Vm.TplFunDic[tplName](a, this.props.Vm);
                    }
                }
                else {
                    return a;
                }
            }
            _tDom(dom, config) {
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
            }
            setNoNeedUpdate(isNo) {
                this.pNoNeedUpdate = isNo;
            }
            componentWillMount() {
                this.pComponentWillMount();
            }
            ;
            componentWillUnmount() {
                this.pComponentWillUnmount();
            }
            ;
            componentDidMount() {
                this.pComponentDidMount();
                this.IsFirst = true;
            }
            ;
            pInstall() {
                //   if (this.props.Vm.getRegName() == "pick") debugger;
                this.fEventFun = this.props.Vm.onChangeHandle((val, callback) => {
                    this.pFunForceUpdate(callback);
                    return true;
                });
                this.listenEvent("setChange", (a) => {
                    //  this.props.Vm.IsChange = a;
                    this.fIsNoChangeSign = !a;
                });
            }
            ;
            pUnInstall(vm) {
                // this.removeEvent();
                if (vm) {
                    //这样是不行的 没准这个对象还有用呢
                    // vm.getEmit("React").removeAllListeners();
                    this.removeEvent();
                    vm.getEmit("React").removeListener(DomVm.fEVENT_CHANGE, this.fEventFun);
                    vm.getEmit("React").removeAllListeners();
                    if (!vm.IsListItem) {
                        vm.dispose();
                    }
                }
                else {
                    // this.props.Vm.getEmit("React").removeAllListeners();
                    // this.props.Vm.dispose();
                }
            }
            ;
            componentDidUpdate(prevProps, prevState, prevContext) {
                this.pComponentDidUpdate(prevProps, prevState, prevContext);
            }
            pComponentDidUpdate(prevProps, prevState, prevContext) {
                //更新后的
                if (!(prevProps.Vm === this.props.Vm)) {
                    this.pUnInstall(prevProps.Vm);
                    this.pInstall();
                    this.pDomLoad();
                    console.log(this.props.Vm.getRegName() + "重新注册");
                }
            }
            pFunForceUpdate(callback) {
                console.log(this.props.Vm.getRegName() + "调用update");
                this.forceUpdate(callback);
            }
            ;
            shouldComponentUpdate(nextProps, nextState, nextContext) {
                // if (nextProps.Vm["Text"] == "郑瑜琨") debugger;
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
                // return true;
            }
            pDomLoad() {
            }
            pDispatcher(action) {
                //if (this.fDomDispatcher == null) {
                //    this.fDomDispatcher = AkDispatcher.Current();
                //}
                //action.Vm = this.props.Vm;
                //this.fDomDispatcher.dispatch(action);
                // utilFile.Core.Util.
            }
            ;
            pComponentWillMount() {
                this.pInstall();
                //  var __this = this;
                console.log(this.props.Vm.getRegName() + "注册");
            }
            ;
            pComponentWillUnmount() {
                // this.props.Vm.offEvent_ChangeEmit(this.fEventFun);
                this.pUnInstall();
            }
            ;
            pComponentDidMount() {
                //this.props.Vm.offEvent_ChangeEmit(this.fEventFun);
                this.pDomLoad();
                var _msd = this.props.Vm.MetaShowData;
                // if (!_msd) _msd = {Name : this.props.Vm.getRegName()};
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
                                            _msd.List.forEach((l) => {
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
            }
            ;
            pSender() {
                return React.DOM.div(null, this.props.Vm.getRegName());
            }
            ;
            pGetErrorName() {
                return "【dom】 【" + this.props.Vm.getRegName() + "】 【" + this.props.Vm.Id + "】";
            }
            pGetDom() {
                try {
                    var _dom = ReactDOM.findDOMNode(this);
                    return _dom;
                }
                catch (exxx) {
                    return null;
                }
            }
            render() {
                //$["r"]["pasend"] = this.props;
                //   AkDispatcher.SendCount++;
                // 
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
                        //  console.info(res);
                        return res;
                    }
                }
                catch (ee) {
                    console.warn("组件异常：");
                    console.warn(this);
                    console.warn(ee);
                    // console.info(this);
                    //  alert();
                    var str = this.pGetErrorName() + "   " + ee.toString();
                    return React.DOM.span({ title: str, className: " fa fa-exclamation-triangle Hs-red " });
                }
            }
        }
        Core.DomReact = DomReact;
        class DomVm {
            constructor() {
                this.IsChange = true;
                this.fNoFirst = false;
                this.fOriValue = "";
                this.Id = "";
                this.Error = "";
                this.NoNeedUpdate = false;
                this.AppEventFunDic = {};
                this.IsDisposeAll = true;
                this.ffHasDispose = false;
                //是否是集合元素
                this.IsListItem = false;
                this.Height = 0;
                // public $DomList: Array<React.Component<any, any>>;
                ///组件只读调用
                this.pDataValue = "";
                this.getRegName = function () {
                    //$["r"]["pgetregname"] = this;
                    return this.pRegName;
                };
                this.fEventBus = new eventFile.Core.EventBus();
            }
            getOriValue() {
                return this.fOriValue;
            }
            toChange() {
                this.IsChange = true;
            }
            RegistAppEvent(regData) {
                this.listenAppEvent(regData.Name, this.UniId, regData.Fun);
            }
            pRegistAppEventByDom(regData) {
                // this.RegistAppEvent(regData);
                if (regData.DomObj.UniId == this.UniId) {
                    regData.DomObj.RegistAppEvent(regData);
                }
                else {
                    alert("由于组件的unid不一致 ，导致无法注册 " + regData.Name + "  事件 ");
                }
            }
            onCustomEvent(fun, sender) {
                this.pRegistAppEventByDom({ DomObj: sender, Fun: fun, Name: "123" });
            }
            listenAppEvent(name, uniId, fun) {
                var _fun = eventFile.App.GetAppEvent().addListener(name + uniId, fun);
                this.AppEventFunDic[name + uniId] = _fun;
                //eventFile.App.GetAppEvent().removeListener(name + uniId, fun);
            }
            emitAppEvent(name, sign, ...args) {
                eventFile.App.GetAppEvent().emit(name + sign, ...args);
            }
            getCache(key, setFun) {
                if (!this["__vmCache_" + key]) {
                    this["__vmCache_" + key] = setFun();
                }
                var _t = this["__vmCache_" + key];
                return _t;
            }
            pGetEmit(name) {
                // if (this.fEmit == null) {
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
                //  }
                return this.fEmit;
            }
            getEmit(name) {
                return this.pGetEmit(name);
            }
            offEvent_ChangeEmit(fun) {
                //if (this.fEmit == null)
                //    this.fEmit = new EventEmitter2();
                this.pGetEmit("React").removeAllListeners(DomVm.fEVENT_CHANGE);
            }
            onChangeHandle(fun) {
                //if (this.fEmit == null)
                //    this.fEmit = new EventEmitter2();
                var __this = this;
                var _fun = function () {
                    fun.apply(__this, arguments);
                };
                return this.pGetEmit("React").addListener(DomVm.fEVENT_CHANGE, _fun);
                //  return _fun;
            }
            intoDom(key, ...children) {
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
            }
            intoDomR(reactType, key, childrenNode) {
                if (key) {
                    this.key = key;
                }
                return React.createElement(reactType, { Vm: this }, childrenNode);
            }
            // protected pDataValue: string;
            initDataValue(val) {
                this.TempDataValue = val;
                this.pDataValue = val;
            }
            pDataValueSet(val) {
                return this.fDataValueSet(val);
            }
            forceUpdate(val, callback) {
                this.IsChange = true;
                this.pGetEmit("React").emit(DomVm.fEVENT_CHANGE, val, callback);
            }
            //公共接口
            pDataValueGet() {
                return this.pDataValue;
            }
            pdataValue(val) {
                if (val === undefined) {
                    return this.pDataValueGet();
                }
                else {
                    this.pDataValueSet(val);
                    //return val;
                }
            }
            dataValue(val) {
                if (val === undefined) {
                    return this.dataValueGet();
                }
                else {
                    return this.dataValueSet(val);
                    //return val;
                }
            }
            setOriValue(val) {
                this.fOriValue = val;
                this.fDataValueSet(val);
            }
            fDataValueSet(val) {
                //if (!this.fNoFirst) {
                //    this.fOriValue = val;
                //    this.fNoFirst = true;
                //}
                if (val != this.pDataValue) {
                    var _isCheck = this.pOnchange(val);
                    if (_isCheck) {
                        //广播事件
                        this.pDataValue = val;
                        this.pGetEmit("React").emit(DomVm.fEVENT_CHANGE, val);
                    }
                    return _isCheck;
                }
                return false;
            }
            fDataValueGet() {
                return this.pDataValueGet();
            }
            vmdataValue(val) {
                if (val === undefined) {
                    return this.vmDataValueGet();
                }
                else {
                    return this.vmDataValueSet(val);
                    //return val;
                }
            }
            vmDataValueGet() {
                return this.fDataValueGet();
            }
            vmDataValueSet(val) {
                this.fDataValueSet(val);
            }
            dataValueGet() {
                return this.fDataValueGet();
            }
            dataValueSet(val) {
                this.fDataValueSet(val);
            }
            reactDataValueGet() {
                return this.fDataValueGet();
            }
            pOnchange(val) {
                //$["r"]["ppros"] = this;
                this.TempDataValue = val;
                var _isCheck = true;
                if (this.ChangeEventFun != null) {
                    _isCheck = this.ChangeEventFun(val, this);
                }
                return _isCheck;
            }
            //react 组件调用接口
            reactDataValueSet(val) {
                return this.fDataValueSet(val);
            }
            pDispose() {
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
                                    _gg.forEach((a) => {
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
            }
            dispose() {
                this.pDispose();
            }
        }
        DomVm.fEVENT_CHANGE = "event_change";
        Core.DomVm = DomVm;
        class DomProps {
            // 只是为了可以点出来  
            children() {
            }
        }
        Core.DomProps = DomProps;
        class DomStates {
        }
        Core.DomStates = DomStates;
        class DomAction {
        }
        Core.DomAction = DomAction;
    })(Core = exports.Core || (exports.Core = {}));
});
