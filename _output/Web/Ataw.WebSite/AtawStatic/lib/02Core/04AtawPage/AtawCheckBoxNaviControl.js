(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};

    $.fn.AtawCheckBoxNavi = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawCheckBoxNavi", options);
    }

    $.AKjs.AtawCheckBoxNavi = function (options) {
        return $.extend({}, $.AKjs.AtawBaseSeletorNavi(options), new AtawCheckBoxNaviControl());
    };

    function AtawCheckBoxNaviControl() {
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getTypeName", function () {
            return "Checkbox";
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getCurrentSelectedItem", function () {
            var currentChecked = [];
            this.$Content.find("i,.checkbox").each(function () {
                if ($(this).attr("ichecked") == "true") {
                    currentChecked.push($(this).val());
                }
            });
            return currentChecked.toString();
        });
    }

})(jQuery);