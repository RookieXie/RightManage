(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};

    $.fn.AtawRadio = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawRadio", options);
    }

    $.AKjs.AtawRadio = function (options) {
        //var _options = $.AKjs.Options();
        return $.extend({}, $.AKjs.AtawBaseMulti(options), new AtawRadioControl()).sysCreator();
    };

    function AtawRadioControl() {
        this.$JObjMultiControl = $("<ul class=' nav nav-pills nav-stacked form-tag'/>");
        //        this.GroupName = null;
        //        this.RadioObj = null;
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
            //            var _$li = $("<li><label><a class='ACT-CKK'></a></label></li>");
            //            this.$JObjMultiControl.append(_$li);
            //            this.$JObj.append(this.$JObjMultiControl);
            //            var $a = _$li.find(".ACT-CKK");
            //            //this.AtawBaseControl_init();
            //         
            //            var _this = this;
            //          $a.AtawRadioDom({
            //                IsSelect: this.IsCheck ? true : false,
            //                Value: "",
            //                ChangeEventFun: function (a) {
            //                    _this.triggerChangeEvent();
            //                    _this.IsCheck = a.dataValue();
            //                }
            //            });
            //            this.RadioObj = $a.AtawControl();
            //        });
            this.$JObj.append(this.$JObjMultiControl);
            var _il = this.ItemList.length;
            for (var _i = 0; _i < _il; _i++) {
                var _item = this.ItemList[_i];
                this.createItem(_item);
            }
        });

        //        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setItemText", function (dv, item) {
        //            this.AtawBaseMultiControl_setItemText(dv, item);
        //            dv.attr("name", this.GroupName);
        //        });
        //        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initItem", function (_item, val) {
        //            var _this = this;
        //            _item.val(val);
        //            var _$li = $("<li ><label></label></li>");
        //            this.$JObjMultiControl.append(_$li);
        //            _$li.find("label").append(_item);
        //            _$li.click(function () {
        //                if ($(_item).attr("ichecked") == "true") {//判断点击之前是否选中
        //                    $(_item).attr("ichecked", false); //直接改变自己状态
        //                    //改变之前已有状态
        //                    _$li.parent().find(".icon-circle[ichecked = 'true']").removeClass("icon-circle").addClass("icon-circle-blank").attr("ichecked", false);
        //                    //改变自己Class
        //                    _$li.find(".icon-circle-blank[ichecked = 'true']").removeClass("icon-circle-blank").addClass("icon-circle");
        //                    //当点击自己时候
        //                    _$li.find(".icon-circle[ichecked='false']").removeClass("icon-circle").addClass("icon-circle-blank");
        //                } else {
        //                    $(_item).attr("ichecked", true);
        //                    _$li.parent().find(".icon-circle[ichecked = 'true']").removeClass("icon-circle").addClass("icon-circle-blank").attr("ichecked", false);
        //                    _$li.find(".icon-circle-blank[ichecked = 'true']").removeClass("icon-circle-blank").addClass("icon-circle");
        //                }
        //                _this.triggerChangeEvent();
        //            })
        //        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "createItem", function (_item) {
            var _$li = $("<li><label><a class='ACT-CKK'></a></label></li>");
            this.$JObjMultiControl.append(_$li);
            var _$a = _$li.find(".ACT-CKK");
            //alert();
            var _this = this;
            _$a.AtawRadioDom({
                //IsSelect: _item.select || _item.Select,
                IsSelect: (typeof(_item.select)=="undefined")?false:_item.select,
                Value: _item.value,
                ChangeEventFun: function (a) {
                    _this.triggerChangeEvent();
                }
            });
            _$li.find("label").append(_item.text);

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Get", function () {
            //            return this.RadioObj.dataValue();
            //        });
            var _val3
            // var _res = [];
            this.$JObjMultiControl.find(".icon-circle").each(
            function () {
                var _$this = $(this);
                // alert(_$this.prop("checked"));
                var _obj = _$this.AtawControl();
                if (_obj) {
                    if (_obj.dataValue()) {
                        var _val = _obj.Value;
                        var _val2 = _val.toString();
                         _val3 = parseInt(_val2);
                       //  _res.push("\"" + _val3 + "\"");
                    }
                }


            }
            );
             //return _res.join(",");
            return _val3;
        });
        //------------
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Set", function (opt_str) {
            //            var _is = opt_str ? true : false;
            //            this.RadioObj.dataValue(_is);
            //            this.IsCheck = _is;
            //        });

            //    }
            var _itemValue = opt_str.split(",");
            this.$JObjMultiControl.find(".ACT-CKK").each(
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