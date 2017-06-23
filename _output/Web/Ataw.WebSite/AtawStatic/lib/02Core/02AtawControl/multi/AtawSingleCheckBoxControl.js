(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};

    $.fn.AtawSingleCheckBox = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawSingleCheckBox", options);
    }

    $.AKjs.AtawSingleCheckBox = function (options) {
        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawSingleCheckBoxControl()).sysCreator(); ;
    };

    function AtawSingleCheckBoxControl() {
        //this.$JObjSingleControl = $("<div><a class='ACT-CK'></a></div>"); 
        this.$CheckBox = $("<a/>");
        this.IsCheck = false;
        this.CheckBoxObj = null;
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.IsCheck = this.DataValue.getValue();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "init", function () {
            this.AtawBaseControl_init();
            this.$JObj.append(this.$CheckBox);
            var _this = this;
            this.$CheckBox.AtawCheckBoxDom({
                IsSelect: this.IsCheck ? true : false,
                Value: "",
                ChangeEventFun: function (a) {
                    _this.triggerChangeEvent();
                    _this.IsCheck = a.dataValue();
                }
            });
            this.CheckBoxObj = this.$CheckBox.AtawControl();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Set", function (opt_str) {
            var _is = opt_str ? true : false;
            this.CheckBoxObj.dataValue(_is);
            this.IsCheck = _is;
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Get", function (opt_str) {
            return this.CheckBoxObj.dataValue();
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getReadOnlyText", function () {

            return this.IsCheck ? "<i  class=' icon-ok fa fa-check '  />" : "<i  class=' icon-remove fa fa-times'  />";
        });
    }

})(jQuery);