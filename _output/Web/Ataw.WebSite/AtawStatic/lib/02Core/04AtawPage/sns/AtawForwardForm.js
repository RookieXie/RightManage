(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};


    $.AKjs.AtawForwardForm = function (options) {
        return $.extend({}, $.AKjs.AtawBaseForm(options), new AtawForwardForm()).sysCreator();
    }

    function _extend() {
        return $.extend({}, $.AKjs.AtawBaseForm(options), new AtawForwardForm());
    }

    $.fn.AtawForwardForm = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawForwardForm", options);
    }

    $.AKjs.InitForwardFormContent = function (formObj) {
        var _$div = $("<div class='qing_forward_list'></div>");
        formObj.$RowContent = _$div;
        formObj.$FormContent.append(_$div);
    }

    $.AKjs.InitForwardRowContent = function (rowContent) {
        var _rowDiv = $("<div class='qing_forwards_row'></div>");
        _rowDiv.append("<div class='qing_avatar'></div><span class='qing_name'></span><span class='qing_forward_body'></span>(<span class='qing_forward_date'></span>)");
        _rowDiv.append("<div class='forwardInfo'><a class='forward_action'>转发</a></div><div class='qing_replies'></div>");
        rowContent.append(_rowDiv);
        return _rowDiv;
    }

    $.AKjs.CreateForwardRowObj = function (op) {
        //        var _activityKey = op.DataRow["ActivityItemKey"];
        //        return $.AKjs["Ataw" + _activityKey + "RowDom"](op);
        return $.AKjs.AtawForwardRowDom(op);
    }

    function AtawForwardForm() {

        this.AfterSubForwardFun = null;//转发别人的转发后的钩子

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.setProByOptName("AfterSubForwardFun", "AfterSubForwardFun");
            this.AtawBaseForm_creator();

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "createRowObj", function (op) {
            return $.AKjs.CreateForwardRowObj(op);

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initFormContent", function () {
            $.AKjs.InitForwardFormContent(this);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "reloadData", function () {
            //清空数据
            this.$FormContent.empty();

            this.AtawBaseForm_reloadData();
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initRowContent", function () {
            return $.AKjs.InitForwardRowContent(this.$FormContent);

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getRowByCheckBox", function () {
            return this.$FormContent.find(".ACT-CHECK-SINGLE:checked").parents(".common_module");
            //.remove();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "CreateRowListData", function () {
            var _dataRows = null;
            var _dt = this.Data[this.TableName];
            _dataRows = _dt;
            var _colConfigs = "";
            if (_dataRows != null && _dataRows.length > 0) {
                for (var i = 0; i < _dataRows.length; i++) {
                    var _op = {
                        DataSet: this.Data,
                        DataRow: _dataRows[i],
                        Form: this,
                        ColumnConfigs: this.Form.Columns,
                        RowIndex: i,
                        PrimaryKey: this.Form.PrimaryKey,
                        IsInsertRow: _dataRows[i]["IsInsertRow"] === true,
                        FunSetCheckBox: this.Form.FunSetCheckBox,
                        IsViewPage: this.IsViewPage,
                        ParentFormObj: this
                    };
                    var _row = $.AKjs["Create" + this.FormType + "RowObj"](_op);
                    //                    if (_dataRows[i]["PID"] == "0") {
                    //                        this.ParentRowList.push(_row);
                    //                    }
                    //                    else {
                    //                        this.ChildRowList.push(_row);
                    //                    }
                    this.AtawRowList.push(_row);
                    this.MaxIndex++;
                }
            }

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            var _dvId = "ForwardForm" + $.AKjs.getUniqueID();
            this.$JObj.attr("id", _dvId);

            this.initFormContent();
            this.$JObj.append(this.$FormContent);
            this.initRowList();
            this.initPager(this.PageIndex);
            this.$JObj.append(this.$Pager);
            // 执行css.js
            //$.AKjs.extraStyle(this);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initRowList", function () {
            //            for (var i = 0; i < this.ParentRowList.length; i++) {
            //                this.ParentRowList[i].intoDom($.AKjs["Init" + this.FormType + "RowContent"](this.$FormContent));
            //            }
            //            for (var i = 0; i < this.ChildRowList.length; i++) {
            //                var _pid = this.ChildRowList[i].DataRow["PID"];
            //                var _$parentComment = this.$FormContent.find("div[comment_id='" + _pid + "']");
            //                this.ChildRowList[i].intoDom($.AKjs["InitReplyRowContent"](_$parentComment.find(".qing_replies")));
            //            }
            for (var i = 0; i < this.AtawRowList.length; i++) {
                this.AtawRowList[i].intoDom($.AKjs["Init" + this.FormType + "RowContent"](this.$RowContent));
            }
            //            this.$FormContent.parent().selctedBgColor();
            //            this.formartTree();
        });

    }

})(jQuery);
