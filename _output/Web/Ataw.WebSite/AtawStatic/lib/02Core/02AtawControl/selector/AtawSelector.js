(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};
    //var PagingRules = 28;
    //var pagBtnNum = 2;
    //自动完成控件
    $.fn.AtawSelector = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawSelector", options);
    }
    $.AKjs.AtawSelector = function (options) {
        return $.extend({}, $.AKjs.AtawAutoCompleted(options), new AtawSelector());
    }
    /// <reference path="../../../../../Content/bootstrap/v3/css/non-responsive.css" />


    //控制div的显示效果
    //var spanindex = 0;
    function AtawSelector() {
        this.$SelectButton = $("<a class='btn btn-primary btn-xs'><i class=\"  icon-external-link fa fa-external-link ACT-SELECT-ITEM    \"></i></a>");
        //<img   border=0  src='/ico/magnifier.png' class=\"ACT-SELECT-ITEM  inputAutoBtn \" />
        this.$DataTable = $("<div class=\"ACT-DATA-CONTAINER\"><div class=\"search-box input-group\"><input type=\"text\" class=\"ACT-SEARCH-BOX form-control\"/><a class='ACT-SEARCH-BUTTON input-group-addon btn-primary'><i class=\" icon-search fa fa-search   \"></i></a></div><div class=\"ACT-LOADING\">数据加载中...</div>" +
        "<div class=\" ACT-DATALIST\" style=\"padding: 8px 0;\">" +
         "<ul class=\"ACT-LIST nav nav-pills ask-multi clearfix\"/>" +
         "<div class='Pager'><div class='PagerCenter ACT-PAGER'></div></div>" +
        "</div>");
        this.$Win = null;

        this.DocumentEvent = null;
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            var _this = this;
            this.AtawAutoCompletedControl_init();
            this.$Box.append("<span class='input-group-btn'/>");
            this.$Box.find(".input-group-btn").append(this.$SelectButton);
            var _jObjSearchBox = this.$JObjText;
            var _dataTable = this.$DataTable;
            var _page = 1;
            var _sunPage = 1;
            _dataTable.attr("keyid", $.AKjs.getUniqueID());
            this.$DataTable.find(".ACT-SEARCH-BUTTON").off("click").on("click", function () {
                _searchFun(_this.$DataTable.find(".ACT-SEARCH-BOX").val(), 0);
            });
            //选择按钮事件
            this.$SelectButton.off("click").on("click",function () {
                _this.$AutoComplete.hide();
                _dataTable.find(".ACT-LOADING").hide();
                _dataTable.find(".ACT-SEARCH-BOX").val(_jObjSearchBox.val());
                _searchFun();
                _this.winOpen();
                _this.$DataTable.find(".ACT-SEARCH-BUTTON").off("click").on("click", function () {
                    _searchFun(_this.$DataTable.find(".ACT-SEARCH-BOX").val(), 0);
                });

            });
            function _searchFun(key,pageIndex,_size) {
                _dataTable.find(".ACT-LOADING").show();
                $.AKjs.getJSON("/core/Selector/Search", {
                    ds: _this.getPostDsStr(),
                    pageIndex: pageIndex,
                    PageSize:_size,
                    regName: _this.RegName,
                    key: key,
                    callback: Math.random()
                }, function (data) {
                    _dataTable.find(".ACT-LOADING").hide();
                    var _response = data;
                    var _strb = "";
                    for (var i = 0; i < _response.List.length; i++) {
                        var _g = $("<span>" + _response.List[i].CODE_TEXT + "</span>").text();
                        _strb += ("<li class='nav-item'><a class=\"ACT-SELECT-CURRENT \" txt=\"" + _g + "\" val=\"" + _response.List[i].CODE_VALUE + "\">" + _response.List[i].CODE_TEXT + "</a></li>");
                    }
                    _dataTable.find(".ACT-LIST").html(_strb);
                    _dataTable.find(".ACT-SELECT-CURRENT").off("click").on("click",function () {
                        _jObjSearchBox.val($(this).attr("txt"));
                        _this.dataValue_Set($(this).attr("val"));
                        _this.setDataText($(this).attr("txt"))
                        _this.triggerChangeEvent();
                        _this.$Win.close();
                    });
                    
                    var _pageIndex, _TotalRecords, _pageCount, _PageSize;
                    _pageIndex = _response.Index;
                    _PageSize = _response.Size;
                    _TotalRecords = _response.Total;
                    _pageCount = (_TotalRecords + _PageSize - 1) / _PageSize;
                    //if (_TotalRecords > _PageSize) {
                        _this.asynJs("/AtawStatic/lib/03Extend/myPagination/jquery.myPagination.js", function () {
                            var $pager = _this.$DataTable.find(".ACT-PAGER");
                            $pager.myPagination({
                                info: { msg_on: true, PageSize: _PageSize },
                            currPage: _pageIndex + 1,
                            pageCount: parseInt(_pageCount),
                            totalRecords: _TotalRecords,
                            ajax: {
                                onClick: function (pageIndex) {
                                    var _tempSize = _PageSize;
                                    var _size = parseInt($pager.find(".ACT-PAGE-SIZE").val());
                                    if (!isNaN(_size) && _size > 0) {
                                        _PageSize = _size;
                                        if (_tempSize != _PageSize) {
                                            pageIndex = 1;
                                        }
                                    }
                                    _searchFun(null,pageIndex-1,_size);
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
        })

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initData", function () {

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "winOpen", function () {
            var myTitle = "请选择";
            if (this.Options != null && this.Options.DisplayName != null && this.Options.DisplayName != "") {
                myTitle = "请选择" + this.Options.DisplayName;
            }
            if (this.$Win == null || this.$DataTable.AtawControl() == null) {
                this.$DataTable.AtawWindow({
                    Title: myTitle,
                    //activate: function () { _this.winPositionFun(); },
                    Width: "80%",
                    // Fixed: true
                });

            }
            //	this.$DataTable.css({ "height": "300px", "overflow": "auto" });

            this.$Win = this.$DataTable.AtawControl();
            this.$Win.open();

           
            //alert();
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "createItem", function () {
            return $("<TextArea  placeholder='请选择'  class='input-border form-control ask-input'   />");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dispose", function () {
            var _dataTable = this.$DataTable;
            if (_dataTable) {
                _dataTable.find(".ACT-SEARCH-BUTTON, .pageDown, .pageUp, .pageHome, .pageEnd, .pageIndex").unbind();
                this.$SelectButton.unbind();
                $(document).unbind("click", this.DocumentEvent);
            }
            this.AtawBaseDom_dispose();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setDefaultData", function (codeValue, codeText) {
            this.$JObjText.val(codeText);
            this.dataValue(codeValue);
            this.setDataText(codeText);
        });
    }
})(jQuery);
