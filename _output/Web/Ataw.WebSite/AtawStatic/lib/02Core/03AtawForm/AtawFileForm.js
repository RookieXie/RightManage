(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};


    $.AKjs.AtawFileForm = function (options) {
        return $.extend({}, $.AKjs.AtawBaseForm(options), new AtawFileForm()).sysCreator();
    }

    function _extend() {
        return $.extend({}, $.AKjs.AtawBaseForm(options), new AtawFileForm());
    }

    $.fn.AtawFileForm = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawFileForm", options);
    }

    $.AKjs.InitFileFormContent = function (formObj) {
        formObj.$FormContent.html("");
        var _$div = $('<div class="FormContent row"><div class="panel"><div class="panel-heading ACT-BTN-CONTAINER"></div><div class="panel-body"></div></div></div>');
        if (formObj.ParentPageObj && formObj.ParentPageObj.PageStyle == "List") {

            formObj.ParentPageObj.$ButtonContainer = _$div.find(".ACT-BTN-CONTAINER");
        }
        if (formObj.Form.IsSearchRow) {
            _$div = $('<div class="FormContent row"><div class="panel"><div class="panel-body table-responsive documents-list"><table class="table table-hover table-condensed"><tbody></tbody></table></div></div></div>');
            formObj.$RowContent = _$div.find('tbody');
        } else {
            formObj.$RowContent = _$div.find('.panel-body');
        }
        formObj.$FormContent.append(_$div);
    }

    $.AKjs.CreateFileRowObj = function (op) {
        return $.AKjs.AtawFileRowDom(op);
    }

    $.AKjs.InitFileRowContent = function (formContent, formObj) {
        if (formObj.Form.IsSearchRow) {
            var _$div = $("<tr></tr>");
        } else {
            var _$div = $('<div class="documents-box"></div>');
        }
        formContent.append(_$div);
        return _$div;
    }

    function AtawFileForm() {
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.AtawBaseForm_creator();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "createRowObj", function (op) {
            return $.AKjs.CreateFileRowObj(op);

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initFormContent", function () {
            $.AKjs.InitFileFormContent(this);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "reloadData", function () {
            //清空数据
            this.$FormContent.empty();

            this.AtawBaseForm_reloadData();
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initRowContent", function () {
            return $.AKjs.InitFileRowContent(this.$RowContent, this);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getRowByCheckBox", function () {
            return this.$FormContent.find(".ACT-CHECK-SINGLE:checked").parents(".acs-album");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            var _dvId = "FileForm" + $.AKjs.getUniqueID();
            this.$JObj.attr("id", _dvId);
            this.AtawBaseForm_init();
        });
    }

})(jQuery);
