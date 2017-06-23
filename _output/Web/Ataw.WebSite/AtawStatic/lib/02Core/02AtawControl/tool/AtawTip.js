(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};


    $.AKjs.AtawTip = function (options) {
        return $.extend({}, $.AKjs.AtawBaseJPlugIn(options), new AtawTip()).sysCreator();
    }
    $.fn.AtawTip = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawTip", options);
    }

    //$.AKjs.AtawWindowIndex = 10000;
    //列的基类
    function AtawTip() {
        this.Text = null;
        this.$Tip = $('<div class="DataTip"><div class="chk-arrow"></div><div><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td class="tip_topleft"></td><td class="tip_topright"></td></tr><tr><td colspan="2"><span class="ACT_TIP_TXT">不能为空</span></td></tr><tr><td class="TIP_TD tip_bottomleft" ></td><td class="tip_bottomright"></td></tr></tbody></table></div></div>');
        this.FormType = "Normal";

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.setProByOptName("Text", "Text");
            this.setProByOptName("FormType", "FormType");
            if (this.Text) {
                this.$Tip.find(".ACT_TIP_TXT").html(this.Text);
            }
            this.$Tip.addClass("aks-"+this.FormType);
            // this.setProByOptName("Width", "Width");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "show", function () {
            this.$Tip.find(".ACT_TIP_TXT").html(this.Text);
            this.$Tip.show();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "cancle", function () {
            this.$Tip.hide();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            var _this = this;
            this.$JObj.append(this.$Tip);
            this.$Tip.unbind("click").bind("click", function () {
                //_this.$Tip.hide();
                // var _this = 
                // alert(123);
            });
            // this.$Tip.hide();
        });

    }


})(jQuery);