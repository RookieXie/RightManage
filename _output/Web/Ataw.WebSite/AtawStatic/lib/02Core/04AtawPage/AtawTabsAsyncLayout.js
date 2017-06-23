(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};
    $.fn.AtawTabsAsyncLayout = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawTabsAsyncLayout", options);
    }
    $.AKjs.AtawTabsAsyncLayout = function (options) {
        return $.extend({}, $.AKjs.AtawTabsLayout(options), new AtawTabsAsyncLayout()).sysCreator();
    }

    $.AKjs.SetStringCss = function (str) {
        return str.AreplaceAll("/", "_").AreplaceAll("#", "_").replace(/\?/g, "_").replace(/\&/g, "_").replace(/\=/g, "_").replace(/\./g, "_");
    }
    function AtawTabsAsyncLayout() {

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPrivate, "openTab", function (name) {
            //var _obj = this.FormObjs[name];
            var _$li = this.$JObj.find(".ACT-TAB" + $.AKjs.SetStringCss(name));
            _$li.click();
        });



        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPrivate, "initTab", function (div, ul) {
            var _this = this;
            // var li, dl, idiv;
            $.each(this.Layout.Panels, function (j, m) {
                var li, dl;
                var _isInt = _this.FormObjs[m.FormName].IsInit;
                if (_isInt) {
                    li = $('<li class="select">' + _this.FormObjs[m.FormName].Title + '</li>');
                    // li.data("mapdl").css("display", "block");
                    dl = $('<cite style="display:block"></cite>');
                }
                else {
                    li = $('<li>' + _this.FormObjs[m.FormName].Title + '</li>');
                    dl = $('<cite style="display:none"></cite>');
                }
                ul.append(li);
                li.addClass("ACT-TAB" + $.AKjs.SetStringCss(m.FormName));
                div.append(dl);
                var idiv = $("<div></div>")
                dl.append(idiv);
                if (_isInt) {
                    _this.FormObjs[m.FormName].intoDom(idiv);
                }
                idiv.find(".UI_DeskTop_Module_more").parent().remove();
                li.data({ mapdl: dl });
                function _liClickFunction(fun_ul, fun_div, fun_idiv, fun_li) {
                    return function () {
                        fun_ul.children().removeClass("select");
                        $(this).addClass("select");
                        fun_div.children().css("display", "none");
                        fun_idiv.html("");
                        fun_idiv.parent().find(".PAGE-WINDOW-ACT").html(""); ;
                        _this.FormObjs[m.FormName].intoDom(idiv);
                        fun_idiv.show();
                        $(this).data("mapdl").css("display", "block");
                    }
                };


                li.click(_liClickFunction(ul, div, idiv, li));
            })
        });

    };
})(jQuery);
