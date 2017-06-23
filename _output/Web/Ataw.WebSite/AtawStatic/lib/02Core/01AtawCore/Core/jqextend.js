// --------------------------------
// jQuery extend
// --------------------------------
(function ($) {
    if (!$) return;
    $.browser = $.browser ? $.browser : {};
    $.browser.mozilla = /firefox/.test(navigator.userAgent.toLowerCase());
    $.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
    $.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
    $.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
    // ----------------------------
    // $.browser方法扩展
    $.extend($.browser, {
        'client': function () {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight,
                bodyWidth: document.body.clientWidth,
                bodyHeight: document.body.clientHeight
            };
        },
        'scroll': function () {
            return {
                width: document.documentElement.scrollWidth,
                height: document.documentElement.scrollHeight,
                bodyWidth: document.body.scrollWidth,
                bodyHeight: document.body.scrollHeight,
                left: Math.max(document.documentElement.scrollLeft, document.body.scrollLeft),
                top: Math.max(document.documentElement.scrollTop, document.body.scrollTop)
            };
        },
        'screen': function () {
            return {
                width: window.screen.width,
                height: window.screen.height
            };
        },
        'isMinW': function (val) {
            return Math.min($.browser.client().bodyWidth, $.browser.client().width) <= val;
        },
        'isMinH': function (val) {
            return Math.min($.browser.client().bodyHeight, $.browser.client().height) <= val;
        },
        'isIE6': $.browser.msie && $.browser.version == 6,
        'IEMode': (function () {
            if ($.browser.msie) {
                if (document.documentMode) { return document.documentMode; }  // IE8
                if (document.compatMode && document.compatMode == 'CSS1Compat') { return 7; }
                return 5; // quirks mode
            }
            return 0;
        })(),
        'isIPad': (/iPad/i).test(navigator.userAgent),
        'isApple': /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent),
        'language': function () {
            return (navigator.language || navigator.userLanguage || '').toLowerCase();
        },
        'isIE': function () {
            return !(-[1, ]);
        }
    });
    // ----------------------------
    // 获取tagName
    $.fn.tagName = function () {
        if (this.length == 0) return '';
        return this[0].tagName.toLowerCase();
    };
    // 获取select的文本
    $.fn.optionText = function () {
        if (this.length == 0) return '';
        var sel = this[0];
        if (sel.selectedIndex == -1) return '';
        return sel.options[sel.selectedIndex].text;
    };
    // 获取element属性的JSON值
    $.fn.attrJSON = function (attr) {
        return (this.attr(attr || 'rel') || '').parseAttrJSON();
    };

    $.fn.dispose = function () {
        try {
            var _obj = this.data("ATAW_CONTROL");
            if (_obj && _obj.dispose) {
                _obj.dispose();
            }
        }
        catch (ex) {
            this[0].innerHTML = "";

        }
        finally {
            this.html("");
        }
    }

    $.fn.clear = function (isdispose) {
//         this.unbind();
//                var _lens = this.find(".AKJS");
//                console.log(_lens.length);
//                if (_lens.length > 0) {
//                    for (var i = 0; i < _lens.length; i++) {
//                        if (_lens.eq(i).data("ATAW_CONTROL")) {
//                            _lens.eq(i).data("ATAW_CONTROL").dispose();
//                           // console.log(_lens.eq(i).data("ATAW_CONTROL")["sys_ataw_fun_name"]);
//                            _lens.eq(i).data("ATAW_CONTROL", null);
//                        }
//                    }
//                }


        try {

            this.html("");

        }
        catch (ex) {
            this[0].innerHTML = "";

        }
        finally {
           // this[0].innerHTML = "";
            if (isdispose) {
                var _obj = this.data("ATAW_CONTROL");
                if (_obj && _obj.dispose) {
                    _obj.dispose();
                }
            }
            //this.data("ATAW_CONTROL", null);
        }

    };
    //------------
    $.fn.SwitchClass = function (classYes, classNo, bool) {
        this.toggleClass(classYes, bool);
        this.toggleClass(classNo, !bool);
    }
    $.fn.getElementLeft = function () {
        var element = this[0];
        var actualLeft = element.offsetLeft;
        var current = element.offsetParent;
        while (current !== null) {
            actualLeft += current.offsetLeft;
            current = current.offsetParent;
        }
        return actualLeft;
    }
    $.fn.getElementTop = function () {
        var element = this[0];
        var actualTop = element.offsetTop;
        var current = element.offsetParent;
        while (current !== null) {
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }
        return actualTop;
    }
    $.fn.getElementViewTop = function () {
        var actualTop = this.getElementTop();
        var elementScrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        //        if (document.compatMode == "BackCompat") {
        //            var elementScrollTop = document.body.scrollTop;
        //        } else {
        //            var elementScrollTop = document.documentElement.scrollTop;
        //        }
        return actualTop - elementScrollTop;
    }
    $.fn.getElementViewLeft = function () {
        var actualLeft = this.getElementLeft();
        var elementScrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft)
        //        if (document.compatMode == "BackCompat") {
        //            var elementScrollLeft = document.body.scrollLeft;
        //        } else {
        //            var elementScrollLeft = document.documentElement.scrollLeft;
        //        }
        return actualLeft - elementScrollLeft;
    }


    //格式 {navi:{},search:{},page:{},tablename:xxx,pagestyle:"",keys:""}
    //    $.getUrlAnchor = function () {
    //        var anchor = $.url.attr("anchor");
    //        var xml, param, navi, search, page, tablename;
    //        if (anchor) {
    //            var xmlPosition = anchor.indexOf('.xml');
    //            var lastPosition = anchor.lastIndexOf('/');
    //            if (xmlPosition !== -1) {
    //                if (lastPosition > xmlPosition) {
    //                    xml = anchor.substring(0, lastPosition);
    //                    param = anchor.substring(lastPosition + 1);
    //                    param = $.parseJSON(Base64.decode(param));
    //                } else {
    //                    xml = anchor.substring(0, xmlPosition + 4);
    //                }
    //                return $.extend({}, { xml: xml }, param);
    //            }
    //        }
    //        return null;
    //    }
    //    $.clearUrlAnchor = function () {
    //        var anchor = $.url.attr("anchor");
    //        if (anchor) {
    //            var xmlPosition = anchor.indexOf('.xml');
    //            if (xmlPosition !== -1) {
    //                xml = anchor.substring(0, xmlPosition + 4);
    //                location.hash = xml;
    //            }
    //        }
    //    }
    //    $.setUrlAnchor = function (param) {
    //        if (param) {
    //            var anchor = $.url.attr("anchor");
    //            if (anchor) {
    //                var xmlPosition = anchor.indexOf('.xml');
    //                if (xmlPosition !== -1) {
    //                    xml = anchor.substring(0, xmlPosition + 4);
    //                    location.hash = xml + "/" + Base64.encode($.toJSON(param));
    //                }
    //            }
    //        }
    //    }
    //    $.getUrlPostDataSet = function (pagestyle) {
    //        pagestyle = pagestyle ? pagestyle.toUpperCase() : pagestyle;
    //        var param = $.getUrlAnchor();
    //        var ds = {};
    //        switch (pagestyle) {
    //            case "UPDATE":
    //                if (param && param.keys) {
    //                    var keys = param.keys.split(",");
    //                    ds["_KEY"] = [{ "KeyValue": keys[0]}];
    //                }
    //                break;
    //            case "DETAIL":
    //                if (param && param.keys) {
    //                    var keys = param.keys.split(",");
    //                    ds["_KEY"] = [];
    //                    for (var i = 0; i < keys.length; i++) {
    //                        ds["_KEY"].push({ "KeyValue": keys[i] });
    //                    }
    //                }
    //                break;
    //            case "INSERT":
    //                break;
    //            default:
    //                if (param && param.tablename && (param.navi || param.search)) {
    //                    ds[param.tablename + "_SEARCH"] = [$.extend({}, param.navi, param.search)];
    //                }
    //                if (param && param.page) {
    //                    ds["PAGER"] = [param.page];
    //                }
    //                break;
    //        }
    //        return ds;
    //    }
    //    $.getParameterByName = function (name) {
    //        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    //        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    //                results = regex.exec(location.search);
    //        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    //    }
    // ----------------------------

})(jQuery);