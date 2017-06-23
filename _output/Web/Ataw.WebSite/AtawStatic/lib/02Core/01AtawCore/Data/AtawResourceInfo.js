(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};

    $.AKjs.AtawResourceInfo = function (options) {
        return $.extend({}, $.AKjs.AtawClass, new AtawResourceInfo(), options);
    }


    function AtawResourceInfo() {
        this.InfoType = "";
        this.Url = "";
        this.SiteInUrl = "";
        this.ConfigName = "";
        this.Guid = "";
        this.ExtName = "";
        this.PathFormat = "";

        this.ExtendList = {};
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "setUrlString", function (urlString) {
            this.InfoType = "Link";
            this.Url = urlString;
        });


    }



})(jQuery);