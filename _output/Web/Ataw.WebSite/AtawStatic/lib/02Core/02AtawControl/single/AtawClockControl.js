(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};

    $.fn.AtawClockPicker = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawClockPicker", options);
    }


    $.AKjs.AtawClockPicker = function (options) {
        return $.extend({}, $.AKjs.AtawText(options), new AtawClockPickerControl()).sysCreator();
    };

    function AtawClockPickerControl() {
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "afterInit", function () {
            var _this = this;

            this.asynJs([
            "/AtawStatic/lib/03Extend/clockpicker/jquery-clockpicker.min.css",
            "/AtawStatic/lib/03Extend/clockpicker/jquery-clockpicker.min.js"
                         ], 
            function () {
                _this.$JObjText.clockpicker({
                    placement: 'top',
                    align: 'left',
                    autoclose: true
                });
                _this.$JObjText.addClass("runcode");
            });

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "initChange", function (val) {
            var _this = this;
            this.$JObjText.change(function () {
                var _val = $(this).val();
                _this.dateChange(_val);
            });
            this.$JObjText.blur(function () {
                _this.legal();
            });

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dateChange", function (val) {
            this.DataValue.setValue(val);
            this.triggerChangeEvent();
        });
    }
})(jQuery);