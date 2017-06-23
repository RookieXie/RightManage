(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};

    //    $.fn.AtawSelectorItem = function (options) {
    //        $.AKjs.AtawCreateCall.call(this, "AtawSelectorItem", options);
    //    }

    $.AKjs.AtawSelectorItem = function (options) {
        return $.extend({}, $.AKjs.AtawBaseDom(options), new AtawSelectorItem()).sysCreator();
    }

    function AtawSelectorItem() {
        this.$BtDel = $("<button type='button' class='close' aria-hidden='true'>&times;</button>");
        this.Key = null;
        this.Text = null;
        this.AfterDeleteFun = null;
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.setProByOptName("Key", "Key");
            this.setProByOptName("Text", "Text");
            this.setProByOptName("AfterDeleteFun", "AfterDeleteFun");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "init", function () {
            this.$JObj.append($("<span>" + this.Text + "</span>"));
            this.$JObj.append(this.$BtDel);
            this.$JObj.addClass("ACT-ITEM");
            this.$JObj.attr("key", this.Key);
            var _this = this;
            this.$BtDel.off("click").on("click", function () {
                _this.$JObj.remove();
                if (_this.AfterDeleteFun)
                    _this.AfterDeleteFun(_this);
            });
        });
    }

})(jQuery);