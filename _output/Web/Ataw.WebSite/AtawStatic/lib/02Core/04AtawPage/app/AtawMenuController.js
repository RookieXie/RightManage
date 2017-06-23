(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};
    $.AKjs.AtawMenuController = function (options) {
        return $.extend({}, $.AKjs.AtawBaseDom(options), new AtawMenuController()).sysCreator();
    }

    function AtawMenuController(options) {
        this.ModeName = "Default";
        this.Param1 = "";
        this.Param2 = "List";
        this.Param3 = "";


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "exeCommand", function () {
            var _mode = this[this.ModeName];
            if (_mode) {
                this[this.ModeName](this.Param1, this.Param2, this.Param3);
            }
            else {
                var _app = $.AKjs.AppGet();
                _app.notifyMesg("名称为 ： " + this.ModeName + "  的菜单路由未指定");
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "creator", function () {
            this.setProByOptName("ModeName", "ModeName");
            this.setProByOptName("Param1", "Param1");
            this.setProByOptName("Param2", "Param2");
            this.setProByOptName("Param3", "Param3");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "view", function () {
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "default", function () {
            var _app = $.AKjs.AppGet();
            _app.gotoMenuLoction("$$" + this.Param1);
            _app.IsDesk = false;
            _app.IsPushNotice = false;
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "documentCenter", function () {
            var _app = $.AKjs.AppGet();
            _app.gotoMenuLoction("$$" + this.Param1);
            _app.IsDesk = false;
            _app.IsPushNotice = false;
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "url", function () {
            window.location = this.Param1;
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "test", function () {

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "desk", function () {

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "CenterInfo", function () {
            var _app = $.AKjs.AppGet();
            _app.gotoMenuLoction();
            _app.IsDesk = true;
            _app.IsPushNotice = true;
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "menu", function () {
            var _app = $.AKjs.AppGet();
            _app.gotoMenuLoction(this.Param1);
            _app.IsDesk = false;
            _app.IsPushNotice = false;
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "workflow", function () {
            if (!this.Param2 || this.Param2 == "List") {
                this.Param2 = "$$module/workflow/myWork";
            }
            var _app = $.AKjs.AppGet();
            _app.gotoMenuLoction(this.Param2);
            _app.IsDesk = false;
            _app.IsPushNotice = false;
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "workflowguide", function () {
            var _app = $.AKjs.AppGet();
            _app.gotoMenuLoction("$$module/workflow/workflowDef");
            _app.IsDesk = false;
            _app.IsPushNotice = false;
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "documentComment", function () {
            var _app = $.AKjs.AppGet();
            _app.gotoMenuLoction("$$module/SNS/Documentcenter/SNS_ALLDocuments");
            _app.IsDesk = false;
            _app.IsPushNotice = false;
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "snsclubhome", function () {
            var _app = $.AKjs.AppGet();
            _app.gotoMenuLoction("$$module/SNS/Personal/Club/SNS_CLUBS");
            _app.IsDesk = false;
            _app.IsPushNotice = true;
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "snsuserhome", function () {
            var _app = $.AKjs.AppGet();
            _app.gotoMenuLoction("$$module/sns/public/user/user_detailDetail");
            _app.IsDesk = false;
            _app.IsPushNotice = false;
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "myhome", function () {
            var _app = $.AKjs.AppGet();
            _app.gotoMenuLoction("$$module/right/user/user_detail");
            _app.IsDesk = false;
            _app.IsPushNotice = false;
        });
    }


})(jQuery);