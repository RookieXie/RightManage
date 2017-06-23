(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.AKjs.AtawInsertPage = function (options) {
        return $.extend({}, $.AKjs.AtawViewPage(options), new AtawInsertPage()).sysCreator();
    }


    $.fn.AtawInsertPage = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawInsertPage", options);
    }

    function AtawInsertPage() {
        this.$Grid = $("<div class=\"ACT-DETAIL-PAGE\"></div>");
        this.FunReload = null;
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.PageStyle = "Insert";
            this.FunReload = this.Options.FunReload;
            this.AtawViewPage_creator();
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initForms", function () {
          //  this.$PanelHeader.hide();
            this.AtawViewPage_initForms();
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initTitle", function () {
            this.$Title = $("<div>" + this.Title + "</div>");
           // alert();
            //this.$PanelHeader.hide();
        });

        //        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initHeader", function () {
        //            var $btnGroup = $('<div class="btn-group pull-right"></div>');
        //            var $shortCutJObj = this.getShortcutBtnJObj();
        //            $btnGroup.append($shortCutJObj);
        //            this.$PanelHeader.append(this.Title).append($btnGroup);
        //        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "afterPostData", function (keys) {
            if (this.AtawSubmitSetting.afterInsertFun) {
                this.AtawSubmitSetting.afterInsertFun(this, keys);
            } else {
                this.openListPage(keys);
            }
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getPageState", function () {
            this.PageState = {};
            if (this.KeyValue) {
                this.PageState.keys = this.KeyValue;
            }
            return this.AtawViewPage_getPageState();
        });
    }
})(jQuery);
