/// <reference path="../../typings/eventemitter2/eventemitter2.d.ts" />
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class App {
        static getUniId() {
            this.fUniId++;
            return this.fUniId;
        }
        static initAppEvent(event) {
            this.fAppEvent = event;
        }
        static GetAppEvent() {
            if (!this.fAppEvent) {
                this.fAppEvent = new Core.EventBus().HookEvent;
            }
            return this.fAppEvent;
        }
    }
    App.fAppEvent = null;
    App.fUniId = 0;
    exports.App = App;
    var Core;
    (function (Core) {
        class EventBus {
            constructor() {
                this.fEmit = null;
                this.ReactEvent = new BaseEvent(this, "React");
                this.VmEvent = new BaseEvent(this, "Vm");
                this.HookEvent = new BaseEvent(this, "Hook");
                this.CustomEvent = new BaseEvent(this, "Custom");
            }
            FetchEmit() {
                if (!this.fEmit) {
                    this.fEmit = $({});
                    //this.fEmit.setMaxListeners(0);
                    // this.fEmit.
                }
                return this.fEmit;
            }
            showAllEvent() {
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
            }
            RemoveReactEvent() {
            }
        }
        Core.EventBus = EventBus;
        class BaseEvent {
            constructor(eventBus, name) {
                this.fEventBus = eventBus;
                this.fName = name;
            }
            createName(name) {
                if (name) {
                    return this.fName + "_" + name;
                }
                else
                    return name;
            }
            showAllEvent() {
                return this.fEventBus.showAllEvent();
            }
            removeAllBusListeners() {
                this.fEventBus.FetchEmit().unbind();
            }
            emit(event, ...args) {
                event = this.createName(event);
                console.log("事件调用： " + event);
                console.log(args);
                this.fEventBus.FetchEmit().trigger(event, args);
                return true;
            }
            ;
            removeAllListeners(event) {
                if (event) {
                    event = this.createName(event);
                    this.fEventBus.FetchEmit().unbind(event);
                    return null;
                }
                else {
                    var _events = this.fEventBus.showAllEvent();
                    _events.forEach((n) => {
                        if (n.EventName.length > this.fName.length) {
                            if (n.EventName.substr(0, this.fName.length) == this.fName) {
                                this.fEventBus.FetchEmit().unbind(n.EventName);
                            }
                        }
                    });
                    return this;
                }
            }
            ;
            //removeAllListeners(events: string[]): IEvent {
            //    return null;
            //};
            listeners(event) {
                event = this.createName(event);
                // return this.fEventBus.FetchEmit().
                alert("该接口未实现");
                return [];
            }
            ;
            removeListener(event, listener) {
                event = this.createName(event);
                var gg = listener;
                var f = gg;
                this.fEventBus.FetchEmit().unbind(event, f);
                return this;
            }
            ;
            addListener(event, listener) {
                console.log("时间注册： " + event);
                event = this.createName(event);
                var gg = listener;
                var f = (eventObject, ...args) => {
                    listener(...args);
                };
                this.fEventBus.FetchEmit().bind(event, f);
                return f;
            }
        }
        Core.BaseEvent = BaseEvent;
    })(Core = exports.Core || (exports.Core = {}));
});
