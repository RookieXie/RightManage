(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    //继承基类
    $.AKjs.AtawTreeGridRowDom = function (options) {
        return $.extend({}, $.AKjs.AtawBaseRowDom(options), new AtawTreeGridRowDom()).sysCreator();
    }

    function AtawTreeGridRowDom() {
        this.$DataRow = $("<tr class=\"data_row\"><td class='cbk_panel'><input type=\"checkbox\"  class=\"ACT-CHECK-SINGLE\"/></td></tr>"); //每行
        this.TreeKeyId = null;
        this.TreeParentId = null;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.AtawBaseRowDom_creator();

            var _fname = this.Options.Form.Form.PrimaryKey;
            var _pname = this.Options.Form.Form.ParentKey;
            this.TreeKeyId = this.DataRow[_fname];
            this.TreeParentId = this.DataRow[_pname];
            //            var _cols = this.ColumnList;
            this.$DataRow.attr("id", this.TreeKeyId);
            this.$DataRow.attr("pId", this.TreeParentId);

            //            //这里是针对EasyUI的
            //            if (!_pname) {
            //                _pname = this.Options.Form.Form.ParentKey;
            //                _fname = this.Options.Form.Form.PrimaryKey;
            //            }
            //            var _col = null;
            //            var _keyValue = "";
            //            var _pidValue = "";
            //            if (this.KeyColumnObj) {
            //                _col = this.KeyColumnObj.Options.DataValue;
            //            } else {
            //                $.each(_cols, function (i, col) {
            //                    var _op = col.Options.DataValue;
            //                    if (col.Options.ColumnName == _fname) {
            //                        _col = _op;
            //                        return false;
            //                    }
            //                });
            //            }
            //            if (_col) {
            //                var _tblName = _col.TableName;
            //                var _index = _col.Index;
            //                var _colName = _col.ColumnName;
            //                if (_col.Ds[_tblName]) {
            //                    _keyValue = _col.Ds[_tblName][_index][_colName];
            //                    _pidValue = _col.Ds[_tblName][_index][_pname];
            //                }
            //            }

        });

        //初始化行
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createColumn", function (options) {
            return $.AKjs.AtawGridColumnDom(options);
        });

    }
})(jQuery);
