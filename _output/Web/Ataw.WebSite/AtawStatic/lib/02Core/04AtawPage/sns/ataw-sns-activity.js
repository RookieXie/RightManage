(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.AKjs.Activity = function ($mainObj, clubId, userId, defaultActiveType) {
        defaultActiveType = defaultActiveType ? defaultActiveType : "";
        //		var _$mainDiv = $("<div class='UI_DeskTop_Module well clearfix activity_main'><h2>动态板</h2></div>");
        var _$mainDiv = $("<div class='activity_main panel panel-default'></div>");
        $mainObj.append(_$mainDiv);
        var _$dv1 = $("<div/>");
        var _$dv2 = $("<div id='sns_activities' />");
        _$mainDiv.append(_$dv1);
        _$mainDiv.append(_$dv2);
        _$dv1.AtawPublishBrand();
        //		var _strInputMicroBlog = "<div class='UI_DeskTop_Module well clearfix'>" +
        //                "<textarea class='input_weibo' style='overflow-y: visible; width: 100%; resize: none' innertext='说点什么吧...' placeholder='说点什么吧...'></textarea>" +
        //                "<a class='btn-success btn btn-action publishWeibo' data-bootstro-content='加入圈子后才可发布' data-bootstro-placement='bottom'><span>发布</span> </a></div>";
        //        var _strInputMicroBlog = "<div  class=' aks-paddingfull '>" +
        //        "<div>" +
        //          "<a class=' btn   publishWeibo  '><i class=' icon-pencil'>文字</i> </a>" +
        //         "<a class=' btn  publishWeibo  ACT-A-HREF'  href='$$module/SNS/Personal/DataManagement/SNS_ARTICLES$Insert$'><i class=' icon-file-alt'>文章</i> </a>" +
        //                 "<a class=' btn   publishWeibo '><i class=' icon-cloud-upload'>文件/图片</i> </a>" +
        //                  "<a class=' btn  publishWeibo '><i class='  icon-coffee'>日常事务</i> </a>" +
        //                    "<a class=' btn  publishWeibo '><i class=' icon-tasks'>综合事务</i> </a>" +
        //                   "<a class=' btn  publishWeibo '><i style='float:right' class=' icon-sort-down'></i>全部&nbsp;&nbsp;</a>" +
        //                  "</div>" +
        //                "<div class='popoverNolimitW bottom' style='top:45px;left:13px;width:720px;'><div class='arrow' style='left:35px;'></div><div class='popoverNolimitW-content'><textarea class='input_weibo form-control' style='width:100%;height:34px;' innertext='我正在做什么呢？' placeholder='我正在做什么呢？'></textarea></div></div>" +


        //                "</div>";
        //        _$dv1.append($(_strInputMicroBlog));
        //        if ($.AKjs.App.IsDesk) {
        //            var _strPrivacy = "<div class='container' style='height:45px;'></div>";
        //            //            + "<div class='btn-group weibo_privacy aks-paddingfull'><a class='btn btn-default dropdown-toggle' data-toggle='dropdown'>" +
        //            //                              "<span class='current_privacy' name='ToAllPeople'>公开</span><span class='caret'></span></a><ul class='dropdown-menu'>" +
        //            //                              "<li text='公开' name='ToAllPeople'><a>公开</a></li><li text='部门' name='ToDepartment'><a>部门</a></li>" +
        //            //                              "<li text='个人' name='ToUser'><a>个人</a></li><li text='自己' name='ToMyself'><a>自己</a></li></ul></div>";
        //            _$dv1.append($(_strPrivacy));
        //            var _$selector = $("<div class='selector' style='display:none'></div>");
        //            // _$dv1.append(_$selector);
        //            _$dv1.find(".weibo_privacy li").unbind("click").bind("click", function () {
        //                _$dv1.find(".current_privacy").html($(this).attr("text"));
        //                _$dv1.find(".current_privacy").attr("name", $(this).attr("name"));
        //                if ($(this).attr("text") == "部门") {
        //                    if (_$selector.is(":hidden")) {
        //                        _$selector.show();
        //                    }
        //                    else {
        //                        _$selector.html("");
        //                    }
        //                    _$selector.AtawTreeSingleSelector({ RegName: "DepartmentCodeTable" });
        //                    _$selector.find("span").css("width", "20%");
        //                }
        //                else if ($(this).attr("text") == "个人") {
        //                    if (_$selector.is(":hidden")) {
        //                        _$selector.show();
        //                    }
        //                    else {
        //                        _$selector.html("");
        //                    }
        //                    _$selector.AtawSelector({ RegName: "MRPUserCodeData" });
        //                    _$selector.find("span").css("width", "20%");
        //                    _$selector.removeClass("ACT-SELECTBOX-PARENT");
        //                }
        //                else {
        //                    _$selector.html("");
        //                    _$selector.hide();
        //                }
        //            });

        //        }

        //        var _strNav = "<div class='tabIndex'><ul class='clearfix sns_nav'>" +
        //                     "<li style='float: left' class='sns_nav_item nav_all sns_nav_selected' activity_type='all'><a style='padding: 0 10px'>全部</a></li>" +
        //                     "<li style='float: left' class='sns_nav_item nav_microblog' activity_type='MicroBlog'><a style='padding: 0 10px'>微博</a></li>" +
        //                     "<li style='float: left' class='sns_nav_item nav_workflow' activity_type='WorkFlow'><a style='padding: 0 10px'>工作流</a></li></ul></div>";
        var _strNav = "<div class='tabIndex'><ul class='aks-paddingfull nav nav-pills sns_nav'>" +
        //         '<li class="dropdown">' +
        //          '<a class="dropdown-toggle" data-toggle="dropdown" href="#">' +
        //            '<i class="icon-cloud"></i> <span class="caret"></span>' +
        //          '</a>' +
        //          '<ul class="dropdown-menu" role="menu">' +
        //            '<li><a href="#">全部</a></li>' +
        //            '<li class="divider"></li>' +
        //             '<li><a href="#dropdown1" tabindex="-1" data-toggle="tab"><i class="icon-check"></i>日常应用</a></li>' +
        //           '<li><a href="#dropdown1" tabindex="-1" data-toggle="tab">知识库</a></li>' +
        //            '<li><a href="#dropdown2" tabindex="-1" data-toggle="tab">人事中心</a></li>' +
        //             '<li><a href="#dropdown2" tabindex="-1" data-toggle="tab">资产管理</a></li>' +
        //          '</ul>' +
        //        '</li>'+
        "<li activity_type='all' class='active'><a href='javascript:void()'>全部</a></li>" +

        //                     "<li activity_type='MicroBlog'><a href='javascript:void()'>微博</a></li>" +
                      '<li  activity_type="WorkFlow" class="dropdown">' +
          '<a href="#" id="myTabDrop1" >事务 </a>' +
        //          '<ul class="dropdown-menu" role="menu" aria-labelledby="myTabDrop1">' +
        //            '<li><a href="#dropdown1" tabindex="-1" data-toggle="tab"><i class=" icon-check"></i>周报</a></li>' +
        //            '<li><a href="#dropdown2" tabindex="-1" data-toggle="tab"><i class=" icon-check"></i>任务</a></li>' +
        //             '<li><a href="#dropdown2" tabindex="-1" data-toggle="tab"><i class=" icon-check"></i>加班</a></li>' +
        //          '</ul>' +
        '</li>' +
                       "<li ><a href='javascript:void()'>与我相关</a></li>" +
                         "<li ><a href='javascript:void()'>关注的人</a></li>" +
                          '  <li class="dropdown">' +
          '<a href="#" id="myTabDrop1" >圈 </a>' +
        //          '<ul class="dropdown-menu" role="menu" aria-labelledby="myTabDrop1">' +
        //            '<li><a href="#dropdown1" tabindex="-1" data-toggle="tab"><i class=" icon-check"></i>大平台改善小组</a></li>' +
        //           ' <li><a href="#dropdown2" tabindex="-1" data-toggle="tab"><i class=" icon-check"></i>晓</a></li>' +
        //             '<li><a href="#dropdown2" tabindex="-1" data-toggle="tab"><i class=" icon-check"></i>共济会</a></li>' +
        //         ' </ul>' +
       " </li>" +
                             "<li activity_type='MyWork'><a class='btn btn-default' href='javascript:void()'>待处理事务</a></li>" +
                              "<li  activity_type='fullcalendar'><a class='btn btn-default' href='javascript:void()'>日历</a></li>" +
                     "</ul></div>";

        _$dv2.append($(_strNav));
        var $myWork = $("<div class='activities_main_mywork'/>");
        _$dv2.append($myWork);

        _$dv2.append("<div class='activities_main_new'/>")
        _$dv2.append("<div class='activities_main'/>")
        _$dv2.append("<div class='activities_main_old'/>")

        _$dv2.append("<div class='activity_more' style='text-align:center;display:none'><a class='activity_more_action'><i class='icon-large icon-double-angle-down fa fa-angle-double-down'></i>展开更多</a></div>");

       // Ataw.msgbox.show(" 正在加载，请稍后...", 6);
        //initMyWork($myWork, $mainObj);
        var _url = clubId ? "/module/module?ClubID=" + clubId : "/module/module";
        _url = userId ? "/module/module?UserID=" + userId : _url;

        defaultActiveType = defaultActiveType.toLowerCase();
        switch (defaultActiveType) {
            case "mywork":
                defaultActiveType = "MyWork";
                break;
            case "microblog":
                defaultActiveType = "MicroBlog";
                break;
            case "workflow":
                defaultActiveType = "WorkFlow";
                break;
            default:
                defaultActiveType = "all";
                break;
        }
        _$dv2.find(".sns_nav li").each(function () {
            if ($(this).attr("activity_type") === defaultActiveType) {
                $(this).siblings().removeClass("active");
                $(this).addClass("active");
                $(this).removeClass("activity_new");
            }
        })
        if (defaultActiveType === "MyWork") {
            initMyWork($myWork, $mainObj);
            _$dv2.find(".activities_main").html("");
        }
        else {
            var _defaultds = {};
            var _defaultdt = _defaultds["SNS_ACTIVITIES_SEARCH"] = [];
            var _defaultrow = { ACTIVITYITEMTYPE: defaultActiveType };
            _defaultdt.push(_defaultrow);
            var _defaultstrDs = defaultActiveType == "all" ? "" : $.toJSON(_defaultds);
            $.AKjs.getJSON(_url, { xml: "module/sns/activity/sns_activities.xml", ds: _defaultstrDs, pageStyle: "List" }, function (res) {
                var _dt = res.Data["SNS_ACTIVITIES"];
                if ($.AKjs.App.LatestActivityTime == null && _dt.length > 0) {
                    $.AKjs.App.LatestActivityTime = _dt[0]["CREATE_TIME"];
                    $.AKjs.App.LastActivityTime = _dt[_dt.length - 1]["CREATE_TIME"];
                    _$dv2.find(".activity_more").show();
                    _$dv2.find(".activity_more a.activity_more_action").click(function () {
                        loadData(userId, clubId);
                    });
                }
                var _form = res.Forms["SNS_ACTIVITIES"];
                _form.HasPager = false;
                _form.FormType = "Activity";
                var _op = { Data: res.Data, Form: _form };
                _$dv2.find(".activities_main").AtawActivityForm(_op);
                //$.AKjs.App.notifyPage();
                $.AKjs.App.bindPageEvent($mainObj);
            });
        }
        _$dv2.find(".sns_nav li").bind("click", function () {
            //            $(this).siblings().removeClass("sns_nav_selected");
            //            $(this).addClass("sns_nav_selected");
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
            $(this).removeClass("activity_new");
            var activityType = $(this).attr("activity_type");
            //$.AKjs.App.setUrlAnchor("$CenterInfo$" + activityType);
            $myWork.html("");
            _$dv2.find(".activities_main").html("");
            switch (activityType) {
                case "MyWork":
                    initMyWork($myWork, $mainObj);
                    _$dv2.find(".activities_main").html("");
                    break;
                case "fullcalendar":
                    //alert(123);
                    _$dv2.find(".activities_main").html("<div id='ACT-CALENDAR' style='margin:10%' />");

                    _$dv2.find(".activities_main").find("#ACT-CALENDAR").AtawCalendarPage();

                    break;
                default:
                    var _ds = {};
                    var _dt = _ds["SNS_ACTIVITIES_SEARCH"] = [];
                    var _row = { ACTIVITYITEMTYPE: $(this).attr("activity_type") };
                    _dt.push(_row);
                    var _strDs = activityType == "all" ? "" : $.toJSON(_ds);
                    $.AKjs.getJSON(_url, { xml: "module/sns/activity/sns_activities.xml", ds: _strDs, pageStyle: "List" }, function (res) {
                        var _dt = res.Data["SNS_ACTIVITIES"];
                        if (_dt.length > 0) {
                            $.AKjs.App.LastActivityTime = _dt[_dt.length - 1]["CREATE_TIME"];
                        }
                        _$dv2.find(".activities_main").html("");
                        var _form = res.Forms["SNS_ACTIVITIES"];
                        _form.HasPager = false;
                        _form.FormType = "Activity";
                        var _op = { Data: res.Data, Form: _form };
                        _$dv2.find(".activities_main").AtawActivityForm(_op);
                        $.AKjs.App.notifyPage();
                        $.AKjs.App.bindPageEvent($mainObj);
                    });
                    break;
            }


            return false;
        });

        _$dv1.find(".input_weibo").focus(function () {
            if ($(this).val() == $(this).attr("innertext")) {
                $(this).val("");
            }
        });
        _$dv1.find(".publishWeibo").click(function () {
            var _text = _$dv1.find(".input_weibo").val();
            if (_text .AisEmpty()) return;
            var _ds = {};
            var _rows = _ds["SNS_MICROBLOGS"] = [];
            var _row = { FID: null, BODY: null, ORIGINALID: null, FORWARDEDID: null };
            _row["BODY"] = _$dv1.find(".input_weibo").val();

            _rows.push(_row);
            var _dt = _ds["ACTIVITIES_PRIVACY"] = [];
            var _row2 = { CLUBID: clubId, CLUBNAME: null, PRIVACYSTATUS: null, OWNERID: null };
            if (clubId && !clubId .AisEmpty()) {
                _row2["CLUBNAME"] = $mainObj.find(".club_info").attr("club_name");
                _row2["OWNERID"] = clubId;
                _row2["PRIVACYSTATUS"] = "ToClub";
            }
            if ($.AKjs.App.IsDesk) {
                var _privacy = _$dv1.find(".current_privacy").attr("name");
                _row2["PRIVACYSTATUS"] = _privacy;
                if (_privacy == "ToDepartment" || _privacy == "ToUser") {
                    var _id = _$dv1.find(".selector").AtawControl().dataValue();
                    _row2["OWNERID"] = _id;
                }
            }
            _dt.push(_row2);
            $.AKjs.getJSON("/module/modulemerge", { xml: "module/sns/microblog/sns_microblogs.xml", ds: $.toJSON(_ds), pageStyle: "Insert" }, function (res) {
                if (res > 0) {
                    Ataw.msgbox.show("发布成功", 4, 5000);
                    //                    $.AKjs.getJSON("/SNSActivity/GetNewActivity", null, function (data) {
                    //                        _$dv2.find(".qing_messages").children(':first').before(data);
                    //                        $.AKjs.App.notifyPage();
                    //                    });
                }
            });
            _$dv1.find(".input_weibo").val("");
        });

    }
    var totalheight = 0;
    function initMyWork($myWork, $mainObj) {
        $.AKjs.getJSON("/module/module", { xml: "module/workflow/topMyWork.xml", pageStyle: "List" }, function (res) {
            var _dt = res.Data["TopMyWork"];
            var _form = res.Forms["TopMyWork"];
            _form.HasPager = false;
            _form.FormType = "Activity";
            var _op = { Data: res.Data, Form: _form };
            $myWork.html("").AtawActivityForm(_op);
            $myWork.find(".qing_main").addClass("panel-primary");
            $.AKjs.App.bindPageEvent($mainObj);
        });
    }
    function loadData(userId, clubId) {
        //totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());

        //if ($(document).height() <= totalheight) {
        //加载数据
        if ($.AKjs.App.$ActAppMain.find(".activities_main li.qing_row").length < 50) {
            var _lastTime = $.AKjs.App.LastActivityTime;
            if (_lastTime == null)
                return;
            var _ds = {};
            var _dt = _ds["SNS_ACTIVITIES_SEARCH"] = [];
            //                var _type = $.AKjs.App.$ActAppMain.find("#sns_activities ul.sns_nav li.sns_nav_selected").attr("activity_type");
            var _type = $.AKjs.App.$ActAppMain.find("#sns_activities ul.sns_nav li.active").attr("activity_type");
            var _row = { ACTIVITYITEMTYPE: _type };
            _dt.push(_row);
            var _strDs = _type == "all" ? "" : $.toJSON(_ds);
            var _url = "/module/module?LastTime=" + _lastTime;
            _url = clubId ? _url + "&ClubID=" + clubId : _url;
            _url = userId ? _url + "&UserID=" + userId : _url;
            $.AKjs.getJSON(_url, { xml: "module/sns/activity/sns_activities.xml", ds: _strDs, pageStyle: "List" }, function (res) {
                var _dt = res.Data["SNS_ACTIVITIES"];
                if (_dt.length > 0) {
                    $.AKjs.App.LastActivityTime = _dt[_dt.length - 1]["CREATE_TIME"];
                    // tempTime = $.AKjs.App.LastActivityTime;
                }
                var _form = res.Forms["SNS_ACTIVITIES"];
                _form.HasPager = false;
                _form.FormType = "Activity";
                var _op = { Data: res.Data, Form: _form };
                $.AKjs.App.$ActAppMain.find(".activities_main_old").AtawActivityForm(_op);
                var _$oldactivityRowList = $.AKjs.App.$ActAppMain.find(".activities_main_old li.qing_row");
                var _$currentactivityRowList = $.AKjs.App.$ActAppMain.find(".activities_main li.qing_row");
                $.AKjs.App.$ActAppMain.find(".activities_main ul.qing_messages").append(_$oldactivityRowList);
                $.AKjs.App.$ActAppMain.find(".activities_main_old").html("");
                $.AKjs.App.notifyPage();
                $.AKjs.App.bindPageEvent($.AKjs.App.$ActAppMain);

                if ($.AKjs.App.$ActAppMain.find(".activities_main li.qing_row").length > 50) {
                    $.AKjs.App.$ActAppMain.find(".activity_more").hide();
                }
            });
        }
        //}
    }

    //$(window).bind('scroll', function () {
    //loadData();
    //});

})(jQuery);