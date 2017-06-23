(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.fn.AtawAmountDetail = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawAmountDetail", options);
    }

    //类的构造函数
    $.AKjs.AtawAmountDetail = function (options) {

        return $.extend({}, $.AKjs.AtawDetail(options), new AtawAmountDetail()).sysCreator();
    }

    function AtawAmountDetail() {

        this.Amount = 0.0;
        this.Unit = "";//单位，空为默认， W 表示以万为单位
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.setProByOptName("Unit", "Unit");
            //
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            var _val = $.AKjs.RegNameDataGet(this.RegName, this.DataValue.Ds, this.DataValue, "", this.DataValue.Index);
            if (_val == null || _val == "") _val = 0.0;
           this.AmountFormat(_val, false);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Get", function () {
            var _val = this.$JObj.text().replace(/[\s￥,万元]+/g, "");
            if (this.Unit == "W") {
                var vv = Math.pow(10, 2);
                _val = Math.round(parseFloat(_val) * 10000 * vv) / vv;
                return parseFloat(_val) * 10000;
            } else {
                var vv = Math.pow(10, 6);
                return Math.round(parseFloat(_val) * vv) / vv;
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Set", function (opt_str) {
            // this.$Content.find("input.ACT-MINI").text(opt_str);
            this.AmountFormat(opt_str,true);
        });

       

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "AmountFormat", function (val,isSet) {
            //  return val;
            var _this = this;
            this.asynJs(["/AtawStatic/lib/03Extend/amount/amountconvert.js"], function () {
                var _val = val;
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

                if (_this.DetialFormatFun) {
                    var _$val = $("<span>" + val + "</span>").text();
                    val = _this.DetialFormatFun(_$val, _this.ParentFormObj, val, _this);
                }

                _this.$JObj.html(_val);
                if (isSet) {

                    _this.triggerChangeEvent();
                }
            });

        });

      
    }
})(jQuery);