(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};


    //----------构造控件基类
    $.AKjs.AtawBasePage = function (options) {
        return $.extend({}, $.AKjs.AtawBaseJPlugIn(options), new AtawBasePage()).sysCreator();
    }

    //-----------------控件的基类---------
    function AtawBasePage() {
        this.Url = "/module/module";
        this.Data = null;
        this.Forms = [];
        this.MvcForms = {};
        this.Title = null;
        this.Layout = null;
        this.Scripts = [];

        this.PageStyle = null;
        this.RegName = null;
        this.DataSet = null;
        this.FormObjs = {};
        this.KeyValues = [];

        this.IsViewPage = false;
        this.DataButtons = [];
        this.PageButtons = [];
        this.Header = null;
        this.IsValid = true; //是否已验证页面
        this.ExtData = null;
        // this.ScriptPageFunList = [];
        this.ReturnUrl = null;
        this.Route = "";
        this.IsPart = false;
        this.IsInner = false;
        this.HasNavi = false;

        this.NoDbClick = false;

        this.$PagePanel = $('<div class="panel pd0" />');  //class="panel panel-default"/
        this.$PanelHeader = $('<div class="panel-heading  ACT-PAGE-TITLE">&nbsp;</div');
        this.$PanelBody = $('<div class="ui-body-bg pd0"></div');
        this.$PanelFooter = $('<div class="panel-footer"></div>');  //class="panel-footer"

        this.FunAfterInit = null; //void(this)
        this.SysFunAfterInit = null;
        this.OpenFunAfterInit = null;

        this.PageSourceData = null;
        this.BeforeHook = null;
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "creator", function () {
            this.Data = this.Options.Data;
            this.Forms = this.Options.Forms;
            this.Title = this.Options.Title;
            this.Layout = this.Options.PageLayout;
            this.RegName = this.Options.RegName;
            this.MvcForms = this.Options.MvcForms;
            this.setProByOptName("Scripts", "Scripts");
            this.setProByOptName("NoDbClick", "NoDbClick");
            // this.Scripts = this.Options.Scripts;
            this.setProByOptName("IsInner", "IsInner");
            this.setProByOptName("DataButtons", "DataButtons");
            this.setProByOptName("Header", "Header");
            this.setProByOptName("ExtData", "ExtData");
            this.setProByOptName("ReturnUrl", "ReturnUrl");
            this.setProByOptName("Route", "Route");
            this.setProByOptName("IsPart", "IsPart");
            this.setProByOptName("FunAfterInit", "FunAfterInit");
            //SysFunAfterInit
            this.setProByOptName("SysFunAfterInit", "SysFunAfterInit");

            this.setProByOptName("BeforeHook", "BeforeHook");
            this.setProByOptName("AfterHook", "AfterHook");

            this.setProByOptName("OpenFunAfterInit", "OpenFunAfterInit");
            if (this.Header == null || (this.Header != null && this.Header.IsValid)) {
                this.IsValid = true;
            }
            else
                this.IsValid = false;
            this.setProByOptName("PageButtons", "PageButtons");
            this.setProByOptName("PageSourceData", "PageSourceData");

        });



        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "buttonCreate", function (rights, batchable) {
            var _btnList = [];
            //            for (var _obj in this.PageButtons) {
            //                _btnList.push(this.PageButtons[_obj]);
            //            }
            for (var _i = 0; _i < rights.length; _i++) {
                var _rig = rights[_i];
                var _btn = this.DataButtons[_rig];
                if (_btn) {
                    _btn["IsData"] = true;
                    if (batchable) {
                        if (!_btn["Unbatchable"])
                            _btnList.push(_btn);
                    }
                    else
                        _btnList.push(_btn);
                }
            }

            return _btnList;
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initToolbar", function () {
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
          
           
            var _this = this;
            if (!_this.IsInner && _this.$PanelHeader) {
                _this.$PagePanel.append(_this.$PanelHeader);
            }
            _this.$PagePanel.append(_this.$PanelBody);
            _this.$PagePanel.append(_this.$PanelFooter);
            var _fun = $.AKjs.PageAfterLoadFun;
            if (_fun) {
                $.AKjs.PageAfterLoadFun = null;
            }

            var _initPageFun = function () {
                if (_this.BeforeHook) {
                    if ($.AKjs.PageHook[_this.BeforeHook]) {
                        $.AKjs.PageHook[_this.BeforeHook](_this);
                    }

                }
                _this.emit("beforeInit", this);
                if (_this.$JObj.find(".ACT-PANEL-BODY").length > 0)
                {
                    _this.$JObj.find(".ACT-PANEL-BODY").append(_this.$PagePanel);
                }
                else
                {
                    _this.$JObj.append(_this.$PagePanel);
                }
                _this.initHeader();
                _this.initBody();
                _this.initFooter();
                // _this.initForms();

                var _fun = $.AKjs.PageAfterLoadFun;
                if (_fun) {
                    _fun();
                }
                _this.afterAsyInit();
            };

            if (this.IsValid) {

                var _jsLen = _this.Scripts.length;

                if (_jsLen > 0) {
                    var _lab = $LAB.setOptions({ CacheBust: true });
                    for (var i = 0; i < _jsLen; i++) {
                        _lab = _lab.script(_this.Scripts[i].Path).wait();
                    }
                    _lab.wait(_initPageFun);
                }
                else {
                    _initPageFun();
                }
            }
            else {
                // this.IsValid = false;
                if (this.Header != null && !this.Header.IsValid) {
                    //alert(this.Header.Message);/// <reference path="../../../../Content/PlatformThemes/SapphireBlue/images/locked.png" />

                    var _html = '<div class="locked text-center ">' +
                       ' <img src="/Content/PlatformThemes/SapphireBlue/images/locked.png" />' +
                       ' <p>' + this.Header.Message + '</p>' +
                    '</div>';
                    this.$JObj.html(_html);
                }
            }
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "afterAsyInit", function () {
            $.AKjs.AppGet().reloadToggle(this.$JObj);
            if (this.FunAfterInit) {
                this.FunAfterInit(this);
            }
            if (this.SysFunAfterInit) {
                this.SysFunAfterInit(this);
            }
           
            if (this.OpenFunAfterInit) {
                var _objFun = $.AKjs.GetFunObjByName(this.OpenFunAfterInit);
                if (_objFun) {

                    _objFun(this);
                }
                //                this.OpenFunAfterInit(this);
                this.OpenFunAfterInit = null;
            }
            this.emit("afterAsyInit",this);
            //------------
//            alert(this.$PanelHeader.html());
//            if (this.$PanelHeader.html() == "&nbsp;") {
//                alert();
//            }
            //this.SysFunAfterInit = null;
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initForms", function () {
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "afterInit", function () {
            // $.AKjs.AppGet().reloadToggle(this.$JObj);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initScript", function () {
            if (this.Script) {
                this.$PagePanel.append("<script src='" + this.Script.Path + "'></script>");
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initTitle", function () {
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initHeader", function () {

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initBody", function () {
            this.initForms();
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initFooter", function () {
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "afterPostData", function () {
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dispose", function () {

            $.AKjs.DisposeObj(this.FormObjs);
            $.AKjs.DisposeObj(this.DataButtons);
            $.AKjs.DisposeObj(this.PageButtons);
            this.AtawBaseDom_dispose();

        });

        //删除按钮事件
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "deleteForm", function () {
            var isDel = false;
            var _this = this;
            _this.KeyValues = [];
            var _ds = {};
            //遍历所有的form
            $.each(this.FormObjs, function (i, n) {
                if (n && !n.IsMvcForm) {
                    var _keys = n.DelKeyList;
                    var _tblName = n.TableName + "_OPERATION";
                    var _rows = _ds[_tblName] = [];
                    $.each(_keys, function (key, val) {
                        var _row = { OperationName: null, KeyValue: null, Data: null };
                        _rows.push(_row);
                        _row.OperationName = "Delete";
                        _row.KeyValue = val;
                        _this.KeyValues.push(val);
                        if (!isDel)
                            isDel = true;
                    });
                }
            });
            if (!isDel) { return false; } //表示没有删除的行
            return _ds;
            // return $.toJSON(_ds);
        });
    }



})(jQuery);