(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.AKjs.ClubHome = function ($mainDiv, $rightDiv, clubId) {
        $rightDiv.find(".ACT-RIGHT-COMMON").hide();
        $rightDiv.find(".ACT-RIGHT-CUSTOM").remove();
        var _$clubNewsDiv = $("<div class='sns_club_news panel panel-default ACT-RIGHT-CUSTOM'><div class='panel-heading'>圈子公告</div></div>");
        $rightDiv.append(_$clubNewsDiv);
        var _strClubInfoDiv = "<div class='club_info panel panel-default ACT-RIGHT-CUSTOM'><div class='panel-heading'>圈基本信息</div><div class='club_avatar'  style='margin-bottom:50px'><a>" +
                                  "<img class='IMG-LIST' align='left' style='width: 60px; height: 60px;padding-right:10px' src='' /></a><h5><span class='club_name' align='middle'></span></h5>" +
                                  "<span class='club_action'><p></p></span></div><div><p>创建人:<span class='club_creator'></span> 创建时间:<span class='club_create_time'></span></p></div>" +
                                  "<p>简介：<span class='club_brief'></span></p></div>";
        $mainDiv.append(_strClubInfoDiv);

        $.AKjs.getJSON("/sns/home/GetClubInfo", { clubID: clubId }, function (res) {
            var _$divClubInfo = $mainDiv.find(".club_info");
            // _$divClubInfo.attr("role", res.CurrentUserRole);
            _$divClubInfo.attr("club_id", res.FID);
            _$divClubInfo.attr("club_create_id", res.CreateID);
            _$divClubInfo.attr("club_name", res.ClubName);
            _$divClubInfo.attr("club_creator", res.CreateUserName);
            _$divClubInfo.attr("is_clubmember", res.IsClubMember);
            _$divClubInfo.find(".club_avatar img").attr("src", res.ClubImage);
            _$divClubInfo.find(".club_name").html(res.ClubName);
            _$divClubInfo.find(".club_creator").html(res.CreateNickName);
            _$divClubInfo.find(".club_create_time").html(res.CreateTime);
            _$divClubInfo.find(".club_brief").html(res.Brief);
            // _$divClubInfo.find(".apply_info").html(res.ApplyInfo);
            $rightDiv.find(".sns_club_news").append(res.News);
            var _role = res.CurrentUserRole;
            if (_role == "0") {
                AdminClubExt($mainDiv, $rightDiv, clubId);
            }
            else if (_role == "1") {
                MemberClubExt($mainDiv, $rightDiv, clubId, false);
            }
            else {
                _$divClubInfo.find(".club_action p").append("<span class='label label-success'><a class='club_apply_action'>申请加入</a></span>");
            }
            bindClubEvent(_$divClubInfo);
        });
    }

    function MemberClubExt($mainDiv, $rightDiv, clubId, isAdmin) {
        $mainDiv.find(".club_info span.club_action p").append("<span class='label label-success'><a class='club_quit_action'>退出圈子</a></span>");
        var _$allMemberDiv = $("<div class='sns_club_allmembers panel panel-default clearfix ACT-RIGHT-CUSTOM'></div>");
        $rightDiv.append(_$allMemberDiv);
        loadClubMembers(_$allMemberDiv, clubId, isAdmin);
        $.AKjs.Activity($mainDiv, clubId);
        $mainDiv.find(".activity_main li[activity_type='WorkFlow']").hide();
        $mainDiv.find(".activity_main div.panel-heading").html("圈内动态");
    }

    function AdminClubExt($mainDiv, $rightDiv, clubId) {
        MemberClubExt($mainDiv, $rightDiv, clubId, true);
        var _link = "$$module/sns/personal/club/sns_clubs$Update$" + Base64.encode($.toJSON({ keys: clubId }));
        var _$clubAction = $mainDiv.find(".club_info span.club_action p");
        _$clubAction.html("");
        _$clubAction.append("<span class='label label-primary'>管理员</span><span><a class='ACT-A-HREF' href='" + _link + "'> 编辑圈 </a></span><span><a class='club_dismiss_action'>解散圈</a></span>");
        $.AKjs.App.bindPageEvent($mainDiv.find(".club_info"));
        $rightDiv.append("<div class='sns_club_find panel panel-default ACT-RIGHT-CUSTOM'><div class='panel-heading'>找人</div></div>");
        var _$selectorDiv = $("<div class='find_users'></div>");
        $rightDiv.find(".sns_club_find").append(_$selectorDiv);
        var _op = { RegName: "SNSUserCodeData" };
        _$selectorDiv.AtawSNSUserSelector(_op);
        _$selectorDiv.append("<div'><span><a class='join_club'>加入圈子</a></span></div>");
        _$selectorDiv.find(".join_club").unbind("click").bind("click", function () {
            var _userIds = _$selectorDiv.AtawControl().dataValue();
            if (!_userIds .AisEmpty()) {
                $.AKjs.getJSON("/sns/home/JoinClub", { userIDs: _userIds, clubID: clubId }, function (res) {
                    if (res == "1") {
                        $rightDiv.find(".sns_club_allmembers").html("");
                        loadClubMembers($rightDiv.find(".sns_club_allmembers"), clubId, true);
                    }
                });
            }
        });
    }

    function loadClubMembers($allMemberDiv, clubId, isAdmin) {
        //var _$allMemberDiv = $("<div class='sns_club_allmembers UI_DeskTop_Module well clearfix'><h2>所有成员</h2></div>");
        //$rightDiv.find(".custom_module").append(_$allMemberDiv);
        $allMemberDiv.append("<div class='panel-heading'>所有成员</div>");
        $allMemberDiv.append("<div class='club_memberContent panel-content'></div>");
        //        $allMemberDiv.find(".club_memberContent").append("<div class='club_admins'><h5>管理员</h5></div>");
        //        $allMemberDiv.find(".club_memberContent").append("<div class='club_members' style='margin-top:120px'><h5>普通成员</h5></div>");

        $.AKjs.getJSON("/sns/home/GetClubMembers", { clubID: clubId }, function (res) {
            for (var i = 0; i < res.length; i++) {
                var _$strMemberItem = $("<div class='userStateInfo' user_id='" + res[i].UserID + "'><div class='userPhoto ACT-SNS-USER-LINK'>" + res[i].Avatar + "</div><label class='userName'><a class=' ACT-SNS-USER-LINK'>" + res[i].Name + "<a></label></div>");
                if (res[i].Role == "0") {
                    // _$strMemberItem.append("<span class='label label-danger' title='取消管理员'><a>取消</a></span>");
                    _$strMemberItem.attr("isadmin", "1");
                    _$strMemberItem.append("<span class='label label-primary'>管理员</span>");
                    $allMemberDiv.find(".club_memberContent").append(_$strMemberItem);

                }
                else {
                    if (isAdmin) {
                        _$strMemberItem.append("<span class='label label-success' title='设置为管理员'><a class='set_admin_action'>设置</a></span>");
                        _$strMemberItem.append("<span class='label label-danger' title='移除成员'><a class='remove_member_action'>移除</a></span>");
                    }
                    _$strMemberItem.attr("isadmin", "0");
                    $allMemberDiv.find(".club_memberContent").append(_$strMemberItem);
                }
                _$strMemberItem.find(".userPhoto").attr("lkid", res[i].UserID);
                _$strMemberItem.find(".userName a").attr("lkid", res[i].UserID);
            }
            if (isAdmin) {
                //var _$adminItems = $allMemberDiv.find(".club_admins div.userStateInfo");
                var _$adminItems = $allMemberDiv.find(".userStateInfo[isadmin='1']");
                if (_$adminItems.length > 1) {
                    for (var i = 0; i < _$adminItems.length; i++) {
                        $(_$adminItems[i]).append("<span class='label label-danger' title='取消管理员'><a class='remove_admin_action'>取消</a></span>");
                    }
                }
            }
            bindMemberEvent($allMemberDiv, clubId);
        });
    }

    //我的圈子中的热门圈子(根据成员数来判断)
    $.AKjs.LoadHotClubs = function ($div) {
        $div.append("<span><a class='ACT-A-HREF btn btn-primary btn-sm' href='$$module/SNS/Personal/Club/SNS_CLUBS$Insert$'>新建圈子</a><a class='UI_DeskTop_Module_more pull-right ACT-A-HREF' href='$$module/SNS/Personal/Club/SNS_CLUBS'>全部 »</a></span");
//        $div.append("<div class='club_hot'><h5>热门圈子</h5></div>");
        $div.append("<div class='club_hot'></div>");
        $.AKjs.getJSON("/sns/home/GetUserHotClubs", null, function (res) {
            for (var i = 0; i < res.length; i++) {
                var _strClubItem = "<div class='clubStateInfo' clubid='" + res[i].FID + "'><div class='clubPhoto'>" + res[i].ClubImage + "</div><label class='clubName' title=\"" + $(res[i].ClubName).html() + "\">" + res[i].ClubName + "</label></div>";
                $div.find(".club_hot").append($(_strClubItem));
            }
            $.AKjs.App.bindPageEvent($div);
        });
    }

    $.AKjs.LoadPublicClubs = function ($div) {
//    	$div.append("<span><h5>最近创建的圈子<a class='UI_DeskTop_Module_more pull-right ACT-A-HREF' href='$$module/sns/public/club/SNS_CLUBS'>全部 »</a></h5></span");
    	$div.append("<span><h5>&nbsp;<a class='UI_DeskTop_Module_more pull-right ACT-A-HREF' href='$$module/sns/public/club/SNS_CLUBS'>全部 »</a></h5></span");
        $.AKjs.getJSON("/sns/home/GetPublicClubs", null, function (res) {
            for (var i = 0; i < res.length; i++) {
                var _strClubItem = "<div class='clubStateInfo' clubid='" + res[i].FID + "'><div class='clubPhoto'>" + res[i].ClubImage + "</div><label class='clubName' title=\"" + $(res[i].ClubName).html() + "\">" + res[i].ClubName + "</label></div>";
                $div.append($(_strClubItem));
            }
            $.AKjs.App.bindPageEvent($div);
        });
    }


//    $.AKjs.LoadUserClubs = function ($div) {
//        $div.append("<span><a class='ACT-A-HREF btn btn-primary btn-sm' href='$$module/SNS/Personal/Club/SNS_CLUBS$Insert$'>新建圈子</a><a class='UI_DeskTop_Module_more pull-right' href=''>全部 »</a></span");
//        $div.append("<div class='club_admin' style='float:left;margin-right:30px'><h5>管理的圈子</h5></div>");
//        $div.append("<div class='club_join' style='margin-top:100px'><h5>加入的圈子</h5></div>");
//        $div.append("<div class='club_apply' style=''><h5>申请的圈子</h5></div>");

//        $.AKjs.getJSON("/sns/home/GetUserClubs", { userID: "" }, function (res) {
//            for (var i = 0; i < res.length; i++) {
//                var _strClubItem = "<div class='clubStateInfo'  clubid='" + res[i].FID + "'><div class='clubPhoto'>" + res[i].Avatar + "</div><label class='clubName' title=\"" + res[i].Name + "\">" + res[i].Name + "</label></div>";
//                if (res[i].Role == "0") {
//                    $div.find(".club_admin").append($(_strClubItem));
//                }
//                else if (res[i].Role == "1") {
//                    $div.find(".club_join").append($(_strClubItem));
//                }
//                else {
//                    $div.find(".club_apply").append($(_strClubItem));
//                }
//            }
//        });
//    }
    function bindMemberEvent($dom, clubId) {
        $.AKjs.App.bindPageEvent($dom);
        var _$userDiv = null;
        $dom.find(".userStateInfo a.set_admin_action").unbind("click").bind("click", function () {
            var _this = this;
            _$userDiv = $(_this).parent().parent();
            $.AKjs.getJSON("/sns/home/SetMemberToAdmin", { clubID: clubId, userID: _$userDiv.attr("user_id") }, function (res) {
                if (res == "1") {
                    $dom.html("");
                    loadClubMembers($dom, clubId, true);
                }
            });
        });
        $dom.find(".userStateInfo a.remove_member_action").unbind("click").bind("click", function () {
            var _this = this;
            _$userDiv = $(_this).parent().parent();
            $.AKjs.getJSON("/sns/home/RemoveClubMember", { clubID: clubId, userID: _$userDiv.attr("user_id") }, function (res) {
                if (res == "1") {
                    $dom.html("");
                    loadClubMembers($dom, clubId, true);
                }
            });
        });
        $dom.find(".userStateInfo a.remove_admin_action").unbind("click").bind("click", function () {
            var _this = this;
            _$userDiv = $(_this).parent().parent();
            $.AKjs.getJSON("/sns/home/SetAdminToMember", { clubID: clubId, userID: _$userDiv.attr("user_id") }, function (res) {
                if (res == "1") {
                    $dom.html("");
                    loadClubMembers($dom, clubId, true);
                }
            });
        });
    }

    function bindClubEvent($dom) {
        $dom.find(".club_apply_action").unbind("click").bind("click", function () {
            var _$apply = $dom.find(".club_action p");
            _$apply.hide();
            var _applyInput = "<p><label>申请理由:</label><textarea class='apply_textarea'style='overflow-y: visible; width: 150px; resize: none'></textarea><a class='btn submit_action'>提交</a><a class='btn cancel_action'>取消</a></p>";
            // $(this).parent().html("");
            _$apply.parent().append(_applyInput);
            _$apply.parent().find(".cancel_action").unbind("click").bind("click", function () {
                _$apply.show();
                $(this).parent().remove();
            });
            _$apply.parent().find(".submit_action").unbind("click").bind("click", function () {
                var _clubId = $dom.attr("club_id");
                var _clubCreateId = $dom.attr("club_create_id");
                var _clubName = $dom.attr("club_name");
                var _clubCreator = $dom.attr("club_creator");

                var _$applyInput = $(this).parent();
                var _input = _$applyInput.find(".apply_textarea").val();
                $.AKjs.getJSON("/SNS/Home/ClubApply", { clubID: _clubId, clubName: _clubName, clubCreateID: _clubCreateId, clubCreator: _clubCreator, applyRemark: _input }, function (res) {
                    if (res == "1") {
                        _$applyInput.remove();
                        _$apply.show();
                        _$apply.html("<span class='label label-primary'>申请中</span>");
                    }
                })
            });
        });

        //退出圈子
        $dom.find(".club_quit_action").unbind("click").bind("click", function () {
            $.AKjs.getJSON("/SNS/Home/QuitClub", { clubID: $dom.attr("club_id"), clubName: $dom.attr("club_name") }, function (res) {
                if (res == "1") {
                    $dom.find(".apply_info p").html("<span class='label label-success'><a class='club_apply_action'>申请加入</a></span>");
                    bindClubEvent($dom);
                }
            });
        });

        //解散圈子
        $dom.find(".club_dismiss_action").unbind("click").bind("click", function () {
            var _this = $(this);
            $.AKjs.getJSON("/SNS/Home/DismissClub", { clubID: $dom.attr("club_id") }, function (res) {
                if (res == "1") {
                    $.AKjs.App.loadDesk();
                }
            });
        });
    }

    $.AKjs.QuitClub = function (page) {
        var _key = page.KeyValues[0];
        $.AKjs.getJSON("/SNS/Home/QuitClub", { clubID: _key, clubName: page.Data.SNS_CLUBS[0]["CLUBNAME"] }, function (res) {
            if (res == "1") {
                return page.afterPostData();
            }
        });
    };

    $.AKjs.Dissolve = function (page) {
        var _key = page.KeyValues[0];
        $.AKjs.getJSON("/SNS/Home/DismissClub", { clubID: _key }, function (res) {
            if (res == "1") {
                return page.afterPostData();
            }
        });
    };

    $.AKjs.ClubDetail = function (page) {
        var _key = page.KeyValues[0];
        $.AKjs.AppGet().openUrl("$clubhome$" + _key);
    };

})(jQuery);