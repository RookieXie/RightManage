(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.fn.AtawDateTime = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawDateTime", options);
    }

    $.AKjs.AtawDateTime = function (options) {
        return $.extend({}, $.AKjs.AtawText(options), new AtawDateTimeControl());
    }

    //时间文本框
    function AtawDateTimeControl() {
        this.PlaceHolder = "请选择日期时间...";
        this.E_Path = "/AtawStatic/lib/03Extend/lhgcalendar/lhgcalendar.min.js";
        //重写基类初始化方法
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "afterInit", function () {

            var _this = this;
           // fullcalendar
            var _this = this;
            this.asynJs([this.E_Path, "/AtawStatic/lib/03Extend/lhgcalendar/skins/lhgcalendar.css"], function () {
                // _this.asynJs("/AtawStatic/lib/03Extend/lhgcalendar/skins/lhgcalendar.css");

                _this.$JObjText.calendar({
                    format: "yyyy-MM-dd HH:mm:ss",
                    btnBar: true,
                    onSetDate: function () { _this.dateChange(this.getDate('dateTime')); }
                });
            });
            this.$JObjText.addClass("runcode");


//            var _this = this;
//            this.$JObjText.calendar({
//                format: "yyyy-MM-dd HH:mm:ss",
//                // btnBar: false,
//                onSetDate: function () { _this.dateChange(this.getDate('dateTime')); }
//            });
//            this.$JObjText.addClass("runcode");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "initChange", function () {
            var _this = this;
            this.$JObjText.change(function () {
               // debugger;
               // alert(1);
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
            //debugger;
            //alert(2);
            if (val == "" || val == null || val.AisDateTime() || val.AisDate()) {
                this.DataValue.setValue(val);
                this.triggerChangeEvent();
            }
            else {
                alert("日期控件的格式不对");
                this.$JObjText.val("");
            }

        });

    }

})(jQuery);
