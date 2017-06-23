(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};


    $.AKjs.AtawColCheck = function (options) {
        return $.extend({}, $.AKjs.AtawBaseJPlugIn(options), new AtawColCheck()).sysCreator();
    }
    $.fn.AtawColCheck = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawColCheck", options);
    }

    function AtawColCheck() {
        this.DisplayName = "";
        this.ColName = "";
        this.IsCheck = false;
        this.SingleCheckBoxFun = null;

        this.$Check = "";

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.setProByOptName("DisplayName", "DisplayName");
            this.setProByOptName("ColName", "ColName");
            this.setProByOptName("IsCheck", "IsCheck");
            this.setProByOptName("SingleCheckBoxFun", "SingleCheckBoxFun");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            if (this.IsCheck) {
                this.$Check = $('<i ichecked="true" class="ACT-COL-CHECK icon-check fa fa-check-square-o"/>');
            } else {
                this.$Check = $('<i ichecked="false" class="ACT-COL-CHECK icon-check-empty fa fa-square-o"/>');
            }
            this.$JObj.parent().toggleClass("active", this.IsCheck);
            this.$JObj.append(this.$Check);
            this.$JObj.append(this.DisplayName);
            var _this = this;
            this.$Check.off("click").on("click", function () {
                if ($(this).attr("ichecked") == "true") {
                    $(this).removeClass("icon-check fa fa-check-square-o").addClass("icon-check-empty fa fa-square-o");
                    $(this).attr("ichecked", false);
                }
                else {
                    $(this).removeClass("icon-check-empty fa fa-square-o").addClass("icon-check fa fa-check-square-o");
                    $(this).attr("ichecked", true);
                }
                //----------
                var _isCheck = false;
                if ($(this).attr("ichecked") == "true") {
                    _isCheck = true;
                }
                if (_this.SingleCheckBoxFun) {

                    _this.SingleCheckBoxFun(_this.ColName, _isCheck);
                }

                _this.$JObj.parent().toggleClass("active", _isCheck);
            });
        });

    }


})(jQuery);