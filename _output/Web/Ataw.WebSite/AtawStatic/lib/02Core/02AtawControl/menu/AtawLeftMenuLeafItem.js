(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};


    //----------构造控件基类
    $.AKjs.AtawLeftMenuLeafItem = function (options) {
        return $.extend({}, $.AKjs.AtawLeftMenuBaseItem(options), new AtawLeftMenuLeafItem()).sysCreator();
    }



    function AtawLeftMenuLeafItem() {
        this.IsLeaf = true;
        this.$Item = $(" <a  class='ACT-ITEM ACT-MenuTree akcs_noPadding acs-share-list' style=' padding: 0.1em 0.2em 0.1em 1em;' ></a>");
        this.$Icon = $("<i class=' icon-pencil fa fa-pencil icon-large'>&nbsp;</i> ");

        this.ItemChildrens = [];
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {

            this.AtawLeftMenuBaseItem_creator();
            this.$Item.css("padding-left", (this.LayerLevel - 2) + "em");
            if (this.LayerLevel - 2 == 0)
            {
                this.$Icon.removeClass("icon-pencil fa fa-pencil");
                this.$Icon.addClass("icon-file-alt fa fa-file-text-o");
            }

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "toggleIcon", function () {
            if (this.IcoSrc != "") {
                this.$Icon.toggleClass("icon-pencil fa fa-pencil", false);
                this.$Icon.addClass(this.IcoSrc);
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initTitle", function () {
            //this.$ItemSpan
            var _this = this;

            this.$Item.append(this.$ItemSpan);
            //var sdsds = this.$Item.parent();
            if (this.Data.CODE_TEXT != "_")
                this.$ItemSpan.append(this.Data.CODE_TEXT);
            this.$ItemSpan.attr("title", this.Data.CODE_TEXT);
            this.$Item.unbind("click").click(
            function () {
                    _this.$Item.parent().find("ul").remove();
                    _this.TreeObj.pageMainFun(_this.Arrange, _this);
              
                    _this.TreeObj.itemSpanClickEven(_this.Arrange, _this);
                   
                return false;
            }
            );
        });

    }


})(jQuery);