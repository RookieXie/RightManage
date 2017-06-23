(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    //继承基类
    $.AKjs.AtawGridRowDom = function (options) {
        return $.extend({}, $.AKjs.AtawBaseRowDom(options), new AtawGridRowDom()).sysCreator();
    }

    function AtawGridRowDom() {
        // this.$DataRow = $("<tr class=\"data_row\"></tr>"); //每行
        this.HasNoCk = false;
        this.ExpandDetailFunName = "";
        this.ExpandDetailFunName_dispose = "";
        this.ExpandSign = false;
        this.$ExpandDv = null;
        this.$ButtonDv = null;
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.AtawBaseRowDom_creator();
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            // if (this.NoDelete || this.setRemoveCheckboxInRow()) {
            //     this.$DataRow.find(".ACT-CHECK-SINGLE").remove();
            // }
            // this.$JObj.append(this.$DataRow);
            this.HasNoCk = this.ParentFormObj.HasNoCk;
            this.initRow();
            this.$DataRow = this.$JObj;
            this.$DataRow.attr("RowIndex", this.RowIndex);
            var _this = this;
            var pageObj = this.ParentFormObj.ParentPageObj;
            //            if (pageObj.PageStyle === "List") {
            //                this.initOperateButton();
            //            }
            var $td;
            _this.$DataRow.append($td);
            $.each(_this.ColumnList, function (i, col) {
                //                if (this.ColumnConfig.TdStyle != null) {
                //                    var tdstyle = this.ColumnConfig.TdStyle;
                //                    var end = tdstyle.toString().indexOf("|");
                //                    var tdstyles = tdstyle.substring(0, end);
                //                    var tdclass = tdstyle.substring(end + 1, tdstyle.length);
                //                    _dataText = "<span style = ' " + tdstyles + " ' class = '" + tdclass + "'>" + _sourceText + "</span>";
                //                }
                if (col.ColumnConfig.TdStyle != null) {
                    var tdstyle = this.ColumnConfig.TdStyle;
                    var end = tdstyle.toString().indexOf("|");
                    var tdclass = "";
                    var tdstyles = "";
                    if (end == -1) {
                        tdstyles = tdstyle;
                    } else {
                        tdstyles = tdstyle.substring(0, end);
                        tdclass = tdstyle.substring(end + 1, tdstyle.length);
                    }

                    if (!$.AKjs.IsEmpty(this.ColumnConfig.Width)) {
                        var _w = this.ColumnConfig.Width.toString();
                        if (!_w.AendWith("%") && !_w.AendWith("px") && !_w.AendWith("em")) {
                            _w = _w + "em";
                        }
                        $td = $("<td  style='" + tdstyles + ";max-width:" + _w + "' acol='" + col.ColumnConfig.Name + "' class='aks-td " + tdclass + " '  />");
                    } else {
                        $td = $("<td  style='" + tdstyles + "' acol='" + col.ColumnConfig.Name + "' class='aks-td " + tdclass + " '  />");
                    }
                } else {
                    if (!$.AKjs.IsEmpty(this.ColumnConfig.Width)) {
                        var _w = this.ColumnConfig.Width.toString();
                        if (!_w.AendWith("%") && !_w.AendWith("px") && !_w.AendWith("em")) {
                            _w = _w + "em";
                        }
                        $td = $("<td  style='max-width:" + _w + "' acol='" + col.ColumnConfig.Name + "' class='aks-td'  />");
                    } else {
                        $td = $("<td  style='' acol='" + col.ColumnConfig.Name + "' class='aks-td'  />");
                    }
                }
                _this.$DataRow.append($td);
                col.intoDom($td);
            });
            if (_this.ColumnList.length <= 4) {
                var $buttontd = $("<td  style='' acol='databutton' class='aks-td'  ></td>");
                _this.$DataRow.append($buttontd);
                $buttontd.AtawButtonList({ RowDom: _this });
            }

            var _pageStyle = this.ParentFormObj.ParentPageObj.PageStyle;
            if (this.HasNoCk && (_pageStyle == "Update" || _pageStyle == "Insert" || this.ParentFormObj.Form.HasBatchInsert)) {
                _this.$DataRow.append("<td><a title='删除记录'  class='ACT-DEL-SINGLE'><i style='color:red;' class='icon-minus-sign fa fa-minus-circle icon-2x'></i></a></td>");
            }
            this.$JObj.find(".ACT-ROW-INDEX").eq(0).text(this.RowIndex + 1);
            if (this.HasNoCk) {
                _this.$DataRow.find(".ACT-DEL-SINGLE").off("click").on("click", function () {
                    //-----
                    var formObj = _this.ParentFormObj;
                    var _$row = _this.$DataRow;
                    formObj.saveDelRowKey(_$row);
                    if (formObj.AfterDelNewRowFun) {
                        formObj.AfterDelNewRowFun(formObj, _$row);
                    }
                });
            }

            //            this.$JObj.off("click").on("click", function () {
            //                //------
            //                _this.expandDetail(_this.FormConfig.Form.ExpandDetailPlug);
            //            });

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initRow", function () {
            if (!this.HasNoCk) {

                var $td = $("<td style='padding: 1px; vertical-align: baseline;' class='cbk_panel chk-item aks-break-word'></td>");
            }
            else {
                var $td = $("<td></td>");
            }
            $td.append(this.initOperateButton());
            this.$JObj.append($td);
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initOperateButton", function () {
            var _this = this;
            var pageObj = this.ParentFormObj.ParentPageObj;
            var dataButtons = pageObj.DataButtons;
            var _l = 0;
            if (!dataButtons.length && dataButtons.length != 0 ) {
                for (var n in dataButtons) {
                    _l++;
                }
            }

            var count = 0;
            var key = "";
            var ExpandDetailPlug = this.FormConfig.Form.ExpandDetailPlug;
            if (this.DataRow && this.PrimaryKey && this.DataRow[this.PrimaryKey]) {
                key = this.DataRow[this.PrimaryKey];
            }
            if (!this.HasNoCk && ( dataButtons.length > 0  || _l > 0 )) {
                var $dv = $('<div class="btn-group cbk-td"><a class="aks-header-ck chk-btn " href="javascript:void(0)"><i ichecked = ' + false + ' class="ACT-CHECK-SINGLE icon-check-empty fa fa-square-o" key="' + key + '"/></a><span class="ACT-ROW-INDEX"></span></div>');
                //var $buttonUl = $buttons.find("ul");
                $dv.find(".ACT-CHECK-SINGLE").data("AK-ROW", this);
                //                if (ExpandDetailPlug != null) {
                var title = _this.ParentFormObj.ParentPageObj.Title;

                if (_this.ColumnList.length > 4 &&title != "通讯录") {
                    var $a = $('<a class="root-add ACT-ROW-ExpandDetail"></a>');
                    $dv.append($a);
                    $dv.find(".ACT-ROW-ExpandDetail").off("click").on("click", function () {
                        _this.expandDetail(ExpandDetailPlug);
                    });
                    //                }
                }
            }
            else {
                var $dv = $('<div><span class="ACT-ROW-INDEX"></span></div>');
            }
            //$buttonTd.find("span").last().remove();
            //            if (count > 0) {
            //                $buttonTd.append($buttons);
            //            }
            return $dv;
        });
        //初始化行
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createColumn", function (options) {
            return $.AKjs.AtawGridColumnDom(options);
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "expandDetail", function (expandDetailConfig) {
            //uisdkAllConrol
            var type = "";
            this.ExpandDetailDes = "";
            this.ExpandDetailDes_dispose = "";
            if (expandDetailConfig != null) {
                type = expandDetailConfig.Type;
                this.ExpandDetailDes = expandDetailConfig.Value;
                this.ExpandDetailDes_dispose = expandDetailConfig.Value + "_dispose";
            }
            if (!this.ExpandSign) {
                var _$buttondv = $("<tr><td colspan='1000' class = 'ACT-ROW-BUTTON well ButtonBar ta1'></td></tr>");
                this.$ButtonDv = _$buttondv.find(".ACT-ROW-BUTTON");
                this.createRowButton(this.$ButtonDv);
                this.$JObj.after(_$buttondv);
                var _$dv = $("<tr ><td colspan='1000' class='ACT-EXPAND-DEATIL'></td></tr>");
                this.$ExpandDv = _$dv.find(".ACT-EXPAND-DEATIL");
                if (type == "Custom" && this.ExpandDetailDes != "") {
                    if ($.AKjs.ExpandDetail && $.AKjs.ExpandDetail[this.ExpandDetailDes]) {
                        var _isDv = $.AKjs.ExpandDetail[this.ExpandDetailDes](this, this.$ExpandDv);
                        if (_isDv) {
                            this.$JObj.after(_$dv);
                        }
                    }
                }
                if (type == "Tpl" && this.ExpandDetailDes != "") {
                    var _val = $.AKjs.Template(this.ExpandDetailDes, this);
                    if (_val != "") {
                        this.$ExpandDv.append($(_val));
                        this.$JObj.after(_$dv);
                    }

                }
                this.ExpandSign = true;
                this.$JObj.find(".ACT-ROW-ExpandDetail").removeClass("root-add").addClass("root-cut");
            }
            else {
                if ($.AKjs.ExpandDetailDes_dispose && $.AKjs.ExpandDetailDes[this.ExpandDetailDes_dispose]) {
                    $.AKjs.ExpandDetail[this.ExpandDetailDes_dispose](this, this.$ExpandDv);
                }
                this.$ExpandDv.remove();
                this.$ExpandDv = null;
                this.$ButtonDv.parent().remove();
                this.$ButtonDv = null;
                this.ExpandSign = false;
                this.$JObj.find(".ACT-ROW-ExpandDetail").removeClass("root-cut").addClass("root-add");
            }


        });
        
         $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createRowButton", function ($buttondv) {
            var _this = this;
            var pageObj = this.ParentFormObj.ParentPageObj;
            var dataButtons = pageObj.DataButtons;
            var BUTTON_RIGHTS;
            if (this.DataRow && this.DataRow.BUTTON_RIGHT) {
                BUTTON_RIGHTS = this.DataRow.BUTTON_RIGHT.split('|');
            }
            if (BUTTON_RIGHTS && !pageObj.IsViewPage && !$.AKjs.IsEmpty(dataButtons)) {
                this.ButtonList = BUTTON_RIGHTS;
                for (dataButton in dataButtons) {
                    if (!dataButtons[dataButton].Unbatchable) {
                        this.BatchableButtonList.push(dataButtons[dataButton].Name);
                    }
                    for (var j = 0; j < BUTTON_RIGHTS.length; j++) {
                        if (dataButton === BUTTON_RIGHTS[j]) {
                            var $a = this.createOperateButton(dataButtons[dataButton]);
                            $buttondv.append($a);
                            //$a.addClass("btn");
                            this.additionButtonStyle($a, dataButtons[dataButton]);
                            break;
                        }
                    }
                }
            }
         });
    }
})(jQuery);
