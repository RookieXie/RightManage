(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    //继承基类
    $.AKjs.AtawReplyRowDom = function (options) {
        return $.extend({}, $.AKjs.AtawBaseRowDom(options), new AtawReplyRowDom()).sysCreator();
    }

    function AtawReplyRowDom() {

        this.IsShowReplyInput = false;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.AtawBaseRowDom_creator();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            if (this.NoDelete && this.IsViewPage) {
                this.$JObj.parent().find(".ACT-CHECK-SINGLE").remove();
            }
            var _userName = null //评论人名字
            var _replyUserName = null; //被评论人名字
            var _replyUserID = null; //被评论人ID
            var _commentId = null;
            for (var i = 0; i < this.ColumnList.length; i++) {
                var _column = this.ColumnList[i];
                var _dataText = _column.AtawControlObj.DataText;
                if (_column.ColumnConfig.Name == "FID") {
                    this.$JObj.attr("reply_id", _dataText);
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
                    _obj = this.$JObj.find(".ACT-REPLY-USER");
                    _obj.append("<a class='commentator ACT-SNS-USER-LINK'>" + _dataText + ":</a>");
                    _userName = _dataText;
                    this.$JObj.attr("user_name", _dataText);
                }
                else if (_column.ColumnConfig.Name == "REPLYNICKNAME") {
                    _replyUserName = _dataText;
                }
                else if (_column.ColumnConfig.Name == "REPLYUSERID") {
                    _replyUserID = _dataText;
                }
                else if (_column.ColumnConfig.Name == "BODY") {
                    _obj = this.$JObj.find(".ACT-REPLY-BODY");
                    _dataText = _dataText.replace(/<p>(.*?)<\/p>/gi, "$1");
                    _obj.append(_dataText);
                }
                else if (_column.ColumnConfig.Name == "CREATE_TIME") {
                    _obj = this.$JObj.find(".ACT-REPLY-DATE");
                    _obj.append(_dataText);
                }
            }
            // this.$JObj.find(".qing_avatar a").attr("lkid", this.$JObj.attr("user_id"));
            if (_userName != _replyUserName && _replyUserName != "") {
                this.$JObj.find(".ACT-REPLY-USER").text("");
                this.$JObj.find(".ACT-REPLY-USER").append("<a class='commentator ACT-SNS-USER-LINK'>" + _userName + "</a> 回复 <a class='reply_to ACT-SNS-USER-LINK'>" + _replyUserName + "</a>: ");
            }
            //            this.$JObj.find(".qing_commentator a.commentator").attr("lkid", this.$JObj.attr("user_id"));
            //            this.$JObj.find(".qing_commentator a.reply_to").attr("lkid", _toUserID);

            // var _$replyDiv = $("<div class='ACT-SUBREPLY-INPUT' style='display:none;margin-left:50px'><div class='ACT-SUBREPLY-EDITOR'></div><a class='btn btn-default publishReply'><span>评论</span></a></div>");
            var _$replyDiv = $("<div class='ACT-SUBREPLY-INPUT' style='display:none;margin-left:50px'></div>");

            this.$DefaultTextArea = $("<textarea class='ACT-COMMENT-TEXTAREA form-control acs-comment-textarea'innertext='' placeholder='请输入...'></textarea>");
            this.$Button = $("<div><img class='ACT-EMOTION ' style='width:30px;height:30px;' src='/areas/uisdk/Content/images/happy.png'><a class='btn btn-default publishReply pull-right' style='padding: 3px 8px;border-radius:0;'><span>评论</span></a></div>");
            var textid = "comment-input" + $.AKjs.getUniqueID();
            this.$DefaultTextArea.attr("id", textid);
            _$replyDiv.append(this.$DefaultTextArea);
            _$replyDiv.append(this.$Button);

            this.$JObj.append(_$replyDiv);
            // _$replyDiv.find(".ACT-SUBREPLY-EDITOR").AtawEditor();
            var _this = this;
            //回复
            _this.$JObj.find(".ACT-SUBREPLY-BTN").unbind("click").bind("click", function () {
                var _$main = _this.$JObj.parents(".ACT-COMMENTS");
                var _$replyInput = _this.$JObj.find(".ACT-SUBREPLY-INPUT");
                //var _replyEditor = _$replyInput.find(".ACT-SUBREPLY-EDITOR").AtawControl();
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
                    _$replyInput.parent().siblings().find(".ACT-SUBREPLY-INPUT").hide();
                    _$main.find(".ACT-REPLY-INPUT").hide();

                    _$replyInput.find("a.publishReply").unbind("click").bind("click", function () {

                        //var _body = _replyEditor.dataValue();
                        var _body = _replyEditor.val();
                        if (_body .AisEmpty())
                            return;
                        _body = replace_em(_body).stringToHex(); //解析表情
                        var _postDs = {};
                        var _dt = _postDs[_this.ParentFormObj.TableName] = [];
                        var _commentId = _this.$JObj.parents(".ACT-COMMENT-ROW").attr("comment_id");
                        var _replyId = _this.$JObj.attr("reply_id");
                        var _toUserId = _this.$JObj.attr("user_id");
                        var _row = { FID: null, COMMENTID: _commentId, OBJECTID: _this.ParentFormObj.ObjectId, REPLYID: _replyId, BODY: _body, REPLYUSERID: _toUserId };
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
                        $.AKjs.getJSON("/module/modulemerge", { xml: _this.ParentFormObj.RegName, ds: $.toJSON(_postDs), pageStyle: "Insert" }, function (res) {
                            if (res.res > 0) {
                                _$replyInput.hide();
                                //_replyEditor.dataValue("");
                                _replyEditor.val("");
                                if (_this.ParentFormObj.AfterReplyFun)
                                    _this.ParentFormObj.AfterReplyFun();
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
            var _dt = _ds[this.ParentFormObj.TableName + "_SEARCH"] = [];
            var _row = { COMMENTID: commentId };
            _dt.push(_row);
            var _this = this;
            $.AKjs.getJSON("/module/module", { xml: _this.ParentFormObj.RegName, ds: $.toJSON(_ds), pageStyle: "List" }, function (res) {
                var _form = res.Forms[_this.ParentFormObj.TableName];
                _form.FormType = "Reply";
                var _op = { Data: res.Data, Form: _form, RegName: _this.ParentFormObj.RegName };
                var _$replies = _this.$JObj.parents(".ACT-COMMENT-ROW").find(".ACT-REPLIES");
                _$replies.clear();
                _$replies.AtawReplyForm(_op);
            });
        });
    }
})(jQuery);