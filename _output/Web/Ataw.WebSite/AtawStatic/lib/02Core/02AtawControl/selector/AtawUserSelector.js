(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.fn.AtawUserSelector = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawUserSelector", options);
    }

    //类的构造函数
    $.AKjs.AtawUserSelector = function (options) {
        var _base = $.extend({}, $.AKjs.AtawPageSelector(options), new AtawUserSelector());
        return _base.sysCreator();
    };

    function AtawUserSelector() {
        this.$SelectButton = $("<a  class='btn btn-primary btn-xs'><i class=\"icon-user fa fa-user ACT-SELECT-ITEM\"></i></a>");
        this.IsMulti = true;
        this.WinTitle = "人员选择器";

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initWinContent", function () {
            var _this = this;
            seajs.use(['addressbookmrc'], function (addressbookmrc) {
                var _creator = new addressbookmrc();
                var _param = { IsAtawControl: true, $NaviDom: _this.$DataTable.find("#ACT-WINDOW-LEFT-NAVI"), RegName: _this.RegName,
                    SingleCheckBoxFun: _this.userSelectorFormat()
                };
                _creator.setModel(_param);
                _creator.init(_this.$DataTable.find(".ACT-CONTENT"));
            });
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "userSelectorFormat", function () {
            var _this = this;
            return function (rowObj, isCheck, $cb, valueFied, textField) {
                _this.selectorFormat(rowObj, isCheck, $cb, valueFied, textField);
            };
        });
    }


})(jQuery);