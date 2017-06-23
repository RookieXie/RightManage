(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    //对UI控件的扩展
    $.fn.AtawDownLink = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawDownLink", options);
    }

    $.AKjs.AtawDownLink = function (options) {
        return $.extend({}, $.AKjs.AtawLink(options), new AtawDownLinkControl()).sysCreator();
    }

    //普通文本框
    function AtawDownLinkControl() {

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.Text = "点击下载";
            this.Target = "_bank";
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
       
            this.Href = this.DataValue.getValue();
            this.setProByOptName("Href", "Href");
            this.AtawLinkControl_init();

        });
    }
})(jQuery);
