(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};

    $.AKjs.AtawBaseMulti = function (options) {
        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawBaseMultiControl());
    }

    function AtawBaseMultiControl() {
        this.ItemList = null;
        this.RegNameItemList = null;
        this.ControlType = null;
        this.$JObjMultiControl = null;
        this.HasInput = true;
        this.ItemText = null;
      
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "init", function () {
            this.AtawBaseControl_init();
            this.ItemList = this.Options.ItemList;
            if (!$.AKjs.IsEmpty(this.Options.DataValue)) {
                this.RegNameItemList = this.Options.DataValue.Ds;
            }

            this.$JObj.append(this.$JObjMultiControl);
            if (!$.AKjs.IsEmpty(this.ItemList)) {
                var _l = this.ItemList.length;
                for (var i = 0; i < _l; i++) {
                    var _item = this.createItem();
                    if (this.ItemList[i].Select || this.ItemList[i].select) {
                        _item.attr("selected", "selected");
                        _item.attr("checked", true);
                    }
                    _item.val(this.ItemList[i].value);

                    this.$JObjMultiControl.append(_item);

                    this.setItemText(_item, this.ItemList[i].text);
                }
            }
            else if (!$.AKjs.IsEmpty(this.RegNameItemList)) {
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
                if (itemList != null) {
                    for (var i = 0; i < itemList.length; i++) {
                        var _item = this.createItem();
                       // if()
                        if (selectIndex != null) {
                            for (var j = 0; j < selectIndex.length; j++) {
                                if (itemList[i].CODE_INDEX == selectIndex[j]) {
                                    _item.attr("selected", "selected");
                                    _item.attr("checked", true);
                                    //this.ItemText = text;
                                    this.ItemText = this.ItemText ? this.ItemText : "" + itemList[i].CODE_TEXT;
                                    break;
                                }
                            }
                        }
                        else {
                            var _val = this.Options.DataValue.getValue();
                            if (_val) {
                                _val = _val.split(",");
                                for (var j = 0; j < _val.length; j++) {
                                    if (itemList[i].CODE_VALUE == _val[j]) {
                                        _item.attr("selected", "selected");
                                        _item.attr("checked", true);
                                        //this.ItemText = text;
                                        this.ItemText = this.ItemText ? this.ItemText : "" + itemList[i].CODE_TEXT;
                                        break;
                                    }
                                }
                            }
                        }

                        this.initItem(_item, itemList[i].CODE_VALUE);
//                        _item.val(itemList[i].CODE_VALUE);
//                        var _$li = $("<li/>");
//                        this.$JObjMultiControl.append(_$li);
//                        _$li.append(_item);

                        this.setItemText(_item, itemList[i].CODE_TEXT);
                    }
                }
            }
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initItem", function (_item, val) {
            _item.val(val);
            var _$li = $("<li class='checkbox'><label></label></li>");
            this.$JObjMultiControl.append(_$li);
            _$li.find("label").append(_item);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createItem", function () {
            var _item = $("<input   type='" + this.getTypeName() + "' />");
            var _this = this;
            _item.change(function () {
                _this.DataValue.setValue($(this).val());
                _this.triggerChangeEvent();
            });
            return _item;
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setItemText", function (dv, text) {
            //  alert(text.AgetTextByHtml());
            dv.after(text);

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getReadOnlyText", function () {
            return this.ItemText;
        });
    }


})(jQuery);