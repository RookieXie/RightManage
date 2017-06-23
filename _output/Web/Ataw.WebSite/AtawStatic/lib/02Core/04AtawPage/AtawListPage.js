(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.AKjs.AtawListPage = function (options) {
        return $.extend({}, $.AKjs.AtawViewPage(options), new AtawListPage()).sysCreator();
    }

    $.fn.AtawListPage = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawListPage", options);
    }
    $.AKjs.GotoMobilePage = function (page) {
        var _xml = page.RegName;
        var _url = "/Mobile/page/list?xml=" + _xml;
        window.open(_url);
    }
    $.AKjs.GotoReportPage = function (page) {
        var _xml = page.RegName;
        var _url = "/Report/TableReport.aspx?xml=" + _xml;
        window.open(_url);
    }
    $.AKjs.GotoQing = function (page) {
        var _xml = page.RegName;
        var _url = "/qing/home/index?xml=" + _xml;
        window.open(_url);
    }
    $.AKjs.CreateDesktopShortcut = function (page) {
        page.createDesktopShortcutWin();
    }

    $.AKjs.OutExcel = function (page) {
        // page.createDesktopShortcutWin();
        var _formObj = page.FormObjs[page.ListFormName];
        _formObj.postData(1);
    }

    function AtawListPage() {
        this.$FormTypeBtn = $('<div class="formTypeBtnBar pull-right"/>');
        this.$ButtonBar = $('<span class="ButtonBar "/>');
        // this.$Search
        this.$ButtonContainer = null;
        this.TotalRecords = 0;
        this.PageSize = 7; //默认配置页码大小
        //this.$AtawWindow = null; //弹出窗
        //this.AtawWindow = null;
        this.PageIndex = 1; //当前页索引
        this.ListFormName = null;
        this.SearchFormName = null;
        this.ListForm = null;
        this.FormObj = null;
        this.AfterSearchCustomFun = null; //自定义列表页面搜索后的自定义事件
        this.OnSingleCheckBoxFun = null;

        //事件钩子
        // this.OnPageAfterFun = null; //页面类型，页面对象： void
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getTableNameByForm", function (formName) {
            return this.Forms[formName].TableName;
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.AtawViewPage_creator();
            if (this.IsValid) {
                if (this.Options.ListFormName == null) {
                    this.ListFormName = $.AKjs.GetProValueFirst(this.Options.Forms).Name;
                } else {
                    this.ListFormName = this.Options.ListFormName;
                }
                if (this.Options.SearchFormName == null) {
                    this.SearchFormName = this.Options.ListFormName + "_SEARCH";
                } else {
                    this.SearchFormName = this.Options.SearchFormName;
                }
                this.ListForm = this.Forms[this.ListFormName];
                this.FormObj = this.FormObjs[this.ListFormName];
                this.TotalRecords = this.Data[this.ListForm.TableName + "_PAGER"][0].TotalCount;
                this.PageSize = this.Data[this.ListForm.TableName + "_PAGER"][0].PageSize;
                this.PageStyle = "List";
                this.setProByOptName("OnPageAfterFun", "OnPageAfterFun");
                //OnSingleCheckBoxFun
                this.setProByOptName("OnSingleCheckBoxFun", "OnSingleCheckBoxFun");
                this.setProByOptName("AfterSearchCustomFun", "AfterSearchCustomFun");
                this.FormObj["IsInner"] = true;
                this.createHashTableObj();
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initForms", function () {

            if (this.IsValid) {


                this.PageIndex = 1;

                if (!this.ListForm.HaveNoSwitchForm) {
                    this.initFormTypeButton();
                }
                if (!this.ListForm.HaveNoSortBar) {
                    this.initsortBarButton();
                }

                this.FormObj.AfterPageSearchFun = this.AfterSearch();
                this.$Submit.hide();
                this.$Submit2.hide();

            }
            this.AtawViewPage_initForms();


        });

        //为每一行checkbox加key和buttons属性
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initRowCheck", function () {

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "afterAsyInit", function () {
            this.AtawBasePage_afterAsyInit();
            var _this = this;
            _this.bindEvent(_this);
            _this.customJs(null, _this.$JObj);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "bindEvent", function (obj, pageIndex) {
            //  var _this = this;
            // alert();
            var _this = obj;
            //全选事件
            _this.$JObj.find(".ACT-CHECK-ALL").unbind("click").bind("click", function () {
                var parObj = _this.FormObj.$FormContent;
                if ($(this).attr("ichecked") == "false") {
                    parObj.find(".ACT-CHECK-SINGLE").removeClass("icon-check-empty fa fa-square-o").addClass("icon-check fa fa-check-square-o");
                    $(this).removeClass("icon-check-empty fa fa-square-o").addClass("icon-check fa fa-check-square-o");
                    $(this).attr("ichecked", true);
                } else {
                    parObj.find(".ACT-CHECK-SINGLE").removeClass("icon-check fa fa-check-square-o").addClass("icon-check-empty fa fa-square-o");
                    $(this).removeClass("icon-check fa fa-check-square-o").addClass("icon-check-empty fa fa-square-o");
                    $(this).attr("ichecked", false);
                }
                parObj.find(".ACT-CHECK-SINGLE").attr("ichecked", $(this).attr("ichecked"));
                _this.KeyValues = [];
                _this.$JObj.find(".ACT-CHECK-SINGLE").each(function () {

                    if ($(this).attr("ichecked") == "true") {
                        $(this).removeClass("icon-check-empty fa fa-square-o").addClass("icon-check fa fa-check-square-o");
                        _this.KeyValues.push($(this).attr("key"));
                    }
                    else {
                        $(this).removeClass("icon-check fa fa-check-square-o").addClass("icon-check-empty fa fa-square-o");
                    }
                });

                //if (!FormObj.ParentPageObj || FormObj.ParentObj.PageStyle != "List") {
                _this.initDataButton();
                //}

            })
            //单选事件
            _this.$JObj.find(".ACT-CHECK-SINGLE").unbind("click").bind("click", function () {
                var $checkdata = $(this);
                var $check = $checkdata.parent().find(".icon-check");
                if ($check.length != 0) {
                    $checkdata.removeClass("icon-check fa fa-check-square-o").addClass("icon-check-empty fa fa-square-o");
                    $checkdata.css("color", "");
                    $checkdata.attr("ichecked", false);
                } else {
                    $checkdata.removeClass("icon-check-empty fa fa-square-o").addClass("icon-check fa fa-check-square-o");
                    $checkdata.css("color", "#000");
                    $checkdata.css("font-weight", "bold");
                    $checkdata.attr("ichecked", true);
                }
                if (_this.$JObj.find(".ACT-CHECK-ALL").attr("ichecked") == "true") {
                    _this.$JObj.find(".ACT-CHECK-ALL").removeClass("icon-check fa fa-check-square-o").addClass("icon-check-empty fa fa-square-o");
                    _this.$JObj.find(".ACT-CHECK-ALL").attr("ichecked", false);
                } else {
                    var f = 0;
                    _this.$JObj.find(".ACT-CHECK-SINGLE").each(function () {
                        if ($(this).attr("ichecked") == "false") {
                            f = 1;
                            return false;
                        }
                    });
                    if (f == 0) {
                        _this.$JObj.find(".ACT-CHECK-ALL").attr("ichecked", true);
                        _this.$JObj.find(".ACT-CHECK-ALL").removeClass("icon-check-empty fa fa-square-o").addClass("icon-check fa fa-square-o");
                    }
                }

                //if (!FormObj.ParentPageObj || FormObj.ParentObj.PageStyle != "List") {

                //}

                _this.KeyValues = [];
                _this.$JObj.find(".ACT-CHECK-SINGLE[ichecked='true']").each(function () {
                    _this.KeyValues.push($(this).attr("key"));
                });

                _this.initDataButton();


                if (_this.OnSingleCheckBoxFun) {
                    _this.OnSingleCheckBoxFun(_this, this);
                }
                return false;
            })
            //下拉菜单式切换
            _this.$FormTypeBtn.find(".ACT-NORMAL-FORM").unbind("click").bind("click", function () {
                _this.FormObj.FormType = 'Normal';
                _this.FormObj.reInitForm();

            })
            _this.$FormTypeBtn.find(".ACT-GRID-FORM").unbind("click").bind("click", function () {
                _this.FormObj.FormType = 'Grid';
                _this.FormObj.reInitForm();

            })
            _this.$FormTypeBtn.find(".ACT-ALBUM-FORM").unbind("click").bind("click", function () {
                _this.FormObj.FormType = 'Album';
                _this.FormObj.reInitForm();

            })
            _this.$FormTypeBtn.find(".ACT-CALENDAR-FORM").unbind("click").bind("click", function () {
                _this.FormObj.FormType = 'Calendar';
                _this.FormObj.reInitForm();

            })
            //排序
            _this.$FormTypeBtn.find(".sortField").unbind("click").bind("click", function () {
                var obj = this;
                var _isAsc = $(obj).attr("isAsc");
                var _sortName = $(obj).attr("sort");
                _this.FormObj.IsASC = _isAsc == "false" ? false : true;
                if (_sortName != "") {
                    if (_isAsc == "false") {
                        $(obj).attr("isAsc", "true");
                        $(obj).find("span").attr("class", "icon-arrow-up fa fa-arrow-up");
                    } else {
                        $(obj).attr("isAsc", "false");
                        $(obj).find("span").attr("class", "icon-arrow-down fa fa-arrow-down");
                    }
                }
                if (_sortName == "Defalut") {
                    $($(obj)[0]).find("span").attr("class", "icon-sign-blank fa fa-square");
                    _sortName = "";
                }
                $(obj).siblings().attr("isAsc", "false");
                $(obj).siblings().find("span").attr("class", "");
                //获取排序字段
                _this.FormObj.SortName = _sortName;
                var curPage = _this.FormObj.$Pager.find(".current").attr("title");
                _this.FormObj.searchDataList(parseInt(curPage));
            });
            this.initPageButton();
            //var _this = this;
            //_this.asynJs([
            // "/AtawStatic/lib/03Extend/floatthead/jquery.floatThead.js"
            // ],
            // function () {
            //     //alert();
            //     _this.$JObj.find(".ACT-GRID-TABLE").floatThead();

            // }
            // );
        });

        //删除操作
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "operateButton", function (pageStyle, key) {
            var _this = this;
            if (pageStyle == "Delete") {
                if (this.KeyValues.length == 0) {
                    Ataw.msgbox.show("请选择要删除的项！", 5, 2000);
                } else {
                    if (confirm("你确定要删除吗?")) {
                        this.deleteRows(_this.deleteForm());
                    }
                }
            } else {
                this.openNewXmlPage(this.RegName, pageStyle);
            }
        });
        //隐藏提示信息
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "hideTip", function () {

        });

        //自定义js
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "customJs", function (pageStyle, pageObj) {
            if (this.Script) {
                $.AKjs[this.Script.Function](pageStyle, pageObj);
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "afterPostData", function () {
            //this.cancelFun();
            this.FormObj.searchDataList(1, true);
            this.KeyValues = [];
            //  this.initDataButton();

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "switchOperateName", function (str) {
            switch (str) {
                case "Insert":
                    return "新增";
                case "Update":
                    return "编辑";
                case "Detail":
                    return "查看";
                case "Delete":
                    return "删除";
                case "Review":
                    return "评论";
                default:
                    return "";
            }
        });

        //删除选中项
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "deleteForm", function () {
            var _this = this;
            var _ds = {};
            var _tblName = _this.getTableNameByForm(_this.ListFormName) + "_OPERATION";
            var _rows = _ds[_tblName] = [];
            $.each(this.KeyValues, function (key, val) {
                var _row = { OperationName: null, KeyValue: null, Data: null };
                _rows.push(_row);
                _row.OperationName = "Delete";
                _row.KeyValue = val;
            });
            return _ds;
        });
        //表单类型选择按钮
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initFormTypeButton", function () {
            var _this = this;
            //表单选择
            var dropdownStr = "";
            dropdownStr += "    <div class='btn-group'><a class=\" btn-sm dropdown-toggle\" data-toggle=\"dropdown\" ><i class=\"icon-exchange fa fa-exchange\"><\/i> 表单<\/a>";
            dropdownStr += "    <ul class=\"dropdown-menu\" role=\"menu\" >";
            dropdownStr += "        <li><a href=\"javascript:;\">请选择表单类型<\/a><\/li>";
            dropdownStr += "        <li class=\"divider\"><\/li>";
            dropdownStr += "        <li><a class=\"ACT-NORMAL-FORM\" href=\"javascript:;\"><i class=\"icon-align-justify fa fa-align-justify\"><\/i> 表单<\/a><\/li>";
            dropdownStr += "        <li><a class=\"ACT-GRID-FORM\" href=\"javascript:;\"><i class=\"icon-table fa fa-table\"><\/i> 表格<\/a><\/li>";
            dropdownStr += "        <li><a class=\"ACT-ALBUM-FORM\" href=\"javascript:;\"><i class=\"icon-th-large fa fa-th-large\"><\/i> 专辑<\/a><\/li>";
            if (this.ListForm.Calendar) {
                dropdownStr += "        <li><a class=\"ACT-CALENDAR-FORM\" href=\"javascript:;\"><i class=\"icon-calendar fa fa-calendar\"><\/i> 日历<\/a><\/li>";
            }
            dropdownStr += "    <\/ul>";
            dropdownStr += "   <a  class=\"ACT-BTN-COLFILTER btn-sm \"  ><i class=\"icon-glass fa fa-glass\"><\/i> 列筛选<\/a>";
            dropdownStr += "</div>";
            this.$FormTypeBtn.append($(dropdownStr));

            _this.$PanelBody.append(this.$FormTypeBtn);
            _this.$FormTypeBtn.find(".ACT-BTN-COLFILTER").off("click").on("click", function () {
                _this.FormObjs[_this.ListFormName].openColFilterWindow();
            });
        });
        //排序选择
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initsortBarButton", function () {
            var _this = this;
            //排序
            var $sortBar = $('<div class="sortBar btn-group"/>');
            var _defaultSort = true;
            $.each(_this.ListForm.Columns, function (i, n) {
                if (n.Sortable) {
                    if (_defaultSort) {
                        $sortBar.append("<a class=\"sortField btn btn-xs btn-default\" sort=\"Defalut\" isAsc=\"false\">默认排序&nbsp;<span class=\"icon-sign-blank fa fa-square\"></span></a>");
                        _defaultSort = false;
                    }
                    if (_this.FormObj.IsASC) {
                        $sortBar.append("<a class=\"sortField btn btn-xs btn-default\" isAsc=\"false\" sort=\"" + n.Name + "\">" + n.DisplayName + "&nbsp;<span></span></a>");
                    }
                    else {
                        $sortBar.append("<a class=\"sortField btn btn-xs btn-default\" isAsc=\"false\" sort=\"" + n.Name + "\">" + n.DisplayName + "&nbsp;<span></span></a>");
                    }
                }
            });
            this.$FormTypeBtn.append($sortBar);
           // _this.$PanelBody.append(this.$FormTypeBtn);
        });

        //释放按钮在内存中的对象
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "pageButtonDispose", function () {
            var _$div = this.$ButtonBar;
            _$div = _$div.find(".ACT-ROW-BTN");
            for (var _i = 0; _i < _$div.length; _i++) {
                var _$item = _$div.eq(_i);
                var _obj = _$item.AtawControl();
                if (_obj)
                    _obj.dispose();
            }
        });
        //页面按钮
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initPageButton", function () {

            this.pageButtonDispose();
            this.$ButtonBar = $('<div class="ButtonBar ta1 clearfix"><div class="ACT-DATA-BUTTON btn-group pull-left"></div><div class="ACT-PAGE-BUTTON  pull-left m-l-xl"></div></div>');
            if (this.$ButtonContainer) {
                this.$ButtonContainer.append(this.$ButtonBar);
            }
            var _$pageButton = this.$ButtonBar.find(".ACT-PAGE-BUTTON");
            var _$dataButton = this.$ButtonBar.find(".ACT-DATA-BUTTON");
            if (!$.AKjs.IsEmpty(this.PageButtons)) {
                //this.PageButtons["DesktopShortcut"] = { Name: "DesktopShortcut", Text: "桌面快捷方式", Unbatchable: false, Client: { Function: "CreateDesktopShortcut"} }
                for (var o in this.PageButtons) {
                    this.objToButton(this.PageButtons[o], _$pageButton);
                }
            }

            this.objToButton({
                Name: "OutExcel  Hs-btn-out",
                Text: "导出到excel",
                Icon: "fa fa-cloud-download",
                Unbatchable: false,
                Client: {
                    Function: "OutExcel"
                },
            }, _$pageButton);
            if (!$.AKjs.IsEmpty(this.DataButtons)) {
                for (var o in this.DataButtons) {
                    this.DataButtons[o].IsData = true;
                    this.objToButton(this.DataButtons[o], _$dataButton);
                }
            }

            //没有按钮时隐藏容器
            var _$div = this.$ButtonBar.find(".ACT-ROW-BTN");
            if (_$div.length == 0) {
                this.$JObj.find(".ACT-BTN-CONTAINER").remove();
            }

        });
        //数据按钮，即和数据相关的按钮
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initDataButton", function () {
            var _this = this;
            var _selectObj = null;
            //var _seList = _this.FormObj.getRowByCheckBox();
            var _seList = _this.$JObj.find(".ACT-CHECK-SINGLE[ichecked='true']");
            var _len = _seList.length;
            _this.clearButton(); //数据按钮都变灰
            var displayButton = [];
            _seList.each(function (i) {
                var _row = $(this).data("AK-ROW");
                var _rowBtns = _row.SupportBtns;
                if (_len == 1 || i == 0) {
                    displayButton = _rowBtns;
                }
                else {
                    displayButton = _.intersection(displayButton, _row.SupportBatBtns);
                    // displayButton.concat(_row.SupportBatBtns);
                    displayButton = _.unique(displayButton);
                }
            });

            for (var i = 0; i < displayButton.length; i++) {
                var _name = displayButton[i];
                var _btn = this.DataButtons[_name];
                if (_btn) {
                    this.btnRight(_btn);
                }
            }



        });
        //按钮是否高亮，被选中的记录有这个功能，则高亮，否则变灰
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "btnRight", function (_btn) {
            var btntype = this.$JObj.find(".ACT-BT-" + _btn.Name);
            btntype.removeClass("ACT-btn-disabled Hs-btn-disabled");
        });

        //加载按钮
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "objToButton", function (_btn, $bar) {
            // var  = _btns[_i];
            var _this = this;
            var _div = $("<a></a>");
            if (_btn.IsData) {
                _div.addClass(" ACT-BUTTON-DATA ACT-btn-disabled Hs-btn-disabled");
            }
            if ($bar) {
                $bar.append(_div);
            } else {
                _this.$ButtonBar.append(_div);
            }
            var _op = {
                Name: _btn.Name,
                Text: _btn.Text,
                BtnCss: _btn.BtnCss,
                Icon: _btn.Icon,
                ButtonKind: "btn btn-default",
                ClickFun: function () {
                    var _cusBtName = null;//自定义按钮
                    if (_btn.Client && _btn.Client.Function) {
                        _cusBtName = _btn.Client.Function;
                        if (_cusBtName == "Insert" || _cusBtName == "Update" || _cusBtName == "Delete" || _cusBtName == "Detail") {
                            _cusBtName = null;
                        }
                    }
                    if (_cusBtName) {
                        var _fun = $.AKjs[_cusBtName];
                        if (_fun) {
                            _fun(_this);
                        }
                        else if (_cusBtName == "Review") {
                            var fid = _this.KeyValues[0];
                            var xmlmodule = location.hash;
                            var admin = true;
                            var _$dc = $("<div/>");
                            _$dc.AtawWindow({
                                Title: "评论中心",
                                Width: "90%",
                                WindowOpenFun: function (obj) {
                                    seajs.use(['jquery', 'reviewmrc'], function ($, reviewmrc) {
                                        var creator = new reviewmrc();
                                        creator.setModel(fid, xmlmodule, admin);
                                        creator.init(_$dc);
                                    });
                                }
                            });
                            var win = _$dc.AtawControl();
                            win.open();
                        }

                        else {
                            Ataw.msgbox.show("按钮操作方法 $.AKjs." + _cusBtName + "未定义！", 4, 2000);
                        }
                    }
                    else {
                        if (_btn.Name == "Insert" || _btn.Name == "Update" || _btn.Name == "Delete" || _btn.Name == "Detail") {
                            _this.operateButton(_btn.Name);
                        }
                        else {
                            Ataw.msgbox.show("按钮操作名称" + _btn.Name + "未定义！", 4, 2000);
                        }
                    }
                }
            };
            _div.AtawButton(_op);
            // _div.AtawControl().dispose();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "AfterSearch", function () {
            var _this = this;
            return function () {
                _this.Data = _this.FormObj.Data;

                _this.clearButton(); //2013.04.27 zgl
                _this.bindEvent(_this);
                _this.initRowCheck();
                _this.createHashTableObj();
                if (_this.AfterSearchCustomFun) {
                    _this.AfterSearchCustomFun(_this);
                }
            }
        });

        //按钮变灰色，不可用
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "clearButton", function () {
            //            if (!FormObj.ParentPageObj || FormObj.ParentObj.PageStyle != "List") {
            //                this.$ButtonBar.find(".ACT-BUTTON-DATA").remove();
            //            }
            //            else {
            this.$ButtonBar.find(".ACT-BUTTON-DATA").addClass("ACT-btn-disabled Hs-btn-disabled");
            // }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getPageState", function () {
            this.PageState = {};
            if (this.FormObj) {
                this.PageState = this.FormObj.getFormState();
            }
            return this.AtawViewPage_getPageState();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getPagerCurrent", function () {
            //this.PageState = {};
            if (!this.PageState) {
                this.getPageState();
            }
            if (this.PageState && this.PageState.page && this.PageState.page.PageIndex >= 0) {
                // if ((this.PageState.page.PageIndex + 1) < (this.PageState.page.TotalCount / this.PageState.page.PageSize)) {
                return this.PageState.page.PageIndex;
                //  }
                //  else {
                //
                // alert("最末页了");
                return -1;
                //return this.PageState.page.PageIndex;
                // }
            }
            return 0;
        });
        //searchDataList
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "searchDataList", function (pageIndex) {
            if (this.FormObj) {
                this.FormObj.searchDataList(pageIndex);
                alert(123);
            }
        });
        //获取下一页数据
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "searchDataListNextPage", function (pageIndex) {
            if (this.FormObj) {
                var _current = this.getPagerCurrent();
                if (_current >= 0) {
                    if ((this.PageState.page.PageIndex + 1) < (this.PageState.page.TotalCount / this.PageState.page.PageSize)) {
                        this.FormObj.searchDataList(_current + 2);
                    }
                    else {
                        alert("最后一页了");
                    }
                }
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "searchDataListLastPage", function (pageIndex) {
            if (this.FormObj) {
                var _current = this.getPagerCurrent();
                if (_current > 0) {

                    this.FormObj.searchDataList(_current);
                }
                else {
                    alert("第一页了");
                }
            }
        });
        this.HashTable = {};

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getFid", function (fid, isNext) {
            if (this.HashTable) {
                var _dt = this.Data[this.ListFormName];
                if (_dt) {
                    var _index = this.HashTable[fid];
                    if (isNext) {
                        _index++;
                        if (_index == _dt.length) {
                            //  alert("最后一条了");
                            return;
                        }
                    }
                    else {
                        _index--;
                        if (_index == -1) {
                            // alert("第一条了");
                            return;
                        }
                    }
                    if (_dt[_index]) {
                        var _fid = _dt[_index].FID;
                        return _fid;
                    }
                }
                // alert();
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createHashTableObj", function () {
            //var _f = $.toJSON(this.Data[this.ListFormName]);
            var _dt = this.Data[this.ListFormName];
            if (_dt) {
                var _len = _dt.length;
                for (var _i = 0; _i < _len; _i++) {
                    //--------
                    var _row = _dt[_i];
                    var fid = _row.FID;
                    this.HashTable[fid] = _i;
                }
            }
            //alert(_f);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "openWinDetail", function (id) {
            //-------
            this.openNewXmlPage(this.RegName, "Detail", id);

        });
        //释放内存中的数据
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dispose", function () {
            // this.$JObj.find(".ACT-GRID-TABLE").floatThead('destroy');
            this.AtawViewPage_dispose();
        });

    }
})(jQuery);
