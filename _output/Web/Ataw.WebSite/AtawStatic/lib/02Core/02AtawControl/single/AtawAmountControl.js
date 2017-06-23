(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.fn.AtawAmount = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawAmount", options);
    }

    //类的构造函数
    $.AKjs.AtawAmount = function (options) {

        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawAmountControl()).sysCreator();
    }

    function AtawAmountControl() {

        this.$Content = $("<div><input placeholder='请输入小写金额...' class='form-control ask-input input-border ACT-MINI' type='text' /></div>" +
            "<div><div class='item clear'></div><div class='ACT-BIG'></div></div>");
        this.OldValue = "";
        this.Unit = "";//单位，空为默认， W 表示以万为单位
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.setProByOptName("Unit", "Unit");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            if (this.Unit == "W")
                this.$Content.find(".ACT-MINI").attr("placeholder", "输入万单位的金额.");
            var _this = this;
            var _val = this.DataValue.getValue();
            if (_val||_val==0) {
                // this.$Content.find("input.ACT-MINI").val(_val);
                _this.convertToBig(_val,true);
            }
            this.$Content.find("input.ACT-MINI").change(function () {
                var _newVal = $(this).val();
                if (_newVal != _this.OldValue) {
                    _this.OldValue = _newVal;
                    var _num = _this.valueFormat(_newVal);
                    _this.convertToBig(_num);
                    _this.triggerChangeEvent();
                }

            });
            this.$JObj.append(this.$Content);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Get", function () {
            // return this.$Content.find("input.ACT-MINI").text().replace(/[\s￥,]+/g, "");

            var _val = this.valueFormat(this.$Content.find("input.ACT-MINI").val());
            if (this.Unit == "W") {
                return parseFloat(_val) * 10000;
            }
            else {
                return _val;
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Set", function (opt_str,fun) {
            // this.$Content.find("input.ACT-MINI").text(opt_str);
            this.convertToBig(opt_str,true,fun);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "convertToBig", function (val,isW,fun) {
            var _this = this;
            this.asynJs(["/AtawStatic/lib/03Extend/amount/amountconvert.js"], function () {
                var _val = val;
                if (isW) {
                    if (_this.Unit == "W") {
                        _val = parseFloat(val) / 10000;
                        //四舍五入，保留6位小数
                        var vv = Math.pow(10, 6);
                        _val = Math.round(_val * vv) / vv;
                        _val = formatValue(_val) + "万元";
                    }
                    else {
                        _val = formatValue(_val) + "元";
                    }
                    _this.$Content.find("input.ACT-MINI").val(_val);
                    _this.$Content.find(".ACT-BIG").text(atoc(val));
                }
                else {
                    _val = formatValue(_val);
                    if (_this.Unit == "W") {
                        _val = _val + "万元";
                        _this.$Content.find("input.ACT-MINI").val(_val);
                        _this.$Content.find(".ACT-BIG").text(atoc(parseFloat(val) * 10000));
                    }
                    else {

                        _val = _val + "元";
                        _this.$Content.find("input.ACT-MINI").val(_val);
                        _this.$Content.find(".ACT-BIG").text(atoc(parseFloat(val)));
                    }
                   
                }
                if (fun) {

                    fun.call(_this);
                   // _this.call(fun);  
                }
               
            });
            return true;
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "valueFormat", function (val) {
            //  return val;
             return  val.replace(/[\s￥,万元]+/g, "");
            
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "toReadStatus", function (isReadOnly) {
            this.IsReadOnly = isReadOnly;
            var $input = this.$Content.find("input.ACT-MINI");
            if (isReadOnly) {
                $input.attr("readonly", "readonly");
            }
            else {
                $input.removeattr("readonly");
            }
        });
    }
})(jQuery);