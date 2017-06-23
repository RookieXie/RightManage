(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.AKjs.AtawGridForm = function (options) {
        var _base = $.extend({}, $.AKjs.AtawBaseForm(options), new AtawGridForm());
        return _base.sysCreator();
    }

    $.AKjs.Base_AtawGridForm = function (options) {
        return $.extend({}, $.AKjs.AtawBaseForm(options), new AtawGridForm());
    }

    $.fn.AtawGridForm = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawGridForm", options);
    }

    $.AKjs.InitGridFormContent = function (formObj) {
        var _form = formObj.Form;
        //        if (formObj.$FormContent == null) {
        //            formObj.$FormContent = $("<table cellspacing=\"0\" class=\" ACT-GRID-TABLE table-hover table table-bordered table-striped table-hover\" id=\"grid_tables\"></table>");
        //            formObj.$MainContent.append(formObj.$FormContent);
        //        }
        //        else {
        //            formObj.$FormContent.remove();
        //            formObj.$MainContent.append("<table cellspacing=\"0\" class=\"  ACT-GRID-TABLE table-hover table table-bordered table-striped table-hover\" id=\"grid_tables\"></table>");
        //            formObj.$FormContent = formObj.$MainContent.children(":first");

        //        }
        if (formObj.ParentPageObj && formObj.ParentPageObj.PageStyle == "List") {
          //  formObj.HasNoCk = false;
            var $table = $("<table class=\"   table table-bordered table-striped table-hover table-condensed\" id=\"grid_tables\"><thead><tr  ><th class=\"ACT-BTN-CONTAINER well\"  colspan='1000'></th></tr><tr class='ACT-HEADER MEMBER'></tr></thead><tbody></tbody></table>");
        }
        else {
            var $table = $("<table class=\"   table table-bordered table-striped table-hover table-condensed\" id=\"grid_tables\"><thead><tr class='ACT-HEADER MEMBER'></tr></thead><tbody></tbody></table>");
        }
        formObj.$FormContent.html("");
        formObj.$RowContent = $table.find('tbody');
        //table-responsive
        //if (!formObj.HasNoCk) {
            formObj.$FormContent.addClass("table-responsive ask-form");
        //}
        formObj.$FormContent.append($table);

        if (formObj.ParentPageObj && formObj.ParentPageObj.PageStyle == "List") {
            //alert($table.find(".ACT-BTN-CONTAINER"));
            formObj.ParentPageObj.$ButtonContainer = $table.find(".ACT-BTN-CONTAINER");
        }
        var _xsl = $('<a href="#" name="MicrosoftExcelButton" data-xl-tableTitle=""  data-xl-buttonStyle="Standard"  data-xl-fileName="Book1"  data-xl-attribution="" ></a>');

        var _strb = $.AKjs.CreateBuffer("");
        if (!_form.DisableColumnGroup && _form.ColumnGroups && _form.ColumnGroups.length > 0) {
            var _buffer = $.AKjs.CreateBuffer("");
            $table.find(".ACT-HEADER").before("<tr class='ACT-HEADER GROUP'></tr>");
            _buffer.ad("<th style='width: 1.5em'></th>");
            $.each(_form.ColumnGroups, function (i, n) {
                var _colCount = n.Columns.length;
                var _displayName = n.DisplayName ? n.DisplayName : "";
                if (n.IsHidden) {
                    _buffer.ad("<th colspan='" + _colCount + "' style='display:none'><span>" + _displayName + "</span></th>");
                }
                else {
                    _buffer.ad("<th colspan='" + _colCount + "'><span>" + _displayName + "</span></th>");
                }
            });
            $table.find("tr.GROUP").append($(_buffer.toString()));

        }
        if (!formObj.HasNoCk) {
            _strb.ad("<th class='thCheckAll' style='width:1em;'><a  ichecked = 'false' class=\"ACT-CHECK-ALL icon-check-empty fa fa-square-o\"/  ></th>");
        }
        else {
            _strb.ad("<th style='width: 1.5em'></th>");
        }
        //_strb.ad("<th></th>");
        formObj.$FormContent.find(".ACT-CHECK-ALL").bind("click", function () {
            if ($(this).attr("ichecked") == "false") {
                formObj.$FormContent.find(".ACT-CHECK-SINGLE").removeClass("icon-check-empty fa fa-square-o").addClass("icon-check fa fa-check-square-o");
                // formObj.$FormContent.find(".ACT-CHECK-SINGLE").attr("ichecked", true);
                // $(this).removeClass("icon-check-empty").addClass("icon-check");
                $(this).attr("ichecked", true);
            } else {
                formObj.$FormContent.find(".ACT-CHECK-SINGLE").removeClass("icon-check fa fa-check-square-o").addClass("icon-check-empty fa fa-square-o");
                // formObj.$FormContent.find(".ACT-CHECK-SINGLE").attr("ichecked", false);
                // $(this).removeClass("icon-check").addClass("icon-check-empty");
                $(this).attr("ichecked", false);
            }
        });
        var _colIndex = 0;
        $.each(_form.Columns, function (i, n) {
            if (n.ControlType == "Hidden") {
                if (n.Prompt == null || n.Prompt == "") {
                    _strb.ad("<th sort=\"DESC\" acol='" + n.Name + "'  class='ACT_HIDDEN' ><span>" + n.DisplayName + "</span></th>");
                } else {
                    _strb.ad("<th sort=\"DESC\" acol='" + n.Name + "'  class='ACT_HIDDEN' ><span>" + n.DisplayName + "(" + n.Prompt + ")</span></th>");
                }
            } else {

                var _data_hide = "";
                if (1 < _colIndex) {
                    _data_hide = "data-hide='phone'";
                }
                if (_colIndex > 4) {
                    _data_hide = "data-hide='phone,tablet'";
                }

                if ($.AKjs.IsEmpty(n.Width)) {
                    if (n.Sortable) {
                        if (n.Prompt == null || n.Prompt == "") {
                            _strb.ad("<th sort=\"DESC\" acol='" + n.Name + "' " + _data_hide + " order=\"" + n.Name + "\" current=\"" + n.DisplayName + "\"><span>" + n.DisplayName + "</span></th>");
                        } else {
                            _strb.ad("<th sort=\"DESC\" acol='" + n.Name + "' " + _data_hide + " order=\"" + n.Name + "\" current=\"" + n.DisplayName + "\"><span>" + n.DisplayName + "(" + n.Prompt + ")</span></th>");
                        }
                    } else {
                        if (n.Prompt == null || n.Prompt == "") {
                            _strb.ad("<th sort=\"DESC\"  acol='" + n.Name + "' " + _data_hide + " order=\"\" current=\"" + n.DisplayName + "\"><span>" + n.DisplayName + "</span></th>");
                        } else {
                            _strb.ad("<th sort=\"DESC\"  acol='" + n.Name + "' " + _data_hide + " order=\"\" current=\"" + n.DisplayName + "\"><span>" + n.DisplayName + "(" + n.Prompt + ")</span></th>");
                        }
                    }
                }
                else {
                    // alert(n.Width.toString());
                    var _w = n.Width.toString();
                    if (!_w.AendWith("%") && !_w.AendWith("px") && !_w.AendWith("em")) {
                        _w = _w + "em";
                    }
                    if (n.Prompt == null || n.Prompt == "") {
                        _strb.ad("<th acol='" + n.Name + "' sort=\"DESC\" order=\"" + n.Name + "\" style=\"max-width:" + _w + "\"><span style=\"max-width:" + _w + ";overflow: hidden; \">" + n.DisplayName + "</span></th>");
                    } else {
                        _strb.ad("<th acol='" + n.Name + "' sort=\"DESC\" order=\"" + n.Name + "\" style=\"max-width:" + _w + "\"><span style=\"max-width:" + _w + ";overflow: hidden; \">" + n.DisplayName + "(" + n.Prompt + ")</span></th>");
                    }
                }
                _colIndex++;
            }
        })
        if (formObj.Form.Columns.length <= 4) {
            _strb.ad("<th acol='databutton' sort=\"DESC\" order=\"\"><span></span></th>");
        }
        //创建表头
        //alert(_strb.toString());
        //this.initPager(this.PageIndex);
        if (formObj.HasNoCk && formObj.Form.HasBatchInsert) {
            _strb.ad("<th style='width:1em;'><a  class='ACT-NEW-ROW'><i  title='新增记录'  class='icon-plus-sign fa fa-plus-circle icon-2x icon-white '></i> </a></th>");
        }
        $table.find("thead>tr.MEMBER").append($(_strb.toString()));

        $table.find(".ACT-NEW-ROW").off("click").on("click", function () {
            formObj.addNewRow();
        });
        //  formObj.addNewRow();


        // formObj.$FormContent.append();
        //排序
        if (formObj.SortName != "") {
            if (formObj.IsASC) {
                formObj.$FormContent.find("th[order='" + formObj.SortName + "']").append("<i class='icon-circle-arrow-down fa fa-arrow-circle-down'>&nbsp;</i>");
            } else {
                formObj.$FormContent.find("th[order='" + formObj.SortName + "']").append("<i class='icon-circle-arrow-up fa fa-arrow-circle-up'>&nbsp;</i>");
            }
        }
        if (formObj.Form.HasBatchInsert) {
            if (!formObj.HasNoCk) {
                formObj.$FormContent.append(formObj.$AddOrDel);
                formObj.$AddOrDel.find('.ACT-ROW-ADD').click(function () {
                    var newRowCount = formObj.$AddOrDel.find('.ACT_DEL_COUNT').val();
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
        // $table.before(_xsl);
        //document.write('<script src="http://r.office.microsoft.com/r/rlidExcelButton?v=1&kip=1" type="text/javascript"></script>');
        //  var _lab = $LAB.setOptions({ CacheBust: true });

        //  _lab = _lab.script("http://r.office.microsoft.com/r/rlidExcelButton?v=1&kip=1");
    }
    //}

    $.AKjs.CreateGridRowObj = function (options) {
        return $.AKjs.AtawGridRowDom(options);
    }

    $.AKjs.InitGridRowContent = function (formContent, formObj) {
        var _$row = $("<tr style=' vertical-align: baseline;' class='data_row'/>");
        if (formObj.$GridTailRow) {
            formObj.$GridTailRow.before(_$row);
        }
        else {
            formContent.append(_$row);
        }
        return _$row;
    }

    function AtawGridForm() {
        this.$AddOrDel = $('<div class=" btn-group aks-nad-btn-row">'
                     + '<a  class="  btn-xs ACT-ROW-DEL ">'
                + '<i class="icon-minus fa fa-minus icon-white"></i></a>'
                + '<span ><input style="width:2em;text-align: center;" type="text"  class="ACT_DEL_COUNT"  /></span>'
                 + '<a  class=" btn-xs  ACT-ROW-ADD">'
                + '<i class="icon-plus fa fa-plus icon-white"></i></a>'
                + '</div>');
        this.HasNoCk = true;
        this.$GridTailRow = null;
        //$("<tr><td></td><td></td><td>2</td><td></td><td></td><td>r</td><td>2</td><td></td><td>3</td><td>2</td><td>vv</td></tr>");
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            
            this.AtawBaseForm_creator();
            //this.$Right.addClass("");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initGroupHead", function (strBuffer) {

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "afterInit", function () {
            this.AtawBaseForm_afterInit();
            // alert(this.$FormContent.data('footable_info'));
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initTitle", function () {
            this.$Title = $("<div class='title'><h2>" + this.Title + "</h2></div>");
        });

        //初始化表体
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initTailRowOpt", function (tailRowStr) {
            
            this.$GridTailRow = $(tailRowStr);
            this.$RowContent.append(this.$GridTailRow);

        })

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getRowLength", function () {
            var _$tr = this.$JObj.find("table>tbody>tr");
            if (_$tr.length == 1) {
                if (_$tr.hasClass("acs-nodata-alert"))
                    return 0;
                else
                    return 1;
            }
            else
                return _$tr.length;
        });

        //初始化表体
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initFormContent", function () {

            $.AKjs.InitGridFormContent(this);

            // this.$MainContent.addClass("table-responsive");
            // this.$FormContent.footable();
            // alert(1);
        })

        //创建新的一行
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
                //ParentFormObj:
            };

            //var _row = this.createRowObj(_op, fromType);
            var _row = $.AKjs["CreateGridRowObj"](_op);
            this.MaxIndex++;
            _row.intoDom($.AKjs.InitGridRowContent(this.$RowContent, this));
            return _row.$JObj;
            //            var _tr = $("<tr class=\"data_row\"><td class='cbk_panel'><input type=\"checkbox\"  class=\"ACT-CHECK-SINGLE\"/></td></tr>");
            //            var _this = this;
            //            //控件的init一定要在 dom 存在元素之后
            //            this.$FormContent.append(_tr);
            //            var _formConfig = this.InsertForm.Columns;
            //            var _rowCount = this.MaxIndex++;
            //            if (_rowCount < 0) {
            //                _rowCount = 0;
            //            }
            //            $.each(_formConfig, function (i, n) {
            //                var _control = $("<td></td>");
            //                _tr.append(_control);
            //                var _dv = $.AKjs.AtawJsDataValueOrObj(n.Options.DataValue, _this.Data);
            //                var _controlOption = $.extend({}, n.Options,
            //                 {
            //                     DataValue: _dv,
            //                     ParentFormObj: _this,
            //                     ChangeEventFun: _this.getChangeEventFunByName(n, _this)
            //                 }
            //                 );
            //                var _AtawControlObj = $.AKjs["Ataw" + n.ControlType](_controlOption);
            //                _AtawControlObj.IsChange = true;

            //                _AtawControlObj.intoDom(_control);
            //                if (n.ControlType == "Hidden") {
            //                    _control.hide();
            //                }
            //                _AtawControlObj.setSubmit(_rowCount);
            //                _AtawControlObj.$JObj.addClass("PAGE-CONTROL");
            //            });
            //            return _tr;

        })

        //创建行
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "createRowObj", function (options) {
            //            if (fromType) {
            //                return $.AKjs["Ataw" + fromType + "RowDom"](options);
            //            }
            //            else {
            //                return $.AKjs.AtawGridRowDom(options);
            //            }
            $.AKjs.CreateGridRowObj(options);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "bindEvent", function () {
            var _this = this;
            //列头排序(点击事件)
            if (_this.ParentPageObj && _this.ParentPageObj.PageStyle == "List") {
                _this.$FormContent.find("th").click(function () {
                    if (_this.IsASC == false) {
                        _this.IsASC = true;
                    } else {
                        _this.IsASC = false;
                    }
                    //获取排序字段
                    _this.SortName = $(this).attr("order");
                    if (_this.SortName != null && _this.SortName != "") {
                        var curPage = _this.$Pager.find(".current").attr("title");
                        _this.searchDataList(parseInt(curPage));
                    }
                });
            }
            _this.AtawBaseForm_bindEvent();
        });

        //通过checkbox获取行对象
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getRowByCheckBox", function () {
            return this.$FormContent.find(".ACT-CHECK-SINGLE[ichecked='true']").parents("tr");
            //.remove();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initRowList", function () {
            for (var _i = 0; _i < this.AtawRowList.length; _i++) {
                // var _$dv = this.initRowContent();
                var _item = this.AtawRowList[_i];
                var _$dv = $.AKjs["Init" + this.FormType + "RowContent"](this.$RowContent, this, _item);
                this.AtawRowList[_i].intoDom(_$dv);
                // this.AtawRowList[_i].intoDom(_$dv);
            }
            if (this.$GridTailRow) {
                this.$RowContent.append(this.$GridTailRow);
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initRowContent", function () {
            //var _$row = $("<tr class='data_row'/>")
            //this.$FormContent.append(_$row);
            //return _$row;
            return $.AKjs.InitGridRowContent(this.$RowContent);
        });

        //        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "cancleColumn", function (colName) {
        //            //-----------

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "reInitForm", function () {
            this.AtawBaseForm_reInitForm();
            // alert("刷新");
            // this.$FormContent.footable();

            //            var _obj = this.$FormContent.data('footable_info');
            //            // alert(_obj);
            //            if (_obj) {
            //                _obj.resize();
            //            }
            //            else {
            //                // alert(123);
            //                this.$FormContent.footable();
            //            }

        });

    }
})(jQuery);
