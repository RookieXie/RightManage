(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    //继承基类
    $.AKjs.AtawSelectorWinBase = function (options) {
        return $.extend({}, new AtawSelectorWinBase());
    }

    function AtawSelectorWinBase() {

        this.$DataTable = $("<div class=\"ACT-DATA-CONTAINER\"><input type=\"text\" class=\"ACT-SEARCH-BOX\"/><img   border=0  src='/ico/magnifier.png' class=\"ACT-SEARCH-BUTTON  SearchButtonList\" alt=\"搜索\"><div class=\"ACT-LOADING\">数据加载中...</div><dl class=\"ACT-DATALIST hb\"></dl></div>");
        this.$Win = null;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "winOpen", function () {
            var _this = this;
            var myTitle = "请选择";
            if (this.Options != null && this.Options.DisplayName != null && this.Options.DisplayName != "") {
                myTitle = "请选择"+this.Options.DisplayName;
            }
            if (this.$Win == null) {
                this.$DataTable.AtawWindow({
                    Title: myTitle,
                    //activate: function () { _this.winPositionFun(); },
                    Width: 300,
                    Fixed:true 
                });

            }
            this.$DataTable.css({"height":"300px","overflow":"auto","width":"200px"});

            this.$Win = this.$DataTable.AtawControl();
            this.$Win.open();
            //alert();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "winPositionFun", function () {

            var _scroll = $.browser.screen();
            var winwidth = _scroll.width;
            var winheight = _scroll.height;
            var _ss = $.browser.scroll();
            var cenleft = winwidth / 2 - parseInt(this.$DataTable.width()) / 2;
            var _h = parseInt(this.$DataTable.height()) / 2;
            var centop = winheight / 2 + _ss.top - _h;
            //alert(_ss.top);
            // alert(cenleft + "  " + centop + "   --: " + _h);
            this.$Win.$JObj.css({ top: centop, left: cenleft });
            //alert(this.$DataTable.attr("jQuery17106486497165159502"));
            //var _kk = this.$DataTable.attr("keyid");
            //alert(_kk);

            //this.$Win.close();
            // this.$Win.wrapper.show();
        });
        //          var _this = this;
        //                //浏览器事件
        //                $(window).resize(function () {
        //                    _this.winPositionFun();
        //                })
    }
})(jQuery);
