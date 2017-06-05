// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
define(["require", "exports"], function (require, exports) {
    "use strict";
    var AppConfigDefine = {
        JsAmountconvert: "/AtawStatic/lib/03Extend/amount/amountconvert.js"
    };
    var AppContent = (function () {
        function AppContent() {
        }
        AppContent.prototype.AppContent = function () {
            this.AppConfigObj = AppConfigDefine;
        };
        AppContent.Current = function () {
            // var f: String;
            return this.fAppContent;
        };
        AppContent.prototype.extendAppConfig = function (obj) {
            this.AppConfigObj = $.extend({}, this.AppConfigObj, obj);
        };
        AppContent.prototype.fGetByInterface = function () {
            return this.AppConfigObj;
        };
        AppContent.prototype.getByIApp = function () {
            return this.fGetByInterface();
        };
        AppContent.prototype.getByInterface = function () {
            //new String ("dfdf").AppKv("","");
            return this.fGetByInterface();
        };
        AppContent.prototype.appKv = function (key, defaultValue) {
            var _val = this.AppConfigObj[key];
            if (_val) {
                return _val;
            }
            else {
                return defaultValue;
            }
        };
        return AppContent;
    }());
    AppContent.fAppContent = new AppContent();
    exports.AppContent = AppContent;
});
