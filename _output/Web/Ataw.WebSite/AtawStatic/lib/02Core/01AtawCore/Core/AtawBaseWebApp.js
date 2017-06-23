(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};
    $.AKjs.DomFun = $.AKjs.DomFun ? $.AKjs.DomFun : {};

    $.AKjs.App = null;

    $.AKjs.AppGet = function (options) {
        return $.AKjs.AtawBaseWebApp(options);
    }

    $.AKjs.AtawBaseWebApp = function (options) {
        if ($.AKjs.App != null) {
            return $.AKjs.App;
        }
        else {
            return $.AKjs.App = $.extend({}, $.AKjs.AtawBaseJPlugIn(), new AtawBaseWebApp(options)).sysCreator();
        }
    }
    function AtawBaseWebApp(options) {

        //setUrlAnchor
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "create", function () {

        });


        /// <reference path="../../../03Extend/messenger/js/messenger.min.js" />
        /// <reference path="../../../03Extend/messenger/css/messenger.css" />


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "notifyMesg", function (msg) {

            this.asynJs(["/AtawStatic/lib/03Extend/messenger/js/messenger.min.js", "/AtawStatic/lib/03Extend/messenger/css/messenger.css"], function () {

                $.globalMessenger().post({
                    message: msg,

                    showCloseButton: true,
                    hideAfter: 3,
                    hideOnNavigate: true
                });
            });


            
        });
    }

})(jQuery);