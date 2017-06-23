(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    //继承基类
    $.AKjs.AtawActivityRowMyWorkDom = function (options) {
        return $.extend({}, $.AKjs.AtawActivityRowDom(options), new AtawActivityRowMyWorkDom()).sysCreator();
    }

    function AtawActivityRowMyWorkDom() {

        this.$ActivityMain = null;
        this.SourceId = null; //动态源ID
        this.SourceType = null; //动态源类别
        this.OriginalType = null;//原文类别
        this.IsShowComments = false;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            //this.AtawBaseRowDom_creator();
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
            this.$ActivityMain.find(".qing_name a").first().attr("lkid", this.$ActivityMain.attr("user_id"));
            this.$ActivityMain.find(".qing_avatar a").attr("lkid", this.$ActivityMain.attr("user_id"));

            //this.$ActivityMain.find("#myworkContain a").addClass("ACT-A-HREF");
            //var _href = "$activitydetail$" + this.SourceId + "$" + this.SourceType;
            //this.$ActivityMain.find("#myworkContain a").attr("href", _href);

            var _this = this;

            /* 移除评论按钮 */
            _this.$ActivityMain.find(".qing_handle").remove();
            /* 移除权限标签 */
            _this.$ActivityMain.find(".qing_to").remove();

        });

        //初始化行
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createColumn", function (options) {
            return $.AKjs.AtawActivityColumnDom(options);
        });
    }
})(jQuery);