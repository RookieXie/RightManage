(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    //继承基类
    $.AKjs.AtawForwardRowDom = function (options) {
        return $.extend({}, $.AKjs.AtawBaseRowDom(options), new AtawForwardRowDom()).sysCreator();
    }

    function AtawForwardRowDom() {

        this.IsShowForwardInput = false;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.AtawBaseRowDom_creator();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            if (this.NoDelete && this.IsViewPage) {
                this.$JObj.parent().find(".ACT-CHECK-SINGLE").remove();
            }
            //            var _userName = null //评论人名字
            //            var _toUserName = null; //被评论人名字

            for (var i = 0; i < this.ColumnList.length; i++) {
                var _column = this.ColumnList[i];
                //var _$li = $("<li/>");
                //this.$JObj.append(_$li);
                //_column.intoDom(_$li);

                //_column.intoDom(this.$JObj);
                var _dataText = _column.AtawControlObj.DataText;
                if (_column.ColumnConfig.Name == "FID") {
                    this.$JObj.attr("fid", _dataText);
                }
                if (_column.ColumnConfig.Name == "USERID") {
                    this.$JObj.attr("user_id", _dataText);
                }
                if (_column.ColumnConfig.Name == "USERAVATAR") {
                    // _dataText = "<a class='ACT-SNS-USER-LINK'><img  src=\"" + _dataText + "\" class='aks-userlogo' alt=\"\" style=\"width:37px;height:38px\"/></a>";
                    _obj = this.$JObj.find(".qing_avatar");
                    _obj.append(_dataText);
                }
                else if (_column.ColumnConfig.Name == "USERNAME") {
                    _obj = this.$JObj.find(".qing_name");
                    _obj.append("<a href='#'>" + _dataText + ":</a>");
                    this.$JObj.attr("user_name", _dataText);
                }
                else if (_column.ColumnConfig.Name == "BODY") {
                    _obj = this.$JObj.find(".qing_forward_body");
                    _obj.append(_dataText);
                }
                else if (_column.ColumnConfig.Name == "CREATE_TIME") {
                    _obj = this.$JObj.find(".qing_forward_date");
                    _obj.append(_dataText);
                }
            }
            this.$JObj.find(".qing_avatar a").attr("lkid", this.$JObj.attr("user_id"));
            var _strForwardDiv = "<div class='qing_subforward_input' style='display:none;margin-left:50px;'><textarea class='subforward_textarea form-control'" +
                               " style='overflow: hidden; height: 38px;width:100%;resize:none;padding:0'>" +
                               "</textarea><a class='btn btn-default publishForward'><span>转发</span></a></div>";
            this.$JObj.append($(_strForwardDiv));

            var _this = this;
            //转发
            _this.$JObj.find(".forward_action").unbind("click").bind("click", function () {
                //                var _$main = _this.$JObj.parents(".qing_main");
                //                _$main.find(".qing_forward_input").hide();
                var _$parent = _this.$JObj.parents(".ACT-FORWARD");
                var _$forwardInput = _this.$JObj.find(".qing_subforward_input");
                if (_$forwardInput.is(":visible")) {
                    _$forwardInput.hide();
                    // _$main.find(".qing_forward_input").show();
                }
                else {
                    _$forwardInput.show();
                    _$forwardInput.parents(".qing_forwards_row").siblings().find(".qing_subforward_input").hide();

                    //                }
                    //                if (!_this.IsShowForwardInput) {
                    //                    _this.$JObj.find(".qing_subforward_input").show();
                    //                    _this.IsShowForwardInput = true;
                    _$forwardInput.find("a.publishForward").unbind("click").bind("click", function () {

                        var _body = _$forwardInput.find(".subforward_textarea").val();
                        //_body = _body + "//@" + _this.$JObj.find(".qing_name").text() + ":" + _this.$JObj.find(".qing_forward_body").text();
                        var _postDs = {};
                        var _infoDt = _postDs["FORWARDED_INFO"] = [];
                        var _forwardInfo = { FORWARDED_USERID: _this.$JObj.attr("user_id"), FORWARDED_USERNAME: _this.$JObj.attr("user_name"), FORWARDED_BODY: _this.$JObj.find(".qing_forward_body").text() };
                        _infoDt.push(_forwardInfo);

                        var _dt = _postDs["SNS_MICROBLOGS"] = [];
                        var _row = { FID: null, ORIGINALID: _$parent.attr("original_id"), FORWARDEDID: _this.$JObj.attr("fid"), BODY: _body };
                        _dt.push(_row);
                        $.AKjs.getJSON("/module/modulemerge", { xml: "module/sns/microblog/sns_microblogs.xml", ds: $.toJSON(_postDs), pageStyle: "Insert" }, function (res) {
                            if (res.res > 0) {
                                // _$main.find(".qing_forward_input").show();
                                _$forwardInput.hide();
                                if (_$parent.AtawControl() && _$parent.AtawControl().ControlTypeName == "AtawWindow") {
                                    _$parent.AtawControl().hide();
                                }
                                if (_this.ParentFormObj.AfterSubForwardFun)
                                    _this.ParentFormObj.AfterSubForwardFun();
                            }
                        });
                    });
                }
                //                else {
                //                    _this.$JObj.find(".qing_subforward_input").hide();
                //                    _this.IsShowForwardInput = false;
                //                }
            });

        });

        //初始化行
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createColumn", function (options) {
            return $.AKjs.AtawActivityColumnDom(options);
        });
    }
})(jQuery);