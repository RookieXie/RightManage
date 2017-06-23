(function () {
    $.AKjs = $.AKjs ? $.AKjs : {};
    //颜色选择控件
    $.fn.AtawColor = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawColor", options);
    }

    $.AKjs.AtawColor = function (options) {
        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawColorControl());
    };
    //颜色选择控制
    function AtawColorControl() {
        this.$input = $('<input class="color" />');
        //创建颜色选择器
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "init", function () {
            var _this = this;
            this.$JObj.append(this.$input);
            _this.$input.off("change").on("change", function () {
                var myPicker = new jscolor.color(_this.$input[0], {});
                myPicker.pickerClosable = true;
                myPicker.pickerCloseText = '确定';
                _this.triggerChangeEvent();
            });

        });
        //获取颜色值
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dataValue_Get", function () {
            var _this = this;
            var selVal = []
            var _getVal = _this.$input.val();
            selVal.push(_getVal)
            return selVal.join("，");
        });
        //设置颜色值
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dataValue_Set", function (val) {

            var _this = this;
            _this.Reg = /^#[0-9a-fA-F]{6}|[0-9a-fA-F]{3}$/;
            _this.LegalResult = _this.Reg.test(val);
            if (_this.LegalResult) {
                var myPicker = new jscolor.color(_this.$input[0], {});
                myPicker.fromString(val);
            } else {
                alert("请输入正确的颜色值！");
            }


        });
        //设置为只读
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "getReadOnlyText", function () {
            var Val = [];
            var _this = this;
            var _getVal = _this.$input.val();
            Val.push(_getVal);
            return Val.join("，");
        });

    }
})(jQuery);