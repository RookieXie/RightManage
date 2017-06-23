(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};


    $.AKjs.AtawColFilter = function (options) {
        return $.extend({}, $.AKjs.AtawBaseJPlugIn(options), new AtawColFilter()).sysCreator();
    }
    $.fn.AtawColFilter = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawColFilter", options);
    }

    function AtawColFilter() {
        this.ColList = [];
        this.$Ul = $('<ul class="nav nav-pills" />');
        this.ColCheckList = [];
        this.SingleCheckBoxFun = null;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.setProByOptName("ColList", "ColList");
            this.setProByOptName("SingleCheckBoxFun", "SingleCheckBoxFun");
            var _this = this;
            for (var i = 0; i < this.ColList.length; i++) {
                var _item = this.ColList[i];
                if (_item.ControlType != "Hidden" && _item.DisplayName != "") {
                    var Ischeck = true;
                    if (_item.IsHiddenCol == true) {
                        Ischeck = false;
                    }
                    if (_item.IsCheck == "check")
                        Ischeck = false;
                    var _op = {
                        DisplayName: _item.DisplayName,
                        ColName: _item.Name,
                        IsCheck: Ischeck,
                        SingleCheckBoxFun: function (colName, isShow) {
                            if (_this.SingleCheckBoxFun) {
                                _this.SingleCheckBoxFun(colName, isShow);
                            }
                        }
                    };
                    var _obj = new $.AKjs.AtawColCheck(_op);
                    this.ColCheckList.push(_obj);
                }
            }

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            this.$JObj.append(this.$Ul);
            //--------
            for (var i = 0; i < this.ColCheckList.length; i++) {
                var _$li = $("<li class='active'></li>");
                this.$Ul.append(_$li);
                var _$ai = $("<a/>");
                _$li.append(_$ai);
                var _item = this.ColCheckList[i];
                _item.intoDom(_$ai);
            }
            //this.$JObj
        });

    }


})(jQuery);