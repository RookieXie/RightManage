(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    //类的构造函数
    $.AKjs.AtawLimitControl = function (options) {
        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawLimitControl());
    }
    $.fn.AtawLimitControl = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawLimitControl", options);
    }
    function AtawLimitControl() {

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "init", function () {
            var _this = this;
            _this.$JObj.append("<lable>发给谁:</label>");
            var _strShare = "<ul class='nav nav-pills acs-publish-btnGroup'>" +
                            "<li text='公开' name='ToAllPeople' class='active'><a>公开</a></li>" +
                            "<li text='私密' name='ToMyself'><a>私密</a></li>" +
                            "<li text='部门' name='ToDepartment'><a>部门</a></li>" +
                            "<li text='个人' name='ToUser'><a>个人</a></li></ul>";
                           
            _this.$JObj.append($(_strShare));
            var _$selector = $("<div class='selector' style='display:none'></div>");
            _this.$JObj.append(_$selector);

            _this.$JObj.find("li").unbind("click").bind("click", function () {
                _this.$JObj.find("li").each(function () {
                    $(this).removeClass("active");
                })
                $(this).addClass("active");
                if ($(this).attr("text") == "部门") {
                    if (_$selector.is(":hidden")) {
                        _$selector.show();
                    }
                    else {
                        _$selector.html("");
                    }
                    _$selector.AtawTreeSingleSelector({ RegName: "DepartmentCodeTable" });
                    _$selector.find("span").css("width", "20%");
                }
                else if ($(this).attr("text") == "个人") {
                    if (_$selector.is(":hidden")) {
                        _$selector.show();
                    }
                    else {
                        _$selector.html("");
                    }
                    _$selector.AtawSelector({ RegName: "MRPUserCodeData" });
                    _$selector.find("span").css("width", "20%");
                    _$selector.removeClass("ACT-SELECTBOX-PARENT");
                }
                else {
                    _$selector.html("");
                    _$selector.hide();
                }
            });
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Get", function () {
            return this.$JObj.find("li.active").attr("name");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getLimitId", function () {
            if (this.$JObj.find(".selector").AtawControl()) {
                return this.$JObj.find(".selector").AtawControl().dataValue();
            }
            else
                return "";
        });

    }
})(jQuery);