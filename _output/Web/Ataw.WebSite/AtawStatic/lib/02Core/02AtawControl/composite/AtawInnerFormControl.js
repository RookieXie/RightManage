(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};
    $.fn.AtawInnerForm = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawInnerForm", options);
    }

    //类的构造函数
    $.AKjs.AtawInnerForm = function (options) {

        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawInnerFormControl()).sysCreator();
    }

    function AtawInnerFormControl() {
        //--------
        this.FormObj = null;
        this.FormType = "Grid";
        this.InnerFormName = "";

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.setProByOptName("FormObj", "FormObj");
            this.setProByOptName("FormType", "FormType");
            this.setProByOptName("InnerFormName", "InnerFormName");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {

            if (this.InnerFormName != "") {
                var _formObj = this.ParentFormObj;
                var _forms = _formObj.ParentPageObj.FormObjs;
                var _form = _forms[this.InnerFormName];
                if (_form && _form.intoDom) {
                    _form.IsInner = true;
                    _form.IsPart = true;
                    _form.HasNoCk = true;
                    var _$dv = $("<div />");
                    this.$JObj.append(_$dv);
                    _form.intoDom(_$dv);
                    this.FormObj = _form;
                    _forms[this.InnerFormName].HasInitByInnerForm = true;
                }
            }
            // this.$JObj.append($("<div>kkk</div>"));
        });



    }


})(jQuery);