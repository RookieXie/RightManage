(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.AKjs.AtawGrid = function (options) {
        return $.extend({}, $.AKjs.AtawBaseJPlugIn(options), new AtawGrid()).sysCreator();
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

    $.fn.AtawGrid = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawGrid", options);
    }
    $.fn.datagrid = function (arg0, arg1) {
        if (typeof (arg0) == "object") {
            var _this = $(this);
            return _this.AtawGrid(arg0);
        }
        else {
            var _this = $(this);
            var grid = _this.AtawControl();
            if (grid && grid.ControlTypeName == "AtawGrid") {
                page = grid.GridForm;
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

    function AtawGrid() {
        this.GridForm = null;
        this.HasData = false;
        this.Url = null;
        this.PostData = null;
        this.PageSize = 5;
        this.IdField = null;

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
            //PageSize
            this.setProByOptName("pageSize", "PageSize");
            this.setProByOptName("idField", "IdField");
            //            if (this.PageSize == null || this.PageSize == 0)
            //                this.PageSize = 15;
            var _gCols = [];

            var hasKeyCol = false;
            for (var i = 0; i < _cols.length; i++) {
                if (_cols[i].field == this.IdField)
                    hasKeyCol = true;
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

            //-----
            var _form = {
                Title: this.Options.title,
                TableName: "TABLE",
                PrimaryKey: this.Options.idField,
                FormType: "Grid",
                ParentKey: this.Options.ParentKey,
                HasBatchInsert: false,
                HasSearch: false,
                Action: "List",
                //HasPager: false,
                HasPager: this.Options.pagination == true,
                Columns: _gCols
            }
            //---------设置Data
            var _pagerData = [{ TotalCount: 0, PageSize: this.PageSize, PageIndex: 1}];
            var _this = this;
            var _data = null;
            $.AKjs.getGridJson(
            this.Url,
            { rows: this.PageSize, page: 1 },
            function (res) {
                res = $.parseJSON(res);
                //alert(res.total);
                _pagerData[0].TotalCount = res.total;
                _data = { TABLE: res.rows, TABLE_PAGER: _pagerData };

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
                _this.GridForm = new $.AKjs.AtawGridForm(op);

            }, { async: false }
             );




        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            //this.AtawBaseForm_init();
            if (this.HasData) {
                this.GridForm.intoDom(this.$JObj);
            }
        });

        //清除选中行
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "clearSelections", function () {
            var chkboxes = this.GridForm.$FormContent.find(".ACT-CHECK-SINGLE:checked");
            $.each(chkboxes, function (i, item) {
                $(item).removeAttr("checked");
            });
        });
        //获取选中行
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getSelections", function () {
            //this.AtawBaseForm_init();
            var RowList = new Array();
            if (this.HasData) {
                var tr = this.GridForm.getRowByCheckBox(this.$JObj);
                var grid = this;
                $.each(tr, function (i, item) {
                    var rowindex = $(item).attr("rowindex");
                    var rowdata = grid.GridForm.Data.TABLE[rowindex];
                    RowList.push(rowdata);
                })
            }
            return RowList;

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "loadData", function (pageIndex, page, data) {
            var _this = this;
            var _postData = { rows: _this.PageSize, page: pageIndex, callback: Math.random() };
            if (data) {
                _postData = $.extend({}, _postData, data);
            }
            $.AKjs.getGridJson(_this.Url, _postData, function (res) {


                var data = $.parseJSON(res);

                //设置数据和分页
                var _pagerData = [{ TotalCount: data.total, PageSize: _this.PageSize, PageIndex: pageIndex}];
                page.Data = { TABLE: data.rows, TABLE_PAGER: _pagerData };
                page.setPagerData();
                page.initPager(pageIndex);

                page.reloadData();

            }, { async: false });
        });

    }

    //------------------------------



})(jQuery);
