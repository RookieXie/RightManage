(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    //继承基类
    $.AKjs.AtawQingRowDom = function (options) {
        return $.extend({}, $.AKjs.AtawBaseRowDom(options), new AtawQingRowDom()).sysCreator();
    }

    function AtawQingRowDom() {


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.AtawBaseRowDom_creator();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            if (this.NoDelete && this.IsViewPage) {
                this.$JObj.parent().find(".ACT-CHECK-SINGLE").remove();
            }
            for (var i = 0; i < this.ColumnList.length; i++) {
                var _column = this.ColumnList[i];
                //var _$li = $("<li/>");
                //this.$JObj.append(_$li);
                //_column.intoDom(_$li);
                _column.intoDom(this.$JObj);

            }
        });

        //初始化行
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createColumn", function (options) {
            return $.AKjs.AtawQingColumnDom(options);
        });
    }
})(jQuery);