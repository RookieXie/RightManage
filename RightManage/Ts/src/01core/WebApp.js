"use strict";
var urlFile = require("./Url");
var utilFile = require("./Util");
var WebApp = (function () {
    function WebApp() {
    }
    WebApp.prototype.notifyMesg = function (msg) {
        utilFile.Core.Util.Noty(msg);
    };
    WebApp.prototype.openUrl = function (url, config) {
        if (url.length >= 5 && url.toUpperCase().indexOf("$WIN") == 0) {
            urlFile.Core.AkUrl.Current().openUrl(url, true, { CanMenuUrl: false });
        }
        else {
            urlFile.Core.AkUrl.Current().openUrl(url, false, config);
        }
    };
    WebApp.prototype.showNavi = function (title) {
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
