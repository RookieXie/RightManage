(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};
    $.AKjs.ScriptFormFun = $.AKjs.ScriptFormFun ? $.AKjs.ScriptFormFun : {};

    //----------构造控件基类
    $.AKjs.AtawScriptForm = function (options) {
        return $.extend({}, $.AKjs.AtawBaseJPlugIn(options), new AtawScriptForm()).sysCreator();
    }

    //-----------------控件的基类---------
    function AtawScriptForm() {
        this.Name = null;
        this.Title = null;
        this.ScriptFormFunName = ""; //($JObj,Data)
        this.ExtData = null;
        this.Data = null;
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            // this.AtawBaseForm_creator();
            this.setProByOptName("Title");
            this.setProByOptName("Name");
            this.setProByOptName("ScriptFormFunName");
            this.setProByOptName("Data");
            this.setProByOptName("ExtData");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            this.$JObj.append("<h2>" + this.Title + "<a class='UI_DeskTop_Module_more'>更多 »</a></h2>");
            if (!$.AKjs.IsEmpty(this.ScriptFormFunName)) {
                var _fun = $.AKjs.ScriptFormFun[this.ScriptFormFunName];
                if (_fun) {
                    _fun(this.$JObj, this.Data, this.ExtData,this);
                }
            }

        });



    }
})(jQuery);