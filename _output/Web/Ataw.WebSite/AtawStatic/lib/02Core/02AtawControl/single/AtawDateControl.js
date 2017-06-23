(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.fn.AtawDate = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawDate", options);
    }

    $.AKjs.AtawDate = function (options) {
        return $.extend({}, $.AKjs.AtawText(options), new AtawDateControl());
    }

    //年月日文本框
    function AtawDateControl() {
        this.PlaceHolder = "请选择日期...";
        this.E_Path = "/AtawStatic/lib/03Extend/lhgcalendar/lhgcalendar.min.js";
        //重写基类
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "afterInit", function () {
            var _this = this;
            //fullcalendar
            var _this = this;
            this.asynJs([this.E_Path, "/AtawStatic/lib/03Extend/lhgcalendar/skins/lhgcalendar.css"], function () {
               // _this.asynJs("/AtawStatic/lib/03Extend/lhgcalendar/skins/lhgcalendar.css");

                _this.$JObjText.calendar({
                    format: "yyyy-MM-dd",
                    btnBar: false,
                    onSetDate: function () { _this.dateChange(this.getDate('date')); }
                });
            });
            this.$JObjText.addClass("runcode");

            // var _val = this.dataValue_Get();
            // this.dataValue_Set(_val);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "initChange", function () {
            var _this = this;
            this.$JObjText.change(function () {
                var _val = $(this).val();
                _this.dateChange(_val);
                //_this.DataValue.setValue($(this).val());
                //_this.triggerChangeEvent();
            });
            this.$JObjText.blur(function () {
                _this.legal();
            });
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dateChange", function (val) {
            if (val == "" || val == null || val.AisDateTime() || val.AisDate()) {
                this.DataValue.setValue(val);
                this.triggerChangeEvent();
            }
            else {
                alert("日期控件的格式不对");
                this.$JObjText.val("");
            }


        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "valueFormat", function (val) {
            if (val) {
                return new Date().Aparse(val).Aformat("yyyy-mm-dd");
            }
        });

    }

})(jQuery);
