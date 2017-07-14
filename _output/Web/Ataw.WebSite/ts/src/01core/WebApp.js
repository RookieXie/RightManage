define(["require", "exports", "./Url", "./Util"], function (require, exports, urlFile, utilFile) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class WebApp {
        notifyMesg(msg) {
            //alert("notifyMesg : " + msg );
            utilFile.Core.Util.Noty(msg);
        }
        openUrl(url, config) {
            // alert("url  : " + url);
            if (url.length >= 5 && url.toUpperCase().indexOf("$WIN") == 0) {
                urlFile.Core.AkUrl.Current().openUrl(url, true, { CanMenuUrl: false });
            }
            else {
                urlFile.Core.AkUrl.Current().openUrl(url, false, config);
            }
        }
        // public 
        showNavi(title) {
            //alert(" 调用 showNavi " +  "title : " + title);
            // return $(".ACT-PAGE-NAVI");
        }
        reloadToggle() {
        }
        bindPageEvent() {
        }
    }
    exports.WebApp = WebApp;
    var _app = new WebApp();
    $["AKjs"]["AppGet"] = function () {
        return _app;
    };
    $["AKjs"]["App"] = _app;
});
