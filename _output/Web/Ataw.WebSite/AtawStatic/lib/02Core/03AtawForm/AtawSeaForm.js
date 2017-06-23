(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};


    //----------构造控件基类
    $.AKjs.AtawSeaForm = function (options) {
        return $.extend({}, $.AKjs.AtawBaseJPlugIn(options), new AtawSeaForm()).sysCreator();
    }

    //-----------------控件的基类---------
    function AtawSeaForm() {
        this.FormName = "";
       
        this.Title = null;
        
        this.IsSeaForm = true;
        this.SeaName = "";
        this.P1 = "";
        this.p2 = "";
        this.p3 = "";

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            // this.AtawBaseForm_creator();
            this.setProByOptName("Title");
            this.setProByOptName("P1");
            this.setProByOptName("P2");
            this.setProByOptName("P3");
            if (this.Options.SeaInformation) {
                this.SeaName = this.Options.SeaInformation.Name;
            }

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            var _$dom = $("<div class='text-center '><i class='fa fa-blind fa-2x'>正在载入... ... 请稍后...</i></div>");
            this.$JObj.append(_$dom);
           
            var _regName = this.SeaName;
            if (_regName) {
                if (window.my_senderPage) {
                    my_senderPage(_regName, _$dom[0], {
                        P1: this.P1 ,
                        P2: this.P2,
                        P3: this.P3

                    });
                }
            } else {
                _$dom.append("没有配置页面名");
            }

        });


      

    }
})(jQuery);