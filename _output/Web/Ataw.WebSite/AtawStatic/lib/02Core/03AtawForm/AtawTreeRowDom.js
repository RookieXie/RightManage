(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};


    $.AKjs.AtawTreeRowDom = function (options) {
        return $.extend({}, $.AKjs.AtawBaseRowDom(options), new AtawTreeRowDom()).sysCreator();
    }


    function AtawTreeRowDom() {
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.AtawBaseRowDom_creator();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            if (this.NoDelete) {
                this.$JObj.find(".ACT-CHECK-SINGLE").remove();
            }
            for (var i = 0; i < this.ColumnList.length; i++) {
                var _column = this.ColumnList[i];
                _column.intoDom(this.$JObj);

            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createColumn", function (options) {
            return $.AKjs.AtawTreeColumnDom(options);
        });
    }

})(jQuery);
