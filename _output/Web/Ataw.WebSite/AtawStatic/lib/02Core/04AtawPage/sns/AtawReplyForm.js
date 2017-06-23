(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};


    $.AKjs.AtawReplyForm = function (options) {
        return $.extend({}, $.AKjs.AtawBaseForm(options), new AtawReplyForm()).sysCreator();
    }

    function _extend() {
        return $.extend({}, $.AKjs.AtawBaseForm(options), new AtawReplyForm());
    }

    $.fn.AtawReplyForm = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawReplyForm", options);
    }

    $.AKjs.InitReplyFormContent = function (formObj) {
        var _$div = $("<div class='ACT-REPLY-LIST'></ul>");
        formObj.$RowContent = _$div;
        formObj.$FormContent.append(_$div);
    }

    $.AKjs.InitReplyRowContent = function (rowContent) {

        var _rowDiv = $("<div class='media ACT-REPLY-ROW clear'></div>");
        _rowDiv.append("<a class='pull-left ACT-AVATAR'></a>");
        var _$body = $("<div class='media-body ACT-BODY'></div>");
        _$body.append("<div><small><a class='ACT-REPLY-USER'></a><span class='ACT-REPLY-BODY'></span></small></div>");
        _$body.append("<small><span class='text-muted ACT-REPLY-DATE'></span><a class='ACT-SUBREPLY-BTN'> 回复</a></small>");
        _rowDiv.append(_$body);
        rowContent.append(_rowDiv);
        return _rowDiv;
    }

    $.AKjs.CreateReplyRowObj = function (op) {
        return $.AKjs.AtawReplyRowDom(op);
    }

    function AtawReplyForm() {
        this.AfterReplyFun = null; //回复别人的评论后的钩子
        this.ObjectId = null;
        this.AfterReplyFormInit = null;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.setProByOptName("AfterReplyFun", "AfterReplyFun");
            this.setProByOptName("ObjectId", "ObjectId");
            this.setProByOptName("AfterReplyFormInit", "AfterReplyFormInit");

            this.AtawBaseForm_creator();

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "createRowObj", function (op) {
            return $.AKjs.CreateReplyRowObj(op);

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initFormContent", function () {
            $.AKjs.InitReplyFormContent(this);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "reloadData", function () {
            //清空数据
            this.$FormContent.empty();

            this.AtawBaseForm_reloadData();
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initRowContent", function () {
            return $.AKjs.InitReplyRowContent(this.$RowContent);

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
                    this.AtawRowList.push(_row);
                    this.MaxIndex++;
                }
            }

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            var _dvId = "ReplyForm" + $.AKjs.getUniqueID();
            this.$JObj.attr("id", _dvId);

            this.initFormContent();
            this.$JObj.append(this.$FormContent);
            this.initRowList();
            //            this.initPager(this.PageIndex);
            //            this.$JObj.append(this.$Pager);
            // 执行css.js
            // $.AKjs.extraStyle(this);
            if (!this.AfterInitFunName .AisEmpty()) {
                var _fun = $.AKjs.AfterFormFun[this.AfterInitFunName];
                if (_fun) {
                    _fun(this);
                }
                else {
                    alert("表单" + this.FormName + "的加载完函数 ($.AKjs.AfterFormFun." + this.AfterInitFunName + ") 没有被定义");
                }
            }
            if (this.AfterReplyFormInit)
                this.AfterReplyFormInit();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initRowList", function () {
            for (var i = 0; i < this.AtawRowList.length; i++) {
                this.AtawRowList[i].intoDom($.AKjs["Init" + this.FormType + "RowContent"](this.$RowContent));
            }
        });

    }

})(jQuery);
