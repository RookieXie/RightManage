(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};
    //APL-xxxx 字段控件
    //APBTN    列表按钮区
    //APCKBOX  选种按钮
    $.AKjs.Tpl = $.AKjs.Tpl ? $.AKjs.Tpl : {};
    $.AKjs.AtawTplForm = function (options) {
        return $.extend({}, $.AKjs.AtawBaseForm(options), new AtawTplForm()).sysCreator();
    }

    function _extend() {
        return $.extend({}, $.AKjs.AtawBaseForm(options), new AtawTplForm());
    }


//    $.AKjs.Tpl.Test = ('<div class="acs-album-form panel panel-default col-md-3" style="padding:0.1em">' +
//                          '<div class="panel-heading">制单人：<div class="APL-TEST_DOCUMENTMAKER"></div></div>' +
//                          '<div class="panel-body">' +
//                          '<img class="lazy" src="http://static.bootcss.com/www/assets/img/icheck.png" width="300" height="150" data-src="http://static.bootcss.com/www/assets/img/icheck.png" alt="iCheck">' +
//                          '{%=DataRow.TEST_MAKES_DATE%}<div class="APL-TEST_MAKES_DATE"></div></div>' +
//    //APL-OPEAR
//    '<div class="panel-footer APCKBOX"></div>' +
//                        '</div>');

    $.fn.AtawTplForm = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawTplForm", options);
    }
    $.AKjs.InitTplRowContent = function (formContent, formObj, rowObj) {
        var _rowData = rowObj.DataRow;
        var _str = $.AKjs.Template(formObj.Tpl, rowObj);
        var _$div = $(_str);
        formContent.append(_$div);
        return _$div;
    };

    $.AKjs.InitTplFormContent = function (formObj) {
        var _$div = $(formObj.Form.ContentTpl);
        //        var _$div = $('<div class="panel "><div class="panel-heading "><button class="ACT-TPL-CREATOR btn btn-primary btn-xs">模板</button><div class="APBTN"></div></div><div class="panel-body"></div><div class="panel-footer APBTN"></div></div>');
        formObj.$FormContent.html("");
        formObj.$RowContent = _$div.find(".panel-body");
        formObj.$FormContent.append(_$div);
        if (formObj.ParentPageObj && formObj.ParentPageObj.PageStyle == "List") {
            formObj.ParentPageObj.$ButtonContainer = _$div.find(".APBTN");
        }
        //formObj.$ConfigTplForm = $("<div/>");
        _$div.find(".ACT-TPL-CREATOR").off("click").on("click", function () {

            seajs.use("/Scripts/sea/Form/FormTplMRC.js", function (mrc) {


                if (formObj.$Win == null) {
                    formObj.$ConfigTplForm.AtawWindow({
                        Title: "表单模板自定义",
                        //activate: function () { _this.winPositionFun(); },
                        Width: "90%",
                        Fixed: true,
                        WindowOpenFun: function (a) {
                            mrc = new mrc();
                            mrc.R.init(formObj.$ConfigTplForm, formObj);
                        },
                        WindowCloseFun: function () {
                            // alert();
                            // mrc.dispose();
                            formObj.$Win = null;
                            formObj.$ConfigTplForm = $("<div/>");
                        }
                    });

                }
                //	this.$DataTable.css({ "height": "300px", "overflow": "auto" });

                formObj.$Win = formObj.$ConfigTplForm.AtawControl();
                formObj.$Win.open();

            });

        });
    };

    $.AKjs.CreateTplRowObj = function (options) {
        return $.AKjs.AtawTplRowDom(options);
    }
    function AtawTplForm() {
        this.Tpl = "";
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.setProByOptName("Tpl", "Tpl");

            this.AtawBaseForm_creator();
            this.Tpl = $.AKjs.Tpl.Test;
            this.Tpl = this.Form.RowTpl;
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            this.AtawBaseForm_init();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initFormContent", function () {

            $.AKjs.InitTplFormContent(this);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "afterInit", function () {
            this.AtawBaseForm_afterInit();

            // alert(this.$FormContent.data('footable_info'));
        });
    }

})(jQuery);
