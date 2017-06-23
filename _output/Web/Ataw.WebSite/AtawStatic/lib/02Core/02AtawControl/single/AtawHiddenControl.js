(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.fn.AtawHidden = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawHidden", options);
    }
 
    $.AKjs.AtawHidden = function (options) {
        return $.extend({}, $.AKjs.AtawBaseText(options), new AtawHiddenControl());
    }

    //隐藏域
    function AtawHiddenControl() {
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "getTypeName", function () {
            return "hidden";
        });
    }

})(jQuery);
