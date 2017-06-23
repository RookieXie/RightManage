(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.AKjs.AtawUpdatePage = function (options) {
        return $.extend({}, $.AKjs.AtawViewPage(options), new AtawUpdatePage()).sysCreator();
    }


    $.fn.AtawUpdatePage = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawUpdatePage", options);
    }

    function AtawUpdatePage() {
        this.$Grid = $("<div class=\"ACT-DETAIL-PAGE\"></div>");
        this.FunReload = null;
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.PageStyle = "Update";
            this.FunCancel = this.Options.FunCancel;
            this.FunReload = this.Options.FunReload;
            this.AtawViewPage_creator();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initTitle", function () {
            this.$Title = $("<div>" + this.Title + "</div>");
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initForms", function () {
            //this.initDesktopShortcut();
            this.AtawViewPage_initForms();

        });
        //        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initHeader", function () {
        //            var $btnGroup = $('div class="btn-group pull-right"></div>');
        //            $btnGroup.append(this.getShortcutBtnJObj());
        //            this.$PanelHeader.append(this.Title).append($btnGroup);
        //        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "afterPostData", function () {
            if (this.AtawSubmitSetting.afterUpdateFun) {
                this.AtawSubmitSetting.afterUpdateFun(this, this.KeyValue);
            } else {
                //this.openListPage();
                this.openPreviousPage();
            }
        });

        //        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "notPostData", function () {
        //            this.FunCancel();
        //        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "getPageState", function () {
            this.PageState = {};
            if (this.KeyValue) {
                this.PageState.keys = this.KeyValue;
            }
            return this.AtawViewPage_getPageState();
        });
    }
})(jQuery);
