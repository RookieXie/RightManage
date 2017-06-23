(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};


    $.AKjs.AtawDropDown = function (options) {
        return $.extend({}, $.AKjs.AtawBaseJPlugIn(options), new AtawDropDown()).sysCreator();
    }
    $.fn.AtawDropDown = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawDropDown", options);
    }


    //$.AKjs.AtawWindowIndex = 10000;
    //列的基类
    function AtawDropDown() {
        this.$Toggle = null;
        this.$DropdownMenu = null;
        this.IsExpand = false;
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            this.$Toggle = this.$JObj.find("ACT-dropdown-toggle");
            this.$DropdownMenu = this.$JObj.find("ACT-dropdown-menu");

            if (this.$Toggle && this.$DropdownMenu) {
                var _this = this;
                this.$Toggle.unbind("click").click(function () {
                    _this.IsExpand = !_this.IsExpand;
                    $(this).parent().toggleClass("on", _this.IsExpand);
                });
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dispose", function () {
            this.$JObj.unbind();
            this.AtawBaseDom_dispose();
        });
    }


})(jQuery);