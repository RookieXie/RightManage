(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    //继承基类
    $.AKjs.AtawActivityColumnDom = function (options) {
        return $.extend({}, $.AKjs.AtawBaseColumnDom(options), new AtawActivityColumnDom()).sysCreator();
    }

    function AtawActivityColumnDom() {

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.AtawBaseColumnDom_creator();
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            if (this.AtawControlObj.sys_ataw_fun_name == "AtawDetailControl") {
                var _dataText = this.AtawControlObj.DataText;
                //if (_dataText == null || _dataText == "") {
                //   _dataText = "_";
                //}
            }
            var _obj = null;
            var _originalContent = "";
            switch (this.ColumnConfig.Name) {
                case "SOURCEID":
                    this.$JObj.find(".qing_main").attr("source_id", _dataText);
                    break;
                case "ACTIVITYITEMTYPE":
                    this.$JObj.find(".qing_main").attr("source_type", _dataText);
                    //工作流隐藏"转发"和"评论"功能
//                    if (_dataText != "CreateMicroBlog" && _dataText != "CommentMicroBlog") {
//                        this.$JObj.find(".qing_main .qing_handle").hide();
//                    }
                    break;
                case "USERID":
                    this.$JObj.find(".qing_main").attr("user_id", _dataText);
                    break;
                //case "USERAVATAR":
                //    if (this.$JObj.parent().hasClass("qing_messages"))
                //    {
                //        _obj = this.$JObj.find(".qing_avatar");
                //        _obj.append(_dataText);
                //        this.$JObj.find(".qing_avatar img").addClass("circle-img");
                //    }
                //    else
                //    {
                //        _obj = this.$JObj.find(".ACT-DATA");
                //        _obj.before(_dataText);
                //        var img = this.$JObj.find(".ACT-SNS-USER-LINK").find("img");
                //        img.addClass("circle-img");
                //        //img.parent().addClass("pull-right");
                //    }
                //    break;
                case "USERNAME":
                    _obj = this.$JObj.find(".qing_name");
                    _obj.append(_dataText);
                    this.$JObj.find(".qing_main").attr("user_name", _dataText);
                    break;
                case "CREATE_TIME":
                    _obj = this.$JObj.find(".qing_date");
                    _obj.append(_dataText);
                    break;
                case "SACT_TITLE":
                    _obj = this.$JObj.find(".qing_title");
                    _obj.append(_dataText);
                    break;
                case "SACT_SUBCONTENT":
                    _obj = this.$JObj.find(".qing_content");
                    _obj.append(_dataText);
                    break;
                case "FORWARDEDCOUNT":
                    _obj = this.$JObj.find(".forwardedCount");
                    if (parseInt(_dataText) > 0) {
                        _obj.append("(" + _dataText + ")");
                    }
                    break;
                case "COMMENTCOUNT":
                    _obj = this.$JObj.find(".commentCount");
                    if (parseInt(_dataText) > 0) {
                        _obj.append("(" + _dataText + ")");
                    }
                    break;
                case "ORIGINALCONTENT":
                    _originalContent = _dataText;
                    if (!_originalContent .AisEmpty()) {
                        this.initOriginalContent($.parseJSON(_originalContent));
                    } break;
                case "ACTIVITYFROM":
                    this.$JObj.find(".qing_from").after(_dataText);
                    break;
                case "PRIVACYSTATUS":
                    _obj = this.$JObj.find(".qing_to");
                    _obj.attr("type", _dataText);
                    break;
                case "OWNERID":
                    _obj = this.$JObj.find(".qing_to");
                    _obj.attr("ownerid", _dataText);
                    break;
                case "OWNER":
                    _obj = this.$JObj.find(".qing_to");
                    _obj.attr("owner", _dataText);
                    _obj.append("@"+_dataText);
                    break;
                case "ACTIVITYTYPE":
                    if (!_dataText .AisEmpty()) {
                        this.$JObj.find(".qing_main").attr("original_type", _dataText);
                    }
                    break;
                case "COMMENTID":
                    if (!_dataText .AisEmpty()) {
                        this.$JObj.find(".qing_main").attr("comment_id", _dataText);
                    }
                    break;
                case "REPLYID":
                    if (!_dataText .AisEmpty()) {
                        this.$JObj.find(".qing_main").attr("reply_id", _dataText);
                    }
                    break;
                case "ISFAVORITE":
                    _obj = this.$JObj.find(".act_favorite");
                    if (_dataText .AisEmpty()) {
                        _obj.addClass("ACT-FAVORITE-ADD");
                        _obj.html("<i class='icon-star-empty fa fa fa-star-o'></i>收藏");
                    } else {
                        _obj.addClass("ACT-FAVORITE-CANCEL");
                        _obj.html("<i class='icon-star fa fa-star'></i>收藏");
                    }
                    this.$JObj.find(".qing_main").attr("favorite_id", _dataText);
                    break;
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initOriginalContent", function (data) {
            if (!data.OriginalID .AisEmpty()) {
                var _$content = $("<div class='original_content'><span class=''></span><span class='qing_name'>" +
                         "<a class='ACT-SNS-USER-LINK'></a></span>" +
                             "<span class='qing_date'></span><p class='qing_title'></p><p class='qing_content'></p>" +
                             "<p class='qing_handle'><a class='original_forward_action ACT-A-HREF' >原文转发<span class='forwardedCount'></span></a>" +
                              "<a class='original_comment_action ACT-A-HREF'>原文评论<span class='commentCount'></span></a></p></div>");
                _$content.attr("original_id", data.OriginalID);
                _$content.find(".ACT-SNS-USER-LINK").attr("lkid", data.OriginalUserID);
                _$content.find(".ACT-SNS-USER-LINK").html(data.OriginalNickName);
                _$content.find(".qing_date").html(data.OriginalCreateTime);
                _$content.find(".qing_content").html(data.OriginalBody);
                var _forwardedCount = data.OriginalForwardedCount;
                var _commentCount = data.OriginalCommentCount;
                _$content.find(".forwardedCount").html(parseInt(_forwardedCount) > 0 ? "(" + _forwardedCount + ")" : "");
                _$content.find(".commentCount").html(parseInt(_commentCount) > 0 ? "(" + _commentCount + ")" : "");
                this.$JObj.find(".qing_content").after(_$content);
                var _href = "$microblogdetail$" + data.OriginalID;
                _$content.find(".original_forward_action").attr("href", _href + "$forward");
                _$content.find(".original_comment_action").attr("href", _href + "$comment");
            }
        });
    }
})(jQuery);
