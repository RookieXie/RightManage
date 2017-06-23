(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.fn.AtawSuggect = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawSuggect", options);
    }

    //类的构造函数
    $.AKjs.AtawSuggect = function (options) {

        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawSuggectControl()).sysCreator();
    }

    function AtawSuggectControl() {

        this.RegName = null;
        this.$Box = $("<div id=\"ms1\" class=\"ms-ctn  ms-ctn-bootstrap-focus\" style=\"width: 396px; height: 59px;\">" +
                      "<div id=\"ms-trigger-0\" class=\"ms-trigger\">" +
                        "<div class=\"ms-trigger-ico\"></div>" +
                       "</div>" +
                       "<div id=\"ms-sel-ctn-0\" class=\"ms-sel-ctn\">" +
                       " <div class=\"ms-sel-item \">哈拉啦啦啦<span class=\"ms-close-btn\"></span></div>"+
                       "<input id=\"ms-input-0\" type=\"text\"   style=\"width: 213px;\" />" +
                       "</div>" +
                    "</div>");

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.setProByOptName("RegName", "RegName");

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            this.$JObj.append(this.$Box);
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Get", function () {
            return this.$JObj.html();
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Set", function (opt_str) {
            this.$JObj.html(opt_str);
        });



    }
})(jQuery);