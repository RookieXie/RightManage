(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};


    $.AKjs.AtawQingForm = function (options) {
        return $.extend({}, $.AKjs.AtawBaseForm(options), new AtawQingForm()).sysCreator();
    }

    function _extend() {
        return $.extend({}, $.AKjs.AtawBaseForm(options), new AtawQingForm());
    }

    $.fn.AtawQingForm = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawQingForm", options);
    }

    $.AKjs.InitQingFormContent = function (formObj) {
        if (formObj.$FormContent == null) {
            formObj.$FormContent = $("<ul class='qing_messages'></ul>");
        }
        formObj.$FormContent.append("<div class=\"checkall\"><input type=\"checkbox\" class=\"ACT-CHECK-ALL\"/> 全选</div>");
    }

    $.AKjs.InitQingRowContent = function (formContent) {
        var _rowDiv = $("<li class='qing_row'><h2><input class=\"ACT-CHECK-SINGLE DT_ckb_input\" type=\"checkbox\"></h2><div class='qing_avatar'></div></li>");
        var _rowMain = $("<div class='qing_main'></div>");
        _rowMain.append("<span class='caret'></span><span class='qing_name'><span class='qing_date'></span></span><p class='qing_content'></p>");
        _rowDiv.append(_rowMain);
        //_$div.append(_rowDiv);
        formContent.append(_rowDiv);
        // return _$div.find(".qing_row");
        return _rowDiv;
    }

    $.AKjs.CreateQingRowObj = function (op) {
        return $.AKjs.AtawQingRowDom(op);
    }

    function AtawQingForm() {

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.AtawBaseForm_creator();

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "createRowObj", function (op) {
            return $.AKjs.CreateQingRowObj(op);

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initFormContent", function () {
            $.AKjs.InitQingFormContent(this);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "reloadData", function () {
            //清空数据
            this.$FormContent.empty();

            this.AtawBaseForm_reloadData();
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initRowContent", function () {
            return $.AKjs.InitQingRowContent(this.$FormContent);

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getRowByCheckBox", function () {
            return this.$FormContent.find(".ACT-CHECK-SINGLE:checked").parents(".common_module");
            //.remove();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            var _dvId = "AlbumForm" + $.AKjs.getUniqueID();
            this.$JObj.attr("id", _dvId);
            this.AtawBaseForm_init();


        });
    }

})(jQuery);
