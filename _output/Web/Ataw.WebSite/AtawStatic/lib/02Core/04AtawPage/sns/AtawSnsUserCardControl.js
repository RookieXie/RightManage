(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};


    $.AKjs.AtawSnsUserCard = function (options) {
        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawSnsUserCard()).sysCreator();
    }
    $.fn.AtawSnsUserCard = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawSnsUserCard", options);
    }

    function AtawSnsUserCard() {

        this.UserId = null;


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "creator", function () {

            // this.setProByOptName("IsSelf", "IsSelf");
            this.setProByOptName("UserId", "UserId");

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {

            this.$JObj.popover({ html: true,
                title: '名片<button class="btn btn-default btn-xs ACT-POPV—CLOSE pull-right"><i class="icon-remove fa fa-times"></i></button>',
                placement: "bottom",
                content: '正在载入数据...',
                delay: { show: 1000, hide: 100 },
                trigger: "click"
            });
            var _this = this;
            //----------------------------------
            this.$JObj.on("shown.bs.popover", function () {
                //$(this).next().eq(0).addClass("panel panel-primary");
                _this.$JObj.addClass(" btn-primary", true);
                var _$show = $(this).next().eq(0).find(".popover-content");
                $.AKjs.getJSON("/core/card/show", { id: _this.UserId }, function (res) {
                	res.$PopvObj = _this.$JObj;
                    _$show.AtawInerSnsUserCard(res);
                    //                    _$show.find(".ACT-POPV—CLOSE").unbind("click").click(function () {
                    //                        _this.$JObj.click();
                    //                        return false;
                    //                    });

                    //                });
                    $(_this.$JObj[0].nextSibling).find(".arrow").css("display","none");

                });
                $(this).next().eq(0).find(".ACT-POPV—CLOSE").unbind("click").click(function () {
                    _this.$JObj.click();
                    _this.$JObj.removeClass(" btn-primary", false);
                    return false;
                });

            });

        });
    }
})(jQuery);