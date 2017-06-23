
//window.onerror = testError;
//function testError() {
//    arglen = arguments.length;
//    var errorMsg = "参数个数：" + arglen + "个";
//    for (var i = 0; i < arglen; i++) {
//        errorMsg += "\n参数" + (i + 1) + "：" + arguments[i];
//    }
//    alert(errorMsg);
//    window.onerror = null;
//    return true;
//}  

(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};
    $.AKjs.AfterFormFun = $.AKjs.AfterFormFun ? $.AKjs.AfterFormFun : {};
    $.AKjs.ChangeEventFun = $.AKjs.ChangeEventFun ? $.AKjs.ChangeEventFun : {};
    $.AKjs.JsAjaxFun = $.AKjs.JsAjaxFun ? $.AKjs.JsAjaxFun : {};
    $.AKjs.AKJSFUN = $.AKjs.AKJSFUN ? $.AKjs.AKJSFUN : {};

    $.AKjs.UniqueID = 0;
    $.AKjs.getUniqueID = function () {
        return $.AKjs.UniqueID++;
    }
    $.AKjs.Creator = function () {

    }
    //-------------全局传值

    $.AKjs.SetFunObjByName = function (name, obj) {
        var _name = "AKJS_FUN_" + name + "_" + $.AKjs.getUniqueID();
        $.AKjs.AKJSFUN[_name] = obj;
        return _name;
    }

    $.AKjs.GetFunObjByName = function (name) {
        if (name && ($.type(name) === "string") && (name != "")) {
            var _l = name.indexOf("AKJS_FUN_");
            if (_l == 0) {
                if ($.AKjs.AKJSFUN[name]) {
                    var _obj = $.AKjs.AKJSFUN[name];
                    $.AKjs.AKJSFUN[name] = null;

                    delete $.AKjs.AKJSFUN[name];
                    return _obj;
                }
            }

        }
        return name;
    }
    //--------------屏幕滚动
    $.AKjs.ScreenF5 = function () {

        var $windowH = $(window).height();
        var $windowW = $(window).width();
        var $headerH = $(".header").height();  //头部高度
        var $barH = $(".buttonbar").height();  //站点地图高度
        var $userInfoH = $(".userInfor").height();  //用户信息高度
        var $useSomeH = $(".useSome").height();
        var $LsumH = $windowH - $headerH - $barH - $userInfoH - $useSomeH - 10;
        $(".PFT_menu").height($LsumH);
        var $mainH = $windowH - $headerH - $barH;
        $(".mainRight").height($mainH);
        $("body").height($windowH);
        if ($windowW < 1044) {
            $("body").width(1044);
            $("body").css("overflow-x", "auto");
            $("html").css("overflow-x", "auto");
        } else {
            $("body").width($windowW);
            $("body").css("overflow", "hidden");
            $("html").css("overflow", "hidden");
        }
        var $deskMain = $(".deskMain").height();
        $(".deskMain").height($mainH);
    }
    //--------------随机数
    $.AKjs.RndNum = function () {
        var rnd = "";
        for (var i = 0; i < 4; i++)
            rnd += Math.floor(Math.random() * 10);
        return rnd;
    }

    //------------------判断是否为空
    $.AKjs.IsEmpty = function (obj) {
        if (typeof (obj) == "undefined" || obj === null || obj === "" || obj === undefined || $.AKjs.IsNull(obj)) {

            return true;
        }
        else {
            for (var _pro in obj) {
                return false;
            }
            if (typeof (obj) == "object")
                return true;
        }
        return false;
    }
    //------------------判断是否存在
    $.AKjs.IsExit = function (obj) {
        if (obj === undefined)
            return false;
        else
            return true;
    }
    //------------------判断是否为字符串
    $.AKjs.IsString = function (obj) {
        return $.type(obj) === "string";
    };
    //------------------返回成员

    $.AKjs.GetProValueFirst = function (obj) {
        for (var _pro in obj) {
            return obj[_pro];
        }
    }


    $.AKjs.GetProValueInsert = function (obj) {
        for (var _pro in obj) {
            return obj[_pro + "_INSERT"];
        }
    }


    $.AKjs.IsNull = function (obj) {
        var i = obj.toString();
        if (i == "{}" || i == "") {
            return true;
        } else {
            return false;
        }
    }

    $.AKjs.GetProNameFirst = function (obj) {
        for (var _pro in obj) {
            return _pro;
        }
    }

    //------------------数据提交的方法--------
    $.fn.CreateDS = function () {
        //-----------

    }


    //------------------性能测试方法

    $.AKjs.TT = new TimeTest();
    $.AKjs.TimeTest = function () {
        return new TimeTest();
    }

    function SignTime(sign) {
        this.Sign = sign;
        this.Timer = new Date();
        this.TimeSpan = null;
        if (SignTime.prototype["AddSign"] === undefined) {
            SignTime.prototype["AddSign"] = function (lastSign) {
                this.TimeSpan = this.Timer.getTime() - lastSign.Timer.getTime();
            }
        }

    }


    function TimeTest() {
        this.TimeSigns = [];

        if (TimeTest.prototype["toShow"] === undefined) {
            TimeTest.prototype["toShow"] = function (lastSign) {
                var _sb = $.AKjs.CreateBuffer();
                $.each(this.TimeSigns, function () {
                    _sb.ad(this.Sign).ad("   耗时间：  ").ad(this.TimeSpan).ad("毫秒\r\n<br/>");

                });
                // _sb.ad("总消耗：").ad(this.TimeSigns[this.TimeSigns.length].Timer.getTime() - this.TimeSigns[0].Timer.getTime());
                return _sb.toString();
            }
        }

        if (TimeTest.prototype["addSign"] === undefined) {
            TimeTest.prototype["addSign"] = function (mesg) {
                var _sign = new SignTime(mesg);
                var _len = this.TimeSigns.length;
                if (_len > 0) {
                    var _last = this.TimeSigns[_len - 1];

                    _sign.AddSign(_last);

                }

                this.TimeSigns.push(_sign);


            }
        }
    }




    //------------------------------ajax 方法
    $.AKjs.getJSON = function (url, data, fun, option) {
        var _op = $.extend({},
        {
            nomsg: false,
            url: url,
            data: data,
            Obj_Fun: fun
        },
        option);

        $.AtawAjax(_op);
    }

    $.fn.AtawLoad = function (url, data, fun, option) {
        $.AKjs.load(url, data, this, fun, option);
    };

    $.AKjs.load = function (url, data, $div, fun, option) {
        var _op = $.extend({},
        {
            url: url,
            data: data,
            Obj_Fun: fun,
            isLoad: true,
            $div: $div
        },
        option);

        $.AtawAjax(_op);
    }

    //-------------------------------OOD核心方法------------
    //封装枚举

    $.AKjs.extend = function (classList) {
        var _list = [{}];
        _list = _list.concat(classList);
        return $.extend.apply($, _list);
    }


    $.AKjs.ACCESS = {
        akPrivate: "private",
        akProtect: "protect",
        akInternal: "internal",
        akPublic: "public"
    };
    //获取类名
    $.AKjs.getFunName = function (s) {
        s = s.toString();
        var m = s.match(/function\s+([^(]+)/);
        if (m)
            return m[1];
        else
            return "";
    }
    function getParamType(param) {
        return ((_t = typeof (param)) == "object" ? Object.prototype.toString.call(param).slice(8, -1) : _t).toLowerCase();
    }
    //-----------------------最根本的基类：实现构造函数和dispose---------------------类一定要有方法重载

    $.AKjs.AtawClass = function () { return new AtawClass().sysCreator(); }

    function AtawClass() {
        this.AtawAkjs = "1";
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "asynJs", function (path, asyfun) {
            $.AKjs.asynJs(path, asyfun);

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "synIs", function (path) {
            // var _lab = $LAB.setOptions({ CacheBust: true });
            // _lab.script(path).wait();
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "sysCreator", function () {
            //            alert(this.constructor);
            //            if (this["sys_ataw_fun_name"] === undefined) {
            //                this["sys_ataw_fun_name"] = _getFunName(this.constructor.toString());
            //            }
            var _g = this["sys_ataw_fun_name"];
            if (this[_g + "_creator"]) {
                this[_g + "_creator"]();
            }
            return this;
        });
    }


    //-----------------------注册继承的方法----------------------
    $.AKjs.RegisterMethodCall = function (access, methodName, fun) {
        //alert(this.constructor.toString());
        var _g = null;
        if (this.constructor.prototype[methodName] === undefined) {
            this.constructor.prototype[methodName] = fun;
            if (this.constructor.prototype["sys_ataw_fun_name"] === undefined) {
                this.constructor.prototype["sys_ataw_fun_name"] = $.AKjs.getFunName(this.constructor.toString());
                // var _g = ;
            }
            //------
            if (access == $.AKjs.ACCESS.akProtect || access == $.AKjs.ACCESS.akInternal || access == $.AKjs.ACCESS.akPublic) {
                _g = this.constructor.prototype["sys_ataw_fun_name"];
                if (this.constructor.prototype[_g + "_" + methodName] === undefined) {
                    this.constructor.prototype[_g + "_" + methodName] = fun;
                }
            }
        }
    }

    //----Jquery插件控件对象的创建
    $.AKjs.AtawCreateCall = function (controlName, options) {
        this.each(function () {
            var _this = $(this);
            var _op = $.AKjs.Options(options, _this);
            var _col = $.AKjs[controlName];
            if (_col) {
                var _obj = $.AKjs[controlName](_op);
                //alert(controlName);
                _obj.ControlTypeName = controlName;
                _obj.sysInit();
                _this.data("ATAW_CONTROL", _obj);
            }
            else {
                alert("控件 : "+  controlName + " 不存在 " );
            }
        });
    }

    //---------------默认参数创建
    $.AKjs.Options = function (options, obj) {
        return $.extend({}, { containerFun: function () { return obj; } },
                                      options,
                                      $.AKjs.DefaultOptions
                                      );
    }
    $.AKjs.DefaultOptions = {

    };
    //---------------------------
    $.fn.AtawControl = function () {
        if (this.length == 0) {
            return null;
        }
        if (this.length == 1) {
            return this.data("ATAW_CONTROL");
        }
        else {
            var _res = [];
            this.each(function () {
                var _this = $(this);
                _res.push(_this.data("ATAW_CONTROL"));
            });
            return _res;
        }
    }
    //-------------------处理请求json 返回值
    if(window.ActionResponse_Commond_Fun)
        $.AKjs.ActionResponse_Commond_Fun = window.ActionResponse_Commond_Fun;
    //-------------------设置http文件名
    $.AKjs.AddUrlFileName = function (url, wh) {
        var _index = url.lastIndexOf(".");
        var _path = url.substring(0, _index);
        var _ext = url.substring(_index, url.length);
        var _f = _path + "_" + wh + _ext;
        return _f + "?f=" + $.AKjs.GetRand();
    }
    //------------------获取唯一时间
    $.AKjs.GetRand = function () {
        return new Date().getTime();
    }
    //----------根据图片对象获取图片路径
    $.AKjs.GetImgByResource = function (res) {
        // var resourceArrange = res;
        var _resourceArrange = res;
        if (_resourceArrange && _resourceArrange.CoverIndex != undefined && _resourceArrange.ResourceInfoList && _resourceArrange.ResourceInfoList.length > 0) {
            if (_resourceArrange.CoverIndex >= _resourceArrange.ResourceInfoList.length)
                _resourceArrange.CoverIndex = _resourceArrange.ResourceInfoList.length - 1;
            var ResourceInfoObj = [_resourceArrange.ResourceInfoList[_resourceArrange.CoverIndex]];
            if (ResourceInfoObj && ResourceInfoObj.length && ResourceInfoObj.length > 0) {
                if (ResourceInfoObj[0].HttpPath) {
                    var size = "_90-90";
                    var fileid = ResourceInfoObj[0].FileId.toString();
                    var httppath = ResourceInfoObj[0].HttpPath.replace(fileid, fileid + size);
                    return httppath;
                }
            }
        }
        return "/Content/PlatformThemes/SapphireBlue/images/default-photo_90-90.jpg";
    };
    $.AKjs.GetFirstItemByResource = function (res) {
        if (res && res.ResourceInfoList && res.ResourceInfoList.length > 0) {
            //--------
            return res.ResourceInfoList[0];
        } else
            return null;
    };

    $.AKjs.SetImageList = function (res) {
        var _$dv = $("<div></div>");
        if (res && res.ResourceInfoList) {
            //-----------
            for (var _i = 0; _i < res.ResourceInfoList.length; _i++) {
                var _item = res.ResourceInfoList[_i];
                var size = "_90-90";
                var fileid = _item.FileId.toString();
                var httppath = _item.HttpPath.replace(fileid, fileid + size);
                //---------
                _$dv.append($("<a   style='display:inline-block;' class='thumbnail' target='_blank' href='" + _item.HttpPath + "'><img class='acs-thumbImage80' src='" + httppath + "'  /><a/>"));
            }
        }
        return _$dv;
    }

    $.AKjs.SetFileList = function (res) {
        var _$dv = $("<div></div>");
        if (res && res.ResourceInfoList) {
            //-----------
            for (var _i = 0; _i < res.ResourceInfoList.length; _i++) {
                var _item = res.ResourceInfoList[_i];
                var fileid = _item.FileId.toString();
                var httppath = _item.HttpPath.replace(fileid, fileid);
                //---------
                if (_item.CanDocumentView) {
                    _$dv.append($("<div><a   style='display:inline-block;' class='thumbnail' target='_blank' href='" + _item.HttpPath + "'>附件:" + _item.FileNameTitle + "</a><a class='btn  btn-xs ACT-DOCVIEW-LINK' docid='" + _item.DocumentViewId + "'><i class='icon-zoom-in fa fa-search-plus'></i></a></div>"));
                }
                else {
                    _$dv.append($("<div><a   style='display:inline-block;' class='thumbnail' target='_blank' href='" + _item.HttpPath + "'>附件:" + _item.FileNameTitle + "</a></div>"));
                }
            }
        }
        return _$dv;
    }

    //------------------名字截取字符串显示点点点
    //str：字符串
    //num：从开始位置保留几个字符
    $.AKjs.InterceptStringDisplay = function (str, num) {
        var end = str.length - 1;
        //看是否带扩展名，带了就保留扩展名
        var endExtension = str.lastIndexOf(".");
        end = endExtension == -1 ? end : endExtension;
        //需要被替换成点点点的字符串
        var rStr = str.substring(num, end);
        //返回新的字符串
        return str.replace(rStr, "...");
    }
    //-------------------------
    $.AKjs.DisposeObj = function (obj) {
        if (obj) {
            if ($.isArray(obj)) {
                var _l = obj.length;
                for (var i = 0; i < _l; i++) {
                    if (obj[i] && obj[i].dispose)
                        obj[i].dispose();
                    else {
                        obj[i] = null;
                        delete (obj[i]);
                        //delete (this[_pro]);
                    }
                }
            }
            else {
                if ($.isPlainObject(obj)) {
                    for (var n in obj) {
                        if (obj[n] && obj[n].dispose)
                            obj[n].dispose();
                        else {
                            obj[i] = null;
                            delete (obj[i]);
                        }
                    }
                }
                if (obj && obj.dispose) {
                    obj.dispose();
                }
            }
        }
    };

    $.AKjs.Template = function (source, data) {
        var render = template.compile(source);
        return render(data);
    };
    //-------------------样式调整
    $.AKjs.ClassRowSet = function (s, num) {

    }
    //---------------js动态载入---
    $.AKjs.asynJs = function (path, asyfun) {
        function _formatPath(url) {
            var _len = url.length;
            if (_len > 3) {
                var _css = url.substring(_len - 3);
                if (_css == "css") {
                    return "css!" + url;
                }
            }
            return url;
        }

        if ($.isArray(path)) {

            var _path = [];
            var _len = path.length;
            for (var i = 0; i < _len; i++) {
                _path.push(_formatPath(path[i]));
            }


            require(_path, asyfun);
        }
        else {
            require([_formatPath(path)], asyfun);
        }
    };
    //------------geiIframe调用的---
    $.AKjs.IframeOpt = {
        EndStart: function () {
            $("#apDiv1").hide("slow");
            // $.AKjs.AppGet().Menu.gotoMenuLoction("$iframe$/UISDK/Home/Document");

        },
        Menu: function (url) {
            //$iframe$/UISDK/Home/Document
            $.AKjs.AppGet().Menu.gotoMenuLoction(url);
        },
        Layout: function (layout) {
            $.AKjs.AppGet().LayOut.layOutTransFormPage(layout);
        },
        Mesg: function (str) {
            $.AKjs.App.notifyMesg(str);

        },
        GetScrollTop: function () {
            return $(document).scrollTop();
        }
    };
    $.AKjs.Iframe = function (opt, url, layout, mesg) {
        if ($.AKjs.IsIframe && window.parent && window.parent.window && window.parent.window.$.AKjs && window.parent.window.$.AKjs.IframeOpt) {

            if (url) {
                window.parent.window.$.AKjs.IframeOpt.Menu(url);
            }
            if (layout) {
                //  window.parent.window.$.AKjs.IframeOpt.Layout(layout);
            }
            if (opt) {
                if (typeof (opt) == "object") {
                    for (var exe in opt) {
                        var _res = $.AKjs.IframeOpt[exe];
                        var exeObj = opt[exe];
                        if (_res) {
                            exeObj.outParam = _res(exeObj.inParam);
                        }
                    }
                    //return 
                }
                else {
                    if (typeof (opt) == "string") {
                        return window.parent.window.$.AKjs.IframeOpt[opt]();
                    }
                }
            }
            if (mesg) {
                window.parent.window.$.AKjs.IframeOpt.Mesg(mesg);
            }

        }
    };
    // $.AKjs.Iframe
    $.AKjs.IsIframe = false;
    if (self != top) {
        $.AKjs.IsIframe = true;
    }



    template.config("openTag", "{%");
    template.config("closeTag", "%}");
    template.helper('$parseFloat', function (content) {
        var _val = parseFloat(content);
        return isNaN(_val) ? 0 : _val;
    });
    template.helper('$parseDate', function (content) {
        var _val = 0;
        if (content) {
            content = content.replace(/-/g, "/");
            _val = Date.parse(content);
        }
        return isNaN(_val) ? 0 : _val;
    });

    //$getdate
    template.helper('$getdate', function () {
        var _val = new Date();
        return isNaN(_val) ? 0 : _val;
    });


})(jQuery);