(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};


    //----------构造控件基类
    $.AKjs.AtawLeftMenuItem = function (options) {
        return $.extend({}, $.AKjs.AtawLeftMenuBaseItem(options), new AtawLeftMenuItem()).sysCreator();
    }



    function AtawLeftMenuItem() {

        //this.$Item = $(" <a  class='ACT-ITEM ACT-MenuTree akcs_noPadding'  ></a>");
        this.$Item = $(" <a ></a>");
        this.$Icon = $("<i class='icon-plus fa fa-plus icon-large'>&nbsp;</i> ");

        this.ItemChildrens = [];
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.AtawLeftMenuBaseItem_creator();
            this.$Item.css("padding-left", (this.LayerLevel - 2) + "em");
        });



        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "toggleIcon", function () {
            if (this.IcoSrc != "") {
                this.$Icon.toggleClass("icon-plus fa fa-plus", false);
                this.$Icon.toggleClass("icon-minus fa fa-minus", false);
                this.$Icon.addClass(this.IcoSrc);
            }
            else {
                if (this.IsExpand) {
                    this.$Icon.toggleClass("icon-plus fa fa-plus", false);
                    this.$Icon.toggleClass("icon-minus fa fa-minus", true);
                }
                else {
                    this.$Icon.toggleClass("icon-plus fa fa-plus", true);
                    this.$Icon.toggleClass("icon-minus fa fa-minus", false);
                }
            }
        });


    }


})(jQuery);