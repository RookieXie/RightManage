(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    //对UI控件的扩展
    $.fn.AtawLink = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawLink", options);
    }

    $.AKjs.AtawLink = function (options) {
        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawLinkControl()).sysCreator();
    }

    //普通文本框
    function AtawLinkControl() {
        this.$Alink = $("<a/>");
        this.Href = null;
        this.Text = null;
        this.Target = "_bank";

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
           // this.setProByOptName("Href", "Href");
            this.setProByOptName("Text", "Text");
            this.setProByOptName("Target", "Target");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            this.$JObj.append(this.$Alink);
            this.$Alink.text(this.Text);
            this.$Alink.attr("target", this.Target);
            this.$Alink.attr("href", this.Href);

        });
    }
})(jQuery);
