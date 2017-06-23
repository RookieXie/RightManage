(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.AKjs.AtawBoardPage = function (options) {
        return $.extend({}, $.AKjs.AtawBaseDom(options), new AtawBoardPage()).sysCreator();
    }
    $.fn.AtawBoardPage = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawBoardPage", options);
    }
    function AtawBoardPage() {
        this.BrandObj = null;

        this.$BrandTitle = null;
        this.$BrandBody = null;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.setProByOptName("BrandObj", "BrandObj");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "cancle", function () {

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setBody", function () {

        });

    }


})(jQuery);