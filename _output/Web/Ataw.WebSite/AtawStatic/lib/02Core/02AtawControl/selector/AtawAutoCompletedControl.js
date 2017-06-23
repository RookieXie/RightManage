(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    //继承基类
    $.AKjs.AtawAutoCompleted = function (options) {
        return $.extend({}, $.AKjs.AtawBaseSelector(options), new AtawAutoCompletedControl());
    }
    $.fn.AtawAutoCompleted = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawAutoCompleted", options);
    }
    function AtawAutoCompletedControl() {
        this.$AutoComplete = $("<div class=\"ACT-AUTOCOMPLETE autocomplete man-selection\" style=\"display: block; width: 97.8%; background: #fff; position: absolute; top: 22px; z-index: 333;\"></div>");
        this.$Box = $("<div  class='Hm-input-group input-group'></div>"); //控件容器
        this.$Menu = $("<div ></div>");
        this.RegName = null;
        this.autoUrl = "/core/Selector/AutoComplete";
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            if (this.ParentFormObj&&this.ParentFormObj.FormType == "Grid") {
                //ParentFormObj
                this.$Box.addClass("aks-selector-maxwidth");
            }
            var _this = this;
            var _dataTable = this.$DataTable;
            this.AtawBaseSelectorControl_init();
            this.$JObjText.addClass("ACT-TEXT inputAutoCon");
            this.RegName = this.Options.RegName;
            this.$JObj.addClass("ACT-SELECTBOX-PARENT");
            this.$JObj.append(this.$Box);
            this.$Box.append(this.$JObjText);
            this.$Box.append(this.$Menu);
            var _jObjSearchBox = this.$JObjText;
            this.$Menu.append(this.$AutoComplete);
            var _jObjAutoComplete = this.$AutoComplete;
            this.$JObjText.bind("keyup click", function (event) {
                //                _this.fillMenu(event);
                var _code = event.keyCode || event.which;
                if ((_code != 13) && (_code < 37 || _code > 40)) {
                    $.AKjs.getJSON(_this.autoUrl,
                     {
                         ds: _this.getPostDsStr(),
                         regName: _this.RegName,
                         key: _jObjSearchBox.val(),
                         callback: Math.random()
                     }, function (data) {
                         _jObjAutoComplete.html("");
                         var _response = data;
                         if (data.length > 0) {
                             var _offset = _jObjSearchBox.position();
                             //_jObjAutoComplete.css({ left: _offset.left + "px", top: _offset.top + _jObjSearchBox.outerHeight() + "px", width: (_jObjSearchBox.width() + 10) + "px" }).slideDown("fast");
                             _jObjAutoComplete.css({ left: "0em", top: _offset.top + _jObjSearchBox.outerHeight() + 0 + "px", width: (_jObjSearchBox.width() + 10) + "px" }).slideDown("fast");
                             var _strb = $.AKjs.CreateBuffer("");
                             $.each(_response, function (i, n) {
                                 if (n.CODE_TEXT.indexOf("<img") != -1) {
                                     //                                     _strb.ad("<span spn='" + i + "' val=\"" + n.CODE_VALUE + "\" txts=\"" + $(n.CODE_TEXT).find("label").html() + "\">" + $(n.CODE_TEXT).find("label").html() + "</span>");
                                     _strb.ad("<div class='ACT-ITEM' spn='" + i + "' val=\"" + n.CODE_VALUE + "\" txts=\"" + $(n.CODE_TEXT).find("label").html() + "\">" + n.CODE_TEXT + "</div>");
                                 } else {
                                     _strb.ad("<div class='ACT-ITEM' spn='" + i + "' val=\"" + n.CODE_VALUE + "\" txts=\"" + n.CODE_TEXT + "\">" + n.CODE_TEXT + "</div>");
                                 }
                             })
                             _strb.ad("<span class='ACT-ITEM' spn='更多选择……' >更多选择……</span>");
                             _jObjAutoComplete.append(_strb.toString());
                             spanindex = 0;
                             _jObjAutoComplete.show();
                             _jObjAutoComplete.width(_jObjSearchBox.width());
                             //默认选择第一个
                            // _jObjAutoComplete.find(".ACT-ITEM:eq(0)").css({ backgroundColor: '#03439D', color: '#fff' });
                         } else {

                             _this.searchComplete($(this));

                             //_jObjSearchBox.val("");
                             //_this.dataValue("");
                             //_this.DataValue.setValue("");
                             _jObjAutoComplete.hide();
                         }

                         _jObjAutoComplete.find(".ACT-ITEM").click(function () {
                             if ($(this).text() == "更多选择……") {
                                 $(this).parent().parent().next().find("a").click();
                                 //                     			_this.$AutoComplete.hide();
                                 //                     			_dataTable.find(".ACT-LOADING").hide();
                                 //                     			_dataTable.find(".ACT-SEARCH-BOX").val("");
                                 //                     			_this.SelectedItems = {};
                                 //                     			_searchFun("");

                                 //                     			_this.$AutoComplete.hide();
                                 //                     			_dataTable.find(".ACT-LOADING").hide();
                                 //                     			_dataTable.find(".ACT-SEARCH-BOX").val(_jObjSearchBox.val());
                                 //                     			_searchFun();

                             } else {
                                // debugger;
                                 _jObjSearchBox.val($(this).text());
                                 _this.setDataText($(this).text());
                                 _this.dataValue($(this).attr("val"));

                                 spanindex = $(this).attr("spn");
                             }

                         }).hover(function () {
                           //  _jObjAutoComplete.find(".ACT-ITEM").css({ backgroundColor: '#fff', color: '#00449a' });
                            // $(this).css({ backgroundColor: '#03439D', color: '#fff' });
                             spanindex = $(this).attr("spn");
                         });
                     });
                }
                else {
                    if (_code == 13) {
                        //_jObjSearchBox.val(_jObjAutoComplete.find(".ACT-ITEM[spn=" + spanindex + "]").text());
                        //_this.dataValue(_jObjAutoComplete.find(".ACT-ITEM[spn=" + spanindex + "]").attr("val"));
                        //_this.DataValue.setValue(_jObjAutoComplete.find(".ACT-ITEM[spn=" + spanindex + "]").attr("val"));
                        //_jObjAutoComplete.hide();
                    }
                    else {
                        if (_jObjAutoComplete != null) {
                           // var arr = _jObjAutoComplete.find("span[spn]").length;
                            //if (_code == 39 || _code == 40)//下或右
                            //{
                            //    if (spanindex < arr - 1) {
                            //        spanindex++;
                            //        _jObjAutoComplete.find(".ACT-ITEM[spn=" + spanindex + "]").css({ backgroundColor: '#03439D', color: '#fff' });
                            //        var spanindexup = spanindex - 1;
                            //        _jObjAutoComplete.find(".ACT-ITEM[spn=" + spanindexup + "]").css({ backgroundColor: '#fff', color: '#00449a' });
                            //        _jObjSearchBox.val(_jObjAutoComplete.find(".ACT-ITEM[spn=" + spanindex + "]").text());
                            //        _this.dataValue(_jObjAutoComplete.find(".ACT-ITEM[spn=" + spanindex + "]").attr("val"));
                            //        _this.DataValue.setValue(_jObjAutoComplete.find(".ACT-ITEM[spn=" + spanindex + "]").attr("val"));
                            //    }
                            //}
                            //else if (_code == 37 || _code == 38)//上或左
                            //{
                            //    if (spanindex > 0) {
                            //        spanindex--;
                            //        _jObjAutoComplete.find(".ACT-ITEM[spn=" + spanindex + "]").css({ backgroundColor: '#03439D', color: '#fff' });
                            //        var spanindexbtm = spanindex + 1;
                            //        _jObjAutoComplete.find(".ACT-ITEM[spn=" + spanindexbtm + "]").css({ backgroundColor: '#fff', color: '#00449a' });
                            //        _jObjSearchBox.val(_jObjAutoComplete.find(".ACT-ITEM[spn=" + spanindex + "]").text());
                            //        _this.dataValue(_jObjAutoComplete.find(".ACT-ITEM[spn=" + spanindex + "]").attr("val"));
                            //        _this.DataValue.setValue(_jObjAutoComplete.find(".ACT-ITEM[spn=" + spanindex + "]").attr("val"));
                            //    }
                            //}
                        }
                    }
                }


                function _searchFun(key) {

                    _dataTable.find(".ACT-LOADING").show();



                    $.AKjs.getJSON("/core/Selector/Search", {
                        ds: _this.getPostDsStr(),
                        regName: _this.RegName,
                        key: key,
                        callback: Math.random()
                    }, function (data) {
                        _dataTable.find(".ACT-LOADING").hide();
                        _dataTable.find("dd").remove();
                        var _response = data;
                        var _strb = $.AKjs.CreateBuffer("");
                        $.each(_response, function (i, n) {
                            if (n.CODE_TEXT.indexOf("<img") != -1) {
                                //                                _strb.ad("<dd class=\"bg\"><span  class=\"ACT-SELECT-CURRENT select-item\" txt=\"" + $(n.CODE_TEXT).find("label").html() + "\" val=\"" + n.CODE_VALUE + "\">" + $(n.CODE_TEXT).find("label").html() + "</span></dd>");
                                _strb.ad("<dd class=\"bg\"><span  class=\"ACT-SELECT-CURRENT select-item\" txt=\"" + $(n.CODE_TEXT).find("label").html() + "\" val=\"" + n.CODE_VALUE + "\">" + n.CODE_TEXT + "</span></dd>");
                            } else {
                                _strb.ad("<span spn='" + i + "' val=\"" + n.CODE_VALUE + "\" txts=\"" + n.CODE_TEXT + "\">" + n.CODE_TEXT + "</span>");
                            }
                        })
                        _dataTable.find("dl").append(_strb.toString());
                       // _dataTable.find(".ACT-SELECT-CURRENT[txt=\"" + _jObjSearchBox.val() + "\"]").css({ backgroundColor: '#03439D', color: '#fff' });
                        _dataTable.find(".ACT-SELECT-CURRENT").click(function () {
                            _jObjSearchBox.val($(this).attr("txt"));
                            _this.dataValue($(this).attr("val"));
                            _this.setDataText($(this).attr("txt"))
                            //_this.DataValue.setValue($(this).attr("val"));
                            _this.triggerChangeEvent();
                            _this.$Win.close();
                        });
                        // alert();
                        // _this.winPositionFun();
                        _this.winOpen();
                    });
                }
            });

            this.$JObjText.blur(function () {
                //                var _selectValue = _this.DataValue.getValue();
                //                if (_selectValue == null) {
                //                    $(this).val("");
                //                    _this.dataValue("");
                //                }
                var _len = _jObjAutoComplete.find("span[txt='" + $(this).val() + "']").length;
                if (_len == 0 && $(this).val() != "") {
                    _this.searchComplete($(this));
                }
            });

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "searchComplete", function ($input) {
            $input.val("");
            this.dataValue("");
            this.DataValue.setValue("");
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "fillMenu", function (event) {

        });
        //        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "createItem", function () {
        //            return $("<textarea class='form-control aks-input'/>");
        //        });
    }
})(jQuery);
