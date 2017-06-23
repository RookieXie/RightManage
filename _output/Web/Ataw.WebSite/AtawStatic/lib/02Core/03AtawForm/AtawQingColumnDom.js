(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    //继承基类
    $.AKjs.AtawQingColumnDom = function (options) {
        return $.extend({}, $.AKjs.AtawBaseColumnDom(options), new AtawQingColumnDom()).sysCreator();
    }

    function AtawQingColumnDom() {

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.AtawBaseColumnDom_creator();
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            if (this.AtawControlObj.sys_ataw_fun_name == "AtawDetailControl") {
                var _dataText = this.AtawControlObj.DataText;
                //if (_dataText == null || _dataText == "") {
                 //   _dataText = "_";
                //}
            }
            var _obj = null;
            if (this.ColumnConfig.QingColumnName == "QINGAVATAR") {
                _obj = this.$JObj.find(".qing_avatar");
                _obj.append(_dataText);
            }
            if (this.ColumnConfig.QingColumnName == "QINGUSER") {
                _obj = this.$JObj.find(".qing_name");
                _obj.append(_dataText);
            }
            if (this.ColumnConfig.QingColumnName == "QINGDATE") {
                _obj = this.$JObj.find(".qing_date");
                _obj.append(_dataText);
            }
            if (this.ColumnConfig.QingColumnName == "QINGCONTENT") {
                _obj = this.$JObj.find(".qing_content");
                _obj.append(_dataText);
            }

            //            this.AtawControlObj.intoDom(this.$Span);
            //            if (this.ColumnConfig.ControlType == "Hidden") {
            //                this.$JObj.hide();
            //            }


            // this.AtawBaseColumnDom_init();
        });
    }
})(jQuery);
