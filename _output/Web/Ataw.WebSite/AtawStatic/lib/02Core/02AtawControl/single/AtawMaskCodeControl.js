(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.fn.AtawMaskCode = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawMaskCode", options);
    }

    //类的构造函数
    $.AKjs.AtawMaskCode = function (options) {

        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawMaskCodeControl()).sysCreator();
    }

    function AtawMaskCodeControl() {

        this.$Content = $("<p class='acs-maskcode-base acs-maskcode-edit ' contenteditable=\"true\" ></p>");
        this.OldValue = "";

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "formatMaskCode", function () {
          //  function setCode($code) {
            // var _$this = $code;
                  var   $code = this.$Content;
                 var _txt = $code.text().replace(/\s+/g, "");;//去掉所有空格
                var _list = _.str.chop(_txt, 3);
                var _color = [ "black", "green"];
                if (_list) {
                    for (var i = 0 ; i < _list.length ; i++) {
                        var _item = _list[i];
                        var _col = i % 2;
                        if (i == _list.length - 1) {
                            if (_item.length == 1) {
                                _item = _item + "00";
                            }
                            if (_item.length == 2) {
                                _item = _item + "0";
                            }
                        }
                        _list[i] = "<b   style='color:" + _color[_col] + ";'>" + _item + "</b>";
                    }
                    var _str = _list.join("");
                    $code.html(_str);
                }
                else {
                    $code.html("");
                }
                
           // }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            var _val = this.DataValue.getValue();
            var _vall = this.valueFormat(_val);
           
            if (_vall == null) _vall = "";
            this.$Content.text(_vall);
            this.formatMaskCode();
            var _this = this;
            this.$Content.off("blur").on("blur", function () {
                _this.formatMaskCode();
                var _newVal = _this.dataValue_Get();
                if (_newVal != _this.OldValue) {
                    _this.OldValue = _newVal;
                    _this.triggerChangeEvent();

                }
            });

            this.$JObj.append(this.$Content);
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Get", function () {
            return this.$Content.text().replace(/\s+/g, "");
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Set", function (opt_str) {
            this.$Content.text(opt_str);
            this.formatMaskCode(opt_str);
        });

       

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "valueFormat", function (val) {
            return val;
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "toReadStatus", function (isReadOnly) {
            this.$Content.attr("contenteditable", isReadOnly ? "false" : "true");
            this.$Content.toggleClass("acs-maskcode-edit", !isReadOnly);
            this.IsReadOnly = isReadOnly;
        });

    }
})(jQuery);