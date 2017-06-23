(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};
    //自动完成控件
    $.fn.AtawMultiSelector = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawMultiSelector", options);
    };
    $.AKjs.AtawMultiSelector = function (options) {
        return $.extend({}, $.AKjs.AtawBaseSelector(options), new AtawMultiSelector()).sysCreator();
    };
    //控制div的显示效果
    //var spanindex = 0;
    function AtawMultiSelector() {
        this.$Box = $("<div class='input-group'></div>"); //控件容器
        this.$SelectButton = $("<a  class='btn btn-primary btn-xs'><i class=\"icon-external-link fa fa-external-link ACT-SELECT-ITEM\"></i></a>");
        this.$DataSelectedTableContent = $("<div class=\"diaLog clearfix\"></div>");
        this.$DataTable = $("<div class='row'>" +
                               "<div class='row'>" +
                               "<div class='col-md-4 search-box input-group m-l'>" +
                                    "<input type='text' class='ACT-SEARCH-BOX form-control'/>" +
                                    "<span class='input-group-btn'><a class='ACT-SEARCH-BUTTON btn btn-xs btn-primary icon-search fa fa-search '></a></span></div></div>" +
                                "<div class='col-md-6 ask-multi'>" +
                                    "<div class='choose'>" +
                                        "<div class='chooes_User'>" +
                                            //"<div class='ACT-DATA-CONTAINER'> "+
                                                //"<div class='ACT-LOADING'>数据加载中...</div></div>
                                                "</div></div>" +
                                    "<div class='choose_UserCon'>" +
                                        "<dl class='nav nav-pills '></dl></div></div>" +
                                "<div class='col-md-5 ask-multi clear'>" +
                                    "<div class='pickOn'>" +
                                        "<div class='pickOn_User'></div>" +
                                        "<div class='pickOn_UserCon'>" +
                                            "<ul  class=\"nav nav-pills\"></ul></div></div></div>" +
                                "<div class='Pager col-md-12'><div class='PagerCenter ACT-PAGER'></div></div></div>");
        this.$Win = null;
        this.SelectedItems = {};
        //this.ChangeEventFun = null;
        this.DocumentEvent = null;
        this.PageSize = 28;
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            var _this = this;
            this.AtawBaseSelectorControl_init();
            this.$JObjText.addClass("ACT-TEXT ");
            this.$JObj.append(this.$Box);
            this.$Box.append(this.$JObjText);
            this.$Box.append("<span class='input-group-btn'/>");
            this.$Box.find(".input-group-btn").append(this.$SelectButton);
            var _jObj = this.$JObj;
            var _jObjSearchBox = this.$JObjText;
            var _dataTable = this.$DataTable;
            var _options = this.Options;
            _dataTable.attr("keyid", $.AKjs.getUniqueID());
            this.$DataSelectedTableContent.append(this.$DataTable);
            //生成已选
            var codeConfigs = this.getCodeConfigs();
            for (var i = 0; i < codeConfigs.length; i++) {
                this.SelectedItems[codeConfigs[i].CODE_VALUE] = this.createSelectedItems(codeConfigs[i]);
            }
            //控件选择按钮
            this.$SelectButton.click(function () {
                _dataTable.find(".ACT-SEARCH-BOX").val("");
                _dataTable.find(".ACT-LOADING").hide();
                _dataTable.find("ul").html("");
                _this.SelectedItems = {};
                var _dv = _this.dataValue();
                if (_dv != null && _dv != "" && _dv != " ") {
                    var _selectedCodeValue = _dv.AreplaceAll('"', "").split(",");
                    var _selectedCodeText = _this.$JObjText.val().split(",");
                    var codedata = [];
                    for (var i = 0; i < _selectedCodeValue.length; i++) {
                        codedata[i] = { CODE_VALUE: _selectedCodeValue[i], CODE_TEXT: _selectedCodeText[i] };
                        _this.SelectedItems[_selectedCodeValue[i]] = _this.createSelectedItems(codedata[i]);
                        _dataTable.find("ul").append(_this.createSelectedItems(codedata[i]));
                    }
                }
                _searchFun("", "select");
                _this.winOpen();
                //搜索按钮
                _dataTable.find(".ACT-SEARCH-BUTTON").bind("click", function () {
                    _searchFun(_dataTable.find(".ACT-SEARCH-BOX").val(), "search");
                });
            });
            function _searchFun(key, btn, pageIndex) {
                _dataTable.find(".ACT-LOADING").show();
                if (_this.$DataTable.find(".ACT-PAGE-SIZE").length > 0 && _this.$DataTable.find(".ACT-PAGE-SIZE").eq(0).val() != "") {
                    var __size = parseInt(_this.$DataTable.find(".ACT-PAGE-SIZE").eq(0).val());
                    if (__size != _this.PageSize) {
                        // _size = __size;
                        pageIndex = 0;
                    }
                    _this.PageSize = __size;
                };



                $.AKjs.getJSON("/core/Selector/Search", {
                    ds: _this.getPostDsStr(),
                    pageIndex: pageIndex,
                    //  PageSize: _size,
                    regName: _this.RegName,
                    key: key,
                    callback: Math.random(),
                    "PageSize": _this.PageSize,
                },
                function (data) {
                    _dataTable.find(".ACT-LOADING").hide();
                    var _response = data.List;
                    var _item;
                    var _dataTabledl = _dataTable.find("dl").html("");
                    var _dataTableul = _dataTable.find("ul");
                    var codeData = null;
                    var _items = [];
                    $.each(_response, function (i, n) {
                        _item = $("<li class=\"diaLog_User  nav-item  \" ><a class=\"nav-link\" val=\"" + n.CODE_VALUE + "\">" + n.CODE_TEXT + "</a></li>");
                        _item.data("codeData", n);
                        codeData = _item.data("codeData");
                        _item.click(function () {
                            codeData = $(this).data("codeData");
                            $(this).css("background", "#DCEFFE");
                            for (var k in _this.SelectedItems) {
                                if (k == codeData.CODE_VALUE) {
                                    return false;
                                }
                            }
                            var _seletedItem = _this.createSelectedItems(codeData);
                            _this.SelectedItems[codeData.CODE_VALUE] = _seletedItem;
                            _dataTableul.append(_seletedItem);
                        });
                        var seleitem = _this.SelectedItems[codeData.CODE_VALUE];
                        if (seleitem != undefined) {
                            _item.css("background", "#DCEFFE");
                        }
                        _items.push(_item);
                    });
                    _dataTabledl.append(_items);
                    //分页处理
                    var _pageIndex, _TotalRecords, _pageCount, _PageSize;
                    _pageIndex = data.Index;
                    _PageSize = data.Size;
                    _TotalRecords = data.Total;
                    _pageCount = (_TotalRecords + _PageSize - 1) / _PageSize;
                    //if (_TotalRecords > _PageSize) {
                        _this.asynJs("/AtawStatic/lib/03Extend/myPagination/jquery.myPagination.js", function () {
                            var $pager = _this.$DataTable.find(".ACT-PAGER");
                            $pager.myPagination({
                                panel: {
                                    tipInfo_on: true,
                                    tipInfo: "<span>{currText}/{sumPage}页</span>",
                                },
                                info: { msg_on: true, PageSize: _PageSize },
                                currPage: _pageIndex + 1,
                                pageCount: parseInt(_pageCount),
                                totalRecords: _TotalRecords,
                                ajax: {
                                    onClick: function (pageIndex) {
                                        _searchFun(null, "page", pageIndex - 1);
                                    }
                                }
                            })
                            if ($pager.find("ul").length === 0) {
                                $pager.wrapInner('<ul class="pagination pagination-sm" />');
                            }
                            else {
                                $pager.find("ul").addClass("pagination");
                            }
                        });
                    //}
                    //else {
                    //    var $pager = _this.$DataTable.find(".ACT-PAGER");
                    //    var _$p = $pager.parent();
                    //    _$p.clear();
                    //    _$p.append($('<div class="PagerCenter ACT-PAGER"></div>'));
                    //}
                });
            }
            this.DocumentEvent = function (e) {
                var target = $(e.target);
                if (target.closest(".ACT-AUTOCOMPLETE .autocomplete").length == 0) {
                    if (_this && _this.$AutoComplete && _this.$AutoComplete.hide) {
                        _this.$AutoComplete.hide();
                    }
                }
            };
            $(document).bind("click", this.DocumentEvent);
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createSelectedItems", function (codeData) {
            var _this = this;
            var _seletedItem = $("<li class=\"pickOn_diaLog_User nav-item\"><a class=\"nav-link\" val=\"" + codeData.CODE_VALUE + "\">" + codeData.CODE_TEXT + "</a></li>");
            var del = $('<i class="icon-remove fa fa-close pull-right"></i>');
            del.click(function () {
                for (var seletedItem in _this.SelectedItems) {
                    if (seletedItem == $(this).prev().attr("val")) {
                        $(".diaLog_User a").each(function () {
                            _$selA = $(this);
                            if (_$selA.attr("val") == seletedItem) {
                                _$selA.parent().css("background", "");
                                _$selA.parent().find(".selItme").remove();
                            }
                        });
                        delete _this.SelectedItems[seletedItem];
                    }
                }
                $(this).parent().remove();
            });
            _seletedItem.append(del);
            return _seletedItem;
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "winOpen", function () {
            var _this = this;
            var myTitle = "请选择";
            if (this.Options != null && this.Options.DisplayName != null && this.Options.DisplayName != "") {
                myTitle = "请选择" + this.Options.DisplayName;
            }
            if (this.$Win == null || this.$DataSelectedTableContent.AtawControl() == null) {
                this.$DataSelectedTableContent.AtawWindow({
                    Title: myTitle,
                    Width: "80%",
                    Fixed: true,
                    WindowCloseFun: function () {
                    },
                    Button: [
                        {
                            name: '确定',
                            callback: function () {
                                var codeTexts = [];
                                var codeValues = [];
                                for (seletedItem in _this.SelectedItems) {
                                    codeTexts.push(_this.SelectedItems[seletedItem].find("a").text());
                                    codeValues.push(("\"" + _this.SelectedItems[seletedItem].find("a").attr('val') + "\""));
                                }
                                _this.$JObjText.val(codeTexts.toString());
                                _this.setDataText($(this).attr("txt"));
                                //   _this.dataValue(codeValues.toString());

                                _this.DataValue.setValue(codeValues.toString());
                                _this.triggerChangeEvent();
                                this.hide();
                                return false;
                            },
                            focus: true
                        }]
                });
            }
            this.$Win = this.$DataSelectedTableContent.AtawControl();
            this.$Win.open();
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setDefaultData", function (codeValue, codeText) {
            if (!this.SelectedItems[codeValue]) {
                var _seletedItem = this.createSelectedItems({ CODE_VALUE: codeValue, CODE_TEXT: codeText });
                this.SelectedItems[codeValue] = _seletedItem;
                var codeTexts = [];
                var codeValues = [];
                for (seletedItem in this.SelectedItems) {
                    codeTexts.push(this.SelectedItems[seletedItem].find("a").text());
                    codeValues.push(("\"" + this.SelectedItems[seletedItem].find("a").attr('val') + "\""));
                }
                this.$JObjText.val(codeTexts.toString());
                this.setDataText($(this).attr("txt"));
                this.dataValue(codeValues.toString());
            }
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dispose", function () {
            var _dataTable = this.$DataTable;
            if (_dataTable) {
                _dataTable.find(".ACT-SEARCH-BUTTON, .pageDown, .pageUp, .pageHome, .pageEnd, .pageIndex").unbind();
                this.$SelectButton.unbind();
            }
            this.AtawBaseDom_dispose();
        });
    }
})(jQuery);
