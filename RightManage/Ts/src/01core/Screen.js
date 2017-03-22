"use strict";
var Core;
(function (Core) {
    var Screen = (function () {
        function Screen() {
        }
        Screen.GetHeight = function () {
            var xScroll, yScroll;
            if (window.innerHeight && window["scrollMaxY"]) {
                xScroll = window.innerWidth + window["scrollMaxX"];
                yScroll = window.innerHeight + window["scrollMaxY"];
            }
            else {
                if (document.body.scrollHeight > document.body.offsetHeight) {
                    xScroll = document.body.scrollWidth;
                    yScroll = document.body.scrollHeight;
                }
                else {
                    xScroll = document.body.offsetWidth;
                    yScroll = document.body.offsetHeight;
                }
            }
            var windowWidth, windowHeight;
            if (self.innerHeight) {
                if (document.documentElement.clientWidth) {
                    windowWidth = document.documentElement.clientWidth;
                }
                else {
                    windowWidth = self.innerWidth;
                }
                windowHeight = self.innerHeight;
            }
            else {
                if (document.documentElement && document.documentElement.clientHeight) {
                    windowWidth = document.documentElement.clientWidth;
                    windowHeight = document.documentElement.clientHeight;
                }
                else {
                    if (document.body) {
                        windowWidth = document.body.clientWidth;
                        windowHeight = document.body.clientHeight;
                    }
                }
            }
            var pageHeight, pageWidth, arrayPageSize;
            if (yScroll < windowHeight) {
                pageHeight = windowHeight;
            }
            else {
                pageHeight = yScroll;
            }
            if (xScroll < windowWidth) {
                pageWidth = xScroll;
            }
            else {
                pageWidth = windowWidth;
            }
            arrayPageSize = new Array(pageWidth, pageHeight, windowWidth, windowHeight);
            return arrayPageSize;
        };
        return Screen;
    }());
    Core.Screen = Screen;
})(Core = exports.Core || (exports.Core = {}));
