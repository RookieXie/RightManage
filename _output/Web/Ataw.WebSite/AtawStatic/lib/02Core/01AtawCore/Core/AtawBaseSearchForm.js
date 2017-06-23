(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};


    //----------构造控件基类
    $.AKjs.AtawBaseSearchForm = function (options) {
    	return $.extend({}, $.AKjs.AtawBaseJPlugIn(options), new AtawBaseSearchForm(options));
    }

    //-----------------控件的基类---------
       function AtawBaseSearchForm() {
        this.Form = null;
        this.Title = null;
        this.ExtData = null;
        this.$Title = null;
        this.$FormContent = null;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "creator", function () {
            this.Form = this.Options.Form;
            this.Title = this.Options.Title;
            this.ExtData = this.Options.ExtData;
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            this.initTitle();
            this.initFormContent(this.Options);
            this.$JObj.append(this.$Title);
            this.$JObj.append(this.$FormContent);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initTitle", function () {

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initFormContent", function () {

        });
    }
})(jQuery);