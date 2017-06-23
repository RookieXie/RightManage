(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};


    $.AKjs.AtawSnsClubCard = function (options) {
        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawSnsClubCard()).sysCreator();
    }
    $.fn.AtawSnsClubCard = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawSnsClubCard", options);
    }

    function AtawSnsClubCard() {

        this.ClubId = null;


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "creator", function () {
            this.setProByOptName("ClubId", "ClubId");
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
                _this.$JObj.addClass(" btn-primary", true);
                var _$show = $(this).next().eq(0).find(".popover-content");
                $.AKjs.getJSON("/core/clubcard/show", { id: _this.ClubId }, function (res) {
                    res.$PopvObj = _this.$JObj;
                    _$show.AtawInerSnsClubCard(res);
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