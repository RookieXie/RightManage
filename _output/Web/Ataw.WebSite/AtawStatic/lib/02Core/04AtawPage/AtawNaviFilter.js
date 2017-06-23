(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};

    $.fn.AtawNaviFilter = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawNaviFilter", options);
    };

    $.AKjs.AtawNaviFilter = function (options) {
        return $.extend({}, $.AKjs.AtawBaseNavi(options), new AtawNaviFilterControl());
    }

    function AtawNaviFilterControl() {
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createContent", function () {
            var regName = this.NaviFrom.Options.RegName
            if (regName) {
                var itemList = this.Data[regName];
                if (itemList) {
                    var _div;
                    for (var i = 0; i < itemList.length; i++) {
                        _div = $("<div class='checkbox col-md-offset-1' />");
                        var _item = $("<a  ichecked='false'  class='label label-success ACT-SELECT-VALUE' value = />");
                        _item.attr("value", itemList[i].CODE_VALUE);
                        _item.html(itemList[i].CODE_TEXT);
                        _item.find(".aks-enum-codetable").removeClass();
                        _div.append(_item);
                        this.$Content.append(_div);
                        for (var j = 0; j < this.CurrentSelectedID.length; j++) {
                            if (this.CurrentSelectedID[j] == itemList[i].CODE_VALUE) {
                                _item.attr("ichecked", true);
                                _item.addClass("label-danger");
                            }
                        }
                        this.createItem(_item);
                    }
                }
            }
        })
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createItem", function (_item) {
            var _this = this;
            if (_item) {
                _item.click(function () {
                    if (_item.attr("ichecked") == "true") {
                        _item.removeClass("label-danger").addClass("label-success");
                        _item.attr("ichecked", false);

                    } else {
                        _item.removeClass("label-success").addClass("label-danger");
                        _item.attr("ichecked", true);
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
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getCurrentSelectedItem", function () {
            var currentChecked = [];
            this.$Content.find("a,.ACT-SELECT-VALUE").each(function () {
                if ($(this).attr("ichecked") == "true") {
                    currentChecked.push($(this).val());
                }
            });
            return currentChecked.toString();
        });
    }
})(jQuery);