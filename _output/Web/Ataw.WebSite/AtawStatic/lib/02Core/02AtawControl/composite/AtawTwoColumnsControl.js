(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.fn.AtawTwoColumns = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawTwoColumns", options);
    }

    //类的构造函数
    $.AKjs.AtawTwoColumns = function (options) {

        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawTwoColumnsControl()).sysCreator();
    }

    function AtawTwoColumnsControl() {

        this.$Content = $("<div id='table'><ul class='clear ACT-ROW'><li class='b check-bg acs-b' id='ACT-HEAD-FIRST'></li>" +
             "<li class='b check-bg acs-b' id='ACT-HEAD-SECOND'></li><li class='b r w4 check-bg'></li>" +
             "<li class='b ACT-ROW-FIRST'><input type='text'/>" +
             "</li><li class='b ACT-ROW-SECOND'><input type='text'/></li><li class='b r ACT-BTN'>" +
            "<a name='addticket' class='btn-numt ACT-NEW-ROW'>添加票号</a></li></ul></div>");

        this.$TotalAmount = $("<div class='count'><span>金额:</span><span class='ACT-AMOUNT'>0万元</span></div>");

        this.FirstColName = "DraftNumber";
        this.FirstColDisplayName = "票号";
        this.SecondColName = "Amount";
        this.SecondColDisplayName = "金额(万元)";

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {

            this.$Content.find("#ACT-HEAD-FIRST").text(this.FirstColDisplayName);
            this.$Content.find("#ACT-HEAD-SECOND").text(this.SecondColDisplayName);

            var _this = this;
            var _val = this.DataValue.getValue();
            if (_val) {
                this.initTable(_val);
            }
            this.$Content.find(".ACT-NEW-ROW").off("click").on("click", function () {
                var _$preRow = _this.$Content.find(".ACT-ROW:last");
               // if (_this.LegalObj.LegalResult) {
                    var _$newRow = _this.addNewRow();
                    _this.afterNewRowFun(_$preRow, _$newRow);
                // }
                    _this.triggerChangeEvent();
            });

            this.$Content.find("input").bind("change blur", function () {
                _this.triggerChangeEvent();
                if ($(this).parent().hasClass("ACT-ROW-SECOND")) {
                    _this.setTotalAmount();
                }
            });
            this.$JObj.append(this.$Content);
            this.$JObj.append(this.$TotalAmount);
            this.setTotalAmount();

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "addNewRow", function () {
            var _$row = $("<ul class='clear ACT-ROW'>"+
            "<li class='b ACT-ROW-FIRST'><input type='text'/>" +
            "</li><li class='b ACT-ROW-SECOND'><input type='text'/></li><li class='b r ACT-BTN'>" +
            "<a name='addticket' class='btn-numt btn-numt-del ACT-DEL-ROW'>删除票号</a></li></ul>")

            var _this = this;
            _$row.find(".ACT-DEL-ROW").off("click").on("click", function () {
                $(this).parents(".ACT-ROW").remove();
                _this.triggerChangeEvent();
                _this.setTotalAmount();
            });
            _$row.find("input").bind("change blur", function () {
                _this.triggerChangeEvent();
                if ($(this).parent().hasClass("ACT-ROW-SECOND")) {
                    _this.setTotalAmount();
                }
            });

            this.$Content.append(_$row);
            return _$row;
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "afterNewRowFun", function ($previousRow, $newRow) {
            var _$firInput = $previousRow.find("input").eq(0);
            var _$secInput = $previousRow.find("input").eq(1);
            if (_$firInput.val() != "" && _$secInput.val() != "") {
                $newRow.find("input").eq(1).val(_$secInput.val());
                //var _valArr = _$firInput.val().split(' ');
                //if (_valArr.length > 1) {
                //    var _newVal = parseInt(_valArr[1]) + 1;
                //    var n = _valArr[0].length;
                //    var _newStr = (Array(n).join(0) + _newVal).slice(-n);
                //    $newRow.find("input").eq(0).val(_valArr[0] + " " + _newStr);
                //}
                //else {
                //    $newRow.find("input").eq(0).val(_$firInput.val());
                //}
                var draftNumberVal = _$firInput.val().replace(" ", "");
                if (draftNumberVal == "9999999999999999") {
                    $newRow.remove();
                    alert("无法再新增票号了");
                    return;
                }
                else {
                    var newVal = (parseInt(draftNumberVal) + 1).toString();
                    newVal = (Array(17 - newVal.length).join(0) + newVal);

                    $newRow.find("input").eq(0).val(newVal.substring(0, 8) + " " + newVal.substring(8, 16));
                }
                this.setTotalAmount();
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setTotalAmount", function () {
           // if (this.LegalObj.LegalResult) {
                var totalAmount = 0.0;
                this.$Content.find(".ACT-ROW-SECOND input").each(function (i, n) {
                    var _val = parseFloat($(n).val());
                    if (!isNaN(_val))
                        totalAmount = totalAmount + _val;
                    else
                        totalAmount = 0;
                });
                //金额四舍五入，保留6位小数
                this.$TotalAmount.find(".ACT-AMOUNT").text(getAmountVal(totalAmount,6));
          //  }
            //else {
            //    this.$JObj.find("#ACT-AMOUNT").text(0);
            //}
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Get", function () {
            var data = [];
            var $rowList = this.$Content.find(".ACT-ROW");
            var _this = this;
            var _res = null;
            var _len = $rowList.length;
            for (var i = 0 ; i < _len ; i++) {
               // var n = 
                var n = $rowList.eq(i);
                var _row = {};
                var _firstVal = $(n).find(".ACT-ROW-FIRST input").val();
                var _secondVal = $(n).find(".ACT-ROW-SECOND input").val();
                if (_firstVal != "" && _secondVal != "") {
                    _row[_this.FirstColName] = _firstVal;
                    //金额四舍五入，保留2位小数
                    _row[_this.SecondColName] = getAmountVal(_secondVal * 10000, 2) + "";
                    data.push(_row);
                }
                else {
                    _res = "";
                    break;
                }
            }

            if (_res == null) {
                if (data.length > 0)
                    return $.toJSON(data);
            }
            return "";
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initTable", function (opt_str) {
            var _firColName = this.FirstColName;
            var _secColName = this.SecondColName;
            var _dataObj = $.parseJSON(opt_str);
            var _this = this;
            $.each(_dataObj, function (i, n) {
                var _$row = null;
                if (i == 0) {
                    _$row = _this.$Content
                }
                else {
                    _$row = _this.addNewRow();
                }
                // else {
                //  _$row = _this.addNewRow();
                var _$firstInput = _$row.find(".ACT-ROW-FIRST input");
                var _$secondInput = _$row.find(".ACT-ROW-SECOND input");
                var _firstVal = n[_firColName];
                var _secondVal = n[_secColName];
                _$firstInput.val(_firstVal);
                _$secondInput.val(getAmountVal(_secondVal/10000,6));
                //  }
            });
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Set", function (opt_str) {
            this.initTable();
            this.setTotalAmount();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "valueFormat", function (val) {
            //  return val;
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "toReadStatus", function (isReadOnly) {
            this.IsReadOnly = isReadOnly;
            var $btn = this.$Content.find(".ACT-BTN");
            var $input = this.$Content.find("input");
            if (isReadOnly) {
                $btn.hide();
                $input.attr("readonly", "readonly");
            }
            else {
                $btn.show();
                $input.removeattr("readonly");
            }

        });

        //金额四舍五入，保留N位小数
        function getAmountVal(val,n) {
            var vv = Math.pow(10, n);
            return Math.round(val * vv) / vv;
        }

    }
})(jQuery);