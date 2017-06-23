(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};

    $.fn.AtawRadioNavi = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawRadioNavi", options);
    }

    $.AKjs.AtawRadioNavi = function (options) {
        return $.extend({}, $.AKjs.AtawCheckBoxNavi(options), new AtawRadioNaviControl());
    };

    function AtawRadioNaviControl() {
        //this.GroupName = null;
        //$.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getTypeName", function () {
        //    return "Radio";
        //});
        //$.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createContent", function () {
        //    if (this.NaviFrom.GroupName) {
        //        this.GroupName = this.NaviFrom.GroupName;
        //    }
        //    else {
        //        this.GroupName = "gn" + $.AKjs.getUniqueID();
        //    }
        //    this.AtawBaseNaviControl_createContent();
        //})
        //$.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setItemText", function (dv, item) {
        //    this.AtawBaseSeletorNaviControl_setItemText(dv, item);
        //    dv.attr("name", this.GroupName);
        //});
        //$.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getCurrentSelectedItem", function () {
        //    var currentChecked = [];
        //    this.$Content.find("input[type='radio']:checked").each(function () {
        //        currentChecked.push($(this).val());
        //    });
        //    return currentChecked.toString();
        //});

    }

})(jQuery);