(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    //继承基类
    $.AKjs.AtawTplColumnDom = function (options) {
        return $.extend({}, $.AKjs.AtawBaseColumnDom(options), new AtawTplColumnDom()).sysCreator();
    }

    function AtawTplColumnDom() {
        // this.FileSign = null;
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            // this.AtawBaseColumnDom_creator();
            // this.setProByOptName("FileSign", "FileSign");
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {


            var _$col = this.$JObj.find(".APL-" + this.ColumnName);
            if (_$col.length > 0) {
                var _$col0 = _$col.eq(0);
                if (_$col0.AtawControl() == null) {
                    _$col.html("");
                    this.AtawControlObj.intoDom(_$col0);
                    this.AtawBaseColumnDom_init();
                }
            }
            //            if (_$col.length > 1) {
            //                var _$col0 = _$col.eq(1);
            //                if (_$col0.AtawControl() == null) {
            //                    this.AtawControlObj.intoDom(_$col0);
            //                    this.AtawBaseColumnDom_init();
            //                }
            //            }

        });
    }
})(jQuery);
