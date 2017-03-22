define(["require", "exports", "./Url", "./Util"], function (require, exports, urlFile, utilFile) {
    "use strict";
    exports.__esModule = true;
    var WebApp = (function () {
        function WebApp() {
        }
        WebApp.prototype.notifyMesg = function (msg) {
            //alert("notifyMesg : " + msg );
            utilFile.Core.Util.Noty(msg);
        };
        WebApp.prototype.openUrl = function (url, config) {
            // alert("url  : " + url);
            if (url.length >= 5 && url.toUpperCase().indexOf("$WIN") == 0) {
                urlFile.Core.AkUrl.Current().openUrl(url, true, { CanMenuUrl: false });
            }
            else {
                urlFile.Core.AkUrl.Current().openUrl(url, false, config);
            }
        };
        // public 
        WebApp.prototype.showNavi = function (title) {
            //alert(" 调用 showNavi " +  "title : " + title);
            // return $(".ACT-PAGE-NAVI");
        };
        WebApp.prototype.reloadToggle = function () {
        };
        WebApp.prototype.bindPageEvent = function () {
        };
        return WebApp;
    }());
    exports.WebApp = WebApp;
    var _app = new WebApp();
    $["AKjs"]["AppGet"] = function () {
        return _app;
    };
    $["AKjs"]["App"] = _app;
});
