(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};
    /**********************AtawCheckBoxNavi和AtawRadioNavi基类*************************/
    $.AKjs.AtawBaseSeletorNavi = function (options) {
        return $.extend({}, $.AKjs.AtawBaseNavi(options), new AtawBaseSeletorNaviControl());
    }

    function AtawBaseSeletorNaviControl() {
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createContent", function () {
            if (this.NaviFrom) {
                var regName = this.NaviFrom.Options.RegName
                if (regName) {
                    var itemList = this.Data[regName];
                    if (itemList) {
                        var _div;
                        if (itemList.length > 10) {
                            this.$Content.addClass("h315");
                        }
                        for (var i = 0; i < itemList.length; i++) {
                            _div = $("<li />");
                            var _item = $("<i  ichecked='false'  class='icon-check-empty fa fa-square-o ask-icon'/>");
                            _item.val(itemList[i].CODE_VALUE);
                            _div.append(_item);
                            this.$Content.find("ul").append(_div);
                            this.setItemText(_item, itemList[i].CODE_TEXT);
                            for (var j = 0; j < this.CurrentSelectedID.length; j++) {
                                if (this.CurrentSelectedID[j] == itemList[i].CODE_VALUE) {
                                    _item.attr("checked", true);
                                }
                            }
                            this.createItem(_item);
                        }
                    }
                }
            }
        })
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createItem", function (_item) {
            var _this = this;
            if (_item) {
                _item.parent().click(function () {
                    if (_item.attr("ichecked") == "true") {
                        _item.removeClass("icon-check fa fa-check-square-o ").addClass("icon-check-empty fa fa-square-o");
                        _item.attr("ichecked", false);
                        _item.css("color", "");
                    } else {
                        _item.removeClass("icon-check-empty fa fa-square-o").addClass("icon-check fa fa-check-square-o");
                        _item.attr("ichecked", true);
                        _item.css("color", "#000");

                    }
                    var _currentSelected = _this.getCurrentSelectedItem();
                    _this.CurrentSelectedID = _currentSelected.split(',');
                    var anchorParam = {};
                    anchorParam[_this.NaviFrom.Name] = _currentSelected;
                    if (_this.Callback) {
                        _this.Callback(anchorParam);
                    }

                });
            }
            //            return _item;
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setItemText", function (dv, text) {
            dv.after(text);

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getCurrentSelectedItem", function () {
        });
    }
})(jQuery);