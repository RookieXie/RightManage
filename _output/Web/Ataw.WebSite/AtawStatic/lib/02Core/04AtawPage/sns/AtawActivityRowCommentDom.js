(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    //继承基类
    $.AKjs.AtawActivityRowCommentDom = function (options) {
        return $.extend({}, $.AKjs.AtawActivityRowDom(options), new AtawActivityRowCommentDom()).sysCreator();
    }

    function AtawActivityRowCommentDom() {

        this.$ActivityMain = null;
        this.SourceId = null; //动态源ID
        this.SourceType = null; //动态源类别
        this.OriginalType=null;//原文类别
        this.IsShowComments = false;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            //this.AtawActivityRowDom_creator();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            var _this = this;
            var _sourceColumn = null;
            var _commentCountCol = null;

            for (var i = 0; i < _this.ColumnList.length; i++) {
                var _column = _this.ColumnList[i];
                //var _$li = $("<li/>");
                //this.$JObj.append(_$li);
                //_column.intoDom(_$li);
                //                if (_column.ColumnConfig.Name == "SOURCEID") {
                //                    _sourceColumn = _column;
                //                }
                _column.intoDom(_this.$JObj);
                if (_column.ColumnConfig.Name == "COMMENTCOUNT") {
                    _commentCountCol = _column;
                }

            }
            //var _$divComment = $("<div class='qing_comments'></div>");
            //this.$JObj.find(".qing_main").append(_$divComment);
            _this.$ActivityMain = _this.$JObj.find(".qing_main");
            _this.SourceId = _this.$ActivityMain.attr("source_id");
            _this.SourceType = _this.$ActivityMain.attr("source_type");
            _this.OriginalType = _this.$ActivityMain.attr("original_type");
            _this.loadComments();

            _this.$ActivityMain.find(".qing_to").remove();
            _this.$ActivityMain.find(".qing_from").remove();
            /* 移除评论按钮 */
            _this.$ActivityMain.find(".qing_handle").remove();
            /* 移除评论列表框 */
            //_this.$ActivityMain.find(".qing_comments").remove();
           
            //_this.$ActivityMain.find(".qing_handle").find(".comment_action").remove();
            //_this.$ActivityMain.find(".qing_handle").append("<a class='reply_action'>回复</a>");
            //<p class="qing_handle pull-right"></p>
            _this.$ActivityMain.find(".qing_title").append("<a class='ACT-RELATION-REPLY' style='float:right'>回复</a>");

            _this.$ActivityMain.find(".qing_content").addClass("qing_comment_original");
            _this.$ActivityMain.find(".qing_content a").addClass("ACT-A-HREF");
            var _href = "$activitydetail$" + _this.SourceId +"$"+ _this.OriginalType;
            _this.$ActivityMain.find(".qing_content a").attr("href",_href);

            //点击动态右上角的回复，实现将回复聚焦到对应的评论或回复信息的回复按钮
            _this.$ActivityMain.find(".ACT-RELATION-REPLY").click(function () {
                if (_this.SourceType == "CommentMicroBlog") {
                    var $comment = _this.$ActivityMain.find(".ACT-COMMENT-ROW");
                    if ($comment.length == 1) {
                        $comment.find(".ACT-REPLY-BTN").click();
                    } else {
                        $comment.each(function () {
                            if ($(this).attr("comment_id") == _this.$ActivityMain.attr("comment_id")) {
                                $(this).find(".ACT-REPLY-BTN").click();
                                return false;
                            }
                        });
                    }
                }
                if (_this.SourceType == "ReplyMicroBlog") {
                    var $reply = _this.$ActivityMain.find(".ACT-REPLY-ROW");
                    if ($reply.length == 1) {
                        $reply.find(".ACT-SUBREPLY-BTN").click();
                    } else {
                        $reply.each(function () {
                            if ($(this).attr("reply_id") == _this.$ActivityMain.attr("reply_id")) {
                                $(this).find(".ACT-SUBREPLY-BTN").click();
                                return false;
                            }
                        });
                    }
                }
               
            });

            /* 点击评论按钮加载评论列表 */
            //_this.$ActivityMain.find(".comment_action").unbind("click").bind("click", function () {
            //    _this.loadComments();
            //});

            // var _$divComment = _this.$ActivityMain.find(".qing_comments");

            //var _sourceId = _sourceColumn.AtawControlObj.DataText;
            //            var _ds = {};
            //            var _rows = _ds["SNS_COMMENTS_SEARCH"] = [];
            //            var _row = { OBJECTID: _this.SourceId, OBJECTTYPE: _this.SourceType };
            //            _rows.push(_row);
            //            //获取评论信息
            //            $.AKjs.getJSON("/module/module", { xml: "module/sns/activity/snscomment.xml", ds: $.toJSON(_ds), pageStyle: "List" }, function (res) {
            //                var _form = res.Forms["SNS_COMMENTS"];
            //                _form.HasPager = false;
            //                _form.FormType = "Comment";
            //                var _op = { Data: res.Data, Form: _form };
            //                _$divComment.AtawCommentForm(_op);
            //                _$divComment.find(".qing_comment_list").attr("source_id", _this.SourceId).attr("source_type", _this.SourceType);
            //                var _commentCount = _commentCountCol.AtawControlObj.DataText;
            //                if (parseInt(_commentCount) > 5) {
            //                    _$divComment.append("<span><a class='more_comment'>查看更多评论>></a></span>");
            //                }
            //            });

            //            var _$inputComment = $("<div class='qing_comment_input' style='display:none'><textarea class='comment_textarea' style='overflow: hidden; height: 38px;width:100%;resize:none;padding:0'></textarea></div>")
            //            _$inputComment.append("<a class='btn btn-default publishComment'><span>评论</span></a>");
            //            _this.$ActivityMain.append(_$inputComment);

            //            var _$inputForward = $("<div class='qing_forward_input' style='display:none'><textarea class='forward_textarea' style='overflow: hidden; height: 38px;width:100%;resize:none;padding:0' innertext='请输入转发理由' placeholder='请输入转发理由'></textarea></div>")
            //            _$inputForward.append("<a class='btn btn-default publishForward'><span>转发</span></a>");
            //            this.$ActivityMain.append(_$inputForward);

/*          _this.$ActivityMain.find(".comment_action").click(function () {
                _this.loadComments();
                //                if (!_this.IsShowComments) {
                //                    _$divComment.show();
                //                    _$inputComment.show();
                //                    _this.IsShowComments = true;
                //                }
                //                else {
                //                    _$divComment.hide();
                //                    _$inputComment.hide();
                //                    _this.IsShowComments = false;
                //                }
            });
*/
            //            _$inputComment.find(".publishComment").unbind("click").bind("click", function () {
            //                _this.publishComment();
            //            });

 /*           _this.$ActivityMain.find(".forward_action").unbind("click").bind("click", function () {
                // _this.loadForwards();
                _this.openForwardWindow();
            });
*/
            //            _$inputForward.find(".forward_textarea").focus(function () {
            //                if ($(this).val() == $(this).attr("innertext")) {
            //                    $(this).val("");
            //                }
            //            });

            //            _$inputForward.find(".publishForward").unbind("click").bind("click", function () {
            //                _this.publishForward();
            //            });

/*           
            //将owner添加到标签显示
            this.$ActivityMain.find(".qing_to span").append(this.$ActivityMain.find(".qing_to").attr("owner"));

            //根据权限分配图标
            switch (this.$ActivityMain.find(".qing_to span").attr("type")) {
                case "ToAllPeople":
                    this.$ActivityMain.find(".qing_to span i").attr("class", "icon-share");
                    break;
                case "ToDepartment":
                    this.$ActivityMain.find(".qing_to span i").attr("class", "icon-group");
                    break;
                case "ToClub":
                    this.$ActivityMain.find(".qing_to span i").attr("class", "icon-group");
                    break;
                case "ToUser":
                    //this.$ActivityMain.find(".qing_to span i").attr("class", "icon-group");
                    //var oid = this.$ActivityMain.find(".qing_to").attr("ownerid");
                    //this.$ActivityMain.find(".qing_to span img").attr("src",);
                    break;
                case "ToMyself":
                    this.$ActivityMain.find(".qing_to span i").attr("class", "icon-lock");
                    break;
            }
*/

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "loadForwards", function () {
            var _this = this;
            _this.$ActivityMain.find(".qing_comment_input").hide();
            _this.IsShowComments = false;
            var _$divForward = _this.$ActivityMain.find(".qing_forwards");
            if (_this.IsShowForwards) {
                _$divForward.hide();
                _this.$ActivityMain.find(".qing_forward_input").hide();
                _this.IsShowForwards = false;
                return;
            }
            _this.IsShowForwards = true;
            _this.$ActivityMain.find(".qing_forward_input").show();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "publishForward", function () {
            var _this = this;
            var _$inputForward = _this.$ActivityMain.find(".qing_forward_input");
            var _body = _$inputForward.find(".forward_textarea").val();
            var _originalId = _this.SourceId;
            if (_this.$ActivityMain.find(".original_content").length > 0) {
                _body = _body + "//@" + _this.$ActivityMain.attr("user_name") + ":" + _this.$ActivityMain.find(".qing_content:first").text();
                _originalId = _this.$ActivityMain.find(".original_content").attr("original_id");
            }
            var _postDs = {};
            var _dt = _postDs["SNS_MICROBLOGS"] = [];
            var _row = { FID: null, ORIGINALID: _originalId, FORWARDEDID: _this.SourceId, BODY: _body };
            _dt.push(_row);
            $.AKjs.getJSON("/module/modulemerge", { xml: "module/sns/microblog/sns_microblogs.xml", ds: $.toJSON(_postDs), pageStyle: "Insert" }, function (res) {
                if (res.res > 0) {
                    Ataw.msgbox.show("转发成功！", 4, 2000);
                    _$inputForward.find(".forward_textarea").val("");
                    var _$forwardCount = _this.$ActivityMain.find(".forwardedCount");
                    var _count = _$forwardCount.text().replace("(", "").replace(")", "");
                    if (_count == "") {
                        _$forwardCount.text("(1)");
                    }
                    else {
                        _$forwardCount.text("(" + (parseInt(_count) + 1).toString() + ")");
                    }
                    _$inputForward.hide();

                }
            });
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "publishComment", function () {
            var _this = this;
            var _$inputComment = _this.$ActivityMain.find(".qing_comment_input");
            var _body = _$inputComment.find(".comment_textarea").val();
            var _postDs = {};
            var _dt = _postDs["SNS_COMMENTS"] = [];
            var _row = { FID: null, OBJECTID: _this.SourceId, OBJECTTYPE: _this.SourceType, BODY: _body };
            _dt.push(_row);
            var _actDt = _postDs["SNS_ACTIVITIES"] = [];
            var _actRow = { FID: null, USERID: _this.$ActivityMain.attr("user_id"), USERNAME: _this.$ActivityMain.attr("user_name"),
                SOURCECONTENT: _this.$ActivityMain.find(".qing_content:first").text()
            };
            _actDt.push(_actRow);
            $.AKjs.getJSON("/module/modulemerge", { xml: "module/sns/activity/snscomment.xml", ds: $.toJSON(_postDs), pageStyle: "Insert" }, function (res) {
                if (res.res > 0) {
                    Ataw.msgbox.show("评论成功！", 4, 2000);
                    _$inputComment.find(".comment_textarea").val("");
                    var _$commentCount = _this.$ActivityMain.find(".commentCount");
                    var _count = _$commentCount.text().replace("(", "").replace(")", "");
                    if (_count == "") {
                        _$commentCount.text("(1)");
                    }
                    else {
                        _$commentCount.text("(" + (parseInt(_count) + 1).toString() + ")");
                    }
                    _this.$ActivityMain.parent().remove();
                }
            });
        });

        //初始化行
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createColumn", function (options) {
            return $.AKjs.AtawActivityColumnDom(options);
        });
    }
})(jQuery);