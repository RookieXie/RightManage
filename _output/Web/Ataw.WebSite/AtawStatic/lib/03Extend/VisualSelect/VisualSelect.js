/// <reference path="VisualSelect.js" />
(function ($) {
    // Code goes here
    $.extend($.fn, {
        ///<summary>
        /// apply a slider UI
        ///</summary>
        VisualSelect: function (func) {
            return this.each(function () {
                var $this = $(this);
                var _ff =  $this.attr("VisualSelect");
                if (_ff != 1) {
                    $this.attr("VisualSelect", 1);
                    $this.hide();
                    var _text = $this.find("option:selected").text();
                    var _$context = $("<div class='acs-visualSelect'></div>");
                    _$context.text(_text);
                    $this.before(_$context);

                    _$context.click(function () {
                        if (func)
                        {
                            func();
                        }
                        var _$this = $(this);
                        _$this.hide();
                        $this.show().focus();
                        return false;
                    });
                    $this.change(function () {
                        var _text1 = $(this).find('option:selected').text();
                        _$context.text(_text1);
                        $this.hide();
                        _$context.show();
                    });
                }

            });
        }
    });
})(jQuery);

