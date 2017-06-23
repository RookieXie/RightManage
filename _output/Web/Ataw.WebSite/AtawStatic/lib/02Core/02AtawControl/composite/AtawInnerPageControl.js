(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.fn.AtawInnerPage = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawInnerPage", options);
    }

    //类的构造函数
    $.AKjs.AtawInnerPage = function (options) {

        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawInnerPageControl()).sysCreator();
    }

    function AtawInnerPageControl() {
        this.$Xml = null;
        this.ForeignKey = null;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.setProByOptName("Xml", "Xml");
            this.setProByOptName("ForeignKey", "ForeignKey");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            var _this = this;
            var _val = this.DataValue.getValue();
            // alert(_val);
            var _post = { xml: _this.Options.ModuleXml };
            if (this.ForeignKey) {
                _post[this.ForeignKey] = _val;
            }
//            $.AKjs.getJSON("/module/ModulePage", _post, function (res) {
//                res.IsInner = true;
//                _this.$JObj.AtawViewPage(res);
//                _this.$JObj.find(".ACT-SUBIMT-BTN").hide();
//            });
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Get", function () {
            var _this = this;
            $.AKjs.getJSON("/module/module", { xml: _this.Options.ModuleXml, pageStyle: "Detail" }, function (res) {
                return res;
            });
        });
    }
})(jQuery);