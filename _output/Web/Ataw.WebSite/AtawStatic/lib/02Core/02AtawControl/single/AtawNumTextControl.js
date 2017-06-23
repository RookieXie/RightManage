(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.fn.AtawNumText = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawNumText", options);
    }
    $.AKjs.AtawNumText = function (options) {
        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawNumTextControl());
    }

    function AtawNumTextControl() {
        this.$body = $('<div>'
        + '<input id="numeric" type="number" value="17" min="0" max="100" step="1" />'
        + '</div>');
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "creator", function () {

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "init", function () {
            var _this = this;
            this.$JObj.append(this.$body);
            this.$body.find("input[id]").each(function () {
                //$(this).kendoNumericTextBox();
                _this.triggerChangeEvent();
            });
        });



        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dataValue_Get", function () {
            var selVals = [];
            var _this = this;
            this.$body.find(".k-input:odd").each(function () {
                var _inputVal = $(this).val();
                selVals.push(_inputVal);
            });
            return selVals;

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Set", function (val) {
            var _value = val.split("，");
            var _isItem = this.$body.find("input.k-input:odd");
            var _showVal = this.$body.find("input.k-input:even");
            for (var i = 0; i < _value.length; i++) {
                _isItem.val(_value[i]);
                _showVal.val(_value[i]);
            };

        });
        //设为只读
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "getReadOnlyText", function () {
            var _tagVal = [];
            var _this = this;
            _this.$body.find(".k-input:even").each(function () {
                _tagVal.push($(this).val());
            });
            return _tagVal;

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dispose", function () {
            this.AtawBaseDom_dispose();
        });


    };
})(jQuery);