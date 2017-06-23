(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    //继承基类
    $.AKjs.AtawBaseWinSelector = function (options) {
        return $.extend({}, $.AKjs.AtawBaseSelector(options), new AtawBaseWinSelectorControl());
    }

    function AtawBaseWinSelectorControl() {
        this.$WinButton = $("<img   border=0  src='/ico/magnifier.png' class=\"ACT-SELECT-ITEM  inputAutoBtn \" />");
        this.$DataTable = $("<div class=\"ACT-DATA-CONTAINER\"><input type=\"text\" class=\"ACT-SEARCH-BOX  ask-input \"/><img   border=0  src='/ico/magnifier.png' class=\"ACT-SEARCH-BUTTON  SearchButtonList\" alt=\"搜索\"><div class=\"ACT-LOADING\">数据加载中...</div><dl class=\"ACT-DATALIST hb\"></dl></div>");
        this.KendoWin = null;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            this.AtawBaseSelectorControl_init();
            this.$Box.append(this.$WinButton);
            var _this = this;
            this.$WinButton.click(function () { _this.winPositionFun(); });
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "winPositionFun", function () {
            if (this.KendoWin == null) {
                var myTitle = "请选择";
                if (this.Options != null && this.Options.DisplayName != null && this.Options.DisplayName != "") {
                    myTitle = "请选择" + this.Options.DisplayName;
                }
                this.$DataTable.kendoWindow({
                    //                    title: "请选择",
                    title: myTitle,
                    actions: ["Maximize", "Close"],
                    modal: true,
                    width:350
                });
                this.KendoWin = this.$DataTable.data("kendoWindow");
            }
            var _scroll = $.browser.scroll();

            var _winwidth = _scroll.width;
            var _winheight = _scroll.height;

            var _cenleft = _winwidth / 2 - parseInt(this.KendoWin.wrapper.width()) / 2;
            var _centop = _winheight / 2 - parseInt(this.KendoWin.wrapper.height()) / 2;
            this.$Win.wrapper.css({ top: _centop, left: _cenleft });
        });
        var _this = this;
        //浏览器事件
        $(window).resize(function () {
            _this.winPositionFun();
        })
    }
})(jQuery);
