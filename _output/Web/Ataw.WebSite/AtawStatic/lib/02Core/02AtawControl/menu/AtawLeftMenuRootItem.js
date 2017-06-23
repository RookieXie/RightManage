(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};


    //----------构造控件基类
    $.AKjs.AtawLeftMenuRootItem = function (options) {
        return $.extend({}, $.AKjs.AtawLeftMenuBaseItem(options), new AtawLeftMenuRootItem()).sysCreator();
    }



    function AtawLeftMenuRootItem() {

//        this.$Item = $("<a class='ACT-ITEM  menuItems'  style=' padding:0.5em  0.7em'  >" +
//                       "</a>");
        this.$Item = $("<a href='' >" +
                       "</a>");

        //<ul style=\"display: none;\"></ul>

        this.ItemChildrens = [];
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.AtawLeftMenuBaseItem_creator();
            this.ItemType = "Root";
        });

        // 
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "afterInit", function () {
           // this.$Li.append("<tt class='rootBottomBG'><img src='/Content/images/menuRoot.gif' alt=''></tt>");
        })

    }


})(jQuery);