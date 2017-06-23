(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};
    var str = "";
    var js = 1;
    var search_h = $("<div></div>");
    var on_off = -1;
    $.AKjs.AtawSearchForm = function (options) {
        return $.extend({}, $.AKjs.AtawBaseSearchForm(options), new AtawSearchForm()).sysCreator();
    }


    $.fn.AtawSearchForm = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawSearchForm", options);
    }

    function AtawSearchForm() {

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.AtawBaseSearchForm_creator();
        });

        //初始化表体
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initFormContent", function (myOptions) {
            str = "";
            var searchCriteriaList = $("<div id=\"searchCriteriaDivList\" class=\"searchCriteriaDivList  mb10 \"></div>")
            searchCriteriaList.hide();
            var myClass = "alert alert-success";
            var searchCriteriaDiv = $("<a  id=\"searchCriteriaDiv\" class=\"btn btn-primary mb10 acs-search-btn  pull-right  btn-xs  \"><i  class='icon-search fa fa-search' /></a>");
            var _$colFilterBtn = $("<button type=\"button\" id=\"ACT-COL-FILTER\" class=\" acs-search-btn pull-right btn btn-xs  icon-search fa fa-search\">筛选</button>");
            var searchCriteriaUlDiv = $("<div class='searchCriteriaUlDiv ask-search panel-green'></div>");
            var searchCriteriaUl = $("<ul id=\"searchCriteriaUl\" class=\"searchCriteriaUl clear\"></ul>");
            this.$FormContent = searchCriteriaDiv;

            searchCriteriaUlDiv.append(searchCriteriaUl);
            myOptions.BaseForm.$ConditionDiv.append(searchCriteriaUlDiv);

            var _this = this;
            var _option = this.Form;
            var f = 0; //定义标记用来表示是第一个li
            var param = null;
            if (this.ExtData && this.ExtData.PageState) {
                param = $.parseJSON(Base64.decode(this.ExtData.PageState));
            }

            for (var i = 0; i < _option.Columns.length; i++) {
                var n = _option.Columns[i];
                var _li = $("<li  class=\"search_Module_row col-md-6 col-sm-6 col-xs-12\" style='padding-bottom: 8px;'></li>");
                _li.append("<label class=\"Hu-search-label search_Module_lab left pull-left\">" + n.DisplayName + "：</label>");
                var _dv = $.AKjs.AtawJsDataValueOrObj(n.Options.DataValue, _this.Options.Data);
                var _controlOption = $.extend({}, n.Options, { DataValue: _dv });
                _controlOption.PostSetting.TableName = _option.TableName;
                var _AtawControlObj = $.AKjs["Ataw" + n.ControlType](_controlOption);
                var _control = $("<span class='col-md-7 Hu-search-content'></div>");
                var titleStr0 = n.DisplayName;
                var valStr0 = "";
                _AtawControlObj.intoDom(_control);
                if (param && param.search) {
                    for (var s in param.search) {
                        var origins = s.replace("_LIKE", "").replace("_END", "");
                        if (origins == n.Name) {
                            _AtawControlObj.dataValue(param.search[s]);
                            valStr0 = param.search[s];
                            if (valStr0 != "") {
                                switch (js) {
                                    case 1:
                                        myClass = "alert alert-success";
                                        break;
                                    case 2:
                                        myClass = "alert alert-info";
                                        break;
                                    case 3:
                                        myClass = "alert alert-warning";
                                        break;
                                    case 4:
                                        myClass = "alert alert-danger";
                                        break;
                                }
                                if (n.ControlType == "Selector") {
                                    $.AKjs.getJSON("/core/Selector/Search",
									 {
									     ds: _AtawControlObj.getPostDsStr(),
									     regName: _AtawControlObj.RegName,
									     key: "",
									     callback: Math.random()
									 }, function (data) {
									     var _response = data;
									     $.each(_response, function (i, Selector_n) {
									         if (valStr0 == Selector_n.CODE_VALUE) {
									             valStr0 = Selector_n.CODE_TEXT;
									             str += "<div class=\"" + myClass + "\">" + titleStr0 + "：";
									             str += valStr0 + ";<span class=\"closeBtn\">×</span></div>";
									             js++;
									             if (js == 5) {
									                 js = 1;
									             }
									             searchCriteriaList.show();
									             searchCriteriaList.html(str);
									             myOptions.BaseForm.$ConditionDiv.append(searchCriteriaList);
									             deleteDiv(searchCriteriaList, _this.$FormContent, myOptions);
									             alterDiv(searchCriteriaList, _this.$FormContent, myOptions);
									             return false;
									         }
									     })
									 });
                                } else {
                                    if (n.ControlType == "Combo" || n.ControlType == "CheckBox") {
                                        for (var Combo_Checkbox_n = 0; Combo_Checkbox_n < _AtawControlObj.DataValue.Ds[this.Options.RegName].length; Combo_Checkbox_n++) {
                                            if (_AtawControlObj.DataValue.Ds[this.Options.RegName][Combo_Checkbox_n].CODE_VALUE == param.search[s] || "\"" + _AtawControlObj.DataValue.Ds[this.Options.RegName][Combo_Checkbox_n].CODE_VALUE + "\"" == param.search[s]) {
                                                valStr0 = $(_AtawControlObj.DataValue.Ds[this.Options.RegName][Combo_Checkbox_n].CODE_TEXT).html().trim();
                                                break;
                                            }
                                        }
                                    }
                                    str += "<div class=\"" + myClass + "\">" + titleStr0 + "：";
                                    str += valStr0 + ";<span class=\"closeBtn\">×</span></div>";
                                    js++;
                                    if (js == 5) {
                                        js = 1;
                                    }
                                    searchCriteriaList.show();
                                    searchCriteriaList.html(str);
                                    myOptions.BaseForm.$ConditionDiv.append(searchCriteriaList);
                                    deleteDiv(searchCriteriaList, _this.$FormContent, myOptions);
                                    alterDiv(searchCriteriaList, _this.$FormContent, myOptions);
                                }
                            }
                            break;
                        }
                    }
                }

                _AtawControlObj.$JObj.find("input").addClass("search_Module_text");
                _AtawControlObj.$JObj.addClass("SEARCH-CONTROL");
                _AtawControlObj.setSubmit(0);
                _li.append(_control);
                searchCriteriaUl.append(_li);
            }

            //            $.each(_option.Columns, function (i, n) {
            //                
            //            })
           // searchCriteriaUl.append("<li  class=\"search_Module_row searchBtnBar\"><button type=\"button\" class=\"MySearch btn btn-primary\">搜索</button><button type=\"button\" id=\"ToClearTheSearchCriteriaButton\" class='btn'>清空</button><button type=\"button\" id=\"closeBtnDiv\" class='close closeBtnDiv'>&times;</button></li>");
            searchCriteriaUl.append("<li  class=\"search_Module_row searchBtnBar col-md-12 acs-search-line\" ><button type=\"button\" class=\"MySearch btn btn-sm btn-primary icon-search fa fa-search mr5\" title='搜索'></button><button type=\"button\" id=\"ToClearTheSearchCriteriaButton\" class='btn btn-sm Hs-btn-trash icon-trash fa fa-trash-o' title='清空'></button></li>");

            searchCriteriaUlDiv.find(".MySearch").bind("click", function () {
               searchdataValue(searchCriteriaUlDiv, myOptions, on_off, search_h, searchCriteriaList);
                //searchCriteriaDiv.parent().parent().find(".SearForm").show();
            });

            searchCriteriaUlDiv.find(".search_Module_text").keydown(function (e) {
                if (e.keyCode == 13) {
                    var obj = $(this).parent().AtawControl();
                    obj.dataValue($(this).val());
                    obj.triggerChangeEvent();
                    searchdataValue(searchCriteriaUlDiv, myOptions, on_off, search_h, searchCriteriaList);
                }
            });

            searchCriteriaUlDiv.find("#closeBtnDiv").bind("click", function () {
                on_off *= -1;
                //search_h.append(searchCriteriaUlDiv);
            });

            //设置清空按钮的点击事件
            searchCriteriaUlDiv.find("#ToClearTheSearchCriteriaButton").bind("click", function () {
                //searchCriteriaDiv.parent().parent().find(".SearForm").show();
                //清空文本框
                searchCriteriaUlDiv.find("input[type='text']").each(function () {
                    try {
                        $(this).val("");
                    } catch (e) { }
                });
                searchCriteriaUlDiv.find("textarea").each(function () {
                    try {
                        $(this).val("");
                    } catch (e) { }
                });
                searchCriteriaUlDiv.find("input[type='Checkbox']").each(function () {
                    try {
                        if ($(this).attr("checked") == "checked") {
                            $(this).attr("checked", false);
                        }
                    } catch (e) { }
                });

                //清除span里面的数据
                searchCriteriaUlDiv.find("span").each(function () {
                    try {
                        $(this).AtawControl().dataValue("");
                        if ($(this).AtawControl().ChangeEventFun) {
                            $(this).AtawControl().ChangeEventFun($(this));
                        }
                    } catch (e) { }
                });

                str = "";
                $("#searchCriteriaDivList").html(str);
                searchdataValue(searchCriteriaUlDiv, myOptions, on_off, search_h, searchCriteriaList);
                on_off = -1;
                //search_h.append(searchCriteriaUlDiv);
            });

            searchCriteriaDiv.click(function (e) {
                if (on_off == -1) {
                    myOptions.BaseForm.$ConditionDiv.append(searchCriteriaUlDiv);
                    searchCriteriaDiv.parent().parent().find(".SearForm").hide();
                    //如果搜索栏下拉框隐藏则显示
                    searchCriteriaUlDiv.find(".search_Module_row").each(function () {
                        if ($(this).find("span").length > 0) {
                            var _thisLi = $(this).find("span");
                            //搜索条件变化的时候触发
                            var eventLi;
                            if ($(_thisLi).AtawControl().Options != null) {
                                eventLi = $(_thisLi).AtawControl().Options;
                            } else {
                                eventLi = $(_thisLi).AtawControl()[0].Options;
                            }
                            eventLi.ChangeEventFun = function () {

                                //获得条件的头
                                var titleStr = _thisLi.find(".search_Module_lab").context.childNodes[0].innerHTML;
                                //获得条件的值
                                var valStr = "";
                                if (_thisLi.AtawControl().$JObjText) {
                                    if (_thisLi.AtawControl().$Box) {
                                        if (_thisLi.AtawControl().dataValue() != "") {
                                            valStr = _thisLi.AtawControl().DataText;
                                            if (valStr == "") {
                                                valStr = _thisLi.AtawControl().$JObjText.val();
                                            }
                                        }
                                    } else {
                                        valStr = _thisLi.AtawControl().dataValue();
                                    }
                                } else if (_thisLi.AtawControl().$JObjMultiControl) {
                                    if (_thisLi.AtawControl().dataValue() != "") {
                                        if ($(_thisLi).AtawControl().Options.RegName == "SingleCheckBoxIsOrNo") {
                                            if ("innerText" in _thisLi.AtawControl().$JObjMultiControl.select()[0][Number(_thisLi.AtawControl().dataValue()) + 1]) {
                                                valStr = _thisLi.AtawControl().$JObjMultiControl.select()[0][Number(_thisLi.AtawControl().dataValue()) + 1].innerText;
                                            } else {
                                                valStr = _thisLi.AtawControl().$JObjMultiControl.select()[0][Number(_thisLi.AtawControl().dataValue()) + 1].textContent;
                                            }
                                        } else {
                                            if ("innerText" in _thisLi.AtawControl().$JObjMultiControl.select()[0][Number(_thisLi.AtawControl().dataValue())]) {
                                                valStr = _thisLi.AtawControl().$JObjMultiControl.select()[0][Number(_thisLi.AtawControl().dataValue())].innerText;
                                            } else {
                                                valStr = _thisLi.AtawControl().$JObjMultiControl.select()[0][Number(_thisLi.AtawControl().dataValue())].textContent;
                                            }
                                        }
                                    } else {
                                        valStr = "";
                                    }

                                } else if (_thisLi.AtawControl()[0]) {
                                    if (!("dataValue" in _thisLi.AtawControl())) {
                                        valStr = _thisLi.AtawControl()[0].dataValue();
                                    } else {
                                        valStr = _thisLi.AtawControl()[0].DataText;
                                    }
                                    if (_thisLi.AtawControl()[0].$JObjMultiControl) {
                                        $(_thisLi.AtawControl()[0].$JObjMultiControl).find("input").each(function () {
                                            if (valStr.indexOf($(this).val()) != -1) {
                                                valStr = valStr.replace($(this).val(), $(this).next().html());
                                            }
                                        });
                                    } else if (_thisLi.AtawControl()[0].$JObjText) {
                                        if (_thisLi.AtawControl()[0].$JObjText[0].value != "") {
                                            valStr = _thisLi.AtawControl()[0].$JObjText[0].value;
                                        }
                                    } else { }
                                }
                                //判断条件标签是否已经存在，存在则修改，不存在则添加
                                var f = str.indexOf(titleStr);
                                if (f != -1) {
                                    if (valStr == "") {
                                        str = str.replace(str.substring(f, str.indexOf(";", f)), "");
                                        str = str.replace("<div class=\"alert alert-success\">;<span class=\"closeBtn\">×</span></div>", "");
                                        str = str.replace("<div class=\"alert alert-info\">;<span class=\"closeBtn\">×</span></div>", "");
                                        str = str.replace("<div class=\"alert alert-warning\">;<span class=\"closeBtn\">×</span></div>", "");
                                        str = str.replace("<div class=\"alert alert-danger\">;<span class=\"closeBtn\">×</span></div>", "");
                                    } else {
                                        str = str.replace(str.substring(f, str.indexOf(";", f)), titleStr + valStr);
                                    }
                                    if (searchCriteriaList.is(":visible") == false) {
                                        searchCriteriaList.hide();
                                    } else {
                                        //                                        searchCriteriaUlDiv.find(".MySearch").click();
                                    }
                                } else {
                                    if (valStr != "") {
                                        switch (js) {
                                            case 1:
                                                myClass = "alert alert-success";
                                                break;
                                            case 2:
                                                myClass = "alert alert-info";
                                                break;
                                            case 3:
                                                myClass = "alert alert-warning";
                                                break;
                                            case 4:
                                                myClass = "alert alert-danger";
                                                break;
                                        }
                                        str += "<div class=\"" + myClass + "\">" + titleStr;
                                        str += valStr + ";<span class=\"closeBtn\">×</span></div>";
                                        js++;
                                        if (js == 5) {
                                            js = 1;
                                        }
                                        if (searchCriteriaList.is(":visible") == false) {
                                        } else {
                                            //                                            searchCriteriaUlDiv.find(".MySearch").click();
                                        }
                                    }
                                }
                                searchCriteriaList.html(str);
                                deleteDiv(searchCriteriaList, searchCriteriaUlDiv, myOptions);
                                alterDiv(searchCriteriaList, searchCriteriaUlDiv, myOptions);
                            }
                        }
                    });
                    myOptions.BaseForm.$ConditionDiv.append(searchCriteriaList);
                    myOptions.BaseForm.$ConditionDiv.find("span").each(function () {
                        if ($(this).hasClass("input-group-btn")) {
                        } else {
                            //$(this).width(((myOptions.BaseForm.$ConditionDiv.width() - $(this).prev().width() - 100) / myOptions.BaseForm.$ConditionDiv.width() * (myOptions.BaseForm.$ConditionDiv.width() / $(window).width() * 100)) + "em");
                            //if ($(this).find("select").length != 0) {
                            //    $($(this).find("select")).css("width", "100%")
                            //}
                        }
                    });
                    on_off *= -1;
                } else {
                    on_off *= -1;
                    //search_h.append(searchCriteriaUlDiv);
                }

            });

        });


    }

    function deleteDiv(searchCriteriaList, searchForm, myOptions) {
        //点击标签删除
        myOptions.BaseForm.$ConditionDiv.find(".alert").each(function () {
            $(this).find("span").click(function () {
                var thisLable = $(this).parent();
                //清空文本框
                searchForm.find(".search_Module_row").each(function () {
                    if ($(this).find("span").length > 0) {
                        var _thisLi = $(this).find("span");

                        var titleStr = $(this).find(".search_Module_lab").context.childNodes[0].innerHTML;
                        var f_titleStr;
                        if ("innerText" in thisLable[0]) {
                            f_titleStr = thisLable[0].innerText;
                        } else {
                            f_titleStr = thisLable[0].textContent;
                        }
                        if (f_titleStr.indexOf($.trim(titleStr)) != -1) {
                            if ("dataValue" in $(_thisLi).AtawControl()) {
                                $(_thisLi).AtawControl().dataValue("");
                                if ($(_thisLi).AtawControl().ChangeEventFun) {
                                    $(_thisLi).AtawControl().ChangeEventFun($(_thisLi));
                                }
                            } else {
                                $(_thisLi.find(".search_Module_lab").context.childNodes[1]).AtawControl().dataValue("");
                                //								if ($(_thisLi.find(".inputAutoCon"))) {
                                //									$(_thisLi.find(".inputAutoCon")).val("");
                                //								}
                                if ($(_thisLi.find(".search_Module_lab").context.childNodes[1]).AtawControl().ChangeEventFun) {
                                    $(_thisLi.find(".search_Module_lab").context.childNodes[1]).AtawControl().ChangeEventFun($(_thisLi.find(".search_Module_lab").context.childNodes[1]));
                                }
                            }
                            $(this).find("input[type='text']").each(function () {
                                try {
                                    $(this).val("");
                                } catch (e) { }
                            });
                            $(this).find("input[type='Checkbox']").each(function () {
                                try {
                                    if ($(this).attr("checked") == "checked") {
                                        $(this).attr("checked", false);
                                    }
                                } catch (e) { }
                            });
                        }

                    }
                });
                //删除标签
                if ("innerText" in thisLable[0]) {
                    if (thisLable[0].innerText.substring(0, thisLable[0].innerText.length - 1) == "") { } else {
                        str = str.replace(thisLable[0].innerText.substring(0, thisLable[0].innerText.length - 1), ";");
                    }
                } else {
                    if (thisLable[0].textContent.substring(0, thisLable[0].textContent.length - 1) == "") { } else {
                        str = str.replace(thisLable[0].textContent.substring(0, thisLable[0].textContent.length - 1), ";");
                    }
                }
                str = str.replace("<div class=\"alert alert-success\">;<span class=\"closeBtn\">×</span></div>", "");
                str = str.replace("<div class=\"alert alert-info\">;<span class=\"closeBtn\">×</span></div>", "");
                str = str.replace("<div class=\"alert alert-warning\">;<span class=\"closeBtn\">×</span></div>", "");
                str = str.replace("<div class=\"alert alert-danger\">;<span class=\"closeBtn\">×</span></div>", "");
                searchCriteriaList.html(str);
                searchForm.find(".MySearch").click();
               // searchCriteriaList.show();
                search_h.append(searchForm.find("#searchCriteriaUl").parent());
                if (str != "") {
                    deleteDiv(searchCriteriaList, searchForm, myOptions);
                    alterDiv(searchCriteriaList, searchForm, myOptions)
                }
            });
        });
    }

    function searchdataValue(searchCriteriaUlDiv, myOptions, on_off, search_h, searchCriteriaList) {

        myOptions.BaseForm.SearchAnchor = {};
        var searchData = searchCriteriaUlDiv.find(".ACT_POST").CreateDataSet();
        if (searchData[myOptions.BaseForm.TableName + "_SEARCH"]) {
            myOptions.BaseForm.SearchAnchor = searchData[myOptions.BaseForm.TableName + "_SEARCH"][0];
        }
        myOptions.BaseForm.searchDataList(1, null, searchData);
        on_off *= -1;
        //search_h.append(searchCriteriaUlDiv);
        if (searchCriteriaList.is(":visible") == false) {
            searchCriteriaList.show();
        }

    }

    function alterDiv(searchCriteriaList, searchForm, myOptions) {
        //点击标签修改
        myOptions.BaseForm.$ConditionDiv.find(".alert").each(function () {
            $(this).click(function (event) {
                var thisLable = $(this);
                searchForm.find("#searchCriteriaUl").parent().show();
                if (str != "") {
                    deleteDiv(searchCriteriaList, searchForm, myOptions);
                    alterDiv(searchCriteriaList, searchForm, myOptions);
                }
            });
        });
    }





})(jQuery);
