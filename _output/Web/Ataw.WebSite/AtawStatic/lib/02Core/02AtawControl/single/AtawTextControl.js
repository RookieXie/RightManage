(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    //对UI控件的扩展
    $.fn.AtawText = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawText", options);
    }

    $.AKjs.AtawText = function (options) {
        return $.extend({}, $.AKjs.AtawBaseText(options), new AtawTextControl());
    }

    //普通文本框
    function AtawTextControl() {
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "getTypeName", function () {
            return "text";
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "getTipJobj", function () {
            //alert(this.$JObj().parent().html());
            return this.$JObj().parent();
        });
    }
})(jQuery);
