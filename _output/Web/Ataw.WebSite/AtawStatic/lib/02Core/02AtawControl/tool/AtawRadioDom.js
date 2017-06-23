(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};


    $.AKjs.AtawRadioDom = function (options) {
        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawRadioDom()).sysCreator();
    }
    $.fn.AtawRadioDom = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawRadioDom", options);
    }
    function AtawRadioDom() {
        this.IsSelect = null;
        this.Value = null;
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {

            this.setProByOptName("IsSelect", "IsSelect");
            this.setProByOptName("Value", "Value");
            this.setProByOptName("onClickChange", "onClickChange");
            if (this.IsSelect == null) {
                var _val = this.DataValue.getValue();
                this.IsSelect = _val;
            }

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            this.$JObj.addClass(" cbk-input fa");
            this.$JObj.SwitchClass("icon-circle fa-circle", "icon-circle-blank fa-circle-o ", this.IsSelect);
            if (this.Value) {
                this.$JObj.attr("val", this.Value);
            }
            var _this = this;

            this.$JObj.parent().off("click").on("click", function () {

                _this.$JObj.parent().parent().parent().find(".ACT-CKK").each(function () {
                    _this.setSelect(false, $(this));
                });
                _this.setSelect(!_this.IsSelect, _this.$JObj);
                _this.triggerChangeEvent();
            });

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setValue", function (val) {
            this.Value = val;
            this.$JObj.attr("val", this.Value);

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setSelect", function (isSelect,$dom) {
            this.IsSelect = isSelect;

            //this.$JObj.SwitchClass("icon-circle", "icon-circle-blank", isSelect);
            $dom.SwitchClass("icon-circle fa-circle", "icon-circle-blank  fa-circle-o", isSelect);

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setSelects", function (isSelect) {
            this.IsSelect = isSelect;

            this.$JObj.SwitchClass("icon-circle fa-circle", "icon-circle-blank  fa-circle-o", isSelect);
            //$dom.SwitchClass("icon-circle", "icon-circle-blank", isSelect);

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Get", function () {
            return this.IsSelect;
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Set", function (isSelect) {
            // this.$JObj.attr("val", val);
            // this.Value = val;
            this.setSelects(isSelect);
        });
    }


})(jQuery);