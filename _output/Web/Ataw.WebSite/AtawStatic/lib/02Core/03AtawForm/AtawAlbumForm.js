(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};


    $.AKjs.AtawAlbumForm = function (options) {
        return $.extend({}, $.AKjs.AtawBaseForm(options), new AtawAlbumForm()).sysCreator();
    }   

    function _extend() {
        return $.extend({}, $.AKjs.AtawBaseForm(options), new AtawAlbumForm());
    }

    $.fn.AtawAlbumForm = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawAlbumForm", options);
    }

    $.AKjs.InitAlbumFormContent = function (formObj) {
        var _$div = $('<div class="FormContent"><div class="ACT-BTN-CONTAINER well"></div><div class="panel-body clearfix pd0 mt10"></div></div>');
        formObj.$FormContent.html("");

        if (formObj.ParentPageObj && formObj.ParentPageObj.PageStyle == "List") {

            formObj.ParentPageObj.$ButtonContainer = _$div.find(".ACT-BTN-CONTAINER");
        }
        formObj.$RowContent = _$div.find('.panel-body');
        if (formObj.Form.HasBatchInsert) {
            formObj.$RowContent.append(formObj.$AddOrDel);
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
        formObj.$FormContent.append(_$div);
    }

    $.AKjs.CreateAlbumRowObj = function (op) {
        return $.AKjs.AtawAlbumRowDom(op);
    }

    $.AKjs.InitAlbumRowContent = function (formContent) {
        //var _$div = $('<div class="panel panel-default acs-album aks-album-row"><div class="panel-heading"></div><div class="panel-body clearfix"></div><div class="panel-footer"></div></div>');
        var _$div = $('<div class="col-lg-4 col-sm-6 mb10 pd0"><div class="acs-album aks-album-row"><div class="panel-body"></div><div class="panel-footer"></div></div></div>');
        formContent.append(_$div);
        return _$div;
    }

    function AtawAlbumForm() {
        //this.$AddOrDel = $('<div class="acs-album">'
        //        + '<div class="panel-body ">'
        //        + '<div class="row ">'
        //        + '<div class="col-md-4">'
        //        + '<button type="button" class="btn btn-success btn-sm btn-block">'
        //        + '<i class="icon-plus-sign icon-white">&nbsp;新增记录</i></button></div>'
        //        + '<div class="col-md-4">'
        //        + '<input type="text" class="form-control input-sm" id="exampleInputEmail1" placeholder="1"></div>'
        //        + '<div class="col-md-4">'
        //        + '<button type="button" class="btn btn-danger  btn-sm btn-block">'
        //        + '<i class="icon-minus-sign " style="color:red;">&nbsp;删除行记录</i></button></div>'
        //        + '</div></div></div>');

        this.$AddOrDel = $('<div class="  aks-nad-btn-row">'
                    + '<a  class="   ACT-ROW-DEL ">'
               + '<i class="icon-minus fa fa-minus icon-white"></i></a>'
               + '<span ><input style="width:2em;text-align: center;" type="text"  class="ACT_DEL_COUNT"  /></span>'
                + '<a  class="   ACT-ROW-ADD">'
               + '<i class="icon-plus fa fa-plus icon-white"></i></a>'
               + '</div>');

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.AtawBaseForm_creator();

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "createRowObj", function (op) {
            //return $.AKjs.AtawAlbumRowDom(op);
            return $.AKjs.CreateAlbumRowObj(op);

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initFormContent", function () {
            $.AKjs.InitAlbumFormContent(this);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initRowContent", function () {
            return $.AKjs.InitAlbumRowContent(this.$RowContent);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "reloadData", function () {
            //清空数据
            this.$FormContent.empty();

            this.AtawBaseForm_reloadData();
        });
        //创建新的Normal
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "addNewRowing", function () {
            //            var _formContainer = $("<div class=\"dataTable\"></div>");
            //            var _title = $("<h2><input class=\"ACT-CHECK-SINGLE DT_ckb_input\" type=\"checkbox\"></h2>");
            //            var _form = $("<div class='data_row3'></div>");
            //            var _this = this;
            //            _formContainer.append(_title);
            //            _formContainer.append(_form);
            //            this.$FormContent.append(_formContainer);

            var _$row = this.initRowContent();
            var _form = _$row;
            var _columns = this.InsertForm.Columns;
            //var _rowCount = this.$FormContent.find("dl").length - 1;
            var _rowCount = this.MaxIndex++;
            if (_rowCount < 0) {
                _rowCount = 0;
            }

            var _dtInsert = this.getInsertDataRow();

            var _op = {
                DataSet: this.Data,
                DataRow: _dtInsert,
                Form: this,
                ColumnConfigs: this.InsertForm.Columns,
                RowIndex: _rowCount,
                PrimaryKey: this.Form.PrimaryKey,
                IsInsertRow: true,
                FunSetCheckBox: this.Form.FunSetCheckBox,
                IsViewPage: this.IsViewPage,
                ParentFormObj: this,
                DataValueFix: true,
                //  ParentFormObj: this
                //InsertForm:
            };
            if (_op.IsInsertRow && this.InsertForm)
                _op.ColumnConfigs = this.InsertForm.Columns;
            var _row = this.createRowObj(_op);
            _row.intoDom(_$row);











            //            $.each(_columns, function (i, n) {
            //                var _$li = $("<li/>");
            //                _$row.append(_$li);


            //                var _control = $("<dl class='dataTable_line'><dd class='dl_name'></dd><dd class='NF_content'></dd></dl>");
            //                _form.append(_control);
            //                var _showType = n.ShowType;
            //                switch (_showType) {
            //                    case 1:
            //                        break; //占1个单元格
            //                    case 2:
            //                        _control.addClass("dl_column-2"); //占两个单元格
            //                        break;
            //                    default:
            //                        _control.addClass("dl_column-all"); //默认整行都占据，也就是占三个单元格
            //                        break;
            //                }

            //                _control.find("dd:eq(0)").html(n.DisplayName + "：");
            //                var _dv = $.AKjs.AtawJsDataValueOrObj(n.Options.DataValue, _this.Data);
            //                var _controlOption = $.extend({}, n.Options, { DataValue: _dv });
            //                var _AtawControlObj = $.AKjs["Ataw" + n.ControlType](_controlOption);
            //                _AtawControlObj.IsChange = true;
            //                _AtawControlObj.intoDom(_control.find("dd:eq(1)"));
            //                if (n.ControlType == "Hidden") {
            //                    _control.hide();
            //                }
            //                _AtawControlObj.setSubmit(_rowCount);
            //                _AtawControlObj.$JObj.addClass("PAGE-CONTROL");
            //            });
            //            return _formContainer;

        })
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getRowByCheckBox", function () {
            return this.$FormContent.find(".ACT-CHECK-SINGLE[ichecked='true']").parents(".acs-album");
            //.remove();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            var _dvId = "AlbumForm" + $.AKjs.getUniqueID();
            this.$JObj.attr("id", _dvId);
            this.AtawBaseForm_init();
//            this.$FormContent.masonry({
//                columnWidth: 100,
//                itemSelector: '.aks-album-row'
//            });

        });
    }

})(jQuery);
