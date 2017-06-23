(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};


    //----------构造控件基类
    $.AKjs.AtawPageMapItem = function (options) {
        return $.extend({}, $.AKjs.AtawBaseDom(options), new AtawPageMapItem()).sysCreator();
    }


    function AtawPageMapItem() {
        this.Arrange = "",
        this.TreeMenuObj = null;
        this.MenuItemObj = null;

        this.MapSubItemList = [];
        this.Title = "";
        //this.$Img = $("<img class='ACT_IMG setMapImg' src='/images/ico/default.png' alt='' />");
        this.$Img = $("<i   data-toggle='dropdown' class=' dropdown-toggle  ACT_IMG  icon-folder-open-alt  fa fa-folder-open-o '> &nbsp;</i>");
        this.$Item = $("<a ></a>");
        this.ClickFun = null; //function(arrange:string ,MenuItemObj)
        this.IcoSrc = "";
        this.NextArrange = "";
        this.IsHidden = false;
        this.IsLast = false;
        this.IsPre = false;
        this.IsModule = true;
        this.IsRoot = false;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {

            this.setProByOptName("Arrange", "Arrange");
            this.setProByOptName("TreeMenuObj", "TreeMenuObj");
            this.setProByOptName("MenuItemObj", "MenuItemObj");
            this.setProByOptName("ClickFun", "ClickFun");
            this.setProByOptName("IsLast", "IsLast");
            this.setProByOptName("IsPre", "IsPre");

            this.setProByOptName("IsHidden", "IsHidden");
            this.IsHidden = this.MenuItemObj.Data.IsHidden;
            this.setProByOptName("NextArrange", "NextArrange");
            this.Title = this.MenuItemObj.Data.CODE_TEXT;
            if (this.Arrange == "000") {
                this.Title = "桌面";
                this.IcoSrc = "icon-desktop fa fa-desktop ";
                this.IsHidden = true;
                this.IsRoot = true;
            }
            if (this.MenuItemObj.Data.ExtData && this.MenuItemObj.Data.ExtData.Icon) {
                this.IcoSrc = this.MenuItemObj.Data.ExtData.Icon;
            }

            var _children = this.MenuItemObj.ItemChildrens;
            if (typeof (_children) == "undefined") {
                _children = this.MenuItemObj.RootItems;
                this.MenuItemObj.ItemChildrens = this.MenuItemObj.RootItems;
            }
            for (var i = 0; i < _children.length; i++) {
                var _obj = _children[i];
                var _subItem = $.AKjs.AtawPageMapSubItem({
                    MenuItemObj: _obj,
                    ClickFun: this.ClickFun
                });
                this.MapSubItemList.push(_subItem);

            }
            if (this.IcoSrc != "") {
                this.$Img.removeClass("icon-folder-open-alt fa fa-folder-open-o");
                this.$Img.addClass(this.IcoSrc);
            }


        })


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {

            this.$JObj.append(this.$Item);
            this.$Item.append(this.$Img);
            this.$Item.append(this.Title);

            var _this = this;

            if (!this.IcoSrc .AisEmpty()) {
                this.$Item.find(".ACT_IMG").attr("src", this.IcoSrc);
            }

            this.$Item.unbind("click").click(
                 function () {
                     if (_this.Arrange == "000") {
                         $.AKjs.AppGet().openUrl("$CenterInfo$");
                     } else {
                         if (_this.ClickFun) {
                             _this.ClickFun(_this.Arrange, _this.MenuItemObj);
                         }
                     }
                 }
            );
            if (this.Arrange == "000") {
                this.$JObj.attr("id", "ACT-DESK-BTN");
                //var _$labelCount = $("&nbsp;&nbsp;<lable class='unreadmsg_count' title='未读消息' style='position:relative;top:-10px;color:red;font-weight:bold'></label>");
                //this.$Item.append(_$labelCount);
                $.cookie("UnReadMsgCount", "0", { path: '/' });

             
                $(".unreadmsg_count").html("");
               
                // this.$JObj.append("dddddd");
                //        //鼠标移上显示
                // this.$JObj.mouseover(function () {
                //alert();
                //$(".mainLeft").show();
                // });
            }
            if (this.MenuItemObj.ItemChildrens.length > 0) {
                //  this.$JObj.append("<i class='divider'></i>");
                // this.$Item.append(this.Title); 
                var _$ul = $("<ul    class='dropdown-menu'/>");
                this.$JObj.append(_$ul);
                //                _$ul.mouseout(function () {
                //                    $(".mainLeft").hide();
                //                   });
                for (var i = 0; i < this.MapSubItemList.length; i++) {
                    var _obj = this.MapSubItemList[i];
                    var _$li = $("<li />");
                    _$ul.append(_$li);
                    _obj.intoDom(_$li);
                    if (!this.NextArrange .AisEmpty()) {
                        if (this.NextArrange == _obj.Arrange) {
                           // alert();
                            _obj.itemSelectClass();
                        }
                    }
                }
            } else {
                if (this.IcoSrc == "") {
                    this.$Img.removeClass("icon-folder-open-alt fa fa-folder-open-o");
                    this.$Img.addClass("icon-file-alt fa fa-file-text-o")
                }
            }

            //            if (this.IsHidden || this.IsLast) {
            //                //------
            //                this.$JObj.hide();
            //            }

        })



    }

})(jQuery);