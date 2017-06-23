(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    //类的构造函数
    $.AKjs.AtawBaseText = function (options) {
        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawBaseTextControl()).sysCreator();
    }

    function AtawBaseTextControl() {
        // this.$JObjControl = $("<div></div>"); //装载html标签的类
        this.$JObjText = null;
        this.PlaceHolder = "..";
        this.HasInput = true;
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "initLegal", function () {
            this.LegalObj = $.AKjs.AtawTextLegal(this);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "initChange", function () {
            var _this = this;
            this.$JObjText.change(function () {
                _this.DataValue.setValue($(this).val());

                _this.triggerChangeEvent();
            });
            this.$JObjText.blur(function () {
                _this.legal();
            });
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "init", function () {
            var _this = this.$JObj;
            var _control = this.createItem(); //获取当前的控件

            var _val = this.DataValue.getValue();
            var _vall = this.valueFormat(_val);
            _control.val(_vall);

            this.$JObjText = _control;
           //if (this.HasInput) {
           //     this.$JObj.append($("<i class=\"icon-edit acs-icon-edit\"></i>"));
           // }
            this.$JObj.append(_control);
            //            this.$JObjText.blur(function () {
            //                _this.data("ATAW_CONTROL").legal();
            //            });
        });

        //重写创建标签方法
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "createItem", function () {
            return $("<input   placeholder='" + this.PlaceHolder + "'   class='form-control ask-input input-border '  type='" + this.getTypeName() + "' />");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Set", function (opt_str) {
            this.$JObjText.val(opt_str);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "valueFormat", function (val) {
            return val;
        });
    }
})(jQuery);