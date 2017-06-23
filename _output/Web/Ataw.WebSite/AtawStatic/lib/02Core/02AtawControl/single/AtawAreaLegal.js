(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};
    //文本域验证
    function AtawAreaLegal() {
//        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "getTipJobj", function () {
//            return this.AtawControlObj.$JObj.find("textarea");
//        });
    }

    $.AKjs.AtawAreaLegal = function (control) {
        return $.extend({}, $.AKjs.AtawTextLegal(control), new AtawAreaLegal());
    };

})(jQuery);
