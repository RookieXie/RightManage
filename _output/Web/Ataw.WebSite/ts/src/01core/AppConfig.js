// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AppConfigDefine = {
        JsAmountconvert: "/AtawStatic/lib/03Extend/amount/amountconvert.js"
    };
    class AppContent {
        AppContent() {
            this.AppConfigObj = AppConfigDefine;
        }
        static Current() {
            // var f: String;
            return this.fAppContent;
        }
        extendAppConfig(obj) {
            this.AppConfigObj = $.extend({}, this.AppConfigObj, obj);
        }
        fGetByInterface() {
            return this.AppConfigObj;
        }
        getByIApp() {
            return this.fGetByInterface();
        }
        getByInterface() {
            //new String ("dfdf").AppKv("","");
            return this.fGetByInterface();
        }
        appKv(key, defaultValue) {
            var _val = this.AppConfigObj[key];
            if (_val) {
                return _val;
            }
            else {
                return defaultValue;
            }
        }
    }
    AppContent.fAppContent = new AppContent();
    exports.AppContent = AppContent;
});
