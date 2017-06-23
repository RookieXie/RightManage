(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    //继承基类
    $.AKjs.AtawActivityRowDom = function (options) {
        return $.extend({}, $.AKjs.AtawBaseRowDom(options), new AtawActivityRowDom()).sysCreator();
    }

    function AtawActivityRowDom() {
        this.$ActivityMain = null;
        this.SourceId = null; //动态源ID
        this.SourceType = null; //动态源类别
        this.IsLoadComments = false;
        this.IsShowComments = false;
        //this.IsShowCommentInput = false;
        this.IsLoadForwards = false;
        this.IsShowForwards = false;
        this.$ForwardWin = null;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.AtawBaseRowDom_creator();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            if (this.NoDelete && this.IsViewPage) {
                this.$JObj.parent().find(".ACT-CHECK-SINGLE").remove();
            }
            var _originalContent = "";
            for (var i = 0; i < this.ColumnList.length; i++) {
                var _column = this.ColumnList[i];
                _column.intoDom(this.$JObj);
                var _dataText = _column.AtawControlObj.DataText;
                if (_column.ColumnConfig.Name == "ORIGINALCONTENT") {
                    _originalContent = _dataText;
                }
            }
            this.$ActivityMain = this.$JObj.find(".qing_main");
            this.SourceId = this.$ActivityMain.attr("source_id");
            this.SourceType = this.$ActivityMain.attr("source_type");
            //this.$ActivityMain.find(".qing_name a").first().attr("lkid", this.$ActivityMain.attr("user_id"));
            //this.$ActivityMain.find(".qing_avatar a").attr("lkid", this.$ActivityMain.attr("user_id"));

            //this.$ActivityMain.find(".qing_content a").addClass("ACT-A-HREF");
            //var _href = "$activitydetail$" + this.SourceId + "$" + this.SourceType;
            //this.$ActivityMain.find(".qing_content a").attr("href", _href);

            var _this = this;
            this.$ActivityMain.find(".comment_action").unbind("click").bind("click", function () {
                _this.loadComments();
            });

            this.$ActivityMain.find(".forward_action").unbind("click").bind("click", function () {
                _this.openForwardWindow();
            });

            //添加收藏
            _this.$ActivityMain.find(".ACT-FAVORITE-ADD").off("click").on("click",function () {
                _this.addFavorite();
            });

            //取消收藏
            _this.$ActivityMain.find(".ACT-FAVORITE-CANCEL").off("click").on("click",function () {
                _this.cancelFavorite();
            });

            //将owner添加到标签显示
            //var $to = this.$ActivityMain.find(".qing_to");
            //var owner = $to.attr("owner");
            //if (owner && owner != "") {
            //    $to.find("span").append(owner);
            //}
            //else {
            //    $to.html("");
            //}
            //根据权限分配图标
            //switch (this.$ActivityMain.find(".qing_to span").attr("type")) {
            //    case "ToAllPeople":
            //        this.$ActivityMain.find(".qing_to span i").attr("class", "icon-share");
            //        break;
            //    case "ToDepartment":
            //        this.$ActivityMain.find(".qing_to span i").attr("class", "icon-group");
            //        break;
            //    case "ToClub":
            //        this.$ActivityMain.find(".qing_to span i").attr("class", "icon-group");
            //        break;
            //    case "ToUser":
            //        //this.$ActivityMain.find(".qing_to span i").attr("class", "icon-group");
            //        //var oid = this.$ActivityMain.find(".qing_to").attr("ownerid");
            //        //this.$ActivityMain.find(".qing_to span img").attr("src",);
            //        break;
            //    case "ToMyself":
            //        this.$ActivityMain.find(".qing_to span i").attr("class", "icon-lock");
            //        break;
            //}

        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "openForwardWindow", function () {
            var _this = this;
            var _$divForward = _this.$ActivityMain.find(".qing_forwards");
            var param = {};
            param.HasPager = false;
            param.SourceId = _this.SourceId;
            param.OriginalId = _this.SourceId;
            param.ForwardedCount = _this.$ActivityMain.find(".forwardedCount").text().replace(/[(|)]/g, "");
            if (_this.$ActivityMain.find(".original_content").length > 0) {
                param.OriginalId = _this.$ActivityMain.find(".original_content").attr("original_id");
                var _forwardInfo = {};
                _forwardInfo.Forwarded_UserID = _this.$ActivityMain.attr("user_id");
                _forwardInfo.Forwarded_UserName = _this.$ActivityMain.attr("user_name");
                _forwardInfo.Forwarded_Body = encodeURIComponent(_this.$ActivityMain.find(".qing_content:first").html());
                param.ForwardInfo = _forwardInfo;
            }
            param.AfterInitFun = function () {
                var _$winDiv = _$divForward.find(".ACT-FORWARD");
                _$winDiv.AtawWindow({
                    Title: "转发",
                    Width: "50%",
                    Fixed: true
                });
                _$winDiv.css({ "height": "400px", "overflow": "hidden" });
                _this.$ForwardWin = _$winDiv.AtawControl();
                _this.$ForwardWin.open();
            };

            param.AfterForwardFun = function () {
                var _$forwardCount = _this.$ActivityMain.find(".forwardedCount");
                var _count = _$forwardCount.text().replace("(", "").replace(")", "");
                if (_count == "") {
                    _$forwardCount.text("(1)");
                }
                else {
                    _$forwardCount.text("(" + (parseInt(_count) + 1).toString() + ")");
                }
                _this.$ForwardWin.hide();
            };

            seajs.use(['jquery', 'microblogforwardmrc'], function ($, microblogforwardmrc) {
                var _creator = new microblogforwardmrc();
                _creator.setModel(param);
                _creator.init(_$divForward);
            });
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "loadComments", function () {
            var _$divComment = this.$ActivityMain.find(".qing_comments");
            var param = {};
            param.HasPager = false;
            param.ObjectId = this.SourceId;
            param.CommentModuleXml = "module/sns/comments/activity_comments";
            param.ReplyModuleXml = "module/sns/comments/activity_replies";
            param.CommentTableName = "SNS_ACTIVITY_COMMENTS";
            param.ReplyTableName = "SNS_ACTIVITY_REPLIES";
            var commentInfo = {};
            commentInfo.UserId = this.$ActivityMain.attr("user_id");
            commentInfo.UserName = this.$ActivityMain.attr("user_name");
            commentInfo.SourceContent = encodeURIComponent(this.$ActivityMain.find(".qing_content").html());
            commentInfo.CommentCount = this.$ActivityMain.find(".commentCount").text().replace(/[(|)]/g, "");
            commentInfo.ActivityType = this.$ActivityMain.attr("source_type");
            commentInfo.CommentId = this.$ActivityMain.attr("comment_id");
            param.CommentInfo = commentInfo;
            var _this = this;
            param.AfterCommentFun = function () {
                //                var _$inputComment = _this.$ActivityMain.find(".qing_comment_input");
                //                _$inputComment.find(".ACT-COMMENT-TEXTAREA").val("");
                //                _$divComment.html("");
                var _$commentCount = _this.$ActivityMain.find(".commentCount");
                var _count = _$commentCount.text().replace("(", "").replace(")", "");
                if (_count == "") {
                    _$commentCount.text("(1)");
                }
                else {
                    _$commentCount.text("(" + (parseInt(_count) + 1).toString() + ")");
                }
                //_this.IsLoadComments = true;
            }; 
            var isloadcomments = _$divComment.find(".ACT-COMMENTS");
            if (isloadcomments.length==0) {
                seajs.use(['commentmrc'], function (commentmrc) {
                    var _creator = new commentmrc();
                    _creator.setModel(param);
                    _creator.init(_$divComment);
                });
                //this.IsLoadComments = true;
            }
            else {
                //this.IsLoadComments = false;
                _$divComment.html("");
            }

        });

        //添加收藏
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "addFavorite", function () {
            var _this = this;
            var _$addFavorite = _this.$ActivityMain.find(".act_favorite");

            var _postDs = {};
            var _dt = _postDs["SNS_MYFAVORITE"] = [];
            var _row = { FID: null, USERID: $.AKjs.LoginId, SOURCEID: _this.SourceId, SOURCETYPE: _this.SourceType};
            _dt.push(_row);

            $.AKjs.getJSON("/module/modulemerge", { xml: "module/sns/activity/sns_myfavorite.xml", ds: $.toJSON(_postDs), pageStyle: "Insert" }, function (res) {
                if (res.res > 0) {
                    Ataw.msgbox.show("收藏成功！", 4, 2000);
                    _$addFavorite.removeClass("ACT-FAVORITE-ADD");
                    _$addFavorite.addClass("ACT-FAVORITE-CANCEL");
                    _this.$ActivityMain.attr("favorite_id", res.keys);
                    _$addFavorite.html("<i class='icon-star fa fa-star'></i>收藏");
                    _this.$ActivityMain.find(".ACT-FAVORITE-CANCEL").off("click").on("click", function () {
                        _this.cancelFavorite();
                    });

                } else {
                    Ataw.msgbox.show("收藏失败！", 4, 2000);
                }
            });
        });

        //取消收藏
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "cancelFavorite", function () {
            var _this = this;
            var _$addFavorite = _this.$ActivityMain.find(".act_favorite");

            var _postDs = {};
            var _dt = _postDs["SNS_MYFAVORITE_OPERATION"] = [];
            var _key = { OperationName: "Delete", KeyValue: _this.$ActivityMain.attr("favorite_id"), Data: null };
            _dt.push(_key);

            $.AKjs.getJSON("/module/modulemerge", { xml: "module/sns/activity/sns_myfavorite.xml", ds: $.toJSON(_postDs), callback: Math.random() }, function (res) {
                if (res.res > 0) {
                    Ataw.msgbox.show("取消成功！", 4, 2000);
                    var activityType = _this.$JObj.parents().find("#myTab").find(".active").attr("activity_type");
                    if (activityType == "myfavorite") {
                        var _$group = _this.$ActivityMain.parent().parent();
                        if (_$group.find("li").length == 1) {
                            _$group.prev().remove();
                            _$group.remove();
                        } else {
                            _this.$ActivityMain.parent().remove();
                        }
                    } else {
                        _$addFavorite.removeClass("ACT-FAVORITE-CANCEL");
                        _$addFavorite.addClass("ACT-FAVORITE-ADD");
                        _this.$ActivityMain.attr("favorite_id", "");
                        _$addFavorite.html("<i class='icon-star-empty fa fa-star-o'></i>收藏");
                        _this.$ActivityMain.find(".ACT-FAVORITE-ADD").off("click").on("click", function () {
                            _this.addFavorite();
                        });
                    }
                } else {
                    Ataw.msgbox.show("取消失败！", 4, 2000);
                }
            });
        });

        //初始化行
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createColumn", function (options) {
            return $.AKjs.AtawActivityColumnDom(options);
        });
    }
})(jQuery);