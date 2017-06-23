(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.AKjs.AtawViewPage = function (options) {
        return $.extend({}, $.AKjs.AtawBasePage(options), new AtawViewPage()).sysCreator();
    }


    $.fn.AtawViewPage = function (options) {
        options["IsViewPage"] = true;
        $.AKjs.AtawCreateCall.call(this, "AtawViewPage", options);
    }

    function AtawSubmit() {
        this.Url = "/module/ModuleMerge";
        this.setPostDataFun = function (data, page) { return data; }; //数据，页面：数据
        this.befortPostDataFun = null; //页面：是否提交
        this.afterPostDataFun = null; //页面： 返回数据 
    }

    function AtawViewPage() {
        this.$Submit2 = $("<a  title='保存' href=\"javascript:void(0)\" class=\"btn btn-sm btn-primary   ACT-SUBIMT-BTN\" ><i class='icon-ok fa fa-check icon-white'></i> <span class='ACT-SUBMIT-TEXT'>保存</span></a>");
        this.$Submit = $("<a  title='保存' href=\"javascript:void(0)\" class=\"btn btn-sm btn-primary   ACT-SUBIMT-BTN\" ><i class='icon-ok fa fa-check icon-white'></i> <span class='ACT-SUBMIT-TEXT'>保存</span></a>");
        this.PostControlList = []; //提交的控件
        this.LegalControlList = []; //验证的控件
        this.Layout = null; //布局对象
        this.KeyValue = null; //主键
        this.NoChangeCheckFun = null; //page:bool
        this.PageStyle = "";
        this.MvcFormUrlSetFun = null; //AtawMvcForm : string

        this.AtawSubmitSetting = null;

        this.$AtawWindow = null; //弹出窗

        this.$PopupWin = $("<div/>")
        this.PageState = null;
        // this.DelRowKeyList = [];
        this.NaviContentSelector = "";

        this.OtherButtonList = [];//[{Txt,Url,Fun(pageObj)}]

        this.NoSubmitBtn = false;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "beforeInit", function () {
            // this.AtawBasePage_beforeInit();
            for (var n in this.FormObjs) {
                this.FormObjs[n].ParentPageObj = this;
            }
            if (!this.IsViewPage) {
                this.$Submit.text("保存");
                this.$Submit2.text("保存");
            }
            else {
                this.$Submit.text("提交");
                this.$Submit2.text("提交");
            }

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            var _this = this;
            if (this.IsValid) {
                //this.setProByOptName("AtawSubmitSetting", "AtawSubmitSetting");
                if (this.AtawSubmitSetting == null) {
                    this.AtawSubmitSetting = $.extend({}, new AtawSubmit(), this.Options.AtawSubmitSetting);
                }
                if (this.Options.SubmitUrl) {
                    this.AtawSubmitSetting.Url = this.Options.SubmitUrl;
                }
                this.setProByOptName("NoSubmitBtn", "NoSubmitBtn");
                this.setProByOptName("NoChangeCheckFun", "NoChangeCheckFun");
                this.setProByOptName("IsViewPage", "IsViewPage");
                this.setProByOptName("NaviContentSelector", "NaviContentSelector");
                this.setProByOptName("OtherButtonList", "OtherButtonList");
                this.Layout = this.Options.Layout;
                this.KeyValue = this.Options.KeyValue;

                if (this.NaviContentSelector != "" && typeof (this.NaviContentSelector) == "string") {
                    this.$NaviContentSelector = $(this.NaviContentSelector);
                }
                if (this.NaviContentSelector instanceof $) {
                    this.$NaviContentSelector = this.NaviContentSelector;
                }

                // this.NaviContentSelector =

                for (var i in this.Forms) {
                    var n = this.Forms[i];
                    if (!i.AendWith("_INSERT", true) && !i.AendWith("_SEARCH", true) && !n.HasInitByInnerForm) {
                        var _searchForm = null;
                        if (n.HasSearch) {
                            _searchForm = _this.Forms[i + "_SEARCH"];
                        }
                        var _insertForm = null;
                        // if (n.HasBatchInsert) {
                        _insertForm = _this.Forms[i + "_INSERT"];
                        //}
                        var _op = {
                            IsInner: _this.IsInner,
                            IsViewPage: _this.IsViewPage,
                            Data: _this.Data,
                            Tpl: n.Tpl,
                            Form: n,
                            SearchForm: _searchForm,
                            RegName: _this.RegName,
                            InsertForm: _insertForm,
                            ParentPageObj: _this,
                            ExtData: _this.ExtData,
                            NaviContentSelector: _this.NaviContentSelector
                        };
                        if (_this.ExtData && _this.ExtData.PageState) {
                            var pageState = $.parseJSON(Base64.decode(_this.ExtData.PageState));
                            if (pageState.formType) {
                                n.FormType = pageState.formType;
                            }
                        }
                        var _fromType = n.FormType;
                        var _fromObj = $.AKjs["Ataw" + _fromType + "Form"](_op);
                        _this.FormObjs[_fromObj.FormName] = _fromObj;
                    }
                }



                //插入mvcForm
                for (var _fromName in this.Options.MvcForms) {
                    // var _from = this.Options.MvcForms[_i];
                    //var _op = _from.RoutesInfo;
                    var _form = this.Options.MvcForms[_fromName];
                    var _op = $.extend({}, _form.DataRoute, _form,
                    {
                        UrlSetFun: _this.Options.MvcFormUrlSetFun,
                        ParentPageObj: _this
                    }
                     );
                    var _formObj = $.AKjs.AtawMvcForm(_op);
                    _this.FormObjs[_fromName] = _formObj;
                }
                //--------
                //插入scriptForm
                for (var _fromName in this.Options.ScriptForms) {
                    // var _from = this.Options.MvcForms[_i];
                    //var _op = _from.RoutesInfo;
                    var _form = this.Options.ScriptForms[_fromName];
                    var _op = $.extend({}, _form, {
                        Data: _this.Data,
                        ExtData: _this.ExtData,
                        ParentPageObj: _this
                    });
                    var _formObj = $.AKjs.AtawScriptForm(_op);
                    _this.FormObjs[_fromName] = _formObj;
                }
                for (var _fromName in this.Options.SeaForms) {
                    // var _from = this.Options.MvcForms[_i];
                    //var _op = _from.RoutesInfo;
                    var _form = this.Options.SeaForms[_fromName];
                    var _op = $.extend({}, _form, 
                        {
                            Data: _this.Data,
                            ExtData: _this.ExtData,
                            ParentPageObj: _this
                        }
                     );
                    var _formObj = $.AKjs.AtawSeaForm(_op);
                    _this.FormObjs[_fromName] = _formObj;
                }


            }

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initButtonList", function ($row) {
            var _this = this;
            var _len = this.OtherButtonList.length;
            for (var i = 0 ; i < _len ; i++) {
                var _item = this.OtherButtonList[i];
                var $item = $("<a   href=\"javascript:void(0)\" class=\"btn btn-large btn-primary   \" ><i class='icon-ok fa fa-check icon-white'></i></a>");
                $item.find("i").text(_item.Txt);
                $item.addClass(_item.ClassName);
                $item.attr("url", _item.Url);
                $item.data("ITEM", _item);
                $row.find('.center-block').append($item).append("&nbsp;");
                
                $item.off("click").click(function () {
                    $(this).trigger("click-before");
                    var _url = $(this).attr("url");
                    // alert($(this).text());
                    var __item = $(this).data("ITEM");
                    if (__item.NoSubmit) {
                        $.AKjs.getJSON(_url, function (a) {
                            $(this).trigger("click-after", a);
                        });
                    } else {
                        _this.submit(_url);
                        $(this).trigger("click-after");
                    }
                   
                });
            }

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initHeader", function () {
            var $btnGroup = $('<div class="btn-group pull-right"></div>');
            var $row = $('<div class="row "><div class="center-block ACT-PAGE-CENTER ta0"></div></div>');
            // alert(123);
            var _this = this;

            this.initButtonList($row);
            if (!this.NoSubmitBtn) {
                this.$Submit2.click(function () {
                    //   alert();
                    _this.submit();
                    // _this.submit();
                });
                $row.find('.center-block').append(this.$Submit2);
            }
            this.$PanelHeader.append($btnGroup).append($row);
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "submit", function (customerUrl) {
            var _this = this;

            _this.$Submit.hide(); //关于提交按钮隐藏，有没有必要待分析
            _this.$Submit2.hide();
            //alert();
            //将之前因验证未通过而改变颜色的标题恢复至初始样式
            for (var n in this.FormObjs) {
                this.FormObjs[n].MultiPageLegalInit();
                break;
            }
            var _PlugDataSet = _this.$JObj.find(".PAGE-CONTROL.ACT_POST").CreateLegalDataSet(_this.setPostControl(), _this.setLegalControl());

            //验证不通过
            if (_PlugDataSet == 0) {
                _this.$Submit.show();
                _this.$Submit2.show();
                return false;
            }

            var _delete = _this.deleteForm();
            //---
            if (_PlugDataSet == 1 && _delete === false) {
                if (_this.NoChangeCheckFun) {
                    if (_this.NoChangeCheckFun(_this)) {
                        _PlugDataSet = {};
                    }
                }
                else {
                    _this.notPostData();
                    _this.$Submit.show();
                    _this.$Submit2.show();
                    return false;
                }

            }
            if (_delete === false) {
                _delete = {};
            }
            var _ds = $.extend({}, _PlugDataSet, _delete, _this.createKeyValueTable());
            if (_this.AtawSubmitSetting.setPostDataFun) {
                _ds = _this.AtawSubmitSetting.setPostDataFun(_ds, _this);
            }
            _ds = $.toJSON(_ds);
            //if (_this.AtawSubmitSetting)
            //模拟数据提交
            if (_this.AtawSubmitSetting.befortPostDataFun ? _this.AtawSubmitSetting.befortPostDataFun(_ds, _this) : true) {
                $.AKjs.getJSON(customerUrl ? customerUrl : _this.AtawSubmitSetting.Url, { xml: _this.RegName, ds: _ds, pageStyle: _this.PageStyle, callback: Math.random() }, function (data) {
                    //_this.$Submit.show();

                    if (data.LegalException) {
                        //Ataw.msgbox.show(data.Error, 4, 2000);
                       alert(data.Error);
                       _this.$Submit.show(); //关于提交按钮隐藏，有没有必要待分析
                       _this.$Submit2.show();
                    }
                    else {

                        if (data.res > 0) {
                            _this.afterPostData(data.keys);
                            Ataw.msgbox.show("操作成功！", 4, 2000);
                        } else {
                            Ataw.msgbox.show("操作失败,请核实！", 5, 2000);
                        }
                        if (_this && _this.AtawSubmitSetting && _this.AtawSubmitSetting.afterPostDataFun) {
                            _this.AtawSubmitSetting.afterPostDataFun(_this, data);
                        }
                    }
                }, {
                    complete: function (xhr) {
                        //  Ataw.msgbox.show(" 加载完成...");
                        // Ataw.msgbox.hide(); //隐藏加载提示
                        if (_this && _this.$Submit)
                            _this.$Submit.show(1000); //关于提交按钮隐藏，有没有必要待分析
                        if (_this && _this.$Submit2)
                        _this.$Submit2.show(1000);
                        xhr = null;
                        $.HideAjax();
                    },
                });
            }
            // _this.$Submit.show(); //防止服务端报错，而此时的提交按钮处在隐藏状态，即使重新填写数据，也不能点击提交按钮触发此函数，造成无法提交。 ZGL 2013-08-20
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "operateButtonWithFormName", function (pageStyle, key, tableName) {
            var _this = this;
            if (!key && this.KeyValues && this.KeyValues.length === 1) {
                key = this.KeyValues[0];
            }
            if (!key || !pageStyle) return;
            if (pageStyle === "Delete") {
                if (!tableName) return;
                var _ds = {};
                var _tblName = tableName + "_OPERATION";
                _ds[_tblName] = [{ OperationName: pageStyle, KeyValue: key, Data: null}];
                if (confirm("你确定要删除吗?")) {
                    this.deleteRows(_ds);
                }
            } else {
                this.openNewXmlPage(this.RegName, pageStyle, key);
            }

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "deleteRows", function (ds) {
            var _this = this;
            if (!ds) return;
            ds = $.toJSON(ds);
            var _url = _this.Options.SubmitUrl ? _this.Options.SubmitUrl : "/module/ModuleMerge";
            $.AKjs.getJSON(_url, { xml: _this.RegName, ds: ds, callback: Math.random() },
                function (data) {
                    if (data.LegalException) {
                        alert(data.Error);
                    }
                    else {

                        if (data.res > 0) {
                            Ataw.msgbox.show("操作成功！", 4, 2000);
                            _this.afterPostData();

                        } else {
                            Ataw.msgbox.show("操作失败,请核实！", 5, 2000);
                        }
                    }
                });
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "openAtawWindow", function () {
            alert();
            this.$AtawWindow.slideDown("slow");
            this.$JObj.slideUp("slow");
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "closeAtawWindow", function () {
            this.$AtawWindow.hide(300);
            this.$JObj.show(200);
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initAtawWindow", function () {
            if (this.$AtawWindow == null) {
                var _$pageWindow = this.$JObj.parent().find(".PAGE-WINDOW-ACT");
                if (_$pageWindow.length > 0) {
                    _$pageWindow.html("");
                    this.$AtawWindow = _$pageWindow.eq(0);
                }
                else {
                    this.$AtawWindow = $("<div class='PAGE-WINDOW-ACT' style='display:none; float:left;' ></div>");
                    this.$JObj.parent().append(this.$AtawWindow);
                }
            }
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initFooter", function () {
           
                var _this = this;
                var $row = $('<div class="row "><div class="center-block ACT-PAGE-CENTER ta0"></div></div>');
                

                this.initButtonList($row);
                if (!this.NoSubmitBtn) {
                    this.$Submit.click(function () {
                        _this.submit();
                        // _this.submit();
                    });
                    $row.find('.center-block').append(this.$Submit);
                }
                this.$PanelFooter.append($row);
              
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initForms", function () {
            var _this = this;
            this.initAtawWindow();
            var $naviDiv = $('<div class="acs-bs-sidebar"/>');
            var $naviUl = $('<ul class="nav nav-pills nav-stacked"/>');
            $naviDiv.append($naviUl);
            for (var i in this.Layout) {
                var n = this.Layout[i];
                if (n.ShowKind == "Tab") {
                    var options = { Layout: n, $JObj: _this.$JObj, FormObjs: _this.FormObjs, MvcForms: _this.MvcForms, IsVertical: n.VerticalTab, $FormNaviContain: $naviUl };
                    _this.$PanelBody.AtawTabsLayout(options);
                }
                else if (n.ShowKind == "Tile") {
                    for (var j in n.Panels) {
                        var m = n.Panels[j];
                        if (_this.FormObjs[m.FormName] && !_this.FormObjs[m.FormName].HasInitByInnerForm) {
                            var $dv = $("<form class='tabbable fn-bottom' id='OA_Weekly38' style='background:#fff;'></form>");
                            var $searchHeadTitle = $("<div class='Hu-search-title'><span >搜索条件</span><div class='pull-right Hu-pointer ACT-SEARCH-TOGGLE'>收起<i class='fa fa-long-arrow-up'></i></div></div>");                           

                           _this.$PanelBody.append($dv);
                           
                            _this.FormObjs[m.FormName].intoDom($dv);
                            var id = $dv.attr("id");
                            if (!id) {
                                id = m.FormName + $.AKjs.getUniqueID();
                                $dv.attr("id", id);
                            }
                            var $li = $("<li class='act-bind'><a href='#" + id + "'>" + _this.FormObjs[m.FormName].Title + "</a></li>");
                            var showTabFun = (function ($dv) {
                                return function () {
                                    $naviUl.find("li").each(function () {
                                        $(this).removeClass("active");
                                    });
                                    $(this).addClass("active");
                                    var top = $dv.getElementTop();
                                    window.scrollTo(0, top);
                                    return false;
                                }
                            })($dv);
                            $li.click(showTabFun);
                            $naviUl.append($li);

                            //搜索区域折叠
                            
                            if (!(_this.$PanelBody.find(".ConditionDiv").length == 0)) {
                                _this.$PanelBody.before($searchHeadTitle);
                            }
                            var $searchToggle = _this.$JObj.find(".ACT-SEARCH-TOGGLE");
                            var searchToggleFun = (function ($searchHeadTitle) {
                                return function () {
                                    

                                    var $text = $searchToggle.text();
                                    if ($text == "展开") {
                                        $searchToggle.html("收起<i class='fa fa-long-arrow-up'></i>");
                                    } else {
                                        $searchToggle.html("展开<i class='fa fa-long-arrow-down'></i>");
                                    }
                                    
                                    $dv.find(".ConditionDiv").slideToggle("fast");
                                }
                            })($searchHeadTitle);
                            $searchToggle.click(searchToggleFun);
                        }
                    }
                }
            }
            var isMultiForm;
            if (this.Layout.length > 1) isMultiForm = true;
            else if (this.Layout.length == 1 && this.Layout[0].Panels.length > 1) isMultiForm = true;

           
        });

    

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "appendDelTable", function (ds) {
        });


    


        //隐藏提示信息
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "hideTip", function () {
            $.each(this.LegalControlList, function (i, obj) {
                obj.hideLegal();
            });
            this.LegalControlList = [];
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "notPostData", function () {
            Ataw.msgbox.show("页面的数据没有变更，无法提交！", 4, 2000);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "afterPostData", function () {
            for (var i = 0; i < this.PostControlList.length; i++) {
                var _col = this.PostControlList[i];
                _col.IsChange = false;
            }
            this.PostControlList = [];
            var _this = this;
            $.each(_this.FormObjs, function (i, n) {
                _this.FormObjs[i].DelKeyList = [];
            });
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "setPostControl", function () {
            var _this = this;
            return function (control) {
                _this.PostControlList.push(control);
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "createKeyValueTable", function () {
            return { PAGE_SYS: [{ KeyValue: this.KeyValue, PageStyle: this.PageStyle}] }

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "setLegalControl", function () {
            var _this = this;
            return function (control) {
                _this.LegalControlList.push(control);
            }
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "openListPage", function (keys) {
            var _url = this.RegName;
            if (this.ReturnUrl) {
                //                if (keys) {
                //                    _url = this.ReturnUrl + "$" + Base64.encode($.toJSON({ keys: keys }));
                //                } else {
                _url = this.ReturnUrl;
                //}
            }
            else {
                _url = "$$" + this.RegName;
            }
            $.AKjs.AppGet().openUrl(_url);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "openPreviousPage", function () {
            var _app = $.AKjs.AppGet();
            var _url = this.RegName;
            if (this.ReturnUrl) {
                _url = this.ReturnUrl;
                _app.openUrl(_url);
                return;
            }
          
            if (_app.M && _app.M.History && _app.M.History.length >= 2) {
                _app.Url.backHistory();
                return;
            }
            else {
                _url = "$$" + this.RegName;
                _app.openUrl(_url);
                return;
            }
            
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "openNewXmlPage", function (xml, pageStyle, key, setDataFun, afterPageFun) {
            if (!xml) {
                xml = this.RegName;
            }
            var param = {};
            if (!pageStyle) {
                pageStyle = "List";
            }
            if (key) {
                param.keys = key;
            } else {
                param.keys = this.KeyValues.toString();
            }
            param.additionData = {};
            if (setDataFun) {
                setDataFun = setDataFun(this, param.additionData);
            }
            if (afterPageFun) {
                //                afterPageFun = afterPageFun.toString();
                //                var funName = $.AKjs.getFunName(afterPageFun);
                //                if (funName) {
                //                    var index = afterPageFun.indexOf(funName);
                //                    afterPageFun = afterPageFun.substring(0, index) + afterPageFun.substring(index + funName.length);
                //                }
                //                afterPageFun = "return " + afterPageFun;
                var _str = $.AKjs.SetFunObjByName("page_open", afterPageFun);
                param.OpenFunAfterInit = _str;
            }
            $.AKjs.AppGet().openUrl("$windefault$" + xml.substring(0, xml.indexOf('.xml')) + "$" + pageStyle + "$" + Base64.encode($.toJSON(param)));
        });
        //页面状态
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getPageState", function () {
            if (this.PageState == null) {
                this.PageState = {};
            }
            var route;
            if (this.Route) {
                route = "$" + this.Route + "$";
            } else {
                route = "$$";
            }
            return route + this.RegName.substring(0, this.RegName.indexOf('.xml')) + "$" + this.PageStyle + "$" + Base64.encode($.toJSON(this.PageState))
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setPageState", function () {
        });
        //        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getShortcutBtnJObj", function () {
        //            var _this = this;
        //            var name, href;
        //            if (this.ExtData) {
        //                name = this.ExtData.DeskShortcutName;
        //                href = this.ExtData.DeskShortcutHref;
        //            }
        //            var _$shortcutBt = $('<button type="button" class="btn  btn-xs"><i class="icon-star-empty" />桌面快捷方式</button>');
        //            _$shortcutBt.unbind("click").bind("click", function () {
        //                _this.createDesktopShortcutWin(name, href);
        //            })
        //            return _$shortcutBt;
        //        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "createDesktopShortcutWin", function (name, href) {
            var _this = this;
            name = name ? name : _this.Title;
            href = href ? href : _this.getPageState();
            _this.$AtawWindow.html("");
            var $shortcutDv = $('<div class="form-horizontal">'
            + '<div class="control-group">'
            + '<label class="control-label" for="inputName">名称:</label>'
            + '<div class="controls">'
            + '<input type="text" id="inputName" value="' + name + '">'
            + '</div>'
            + '</div>'
            + '<div class="control-group">'
            + '<label class="control-label" for="inputLink">链接地址:</label>'
            + '<div class="controls">'
            + '<input type="text" id="inputLink" value="' + href + '" disabled>'
            + '</div>'
            + '</div>'
            + '<div class="control-group">'
            + '<label class="control-label" for="textareaDescription">描述:</label>'
            + '<div class="controls">'
            + '<textarea rows="3" id="textareaDescription"></textarea>'
            + '</div>'
            + '</div>'
            + '<div class="form-actions">'
            + '<button type="button" class="btn btn-primary" id="shortcutSave">保存</button>'
            + '<button type="button" class="btn" id="shortcutCancel">取消</button>'
            + '</div>'
            + '</div>');
            _this.$AtawWindow.append($shortcutDv);
            //            _this.$PopupWin.AtawWindow({
            //                Title: "创建桌面快捷方式",
            //                Width: 400,
            //                Fixed: true
            //            });
            //var popupWinObj = _this.$AtawWindow.AtawControl();
            $shortcutDv.find("#shortcutSave").click(function () {
                var name = $shortcutDv.find("#inputName").val();
                var link = $shortcutDv.find("#inputLink").val();
                var description = $shortcutDv.find("#textareaDescription").val();
                if (!name || !link) {
                    alert("名称或链接为空");
                    return false;
                }
                var _ds = { "Ataw_UserDesktopShortcut": [{ "FID": "", "Name": name, "Link": link, "Description": description}], "PAGE_SYS": [{ "KeyValue": null, "PageStyle": "Insert"}] }
                $.AKjs.getJSON("/module/ModuleMerge", { xml: "module/right/user/usershortcut.xml", ds: $.toJSON(_ds), callback: Math.random() }, function (data) {
                    if (data.res > 0) {
                        _this.closeAtawWindow();
                    } else {
                        Ataw.msgbox.show("操作失败,请核实！", 5, 2000);
                    }
                });
            })
            $shortcutDv.find("#shortcutCancel").click(function () {
                _this.closeAtawWindow();
            })
            this.openAtawWindow();
        })

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "filesupload", function (fromssss) {
            var _this = this;
            this.AtawFilesUpload({
                "FileExtension": "*.doc;*.zip",
                "FileSize": 1048576,
                "StorageName": "UserFile",
                "UploadName": "FileUpload"
            });
            $shortcutDv.find("#shortcutCancel").click(function () {
                _this.closeAtawWindow();
            })
            this.openAtawWindow();
        })


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "loadOtherPage", function (xml, ds, pageStyle) {
            var _this = this;
            $.AKjs.getJSON("/module/module", { xml: xml, ds: ds, pageStyle: pageStyle }, _fun1);
            function _fun1(res) {
                _this.$JObj.html("");
                _this.$JObj["Ataw" + pageStyle + "Page"](res);
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dispose", function () {
            this.$JObj.find(".act-bind").unbind();
            // this.ColumnList.dispose();
            $.AKjs.DisposeObj(this.Layout);
            this.AtawBasePage_dispose();
        });
    }
})(jQuery);
