(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};


    $.AKjs.AtawCommentForm = function (options) {
        return $.extend({}, $.AKjs.AtawBaseForm(options), new AtawCommentForm()).sysCreator();
    }

    function _extend() {
        return $.extend({}, $.AKjs.AtawBaseForm(options), new AtawCommentForm());
    }

    $.fn.AtawCommentForm = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawCommentForm", options);
    }

    $.AKjs.InitCommentFormContent = function (formObj) {
        var _$div = $("<ul class='media-list ACT-COMMENT-LIST'></ul>");
        formObj.$RowContent = _$div;
        formObj.$FormContent.append(_$div);
    }

    $.AKjs.InitCommentRowContent = function (rowContent) {
        var _rowDiv = $("<li class='media ACT-COMMENT-ROW clear'></li>");
        _rowDiv.append("<a class='pull-left ACT-AVATAR'></a>");
        _rowDiv.append("<div class='media-body'><div class='ACT-COMMENT'></div><div class='ACT-REPLIES'></div></div>");
        _rowDiv.find(".ACT-COMMENT").append("<div><small><a class='ACT-COMMENTATOR'></a><span class='ACT-BODY'></span></small></div>");
        _rowDiv.find(".ACT-COMMENT").append("<small><span class='text-muted ACT-DATE'></span><a class='ACT-REPLY-BTN'> 回复</a></small>");
        rowContent.append(_rowDiv);
        return _rowDiv;
    }

    $.AKjs.CreateCommentRowObj = function (op) {
        return $.AKjs.AtawCommentRowDom(op);
    }

    function AtawCommentForm() {
        this.AfterReplyFun = null; //回复别人的评论后的钩子
        this.ReplyViewList = null;
        this.ReplyTableName = null;
        this.ReplyModuleXml = null;
        this.ObjectId = null;
        this.AfterCommentFormInit = null;
        this.AfterReplyFormInit = null;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.setProByOptName("AfterReplyFun", "AfterReplyFun");
            this.setProByOptName("ReplyViewList", "ReplyViewList");
            this.setProByOptName("ReplyTableName", "ReplyTableName");
            this.setProByOptName("ReplyModuleXml", "ReplyModuleXml");
            this.setProByOptName("ObjectId", "ObjectId");
            this.setProByOptName("AfterCommentFormInit", "AfterCommentFormInit");
            this.setProByOptName("AfterReplyFormInit", "AfterReplyFormInit");

            this.AtawBaseForm_creator();

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "createRowObj", function (op) {
            return $.AKjs.CreateCommentRowObj(op);

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initFormContent", function () {
            $.AKjs.InitCommentFormContent(this);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "reloadData", function () {
            //清空数据
            this.$FormContent.empty();

            this.AtawBaseForm_reloadData();
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initRowContent", function () {
            return $.AKjs.InitCommentRowContent(this.$RowContent);

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getRowByCheckBox", function () {
            return this.$FormContent.find(".ACT-CHECK-SINGLE:checked").parents(".common_module");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "CreateRowListData", function () {
            var _dataRows = null;
            var _dt = this.Data[this.TableName];
            _dataRows = _dt;
            var _colConfigs = "";
            var replyDataRows = [];
            if (_dataRows != null && _dataRows.length > 0) {
                for (var i = 0; i < _dataRows.length; i++) {

                    var _dataRow = _dataRows[i];
                    var _op = {
                        DataSet: this.Data,
                        DataRow: _dataRow,
                        Form: this,
                        ColumnConfigs: this.Form.Columns,
                        RowIndex: i,
                        PrimaryKey: this.Form.PrimaryKey,
                        IsInsertRow: _dataRows["IsInsertRow"] === true,
                        FunSetCheckBox: this.Form.FunSetCheckBox,
                        IsViewPage: this.IsViewPage,
                        ParentFormObj: this,
                        ReplyDataRows: replyDataRows
                    };
                    var _row = $.AKjs["Create" + this.FormType + "RowObj"](_op);
                  
                    this.AtawRowList.push(_row);
                    this.MaxIndex++;
                }

            }

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            var _dvId = "CommentForm" + $.AKjs.getUniqueID();
            this.$JObj.attr("id", _dvId);

            this.initFormContent();
            this.$JObj.append(this.$FormContent);
            this.initRowList();
            if (this.Form.HasPager) {
                this.initPager(this.PageIndex);
                this.$JObj.append(this.$Pager);
            }
            if (!this.AfterInitFunName .AisEmpty()) {
                var _fun = $.AKjs.AfterFormFun[this.AfterInitFunName];
                if (_fun) {
                    _fun(this);
                }
                else {
                    alert("表单" + this.FormName + "的加载完函数 ($.AKjs.AfterFormFun." + this.AfterInitFunName + ") 没有被定义");
                }
            }
            if (this.AfterCommentFormInit)
                this.AfterCommentFormInit();
            // 执行css.js
            // $.AKjs.extraStyle(this);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initRowList", function () {
            for (var i = 0; i < this.AtawRowList.length; i++) {
                this.AtawRowList[i].intoDom($.AKjs["Init" + this.FormType + "RowContent"](this.$RowContent));
            }
        });

    }

})(jQuery);
