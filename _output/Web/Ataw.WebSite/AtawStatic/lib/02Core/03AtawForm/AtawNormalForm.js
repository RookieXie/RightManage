(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};


    $.AKjs.AtawNormalForm = function (options) {
        return $.extend({}, $.AKjs.AtawBaseForm(options), new AtawNormalForm()).sysCreator();
    }

    function _extend() {
        return $.extend({}, $.AKjs.AtawBaseForm(options), new AtawNormalForm());
    }

    $.fn.AtawNormalForm = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawNormalForm", options);
    }

    $.AKjs.InitNormalFormContent = function (formObj) {
        var _$div = $('<div class="panel acs-colgroup col-lg-12 pd0"><div class="ACT-BTN-CONTAINER well"></div><div class="ACT-NORMAL-ROW"></div></div>');
        formObj.$FormContent.html("");

        if (formObj.ParentPageObj && formObj.ParentPageObj.PageStyle == "List") {

            formObj.ParentPageObj.$ButtonContainer = _$div.find(".ACT-BTN-CONTAINER");
        }
        formObj.$RowContent = _$div.find(".ACT-NORMAL-ROW");
        formObj.$FormContent.append(_$div);
        if (formObj.Form.HasBatchInsert) {
            formObj.$FormContent.append(formObj.$AddOrDel);
            formObj.$AddOrDel.find('.ACT-ROW-ADD').click(function () {
                var newRowCount = formObj.$AddOrDel.find('.input-sm').val();
                newRowCount = parseInt(newRowCount);
                if (!(newRowCount > 0)) {
                    newRowCount = 1;
                }
                for (var i = 0; i < newRowCount; i++) {
                    formObj.addNewRow();
                }
            });

            formObj.$AddOrDel.find('.ACT-ROW-DEL').click(function () {
                var len = formObj.$FormContent.find(".ACT-CHECK-SINGLE[ichecked='true']").length;
                if (len > 0) {
                    var _$row = formObj.getRowByCheckBox();

                    formObj.saveDelRowKey(_$row);
                    if (formObj.AfterDelNewRowFun) {
                        formObj.AfterDelNewRowFun(formObj, _$row);
                    }
                } else {
                    alert("请选择要删除的项");
                }
            });
        }
    }

    $.AKjs.CreateNormalRowObj = function (options) {
        if (!options.Form.Form.DisableColumnGroup && options.Form.Form.ColumnGroups && options.Form.Form.ColumnGroups.length > 0) {
            return $.AKjs.AtawNormalRowGroupDom(options);
        }
        return $.AKjs.AtawNormalRowDom(options);
    }

    $.AKjs.InitNormalRowContent = function (formContent) {
        var _$div = $('<div class="acs-normal-form"></div>');
        formContent.append(_$div);
        return _$div;
    }

    function AtawNormalForm() {
        //        this.$AddOrDel = $('<div class="row acs-normal-form">'
        //                + '<div class="col-md-4">'
        //                + '<button type="button" class="btn btn-success btn-sm btn-block">'
        //                + '<i class="icon-plus icon-white">&nbsp;新增记录</i></button></div>'
        //                + '<div class="col-md-4">'
        //                + '<input type="text" class="form-control input-sm" id="exampleInputEmail1" placeholder="1"></div>'
        //                + '<div class="col-md-4">'
        //                + '<button type="button" class="btn btn-danger  btn-sm btn-block">'
        //                + '<i class="icon-minus icon-white">&nbsp;删除行记录</i></button></div>'
        //                + '</div>');

        this.$AddOrDel = $('<div class=" btn-group aks-nad-btn-row">'
                     + '<a  class="  btn-xs ACT-ROW-DEL ">'
                + '<i class="icon-minus-sign fa fa-minus-circle icon-2x" style="color:red;"></i></a>'
                + '<span ><input style="width:2em;text-align: center;" type="text"  class="ACT_DEL_COUNT"  /></span>'
                 + '<a  class=" btn-xs  ACT-ROW-ADD">'
                + '<i class="icon-plus-sign fa fa-plus-circle icon-2x"></i></a>'
                + '</div>');
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.AtawBaseForm_creator();

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "createRowObj", function (op) {
            // return $.AKjs.AtawNormalRowDom(op);
            $.AKjs.CreateNormalRowObj(op);

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initFormContent", function () {
            $.AKjs.InitNormalFormContent(this);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "reloadData", function () {
            //清空数据
            this.$FormContent.empty();
            this.AtawBaseForm_reloadData();
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initRowContent", function () {
            //            var _$div = $("<div class=\"dataTable\"></div>");
            //            var _$title = $("<h2><input class=\"ACT-CHECK-SINGLE DT_ckb_input\" type=\"checkbox\"></h2>");
            //            _$div.append(_$title);
            //            var _rowDiv = $("<div class='data_row3'></div><div style='clear:both'></div>");
            //            _$div.append(_rowDiv);
            //            this.$FormContent.append(_$div);
            //            return _$div;
            //alert();
            return $.AKjs.InitNormalRowContent(this.$RowContent);

        });

        //创建新的Normal
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "addNewRowing", function () {
            var _row = this.getInsertDataRow();
            var _op = {
                DataSet: this.Data,
                DataRow: _row,
                Form: this,
                ColumnConfigs: this.InsertForm.Columns,
                RowIndex: this.MaxIndex,
                PrimaryKey: this.InsertForm.PrimaryKey,
                IsInsertRow: true,
                IsViewPage: this.IsViewPage,
                ParentFormObj: this,
                DataValueFix: true
            };

            //var _row = this.createRowObj(_op, fromType);
            var _row = $.AKjs["CreateNormalRowObj"](_op);
            this.MaxIndex++;
            _row.intoDom($.AKjs.InitNormalRowContent(this.$RowContent));
            return _row.$JObj;

        })
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getRowByCheckBox", function () {
            return this.$FormContent.find(".ACT-CHECK-SINGLE[ichecked='true']").parents(".acs-normal-form");
            //.remove();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            this.AtawBaseForm_init();
        });
    }

})(jQuery);
