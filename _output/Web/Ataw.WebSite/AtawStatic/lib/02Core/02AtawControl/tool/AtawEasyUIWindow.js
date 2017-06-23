(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};
    $.fn.AtawEasyUIWindow = function () {
        // this.AtawWindow = null;

        var _$div = $(this);
        var title = _$div.attr("title");
        var closed = _$div.attr("closed");
        var width = _$div.width();
        var height = _$div.height();
        if (closed == "true" || closed == undefined) {
            _$div.css("display", "none");
        }
        else if (closed == "false") {
            _$div.css("display", "");
        }
        _$div.AtawWindow({
            Title: title,
            Width: width,
            Height: height
        });
    }

    $.fn.window = function (arg) {
        var _this = $(this);
        var atawEasyUIWindow = _this.AtawControl();
        if (!atawEasyUIWindow) {
            _this.AtawEasyUIWindow();
            if (arg == "open") {
                _this.AtawControl().open();
            }
        }
        else {
            if (arg == "open") {
                _this.AtawControl().open();
            }
            else if (arg == "close") {
                _this.AtawControl().close();
            }

        }
    }

})(jQuery);