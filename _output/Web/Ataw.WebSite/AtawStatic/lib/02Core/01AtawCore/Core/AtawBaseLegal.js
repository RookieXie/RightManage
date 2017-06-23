(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.AKjs.AtawBaseLegal = function (control) {
        return $.extend({}, $.AKjs.AtawClass(), new AtawBaseLegal(control)).sysCreator();
        //return new AtawLegalBase(control).sysCreator();
    };

    function AtawBaseLegal(control) {
        this.AtawControlObj = control; //要验证的控件
        this.Kind = null; // Custom/notNull/reg
        this.LegalResult = true; //验证结果，默认是通过的
        this.CustomLegalFun = null;
        this.Reg = null;
        this.ErrMsg = null; //验证不通过的信息
        this.TipObj = null;
        this.IsEnable = true;

        this.LegalExpression = null;

        if (control.Options.Legal) {
            if (control.Options.Legal.Kind)
                this.Kind = control.Options.Legal.Kind;
            if (control.Options.Legal.CustomLegalFun)
                this.CustomLegalFun = control.Options.Legal.CustomLegalFun;
            if (control.Options.Legal.Reg)
                this.Reg = new RegExp(control.Options.Legal.Reg);
            if (control.Options.Legal.ErrMsg)
                this.ErrMsg = control.Options.Legal.ErrMsg;

            if (control.Options.Legal.LegalExpression)
                this.LegalExpression = control.Options.Legal.LegalExpression;

        }

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dangerDom", function (select, isShow) {
            var _$danger = this.AtawControlObj.$JObj.find(select);
            if (_$danger.length > 0) {
                _$danger.toggleClass("aks-input-danger", isShow == true);
                return true;
            }
            return false;
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "legalShow", function () {

            if (!this.dangerDom("TextArea", true)) {
                if (!this.dangerDom("input[type!='Radio'][type!='Checkbox']", true)) {
                    if (!this.dangerDom("select", true)) {
                        if (!this.dangerDom(".acs-maskcode-base", true)) {
                            this.AtawControlObj.$JObj.addClass("aks-input-danger");
                        }
                    }
                }
            }

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "legalHiden", function () {

            this.dangerDom("TextArea", false);
            this.dangerDom("input", false);
            this.dangerDom("select", false);
            this.dangerDom(".acs-maskcode-base", false);
            this.AtawControlObj.$JObj.removeClass("aks-input-danger");
            //this.dangerDom(".ACT_CONTROL", false);
        });
        /**
        *自定义验证函数
        *@type function({AtawLegalBase}):boolean
        */


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "legal", function () {
            if (!this.IsEnable) {
                return true;
            }
            if (this.Kind) {
                var _legalFun = this[this.Kind];
                if (_legalFun) {
                    this[this.Kind]();
                }
            }
            if (this.LegalResult == true) {
                this.canclePoshytip();
                this.legalHiden();
            }
            else {
                this.legalShow();
            }
            return this.LegalResult;
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "sysInit", function () {
            this.init();

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initTip", function () {
            if (this.Kind )
                // if (this.Kind) {
            {
                var _str = this.Kind.toUpperCase();
                if (_str.indexOf("NOTNULL") >= 0 || _str.indexOf("NULL") < 0) {
                    this.AtawControlObj.$JObj.append("<span class='formRedFonts'> *</span>");
                }
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "custom", function () {
            if ($.AKjs[this.CustomLegalFun]) {
                this.LegalResult = $.AKjs[this.CustomLegalFun](this, this.AtawControlObj);
                if (!this.LegalResult) {
                    this.poshytip();
                }
            }
            else {
                alert("找不到名称为 $.AKjs." + this.CustomLegalFun + "   的自定义验证函数 ");
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "customNull", function () {
            this.LegalResult = $.AKjs[this.CustomLegalFun](this, this.AtawControlObj);
            if (!this.LegalResult) {
                this.poshytip();
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "getTipJobj", function () {
            return this.AtawControlObj.getTipJobj();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "poshytip", function (message) {
            if (message) {
                this.ErrMsg = message ;
            }
           // this.AtawControlObj.$JObj.tooltip('destroy');
           // alert();
            this.AtawControlObj.$JObj.tooltip(
            {
               // trigger:"click",
                placement: "bottom",
                title: "<div class=' btn-danger ACT-MSG'>" + this.ErrMsg + "</div>",
                html: true
            });
            var _this = this;
            this.AtawControlObj.$JObj.on('shown.bs.tooltip', function () {
                // do something…
               // alert(123);
                var _id = _this.AtawControlObj.$JObj.attr("aria-describedby");
               $("#" + _id).find(".ACT-MSG").text(_this.ErrMsg);
            })
           // this.AtawControlObj.$JObj.attr("data-title", this.ErrMsg);
            //alert();
            this.AtawControlObj.$JObj.tooltip('show');
            //this.AtawControlObj.$JObj.attr("title", message);
            //            var _formType = this.AtawControlObj.ParentFormObj.FormType;
            //            if (this.TipObj == null) {
            //                this.TipObj = new $.AKjs.AtawTip({
            //                    Text: message,
            //                    FormType: _formType

            //                });
            //                this.TipObj.intoDom(this.getTipJobj());
            //                //this.getTipJobj().AtawControl().show();

            //            }
            //            else {
            //                this.TipObj.Text = message;
            //            }
            //this.AtawControlObj.$JObj.tooltip("show");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "canclePoshytip", function (message) {
            if (this.TipObj)
                this.TipObj.cancle();
            //  this.AtawControlObj.$JObj.attr("title", "");
            this.AtawControlObj.$JObj.tooltip('destroy')
            //this.getTipJobj().poshytip('destroy');
        });
        //
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "enableLegal", function (message) {
            this.IsEnable = true;
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "disableLegal", function (message) {
            this.IsEnable = false;
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "reg", function (reg) {
            return this.LegalResult = reg.test(this.AtawControlObj.dataValue());
        })

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "customReg", function () {
            this.LegalResult = this.Reg.test(this.AtawControlObj.dataValue());
            if (!this.LegalResult) {
                this.poshytip();
            }
        });

        //非空验证
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "notNull", function () {
            var _val = this.AtawControlObj.dataValue();
            this.LegalResult = true;
            if ($.AKjs.IsEmpty(_val)) {
                this.LegalResult = false;
                this.poshytip("不能为空");
            }
        });

        //必选验证
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "SelectionNotNull", function () {
            var _val = this.AtawControlObj.dataValue();
            this.LegalResult = true;
            if ($.AKjs.IsEmpty(_val)) {
                this.LegalResult = false;
                this.poshytip("请选择");

            } else if (_val == "--") {
                this.LegalResult = false;
                this.poshytip("请选择");
            }
        });

        //必选验证
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "RadioNotNull", function () {
            var _val = this.AtawControlObj.dataValue();
            this.LegalResult = true;
            if ($.AKjs.IsEmpty(_val)) {
                this.LegalResult = false;
                this.poshytip("请选择");

            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "UserNameLegal", function () {
            var _val = this.AtawControlObj.dataValue();
            this.Reg = /^[0-9a-zA-Z]\w{5,17}$/gi;
            this.LegalResult = this.Reg.test(this.AtawControlObj.dataValue());
            if (!this.LegalResult) {
                this.poshytip("用户名长度在6-18位之间，只能包含字符、数字、下划线");
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "PassWordLegal", function () {
            var _val = this.AtawControlObj.dataValue();
            this.Reg = /^[0-9a-zA-Z]\w{5,17}$/gi;
            this.LegalResult = this.Reg.test(this.AtawControlObj.dataValue());
            if (!this.LegalResult) {
                this.poshytip("密码长度在6-18位之间，只能包含字符、数字、下划线");
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "MobilePhoneLegal", function () {
            var _val = this.AtawControlObj.dataValue();
            //this.Reg = /(^1[3578]\d{9}$)|(^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)/gi;
            this.Reg = /(((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8]))\d{8}$)|(^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)/gi;
            this.LegalResult = this.Reg.test(_val);
            if (!this.LegalResult) {
                this.poshytip("必须是座机号或手机号，座机号格式为(0(2或者3位)-(7或者8位)");
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "EmailLegal", function () {
            var _val = this.AtawControlObj.dataValue();
            this.Reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.(?:com|cn)$/gi;
            this.LegalResult = this.Reg.test(_val);
            if (!this.LegalResult) {
                this.poshytip("电子邮箱格式不正确");
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "IDCardLegal", function () {
            var _val = this.AtawControlObj.dataValue();
            this.Reg = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/gi;
            this.LegalResult = this.Reg.test(_val);
            if (!this.LegalResult) {
                this.poshytip("身份证号码格式不正确");
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "PostCodeLegal", function () {
            var _val = this.AtawControlObj.dataValue();
            this.Reg = /^\d{6}$/gi;
            this.LegalResult = this.Reg.test(_val);
            if (!this.LegalResult) {
                this.poshytip("邮政编码为6为整数");
            }
        });

        //车辆油耗、初始公里数、承重、商品价格
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "VehicleLimitLegal", function () {
            var _val = this.AtawControlObj.dataValue();
            this.Reg = /^\d+(\.\d{1,2})?$/gi;
            this.LegalResult = this.Reg.test(_val);
            if (!this.LegalResult) {
                this.poshytip("必须是整数或小数点后1-2位的小数");
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "PriceLegal", function () {
            var _val = this.AtawControlObj.dataValue();
            this.Reg = /^\d+(\.\d{1,2})?$/gi;
            this.LegalResult = this.Reg.test(_val);
            if (!this.LegalResult) {
                this.poshytip("必须是整数或小数点后1-2位的小数");
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "SeatLegal", function () {
            var _val = this.AtawControlObj.dataValue();
            this.Reg = /^[0-9]*[1-9][0-9]*$/gi;
            this.LegalResult = this.Reg.test(_val);
            if (!this.LegalResult) {
                this.poshytip("必须是大于0的整数");
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "ContextLegal", function () {
            var _val = this.AtawControlObj.dataValue();
            this.Reg = /^.{1,200}$/gi;
            this.LegalResult = this.Reg.test(_val);
            if (_val != null && _val != "") {
                this.poshytip("备注不能为空");
            } else if (!this.LegalResult) {
                this.poshytip("备注介绍不得大于200字");
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "TitleLegal", function () {
            var _val = this.AtawControlObj.dataValue();
            this.Reg = /^.{1,15}$/gi;
            this.LegalResult = this.Reg.test(_val);
            if (!this.LegalResult) {
                this.poshytip("标题不得大于15字");
            }
        });

        //可以为空，若不为空启用正则验证

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "EmailLegalNull", function () {
            var _val = this.AtawControlObj.dataValue();
            if (_val != null && _val != "") {
                this.Reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.(?:com|cn)$/gi;
                this.LegalResult = this.Reg.test(_val);
            }
            else {
                this.LegalResult = true;
            }
            if (!this.LegalResult) {
                this.poshytip("电子邮箱格式不正确");
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "IDCardLegalNull", function () {
            var _val = this.AtawControlObj.dataValue();
            if (_val != null && _val != "") {
                this.Reg = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/gi;
                this.LegalResult = this.Reg.test(_val);
            }
            else {
                this.LegalResult = true;
            }
            if (!this.LegalResult) {
                this.poshytip("身份证号码格式不正确");
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "PostCodeLegalNull", function () {
            var _val = this.AtawControlObj.dataValue();
            if (_val != null && _val != "") {
                this.Reg = /^\d{6}$/gi;
                this.LegalResult = this.Reg.test(_val);
            }
            else {
                this.LegalResult = true;
            }
            if (!this.LegalResult) {
                this.poshytip("邮政编码为6为整数");
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "MobilePhoneLegalNull", function () {
            var _val = this.AtawControlObj.dataValue();
            if (_val == null || _val == "") {
                this.LegalResult = true;
            } else {
                this.Reg = /(((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8]))\d{8}$)|(^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)/gi;
                //this.Reg = /(^1[3578]\d{9}$)|(^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)/gi;
                this.LegalResult = this.Reg.test(_val);
            }
            if (!this.LegalResult) {
                this.poshytip("必须是座机号或手机号，座机号格式为(0(2或者3位)-(7或者8位)");
            }
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "VehicleLimitLegalNull", function () {
            var _val = this.AtawControlObj.dataValue();
            if (_val != null && _val != "") {
                this.Reg = /^\d+(\.\d{1,2})?$/gi;
                this.LegalResult = this.Reg.test(_val);
            }
            else {
                this.LegalResult = true;
            }
            if (!this.LegalResult) {
                this.poshytip("必须是整数或小数点后1-2位的小数");
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "PriceLegalNull", function () {
            var _val = this.AtawControlObj.dataValue();
            if (_val != null && _val != "") {
                this.Reg = /^\d+(\.\d{1,2})?$/gi;
                this.LegalResult = this.Reg.test(_val);
            }
            else {
                this.LegalResult = true;
            }
            if (!this.LegalResult) {
                this.poshytip("必须是整数或小数点后1-2位的小数");
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "SeatLegalNull", function () {
            var _val = this.AtawControlObj.dataValue();
            if (_val != null && _val != "") {
                this.Reg = /^[0-9]*[1-9][0-9]*$/gi;
                this.LegalResult = this.Reg.test(_val);
            }
            else {
                this.LegalResult = true;
            }
            if (!this.LegalResult) {
                this.poshytip("必须是大于0的整数");
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "ContextLegalNull", function () {
            var _val = this.AtawControlObj.dataValue();
            if (_val != null && _val != "") {
                this.Reg = /^.{1,200}$/gi;
                this.LegalResult = this.Reg.test(_val);
            }
            else {
                this.LegalResult = true;
            }
            if (!this.LegalResult) {
                this.poshytip("备注介绍不得大于200字");
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "TitleLegalNull", function () {
            var _val = this.AtawControlObj.dataValue();
            if (_val != null && _val != "") {
                this.Reg = /^.{1,15}$/gi;
                this.LegalResult = this.Reg.test(_val);
            }
            else {
                this.LegalResult = true;
            }
            if (!this.LegalResult) {
                this.poshytip("标题不得大于15字");
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "nonnegativeIntegerNull", function () {
            var _val = this.AtawControlObj.dataValue();
            if (_val != null && _val != "") {
                this.Reg = /^([1-9]\d{0,}|0)$/gi;
                this.LegalResult = this.Reg.test(_val);
            }
            else {
                this.LegalResult = true;
            }
            if (!this.LegalResult) {
                this.poshytip("必须为非负整数");
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "nonnegativeInteger", function () {
            var _val = this.AtawControlObj.dataValue();
            this.Reg = /^([1-9]\d{0,}|0)$/gi;
            this.LegalResult = this.Reg.test(_val);
            if (!this.LegalResult) {
                this.poshytip("必须为非负整数");
            }
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "MorethanZeroLegal", function () {
            var _val = this.AtawControlObj.dataValue();
            this.Reg = /^\d+(\.\d{2})?$/;
            //  this.Reg = /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/;
            this.LegalResult = this.Reg.test(_val);
            if (!this.LegalResult) {
                this.poshytip("必须为非负数且大于0");
            }
        });



        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "MorethanZeroLegalNull", function () {
            var _val = this.AtawControlObj.dataValue();
            if (_val != null && _val != "") {
                this.Reg = /^\d+(\.\d{2})?$/;
                //    this.Reg = /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/;
                this.LegalResult = this.Reg.test(_val);
            } else {
                this.LegalResult = true;
            }
            if (!this.LegalResult) {
                this.poshytip("必须为非负数且大于0");
            }
        });
        //ExpressionLegal

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "ExpressionLegal", function () {
            var _colObj = this.AtawControlObj.ParentColumnObj;
            if (_colObj && _colObj.Changer && _colObj.Changer.DependColumns) {
                var datarow = _colObj.ParentRowObj.getValObjByColNameList(_colObj.Changer.DependColumns);

                if (this.LegalExpression) {
                    var _r = this.LegalExpression;
                    //alert(_r);
                    var _val = $.AKjs.Template(_r, datarow);
                    if (_val != "") {
                        this.LegalResult = false;
                        this.poshytip(_val);
                        return;
                    }
                }
                // this.setChangerVal(_obj);
            }
            //else {
            this.LegalResult = true;
            // }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "UploadCountLegal", function () {
            var _minCount = this.AtawControlObj.MinUploadCount;
            if (this.AtawControlObj.$JObj_Result.find(".ACT_FILE_ITEM").length < _minCount) {
                this.LegalResult = false;
                this.poshytip("上传的文件数不能少于" + _minCount);
            }
            else {
                this.LegalResult = true;
            }
        });

        //验证PCAS控件必填项个数
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "PCASRequiredCountLegal", function () {
            var _requiredCount = this.AtawControlObj.PCASRequiredCount;
            var _val = this.AtawControlObj.dataValue();
            var arr = _val.split("-");
            if (arr.length < _requiredCount) {
                this.LegalResult = false;
                this.poshytip("请将信息填写完整");
            }
            else {
                this.LegalResult = true;
            }
        });
    }

})(jQuery);
