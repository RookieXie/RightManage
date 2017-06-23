(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.fn.AtawButtonList = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawButtonList", options);
    }

    $.AKjs.AtawButtonList = function (options) {
        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawButtonListControl()).sysCreator();
    }

    function AtawButtonListControl() {

        this.RowDom = null;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.RowDom = this.Options.RowDom;
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            var pageObj = this.RowDom.ParentFormObj.ParentPageObj;
            var dataButtons = pageObj.DataButtons;
            var BUTTON_RIGHTS = null;
            if (this.RowDom.DataRow && this.RowDom.DataRow.BUTTON_RIGHT) {
                BUTTON_RIGHTS = this.RowDom.DataRow.BUTTON_RIGHT.split('|');
            }
            if (BUTTON_RIGHTS && !$.AKjs.IsEmpty(dataButtons) && !pageObj.IsViewPage) {
                var buttoncount = 0;
                this.RowDom.ButtonList = BUTTON_RIGHTS;
                var $buttonUl = $('<ul class="dropdown-menu"></ul>');
                var $dv = $('<div style="float: left;"></div>')
                for (dataButton in dataButtons) {
                    if (!dataButtons[dataButton].Unbatchable) {
                        this.RowDom.BatchableButtonList.push(dataButtons[dataButton].Name);
                    }
                    for (var j = 0; j < BUTTON_RIGHTS.length; j++) {
                        if (dataButton === BUTTON_RIGHTS[j]) {
//                            $li = $('<i></i>');
                            $li = $('<i></i>');
                            if (buttoncount >= 3) {
                                $buttonUl.append($li);
                                buttoncount++;
                            } else {
                                $dv.append($li);
                                buttoncount++;
                            }
                            var $a = this.createOperateButton(dataButtons[dataButton]);
                            $li.append($a);
                            $a.addClass("btn");
                            break;
                        }
                    }
                }
                this.$JObj.append($dv);
                if (buttoncount > 3) {
                    var $a = $('<a class="btn btn-mini chk-btn-drop dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></a>');
                    var $otherbutton = $('<div style="float: left;  position: relative;""><div>')
                    $otherbutton.append($a).append($buttonUl);
                    this.$JObj.append($otherbutton);
                }
            }
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createOperateButton", function (buttonObj) {
            var _this = this.Options.RowDom;
            var pageObj = _this.ParentFormObj.ParentPageObj;
            var formObj = _this.ParentFormObj;
            var $a = $('<a  class="btn btn-default btn-sm" href="javascript:void(0)">' + buttonObj.Text + '</a> ')
            var aFun = null;
            var _cusBtName = null;
            if (buttonObj.Client && buttonObj.Client.Function) {
                _cusBtName = buttonObj.Client.Function;
                if (_cusBtName == "Update" || _cusBtName == "Delete" || _cusBtName == "Detail") {
                    _cusBtName = null;
                }
            }
            if (_cusBtName) {
                var _fun = $.AKjs[_cusBtName];
                if (_fun) { aFun = function () { _fun(pageObj); } }
                else {
                    aFun = function () {
                        Ataw.msgbox.show("按钮操作方法 $.AKjs." + _cusBtName + "未定义！", 4, 2000);
                    }
                }
            }
            else {
                if (buttonObj.Name == "Update" || buttonObj.Name == "Delete" || buttonObj.Name == "Detail") {
                    aFun = function () { pageObj.operateButtonWithFormName(buttonObj.Name, null, formObj.TableName); }
                }
                else {
                    aFun = function () {
                        Ataw.msgbox.show("按钮操作方法 $.AKjs." + _cusBtName + "未定义！", 4, 2000);
                    }
                }
            }
            $a.click(function () {
                pageObj.KeyValues = [];
                pageObj.$PanelBody.find(".ACT-CHECK-SINGLE").prop("checked", false);
                pageObj.KeyValues.push(_this.DataRow[_this.PrimaryKey]);
                _this.$JObj.find(".ACT-CHECK-SINGLE").prop("checked", true);
                aFun();
            })
            return $a;
        });

    }
})(jQuery);