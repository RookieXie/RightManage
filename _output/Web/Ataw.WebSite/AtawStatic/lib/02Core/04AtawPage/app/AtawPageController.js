(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};
    $.AKjs.AtawPageController = function (options) {
        return $.extend({}, $.AKjs.AtawBaseDom(options), new AtawPageController()).sysCreator();
    }

    function AtawPageController(options) {
        this.ModeName = "Default";
        this.Param1 = "";
        this.Param2 = "List";
        this.Param3 = "";


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "exeCommand", function () {
            var _mode = this[this.ModeName];
            if (_mode) {
                // _mode(this.Param1, this.Param2, this.Param3);
                this[this.ModeName]();
            }
            else {
                var _app = $.AKjs.AppGet();
                _app.notifyMesg("名称为 ： " + this.ModeName + "  的页面路由未指定");
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "creator", function () {
            this.setProByOptName("ModeName", "ModeName");
            this.setProByOptName("Param1", "Param1");
            this.setProByOptName("Param2", "Param2");
            this.setProByOptName("Param3", "Param3");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "default", function () {

            $.AKjs.App.loadMainPage(this.Param1, this.Param2, this.Param3);
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "documentCenter", function () {

            $.AKjs.App.loadDocumentCenterPage(this.Param1, this.Param2, this.Param3);
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "url", function () {
            window.location = this.Param1;
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "test", function () {

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "CenterInfo", function () {
            // $.AKjs.App.loadDesk(this.Param1);
            $.AKjs.App.loadCenterInfo(this.Param1);
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "desk", function () {
            $.AKjs.App.loadDesk(this.Param1);
        });

        //        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "myhomepage", function () {
        //            $.AKjs.App.loadMyHomePage($.AKjs.LoginId);
        //        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "menu", function () {
            var _key = this.Param1;
            // $.AKjs.App.clearMain();
            $.AKjs.App.clearMain();
            // _this.$ActMain.hide();
            var _$ul = $("<ul  class=' nav-pills' />");
            $.AKjs.App.$ActMain.append(_$ul);
            _$ul.AtawMenuCover({ MenuId: _key });
            $.AKjs.App.reloadToggle();
//            $.AKjs.App.$ActMain.slideUp("normal", function () {
//                $.AKjs.App.clearMain();
//                // _this.$ActMain.hide();
//                var _$ul = $("<ul  class=' nav-pills' />");
//                $.AKjs.App.$ActMain.append(_$ul);
//                //_$ul.AtawMenuCover({ MenuId: _key });

////                $.AKjs.App.$ActMain.show("fast", "swing", function () {

////                    // _this.$ActMain.show("fast");
////                    $.AKjs.App.reloadToggle();
////                })
//            });
            // $.AKjs.App.bindPageEvent();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "workflow", function () {

            $.AKjs.App.loadWorkflowPage(this.Param1, this.Param3);
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "view", function () {

            // $.AKjs.App.loadWorkflowPage(this.Param1, this.Param3);
            var xml = this.Param1;

            var postData = $.extend({}, { xml: xml, pageStyle: "List" })
            //this.changeAnchor(xml, pageStyle, param);
            $.AKjs.getJSON("/module/ModulePage", postData, _fun1);
            var _this = $.AKjs.App;
            function _fun1(res) {
                // _this.$ActMain.hide();

                _this.clearMain();
                _this.clearRight();
                // _this.$ActMain.hide();
                //                if (res.ExtData) {
                //                    res.ExtData.PageState = param;
                //                } else {
                //                    res.ExtData = { PageState: param }
                //                }
                _this.$ActMain.AtawViewPage(res);
                //                var mainObj = _this.$ActMain.AtawControl();
                //                if (paramObj.afterPageFun) {
                //                    var afterPageFun = new Function(paramObj.afterPageFun);
                //                    afterPageFun()(_this.$ActMain.AtawControl());
                //                }
                // _this.$ActMain.show();
                //_this.reloadToggle();
                // alert();
                _this.resetTable();
            };


        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "workflowguide", function () {
            $.AKjs.App.loadWorkflowGuidePage(this.Param1);
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "documentComment", function () {
            $.AKjs.App.loadDocumentCommentPage(this.Param1, this.Param2);
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "snsclubhome", function () {
            $.AKjs.App.loadSNSClubHomePage(this.Param1, this.Param2);
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "snsuserhome", function () {
            $.AKjs.App.loadSNSUserHomePage(this.Param1);
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "myhome", function () {
            $.AKjs.App.loadMyHomePage($.AKjs.LoginId);
        });
    }


})(jQuery);