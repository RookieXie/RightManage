(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};


    $.AKjs.AtawBaseRowDom = function (options) {
        return $.extend({}, $.AKjs.AtawBaseDom(options), new AtawBaseRowDom());
    }

    //列的基类
    function AtawBaseRowDom() {
        this.ColumnList = []; //列的集合
        this.$DataRow = null; //每行
        this.DataSet = null;
        this.RowIndex = 0;
        this.FormConfig = null;
        //
        this.IsChange = false; //是否更新了
        this.KeyColumnObj = null; //主键列对象
        this.DataRow = null;
        //
        this.NoDelete = false; //禁止删除
        this.NoEdit = false; //禁止编辑

        this.IsInsertRow = false;
        // this.IsReadOnly = false;
        this.FunSetCheckBox = null; //(dataRow):bool

        this.ButtonList = [];
        this.BatchableButtonList = [];
        this.IsViewPage = false;
        this.MainColumnIndex = null;
        //给列的集合赋值
        //表单对象
        this.ParentFormObj = null;
        this.PrimaryKey = "";
        this.DataValueFix = false;

        this.SupportBtns = [];
        this.SupportBatBtns = [];
        this.ChangeRowFun = null;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            var _this = this;
            var _option = _this.Options;
            _this.FormConfig = _option.Form;
            this.RowIndex = _this.Options.RowIndex;
            this.DataRow = _this.Options.DataRow;
            this.IsInsertRow = _this.Options.IsInsertRow;
            // var _rowData = _option.DataSet
            // this.NoDelete = 
            this.setProByOptName("DataValueFix", "DataValueFix");
            this.setProByOptName("FunSetCheckBox", "FunSetCheckBox");
            this.setProByOptName("ParentFormObj", "ParentFormObj");
            this.setProByOptName("PrimaryKey", "PrimaryKey");
            if (!this.IsInsertRow && this.DataRow) {
                var _right = this.DataRow["BUTTON_RIGHT"];
                if (_right) {
                    var _rightList = _right.split("|");
                    this.NoDelete = _rightList.indexOf("Delete") < 0;
                    this.NoEdit = _rightList.indexOf("Update") < 0;
                    if (this.ParentFormObj) {
                        var pageObj = this.ParentFormObj.ParentPageObj;
                        if (pageObj) {
                            var dataButtons = pageObj.DataButtons;
                            if (dataButtons) {
                                // for (var dataButton in dataButtons) {
                                // var dataButton = dataButtons[k];
                                for (var j = 0; j < _rightList.length; j++) {
                                    var _btnName = _rightList[j];
                                    var _btn = dataButtons[_btnName];
                                    // if (dataButton === _right[j]) {
                                    if (_btn) {
                                        this.SupportBtns.push(_btnName);
                                        if (!_btn.Unbatchable) {
                                            this.SupportBatBtns.push(_btnName);
                                        }
                                    }
                                    //  }
                                }
                                // }
                            }
                        }
                    }

                }
                //                else {
                //                    this.NoDelete = true;
                //                    this.NoEdit = true;
                //                }
            }

            this.ColumnList = []; //列的集合
            $.each(_option.ColumnConfigs, function (i, col) {
                _this.foreachColumnConfig(i, col);
            });
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "foreachColumnConfig", function (i, col) {
            var _this = this;
            var _option = _this.Options;
            col.Options = col.Options ? col.Options : {};
            var _val = "";
            if (this.DataRow && col.Name) {
                _val = this.DataRow[col.Name];
            }
            if (this.DataValueFix) {
                var _dv = $.AKjs.AtawJsDataValue("", _option.DataSet, _val);
            }
            else {
                var _dv = $.AKjs.AtawJsDataValue(col.Options ? col.Options.DataValue : "", _option.DataSet, _val);
            }
            _dv.Index = _this.RowIndex;
            var _columnChangeFun = function () {
                _this.changeRow();
            };
            var _noEdit = false;
            if (col.Options.IsReadOnly) {
                _noEdit = true;
            }
            //            else
            //                _this.NoEdit = false;
            var _isMainColumn = false;
            if (this.MainColumnIndex) {
                // _isMainColumn = this.MainColumnIndex
            } else {
                if (col.ControlType != "Hidden")
                    _isMainColumn = true;
                this.MainColumnIndex = i;
            }

            var obj = {
                ColumnName: col.Name,
                ColumnConfig: col,
                DataValue: _dv,
                ColumnChangeFun: _columnChangeFun,
                IsReadOnly: _noEdit || _this.NoEdit,
                Width: col.Width,
                FormatterFun: col.FormatterFun,
                IsManColumn: _isMainColumn,
                ParentRowObj: _this,
                ParentFormObj: _this.ParentFormObj,
                Changer: col.Changer
            };
            var _colObj = _this.createColumn(obj);
            _this.foreachSetColumnObj(col, _colObj);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "foreachSetColumnObj", function (col, colObj) {
            this.ColumnList.push(colObj);
            if (col.Options.IsKey) {
                this.KeyColumnObj = colObj;
            }
        })

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setRemoveCheckboxInRow", function () {
            if (this.FunSetCheckBox)
                return this.FunSetCheckBox(this.DataRow);
            return false;
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initRow", function () { });

        //初始化行
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            // if (this.NoDelete || this.setRemoveCheckboxInRow()) {
            //     this.$DataRow.find(".ACT-CHECK-SINGLE").remove();
            // }
            // this.$JObj.append(this.$DataRow);
            this.initRow();
            this.$DataRow = this.$JObj;
            this.$DataRow.attr("RowIndex", this.RowIndex);
            var _this = this;
            var pageObj = this.ParentFormObj.ParentPageObj;
            //            if (pageObj.PageStyle === "List") {
            //                this.initOperateButton();
            //            }
            $.each(_this.ColumnList, function (i, col) {
                if (col) {
                    col.intoDom(_this.$DataRow);
                }
            });
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initOperateButton", function () {

        });
        //----集合插入
        //初始化行
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createColumn", function (options) {
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "changeRow", function (options) {
            if (this.KeyColumnObj && this.KeyColumnObj.AtawControlObj)
                this.KeyColumnObj.AtawControlObj.IsChange = true;
            if (this.ChangeRowFun)
            {
                this.ChangeRowFun(this);
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createOperateButton", function (buttonObj) {
            var _this = this;
            var pageObj = this.ParentFormObj.ParentPageObj;
            var formObj = this.ParentFormObj;
            var $a = $('<a  class="ACT-ROW-BTN btn-xs"  href="javascript:void(0)">' + buttonObj.Text + '</a> ')
            var aFun = null;
            var _cusBtName = null;
            if (buttonObj.Client && buttonObj.Client.Function) {
                _cusBtName = buttonObj.Client.Function;
                if (_cusBtName == "Update" || _cusBtName == "Delete" || _cusBtName == "Detail") {
                    _cusBtName = null;
                }
            }
            if (_cusBtName) {
                var _fun = $.AKjs[_cusBtName];
                if (_fun) { aFun = function () { _fun(pageObj); } }
                else {
                    aFun = function () {
                        Ataw.msgbox.show("按钮操作方法 $.AKjs." + _cusBtName + "未定义！", 4, 2000);
                    }
                }
            }
            else {
                if (buttonObj.Name == "Update" || buttonObj.Name == "Delete" || buttonObj.Name == "Detail") {
                    aFun = function () { pageObj.operateButtonWithFormName(buttonObj.Name, null, formObj.TableName); }
                }
                else {
                    aFun = function () {
                        Ataw.msgbox.show("按钮操作方法 $.AKjs." + _cusBtName + "未定义！", 4, 2000);
                    }
                }
            }
            $a.click(function () {
                pageObj.KeyValues = [];
                pageObj.$PanelBody.find(".ACT-CHECK-SINGLE").prop("checked", false);
                pageObj.KeyValues.push(_this.DataRow[_this.PrimaryKey]);
                _this.$JObj.find(".ACT-CHECK-SINGLE").prop("checked", true);
                aFun();
            })
            return $a;
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "additionButtonStyle", function ($buttonObj, buttonObj) {
            switch (buttonObj.Name) {
                case "Detail":
                    $buttonObj.html("<span><i class='icon-table fa fa-table mr2'/>" + buttonObj.Text + "</span>");
                    //$buttonObj.addClass('btn-info');
                    break;
                case "Delete":
                    $buttonObj.html("<span><i class='icon-trash fa fa-trash-o mr2' />" + buttonObj.Text + "</span>");
                    //$buttonObj.addClass('btn-danger');
                    break;
                case "Update":
                    $buttonObj.html("<span><i class='icon-edit fa fa-edit mr2' />" + buttonObj.Text + "</span>");
                    //$buttonObj.addClass('btn-warning');
                    break;
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getValObjByColNameList", function (colNameList) {
            var _res = {};
            for (var i = 0; i < colNameList.length; i++) {
                var _name = colNameList[i];
                var _val = this.getColumnObjByColName(_name).AtawControlObj.dataValue();
                _res[_name] = _val;
            }
            return _res;

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getColumnObjByColName", function (colName) {
            var _len = this.ColumnList.length;
            for (var i = 0; i < _len; i++) {
                var _colObj = this.ColumnList[i];
                if (_colObj.ColumnName == colName) {
                    //----------
                    return _colObj;
                };
            }
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dispose", function () {
            // var i = this.ColumnList.length;
            $.AKjs.DisposeObj(this.ColumnList);
            //            for (var i = 0; i < this.ColumnList.length; i++) {
            //                this.ColumnList[i].dispose();
            //            }
            // this.ColumnList.dispose();
            this.AtawBaseDom_dispose();
        });
    }

})(jQuery);
