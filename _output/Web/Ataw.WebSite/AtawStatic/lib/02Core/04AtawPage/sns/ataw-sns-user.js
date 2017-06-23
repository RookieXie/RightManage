(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.AKjs.UserHome = function ($mainDiv, $rightDiv, userId) {
        $rightDiv.find(".ACT-RIGHT-COMMON").hide();
        $rightDiv.find(".ACT-RIGHT-CUSTOM").remove();
        var _$myClubDiv = $("<div class='sns_clubs clearfix panel panel-default ACT-RIGHT-CUSTOM'><div class='panel-heading'>圈子</div></div>");
        $rightDiv.append(_$myClubDiv);
        var _strUl = " <ul class='nav nav-pills nav-justified'>" +
                        "<li class='active'><a href='#club_admin' data-toggle='tab'>管理的圈子</a></li>" +
                        "<li><a href='#club_join' data-toggle='tab'>加入的圈子</a></li>" +
                        "<li><a href='#club_apply' data-toggle='tab'>申请的圈子</a></li></ul>";
        var _strTabContent = "<div class='tab-content'>" +
                            "<div class='tab-pane active clearfix' id='club_admin'></div>" +
                            "<div class='tab-pane clearfix' id='club_join'></div>" +
                            "<div class='tab-pane clearfix' id='club_apply'></div></div>";
        _$myClubDiv.append($(_strUl));
        _$myClubDiv.append($(_strTabContent));

        $.AKjs.getJSON("/sns/home/GetUserClubs", { userID: userId }, function (res) {
            for (var i = 0; i < res.length; i++) {
                var _href = "$snsclubhome$" + res[i].FID;
                var _strClubItem = "<div class='clubStateInfo' clubid='" + res[i].FID + "'><div class='clubPhoto'>" + res[i].ClubImage + "</div><label class='clubName'>" +
                                    "<a class='ACT-A-HREF' href='" + _href + "'>" + res[i].ClubName + "</a></label></div>";

                if (res[i].CurrentUserRole == "0") {
                    _$myClubDiv.find("#club_admin").append($(_strClubItem));
                }
                else if (res[i].CurrentUserRole == "0") {
                    _$myClubDiv.find("#club_join").append($(_strClubItem));
                }
                else {
                    _$myClubDiv.find("#club_apply").append($(_strClubItem));
                }
            }
            $.AKjs.App.bindPageEvent(_$myClubDiv);
        });
           var _$userInfoDiv = $("<div class='sns_userinfo panel panel-default clearfix' style='min-height:30px'><div class='panel-heading'>个人资料</div></div>");
        _$userInfoDiv.append("<div class='userinfo_main'></div>");
        $mainDiv.append(_$userInfoDiv);
        var ds = {};
        var _dt = ds["_KEY"] = [];
        var _row = { KeyValue: userId };
        _dt.push(_row);
        var postData = { xml: "module/sns/userinfo/userinfo", ds: $.toJSON(ds), pageStyle: "Detail" };
        $.AKjs.getJSON("/module/module", postData, _fun1);
        function _fun1(res) {
            _$userInfoDiv.find(".userinfo_main").AtawDetailPage(res);
            _$userInfoDiv.find(".userinfo_main div.panel-heading").hide();
            _$userInfoDiv.find(".userinfo_main div.panel-footer").hide();
            _$userInfoDiv.find(".userinfo_main div.panel").removeClass();
            _$userInfoDiv.find(".userinfo_main div.panel-body").removeClass("panel-body");
            _$userInfoDiv.find(".userinfo_main div.btn-group:last").parent().hide();

        }
        var _$userActivityDiv = $("<div class='sns_userActivities'></div>");
        $mainDiv.append(_$userActivityDiv);
        $.AKjs.Activity(_$userActivityDiv, null, userId);
        $mainDiv.find(".sns_userActivities div.input-group").hide();
    }

    $.AKjs.UserDetail = function (page) {
        var _key = page.KeyValues[0];
        $.AKjs.App.loadSNSUserHomePage(_key);
    };

})(jQuery);