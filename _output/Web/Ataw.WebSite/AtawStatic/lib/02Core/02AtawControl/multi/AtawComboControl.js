(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};

    $.fn.AtawCombo = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawCombo", options);
    }

    $.AKjs.AtawCombo = function (options) {
        // var _options = $.AKjs.Options();

        return $.extend({}, $.AKjs.AtawBaseMulti(options), new AtawComboControl()).sysCreator();
    };

    function AtawComboControl() {
        this.$JObjMultiControl = $('<select   ><option value="">--请选择--</option></select>');

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setItemText", function (dv, text) {
//            dv.text($(text).text());
            dv.text(text.AgetTextByHtml());
           
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createItem", function () {
            return $("<option></option>");
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initItem", function (_item, val) {
            _item.val(val);
            //var _$li = $("<li/>");
            this.$JObjMultiControl.append(_item);
            //_$li.append(_item);
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Set", function (val) {
            //var _kendo = this.$JObjMultiControl.data("kendoDropDownList");
            // _kendo.value(val);
            this.$JObjMultiControl.val(val);

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "afterInit", function () {
            var _this = this;
            this.$JObjMultiControl.change(function () {
                //alert($(this).val());
                _this.dataValue($(this).val());
            });
            //            this.$JObjMultiControl.kendoDropDownList({
            //                change: function () {
            //                    _this.dataValue(this.value());
            //                    //_this.triggerChangeEvent();
            //                }
            //            });
        });

    }



})(jQuery);