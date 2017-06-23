(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};


    $.AKjs.AtawNormalRowDom = function (options) {
        return $.extend({}, $.AKjs.AtawBaseRowDom(options), new AtawNormalRowDom()).sysCreator();
    }



    function AtawNormalRowDom() {
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.AtawBaseRowDom_creator();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            //            for (var i = 0; i < this.ColumnList.length; i++) {
            //                var _column = this.ColumnList[i];
            //                _column.intoDom(this.$JObj);

            //            }
            this.groupColumns();
            this.initOperateRow();
            var _isDetailPage = false;
            var _isInsertPage = false;
            if (this.ParentFormObj && this.ParentFormObj.ParentPageObj) {
                _isDetailPage = this.ParentFormObj.ParentPageObj.PageStyle === "Detail";
                _isInsertPage = this.ParentFormObj.ParentPageObj.PageStyle === "Insert";
            }
            //alert(this.NoDelete);
            if (_isDetailPage || (this.NoDelete && this.IsViewPage) || (this.NoDelete && !_isDetailPage) || (_isInsertPage && !this.ParentFormObj.IsDetailForm)) {
                this.$JObj.find(".ACT-CHECK-SINGLE").hide();
            }
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "groupColumns", function () {
            var sumShowType = 0;
            var column;
            var $group = $('<div class="atawNormalRow  zu2"><div class="row showGrid panel-default"></div></div>');
            var group = [];
            this.$JObj.append($group);
            for (var i = 0; i < this.ColumnList.length; i++) {
                column = this.ColumnList[i];
                sumShowType += column.ColumnConfig.ShowType;
                $.AKjs.ColShowType = 4;
                if (sumShowType > $.AKjs.ColShowType) {
                    this.columnCss(group, $group);
                    group = [];
                    group.push(column);
                    sumShowType = column.ColumnConfig.ShowType;
                    $group = $('<div class="zu2 atawNormalRow"><div class="row showGrid panel-default"></div></div>');
                    this.$JObj.append($group);
                } else {
                    group.push(column);
                }
            }
            this.columnCss(group, $group);
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "SetCssAdd", function (size, $dom) {
            //if (size == 3)
            //    $dom.addClass("col-sm-6");
            //if (size == 6)
               // $dom.addClass("col-sm-6");
            //            if (size == 9)
            //                $dom.addClass("col-lg-6");
            //            if (size == 12)
            //                $dom.addClass("col-lg-9");

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "columnCss", function (group, $group) {
            var valColList = [];
            var _colCount = 12 / $.AKjs.ColShowType;
            var groupLength = group.length;
            for (var i = 0; i < groupLength; i++) {
                if (group[i].ColumnConfig.ControlType !== "Hidden") {
                    valColList.push(i);
                }
            }
            var _last = 100;
            var _l = valColList.length;
            if (_l >= 1) {
                _last = valColList[_l - 1];
            }

            this.setGroupShow(group, _colCount, $group, _last);

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setGroupShow", function (group, colCount, $group, last) {
            var groupLength = group.length;
            var _total = 0;
            for (var j = 0; j < groupLength; j++) {
                var _i = 0;
                if (group[j].ColumnConfig.ControlType !== "Hidden") {

                    if (j == last) {
                        _i = 12 - _total;
                    } else {

                        _i = group[j].ColumnConfig.ShowType * colCount;
                    }

                    _total = _i + _total;
                }
                group[j].$Column.addClass("col-md-" + _i);
                this.SetCssAdd(_i, group[j].$Column);
                group[j].intoDom($group);

            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createColumn", function (options) {
            return $.AKjs.AtawNormalColDom(options);
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initOperateRow", function () {
            var $group = $('<div><div class="row showGrid panel-default"></div></div>');
            this.$JObj.append($group);
            var $column = $('<div class="col-md-12 show-col show-col-end clearfix panel-default"/>');
            $group.find('.showGrid').append($column);
            var pageObj = this.ParentFormObj.ParentPageObj;
            var dataButtons = pageObj.DataButtons;
            var $buttonGroup = $('<div class="btn-group acs-grid-normal ACT-OPT-BTNS"/>');
            $column.append($buttonGroup);

            $buttonGroup.append($('<a ichecked="false" class="ACT-CHECK-SINGLE  icon-check-empty fa fa-square-o">'));
            $buttonGroup.find(".ACT-CHECK-SINGLE").data("AK-ROW", this);
            if (!this.ParentFormObj.IsDetailForm && !this.ParentFormObj.IsViewPage && !this.ParentFormObj.ParentPageObj.PageStyle == "List") {
                $buttonGroup.find(".ACT-CHECK-SINGLE").addClass("hidden");
            }
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
                            $a.addClass("btn");
                            this.additionButtonStyle($a, dataButtons[dataButton]);
                            $buttonGroup.append($a);
                        }
                    }
                }
            }
        });

    }

})(jQuery);
