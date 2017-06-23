(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.AKjs.AtawTreeViewPage = function (options) {
        return $.extend({}, $.AKjs.AtawViewPage(options), new AtawTreeViewPage()).sysCreator();
    }

    $.fn.AtawTreeViewPage = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawTreeViewPage", options);
    }
    function AtawTreeViewPage() {
        this.$PageDiv = $("<div></div>");
        this.TreeRegName = "";
        this.Form = null;
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.TreeRegName = this.Options.TreeRegName;
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initForms", function () {
            var _this = this;
            this.$JObj.append(this.$PageDiv);
            $.each(this.Forms, function (i, n) {
                if (!i.AendWith("_INSERT", true) && !i.AendWith("_SEARCH", true)) {
                    var _op = { IsViewPage: _this.IsViewPage, Data: _this.Data, Form: this, TreeRegName: _this.TreeRegName, Xml: _this.RegName, DeleteFun: _this.Delete(), DropFun: _this.Drop() };
                    var _fromType = this.FormType;
                    var _fromObj = $.AKjs["AtawTreeForm"](_op);
                    _this.FormObjs[_fromObj.FormName] = _fromObj;
                    _fromObj.intoDom(_this.$PageDiv);
                }
            })
            this.$JObj.append(this.$Submit);
            this.$Submit.click(function () {
                _this.AddOrUpdate();
            })
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "Drop", function () {
            var _this = this;
            return function (option) {
                _this.submit(option);
            }

        })
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "Delete", function () {
            var _this = this;
            return function (option) {
                _this.submit(option);
            }

        })
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "AddOrUpdate", function () {
            var _this = this;
            var _PlugDataSet = _this.$JObj.find(".PAGE-CONTROL.ACT_POST").CreateLegalDataSet(_this.setPostControl(), _this.setLegalControl());
            //验证不通过
            if (_PlugDataSet == 0) {
                return false;
            }
            var _ds = $.extend({}, _PlugDataSet);
            this.submit(_ds);
        })
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "submit", function (option) {
            var _this = this;
            //            var _PlugDataSet = _this.$JObj.find(".PAGE-CONTROL.ACT_POST").CreateLegalDataSet(_this.setPostControl(), _this.setLegalControl());
            //            //验证不通过
            //            if (_PlugDataSet == 0) {
            //                return false;
            //            }
            //            var _ds = $.extend({}, _PlugDataSet);
            var _ds = $.toJSON(option);
            //模拟数据提交
            $.AKjs.getJSON("/module/ModuleMerge", { xml: _this.RegName, ds: _ds, callback: Math.random() }, function (data) {
                if (data > 0) {
                    location.href = location.href;
                    //                    Ataw.msgbox.show("操作成功！", 4, 2000);
                } else {
                    Ataw.msgbox.show("操作失败,请核实！", 5, 2000);
                }
            });
        });
    }
})(jQuery);
