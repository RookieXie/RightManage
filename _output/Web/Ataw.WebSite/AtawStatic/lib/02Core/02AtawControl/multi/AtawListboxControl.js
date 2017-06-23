(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};

    $.fn.AtawListBox = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawListBox", options);
    }


    $.AKjs.AtawListBox = function (options) {
        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawListBoxControl()).sysCreator();
    }

    function AtawListBoxControl() {
        this.ItemList = [];
        this.RegNameItemList = null;
        this.selectIndex = null;

        this.$Body = $('<div class="row acs-listBoxControl-wrap">' +
	                     '<div class="col-md-left col-md-5">' +
                           '<select  class="ACT-LEFT"  style="width:100%; padding: 5px 0 0 5px;" multiple="multiple"> ' +
                           '</select> ' +
                        '</div> ' +
                       '<div class="col-md-midd col-md-1">' +
                           '<a id="toright" class="btn btn-default ACT-ADD btn-xs" title="添加">>></a> ' +
                           '<a id="toleft" title="移除"  class="btn btn-danger ACT-REMOVE btn-xs"><<</a> ' +
                       '</div> ' +
                       '<div class="col-md-right col-md-5"> ' +
                           '<select class="ACT-RIGHT"  style="width:100%;padding: 5px 0 0 5px;"  multiple="multiple"> ' +
                            '</select> ' +
                       '</div> ' +
                     '</div>');
        this.$Left = null;
        this.$Right = null;
        this.$Add = null;
        this.$Remove = null;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.setProByOptName("ItemList", "ItemList");
            // this.ItemList = [];
            //alert($.toJSON(this.Options));
            if (!$.AKjs.IsEmpty(this.Options.DataValue)) {
                this.RegNameItemList = this.Options.DataValue.Ds;
            }
            if (this.ItemList.length == 0) {
                var selectIndex = null;
                //                var itemList = null;
                for (var item in this.RegNameItemList) {
                    if (item == this.Options.DataValue.TableName) {
                        var _dvI = this.RegNameItemList[item][this.Options.DataValue.Index];
                        if (_dvI)
                            this.selectIndex = _dvI[this.Options.DataValue.ColumnName];
                    }
                    if (item == this.Options.RegName) {
                        itemList = this.RegNameItemList[item];
                    }
                }
                if (itemList) {
                    for (var _i = 0; _i < itemList.length; _i++) {
                        this.ItemList.add({
                            value: itemList[_i].CODE_VALUE,
                            text: itemList[_i].CODE_TEXT,
                            select: false
                        });
                    }
                }
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "init", function () {
            this.$JObj.append(this.$Body);
            this.$Left = this.$Body.find(".ACT-LEFT");
            this.$Right = this.$Body.find(".ACT-RIGHT");
            this.$Add = this.$Body.find(".ACT-ADD");
            this.$Remove = this.$Body.find(".ACT-REMOVE");

            //绑定数据.....
            var _il = this.ItemList.length;
            for (var _i = 0; _i < _il; _i++) {
                var _item = this.ItemList[_i];
                //                if (_item.select || _item.Select) {
                //                    this.bindItem(this.$Right, _item);
                //                }
                //                else {
                //                    this.bindItem(this.$Left, _item);
                //                }
                this.bindItem(this.$Left, _item);
            }
            if (this.selectIndex != null) {
                this.dataValue_Set(this.selectIndex);
            }

            //绑定事件
            var _this = this;
            this.$Add.off("click").on("click", function () {
                _this.$Left.find("option:selected").each(function () {
                    $(this).remove().appendTo(_this.$Right);
                    _this.triggerChangeEvent();
                });
            });
            this.$Remove.off("click").on("click", function () {
                _this.$Right.find("option:selected").each(function () {
                    $(this).remove().appendTo(_this.$Left);
                    _this.triggerChangeEvent();
                });
            });
            _this.$Left.off("dblclick").on("dblclick", function () {
                $(this).find("option:selected").each(function () {
                    $(this).remove().appendTo(_this.$Right);
                    _this.triggerChangeEvent();
                });
            });
            _this.$Right.off("dblclick").on("dblclick", function () {
                $(this).find("option:selected").each(function () {
                    $(this).remove().appendTo(_this.$Left);
                    _this.triggerChangeEvent();
                });
            });

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "bindItem", function ($select, item) {
            var _$item = $('<option value="' + item.value + '">' + item.text + '</option>');
            $select.append(_$item);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Get", function () {
            var selVals = [];
            this.$Right.find("option").each(function () {
                selVals.push(this.value);
            });
            return selVals.join(",");

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Set", function (val) {
            var _itemValue = val.split(",");
            var _this = this;
            this.$Right.find("option").each(function () {
                $(this).remove().appendTo(_this.$Left);
            });

            for (var _i = 0; _i < _itemValue.length; _i++) {
                var _item = _itemValue[_i];
                this.$Left.find("option").each(
            function () {
                var _$this = $(this);
                var _val = _$this.val();
                if (_val == _item) {
                    _$this.remove().appendTo(_this.$Right);
                }
            }
            );
            }




        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getReadOnlyText", function () {
            var selVals = [];
            this.$Right.find("option").each(function () {
                selVals.push(this.text + "&nbsp;");
            });
            return selVals.join(",");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dispose", function () {
            this.$Add.off("click");
            this.AtawBaseDom_dispose();
        });



    }


})(jQuery);