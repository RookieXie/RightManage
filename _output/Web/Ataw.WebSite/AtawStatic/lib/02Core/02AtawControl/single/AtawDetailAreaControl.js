(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.fn.AtawDetailArea = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawDetailArea", options);
    }
    $.AKjs.AtawDetailArea = function (options) {
        return $.extend({}, $.AKjs.AtawTextArea(options), new AtawDetailAreaControl());
    }

    //文本域
    function AtawDetailAreaControl() {
        //this.$JObjText
        this.E_Path = "/AtawStatic/lib/03Extend/autosize/jquery.autosize.js";
        this.IsReadOnlyControl = true;
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "init", function () {
            this.AtawBaseTextControl_init();
            var _this = this;
            this.asynJs(this.E_Path, function () {
                //alert(1);
                _this.$JObjText.autosize();
            });
            // this.$JObjText.autosize();
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "afterInit", function () {
            // this.$JObjText.attr("");
            this.$JObjText.attr("readonly", "readonly");
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "initLegal", function () {
            this.LegalObj = $.AKjs.AtawAreaLegal(this);
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "createItem", function () {
            //return $("<textarea class='form-control ask-input  input-border'    />");
            return $("<textarea class='ask-input'/>");
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "valueFormat", function (val) {
            if (val && val.AtextToHtml)
                return val;
        });
    }
})(jQuery);
