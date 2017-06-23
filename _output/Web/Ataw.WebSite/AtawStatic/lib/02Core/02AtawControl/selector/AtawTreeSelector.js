(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};
    //自动完成控件
    $.fn.AtawTreeSelector = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawTreeSelector", options);
    }

    //继承基类
    $.AKjs.AtawTreeSelector = function (options) {
        return $.extend({}, $.AKjs.AtawBaseSelector(options), $.AKjs.AtawSelectorWinBase(options), new AtawTreeSelector());
    }


    //控制div的显示效果
    var spanindex = 0;
    function AtawTreeSelector() {
        this.$AutoComplete = $("<div class=\"ACT-AUTOCOMPLETE autocomplete\"></div>");
        this.$SelectButton = $("<img   border=0  src='/ico/magnifier.png' class=\"ACT-SELECT-ITEM  inputAutoBtn \" />");
        this.$TreeMenu = $("<div  class=\"ATAW-TREE-MENU\" style=\"height:150px;overflow:auto;background: none repeat scroll 0 0 #F0F6E4;\"><ul  class=\"ztree\" style=\"margin-top:0; width:140px;\"></ul>\</div>");
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            this.AtawBaseSelectorControl_init();
            var _jObj = this.$JObj;
            var _jObjSearchBox = this.$JObjText;
            var _jObjSelectButton = this.$SelectButton;
            var _jObjAutoComplete = this.$AutoComplete;
            var _dataTable = this.$DataTable;
            var _jObjTreeMenu = this.$TreeMenu;
            var _options = this.Options;
            // var _dd = this.winPositionFun();
            var _win = this.$Win;
            _jObj.append(_jObjSearchBox);
            _jObj.append(_jObjSelectButton);
            _jObj.append(_jObjAutoComplete);
            _dataTable.append(_jObjTreeMenu);

            _jObjSearchBox.bind("keyup click", function (event) {
                _keyboardEvent(event);
            })

            _jObjSearchBox.blur(function () {
                var _len = _jObjAutoComplete.find("span[txt='" + $(this).val() + "']").length;
                if (_len == 0 && $(this).val("") != "") {
                    $(this).val("");
                    _this.dataValue("");
                }
            });

            _jObjAutoComplete.mouseleave(function () {
                $(this).hide();
            });

            var _this = this;
            var _keyboardEvent = function (event) {
                var _offset = _jObjSearchBox.offset();
                _jObjAutoComplete.css({ left: _offset.left + "px", top: _offset.top + _jObjSearchBox.outerHeight() + "px", width: (_jObjSearchBox.width() + 10) + "px" }).slideDown("fast");
                var _code = event.keyCode || event.which;
                if ((_code != 13) && (_code < 37 || _code > 40)) {
                    $.AKjs.getJSON("/core/Selector/AutoComplete",
                    {
                        ds: _this.getPostDsStr(),
                        regName: _this.RegName,
                        key: _jObjSearchBox.val(),
                        callback: Math.random() 
                    }, function (data) {
                        _jObjAutoComplete.html("");
                        var _response = data;
                        if (data.length > 0) {
                            var _strb = $.AKjs.CreateBuffer("");
                            $.each(_response, function (i, n) {
                                _strb.ad("<span spn='" + i + "' val=\"" + n.CODE_VALUE + "\" txt=\"" + n.CODE_TEXT + "\">" + n.CODE_TEXT + "</span>");
                            })
                            _jObjAutoComplete.append(_strb.toString());
                            spanindex = 0;
                            _jObjAutoComplete.show();
                            _jObjAutoComplete.width(_jObjSearchBox.width());
                            //默认选择第一个
                            _jObjAutoComplete.find("span:eq(0)").css({ backgroundColor: '#03439D', color: '#fff' });
                        } else {
                            _jObjSearchBox.val("");
                            _this.dataValue("");
                            _jObjAutoComplete.hide();
                        }

                        _jObjAutoComplete.find("span[spn]").click(function () {
                            _jObjSearchBox.val($(this).text());
                            _this.dataValue($(this).attr("val"));
                            spanindex = $(this).attr("spn");
                        }).hover(function () {
                            _jObjAutoComplete.find("span[spn]").css({ backgroundColor: '#fff', color: '#00449a' });
                            $(this).css({ backgroundColor: '#03439D', color: '#fff' });
                            spanindex = $(this).attr("spn");
                        });
                    });
                }
                else {
                    if (_code == 13) {
                        _jObjSearchBox.val(_jObjAutoComplete.find("span[spn=" + spanindex + "]").text());
                        _this.dataValue(_jObjAutoComplete.find("span[spn=" + spanindex + "]").attr("val"));
                        _jObjAutoComplete.hide();
                    }
                    else {
                        if (_jObjAutoComplete != null) {
                            var arr = _jObjAutoComplete.find("span[spn]").length;
                            if (_code == 39 || _code == 40)//下或右
                            {
                                if (spanindex < arr - 1) {
                                    spanindex++;
                                    _jObjAutoComplete.find("span[spn=" + spanindex + "]").css({ backgroundColor: '#03439D', color: '#fff' });
                                    var spanindexup = spanindex - 1;
                                    _jObjAutoComplete.find("span[spn=" + spanindexup + "]").css({ backgroundColor: '#fff', color: '#00449a' });
                                    _jObjSearchBox.val(_jObjAutoComplete.find("span[spn=" + spanindex + "]").text());
                                    _this.dataValue(_jObjAutoComplete.find("span[spn=" + spanindex + "]").attr("val"));
                                }
                            }
                            else if (_code == 37 || _code == 38)//上或左
                            {
                                if (spanindex > 0) {
                                    spanindex--;
                                    _jObjAutoComplete.find("span[spn=" + spanindex + "]").css({ backgroundColor: '#03439D', color: '#fff' });
                                    var spanindexbtm = spanindex + 1;
                                    _jObjAutoComplete.find("span[spn=" + spanindexbtm + "]").css({ backgroundColor: '#fff', color: '#00449a' });
                                    _jObjSearchBox.val(_jObjAutoComplete.find("span[spn=" + spanindex + "]").text());
                                    _this.dataValue(_jObjAutoComplete.find("span[spn=" + spanindex + "]").attr("val"));
                                }
                            }
                        }
                    }
                }
            }

            //选择按钮事件
            _jObjSelectButton.click(function () {
                _jObjAutoComplete.hide();
                _dataTable.find(".ACT-LOADING").hide();
                _dataTable.find(".ACT-SEARCH-BOX").val("");
                _searchFun("");

                function _searchFun(key) {
                    if (key != "") {
                        _jObjTreeMenu.hide();
                        _dataTable.find(".ACT-LOADING").show();
                        $.AKjs.getJSON("/core/Selector/Search", { regName: "USER_CONFIG1", key: key, callback: Math.random() }, function (data) {
                            _dataTable.find(".ACT-LOADING").hide();
                            _dataTable.find("dd").remove();
                            var _response = data;
                            var _strb = $.AKjs.CreateBuffer("");
                            $.each(_response, function (i, n) {
                                _strb.ad("<dd class=\"bg\"><span  class=\"ACT-SELECT-CURRENT select-item\" txt=\"" + n.CODE_TEXT + "\" val=\"" + n.CODE_VALUE + "\">" + n.CODE_TEXT + "</span></dd>");
                            })
                            _dataTable.find("dl").append(_strb.toString());
                            _dataTable.find(".ACT-SELECT-CURRENT[txt=\"" + _jObjSearchBox.val() + "\"]").css({ backgroundColor: '#03439D', color: '#fff' });
                            _dataTable.find(".ACT-DATALIST").show();
                            _dataTable.find(".ACT-SELECT-CURRENT").click(function () {
                                _jObjSearchBox.val($(this).attr("txt"));
                                _this.dataValue($(this).attr("val"));
                                _win.close();
                            });
                        });
                    } else {
                        _dataTable.find(".ACT-DATALIST").hide();
                        _jObjTreeMenu.show();
                    }
                }

                //模糊查询
                _dataTable.find(".ACT-SEARCH-BUTTON").bind("click", function () {
                    _searchFun(_dataTable.find(".ACT-SEARCH-BOX").val());
                });
                _win.open();
            });
            //树形选择器初始化配置
            var _setting = {
                data:
                {
                    key:
                    {
                        name: "CODE_TEXT",
                        title: "CODE_VALUE",
                        children: "Children"
                        //url: _url
                    }
                },
                async: {
                    enable: true,
                    autoParam: ["id"],
                    url: getUrl
                },
                callback: {
                    onClick: onClick
                }
            };
            $.fn.zTree.init(_jObjTreeMenu.find(".ztree"), _setting);

            function getUrl(treeId, treeNode) {
                var _url = "/core/Selector/LoadTree?regName=" + _options.RegName;
                if (_options.DataValue && _options.DataValue != "") {
                    _url = _url + "&id=" + _options.DataValue;
                }
                return _url;
            }
            //选择节点后触发事件
            function onClick(e, treeId, treeNode) {
                _jObjSearchBox.val(treeNode.CODE_TEXT);
                _this.dataValue(treeNode.CODE_VALUE);
                _win.close();
            }
        })
    }
})(jQuery);
