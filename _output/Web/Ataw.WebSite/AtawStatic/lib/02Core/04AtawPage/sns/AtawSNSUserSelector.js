(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.fn.AtawSNSUserSelector = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawSNSUserSelector", options);
    }

    $.AKjs.AtawSNSUserSelector = function (options) {
        return $.extend({}, $.AKjs.AtawFormMultiSelector(options), new AtawSNSUserSelector());
    }

    function AtawSNSUserSelector() {
        this.SelectedItems = [];
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "beforeOpen", function () {
            this.$ButtonBar.hide();
            this.$NewFormContent.find("tr.ACT-HEADER").hide();
            this.$Form.AtawControl().AfterSearchCustomFun = _fun;
            var _this = this;
            function _fun() {
                var _chkList = _this.$Form.find(".ACT-CHECK-SINGLE");
                _chkList.each(function (i) {
                    $(this).removeAttr("buttons");
                    var codeValue = _this.$Form.AtawControl().Data[_this.Form.TableName][i][_this.Form.CodeValueFieldName];
                    var codeText = _this.$Form.AtawControl().Data[_this.Form.TableName][i][_this.Form.CodeTextFieldName];
                    if (codeValue) {
                        $(this).attr("codeValue", codeValue).attr("codeText", codeText);
                    }
                });
                // _this.$Form.find(".panel-body tr.ACT-HEADER").hide();
                //_this.$Form.find(".panel-body td.cbk_panel").hide();
                _this.bindEvent();
            }
            _this.bindEvent();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createSelectedItems", function (span, codeItem) {
            var _this = this;
            var _seletedItem = $("<tr class='data_row'codevalue='" + codeItem.codeValue + "'><td></td></tr>");
            _seletedItem.find("td").append(span);
            var del = $('<img src=\"/Ico/cross.png\" alt=\"删除\" height=\"16\" width=\"16\" />');
            del.click(function () {
                var _deltr = $(this).parent().parent();
                var _delCodeValue = _deltr.attr("codevalue");
                var _exist = _this.codeValueExists(_delCodeValue);
                if (_exist) {
                    _this.$Form.find("td:visible").each(function () {
                        if ($(this).parent().find(".ACT-CHECK-SINGLE").attr("codevalue") == _delCodeValue) {
                            $(this).css("background", "");
                            $(this).find(".selItme").remove();
                        }
                    });
                    _this.removeCodeItem(_delCodeValue);
                    _deltr.remove();
                }
            });
            _seletedItem.find("td").append(del);
            return _seletedItem;
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

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "bindEvent", function () {
            var _this = this;
            var sleImg = "<img src=\"/Ico/accept.png\" alt=\"已选\" height=\"16\" width=\"16\" class=\"selItme\" />";
            this.$Form.find("td").unbind("click").bind("click", function () {
                var _$tr = $(this).parent();
                var _codeValue = _$tr.find(".ACT-CHECK-SINGLE").attr("codevalue");
                var _codeText = _$tr.find(".ACT-CHECK-SINGLE").attr("codetext");
                if (_this.codeValueExists(_codeValue)) {
                    return;
                }
                $(this).css("background", "#DCEFFE");
                $(this).append(sleImg);
                var codeItem = { codeValue: _codeValue, codeText: _codeText };
                _this.SelectedItems.push(codeItem);
                var _seletedItem = _this.createSelectedItems($(this).find("span.ACT_CONTROL").html(), codeItem);
                _this.$NewFormContent.find("#grid_tables").append(_seletedItem);

            });
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "winOpen", function () {
            var _this = this;
            var myTitle = "人员选择";
            if (this.$Win == null) {
                this.$FormContent.AtawWindow({
                    Title: myTitle,
                    Width: "60%",
                    Fixed: false,
                    Button: [
                        {
                            name: '确定',
                            callback: function () {
                                var codeTexts = [];
                                var codeValues = [];
                                $.each(_this.SelectedItems, function (i, n) {
                                    codeTexts.push(n.codeText);
                                    codeValues.push(n.codeValue);
                                });
                                _this.$JObjText.val(codeTexts.toString());
                                _this.setDataText(codeTexts.toString());
                                _this.dataValue(codeValues.toString());
                                if (_this.ChangeEventFun) {
                                    _this.ChangeEventFun(_this);
                                }
                                this.hide();
                                return false;
                            },
                            focus: true
                        }]
                });
            }
            this.$FormContent.css({ "height": "300px", "overflow": "auto" });
            this.$Win = this.$FormContent.AtawControl();
            this.$Win.open();

        });

    }
})(jQuery);
