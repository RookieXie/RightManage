define(["require", "exports", "./Util", "./Event"], function (require, exports, urlFile, eventFile) {
    "use strict";
    exports.__esModule = true;
    var Util = urlFile.Core.Util;
    var Core;
    (function (Core) {
        $(function () {
            Util.AsyncJs([
                "/AtawStatic/lib/03Extend/bbq/jquery.ba-hashchange.min.js"
            ], function () {
                $(window).hashchange(function () {
                    var hash = location.hash;
                    // alert(1);
                    eventFile.App.GetAppEvent().emit("refeshMarksys");
                    // this.listenAppEvent("refeshMark"
                    //----------------
                    Core.AkUrl.Current().fEmit.emit("hashchange", hash);
                    //alert(hash);
                    // urlEvent(hash);
                });
            });
        });
        var JsActionType;
        (function (JsActionType) {
            JsActionType[JsActionType["Alert"] = 1] = "Alert";
            JsActionType[JsActionType["Reload"] = 2] = "Reload";
            JsActionType[JsActionType["Url"] = 3] = "Url";
            JsActionType[JsActionType["Object"] = 4] = "Object";
            JsActionType[JsActionType["Noty"] = 5] = "Noty";
            JsActionType[JsActionType["NoGotoUrl"] = 6] = "NoGotoUrl";
            JsActionType[JsActionType["JsonObject"] = 7] = "JsonObject";
            JsActionType[JsActionType["JsAjaxFun"] = 8] = "JsAjaxFun";
            JsActionType[JsActionType["Lock"] = 50] = "Lock";
            //1: "Alert",
            //2: "Reload",
            //3: "Url",
            //4: "Object",
            //5: "Noty",
            //6: "NoGotoUrl",
            //7: "JsonObject",
            //8: "JsAjaxFun"
        })(JsActionType = Core.JsActionType || (Core.JsActionType = {}));
        Core.ActionCommond = {
            Lock: function (res) {
                AkUrl.Current().openUrl("$WinAppLockPage$", false, { CanMenuUrl: true });
            },
            Alert: function (res) {
                Util.Noty(res.Content);
            },
            Reload: function (res) {
                window.location.reload();
                ;
            },
            Url: function (res) {
                window.location.href = res.Content;
            },
            Object: function (res, callback) {
                if (callback) {
                    if (res["BeginTime"] && res["EndTimer"]) {
                        var _begin = Date.parse(res["BeginTime"]);
                        var _end = Date.parse(res["EndTimer"]);
                        console.info("服务器响应时间  ： " + (_end - _begin));
                    }
                    callback(res.Obj);
                }
                return res.Obj;
            },
            Noty: function (res) {
                Util.Noty(res.Content);
                // alert(res.Content);
            },
            NoGotoUrl: function (res) {
                AkUrl.Current().openUrl(res.Content);
            },
            JsonObject: function (res, callback) {
                var _obj = $.parseJSON(res.Obj);
                if (callback) {
                    if (res["BeginTime"] && res["EndTimer"]) {
                        var _begin = Date.parse(res["BeginTime"]);
                        var _end = Date.parse(res["EndTimer"]);
                        console.info("服务器响应时间  ： " + (_end - _begin));
                    }
                    callback(_obj);
                }
                return _obj;
            },
            JsAjaxFun: function (aRR, obj_Fun) {
                //  $.HideAjax();
                Util.ToggleLoading(false);
                if (aRR.Content && aRR.Content != "") {
                    var _fun = $.AKjs.JsAjaxFun[aRR.Content];
                    if (_fun) {
                        var obj = aRR.Obj;
                        var _res = $.AKjs.JsAjaxFun[aRR.Content](obj);
                        if (_res) {
                            if (obj_Fun)
                                obj_Fun(_res);
                        }
                    }
                    else {
                        alert("找不到js函数 $.AKjs.JsAjaxFun." + aRR.Content);
                        throw "找不到js函数 $.AKjs.JsAjaxFun." + aRR.Content;
                    }
                }
                else {
                    alert("js函数 $.AKjs.JsAjaxFun.名不能为空吧！");
                    throw "js函数 $.AKjs.JsAjaxFun.名不能为空吧！";
                }
            }
        };
        function logTime(end, begin) {
            var _begin = begin;
            var _end = end;
            var _t = (_end - _begin);
            return _t;
        }
        Core.logTime = logTime;
        function getTimeNum(dateStr) {
            if (!dateStr || dateStr == "")
                return 0;
            var _strs = dateStr.split(".");
            var _num = Date.parse(_strs[0]);
            if (_strs.length > 1) {
                var _ss = _strs[1];
                if (_ss.length >= 3) {
                    _ss = _ss.substr(0, 3);
                }
                _num = _num + (parseInt(_ss));
            }
            return _num;
        }
        Core.getTimeNum = getTimeNum;
        function AkPost(url, data, callback, settings, $div, config) {
            // return null;
            // Util.Noty("请求");
            Util.ToggleLoading(true);
            var isLoading = true;
            if (settings)
                isLoading = settings["isLoading"];
            if (isLoading)
                Util.ToggleLoading(true);
            // alert();
            var _d0 = new Date();
            var d1 = 0;
            var d2 = 0;
            var d3 = 0;
            function opt(a) {
                var _opt = true;
                if (config) {
                    if (config.IsNoOpt) {
                        _opt = false;
                    }
                }
                if (_opt) {
                    var _d1 = new Date();
                    d1 = logTime(_d1, _d0);
                    console.info("网络响应总时间 : " + d1);
                    if (isLoading)
                        Util.ToggleLoading(true);
                    var _isJson = false;
                    try {
                        if (config && config.BeforeStringCallBackEvent) {
                            a = config.BeforeStringCallBackEvent(a);
                        }
                        var _obj = $.parseJSON(a);
                        _isJson = true;
                    }
                    catch (e) {
                        if ($div) {
                            $div.html(a);
                        }
                        else {
                            console.log(e);
                            console.log(a);
                            callback(a, e);
                        }
                    }
                    if (_isJson) {
                        var _ajaxRes = _obj;
                        if (_ajaxRes.AKJSRES == "AKJS") {
                            var _d00 = getTimeNum(_ajaxRes["BeginTime"]);
                            var _d11 = getTimeNum(_ajaxRes["EndTimer"]);
                            d2 = (_d11 - _d00);
                            console.info("服务器执行时间 : " + d2);
                            var _isCallback = true;
                            if (config && config.BeforeCallBackEvent) {
                                _isCallback = config.BeforeCallBackEvent(_ajaxRes);
                            }
                            if (_isCallback) {
                                Core.ActionCommond[_ajaxRes.ActionType](_ajaxRes, callback);
                            }
                            var _d3 = new Date();
                            d3 = logTime(_d3, _d0);
                            console.info(" 总时间 ：  " + d3);
                            $("#ACT-TIME").text(d2 + "<  " + (d1 - d2) + "<  " + logTime(_d3, _d1));
                        }
                        else {
                            callback(_obj);
                        }
                    }
                }
                else {
                    callback(a);
                }
                Util.ToggleLoading(false);
            }
            var _oop = $.extend({}, {
                //  isLoading:true,
                url: url,
                type: "POST",
                async: true,
                dataType: "text",
                data: data,
                error: function (a, b) {
                    // alert("错误");
                    opt(a.responseText);
                },
                complete: function () {
                    // Util.ToggleLoading(false);
                    if (isLoading)
                        Util.ToggleLoading(false);
                },
                success: function (a) {
                    opt(a);
                }
            }, settings);
            // $["jsonp"](_oop);
            return $.ajax(_oop);
        }
        Core.AkPost = AkPost;
        var AkUrl = (function () {
            function AkUrl() {
            }
            AkUrl.Current = function () {
                if (this.fAkUrl.fEmit == null) {
                    this.fAkUrl.fEmit = new EventEmitter2();
                }
                return this.fAkUrl;
            };
            AkUrl.Fetch = function () {
                return this.fAkUrl = new AkUrl();
            };
            AkUrl.prototype.refresh = function () {
                Core.AkUrl.Current().fEmit.emit("hashchange", location.hash);
            };
            AkUrl.prototype.getUrlCode = function (m) {
                if (m) {
                    return "$" + m.PanelName + m.ModuleName + "$" + m.Param1 + "$" + m.Param2 + "$" + m.Param3 + "$";
                }
                return "";
            };
            AkUrl.prototype.getPageUrlModel = function (a) {
                if (!a)
                    a = location.hash;
                var _strs = a.split("$");
                //  alert(_strs.length);
                if (_strs.length >= 2) {
                    var _moduleName = _strs[1];
                    var _param1 = _strs[2];
                    var _param2 = "";
                    if (_strs.length >= 3)
                        _param2 = _strs[3];
                    var _param3 = "";
                    if (_strs.length >= 3)
                        _param3 = _strs[4];
                    var _param = "";
                    //if (_name.indexOf("0") == 0) {
                    //    _param = "0";
                    //}
                    if (_moduleName == "")
                        _moduleName = "DEFAULT";
                    if (_moduleName == "0") {
                        _moduleName = "DEFAULT";
                        _param = "0";
                    }
                    var _name = _moduleName.toUpperCase();
                    var _isWin0 = false;
                    var _isWin = false;
                    var _isPanel = false;
                    if (_name.indexOf("WIN") == 0) {
                        _isWin = true;
                        if (_name.indexOf("WIN0") == 0) {
                            _name = _name.replace("WIN0", "");
                            _isWin0 = true;
                        }
                        else {
                            _name = _name.replace("WIN", "");
                        }
                    }
                    else {
                        if (_name.indexOf("PANEL") == 0) {
                            _isPanel = true;
                            _name = _name.replace("PANEL", "");
                        }
                    }
                    // this.ShowTip = "正在载入数据";
                    // var f: baseWedPage.Web.BaseWebPageVm = this.MainPageObj;
                    var _paneName = "";
                    if (_isWin) {
                        _paneName = "win";
                    }
                    else {
                        if (_isPanel) {
                            _paneName = "panel";
                        }
                    }
                    if (_moduleName == "DEFAULT" && _param1 && _param1.length > 4 && (_param1.lastIndexOf(".xml") == _param1.length - 4)) {
                        _param1 = _param1.replace(".xml", "");
                        // alert();
                    }
                    return {
                        PanelName: _paneName,
                        ModuleName: _name,
                        Param1: _param1,
                        Param2: _param2,
                        Param3: _param3
                    };
                }
                else {
                    return null;
                }
                //  return null;
            };
            AkUrl.prototype.SendToPage = function (config, obj) {
                Core.AkUrl.Current().fEmit.emit("sendtopage__" + config.ToPanelName, config, obj);
            };
            AkUrl.prototype.closePage = function (pageName) {
                Core.AkUrl.Current().fEmit.emit("closePage__" + pageName);
            };
            AkUrl.prototype.openUrlByNoMenu = function (url, name) {
                if (!name)
                    name = "$MENU$";
                var _isMenu = url.length >= name.length && url.toUpperCase().indexOf(name.toUpperCase()) == 0;
                this.openUrl(url, _isMenu, { CanMenuUrl: true });
            };
            AkUrl.prototype.openUrl = function (url, noUrl, urlConfig) {
                if (noUrl) {
                    console.info("url跳转到:  " + url);
                }
                var _fun = null;
                if (urlConfig && urlConfig.AfterFun) {
                    _fun = urlConfig.AfterFun;
                }
                if (urlConfig && urlConfig.noUrl) {
                    noUrl = true;
                }
                if (noUrl) {
                    Core.AkUrl.Current().fEmit.emit("hashchange", url, _fun, !(urlConfig && urlConfig.CanMenuUrl));
                }
                else {
                    if (location.hash == ("#" + url))
                        Core.AkUrl.Current().fEmit.emit("hashchange", "#" + url, _fun);
                    else {
                        if (!this.IsStartNoUrl(url, "$WIN") && !this.IsStartNoUrl(url, "$PANEL")) {
                            location.hash = url;
                        }
                        else {
                            Core.AkUrl.Current().fEmit.emit("hashchange", "#" + url, _fun, true);
                        }
                    }
                }
            };
            AkUrl.prototype.IsStartNoUrl = function (url, sign) {
                if (url.length > sign.length) {
                    if (url.substr(0, sign.length).toUpperCase() == sign.toUpperCase()) {
                        return true;
                    }
                }
                return false;
            };
            AkUrl.prototype.bindSendPage = function (panelName, fun) {
                if (this.fEmit == null) {
                    this.fEmit = new EventEmitter2();
                }
                this.fEmit.removeAllListeners(("sendtopage__" + panelName));
                this.fEmit.on(("sendtopage__" + panelName), fun);
            };
            AkUrl.prototype.bindClosePage = function (panelName, fun) {
                this.fEmit.removeAllListeners(("closePage__" + panelName));
                this.fEmit.on(("closePage__" + panelName), fun);
            };
            AkUrl.prototype.ready = function () {
                var hash = location.hash;
                Core.AkUrl.Current().fEmit.emit("ready", hash);
            };
            AkUrl.prototype.bindHashChange = function (urlEvent) {
                if (this.fEmit == null) {
                    this.fEmit = new EventEmitter2();
                }
                this.fEmit.addListener("hashchange", urlEvent);
                // alert();
            };
            AkUrl.prototype.bindReady = function (urlEvent) {
                if (this.fEmit == null) {
                    this.fEmit = new EventEmitter2();
                }
                this.fEmit.addListener("ready", urlEvent);
                // alert();
            };
            return AkUrl;
        }());
        AkUrl.fAkUrl = new AkUrl();
        Core.AkUrl = AkUrl;
    })(Core = exports.Core || (exports.Core = {}));
});
