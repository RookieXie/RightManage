(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};


    //----------JS插件的基类
    $.AKjs.AtawBaseJPlugIn = function (options) {
        return $.extend({}, $.AKjs.AtawBaseDom(options), new AtawBaseJPlugIn());
    }

    //-----------------JS插件的基类---------
    function AtawBaseJPlugIn() {
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            this.AtawBaseDom_init();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dispose", function () {

            this.AtawBaseDom_dispose();
        });

    }



})(jQuery);