(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.AKjs.AtawTextLegal = function (control) {
        return $.extend({}, $.AKjs.AtawBaseLegal(control), new AtawTextLegal());
    };

    //文本框验证
    function AtawTextLegal() {
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "getTipJobj", function () {
            // alert(this.AtawControlObj.$JObj.find("input")[0].outerHTML);
            return this.AtawControlObj.$JObj.parent();
        });

        //邮箱格式验证
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "email", function () {
            var _reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.(?:com|cn)$/gi;
            if (!this.reg(_reg)) {
                this.LegalResult = false;
                this.poshytip("邮箱格式不对，格式如admin@163.com");
            }
        });

        //手机验证
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "mobile", function () {
            var _reg = /^1[34578]\d{9}$/;
            if (!this.reg(_reg)) {
                this.LegalResult = false;
                this.poshytip("手机格式不对,必须以13、14、15、17、18开头并且为11位");
            }
        });

        //座机验证
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "tel", function () {
            var _reg = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
            if (!this.reg(_reg)) {
                this.LegalResult = false;
                this.poshytip("座机号码格式不对,必须为(0(2或者3位)-(7或者8位),如0571-8888888");
            }
        });

        //密码验证
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "pwd", function () {
            var _reg = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
            if (!this.reg(_reg)) {
                this.LegalResult = false;
                this.poshytip("只能输入5-20个以字母开头、可带数字、“_”、“.”的字符串!");
            }
        });

        //用户名验证
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "username", function () {
            var _reg = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
            if (!this.reg(_reg)) {
                this.LegalResult = false;
                this.poshytip("只能输入5-20个以字母开头、可带数字、“_”、“.”的字串!");
            }
        });
    }

})(jQuery);
