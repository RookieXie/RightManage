(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    //继承基类
    $.AKjs.AtawAlbumRowDom = function (options) {
        return $.extend({}, $.AKjs.AtawBaseRowDom(options), new AtawAlbumRowDom()).sysCreator();
    }

    function AtawAlbumRowDom() {


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.AtawBaseRowDom_creator();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            var _$div;
            if (this.ColumnList.length > 5)
            {
                this.$JObj.find('.panel-body').addClass("acs-album-height");
            }
            for (var i = 0; i < this.ColumnList.length; i++) {
                var _column = this.ColumnList[i];
                _$div = $('<div  acol="' + _column.ColumnConfig.Name + '"   class="row"/>');
                if (_column.ColumnConfig.ControlType == "ImageDetail") {
                    this.$JObj.find('.panel-body').prepend(_$div);
                } else {
                    this.$JObj.find('.panel-body').append(_$div);
                }
                _column.intoDom(_$div);
            }
            var pageObj = this.ParentFormObj.ParentPageObj;

            this.initOperateButton();
            if (this.NoDelete && this.IsViewPage) {
                this.$JObj.parent().find(".ACT-CHECK-SINGLE").remove();
            }
            if (this.ParentFormObj && this.ParentFormObj.ParentPageObj) {
                _isDetailPage = this.ParentFormObj.ParentPageObj.PageStyle === "Detail";
            }

            if (_isDetailPage || (this.NoDelete && this.IsViewPage)) {
               this.$JObj.find(".ACT-CHECK-SINGLE").hide();
            }
        });

        //初始化行
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createColumn", function (options) {
            return $.AKjs.AtawAlbumColumnDom(options);
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initOperateButton", function () {
            var $footer = this.$JObj.find('.panel-footer');
            $footer.append($('<span class="btn  btn-default btn-xs pd0-left"><i ichecked="false" class="ACT-CHECK-SINGLE icon-check-empty fa fa-square-o"></span>'));
            $footer.find(".ACT-CHECK-SINGLE").data("AK-ROW", this);
            var pageObj = this.ParentFormObj.ParentPageObj;
            var dataButtons = pageObj.DataButtons;
            if (pageObj.IsViewPage) return;
            var BUTTON_RIGHTS;
            if (this.DataRow && this.DataRow.BUTTON_RIGHT) {
                BUTTON_RIGHTS = this.DataRow.BUTTON_RIGHT.split('|');
            }
            if (BUTTON_RIGHTS && !pageObj.IsViewPage) {
                this.ButtonList = BUTTON_RIGHTS;
                for (dataButton in dataButtons) {
                    if (!dataButtons[dataButton].Unbatchable) {
                        this.BatchableButtonList.push(dataButtons[dataButton].Name);
                    }
                    for (var j = 0; j < BUTTON_RIGHTS.length; j++) {
                        if (dataButton === "Detail" && pageObj.PageStyle === "Detail") continue;
                        if (dataButton === "Update" && pageObj.PageStyle === "Update") continue;
                        if (dataButton === BUTTON_RIGHTS[j]) {
                            var $a = this.createOperateButton(dataButtons[dataButton]);
                            $a.addClass("btn btn-xs pd0-left");
                            this.additionButtonStyle($a, dataButtons[dataButton]);
                            $footer.append($a);
                        }
                    }
                }
            }
        });
    }
})(jQuery);