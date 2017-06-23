(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};


    $.AKjs.AtawActivityForm = function (options) {
        return $.extend({}, $.AKjs.AtawBaseForm(options), new AtawActivityForm()).sysCreator();
    }

    function _extend() {
        return $.extend({}, $.AKjs.AtawBaseForm(options), new AtawActivityForm());
    }

    $.fn.AtawActivityForm = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawActivityForm", options);
    }

    $.AKjs.InitActivityFormContent = function (formObj) {
        var _$ul = $("<div class='acs-timeline animated ACT-ACTIVITY-DATA'></div>");
        if (formObj.FormName == "TopMyWork")
        {
            _$ul = $("<ul class='qing_messages content-messages clear ACT-ACTIVITY-DATA'></ul>")
        }
        formObj.$RowContent = _$ul;
        formObj.$FormContent.append(_$ul);
    }

    $.AKjs.InitActivityRowContent = function (rowContent) {
        var _$liRow = $("<div class='qing_row timeline-row active clear'><div class='ACT-NODE timeline-icon'><div class='bg-primary'></div></div></div>");
        var _rowMain = $("<div class='qing_main panel timeline-content'>" +
                            "<div class='clear ACT-DATA'>"+
                                "<div class='acs-timeline-heading acs-d'>"+
                                    "<h3 class='acs-timeline-title clear' style='height: 20px;'><span class='qing_name'></span></h3>"+
                                    "<div class='clear'></div>"+
                                    "<p style='margin-top: 10px; line-height: 1.8;' class='clear'>"+
                                        "<small class='qing_to pull-left'></small>" +
                                        "<small class='qing_date text-muted pull-left' style='margin-left:10px;'>" +
                                            "<i class='glyphicon glyphicon-time' style='line-height: 1.2;'></i></small></p>" +
                                "</div>" +
                                "<div class='acs-timeline-body'>"+
                                    "<p style='margin-top: 5px;margin-bottom: 8px;' class='clear'>" +
                                    "<small class='text-muted pull-left qing_content'></small></p>" +
                                "</div>"+
                           "</div>"+
                           "<p class='qing_handle pull-left' style='margin-top: 10px !important;'>"+
                             "<a class='comment_action'><i class='icon-comment-alt fa fa-comment-o'></i>评论<span class='commentCount'></span></a>" +
                             "<a class='act_favorite'></a></p>" +
                           "<p class='clear'></p>"+
                           "<div class='qing_comments clear'></div>" +
                           "<div class='qing_forwards'></div>"+
                       "</div>");
        if (rowContent.hasClass("qing_messages"))
        {
            _$liRow = $("<li class='qing_row'><div class='qing_avatar'></div></li>");
            _rowMain = $("<div class='qing_main'></div>");
            _rowMain.append("<span class='icon-caret-left fa  fa-caret-left icon-2x' style='color: #6ab0ec; position: absolute; left: -20px;'></span>");
            _rowMain.append("<span class='qing_name'></span><b class='qing_date'></b><p class='qing_title'></p><p class='qing_content'><a></a></p>");
            _rowMain.append("<p class='qing_from'></p>");
            _rowMain.append("<p class='qing_to'>@<span  type=''></span></p>");
            _rowMain.append("<p class='qing_handle pull-right'><a class='comment_action'><i class=' icon-comments-alt fa fa-comment-o fs16'> 评论</i><span class='commentCount'></span></a><a class='act_favorite'></a></p><div class='clear'></div>");
            _rowMain.append("<div class='qing_comments clear'></div>");
            _rowMain.append("<div class='qing_forwards'></div>");
        }

        _$liRow.append(_rowMain);
        rowContent.append(_$liRow);
        return _$liRow;
    }

    $.AKjs.CreateActivityRowObj = function (op) {
        //        var _activityKey = op.DataRow["ACTIVITYITEMACTION"];
        //        if (_activityKey == "Comment")
        //            return $.AKjs.AtawActivityRowCommentDom(op);
        var _activityType = op.DataRow["ACTIVITYITEMTYPE"];
        if (_activityType == "CommentMicroBlog" || _activityType == "ReplyMicroBlog")
            return $.AKjs.AtawActivityRowCommentDom(op);
        if (_activityType == "MyWork")
            return $.AKjs.AtawActivityRowMyWorkDom(op);
        return $.AKjs.AtawActivityRowDom(op);
    }

    function AtawActivityForm() {
        this.GroupByDateFun = null;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.setProByOptName("GroupByDateFun", "GroupByDateFun");
            this.AtawBaseForm_creator();

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "createRowObj", function (op) {
            return $.AKjs.CreateActivityRowObj(op);

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initFormContent", function () {
            $.AKjs.InitActivityFormContent(this);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "reloadData", function () {
            //清空数据
            this.$FormContent.empty();

            this.AtawBaseForm_reloadData();
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initRowContent", function () {
            return $.AKjs.InitActivityRowContent(this.$RowContent);

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getRowByCheckBox", function () {
            return this.$FormContent.find(".ACT-CHECK-SINGLE:checked").parents(".common_module");
            //.remove();
        });

        //        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
        //            var _dvId = "ActivityForm" + $.AKjs.getUniqueID();
        //            this.$JObj.attr("id", _dvId);
        //            this.AtawBaseForm_init();
        //        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            var _dvId = "ActivityForm" + $.AKjs.getUniqueID();
            this.$JObj.attr("id", _dvId);
            this.initFormContent();
            this.$JObj.append(this.$FormContent);
            this.initRowList();

            var _this = this;
            if (!this.AfterInitFunName .AisEmpty()) {
                var _fun = $.AKjs.AfterFormFun[this.AfterInitFunName];
                if (_fun) {
                    _fun(this);
                }
                else {
                    alert("表单" + this.FormName + "的加载完函数 ($.AKjs.AfterFormFun." + this.AfterInitFunName + ") 没有被定义");
                }
            }

            if (this.GroupByDateFun)
                this.GroupByDateFun(this);

            // 执行css.js
            //$.AKjs.extraStyle(this);
        });
    }

})(jQuery);
