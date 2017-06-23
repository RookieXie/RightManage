(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.fn.AtawDetailDate = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawDetailDate", options);
    }

    //类的构造函数
    $.AKjs.AtawDetailDate = function (options) {

        return $.extend({}, $.AKjs.AtawDetail(options), new AtawDetailDateControl());
    }

    function AtawDetailDateControl() {
        this.IsReadOnlyControl = true;
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "valueFormat", function (val) {
            return new Date().Aparse(val).Aformat("yyyy年mm月dd日");
        });

    }
})(jQuery);