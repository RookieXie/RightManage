(function ($) {

    $.IframeApp = function () {
        return new IframeApp();
    };

    function IframeApp() {
        this.R = {
            getMain$DomR: function () {
                return $("#ACT-APP-MAIN");
            },
            getMenu$DomR: function () {
                return $("#ACT-APP-MAIN");
            },
            getLeft$DomR: function () {
                return $("#ACT-APP-LEFT");
            }
        };
        this.Menu = {
            gotoMenuLoction: function (url) {
            }
        };
        this.LayOut = {
            layOutTransFormPage: function (sign) {
            }
        };
        this.Url = {
            setUrlAnchor: function (url) {
            }

        };

        this.notifyMesg = function (msg) {
        };
        this.openUrl = function (url) {
        };
        this.showNavi = function () {
        };
        this.bindPageEvent = function ($dom) {
        };
        this.reloadToggle = function () {
        };

        this.hideNavi = function () {
        };
        this.showNavi = function () {
        };

    }


})(jQuery);