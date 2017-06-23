(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.fn.AtawMomery = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawMomery", options);
    }

    //类的构造函数
    $.AKjs.AtawMomery = function (options) {

        return $.extend({}, $.AKjs.AtawSelector(options), new AtawMomery()).sysCreator();
    }

    function AtawMomery() {
        this.DocumentEvent = null;
        this.$SelectButton = $("<a class='btn btn-primary btn-xs'><i class=\"     icon-upload-alt fa fa-upload ACT-SELECT-ITEM    \"></i></a>");
        this.autoUrl = "/core/momery/AutoComplete";
        this.$DataTable = $("<div class=\"ACT-DATA-CONTAINER\"><div class=\"search-box\"><input type=\"text\" class=\"ACT-SEARCH-BOX\"/>&nbsp;<button class='ACT-SEARCH-BUTTON'><i class=\" icon-search fa fa-search   \"></i></button>&nbsp;&nbsp;<button class='ACT-ADD'><i class=' icon-plus fa fa-plus'></i></button></div><div class=\"ACT-LOADING\">数据加载中...</div>" +
       "<div class=\" ACT-DATALIST\" style=\"padding: 8px 0;\">" +
        "<ul class=\"ACT-LIST nav nav-pills ask-multi clearfix\"/>" +
        "<div class='Pager'><div class='PagerCenter ACT-PAGER'></div></div>" +
       "</div>");

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
        });

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
            this.$SelectButton.off("click").on("click", function () {
                _this.$AutoComplete.hide();
                _dataTable.find(".ACT-LOADING").hide();
                _dataTable.find(".ACT-SEARCH-BOX").val(_jObjSearchBox.val());
                _searchFun();
                _this.winOpen();
                _this.$DataTable.find(".ACT-SEARCH-BUTTON").off("click").on("click", function () {
                    _searchFun(_this.$DataTable.find(".ACT-SEARCH-BOX").val(), 0);
                });
                _this.$DataTable.find(".ACT-ADD").off("click").on("click", function () {
                   // alert();
                    var _key = _this.$DataTable.find(".ACT-SEARCH-BOX").val();
                    if (_key && _key != "") {
                        $.AKjs.getJSON("/core/momery/Add", {
                            ds: _this.getPostDsStr(),
                            text: _key,
                            regName: _this.RegName,
                            callback: Math.random()
                        }, function (data) {
                            if (data > 0) {
                                _this.$DataTable.find(".ACT-SEARCH-BOX").val("");
                                _searchFun("", 0);

                            }
                        });
                    }

                });
            });
            function _searchFun(key, pageIndex,_size) {
                _dataTable.find(".ACT-LOADING").show();
                $.AKjs.getJSON("/core/momery/Search", {
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
                        var _g = $("<span>" + _response.List[i] + "</span>").text();
                        _strb += ("<li class='nav-item'><a class=\"ACT-SELECT-CURRENT \" txt=\"" + _g + "\" val=\"" + _response.List[i] + "\">" + _response.List[i] + "</a><a class='ACT-REMOVE'  val='"+_response.List[i]+"' ><i class='icon-remove fa fa-times'></i></a></li>");
                    }
                    _dataTable.find(".ACT-LIST").html(_strb);
                    _dataTable.find(".ACT-SELECT-CURRENT").click(function () {
                        _jObjSearchBox.val($(this).attr("txt"));
                        _this.dataValue($(this).attr("val"));
                        _this.setDataText($(this).attr("txt"))
                        _this.triggerChangeEvent();
                        _this.$Win.close();
                    });
                    _dataTable.find(".ACT-REMOVE").click(function () {
                        var _txt = $(this).attr("val");
                        $.AKjs.getJSON("/core/momery/Remove", {
                            ds: _this.getPostDsStr(),
                            text: _txt,
                            regName: _this.RegName,
                            callback: Math.random()
                        }, function (data) {
                            if (data > 0) {
                                _this.$DataTable.find(".ACT-SEARCH-BOX").val("");
                                _searchFun("", 0);

                            }
                        });


                    });
                    var _pageIndex, _TotalRecords, _pageCount, _PageSize;
                    _pageIndex = _response.Index;
                    _PageSize = _response.Size;
                    _TotalRecords = _response.Total;
                    _pageCount = (_TotalRecords + _PageSize - 1) / _PageSize;
                    if (_TotalRecords > _PageSize) {
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
                                        _searchFun(null, pageIndex - 1, _size);
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
                    }
                    else {
                        var $pager = _this.$DataTable.find(".ACT-PAGER");
                        var _$p = $pager.parent();
                        _$p.clear();
                        _$p.append($('<div class="PagerCenter ACT-PAGER"></div>'));
                    }
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
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "createItem", function () {
            return $("<input  placeholder='请输入' type='text' class='input-border form-control ask-input'   />");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "searchComplete", function ($input) {
            //$input.val("");
            //this.dataValue("");
            //this.DataValue.setValue("");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setDefaultText", function () {
            //this.AtawBaseControl_dataValue_Set(opt_str);
            //var _text = "";
            if (this.DataValue.DataText) {
                this.DataText = this.DataValue.DataText.getValue();
            }
            else {
               
                this.DataText = this.DataValue.getValue();
            }
            if (this.DataText) {
                this.$JObjText.val(this.DataText.AgetTextByHtml());
            }
            else
                this.$JObjText.val("");
           
        });
       

    }
})(jQuery);