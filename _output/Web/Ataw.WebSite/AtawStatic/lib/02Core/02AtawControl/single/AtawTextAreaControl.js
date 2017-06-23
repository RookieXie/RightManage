(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.fn.AtawTextArea = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawTextArea", options);
    }
    $.AKjs.AtawTextArea = function (options) {
        return $.extend({}, $.AKjs.AtawBaseText(options), new AtawTextAreaControl()).sysCreator();
    }

    //文本域
    function AtawTextAreaControl() {
        this.E_Path = "/AtawStatic/lib/03Extend/autosize/jquery.autosize.js";

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "initLegal", function () {
            this.LegalObj = $.AKjs.AtawAreaLegal(this);
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "createItem", function () {
            return $("<TextArea  placeholder='请输入..' class=' aks-input' style='width: 100%;line-height:1.2;overflow-y:auto;'/>");
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "init", function () {
            this.AtawBaseTextControl_init();
            //AtawStatic/lib/03Extend/autosize/jquery.autosize.js
            // var temp = "extend/zTree/main";
            var _this = this;
            this.asynJs(this.E_Path, function () {
               //alert(1);
                _this.$JObjText.autosize();
            });
            //alert(2);

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dispose", function () {
            if (this.$JObjText && this.$JObjText.trigger) {
                this.$JObjText.trigger("autosize.destroy");
            }
            this.AtawBaseDom_dispose();
        });
    }
})(jQuery);
