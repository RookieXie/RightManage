(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};
    $.AKjs.AtawNodeClient = function (options) {
        return $.extend({}, $.AKjs.AtawBaseDom(options), new AtawNodeClient()).sysCreator();
    }

    $.AKjs.NodeClient = null;
    $.AKjs.LoginId = null;

    $.AKjs.NodeClientGet = function (options) {

        if ($.AKjs.NodeClient != null) {
            return $.AKjs.NodeClient;
        }
        else {
            return $.AKjs.NodeClient = $.AKjs.AtawNodeClient(options);
        }
    }

    function AtawNodeClient(options) {
        this.Url = null;
        this.Socket = null;
        this.FirstEvent = true;
        this.IO_Path = "/AtawStatic/lib/03Extend/socketio/socket.io.min.js";

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "creator", function () {
            this.setProByOptName("Url", "Url");

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "showInfo", function () {
            var so = this.Socket.socket;
            var _info = "connected: " + so.connected + "</br>" +
            "connecting:" + so.connecting + "</br>" +
            "open:  " + so.open + "</br>" +
           " sessionid:  " + so.sessionid + "</br>" +
            "reconnecting:  " + so.reconnecting + "</br>";
            $("#roomContent").html(_info);

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "setNewMessageCount", function () {
            var latestTime = $("#ACT_TOP_MENU .ACT-UNREADMSG-COUNT").attr("latesttime");
            $.AKjs.getJSON("/core/Desk/GetNewMessages", { lateTime: latestTime }, function (res) {
                if (res.length > 0) {
                    var oldCount = parseInt($(".ACT-UNREADMSG-COUNT").text());
                    $(".ACT-UNREADMSG-COUNT").text(oldCount + res.length);
                    $(".ACT-UNREADMSG-COUNT").attr("latesttime", res[0]["CREATE_TIME"]);
                }
                for (var i = 0; i < res.length; i++) {
                    var _type = res[i]["TYPE"];
                    var _$li = $("#ACT_TOP_MENU li[name='" + _type + "']");
                    if (_$li.length > 0) {
                        var _$label = _$li.find("label");
                        var _strCount = _$label.text();
                        var typeCount = _strCount .AisEmpty() ? 1 : parseInt(_strCount) + 1;
                        _$label.text(typeCount);
                    }
                }
            });
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "clear", function () {
            $.cookie("UnReadMsgCount", 0, { path: '/' });
            $(".unreadmsg_count").html("");

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "notify", function () {
            if (!$.AKjs.App.IsDesk && $(".unreadmsg_count").length > 0) {
                //var _msgCount = $(".unreadmsg_count").html();
                var _msgCount = $.cookie("UnReadMsgCount");
                if (!_msgCount) _msgCount = "0";
                if (_msgCount .AisEmpty()) {
                    _msgCount = "1";
                    $(".unreadmsg_count").html(_msgCount);
                }
                else {
                    //if()
                    _msgCount = (parseInt(_msgCount) + 1).toString();
                    $(".unreadmsg_count").html(_msgCount);
                }
                $.cookie("UnReadMsgCount", _msgCount, { path: '/' });
            }
            if (!$.AKjs.App.IsPushNotice)
                return;
            //            var _type = $appMainDom.find(".active").attr("activity_type");
            //            if (_type != "all")
            //                return;
            this.setNewMessageCount();
            var _latestTime = $.AKjs.App.LatestActivityTime;
            if (_latestTime == null)
                _latestTime = "";
            var $appMainDom = $.AKjs.AppGet().R.getMain$DomR();
            var _type = $appMainDom.find("li.active[activity_type ='all']");
            if (_type.length == 0)
                return;
            var _clubId = $appMainDom.find(".ACT-CLUB-INFO").attr("club_id");
            if (!_clubId)
                _clubId = "";
            $.AKjs.getJSON("/module/module?LatestTime=" + _latestTime + "&ClubID=" + _clubId, { xml: "module/sns/activity/sns_activities.xml", pageStyle: "List" }, function (res) {
                //                var _dt = res.Data["SNS_ACTIVITIES"];
                //                if ($.AKjs.App.LatestActivityTime != null) {
                //                    for (var _i = 0; _i < _dt.length; _i++) {
                //                        var _createTime = _dt[_i]["CREATE_TIME"];
                //                        if (_createTime > $.AKjs.App.LatestActivityTime) {
                //                            var _activityType = _dt[_i]["ACTIVITYITEMTYPE"];
                //                            $appMainDom.find(".sns_nav").find("li[activity_type='" + _activityType + "']").addClass("activity_new");
                //                        }
                //                    }
                //                }
                //当有新的动态时，需要更新最新的动态时间
                var _dt = res.Data["SNS_ACTIVITIES"];
                if (_dt.length > 0)
                    $.AKjs.App.LatestActivityTime = _dt[0]["CREATE_TIME"];

                // $.AKjs.App.$ActAppMain.find(".activities_main").html("");
                //$.AKjs.App.$ActAppMain.find(".activities_main_new").html("");
                var _form = res.Forms["SNS_ACTIVITIES"];
                _form.HasPager = false;
                _form.FormType = "Activity";
                var _op = { Data: res.Data, Form: _form };
                //$.AKjs.App.$ActAppMain.find(".activities_main").AtawActivityForm(_op);
                $appMainDom.find(".activities_main_new").AtawActivityForm(_op);
                var _$newactivityRowList = $appMainDom.find(".activities_main_new li.qing_row");
                var _$oldactivityRowList = $appMainDom.find(".activities_main li.qing_row");
                if (_$oldactivityRowList.length > 0) {
                    $(_$oldactivityRowList[0]).before(_$newactivityRowList);
                }
                else {
                    $appMainDom.find(".activities_main ul.qing_messages").append(_$newactivityRowList);
                }
                $appMainDom.find(".activities_main_new").html("");
                $.AKjs.App.notifyPage();
                $.AKjs.App.bindPageEvent($appMainDom);
            });

            //            $.AKjs.getJSON("/module/module", { xml: "module/workflow/topMyWork.xml", pageStyle: "List" }, function (res) {
            //                var _dt = res.Data["TopMyWork"];

            //                var _form = res.Forms["TopMyWork"];
            //                _form.HasPager = false;
            //                _form.FormType = "Activity";
            //                var _op = { Data: res.Data, Form: _form };
            //                $appMainDom.find(".activities_main_mywork").html("").AtawActivityForm(_op);
            //                $appMainDom.find(".activities_main_mywork>.qing_main").addClass("commentsActivety");
            //                $.AKjs.App.bindPageEvent($appMainDom);
            //            });
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "connEvent", function () {
            var _this = this;

            this.asynJs(this.IO_Path, function () {


                _this.Socket.on('error', function (ex) {
                    _this.notifyMesg("发生异常");
                    _this.showInfo();
                });

                _this.Socket.on('disconnect', function () {
                    _this.notifyMesg("断线了");
                    _this.showInfo();
                });
                _this.Socket.on('resclientid', function (a) {
                    //_this.notifyMesg("断线了");
                    _this.notifyMesg(a);
                    _this.showInfo();
                });

                _this.Socket.on('notify', function (a) {
                    //_this.notifyMesg("断线了");
                    _this.notifyMesg("有消息到达...");
                    //                if (typeof (playMp3) != undefined) {
                    playMp3();
                    //                }
                    _this.showInfo();
                    _this.notify();
                });
                _this.Socket.on('route', function (a) {
                    if (a.RouteData && a.RouteData.ControllerName && a.RouteData.ActionName) {
                        var _cname = a.RouteData.ControllerName;
                        var _aName = a.RouteData.ActionName;
                        var _aknController = $.AKjs.AkNode[_cname];
                        if (_aknController) {

                            var _aknAction = _aknController[_aName];
                            if (_aknAction) {
                                _aknAction(a);
                            }
                            else {
                                $.AKjs.App.notifyMesg("名称为  " + _aName + "   的action 未在" + _cname + "  中指定  ");
                            }
                        }
                        else {
                            $.AKjs.App.notifyMesg("名称为  " + _cname + "   的控制器未指定  ");
                        }
                    }
                    else {
                        $.AKjs.App.notifyMesg("未指定路由信息");
                    }
                });

            });

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "init", function () {
            var _this = this;


            this.asynJs(this.IO_Path, function () {


                _this.Socket = io.connect(_this.Url);

                if (_this.FirstEvent) {
                    _this.Socket.on('connect', function (msg) {
                        _this.notifyMesg("欢迎来到Ataw大平台。。。");
                        _this.showInfo();
                        if ($.AKjs.LoginId != null) {
                            _this.Socket.emit("setclientid", $.AKjs.LoginId);
                        } else {
                            alert("请登录");
                        }

                        if (_this.FirstEvent) {
                            _this.FirstEvent = false;
                            _this.connEvent();
                        }

                    });
                }
            });





        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "notifyMesg", function (msg) {
            $.AKjs.App.notifyMesg(msg);

        });

    }

})(jQuery);