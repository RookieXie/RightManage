(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};

    $.fn.AtawCheckBox = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawCheckBox", options);
    }

    $.AKjs.AtawCheckBox = function (options) {
        // var _options = $.AKjs.Options();
        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawCheckBoxControl()).sysCreator();
    };

    function AtawCheckBoxControl() {
        this.$JObjMultiControl = $("<ul class='nav nav-pills nav-stacked form-tag'/>");
        this.ItemList = [];
        this.RegNameItemList = null;


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.setProByOptName("ItemList", "ItemList");
            if (!$.AKjs.IsEmpty(this.Options.DataValue)) {
                this.RegNameItemList = this.Options.DataValue.Ds;
            }
            if (this.ItemList.length == 0) {
                var selectIndex = null;
                var itemList = null;
                for (var item in this.RegNameItemList) {
                    if (item == this.Options.DataValue.TableName) {
                        var _dvI = this.RegNameItemList[item][this.Options.DataValue.Index];
                        if (_dvI)
                            selectIndex = _dvI[this.Options.DataValue.ColumnName + "_CODEINDEX"];
                    }
                    if (item == this.Options.RegName) {
                        itemList = this.RegNameItemList[item];
                    }
                }
                if (itemList) {
                    for (var _i = 0; _i < itemList.length; _i++) {
                        //if(selectIndex.c)
                        var _isSelect = false;
                        if ($.isArray(selectIndex)) {
                            _isSelect = selectIndex.indexOf(_i) >= 0;
                        }
                        else {
                            _isSelect = _i == selectIndex;
                        }
                        this.ItemList.add({
                            value: itemList[_i].CODE_VALUE,
                            text: itemList[_i].CODE_TEXT,
                            select: _isSelect
                        });
                    }
                }
            }
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "init", function () {
            this.$JObj.append(this.$JObjMultiControl);
            var _il = this.ItemList.length;
            for (var _i = 0; _i < _il; _i++) {
                var _item = this.ItemList[_i];
                this.createItem(_item);
            }
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "createItem", function (_item) {
            var _$li = $("<li><label><a class='ACT-CK'></a></label></li>");
            this.$JObjMultiControl.append(_$li);
            var _$a = _$li.find(".ACT-CK");
             //   var _$a = _$li.find("label");
            //alert();
            var _this = this;
            _$a.AtawCheckBoxDom({
                IsSelect: _item.select || _item.Select,
                Value: _item.value,
                ChangeEventFun: function (a) {
                    _this.triggerChangeEvent();
                }
            });
            _$li.find("label").append(_item.text);

        });




        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Get", function () {
            var _res = [];
            this.$JObjMultiControl.find(".ACT-CK").each(
            function () {
                var _$this = $(this);
                // alert(_$this.prop("checked"));
                var _obj = _$this.AtawControl();
                if (_obj) {
                    if (_obj.dataValue()) {
                        var _val = _obj.Value;
                        _res.push("\"" + _val + "\"");
                    }
                }


            }
            );
            return _res.join(",");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Set", function (opt_str) {
            var _itemValue = opt_str.split(",");
            this.$JObjMultiControl.find(".ACT-CK").each(
            function () {
                var _$this = $(this);
                var _obj = _$this.AtawControl();

                var _val = _obj.Value;
                for (var _i = 0; _i < _itemValue.length; _i++) {
                    var _v = _itemValue[_i].replace(/\"/, "");
                    _v = _v.replace(/\"/, "");
                    //alert(_v);
                    if (_val == _v) {
                        // _$this.attr("ichecked", true);
                        _obj.dataValue(true);
                        return;
                    }

                }
                _obj.dataValue(false);
            }
            );
        });
    }

})(jQuery);