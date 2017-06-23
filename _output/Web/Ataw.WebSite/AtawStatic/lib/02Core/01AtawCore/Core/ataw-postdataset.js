(function ($) {

    $.Ataw = $.Ataw ? $.Ataw : {};
    $.Ataw.AjaxIndex = 0;

    $.HideAjax = function () {
        //$.Ataw.AjaxIndex--;
        //if ($.Ataw.AjaxIndex <= 0) {
        //    //alert($.Ataw.AjaxIndex);
           Ataw.msgbox.hide(500);
        //}
        //        if (NProgress) {
        //            NProgress.done();
        //        }
    }
    $.ShowAjax = function () {
        //        $.Ataw.AjaxIndex++;
        //        if ($.Ataw.AjaxIndex == 1)
        if (typeof (NProgress) != "undefined") {
            NProgress.inc();
        }
        Ataw.msgbox.show(" 正在努力加载数据，请稍后..." + "<i class='icon-refresh fa fa-refresh icon-spin icon-large'></i>", 6);
    }


    $.getSuccessFun = function (options) {
        var _d0 = new Date();
        var d1 = 0, d2 = 0, d3 = 3;
        var dNet;
        if (options.isLoad) {
            return function (a) {
                // Ataw.msgbox.show(" 加载完成...");
                // Ataw.msgbox.hide(0);
                var _d1 = new Date();
                console.info("网站响应  ： "+ (_d1 - _d0));
                $.HideAjax();
                if (typeof (a) == "string") {
                    try {
                        a = $.parseJSON(a);

                        if (a.BeginTime && a.EndTimer) {
                            var _d00 = Date.parse(a["BeginTime"]);
                            var _d11 = Date.parse(a["EndTimer"]);
                            dNet = _d1 - _d11;
                            console.info("服务器执行时间 : " + (_d11 - _d00));
                        }

                        ActionResponse_Commond_Fun(a, options.Obj_Fun);
                        var _d2 = new Date();
                        console.info("总时间 ： " + (_d2 - _d0));
                    }
                    catch (r) {
                        // alert(r + "json数据解析错误 " + a);
                        // alert(a);
                        if (options.$div) {
                            // alert(123);
                            options.$div.html("");
                            options.$div.html(a);
                        }
                        try {
                            if (options.Obj_Fun) {
                                if (a.BeginTime && a.EndTimer) {
                                    var _d00 = Date.parse(a["BeginTime"]);
                                    var _d11 = Date.parse(a["EndTimer"]);
                                    dNet = _d1 - _d11;
                                    console.info("服务器执行时间 : " + (_d11 - _d00));
                                }

                                options.Obj_Fun(a);
                                var _d2 = new Date();
                                console.info("总时间 ： " + (_d2 - _d0));
                            }
                        }
                        catch (ee) {
                            //console.log(ee)
                            throw ee;
                        }
                        finally {
                            $.HideAjax();
                        }
                    }
                }
                $.HideAjax();
            }
        }
        else
            return function (a) {
                var _d1 = new Date();
                d1 = _d1 - _d0;
                console.info("网站响应  ： " + d1);
                $.HideAjax();
                // Ataw.msgbox.show(" 加载完成...");
                // Ataw.msgbox.hide(0);
                if (typeof (a) == "string") {
                    try {
                        a = $.parseJSON(a);
                        if (a.BeginTime && a.EndTimer) {
                            var _d00 = new Date(a["BeginTime"].replace("-", "/").replace("-", "/"));
                            //var _d00 = Date.parse(a["BeginTime"]);
                            
                            var _d11 = new Date(a["EndTimer"].replace("-", "/").replace("-", "/"));
                            d2 = (_d11 - _d00);
                            dNet = _d1 - _d11;
                            console.info("服务器执行时间 : " + d2);
                        }
                    }
                    catch (r) {
                        $.AKjs.App.notifyMesg(r + "json数据解析错误 " + a);
                    }
                }
                try {
                    //if (a.BeginTime && a.EndTimer) {
                    //    var _d00 = Date.parse(a["BeginTime"]);
                    //    var _d11 = Date.parse(a["EndTimer"]);

                    //    console.info("服务器执行时间 : " + (_d11 - _d00));
                    //}

                    ActionResponse_Commond_Fun(a, options.Obj_Fun);
                    //  Ataw.msgbox.hide(0); //隐藏加载提示
                    var _d2 = new Date();
                    d3 = (_d2 - _d0);
                    console.info("总时间 ： " + d3);
                    $("#ACT-TIME").text(d2 + "<  " + dNet + "<  " + (_d2 - _d1));
                }
                catch (tt) {
                    if (console && console.log)
                        console.log(tt);
                    $.AKjs.App.notifyMesg(tt);
                    throw tt;
                }
                finally {
                    $.HideAjax();
                }
            }
    }

    $.AtawAjax = function (options) {
        var isLoad = options.isLoad;
        //Ataw.msgbox.show(" 正在努力加载数据，请稍后..." + "<i class='icon-refresh icon-spin icon-large'></i>", 6);
        var _nomsg = options.nomsg;
        if (!_nomsg)
            $.ShowAjax();
        $.Ataw.AjaxIndex++;
        var _option = $.extend({},
            {
                //nomsg: false,
                type: "POST",
                async: true,
                dataType: "text",
                error: function (a) {
                    //alert("出错 " + a.statusText);
                    $.HideAjax();
                    var _b = a.responseText;
                    if (_b) {
                        if (typeof (_b) == "string") {
                            try {
                                _b = $.parseJSON(_b);
                                ActionResponse_Commond_Fun(_b, options.Obj_Fun);
                                $.HideAjax();
                            }
                            catch (r) {
                                if (!_nomsg) {
                                    $.AKjs.App.notifyMesg(r + "json数据解析错误 " + _b);
                                }
                            }
                        }
                        else {
                            if (!_nomsg) {
                                $.AKjs.App.notifyMesg("出错 " + a.statusText + _b.toString());
                            }
                        }

                    }
                    else {
                        if (!_nomsg) {
                            $.AKjs.App.notifyMesg("出错 " + a.statusText);
                        }
                    }
                },
                beforeSend: function () {

                },
                success: $.getSuccessFun(options)
            }
            ,
            options);
        // alert();
        // debugger;
        return $.ajax(_option);
    };
    var _defaultOptions = {
        url: "",
        control: "",
        name: "",
        success_fun: function (a) {
            //   alert(a); 
        },
        resetData_fun: function (data) { return data; }
    };

    $.fn.PostDataSet = function (options, isACK) {
        var _option = $.extend({}, _defaultOptions, options);
        var ds;
        if (_option.isACK) {
            ds = (this).CreateDataSetACK();
        } else {
            ds = $(this).CreateDataSet();
        }
        var _url = _option.url;
        if (_url == "") {
            _url = _option.control + "/PostDs"
        }
        if (options.resetData_fun) {
            ds = options.resetData_fun(ds);
        }
        var g = $.toJSON(ds);
        $.ajax({ url: _url,
            dataType: "text",
            type: "POST",
            data: { ds: g, name: _option.name },
            success: _option.success_fun,
            error: function (a) {
                $.AKjs.App.notifyMesg(a);
            },
            complete: function (xhr) {

                xhr = null;

            }
        });
    };

    $.fn.CreateLegalDataSet = function (controlFun, legalFun) {
        var _isRes = false;
        var _isChange = false;
        var ds = {};
        var timesStamps = [];
        $(this).each(function (i) {
            _this = $(this);
            var _col = _this.attr("act_ds");
            var _ctl = _this.attr("ACK");
            var _val = "";

            //--------------判断是否是控件
            var _control = _this.data("ATAW_CONTROL");

            if (_this.hasClass("ACT_POST") && _col && _control && _control.dataValue && _control.sys_ataw_fun_name != "AtawDetailControl") {
                _val = _control.dataValue();
                var cos = _col.split(".");
                var _tb = cos[0];
                var _row = cos[2];
                var _um = cos[1];

                if (_control.sys_ataw_fun_name != "AtawHiddenControl" && !_control.legal()) {
                    _isRes = true;
                    legalFun(_control);
                }
                if ((_control.IsChange)) {
                    if (!_control.IsKey) {
                        _isChange = true;
                    }
                    if (controlFun) {
                        controlFun(_control);
                    }
                    $._JoinDataSet(ds, _tb, _row, _um, _val);
                }
                if (_um === "TIMESSTAMP") {
                    timesStamps.push({ _tb: _tb, _row: _row, _um: _um, _val: _val });
                }
            }
        });
        //如果验证不通过 返回0
        if (_isRes)
            return 0;
        //如果没发生编号 返回1
        if (!_isChange) {
            return 1;
        }
        for (var i = 0; i < timesStamps.length; i++) {
            $._JoinDataSet(ds, timesStamps[i]._tb, timesStamps[i]._row, timesStamps[i]._um, timesStamps[i]._val);
        }
        ds = $._checkDataSet(ds);
        return ds;
    };
    $.fn.CreateDataSetACK = function () {
        var ds = {};
        $(this).each(function (i) {
            _this = $(this);
            var _col = _this.attr("act_ds");
            var _ctl = _this.attr("ACK");
            var _val = "";
            var rt = $._ControlData[_ctl];
            if (typeof (rt) == "undefined") {
                _val = "";
            }
            else
                _val = $._ControlData[_ctl](_this);

            var cos = _col.split(".");
            var _tb = cos[0];
            var _row = cos[2];
            var _um = cos[1];
            $._JoinDataSet(ds, _tb, _row, _um, _val);
        });

        return ds;
    };
    $.fn.CreateDataSet = function (controlFun) {
        var ds = {};
        $(this).each(function (i) {
            _this = $(this);
            var _col = _this.attr("act_ds");
            var _ctl = _this.attr("ACK");
            var _val = "";

            //--------------判断是否是控件
            var _control = _this.data("ATAW_CONTROL");
            if (_this.hasClass("ACT_POST") && _col && _control && _control.dataValue && (_control.IsChange || _control.IsKey)) {
                _val = _control.dataValue();
                if (controlFun) {
                    controlFun(_control);
                }
                var cos = _col.split(".");
                var _tb = cos[0];
                var _row = cos[2];
                var _um = cos[1];
                $._JoinDataSet(ds, _tb, _row, _um, _val);
            }
        });
        ds = $._checkDataSet(ds);
        return ds;
    };
    $._checkDataSet = function (ds) {
        for (var _dtName in ds) {
            var _dt = ds[_dtName];
            if (_dt.length > 0) {
                for (var i = 0; i < _dt.length; i++) {
                    if ($.AKjs.IsEmpty(_dt[i])) {
                        _dt.splice(i, 1);
                        i--;
                    }
                }
            }
        }
        return ds;
    }

    $._JoinDataSet = function (ds, tableName, rowNumber, colName, va) {
        var f = ds[tableName];
        if (typeof (f) == "undefined") {
            ds[tableName] = [];
        }
        var rowCount = ds[tableName].length;
        if (rowNumber + 1 > rowCount) {
            for (var i = 0; i < rowNumber - rowCount + 1; i++) {
                var _row = {};
                ds[tableName].push(_row);
            }
        }
        ds[tableName][rowNumber][colName] = va;
    }

    $._ControlData = {
        Detail: function (el) {
            return el.text();

        },
        Hidden: function (el) {
            return el.val();

        },
        Text: function (el) {
            return el.val();
        },
        TextArea: function (el) {
            return el.val();
        },
        Radio: function (el) {
            var ins = el.find(":radio");
            for (var i = 0; i < ins.length; i++) {
                var isc = $(ins[i]).attr("checked");
                if (isc && (isc == true || isc == "true" || isc == "checked")) {
                    return $(ins[i]).val();
                }
            }
            return null;

        }
    };

})(jQuery);