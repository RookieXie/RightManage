(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.AKjs.AtawTreeGrid = function (options) {
        return $.extend({}, $.AKjs.AtawBaseJPlugIn(options), new AtawTreeGrid()).sysCreator();
    }

    $.AKjs.getGridJson = function (url, data, fun, options) {
        var isLoad = options.isLoad;
        var _option = $.extend({},
            {
                url: url,
                data: data,
                type: "POST",
                async: false,
                dataType: "text",
                error: function (a) {
                    alert("出错 " + a.statusText);
                },
                beforeSend: function () {
                    Ataw.msgbox.show(" 正在加载，请稍后...", 6);
                }, complete: function () {
                    Ataw.msgbox.hide(500); //隐藏加载提示
                },
                success: fun
            }
            ,
            options);
        return $.ajax(_option);
    }

    $.fn.AtawTreeGrid = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawTreeGrid", options);
    }
    $.fn.treegrid = function (arg0, arg1) {
        if (typeof (arg0) == "object") {
            var _this = $(this);
            return _this.AtawTreeGrid(arg0);
        }
        else {
            var _this = $(this);
            var grid = _this.AtawControl();
            if (grid && grid.ControlTypeName == "AtawTreeGrid") {
                page = grid.TreeGridForm;
                switch (arg0) {
                    case "load":
                        //改变提交的数据
                        grid.loadData(page.PageIndex, page, arg1);
                        break;
                    case "reload":
                        //改变提交的数据
                        grid.loadData(1, page, arg1);
                        break;
                    case "getSelections": //获取选中行
                        return grid.getSelections();
                        break;
                    case "clearSelections": //清除选中行
                        grid.clearSelections();
                        break;
                    default:
                        break;
                }

            }
        }
    }

    function AtawTreeGrid() {
        this.TreeGridForm = null;
        this.HasData = false;
        this.Url = null;
        this.PostData = null;
        this.IdField = null;
        this.TreeField = null;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createColumn", function (col, i) {
            return {
                Name: col.field,
                DisplayName: col.title,
                ControlType: "Detail",
                Width: col.width,
                FormatterFun: col.formatter,
                Options: {
                    DataValue: {
                        DataValueType: "Table",
                        TableName: "TABLE",
                        ColumnName: col.field,
                        Index: i
                    },
                    IsReadOnly: false
                }
            };
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            //-----设置form
            this.setProByOptName("url", "Url");

            var _cols = this.Options.columns[0];
            this.setProByOptName("idField", "IdField");
            this.setProByOptName("treeField", "TreeField", "_parentId");
            
            //            if (this.PageSize == null || this.PageSize == 0)
            //                this.PageSize = 15;
            var _gCols = [];

            var hasKeyCol = false;
            for (var i = 0; i < _cols.length; i++) {
                if (_cols[i].field == this.IdField) {
                    hasKeyCol = true;
                }
                _gCols.push(this.createColumn(_cols[i], i));
            }

            if (!hasKeyCol && !$.AKjs.IsEmpty(this.IdField)) {
                _gCols.push({
                    Name: this.IdField,
                    ControlType: "Hidden",
                    Options: {
                        IsKey: true,
                        DataValue: {
                            DataValueType: "Table",
                            TableName: "TABLE",
                            ColumnName: this.IdField,
                            Index: 0
                        },
                        IsReadOnly: false
                    }
                }
                );
            }


            //   var _url = "/BankAccount/InitDataTest";
            var _form = {
                Title: this.Options.title,
                TableName: "TABLE",
                PrimaryKey: this.Options.idField,
                ParentKey: this.Options.treeField,
                Action: "List",
                FormType: "Grid",
                HasBatchInsert: false,
                HasSearch: false,
                HasPager: false,
                Columns: _gCols
            }
            //---------设置Data
            var _this = this;
            var _data = null;
            $.AKjs.getGridJson(
            this.Url,
            { rows: 100000, page: 1 },
            function (res) {
                res = $.parseJSON(res);
                _data = { TABLE: res.rows };
                _this.HasData = true;
                //------------
                // 创建对象
                var op = {
                    Data: _data,
                    Form: _form,
                    SearchDataListFun: function (pageIndex, page) {
                        _this.loadData(pageIndex, page);
                    }
                };
                _this.TreeGridForm = new $.AKjs.AtawTreeGridForm(op);
            },
            { async: false });

        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            if (this.HasData) {
                this.TreeGridForm.intoDom(this.$JObj);
            }
        });

        //清除选中行
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "clearSelections", function () {
            var chkboxes = this.TreeGridForm.$FormContent.find(".ACT-CHECK-SINGLE:checked");
            $.each(chkboxes, function (i, item) {
                $(item).removeAttr("checked");
            });
        });
        //获取选中行
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getSelections", function () {
            var RowList = new Array();
            if (this.HasData) {
                var tr = this.TreeGridForm.getRowByCheckBox(this.$JObj);
                var grid = this;
                $.each(tr, function (i, item) {
                    var rowindex = $(item).attr("rowindex");
                    var rowdata = grid.TreeGridForm.Data.TABLE[rowindex];
                    RowList.push(rowdata);
                })
            }
            return RowList;
        });

    }

})(jQuery);
