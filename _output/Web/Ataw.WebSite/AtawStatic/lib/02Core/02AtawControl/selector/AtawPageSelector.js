(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};

    $.fn.AtawPageSelector = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawPageSelector", options);
    }

    $.AKjs.AtawPageSelector = function (options) {
        return $.extend({}, $.AKjs.AtawAutoCompleted(options), new AtawPageSelector()).sysCreator();
    }

    function AtawPageSelector() {
        this.$SelectButton = $("<a class='btn btn-primary btn-xs'><i class=\"  icon-external-link fa fa-external-link ACT-SELECT-ITEM    \"></i></a>");
        this.$DataTable = $("<div class='acs-selector'>" +
        "<div class='row'><div id='ACT-WINDOW-LEFT-NAVI' class='col-md-3 left acs-quickSelect'></div><div class='col-md-6 acs-unselect'><div class='ACT-CONTENT'></div></div><div class='col-md-3 ACT-SELECTOR acs-selected'></div>" +
        "</div>" +
        "<div class='row '><button type='button' class='btn btn-primary btn-lg btn-block ACT-SURE'>确定</button></div>" +
        "<div>");
        this.WinObj = null;
        this.RegName = null;
        this.IsMulti = false;
        this.SelectedItems = [];
        this.WinTitle = "页面选择器";
        ;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.setProByOptName("RegName", "RegName");
            this.setProByOptName("IsMulti", "IsMulti");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            var _this = this;
            this.AtawAutoCompletedControl_init();
            if (this.IsMulti) {
                this.$JObjText.attr("disabled", "disabled");

            }
            this.$Box.append("<span class='input-group-btn'/>");
            this.$Box.find(".input-group-btn").append(this.$SelectButton);

            //生成已选
            var codeConfigs = this.getCodeConfigs();
            for (var i = 0; i < codeConfigs.length; i++) {
                var _item = { codeValue: codeConfigs[i].CODE_VALUE, codeText: codeConfigs[i].CODE_TEXT };
                if (!this.codeValueExists(_item.codeValue))
                    this.SelectedItems.push(_item);
            }
            //this.initSelector();

            this.$SelectButton.off("click").on("click", function () {
                _this.initSelector();
                _this.$DataTable.AtawWindow({
                    Title: _this.WinTitle,
                    Width: "98%",
                    WindowCloseFun: _this.winCloseFun()
                });
                _this.initWinContent();
                _this.WinObj = _this.$DataTable.AtawControl();
                _this.WinObj.open();


            });

            this.$DataTable.find(".ACT-SURE").off("click").on("click", function () {

                _this.setSelectedItems();
                _this.setData();
                //                var codeTexts = [];
                //                var codeValues = [];
                //                $.each(_this.SelectedItems, function (i, n) {
                //                    codeTexts.push(n.codeText);
                //                    codeValues.push(("\"" + n.codeValue + "\""));
                //                });
                //                _this.$JObjText.val(codeTexts.toString());
                //                _this.setDataText(codeTexts.toString());
                //                _this.dataValue(codeValues.toString());
                _this.triggerChangeEvent();
                _this.clearWinPage();
                _this.WinObj.close();

            });
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setDefaultData", function (codeValue, codeText) {
            if (!this.codeValueExists(codeValue)) {
                this.SelectedItems.push({ codeValue: codeValue, codeText: codeText });
                this.setData();
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setData", function (codeValue, codeText) {

            var codeTexts = [];
            var codeValues = [];
            $.each(this.SelectedItems, function (i, n) {
                codeTexts.push(n.codeText);
                codeValues.push(("\"" + n.codeValue + "\""));
            });
            this.$JObjText.val(codeTexts.toString());
            this.setDataText(codeTexts.toString());
            this.dataValue(codeValues.toString());
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "winCloseFun", function () {
            var _this = this;
            return function () {
                _this.clearWinPage();
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "clearWinPage", function () {
            this.$DataTable.find("#ACT-WINDOW-LEFT-NAVI").clear();
            this.$DataTable.find(".ACT-CONTENT").clear();
            this.$DataTable.find(".ACT-SELECTOR").clear();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initWinContent", function () {
            var _this = this;
            $.AKjs.getJSON("/core/selector/LoadPage", { RegName: this.RegName, pageStyle: "List" }, function (res) {
                res.IsPart = true;
                res.IsInner = true;
                res.OnSingleCheckBoxFun = function (page, cb) {
                    var _$cb = $(cb);
                    var _isCheck = _$cb.attr("ichecked");
                    var _rowObj = _$cb.data("AK-ROW");
                    _this.selectorFormat(_rowObj, _isCheck, _$cb, res.PageSelector.ValueField, res.PageSelector.TextField);
                    return false;
                };
                res.NaviContentSelector = _this.$DataTable.find("#ACT-WINDOW-LEFT-UPLOAD");
                _this.$DataTable.find(".ACT-CONTENT").AtawListPage(res);
            });
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "selectorFormat", function (rowObj, isCheck, $cb, valueFied, textField) {
            var _key = rowObj.DataRow[rowObj.PrimaryKey];
            var _$doc = this.$DataTable.find(".ACT-SELECTOR");
            var _$sel = _$doc.find(".ACT-ITEM[key='" + _key + "']");
            if (isCheck == "true") {
                if (_$sel.length == 0) {
                    var _text = rowObj.DataRow[textField];
                    var _$dv = $("<div />");
                    _$doc.append(_$dv);

                    var _op = {
                        Key: _key,
                        Text: _text,
                        AfterDeleteFun: this.setItemUnCheck()
                    };
                    var _obj = $.AKjs.AtawSelectorItem(_op);
                    _obj.intoDom(_$dv);
                    if (!this.IsMulti) {
                        _$doc.html("");
                        this.$JObjText.val(_text);
                        this.dataValue(_key);
                        this.setDataText(_text)
                        this.triggerChangeEvent();
                        this.WinObj.close();
                    }
                }
            }
            else {
                _$sel.remove();
            }
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setItemUnCheck", function () {
            var _this = this;
            return function (obj) {
                var _$cb = _this.$DataTable.find(".ACT-CHECK-SINGLE[key='" + obj.Key + "']");
                _$cb.attr("ichecked", false);
                _$cb.removeClass("icon-check fa fa-check-square-o").addClass("icon-check-empty fa fa-square-o");
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initSelector", function () {
            var _$doc = this.$DataTable.find(".ACT-SELECTOR");
            for (var i = 0; i < this.SelectedItems.length; i++) {
                var _item = this.SelectedItems[i];
                var _$dv = $("<div />");
                _$doc.append(_$dv);
                var _op = {
                    Key: _item.codeValue,
                    Text: _item.codeText
                };
                var _obj = $.AKjs.AtawSelectorItem(_op);
                _obj.intoDom(_$dv);
            }
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "setSelectedItems", function () {
            this.SelectedItems = [];
            var _$con = this.$DataTable.find(".ACT-SELECTOR").find(".ACT-ITEM");
            for (var i = 0; i < _$con.length; i++) {
                var _key = _$con.eq(i).AtawControl().Key;
                var _text = _$con.eq(i).AtawControl().Text;
                this.SelectedItems.push({ codeValue: _key, codeText: _text });
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "codeValueExists", function (codeValue) {
            for (var i = 0; i < this.SelectedItems.length; i++) {
                if (this.SelectedItems[i].codeValue == codeValue)
                    return true;
            }
            return false;
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "removeCodeItem", function (codeValue) {
            var codeItem = null;
            for (var i = 0; i < this.SelectedItems.length; i++) {
                if (this.SelectedItems[i].codeValue == codeValue) {
                    codeItem = this.SelectedItems[i];
                    index = i;
                    break;
                }
            }
            if (codeItem)
                this.SelectedItems.remove(codeItem);
        });

        //        $(document).bind("click", function (e) {
        //            var target = $(e.target);
        //            if (target.closest(".ACT-AUTOCOMPLETE .autocomplete").length == 0) {
        //                $(".ACT-AUTOCOMPLETE").hide();
        //            }
        //        })

    }

})(jQuery);