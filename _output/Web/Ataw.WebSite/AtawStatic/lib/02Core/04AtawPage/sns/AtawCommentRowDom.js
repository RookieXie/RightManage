(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    //继承基类
    $.AKjs.AtawCommentRowDom = function (options) {
        return $.extend({}, $.AKjs.AtawBaseRowDom(options), new AtawCommentRowDom()).sysCreator();
    }

    function AtawCommentRowDom() {

        this.IsShowReplyInput = false;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.AtawBaseRowDom_creator();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            if (this.NoDelete && this.IsViewPage) {
                this.$JObj.parent().find(".ACT-CHECK-SINGLE").remove();
            }
            var _userName = null //评论人名字
            var _commentId = null;
            for (var i = 0; i < this.ColumnList.length; i++) {
                var _column = this.ColumnList[i];
                //var _$li = $("<li/>");
                //this.$JObj.append(_$li);
                //_column.intoDom(_$li);

                //_column.intoDom(this.$JObj);
                var _dataText = _column.AtawControlObj.DataText;
                if (_column.ColumnConfig.Name == "FID") {
                    this.$JObj.attr("comment_id", _dataText);
                    _commentId = _dataText;
                }
                else if (_column.ColumnConfig.Name == "USERID") {
                    this.$JObj.attr("user_id", _dataText);
                }
                else if (_column.ColumnConfig.Name == "USERAVATAR") {
                    _obj = this.$JObj.find(".ACT-AVATAR");
                    _obj.append(_dataText);
                    this.$JObj.find(".ACT-AVATAR img").addClass("circle-img");
                }
                else if (_column.ColumnConfig.Name == "NICKNAME") {
                    _obj = this.$JObj.find(".ACT-COMMENTATOR");
                    _obj.append("<a class='commentator ACT-SNS-USER-LINK'>" + _dataText + ":</a>");
                    _userName = _dataText;
                    this.$JObj.attr("user_name", _dataText);
                }
                else if (_column.ColumnConfig.Name == "BODY") {
                    _obj = this.$JObj.find(".ACT-BODY");
                    _dataText = _dataText.replace(/<p>(.*?)<\/p>/gi, "$1");
                    _obj.append(_dataText);
                }
                else if (_column.ColumnConfig.Name == "CREATE_TIME") {
                    _obj = this.$JObj.find(".ACT-DATE");
                    _obj.append(_dataText);
                }
            }
            this.$JObj.find(".ACT-AVATAR a").attr("lkid", this.$JObj.attr("user_id"));
            //var _$replyDiv = $("<div class='ACT-REPLY-INPUT' style='display:none;margin-left:50px'><div class='ACT-REPLY-EDITOR'></div><a class='btn btn-default publishReply'><span>评论</span></a></div>");
            var _$replyDiv = $("<div class='ACT-REPLY-INPUT' style='display:none;'></div>");
            this.$DefaultTextArea = $("<textarea class='ACT-COMMENT-TEXTAREA form-control acs-comment-textarea'innertext='' placeholder='请输入...'></textarea>");
            this.$Button = $("<div><img class='ACT-EMOTION ' style='width:30px;height:30px;' src='/areas/uisdk/Content/images/happy.png'/><a class='btn btn-default publishReply pull-right' style='padding: 3px 8px;border-radius:0;'><span>评论</span></a></div>");
            var textid = "comment-input" + $.AKjs.getUniqueID();
            this.$DefaultTextArea.attr("id", textid);
            _$replyDiv.append(this.$DefaultTextArea);
            _$replyDiv.append(this.$Button);

            this.$JObj.find(".ACT-REPLIES").before(_$replyDiv);
            //  _$replyDiv.find(".ACT-REPLY-EDITOR").AtawEditor();
            var _this = this;

            //回复
            _this.$JObj.find(".ACT-REPLY-BTN").unbind("click").bind("click", function () {
                var _$main = _this.$JObj.parents(".ACT-COMMENTS");
                var _$replyInput = _this.$JObj.find(".ACT-REPLY-INPUT");
                //var _replyEditor = _$replyInput.find(".ACT-REPLY-EDITOR").AtawControl();
                var _replyEditor = _this.$DefaultTextArea;

                $.AKjs.asynJs([
                 "/AtawStatic/lib/03Extend/emotion/jquery.qqFace.js",
                 "/AtawStatic/lib/03Extend/emotion/jquery.sinaEmotion.js"
                ],
                 function () {
                     _$replyDiv.find(".ACT-EMOTION").qqFace({ assign: textid, path: '/Content/images/face/' });
                 });

                if (_$replyInput.is(":visible")) {
                    _$replyInput.hide();
                }
                else {
                    _$replyInput.show();
                    //if (_$replyInput.find(".ACT-LIMIT").length == 0) {
                    //    var $limit = $('<div class="ACT-LIMIT"/>');
                    //    $limit.AtawShareControl();
                    //    _$replyInput.append($limit);
                    //}
                    _replyEditor.focus();
                    _$replyInput.parents(".ACT-COMMENT-ROW").siblings().find(".ACT-REPLY-INPUT").hide();
                    _$main.find(".ACT-SUBREPLY-INPUT").hide();

                    //发表回复
                    // _$replyInput.find("a.publishReply").unbind("click").bind("click", function () {
                    _$replyInput.find(".publishReply").unbind("click").bind("click", function () {
                        //var _body = _replyEditor.dataValue();
                        var _body = _replyEditor.val();
                        if (_body .AisEmpty())
                            return;
                        _body = replace_em(_body).stringToHex(); //解析表情
                        var _postDs = {};
                        var _dt = _postDs[_this.ParentFormObj.ReplyTableName] = [];
                        var _commentId = _this.$JObj.attr("comment_id");
                        var _toUserId = _this.$JObj.attr("user_id");
                        var _row = { FID: null, COMMENTID: _commentId, OBJECTID: _this.ParentFormObj.ObjectId, REPLYID: null, BODY: _body, REPLYUSERID: _toUserId };
                        _dt.push(_row);
                        //                        var _actDt = _postDs["SNS_ACTIVITIES"] = [];
                        //                        var _actRow = { FID: null, USERID: _$main.attr("user_id"), USERNAME: _$main.attr("user_name"),
                        //                            SOURCECONTENT: _$main.find(".qing_content:first").text()
                        //                        };
                        //                        _actDt.push(_actRow);
                        //var _obj = _this.$JObj.find(".ACT-LIMIT").AtawControl();
                        //var shareData = _obj.dataValue();
                        //if (shareData.length == 0) {
                        //    var _privacyDt = _postDs["ACTIVITIES_PRIVACY"] = [];
                        //    var _sharerow = { PRIVACY: "ToUser", OWNERID: _toUserId };
                        //    _privacyDt.push(_sharerow);
                        //} else {
                        //    var _privacyDt = _postDs["ACTIVITIES_PRIVACY"] = shareData;
                        //}
                        $.AKjs.getJSON("/module/modulemerge", { xml: _this.ParentFormObj.ReplyModuleXml, ds: $.toJSON(_postDs), pageStyle: "Insert" }, function (res) {
                            if (res.res > 0) {
                                _$replyInput.hide();
                                //_replyEditor.dataValue("");
                                _replyEditor.val("");
                                _this.reInitReplies(_commentId);
                            }
                        });
                    });
                }
            });

        });

        //初始化行
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createColumn", function (options) {
            return $.AKjs.AtawBaseColumnDom(options);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "reInitReplies", function (commentId) {
            var _ds = {};
            var _dt = _ds[this.ParentFormObj.ReplyTableName + "_SEARCH"] = [];
            var _row = { COMMENTID: commentId };
            _dt.push(_row);
            var _this = this;
            $.AKjs.getJSON("/module/module", { xml: _this.ParentFormObj.ReplyModuleXml, ds: $.toJSON(_ds), pageStyle: "List" }, function (res) {
                var _form = res.Forms[_this.ParentFormObj.ReplyTableName];
                _form.FormType = "Reply";
                var _op = { Data: res.Data, Form: _form, RegName: _this.ParentFormObj.ReplyModuleXml };
                _this.$JObj.find(".ACT-REPLIES").clear();
                _this.$JObj.find(".ACT-REPLIES").AtawReplyForm(_op);
            });
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initReplyRowContent", function () {
            var _rowDiv = $("<div class='media'></div>");
            _rowDiv.append("<a class='pull-left ACT-REPLY-AVATAR'></a>");
            var _$body = $("<div class='media-body'></div>");
            _$body.append("<div><small><a class='ACT-REPLY-USER'></a><span class='ACT-REPLY-BODY'></span></small></div>");
            _$body.append("<small><span class='text-muted ACT-REPLY-DATE'></span><a class='ACT-REPLY-BTN'> 回复</a></small>");
            _rowDiv.append(_$body);
            this.$JObj.find(".ACT-REPLIES").append(_rowDiv);
            return _rowDiv;
        });

    }
})(jQuery);