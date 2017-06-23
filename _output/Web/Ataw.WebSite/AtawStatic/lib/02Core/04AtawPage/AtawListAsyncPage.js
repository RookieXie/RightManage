(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.AKjs.AtawListAsyncPage = function (options) {
        return $.extend({}, $.AKjs.AtawBaseJPlugIn(options), new AtawListAsyncPage()).sysCreator();
    }

    $.fn.AtawListAsyncPage = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawListAsyncPage", options);
    }

    function AtawListAsyncPage() {
        this.AtawListPage = null;

        // this.ModuleXml = "";
        this.Url = "/module/module";
        this.AjaxXml = null;
        this.AjaxPageStyle = "List";
        this.IsInit = false;
        this.AsyncFun = null;
        this.Title = "";
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.setProByOptName("AjaxXml", "AjaxXml");
            this.setProByOptName("AsyncFun", "AsyncFun");
            this.setProByOptName("IsInit", "IsInit");
            this.setProByOptName("Title", "Title");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
           // if (this.IsInit) {
                this.asyncInit(this.AsyncFun);
          //  }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "asyncInit", function (fun) {

            var _data = { xml: this.AjaxXml, pageStyle: "List" };
            var _this = this;
            $.AKjs.getJSON(this.Url, _data, function (res) {
                var _pageObj = $.AKjs.AtawListPage(res);
                _this.$JObj.html("");
                _pageObj.intoDom(_this.$JObj);
                if (fun) {
                    fun(res, _pageObj, _this);
                }
            });
        });

    }
})(jQuery);
