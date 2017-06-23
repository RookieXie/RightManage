(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.fn.AtawPCAS = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawPCAS", options);
    }

    //类的构造函数
    $.AKjs.AtawPCAS = function (options) {
        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawPCASControl()).sysCreator();
    }

    function AtawPCASControl() {
        //PCAS控件显示筛选项的个数,默认3项
        this.PCASDisplayItemsCount = 3;
        //PCAS控件的必填项个数，默认可不填
        this.PCASRequiredCount = 3;
        var _id = $.AKjs.getUniqueID();
        this.$Hidden = $("<input type=\"hidden\" />");
        this.$Province = $("<select name=\"province" + _id + "\"></select>");
        this.$City = $("<select name=\"city" + _id + "\"></select>");
        this.$Area = $("<select name=\"area" + _id + "\"></select>");

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            //设置PCAS控件显示筛选项的个数
            this.setProByOptName("PCASDisplayItemsCount", "PCASDisplayItemsCount");
            //设置PCAS控件的必填项个数
            this.setProByOptName("PCASRequiredCount", "PCASRequiredCount");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            if (this.PCASDisplayItemsCount == 2) {
                this.$Area.hide();
            }
            this.$JObj.append(this.$Province);
            this.$JObj.append(this.$City);
            this.$JObj.append(this.$Area);
            var _val = this.DataValue.getValue();
            var arr = [];
            var _this = this;
            this.asynJs(["/AtawStatic/lib/03Extend/PCAS/pcasunzip.js"], function () {
                if (!$.AKjs.IsEmpty(_val)) {
                    arr = _val.split("-");
                    _this.$Hidden.val(_val);
                    new PCAS(_this.$Province.attr("name"), _this.$City.attr("name"), _this.$Area.attr("name"), arr[0], arr[1], arr[2]);
                    _this.$Hidden.val(_val);
                } else {
                    new PCAS(_this.$Province.attr("name"), _this.$City.attr("name"), _this.$Area.attr("name"));
                    _this.$Hidden.val("全国");
                    _this.triggerChangeEvent();

                }

                _this.$JObj.find("select").change(function () {
                    _this.triggerChangeEvent();
                });

            });

        });

        //重写赋值方法
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dataValue_Set", function (val) {
            if (!$.AKjs.IsEmpty(val)) {
                var arr = val.split("-");
                this.$Hidden.val(val);
                this.$JObj.find("select option").remove();
                new PCAS(this.$Province.attr("name"), this.$City.attr("name"), this.$Area.attr("name"), arr[0], arr[1], arr[2]);
                this.$Hidden.val(val);
            } else {
                this.$Hidden.val("全国");
            }
        });

        //重写赋值方法
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dataValue_Get", function () {
            var _p = this.$Province.val();
            var _c = this.$City.val();
            var _a = this.$Area.val();
            //var _val = _p + "-" + _c + "-" + _a;
            var _val = _p;
            if (!$.AKjs.IsEmpty(_c))
                _val = _val + "-" + _c;
            if (!$.AKjs.IsEmpty(_a))
                _val = _val + "-" + _a;
            this.$Hidden.val(_val);
            return _val;
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "getTipJobj", function () {
            return this.$JObj;
        });


    }
})(jQuery);