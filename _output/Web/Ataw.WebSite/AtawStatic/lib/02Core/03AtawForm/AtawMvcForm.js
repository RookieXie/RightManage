(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};


    //----------构造控件基类
    $.AKjs.AtawMvcForm = function (options) {
        return $.extend({}, $.AKjs.AtawBaseJPlugIn(options), new AtawMvcForm()).sysCreator();
    }

    //-----------------控件的基类---------
    function AtawMvcForm() {
        this.FormName = "";
        this.Url = null;
        this.ActionName = null;
        this.AreaName = null;
        this.ControlName = null;
        //this.Url = null;
        this.HtmlContent = null;
        this.Title = null;
        this.HasHtml = false;
        this.UrlSetFun = null; //AtawMvcForm : string

        this.IsMvcForm = true;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            // this.AtawBaseForm_creator();
            this.setProByOptName("Title");
            this.setProByOptName("FormName");
            this.setProByOptName("Url");
            this.setProByOptName("ActionName");
            this.setProByOptName("AreaName");
            this.setProByOptName("ControlName");
            this.setProByOptName("HtmlContent");
            this.setProByOptName("UrlSetFun");
            this.HasHtml = !$.AKjs.IsEmpty(this.HtmlContent);

            if (!this.HasHtml && $.AKjs.IsEmpty(this.Url)) {
                this.Url = this.createUrl();
                if (this.UrlSetFun) {
                    this.Url = this.UrlSetFun(this);
                }
            }

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            //this.AtawBaseDom_init();
            if (this.HasHtml) {
                this.$JObj.html(this.HtmlContent);
            }
            else {
                if (!$.AKjs.IsEmpty(this.Url)) {
                    $.AKjs.load(this.Url, {}, this.$JObj, null, { async: true });
                }
            }

        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "createUrl", function () {
            var _url = "/" + this.ControlName + "/" + this.ActionName;
            if (!$.AKjs.IsEmpty(this.AreaName)) {
                _url = "/" + this.AreaName + _url;
            }
            return _url;
        });

    }
})(jQuery);