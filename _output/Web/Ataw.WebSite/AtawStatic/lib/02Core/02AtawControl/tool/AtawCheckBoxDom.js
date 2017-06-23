(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};


    $.AKjs.AtawCheckBoxDom = function (options) {
        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawCheckBoxDom()).sysCreator();
    }
    $.fn.AtawCheckBoxDom = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawCheckBoxDom", options);
    }
    function AtawCheckBoxDom() {
        this.IsSelect = null;
        //<a ichecked="false" class="checkbox cbk-input icon-check-empty"></a>
        this.Value = null;
        //  this.onClickChange = null;
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
            this.$JObj.addClass("checkbox cbk-input fa");
            this.$JObj.SwitchClass("icon-check  fa-check-square-o", "icon-check-empty  fa-square-o", this.IsSelect);
            if (this.Value) {
                this.$JObj.attr("val", this.Value);
            }
            var _this = this;
            this.$JObj.parent().off("click").on("click", function () {
                //_this.IsSelect = !_this.IsSelect;
                _this.setSelect(!_this.IsSelect);
                _this.triggerChangeEvent();
                // _this.onClickChange(_this);
            });

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setValue", function (val) {
            this.Value = val;
            this.$JObj.attr("val", this.Value);

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setSelect", function (isSelect) {
            this.IsSelect = isSelect;
            if (isSelect == true) {
                this.$JObj.removeClass("icon-check-empty fa fa-square-o").addClass("icon-check fa fa-check-square-o");
                this.$JObj.css("color", "#000");
            }
            else {
                this.$JObj.removeClass("icon-check fa fa-check-square-o").addClass("icon-check-empty fa fa-square-o");
                this.$JObj.css("color", "");
            }

        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Get", function () {
            return this.IsSelect;
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Set", function (isSelect) {
            // this.$JObj.attr("val", val);
            // this.Value = val;
            this.setSelect(isSelect);
        });
    }


})(jQuery);