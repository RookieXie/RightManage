(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    //继承基类
    $.AKjs.AtawTplRowDom = function (options) {
        return $.extend({}, $.AKjs.AtawBaseRowDom(options), new AtawTplRowDom()).sysCreator();
    }

    function AtawTplRowDom() {


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.AtawBaseRowDom_creator();
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initRow", function () {
            this.initOperateButton();



        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createColumn", function (options) {
            return $.AKjs.AtawTplColumnDom(options);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initOperateButton", function () {
            var $footer = this.$JObj.find('.APCKBOX');
            var key = "";
            if (this.DataRow && this.PrimaryKey && this.DataRow[this.PrimaryKey]) {
                key = this.DataRow[this.PrimaryKey];
            }
            if ($footer.length > 0) {
                $footer.append($('<span class="btn  btn-default btn-xs  btn-block"><i icheck ="false" class="ACT-CHECK-SINGLE DT_ckb_input icon-check-empty fa fa-square-o"></span>'));
                $footer.find(".ACT-CHECK-SINGLE").data("AK-ROW", this);
                $footer.find(".ACT-CHECK-SINGLE").attr("key", key);
//                var pageObj = this.ParentFormObj.ParentPageObj;
//                var dataButtons = pageObj.DataButtons;
//                if (pageObj.IsViewPage) return;
//                var BUTTON_RIGHTS;
//                if (this.DataRow && this.DataRow.BUTTON_RIGHT) {
//                    BUTTON_RIGHTS = this.DataRow.BUTTON_RIGHT.split('|');
//                }
//                if (BUTTON_RIGHTS && !pageObj.IsViewPage) {
//                    this.ButtonList = BUTTON_RIGHTS;
//                    for (dataButton in dataButtons) {
//                        if (!dataButtons[dataButton].Unbatchable) {
//                            this.BatchableButtonList.push(dataButtons[dataButton].Name);
//                        }
//                        for (var j = 0; j < BUTTON_RIGHTS.length; j++) {
//                            if (dataButton === "Detail" && pageObj.PageStyle === "Detail") continue;
//                            if (dataButton === "Update" && pageObj.PageStyle === "Update") continue;
//                            if (dataButton === BUTTON_RIGHTS[j]) {
//                                var $a = this.createOperateButton(dataButtons[dataButton]);
//                                $a.addClass("btn btn-xs btn-block");
//                                this.additionButtonStyle($a, dataButtons[dataButton]);
//                                $footer.append($a);
//                            }
//                        }
//                    }
//                }
            }
        });
    }
})(jQuery);