(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};

    $.AKjs.AtawBaseWebView = function (options) {
        return $.extend({}, $.AKjs.AtawClass(), new AtawBaseWebView(options)).sysCreator();
    }

    function AtawBaseWebView() {
        this.AtawWebApp = null;
        this.Name = null;
        this.Title = null;
        this.Url = null;
        this.Html = null;
        this.Javascripts = [];
        this.$MainViewStage = null;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "create", function () {
             
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "load", function () {
            //this.AtawWebApp.
            var _this = this;
            $.AKjs.load(this.Url, {}, this.AtawWebApp.$MainViewStage, function (html) {
                _this.afterLoad();
            });

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPrivate, "afterLoad", function () {
            this.AtawWebApp.afterViewLoad(this.Name);
        });



    }
})(jQuery);