"use strict";
var App = (function () {
    function App() {
    }
    App.getUniId = function () {
        this.fUniId++;
        return this.fUniId;
    };
    App.initAppEvent = function (event) {
        this.fAppEvent = event;
    };
    App.GetAppEvent = function () {
        if (!this.fAppEvent) {
            this.fAppEvent = new Core.EventBus().HookEvent;
        }
        return this.fAppEvent;
    };
    return App;
}());
App.fAppEvent = null;
App.fUniId = 0;
exports.App = App;
var Core;
(function (Core) {
    var EventBus = (function () {
        function EventBus() {
            this.fEmit = null;
            this.ReactEvent = new BaseEvent(this, "React");
            this.VmEvent = new BaseEvent(this, "Vm");
            this.HookEvent = new BaseEvent(this, "Hook");
            this.CustomEvent = new BaseEvent(this, "Custom");
        }
        EventBus.prototype.FetchEmit = function () {
            if (!this.fEmit) {
                this.fEmit = $({});
            }
            return this.fEmit;
        };
        EventBus.prototype.showAllEvent = function () {
            var _res = [];
            var _emit = this.fEmit;
            if (_emit) {
                var _rr = _emit[0];
                var _objs = [];
                for (var gg in _rr) {
                    _objs.push(gg);
                }
                if (_objs.length > 0) {
                    var _vv = _rr[_objs[0]];
                    var _eve = _vv.events;
                    for (var _e in _eve) {
                        _res.push({ EventName: _e, FunLength: _eve[_e].length, EventObj: _eve[_e] });
                    }
                }
                return _res;
            }
            return _res;
        };
        EventBus.prototype.RemoveReactEvent = function () {
        };
        return EventBus;
    }());
    Core.EventBus = EventBus;
    var BaseEvent = (function () {
        function BaseEvent(eventBus, name) {
            this.fEventBus = eventBus;
            this.fName = name;
        }
        BaseEvent.prototype.createName = function (name) {
            if (name) {
                return this.fName + "_" + name;
            }
            else
                return name;
        };
        BaseEvent.prototype.showAllEvent = function () {
            return this.fEventBus.showAllEvent();
        };
        BaseEvent.prototype.removeAllBusListeners = function () {
            this.fEventBus.FetchEmit().unbind();
        };
        BaseEvent.prototype.emit = function (event) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            event = this.createName(event);
            console.log("事件调用： " + event);
            console.log(args);
            this.fEventBus.FetchEmit().trigger(event, args);
            return true;
        };
        ;
        BaseEvent.prototype.removeAllListeners = function (event) {
            var _this = this;
            if (event) {
                event = this.createName(event);
                this.fEventBus.FetchEmit().unbind(event);
                return null;
            }
            else {
                var _events = this.fEventBus.showAllEvent();
                _events.forEach(function (n) {
                    if (n.EventName.length > _this.fName.length) {
                        if (n.EventName.substr(0, _this.fName.length) == _this.fName) {
                            _this.fEventBus.FetchEmit().unbind(n.EventName);
                        }
                    }
                });
                return this;
            }
        };
        ;
        BaseEvent.prototype.listeners = function (event) {
            event = this.createName(event);
            alert("该接口未实现");
            return [];
        };
        ;
        BaseEvent.prototype.removeListener = function (event, listener) {
            event = this.createName(event);
            var gg = listener;
            var f = gg;
            this.fEventBus.FetchEmit().unbind(event, f);
            return this;
        };
        ;
        BaseEvent.prototype.addListener = function (event, listener) {
            console.log("时间注册： " + event);
            event = this.createName(event);
            var gg = listener;
            var f = function (eventObject) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                listener.apply(void 0, args);
            };
            this.fEventBus.FetchEmit().bind(event, f);
            return f;
        };
        return BaseEvent;
    }());
    Core.BaseEvent = BaseEvent;
})(Core = exports.Core || (exports.Core = {}));
