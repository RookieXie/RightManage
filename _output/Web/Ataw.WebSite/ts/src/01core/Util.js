define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Core;
    (function (Core) {
        var Util = (function () {
            function Util() {
            }
            Util.Cast = function (obj) {
                var _t = obj;
                return _t;
            };
            Util.GetClassName = function (obj) {
                if (obj["constructor"]) {
                    var s = obj["constructor"];
                    var _s = s.toString();
                    var m = _s.match(/function\s+([^(]+)/);
                    if (m)
                        return m[1];
                    else
                        return "";
                }
                else
                    return (typeof obj).toString();
            };
            Util.Noty = function (msg, sign) {
                var _p = "info"; //warning success error
                if (sign) {
                    _p = sign;
                }
                var _cal = $.fn.calendar;
                Core.Util.AsyncJs([
                    "/AtawStatic/lib/03Extend/toastr/toastr.min.js",
                    "/AtawStatic/lib/03Extend/toastr/toastr.min.css"
                ], function (toastr) {
                    //  $.sticky("123");
                    toastr.options = {
                        "closeButton": true,
                        "debug": false,
                        "newestOnTop": true,
                        "progressBar": true,
                        "positionClass": "toast-bottom-right",
                        "preventDuplicates": false,
                        "onclick": null,
                        "showDuration": "300",
                        "hideDuration": "1000",
                        "timeOut": "5000",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    };
                    // console.log(msg);
                    toastr[_p](msg);
                    if (_cal) {
                        $.fn.calendar = _cal;
                    }
                    // alert(msg);
                });
            };
            Util.ToggleLoading = function (isS, fun) {
                // alert(isS);
                if (isS) {
                    if (window["Ataw"] && window["Ataw"]["msgbox"] && window["Ataw"]["msgbox"]["show"]) {
                        window["Ataw"]["msgbox"]["show"](" 正在努力加载数据，请稍后..." + "<i class='icon-refresh icon-spin icon-large'></i>", 6);
                    }
                    if (!fun) {
                        // $("#ACT-Loading").addClass("hide");
                        $("#ACT-Loading").show();
                    }
                    else {
                        $("#ACT-Loading").show(0, fun);
                    }
                    // $("#ACT-Loading").removeClass("hide");
                }
                else {
                    if (window["Ataw"] && window["Ataw"]["msgbox"] && window["Ataw"]["msgbox"]["hide"]) {
                        window["Ataw"]["msgbox"]["hide"](0);
                    }
                    $("#ACT-Loading").hide();
                }
            };
            Util.ReactByOpt = function (opt) {
                return opt.ReactType;
            };
            Util.AsyncJs = function (strs, fun, errorFun) {
                strs.forEach(function (url, i) {
                    var _len = url.length;
                    if (_len > 3) {
                        var _css = url.substring(_len - 3);
                        if (_css == "css") {
                            strs[i] = url = "css!" + url;
                        }
                    }
                });
                require(strs, fun, errorFun);
            };
            Util.HexToString = function (str) {
                // var str = this;
                var val = "";
                var arr = str.split(",");
                for (var i = 0; i < arr.length; i++) {
                    val += String.fromCharCode(parseInt(arr[i]));
                }
                return val;
            };
            Util.StringToHex = function (str) {
                // var str = this;
                var val = "";
                for (var i = 0; i < str.length; i++) {
                    if (val == "")
                        val = str.charCodeAt(i);
                    else
                        val += "," + str.charCodeAt(i);
                }
                return val.toString();
            };
            //'hexToString': function () {
            //},
            Util.isDate = function (str) {
                var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
                if (r == null)
                    return false;
                var year = parseInt(r[1]);
                var month = parseInt(r[3]);
                var date = parseInt(r[4]);
                var d = new Date(year, month - 1, date);
                return (d.getFullYear() == year && (d.getMonth() + 1) == month && d.getDate() == date);
            };
            Util.isDateTime = function (str) {
                var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
                var r = str.match(reg);
                if (r == null)
                    return false;
                var year = parseInt(r[1]);
                var month = parseInt(r[3]);
                var date = parseInt(r[4]);
                var hours = parseInt(r[5]);
                var minutes = parseInt(r[6]);
                var seconds = parseInt(r[7]);
                var d = new Date(year, month - 1, date, hours, minutes, seconds);
                return (d.getFullYear() == year && (d.getMonth() + 1) == month && d.getDate() == date && d.getHours() == hours && d.getMinutes() == minutes && d.getSeconds() == seconds);
            };
            Util.parse = function (time) {
                if (typeof (time) == 'string') {
                    if (time.indexOf('GMT') > 0 || time.indexOf('gmt') > 0 || !isNaN(Date.parse(time))) {
                        return this.parseGMT(time);
                    }
                    else if (time.indexOf('UTC') > 0 || time.indexOf('utc') > 0 || time.indexOf(',') > 0) {
                        return this.parseUTC(time);
                    }
                    else {
                        return this.parseCommon(time);
                    }
                }
                return new Date();
            };
            Util.parseGMT = function (time) {
                return new Date(Date.parse(time));
            };
            Util.parseUTC = function (time) {
                return (new Date(time));
            };
            Util.parseCommon = function (time) {
                var d = time.split(/ |T/), d1 = d.length > 1 ? d[1].split(/[^\d]/) : [0, 0, 0], d0 = d[0].split(/[^\d]/);
                return new Date(d0[0] - 0, d0[1] - 1, d0[2] - 0, d1[0] - 0, d1[1] - 0, d1[2] - 0);
            };
            Util.isString = function (val) {
                return (typeof (val)) == "string";
            };
            Util.intersection = function (a, b) {
                var result = [];
                for (var i = 0; i < b.length; i++) {
                    var temp = b[i];
                    for (var j = 0; j < a.length; j++) {
                        if (temp === a[j]) {
                            result.push(temp);
                            break;
                        }
                    }
                }
                return Util.qc(result);
            };
            Util.qc = function (a) {
                var r = [];
                for (var i = 0; i < a.length; i++) {
                    var flag = true;
                    var temp = a[i];
                    for (var j = 0; j < r.length; j++) {
                        if (temp === r[j]) {
                            flag = false;
                            break;
                        }
                    }
                    if (flag) {
                        r.push(temp);
                    }
                }
                return r;
            };
            Util.DateFormat = function (date, fmt) {
                var o = {
                    "M+": date.getMonth() + 1,
                    "d+": date.getDate(),
                    "h+": date.getHours(),
                    "m+": date.getMinutes(),
                    "s+": date.getSeconds(),
                    "q+": Math.floor((date.getMonth() + 3) / 3),
                    "S": date.getMilliseconds() //毫秒   
                };
                if (/(y+)/.test(fmt))
                    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            };
            Util.IsPure = function (value) {
                return Object.keys(value).length === 0;
            };
            return Util;
        }());
        //-------------------设置http文件名
        Util.AddUrlFileName = function (url, wh) {
            var _index = url.lastIndexOf(".");
            var _path = url.substring(0, _index);
            var _ext = url.substring(_index, url.length);
            var _f = _path + "_" + wh + _ext;
            return _f + "?f=" + new Date().getTime();
        };
        //------------------名字截取字符串显示点点点
        //str：字符串
        //num：从开始位置保留几个字符
        Util.InterceptStringDisplay = function (str, num) {
            var end = str.length - 1;
            //看是否带扩展名，带了就保留扩展名
            var endExtension = str.lastIndexOf(".");
            end = endExtension == -1 ? end : endExtension;
            //需要被替换成点点点的字符串
            var rStr = str.substring(num, end);
            //返回新的字符串
            return str.replace(rStr, "...");
        };
        Core.Util = Util;
    })(Core = exports.Core || (exports.Core = {}));
    exports.reqCss = function (strs, fun) {
        if (!fun)
            fun = function () { };
        Core.Util.AsyncJs(strs, fun);
    };
    exports.parseJSON = function (strings) {
        try {
            var _res = $.parseJSON(strings);
            return {
                Result: _res,
                IsSucess: true,
                SourceString: strings
            };
        }
        catch (ex) {
            console.log("... json 转换异常 ...");
            console.log(ex);
            return {
                IsSucess: false,
                SourceString: strings
            };
        }
    };
});
