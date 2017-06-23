(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};


    //----------构造控件基类
    $.AKjs.AtawMenuCover = function (options) {
        return $.extend({}, $.AKjs.AtawBaseJPlugIn(options), new AtawMenuCover()).sysCreator();
    }

    $.fn.AtawMenuCover = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawMenuCover", options);
    }

    function AtawMenuCover() {
        this.CoverItemList = [];
        this.MenuId = "";
        this.Data = null;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            //"M" + this.Data.CODE_VALUE
            this.setProByOptName("Data", "Data");
            this.setProByOptName("MenuId", "MenuId");

            if (this.Data == null) {
                var _menuObj = $.AKjs.AppGet().R.getMenu$DomR().AtawControl();
                //------------------------------------
                var _$item = _menuObj.$JObj.find(".M" + this.MenuId);
                var _childrens = _$item.AtawControl().ItemChildrens;
                //----------
                for (var i = 0; i < _childrens.length; i++) {
                    var _item = _childrens[i].Data;
                    var _op = {
                        Title: _item.CODE_TEXT,
                        Key: _childrens[i].IsLeaf ? _item.ExtData.RightValue : _item.CODE_VALUE,
                        IsFile: _childrens[i].IsLeaf,
                        Index: i,
                        Arrange: _item.Arrange,
                        Icon: _childrens[i].IcoSrc
                    };
                    this.CoverItemList.push($.AKjs.AtawMenuCoverItem(_op));
                    //                    var grandchildrens = _childrens[i].$JObj.AtawControl().ItemChildrens;
                    //                    for (var j = 0; j < grandchildrens.length; j++) {
                    //                        var _item2 = grandchildrens[j].Data;
                    //                        var _op2 = {
                    //                            Title: _item2.CODE_TEXT ,
                    //                            Key: grandchildrens[j].IsLeaf ? _item2.ExtData.RightValue : _item2.CODE_VALUE,
                    //                            IsFile: grandchildrens[j].IsLeaf,
                    //                            Index: j,
                    //                            Arrange: _item2.Arrange,
                    //                            Icon: "_"
                    //                        }
                    //                        this.CoverItemList.push($.AKjs.AtawMenuCoverItem(_op2));
                    //                   }
                }
            }

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            for (var i = 0; i < this.CoverItemList.length; i++) {
                this.CoverItemList[i].intoDom(this.$JObj);
            }
        });
    }

})(jQuery);