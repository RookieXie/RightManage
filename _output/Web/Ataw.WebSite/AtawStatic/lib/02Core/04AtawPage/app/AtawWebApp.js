(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};
    $.AKjs.DomFun = $.AKjs.DomFun ? $.AKjs.DomFun : {};

    $.AKjs.App = null;

    $.AKjs.AppGet = function (options) {
        return $.AKjs.AtawWebApp(options);
    }

    $.AKjs.AtawWebApp = function (options) {
        if ($.AKjs.App != null) {
            return $.AKjs.App;
        }
        else {
            return $.AKjs.App = $.extend({}, $.AKjs.AtawBaseJPlugIn(), new AtawWebApp(options)).sysCreator();
        }
    }

    $.AKjs.DomFun.ACT_MENU_COL = function (dom) {
        var _$this = $(dom);
        _$this.parent().next("ul").eq(0).toggle();

    };


    $.AKjs.IsLoadMenu = false;
    // icon-double-angle-up
    function AtawWebApp(options) {
        this.All$url = null;
        this.SignUrl = null;

        this.ModuleXml = null;
        this.PageStyle = null;

        this.responseFormList = [];

        this.$ActMain = null;

        this.$ActAppMain = null;
        this.$ActAppRight = null;
        this.$ActAppLeft = null;

        this.$ActLeftMenu = null;

        this.$ActMap = null;
        // var _$leftDv = $("#ACT-APP-LEFT");
        this.$ActAppLeftBt = $("#ACT-APP-LEFT-BT");
        this.$ActAppRightBt = $("#ACT-APP-RIGHT-BT");
        this.$ActAppBt = $("#ACT-APP-BT");

        this.CurrentMenuKey = "";
        this.MenuData = null;
        this.History = [];

        this.IsDesk = false;
        this.LatestActivityTime = null;
        this.LastActivityTime = null;
        this.IsPushNotice = false; //是否推送消息
        this.LoadStyle = 0; //0:整个页面刷新,1,局部刷新
        this.$P2PWindow = $("<div class='PAGE-WINDOW-ACT ACT-P2P'></div>");
        this.$P2PWindow.append("<div class='ACT-MSHg-content' style='height:300px;overflow:auto;'></div><div class='ACT-INPUT' style='padding-top:40px'></div>");
        this.$P2PWindow.find(".ACT-INPUT").append("<textarea style='resize:none;width:90%' class='ACT-INPUT-MSG'></textarea><a class='btn btn-sm btn-primary ACT-SEND-ACTION'>发送</a>");
        this.CurrentChatUserID = null;
        this.R = {};
        this.R.getMenu$DomR = function () {
            return $("#ACT-LEFT-MENU");
        };

        this.Url = {};
        this.Url.setUrlAnchor = function (anchor) {
            return $.AKjs.AppGet().setUrlAnchor(anchor);
        };
        //setUrlAnchor
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "create", function () {

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "urlOpen", function () {
            // if()
            this.hideNavi();
            this.mainUrl(this.SignUrl);
            this.LoadStyle = 0;
            //            this.mainUrl(this.SignUrl, function (op) {
            //                var _coller = $.AKjs.AtawMenuController(op);
            //                _coller.exeCommand();
            //            });
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getUrl", function () {
            this.All$url = $.url;
            this.SignUrl = this.All$url.attr("anchor");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            this.$PinNavi = $("#ACT-PIN-NAVI");

            this.$ActAppMain = $("#ACT-APP-MAIN");
            this.$ActAppRight = $("#ACT-APP-RIGHT");
            this.$ActAppLeft = $("#ACT-APP-LEFT");

            this.$ActMain = $("#ACT-MAIN");
            this.$ActMap = $("#ACT-SITEMAP");
            //            if(){
            //            videojs.options.flash.swf = "/Scripts/Core/videojs/video.js";
            //            }
            $.backstretch("../../../../Content/images/bgImg-office.jpg");
            return this;
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "notifyPage", function () {
            //$("#ACT-PIN-NAVI").pin(); //导航条盯住
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "registerFormList", function (formObj, methodName) {
            // $("#ACT-PIN-NAVI").pin(); //导航条盯住
            this.responseFormList.push(formObj);
        });
        /// <reference path="../../../../Content/PlatformThemes/SapphireBlue/images/loginBg/bg16.jpg" />

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "loadMenu", function ($menu, $siteMap) {
            $.AKjs.getJSON("/right/Menu/GetAllTree?regname=MenuTreeCodeTable", {}, _fun);
            var _this = this;
            if (_h === undefined)
                var _h = 0;
            function _fun(res) {
                _this.MenuData = res;
                var _$menu = $menu;
                _h++;
                if (_h != 1) return;
                _$menu.AtawLeftMenuTree(
            {
                Data: res,
                //SelectArrangeItem: "000_002_002",
                ClickFun: function (arrange, menuObj) {
                    // SetUrl(arrange, menuObj);
                    var _obj = $siteMap.AtawControl();
                    if (_obj) {
                        if (_obj.length && _obj.length > 0) {
                            _obj[0].open(arrange);
                        } else
                            _obj.open(arrange);
                    }

                }
            });

                var _obj = _$menu.AtawControl();
                var _$map = $siteMap;
                _$map.AtawPageMap({
                    Data: res,
                    TreeMenuObj: _obj,
                    ClickFun: function (arrange, menuObj) {
                        //var _$li = _$menu.find(".T" + arrange);
                        //_$menu.scrollTop(_$li.offset().top - _$menu.offset().top);
                    }
                });
                //-------------
                _this.urlOpen();
            }


        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "mainUrl", function (newUrl, openFun) {
            //            var _sign = newUrl.charAt(0);
            //            if (_sign == "/") {
            //                window.location = newUrl;
            //            }
            //            else {
            if (!newUrl || newUrl == "" || newUrl.indexOf("$") !== 0) newUrl = "$desk$";
            //if (newUrl.indexOf("$") !== 0) return;
            this.setUrlAnchor(newUrl);
            var _mode, _pageStyle, xml, param3;
            var _pams = newUrl.split("$");
            var _mode = _pams[1]; //= "module/workflow/myWork";
            if (_mode == "" || _mode == null)
                _mode = "default";

            if (_pams.length >= 3) {
                xml = _pams[2]; //= "List";
                if (xml == "" || xml == null) {
                    xml = "List";
                }
            }
            if (_pams.length >= 4) {
                _pageStyle = _pams[3]; ; //= "List";
                if (_pageStyle == "" || _pageStyle == null) {
                    _pageStyle = "List";
                }
            }
            if (_pams.length >= 5) {
                param3 = _pams[4]; ; //= "List";
            }
            var _op = {
                //  Options: {
                ModeName: _mode,
                Param1: xml,
                Param2: _pageStyle,
                Param3: param3
                //  }
            };
            var _menuControll = $.AKjs.AtawMenuController(_op);
            var _coller = $.AKjs.AtawPageController(_op);
            if (openFun) {
                openFun(_op);
            }
            _menuControll.exeCommand();
            _coller.exeCommand();
            this.reloadToggle();
            // this.loadMainPage(_xml, _pageStyle);
            //                }
            // }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "openUrl", function (newUrl) {

            var _sign = newUrl.charAt(0);
            if (_sign == "/") {
                window.location = newUrl;
            }
            else {
                if (_sign == "$") {
                    this.SignUrl = newUrl;
                    this.hideNavi();
                    this.mainUrl(newUrl);
                    this.LoadStyle = 1;
                }
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "reloadToggle", function ($dom) {
            // alert(this.$PinNavi.length);
            //this.$PinNavi.pin();
            this.bindPageEvent($dom);
            if (this.LoadStyle === 1) {
                $("body").scrollspy("refresh");
            }
            //obj.
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "clearMain", function ($dom) {

            this.$ActMain.html("");
            this.$ActAppMain.find(".PAGE-WINDOW-ACT").html("");
            // if()
            this.$ActMain.show();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "clearRight", function ($dom) {
            var _$rightDv = $("#ACT-APP-RIGHT");
            _$rightDv.find(".ACT-RIGHT-COMMON").show();
            _$rightDv.find(".ACT-RIGHT-CUSTOM").remove();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "showNavi", function (title) {
            var $naviLiTab = $('#ACT-NAVI-TAB'), $naviContent = $('#ACT-NAVI-MENU');
            var $naviContentBody = $('<div class="panel-body"></div>');
            $naviContent.append($naviContentBody);
            $naviLiTab.removeAttr("style");
            $naviContent.removeAttr("style");
            $naviLiTab.find("a").text(title).tab("show");
            return $naviContentBody;
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "hideNavi", function () {
            var $naviLiTab = $('#ACT-NAVI-TAB'), $naviContent = $('#ACT-NAVI-MENU');
            $naviLiTab.css("display", "none");
            $naviContent.html("");
            $naviContent.css("display", "none");
            if (this.$ActAppLeft) {
                this.$ActAppLeft.find("a:eq(0)").tab("show");
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "loadDesk", function () {
            var _this = this;
            $.AKjs.load("/Right/desk/QuickMenu", null, this.$ActMain, function () {
                _this.bindPageEvent(this.$ActMain);
            });


        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "loadMainPage", function (xml, pageStyle, param) {
            var _this = this;
            var paramObj = this.formartPageState(pageStyle, param);
            var ds = {};
            if (paramObj && paramObj.ds) {
                ds = paramObj.ds;
            }
            var postData = $.extend({}, { xml: xml, ds: $.toJSON(ds), pageStyle: pageStyle }, paramObj.additionData)
            //this.changeAnchor(xml, pageStyle, param);
            _this.clearMain();
            _this.clearRight();
            $.AKjs.getJSON("/module/module", postData, _fun1);
            function _fun1(res) {
                // _this.$ActMain.hide();


                // _this.$ActMain.hide();
                if (res.ExtData) {
                    res.ExtData.PageState = param;
                } else {
                    res.ExtData = { PageState: param };
                }
                _this.$ActMain["Ataw" + pageStyle + "Page"](res);
                var mainObj = _this.$ActMain.AtawControl();
                if (paramObj.afterPageFun) {
                    var afterPageFun = new Function(paramObj.afterPageFun);
                    afterPageFun()(_this.$ActMain.AtawControl());
                }
                // _this.$ActMain.show();
                //_this.reloadToggle();
                // alert();
                _this.resetTable();
            }
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "loadDocumentCenterPage", function (xml, pageStyle, param) {
            var _this = this;
            var paramObj = this.formartPageState(pageStyle, param);
            _this.clearMain();
            _this.clearRight();
            seajs.use(['jquery', 'AkDocumentPage-Init'], function ($, iner) {
                iner.load(_this.$ActMain, { xml: xml, pageStyle: pageStyle, param: param, paramObj: paramObj });
            });


        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "loadWorkflowPage", function (type, id) {

            if (!type || !id) return;
            type = type.toLowerCase();
            if (type === "inst") {
                this.loadWorkflowInstPage(id);
            } else if (type === "insthis") {
                this.loadWorkflowHisPage(id);
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "loadWorkflowGuidePage", function (name) {
            if (!name) return;
            var _this = this;
            $.AKjs.getJSON("/workflow/WorkFlowDef/GetGuideXml", { shortName: name }, function (res) {
                if (res.type === 1 && res.guideXml) {
                    _this.$ActMain["AtawGuidePage"]({ WorkflowDefName: name, GuideXml: res.guideXml, DisplayName: res.displayName });
                } else {
                    alert("未配置向导页");
                }
            });
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "loadDocumentCommentPage", function (fid, type) {
            if (!fid) return;
            var _this = this;
            _this.clearMain();
            _this.clearRight();

            seajs.use(['jquery', 'AkComment-Init'], function ($, iner) {
                iner.load(_this.$ActMain, { FID: fid, TYPE: type });
            });


        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "loadWorkflowInstPage", function (id) {
            var _this = this;
            $.AKjs.getJSON("/workflow/WorkFlowInst/InstForm", { id: id }, function (res) {
                if (res.ExtData) {
                    res.ExtData.DeskShortcutHref = _this.SignUrl;
                } else {
                    res.ExtData = { DeskShortcutHref: _this.SignUrl }
                }
                if (res.ExtData.FormType === "1") {
                    res["AtawSubmitSetting"] = {
                        befortPostDataFun: function (data, page) {
                            page.AtawSubmitSetting.Url = "/Workflow/MyWork/ProcessAsk?id=" + id + "&ds=" + $.toJSON(data)
                            return true;
                        }
                        //                        ,
                        //                        afterPostDataFun: function (page, data) {
                        //                            if (data > 0) {
                        //                                window.location.reload();
                        //                            }
                        //                        }
                    };
                    res["MvcFormUrlSetFun"] = function (mvcForm) {
                        return mvcForm.Url + "?id=" + id;
                    };
                    res["NoChangeCheckFun"] = function () {
                        return true;
                    }
                    _this.clearMain();

                    //                    _this.$ActMain.append("<p>" + res.Title + "</p>");
                    _this.$ActMain.AtawViewPage(res);
                    //_this.reloadToggle();

                    if (res.ExtData.HaveSave === "1") {
                        var a = $('<a class="functionBtn" href="javascript:void(0)"><span>保存</span></a>');
                        a.click(function () {
                            _this.$ActMain.AtawControl().submit("/Workflow/MyWork/ProcessSave?id=" + id);
                        })
                        _this.$ActMain.AtawControl().$PanelFooter.find('.center-block').append(a);
                    }
                } else {
                    res["AtawSubmitSetting"] = { befortPostDataFun: function (data, page) { alert(page.RegName); return true; } };
                    res["MvcFormUrlSetFun"] = function (mvcForm) {
                        return mvcForm.Url + "?id=" + id;
                    }
                    _this.clearMain();
                    _this.$ActMain.AtawViewPage(res);
                    var viewPageObj = _this.$ActMain.AtawControl();
                    viewPageObj.$Submit.css("display", "none");
                    //_this.reloadToggle();
                }
            });
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "loadWorkflowHisPage", function (id) {
            var _this = this;
            $.AKjs.getJSON("/workflow/MyHistory/HistoryForm", { id: id }, function (res) {
                if (res.ExtData) {
                    res.ExtData.DeskShortcutHref = _this.SignUrl;
                } else {
                    res.ExtData = { DeskShortcutHref: _this.SignUrl }
                }
                res["AtawSubmitSetting"] = { befortPostDataFun: function (data, page) { alert(page.RegName); return true; } };
                _this.clearMain();
                _this.$ActMain.append("<p>" + res.Title + "</p>");
                _this.$ActMain.AtawViewPage(res);
                var viewPageObj = _this.$ActMain.AtawControl();
                viewPageObj.$Submit.css("display", "none");
                //_this.reloadToggle();
            });
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "bindPageEvent", function ($dom) {
            // alert(this.$PinNavi.length);
            //this.$PinNavi.pin();ACT-A-HREF
            var _this = this;
            if (!$dom) $dom = $(document);
            $dom.find("a.ACT-A-HREF").unbind("click").bind("click", function () {
                try {
                    var _$this = $(this);
                    //alert(_$this.attr("href"));
                    _this.openUrl(_$this.attr("href"));
                }
                catch (ex) {
                    _this.C.notifyMesgC(ex);
                }
                return false;
            });

            $dom.find(".ACT-SNS-USER-LINK").each(function () {
                var _$this = $(this);
                if (_$this.AtawControl() == null) {
                    var _id = _$this.attr("lkid");

                    _$this.AtawSnsUserCard({ UserId: _id });
                }
                //return false;
            });

            $dom.find(".clubStateInfo").each(function () {
                var _$this = $(this);
                if (_$this.AtawControl() == null) {
                    var _id = _$this.attr("clubid");

                    _$this.AtawSnsClubCard({ ClubId: _id });
                }
                //return false;
            });

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "loadCenterInfo", function (activeType) {
            var _this = this;
            $.AKjs.App.LatestActivityTime = null;
            $.AKjs.App.LastActivityTime = null;
            _this.clearMain();
            $.AKjs.Activity(_this.$ActMain, "", "", activeType);

            var _$rightDv = $("#ACT-APP-RIGHT");
            _$rightDv.find(".ACT-RIGHT-COMMON").show();
            _$rightDv.find(".ACT-RIGHT-CUSTOM").remove();
            _$rightDv.find("#ACT-MYCLUB").html("");
            $.AKjs.LoadHotClubs(_$rightDv.find("#ACT-MYCLUB"));
            _$rightDv.find("#ACT-PUBLICCLUB").html("");
            $.AKjs.LoadPublicClubs(_$rightDv.find("#ACT-PUBLICCLUB"));
            $.AKjs.AddressBook(_$rightDv);
            $(".unreadmsg_count").html("");
            $.cookie("UnReadMsgCount", "", { path: '/' });

            this.bindPageEvent(this.$ActMain);

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "load", function () {
            // $("#ACT-APP-LEFT").remove();
            // $("#ACT-PIN-NAVI").pin();
            // $("#dvTable").footable();
            this.getUrl();
            var _$mainDv = $("#ACT-APP-MAIN");
            var _$rightDv = $("#ACT-APP-RIGHT");
            var _$leftDv = $("#ACT-LEFT-MENU");
            this.$ActLeftMenu = _$leftDv;
            // Ataw.msgbox.show(" 正在加载，请稍后...", 6);
            if (_$leftDv.length > 0 && this.$ActMap.length > 0) {
                this.loadMenu(_$leftDv, this.$ActMap);
            }
            else {
                this.urlOpen();
            }
            var _this = this;
            //            this.$ActAppLeftBt = $("#ACT-APP-LEFT-BT");
            //            this.$ActAppRightBt = $("#ACT-APP-RIGHT-BT");

            this.$ActAppLeftBt.bind("click", function () {
                var _name = _this.LayOutState.charAt(0) == 'V' ? "T" : "V";
                _name = _name + _this.LayOutState.substring(1, 3);
                _this.layOutTransForm(_name);

            });

            this.$ActAppRightBt.bind("click", function () {
                var _name = _this.LayOutState.charAt(2) == 'V' ? "T" : "V";
                _name = _this.LayOutState.substring(0, 2) + _name;
                _this.layOutTransForm(_name);
            });

            this.$ActAppBt.bind("click", function () {

                if (_this.LayOutState == "TTT") {
                    var _name = "VTV";
                    //原来是左右都显示，所以需要左右都隐藏
                    _this.layOutTransForm(_name);
                } else if (_this.LayOutState == "VTV") {
                    //原来是左右都隐藏，所以需要左右都显示
                    var _name = "TTT";
                    _this.layOutTransForm(_name);
                } else {
                    //其他状态，左右都隐藏
                    var _name = "VTV";
                    _this.layOutTransForm(_name)
                }
            });


            $.AKjs.getJSON("/Right/Users/GetUserScreenMode", {}, _fun0);

            function _fun0(res) {
                var _name = "TTT";
                switch (res) {
                    case "0":
                        _name = "TTT";
                        break;
                    case "1":
                        _name = "VTV";
                        break;
                    case "2":
                        _name = "VTT";
                        break;
                    case "3":
                        _name = "TTV";
                        break;
                    default:
                        _name = "TTT";
                        break;
                }
                _this.layOutTransForm(_name);
            }



            //--------主题切换------
            $('.theme-switch li a').click(function () {
                $('.theme-switch li a').removeClass('selected');
                var _theme = $(this).attr('class');
                $.cookie('theme', _theme, { path: '/' });
                if (_theme.length > 1) {
                    $("#LinkBootStrap").attr("href", "/Content/bootstrap/v3/css/swatch/" + _theme + "/bootstrap.css");
                    var _selector = '.' + _theme;
                    $(_selector).addClass('selected');
                }
            });
            this.bindPageEvent();
            return this;
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "pushHistory", function (anchor) {
            if (!anchor) return;
            var hisLenth = this.History.length;
            if (hisLenth == 0 || this.History[hisLenth - 1] !== anchor) {
                this.History.push(anchor);
                if (hisLenth > 0) {
                    var $back = this.$PinNavi.find(".icon-reply").parent().removeAttr("style");
                }
            }
        })

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "backHistory", function () {
            if (this.History.length < 2) return;
            this.History.pop();
            var anchor = this.History[this.History.length - 1];
            this.openUrl(anchor);
            return this.History.length;
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "gotoMenuLoction", function (key) {
            var menu = this.getMenuByKey(key);
            if (!menu) { menu = { Arrange: "000", CODE_VALUE: "0" }; }
            var _obj = this.$ActLeftMenu.AtawControl();
            if (_obj) {
                if (_obj.length && _obj.length > 0) {
                    _obj[0].open(menu.Arrange);
                } else
                    _obj.open(menu.Arrange);
            }
            _obj = this.$ActMap.AtawControl();
            if (_obj) {
                if (_obj.length && _obj.length > 0) {
                    _obj[0].open(menu.Arrange);
                } else
                    _obj.open(menu.Arrange);
            }
            this.CurrentMenuKey = menu.CODE_VALUE;
        });
        //格式 {navi:{},search:{},page:{},tablename:xxx,pagestyle:"",keys:""}
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "formartPageState", function (pagestyle, param) {
            var pageState = {}
            pageState.ds = {};
            if (pagestyle && param) {
                pagestyle = pagestyle.toUpperCase();
                param = $.parseJSON(Base64.decode(param));
                if (param.afterPageFun) {
                    pageState.afterPageFun = param.afterPageFun;
                }
                if (param.additionData) {
                    pageState.additionData = param.additionData;
                }
                switch (pagestyle) {
                    case "INSERT":
                        if (param.keys) {
                            var keys = param.keys.split(",");
                            pageState.ds["_KEY"] = [{ "KeyValue": keys[0]}];
                        }
                        break;
                    case "UPDATE":
                    case "DETAIL":
                        if (param.keys) {
                            var keys = param.keys.split(",");
                            pageState.ds["_KEY"] = [];
                            for (var i = 0; i < keys.length; i++) {
                                pageState.ds["_KEY"].push({ "KeyValue": keys[i] });
                            }
                        }
                        break;
                    default:
                        if (param.tablename && (param.navi || param.search)) {
                            pageState.ds[param.tablename + "_SEARCH"] = [$.extend({}, param.navi, param.search)];
                        }
                        if (param && param.page) {
                            pageState.ds["PAGER"] = [param.page];
                        }
                        if (param && param.formType) {
                            pageState.formType = param.formType;
                        }
                        break;
                }
            }
            return pageState;

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getMenuByKey", function (key) {
            if (!key) return null;
            return _fun(this.MenuData);
            function _fun(menuData) {
                if (menuData.CODE_VALUE === key || (menuData.ExtData && menuData.ExtData.RightValue === key)) {
                    return menuData;
                }
                for (var i = 0; i < menuData.Children.length; i++) {
                    var returnMenuData = _fun(menuData.Children[i]);
                    if (returnMenuData) {
                        return returnMenuData;
                    }
                }
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setUrlAnchor", function (anchor) {
            if (!anchor) return;
            location.hash = anchor;
            this.pushHistory(anchor);
        });

        //------------------布局变换
        this.LayOut = {};
        this.LayOut.VTV = [0, 12, 0];
        this.LayOut.TTV = [2, 10, 0];
        this.LayOut.TTT = [2, 8, 2];
        this.LayOut.VTT = [0, 10, 2];
        this.LayOutState = "TTT";

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "layOutTransForm", function (name) {
            for (var col in this.LayOut) {
                if (col != name) {
                    var _lot = this.LayOut[col];
                    this.$ActAppMain.toggleClass("col-md-" + _lot[1], false);
                    this.$ActAppRight.toggleClass("col-md-" + _lot[2], false);
                    this.$ActAppLeft.toggleClass("col-md-" + _lot[0], false);
                }
            }
            var _lot = this.LayOut[name];
            this.$ActAppMain.toggleClass("col-md-" + _lot[1], true);
            this.$ActAppRight.toggleClass("col-md-" + _lot[2], true);
            this.$ActAppLeft.toggleClass("col-md-" + _lot[0], true);

            this.$ActAppMain.toggleClass("ACT-FIRST-SPAN", name == "VTV" || name == "VTT");

            //icon-double-angle-left
            this.$ActAppRightBt.find("i").SwitchClass("icon-double-angle-left fa fa-angle-double-left", "icon-double-angle-right fa fa-angle-double-right", name == "VTT" || name == "TTT");
            this.$ActAppLeftBt.find("i").SwitchClass("icon-double-angle-up fa fa-angle-double-up", "icon-double-angle-down fa fa-angle-double-down", name == "TTT" || name == "TTV");
            switch (name) {
                case "TTT":
                    if (this.$ActAppBt.find("i").hasClass("icon-align-justify fa fa-align-justify")) {
                        this.$ActAppBt.find("i").removeClass('icon-align-justify fa fa-align-justify');
                    }
                    if (this.$ActAppBt.find("i").hasClass("icon-exchange fa fa-exchange")) {

                        this.$ActAppBt.find("i").removeClass('icon-exchange fa fa-exchange');
                    }
                    this.$ActAppBt.find("i").addClass("icon-align-center fa fa-align-center");
                    break;
                case "VTV":
                    if (this.$ActAppBt.find("i").hasClass("icon-align-center fa fa-align-center")) {
                        this.$ActAppBt.find("i").removeClass('icon-align-center fa fa-align-center');
                    }
                    if (this.$ActAppBt.find("i").hasClass("icon-exchange fa fa-align-center")) {

                        this.$ActAppBt.find("i").removeClass('icon-exchange fa fa-align-center');
                    }
                    this.$ActAppBt.find("i").addClass("icon-align-justify fa fa-align-justify");
                    break;
                default:
                    if (this.$ActAppBt.find("i").hasClass("icon-align-justify fa fa-align-justify")) {
                        this.$ActAppBt.find("i").removeClass('icon-align-justify fa fa-align-justify');
                    }
                    if (this.$ActAppBt.find("i").hasClass("icon-align-center  fa fa-align-center")) {

                        this.$ActAppBt.find("i").removeClass('icon-align-center  fa fa-align-center');
                    }
                    this.$ActAppBt.find("i").addClass("icon-exchange fa fa-exchange");
                    break;
            }



            this.LayOutState = name;
            switch (this.LayOutState) {
                case "TTT":
                    $.AKjs.getJSON("/Right/Users/SetUserScreenMode", { screenMode: 0 });
                    break;
                case "VTV":
                    $.AKjs.getJSON("/Right/Users/SetUserScreenMode", { screenMode: 1 });
                    break;
                case "VTT":
                    $.AKjs.getJSON("/Right/Users/SetUserScreenMode", { screenMode: 2 });
                    break;
                case "TTV":
                    $.AKjs.getJSON("/Right/Users/SetUserScreenMode", { screenMode: 3 });
                    break;
                default:
                    $.AKjs.getJSON("/Right/Users/SetUserScreenMode", { screenMode: 0 });
                    break;

            }
            // alert();
            this.resetTable();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "resetTable", function () {
            // alert(this.$ActAppMain.find(".ACT-GRID-TABLE").length + "布局");
            var _obj = this.$ActAppMain.find(".ACT-GRID-TABLE").data('footable');
            if (_obj) {
                _obj.resize();
                // alert("gggg");
            }
            else {
                this.$ActAppMain.find(".ACT-GRID-TABLE").footable();
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "loadSNSUserHomePage", function (id) {
            $.AKjs.App.LatestActivityTime = null;
            $.AKjs.App.LastActivityTime = null;
            this.clearMain();
            $.AKjs.UserHome(this.$ActMain, $("#ACT-APP-RIGHT"), id);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "loadMyHomePage", function (id) {
            $.AKjs.App.LatestActivityTime = null;
            $.AKjs.App.LastActivityTime = null;
            this.clearMain();
            $.AKjs.MyHome(this.$ActMain, $("#ACT-APP-RIGHT"), id);
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "loadSNSClubHomePage", function (id) {
            var _this = this;
            $.AKjs.getJSON("/sns/home/IsClubExist", { clubID: id }, function (res) {
                if (res == "1") {
                    $.AKjs.App.LatestActivityTime = null;
                    $.AKjs.App.LastActivityTime = null;
                    _this.clearMain();
                    $.AKjs.ClubHome(_this.$ActMain, $("#ACT-APP-RIGHT"), id);
                }
            });
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "notifyMesg", function (msg) {
            $.AKjs.asynJs([
             "/AtawStatic/lib/03Extend/messenger/js/messenger.js",
             "/AtawStatic/lib/03Extend/messenger/css/messenger.css"
            ], function () {
                $.globalMessenger().post({
                    message: msg,

                    showCloseButton: true,
                    hideAfter: 6,
                    hideOnNavigate: true
                });
            });
        });
    }

})(jQuery);