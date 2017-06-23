(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};


    //----------构造控件基类
    $.AKjs.AtawBaseForm = function (options) {
       // this.listPage = $.extend({}, $.AKjs.AtawListPage);
        return $.extend({}, $.AKjs.AtawBaseJPlugIn(options), new AtawBaseForm());
    }

    //-----------------控件的基类---------
    function AtawBaseForm() {

        //------------------------------View---------------------
        this.$SearForm = $("<div class=\"SearForm mt10\" style='display: none;'></div>");
        this.$NaviForm = $("<div class=\"row NaviForm\"></div>");
        this.$ConditionDiv = $("<div class=\"ConditionDiv mt10 mb10 \"></div>");
        this.$Pager = $('<div class=" Pager clearfix"><div class="PagerCenter ACT-PAGER pull-right"></div></div>'); //分页插件

        this.$TopPager = $('<div class=" TopPager clearfix"><div class=" PagerCenter ACT-PAGER "></div></div>'); //分页插件
        this.$SearchBorder = $('<div class="Hu-search-title"><span>内容显示</span></div>');
        this.$FormContent = $('<div class="columnGroup panel-default acs-colgroup"></div>');
        this.$RowContent = null;
        this.$ButtonBar = $("<div class=\"ACT-BUTTONBAR newbutton\"></div>"); //按钮区
        this.$MainContent = $("<div class='atawNormalRow clearfix'></div>");

        this.$Panel = $("<div class='panel panel-default'/>");
        this.$PanelBody = $('<div class=​"panel-body ui-body-bg"></div>');

        this.$FormTypeBtns = $('<div class="formTypeBtnBars pull-right"/>');

        this.FormName = "";
        this.Url = "/module/SearchForm";
        this.TableName = "";
        this.Data = null;
        this.ExtData = null;
        this.Form = null;
        this.RegName = null;
        this.SearchForm = null;
        this.NaviForm = null;
        this.NaviFormObj = [];
        this.InsertForm = null;
        this.HasSearch = false;
        this.searchPostDataset = {};
        this.HasBatchInsert = false;

        this.HasNavi = false;
        this.TotalRecords = 0; //总记录数
        this.PageSize = 7; //默认配置页码大小
        this.PageIndex = 1; //当前页索引
        this.SortName = ""; //当前排序字段
        this.IsASC = false; //升序、降序排列
        this.Title = null;
        this.$Title = null;

        this.IsInner = false;

        this.AtawRowList = [];
        ///删除的主键编号
        this.DelKeyList = [];
        //选中的主键编号
        //this.SelectKeyList = [];
        this.Action = null;
        this.IsViewPage = false;
        this.IsDetailForm = false;
        this.IsMvcForm = false;

        //---分页和搜索的钩子
        this.SearchDataListFun = null; //(index,page):void
        //新增行后的钩子
        this.AfterAddNewRowFun = null; //form,$row:void
        //删除新增行后的钩子
        this.AfterDelNewRowFun = null;

        this.AfterInitRowFun = null; //form,$row:void

        //搜索后的钩子，通过Page传入
        this.AfterPageSearchFun = null;
        //this.PageObj = null;
        this.AfterInitFunName = ""; //string
        this.MaxIndex = 0;

        this.$ToolContainer = $("<div class=\"rightTop\"></div>");

        this.$SortBar = $("<div class=\"sortBar btn-group\"></div>");
        //页对象
        this.ParentPageObj = null;
        this.FormType = null;

        //anchor
        this.NaviAnchor = null;
        this.SearchAnchor = null;
        this.IsInner = false;
        this.SetCustomSearchDataFun = null; //自定义搜索条件的钩子
        this.$NaviContent = null;

        this.NaviContentSelector = "";
        this.IsPart = false; //表单单独使用时有效
        this.HasOpeator = true;

        this.$ConfigTplForm = $("<div/>");

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "creator", function () {
            this.Data = this.Options.Data;
            // this.setProByOptName("Data", "Data");
            this.setProByOptName("Form", "Form");

            this.ExtData = this.Options.ExtData;
            this.Action = this.Options.Form.Action;
            this.IsDetailForm = this.Form.IsDetailForm;
            this.HasSearch = this.Form.HasSearch;
            this.FormName = this.Form.Name;

            this.setProByOptName("RegName", "RegName");
            this.setProByOptName("HasOpeator", "HasOpeator");

            this.Title = this.Form.Title;
            this.TableName = this.Form.TableName;
            this.HasBatchInsert = this.Form.HasBatchInsert;
            this.FormType = this.Form.FormType;
            // this.IsInner = this.Options.IsInner;
            this.setProByOptName("IsInner", "IsInner");
            this.setProByOptName("SearchDataListFun", "SearchDataListFun");
            this.setProByOptName("IsViewPage", "IsViewPage");
            this.setProByOptName("InsertForm", "InsertForm");
            //NaviContent
            this.setProByOptName("NaviContentSelector", "NaviContentSelector");
            this.setProByOptName("ParentPageObj", "ParentPageObj");

            this.setProByOptName("SetCustomSearchDataFun", "SetCustomSearchDataFun");
            this.setProByOptName("IsPart", "IsPart");

            if (this.Form.AfterInitFunName)
                this.AfterInitFunName = this.Form.AfterInitFunName;
            // this.setProByOptName("AfterInitFunName", "AfterInitFunName");

            if (this.HasSearch) {
                this.SearchForm = this.Options.SearchForm;
                //搜索 相关的参数
            }
            this.NaviForm = this.Form.NavigationColumns;
            if (this.Form.HasPager) {
                //分页 相关的参数
                this.setPagerData();
            }

            if (this.Form.HasBatchInsert) {
                this.InsertForm = this.Options.InsertForm;
            }

            this.CreateRowListData();


        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getRowLength", function () {
            return 0;
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getInsertDataRow", function () {
            var _dtInsert = this.Data[this.TableName + "_INSERT"];
            if (_dtInsert && _dtInsert.length > 0) {
                // for (var _i = 0; _i < _dtInsert.length; _i++) {
                _dtInsert[0]["IsInsertRow"] = true;
                return _dtInsert[0]
                // }

            }
            return null;
        });
        
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "CreateRowListData", function () {
            var _dataRows = null;
            var _IsInsertRow = false;
            var _dt = this.Data[this.TableName];
            var _dtInsert = this.Data[this.TableName + "_INSERT"];

            //模块的情况
            if (this.IsViewPage) {
                _dataRows = _dt;
                if (this.Action == "Insert") {
                    if (_dtInsert) {
                        for (var _i = 0; _i < _dtInsert.length; _i++) {
                            _dtInsert[_i]["IsInsertRow"] = true;
                            _dataRows.push(_dtInsert[_i]);
                        }

                    }
                }
            }
            else {
                if (this.Action == "Insert") {
                    if (_dtInsert) {
                        _dataRows = _dtInsert;
                        _dtInsert[0]["IsInsertRow"] = true;
                    }
                    //                    else {
                    //                        _dataRows = 
                    //                    }
                    _IsInsertRow = true;
                }
                else {
                    _dataRows = _dt;
                }
            }

            var _colConfigs = "";
            // if (this.Action == "List") {
            if (_dataRows != null && _dataRows.length > 0) {
                for (var j = 0; j < _dataRows.length; j++) {
                    // alert(j);
                    var _op = {
                        DataSet: this.Data,
                        DataRow: _dataRows[j],
                        Form: this,
                        ColumnConfigs: this.Form.Columns,
                        RowIndex: j,
                        PrimaryKey: this.Form.PrimaryKey,
                        IsInsertRow: _dataRows[j]["IsInsertRow"] === true,
                        FunSetCheckBox: this.Form.FunSetCheckBox,
                        IsViewPage: this.IsViewPage,
                        ParentFormObj: this
                        //InsertForm:
                    };
                    if (_op.IsInsertRow && this.InsertForm)
                        _op.ColumnConfigs = this.InsertForm.Columns;
                    //  var _row = this.createRowObj(_op, fromType);
                    var _row = $.AKjs["Create" + this.FormType + "RowObj"](_op);
                    this.AtawRowList.push(_row);
                    this.MaxIndex++;
                }
            }
            // } 
            else {
                if ((!this.IsViewPage && !this.IsDetailForm && this.Action == "Insert") || (this.IsViewPage && this.Action == "Insert")) {
                    var _op = {
                        DataSet: this.Data,
                        DataRow: null,
                        Form: this,
                        ColumnConfigs: this.Form.Columns,
                        RowIndex: 0,
                        PrimaryKey: this.Form.PrimaryKey,
                        IsInsertRow: _IsInsertRow,
                        IsViewPage: this.IsViewPage,
                        ParentFormObj: this
                    };

                    //var _row = this.createRowObj(_op, fromType);
                    var _row = $.AKjs["Create" + this.FormType + "RowObj"](_op);
                    this.AtawRowList.push(_row);
                    this.MaxIndex++;
                }
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initMain", function ($main) {
            //导航区
            if (this.NaviContentSelector != "" && typeof (this.NaviContentSelector) == "string") {
                this.$NaviContent = $(this.NaviContentSelector);
            }
            if (this.NaviContentSelector instanceof $) {
                this.$NaviContent = this.NaviContentSelector;
            }

            if ((this.IsPart && this.IsInner) && this.NaviContentSelector == "") {
            }
            else {
                this.intNaviForm();
            }

            $main.append(this.$NaviForm);
            //搜索区
            if (this.SearchForm) {
                var _this = this;
                this.intSearchForm();
                $main.append(this.$SearForm);
                $main.append(this.$ConditionDiv);
                this.$MainContent.append(this.$FormTypeBtns);
                this.$FormTypeBtns.append($('.formTypeBtnBar'));
                //this.$ConditionDiv.find("span").each(function () {
                //    if ($(this).hasClass("input-group-btn")) {
                //    } else {
                //        $(this).width(((_this.$ConditionDiv.width() - $(this).prev().width() - 100) / _this.$ConditionDiv.width() * (_this.$ConditionDiv.width() / $(window).width() * 100)) + "em");
                //        if ($(this).find("select").length != 0) {
                //            $($(this).find("select")).css("width", "100%")
                //        }
                //    }
                //});
            }
            //            //数据区
            if (this.Form.HasPager) {
                this.$MainContent.append(this.$SearchBorder);
                this.$MainContent.append(this.$TopPager);

            }

            //this.initPager(this.PageIndex, this.$TopPager.find(".ACT-PAGER"));

            
            $main.append(this.$MainContent);

            
            
            this.$MainContent.append(this.$FormContent);            
            this.initFormContent()
            this.initRowList();
            if (this.Form.HasPager) {

                this.$MainContent.append(this.$Pager);
                this.initPager(this.PageIndex);
            }

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            //alert(777);
            if (this.ParentPageObj && this.ParentPageObj.PageStyle == "List") {
               // alert(this.HasNoCk);
                this.HasNoCk = false;
            }
            if (this.IsInner) {
                this.initMain(this.$JObj);

                // this.$MainContent.append(this.$FormContent);

            }
            else {
                if (this.Title == null || this.Title == "") this.Title = "&nbsp;";
                if (this.IsInner) {
                    var _$panelbocy = $('<div class="panel "><div class=" ACT-BODY" ></div></div>');
                }
                else {
                    var _ids = "ACT-FORM-TILE" + $.AKjs.getUniqueID();
                    //
                    var _$main = $('<ul class="nav nav-tabs"><li class="active"><a href="#tab16" data-toggle="tab">'+ this.Title +'</a></li>'+
                        '<li class="pull-right"><span class=" ACT-COLL  btn  btn-xs pull-right" data-toggle="collapse"   data-target="#' + _ids + '" >' +
                        '<i class="icon-caret-down fa fa-caret-down "></i></span></li>');
                    var _$panelbocy = $('<div class="panel-body ACT-BODY"  id="' + _ids + '"></div>');
                }
                this.$JObj.append("<div class='fieldset'><div class='legend clearfix'></div></div>");
                this.$JObj.find(".legend").append(_$main);
                this.$JObj.find(".fieldset").append(_$panelbocy);
                _$main.find(".ACT-COLL").click(function () {
                    var _$ = $(this).find("i");
                    if (_$.hasClass("icon-caret-down fa fa-caret-down")) {
                        _$.SwitchClass("icon-caret-down fa fa-caret-down", "icon-caret-up fa fa-caret-up");
                    }
                    else {
                        _$.SwitchClass("icon-caret-up fa fa-caret-up", "icon-caret-down fa fa-caret-down");
                    }
                });
                var _this = this;
               
                this.initMain(_$panelbocy);
            }

            // alert("初始化");
            // this.$MainContent.find("table").footable();

            //----------------新增和删除的按钮事件
            var _this = this;
            if (!this.AfterInitFunName .AisEmpty()) {
                var _fun = $.AKjs.AfterFormFun[this.AfterInitFunName];
                if (_fun) {
                    _fun(this);
                }
                else {
                    alert("表单" + this.FormName + "的加载完函数 ($.AKjs.AfterFormFun." + this.AfterInitFunName + ") 没有被定义");
                }
            }
            // 执行css.js
            // $.AKjs.extraStyle(this);
            // this.$JObj.addClass("acs-form");

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getRowByCheckBox", function () {

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "resetRowIndex", function () {
            var _$rowindexes = this.$JObj.find(".ACT-ROW-INDEX");
            //alert(_$rowindexes.length);
            for (var i = 0; i < _$rowindexes.length; i++) {
                var _$item = _$rowindexes.eq(i);
                _$item.text(i + 1);
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPrivate, "saveDelRowKey", function ($row) {
            var _list = $row.find(".PAGE-CONTROL");
            for (var i = 0; i < _list.length; i++) {
                var _col = _list[i];
                var _colObj = $(_col).AtawControl();
                if (_colObj) {
                    if (_colObj.IsKey) {
                        var _key = _colObj.dataValue();
                        if (!$.AKjs.IsEmpty(_key))
                            this.DelKeyList.push(_key);
                    }
                }
            }
            $row.remove();
            this.resetRowIndex();
            this.initSetRowAlert();
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "reloadData", function () {
            this.reInitForm();

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "closeConfigWin", function () {
            this.$Win.close();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "afterInit", function () {
            var _this = this;
            if (this.HasSearch) {
                this.$SearForm.find(".ACT-SEARCH-FORM-BUTTON").click(function () {
                    _this.SearchAnchor = {};
                    var searchData = _this.$SearForm.find(".ACT_POST").CreateDataSet();
                    if (searchData[_this.TableName + "_SEARCH"]) {
                        _this.SearchAnchor = searchData[_this.TableName + "_SEARCH"][0];
                    }
                    _this.searchDataList(1);
                });
            }
            _this.bindEvent();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "bindEvent", function () {

            var _this = this;
            var displayOrShowDeleteButton = function () {
                //是否显示删除按钮
                if (_this.Form.HasBatchInsert) {
                    var rows = _this.getRowByCheckBox();
                    var rowObj;
                    _this.$AddOrDel.find('.btn-danger').removeAttr("style");
                    $.each(rows, function (i, n) {
                        rowObj = $(this).AtawControl();
                        if (rowObj && rowObj.NoDelete) {
                            _this.$AddOrDel.find('.btn-danger').css("display", "none");
                            return;
                        }
                    })
                }
            }
            //全选事件
            _this.$FormContent.find(".ACT-CHECK-ALL").click(function () {
                if ($(this).attr("ichecked") == "false") {
                    $(this).find(".ACT-CHECK-SINGLE").removeClass("icon-check-empty fa fa-square-o").addClass("icon-check fa fa-check-square-o");
                    $(this).removeClass("icon-check-empty fa fa-square-o ").addClass("icon-check fa fa-check-square-o");
                    $(this).attr("ichecked", true);
                } else {
                    $(this).find(".ACT-CHECK-SINGLE").removeClass("icon-check fa fa-check-square-o").addClass("icon-check-empty fa fa-square-o");
                    $(this).removeClass("icon-check fa fa-check-square-o").addClass("icon-check-empty fa fa-square-o");
                    $(this).attr("ichecked", false);
                }
                _this.$FormContent.find(".ACT-CHECK-SINGLE").attr("ichecked", $(this).attr("ichecked"));

                _this.$FormContent.find(".ACT-CHECK-SINGLE").each(function () {
                    if ($(this).attr("ichecked") == "true") {
                        //                        $(this).parent().parent().addClass("selected");
                        $(this).removeClass("icon-check-empty fa fa-square-o").addClass("icon-check fa fa-check-square-o");
                        //                        _this.KeyValues.push($(this).attr("key"));
                    }
                    else {
                        //                            $(this).parent().parent().removeClass("selected");
                        $(this).removeClass("icon-check fa fa-check-square-o").addClass("icon-check-empty fa fa-square-o");
                    }
                });
                displayOrShowDeleteButton();
            })

            //单选事件
            _this.$FormContent.find(".ACT-CHECK-SINGLE").unbind("click").bind("click", function () {
                //选中后增加底色
                var $icheck = $(this);
                if ($icheck.attr("ichecked") == "true") {
                    $icheck.removeClass("icon-check fa fa-check-square-o").addClass("icon-check-empty fa fa-square-o");
                    $icheck.attr("ichecked", false);
                    $icheck.css("color", "");
                }
                else {
                    $icheck.css("color","#000");
                    $icheck.removeClass("icon-check-empty fa fa-square-o").addClass("icon-check fa fa-check-square-o");
                    $icheck.attr("ichecked", true);
                }
                var _seList = _this.$FormContent.find(".ACT-CHECK-SINGLE[ichecked='true']");
                var _checkAll = _this.$FormContent.find(".ACT-CHECK-ALL");
                var _checkList = _this.$FormContent.find(".ACT-CHECK-SINGLE");
                _checkAll.attr("ichecked", _seList.length == _checkList.length ? true : false);
                if (_checkAll.attr("ichecked") == "true") {
                    _this.$FormContent.find(".ACT-CHECK-ALL").removeClass("icon-check-empty fa fa-square-o").addClass("icon-check fa fa-check-square-o");
                } else {
                    _this.$FormContent.find(".ACT-CHECK-ALL").removeClass("icon-check fa fa-check-square-o").addClass("icon-check-empty fa fa-square-o");
                }
                displayOrShowDeleteButton();
            })
        });
        //增加行选中事件
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "addNewRow", function () {
            var _this = this;
            var _$row = this.addNewRowing();

            _$row.find(".ACT-CHECK-SINGLE").bind("click", function () {

                var $checkdata = $(this);
                var $check = $checkdata.parent().find(".icon-check");
                if ($check.length != 0) {
                    $checkdata.removeClass("icon-check fa fa-check-square-o icon-2x").addClass("icon-check-empty fa fa-square-o");
                    $checkdata.attr("ichecked", false);
                    // $icheck.css("color", "#000");
                    $checkdata.parents(".show-col-end").removeClass("check-bg");
                    $checkdata.parents(".acs-normal-form").find(".panel-default").removeClass("check-bg");
                } else {
                    $checkdata.removeClass("icon-check-empty fa fa-square-o").addClass("icon-check fa fa-check-square-o icon-2x");
                    $checkdata.attr("ichecked", true);
                    // $icheck.css("color", "");
                    $checkdata.parents(".show-col-end").addClass("check-bg");
                    $checkdata.parents(".acs-normal-form").find(".panel-default").addClass("check-bg");
                }
                var _seList = _this.$FormContent.find(".ACT-CHECK-SINGLE[ichecked='true']");
                var _checkList = _this.$FormContent.find(".ACT-CHECK-SINGLE");
                var _checkAll = _this.$FormContent.find(".ACT-CHECK-ALL");
                _checkAll.attr("ichecked", _seList.length == _checkList.length ? true : false);
                if (_checkAll.attr("ichecked") == "true") {
                    _this.$FormContent.find(".ACT-CHECK-ALL").removeClass("icon-check-empty fa fa-square-o").addClass("icon-check fa fa-check-square-o");
                } else {
                    _this.$FormContent.find(".ACT-CHECK-ALL").removeClass("icon-check fa fa-check-square-o").addClass("icon-check-empty fa fa-square-o");
                }
            });
            this.resetRowIndex();
            this.initSetRowAlert();
            if (this.AfterAddNewRowFun) {
                this.AfterAddNewRowFun(this, _$row);
            }

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "addNewRowing", function () {
            //返回行记录的DOM
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getChangeEventFunByName", function (columnOption, row) {
            if (columnOption.ChangeEventFun && !columnOption.ChangeEventFun .AisEmpty()) {
                $.AKjs.ChangeEventFun = $.AKjs.ChangeEventFun ? $.AKjs.ChangeEventFun : {};
                var _fun = $.AKjs.ChangeEventFun[columnOption.ChangeEventFun];
                if (_fun) {
                    return _fun;
                }
                else {
                    alert("名称为" + columnOption.ChangeEventFun + "的字段配置函数未定义！");
                }
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initFormContent", function () {
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "createRowObj", function (op) {
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initRowContent", function () {
            return this.$RowContent;
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initSetRowAlert", function () {
            if (this.$RowContent.html() == "") {
                this.$RowContent.html("<tr class='acs-nodata-alert'><td colspan='1000'><div class='alert alert-danger  ' ><i class=' icon-ban-circle fa fa-ban '>&nbsp;无数据....</i></div></td></tr>");
            }
            else {
                this.$RowContent.find(".acs-nodata-alert").remove();
            }
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initRowList", function () {
            var _len = this.AtawRowList.length;
            if (_len == 0) {
                this.initSetRowAlert();
            }
            for (var _i = 0; _i < _len; _i++) {
                var _item = this.AtawRowList[_i];
                var _$dv = $.AKjs["Init" + this.FormType + "RowContent"](this.$RowContent, this, _item);
                this.AtawRowList[_i].intoDom(_$dv);
            }

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "getFormState", function () {
            var formState = {};
            if (this.NaviAnchor) {
                formState.navi = this.NaviAnchor;
            }
            if (this.SearchAnchor) {
                formState.search = this.SearchAnchor;
            }
            formState.page = { TotalCount: this.TotalRecords, PageSize: this.PageSize, PageIndex: this.PageIndex - 1, IsASC: this.IsASC, SortName: this.SortName, DataTime: new Date().Aformat("yyyy-mm-dd hh:nn:ss.S") };
            formState.tablename = this.TableName;
            formState.formType = this.FormType;
            return formState;
        });
        //初始化NAVI区
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "intNaviForm", function (pageIndex) {
            // if (this.ParentPageObj.IsPart && this.$NaviContent == null) return;

            var _this = this;
            var $naviContent = null;
            // if()
            for (var _j = 0; _j < this.NaviForm.length; _j++) {

                if (_j === 0) {
                    this.HasNavi = true;
                    if (this.$NaviContent == null) {
                    //    alert();
                        $naviContent = $.AKjs.AppGet().showNavi(this.ParentPageObj.Title);
                        //alert(123);
                    }
                    else {
                        $naviContent = this.$NaviContent;
                    }
                }

                var _op = {
                    Form: this.NaviForm[_j],
                    Data: this.Data,
                    ExtData: this.ExtData,
                    Callback: function (anchorParam) {
                        _this.searchDataList(1);
                        if (!_this.NaviAnchor) {
                            _this.NaviAnchor = {};
                        }
                        $.extend(_this.NaviAnchor, anchorParam);
                    }
                }
                var naviFormObj = $.AKjs["Ataw" + this.NaviForm[_j].ControlType](_op);
                this.NaviFormObj.push(naviFormObj)
                if ($naviContent) {
                    var _$div = $("<div class='ACT_TREENAVI'  />")
                    $naviContent.append(_$div);
                    naviFormObj.intoDom(_$div);
                } else {
                   // var _$div = $("<div class='ACT_TREENAVI'  />")
                   // $NaviForm.append(_$div);
                   // naviFormObj.intoDom(_$div);
                }
            }


        });
        //初始化搜索区
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "intSearchForm", function (pageIndex) {

            var _op = { BaseForm: this, Form: this.SearchForm, Title: this.SearchForm.Title, Data: this.Data, ExtData: this.ExtData };
            this.$SearForm.AtawSearchForm(_op);

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initPager", function (pageIndex) {
            this.initPagerSingle(this.PageIndex, this.$Pager.find(".ACT-PAGER"));
            this.initPagerSingle(this.PageIndex, this.$TopPager.find(".ACT-PAGER"));
        });

        //初始化分页插件
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initPagerSingle", function (pageIndex, $pager) {
            var _this = this;
            if (_this.Form.HasPager) {
                this.createPager($pager, pageIndex);
                // this.createPager(this.$Pager, pageIndex);

                //                setTimeout(function () {
               



                //                }, 1);
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createPager", function (pagerObj, pageIndex) {
            var _this = this;
           // if (this.TotalRecords > this.PageSize) {
                var _pageCount = (_this.TotalRecords + _this.PageSize - 1) / _this.PageSize;
                _this.asynJs("/AtawStatic/lib/03Extend/myPagination/jquery.myPagination.js", function () {

                    pagerObj.myPagination(
                {
                    panel: {
                        tipInfo_on: true,
                        tipInfo: "<span>{currText}/{sumPage}页</span>",
                    },
                    info: { msg_on: true, PageSize: _this.PageSize },
                    currPage: pageIndex,
                    pageCount: parseInt(_pageCount),
                    totalRecords: _this.TotalRecords,
                    ajax: {
                        onClick: function (pageIndex) {
                            var _tempSize = _this.PageSize;
                            var _size = parseInt(pagerObj.find(".ACT-PAGE-SIZE").val());
                            if (!isNaN(_size) && _size > 0) {
                                _this.PageSize = _size;
                                if (_tempSize != _this.PageSize) {
                                    pageIndex = 1;
                                }
                            }
                            _this.searchDataList(pageIndex);

                        }
                    }
                })

                    if (pagerObj.find("ul").length === 0) {
                        pagerObj.wrapInner('<ul class="pagination" />');
                        // this.$TopPager.wrapInner('<ul  class="pagination  pagination-sm"   />');
                        //this.$TopPager
                    }
                    else {
                        pagerObj.find("ul").addClass("pagination");
                        // this.$TopPager.find("ul").addClass("pagination pagination-sm");
                    }

                });
          //  }
            //else {
            //    var _$p = pagerObj.parent();
            //    _$p.clear();
            //    _$p.append($('<div class="Hc-pagination PagerCenter ACT-PAGER"></div>'));
            //    pagerObj = _$p.find(".ACT-PAGER");
            //}
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setPagerData", function () {
            if (this.Data[this.TableName + "_PAGER"]) {
                var _pagerDataRow = this.Data[this.TableName + "_PAGER"][0];
                this.TotalRecords = _pagerDataRow.TotalCount; //总记录数
                this.PageSize = _pagerDataRow.PageSize; //默认配置页码大小
                this.PageIndex = _pagerDataRow.PageIndex + 1; //当前页索引
            }
        });

        //搜索事件
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "searchDataList", function (pageIndex, isRefreshNavi, plugDataSet) {
            if (this.SearchDataListFun) {
                this.SearchDataListFun(pageIndex, this);
            }
            else {
                var _this = this;
                this.PageIndex = pageIndex;
                var _PlugDataSet = null;
                if (this.$SearForm)
                    if (plugDataSet != null) {
                        _PlugDataSet = plugDataSet;
                    } else {
                        _PlugDataSet = this.$SearForm.find(".ACT_POST").CreateDataSet();
                    }
                var _pagerOption = {
                    "PageSize": _this.PageSize,
                    "PageIndex": pageIndex - 1,
                    "IsASC": _this.IsASC,
                    "SortName": _this.SortName ? _this.SortName : "",
                    "TotalCount": _this.TotalRecords,
                    "DataTime": new Date().Aformat("yyyy-mm-dd hh:nn:ss.S")
                }
                var _pagerDataSet = $.AKjs.AtawJsPager(_pagerOption);
                var _ds = {};

                for (var ii = 0; ii < this.NaviFormObj.length; ii++) {
                    this.searchPostDataset = $.extend({}, this.searchPostDataset, this.NaviFormObj[ii].createPostDataSet());
                }

                if (plugDataSet) {
                    //_ds = { "SearchForm": _PlugDataSet.SearchForm, "PAGER": [_pagerDataSet] };
                    // _ds = {};
                    // _ds[_this.SearchForm.TableName] = _PlugDataSet[this.SearchForm.TableName]
                    if (this.SearchForm && plugDataSet && plugDataSet[this.SearchForm.TableName]) {
                        this.searchPostDataset = $.extend({}, this.searchPostDataset, plugDataSet[this.SearchForm.TableName][0]);
                    }
                    else {
                        if (plugDataSet[this.TableName + "_Search"]) {
                            this.searchPostDataset = $.extend({}, this.searchPostDataset, plugDataSet[this.TableName + "_Search"][0]);
                        }
                    }
                }

                if (_this.SearchForm) {
                    _ds[_this.SearchForm.TableName] = [this.searchPostDataset];
                } else if (this.NaviFormObj.length > 0) {
                    _ds[this.TableName + "_Search"] = [this.searchPostDataset];
                }




                if (_this.SetCustomSearchDataFun)
                    _ds = _this.SetCustomSearchDataFun(_ds);
                _ds["PAGER"] = [_pagerDataSet];
                _dsStr = $.toJSON(_ds);
                // alert(_dsStr);
                var _d0 = new Date();
                $.AKjs.getJSON(_this.Url, { xml: _this.RegName, form: _this.FormName, pageStyle: "List", ds: _dsStr, callback: Math.random() }, function (data) {
                    _this.Data = data.Data;

                    var _pageObj = _this.ParentPageObj;
                    if (_pageObj && data.PageSourceData ) {
                        _pageObj["PageSourceData"] = data.PageSourceData;
                    }


                    //分页 相关的参数
                    _this.setPagerData();
                    //   var _pageCount = (_this.TotalRecords + _this.PageSize - 1) / _this.PageSize;
                    _this.initPager(pageIndex);
                    _this.reloadData();
                    if (isRefreshNavi) {
                        for (var i = 0; i < _this.NaviFormObj.length; i++) {
                            if (_this.NaviFormObj[i]) {
                                _this.NaviFormObj[i].reload();
                            }
                        }
                    }
                    if (!_this.ParentPageObj.IsPart || _this.IsPart) {
                        if ($.AKjs.AppGet().M) {
                            $.AKjs.AppGet().M.IsRouteEvent = true;
                            if ($.AKjs.AppGet().Url) {
                                $.AKjs.AppGet().Url.setUrlAnchor(_this.ParentPageObj.getPageState());
                            }
                        }
                        
                    }
                    var _d1 = new Date();
                    console.log("搜索结果 ：" + (_d1 -_d0));
                });
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "postData", function () {
            var _size = this.PageSize;
            var _pageIndex = pageIndex;
            if (this.$JObj.find(".ACT-PAGE-SIZE").length > 0 &&this.$JObj.find(".ACT-PAGE-SIZE").eq(0).val() != "") {
                var __size = parseInt(this.$JObj.find(".ACT-PAGE-SIZE").eq(0).val());
                if (__size != this.PageSize) {
                    _size = __size;
                    _pageIndex = 0;
                }
            }

            var pageIndex, isRefreshNavi, plugDataSet;
            pageIndex = this.PageIndex;
            if (this.SearchDataListFun) {
                this.SearchDataListFun(pageIndex, this);
            }
            else {
                var _this = this;
                this.PageIndex = pageIndex;
                var _PlugDataSet = null;
                if (this.$SearForm)
                    if (plugDataSet != null) {
                        _PlugDataSet = plugDataSet;
                    } else {
                        _PlugDataSet = this.$SearForm.find(".ACT_POST").CreateDataSet();
                    }
                var _pagerOption = {
                    "PageSize": _size,
                    "PageIndex": pageIndex - 1,
                    "IsASC": _this.IsASC,
                    "SortName": _this.SortName ? _this.SortName : "",
                    "TotalCount": _this.TotalRecords,
                    "DataTime": new Date().Aformat("yyyy-mm-dd hh:nn:ss.S")
                }
                var _pagerDataSet = $.AKjs.AtawJsPager(_pagerOption);
                var _ds = {};

                for (var ii = 0; ii < this.NaviFormObj.length; ii++) {
                    this.searchPostDataset = $.extend({}, this.searchPostDataset, this.NaviFormObj[ii].createPostDataSet());
                }

                if (plugDataSet) {
                    //_ds = { "SearchForm": _PlugDataSet.SearchForm, "PAGER": [_pagerDataSet] };
                    // _ds = {};
                    // _ds[_this.SearchForm.TableName] = _PlugDataSet[this.SearchForm.TableName]
                    if (this.SearchForm && plugDataSet && plugDataSet[this.SearchForm.TableName]) {
                        this.searchPostDataset = $.extend({}, this.searchPostDataset, plugDataSet[this.SearchForm.TableName][0]);
                    }
                    else {
                        if (plugDataSet[this.TableName + "_Search"]) {
                            this.searchPostDataset = $.extend({}, this.searchPostDataset, plugDataSet[this.TableName + "_Search"][0]);
                        }
                    }
                }

                if (_this.SearchForm) {
                    _ds[_this.SearchForm.TableName] = [this.searchPostDataset];
                } else if (this.NaviFormObj.length > 0) {
                    _ds[this.TableName + "_Search"] = [this.searchPostDataset];
                }




                if (_this.SetCustomSearchDataFun)
                    _ds = _this.SetCustomSearchDataFun(_ds);
                _ds["PAGER"] = [_pagerDataSet];
                _dsStr = $.toJSON(_ds);
                // alert(_dsStr);
                window.open("/core/WebService/Method?resolver=ExcelMethod&excel=ListPageExcelCreator&xml=" +
                    _this.RegName + "&form=" + _this.FormName + "&pageStyle=List" +"&ds=" + _dsStr 
                    );
                
            }
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "getControlObjBySubmitSign", function (submitSign) {
            var _$col = this.$JObj.find("[act_ds='" + submitSign + "']");
            if (_$col.length > 0) {
                _$col = _$col.eq(0);
                return _$col.AtawControl();
            }
        });

        //多页面验证 验证不通过页面标题变色处理

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "MultiPageLegal", function (formsObj) {
            var tabId = formsObj.$JObj.parent().attr("id");
            formsObj.ParentPageObj.$JObj.find("li a[href='#" + tabId + "']").toggleClass("text-danger", true);
        });

        //多页面验证，提交的时候首先将之前验证不通过的标志移除
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "MultiPageLegalInit", function () {
            var titleli = this.ParentPageObj.$JObj.find("li")
            if (titleli != null) {
                titleli.find("a").toggleClass("text-danger", false);
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "cancleColumn", function (colName, isShow) {
            //-----------
            if (isShow) {
                this.$JObj.find("[acol='" + colName + "']").show();
                this.HideColListObj[colName] = false;
            }
            else {
                this.$JObj.find("[acol='" + colName + "']").hide();
                this.HideColListObj[colName] = true;
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "reInitForm", function () {

            $.AKjs.DisposeObj(this.AtawRowList);
            //            $.each(this.AtawRowList, function (i, n) {
            //                n.dispose();
            //            });
            this.AtawRowList = [];
            this.CreateRowListData();
            $.AKjs["Init" + this.FormType + "FormContent"](this);
            this.initRowList();
            this.bindEvent();
            if (this.AfterPageSearchFun)
                this.AfterPageSearchFun(this);
            if (this.FormType == "Grid") {
                // alert(this.FormType);
                //   this.$FormContent.footable();
            }
            // this.$MainContent.find("table").footable();
            $.AKjs.AppGet().bindPageEvent(this.$JObj);

            //            if (!this.ParentPageObj.IsPart) {
            //                $.AKjs.AppGet().Url.setUrlAnchor(this.ParentPageObj.getPageState());
            //            }

            this.HideColByListObj();

        });

        this.FilterWindow = null;
        this.HideColListObj = {};
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "HideColByListObj", function () {
            //--------
            for (var str in this.HideColListObj) {
                if (this.HideColListObj[str] == true) {
                    this.$JObj.find("[acol='" + str + "']").hide();
                }
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "openColFilterWindow", function () {
            var _this = this;
            //if (this.FilterWindow) {
            //    //--------
            //     this.FilterWindow.open();

            //} else {
                //---------- 
                var _$dv = $("<div />");
                _$dv.AtawColFilter({
                    ColList: this.Form.Columns,
                    SingleCheckBoxFun: function (colName, isShow) {

                        for (var i = 0 ; i < _this.Form.Columns.length ; i++) {
                            if (_this.Form.Columns[i].Name == colName) {
                              //  if()
                                _this.Form.Columns[i].IsCheck = !isShow ? "check" : "";
                            }
                        }

                        _this.cancleColumn(colName, isShow);
                    }
                });

                _$dv.AtawWindow({
                    Title: "列筛选",
                    Width: "80%",
                    WindowCloseFun: function () {
                        // _this.IsFocus = false;
                    }
                });

                this.FilterWindow = _$dv.AtawControl();
                this.FilterWindow.open();
           // }
           
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dispose", function () {
            //var i = this.AtawRowList.length;
            $.AKjs.DisposeObj(this.AtawRowList);
            //            for (var i = 0; i < this.AtawRowList.length; i++) {
            //                if (this.AtawRowList[i]["dispose"]) {
            //                    this.AtawRowList[i].dispose();
            //                }
            //            }
            //NaviFormObj
            //            if (this.SearchForm) {
            //                this.SearchForm.dispose();
            //            }
            // this.ColumnList.dispose();
            //this.FilterWindow
            $.AKjs.DisposeObj(this.FilterWindow);
            this.AtawBaseDom_dispose();
        });

    }
})(jQuery);