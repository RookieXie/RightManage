(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};


    //----------构造控件基类
    $.AKjs.AtawBaseControl = function (options) {
        return $.extend({}, $.AKjs.AtawBaseJPlugIn(options), new AtawBaseControl()).sysCreator();
    }

    //-----------------控件的基类---------
    function AtawBaseControl() {
        this.ControlTypeName = null;
        this.DataValue = null;
        this.LegalObj = null;
        this.PostSetting = null;
        this.IsChange = false;
        this.IsKey = false;
        //事件
        this.ChangeEventFun = null;
        //是否是只读状态
        this.IsReadOnly = false;
        //是否是只读状态
        this.IsReadOnlyControl = false;
        //
        this.$Detail = $("<span>&nbsp</span>");
        this.DetialFormatFun = null;

        //列对象，可以为空
        this.ParentColumnObj = null;
        this.ParentFormObj = null;
        this.ReadOnlyFun = null;
        this.DisableLegal = false;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.DataValue = $.AKjs.AtawJsDataValue(this.Options.DataValue);



            this.setProByOptName("ParentColumnObj", "ParentColumnObj");
            //ParentFormObj
            this.setProByOptName("ParentFormObj", "ParentFormObj");
            this.setProByOptName("ChangeEventFun", "ChangeEventFun");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "beforeRender", function () {
            if (this.Options.DetialFormatFun) {
                var _fun = $.AKjs.DetailFormat[this.Options.DetialFormatFun];
                if (_fun) {
                    this.DetialFormatFun = _fun;
                }
                else {
                    Ataw.msgbox.show(" DetialFormatFun方法：" + this.Options.DetialFormatFun + "未定义");
                }
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "sysInit", function () {
            this.$JObj = this.Options.containerFun();
            this.$JObj.addClass("ACT_CONTROL");

            if (this.DataValue.IsChange && this.DataValue.IsChange === true) {
                this.IsChange = true;
            }
            //this.DataValue = $.extend({}, new AtawJsDataValue(), this.Options.DataValue);
            //this.DataValue = this.Options.DataValue;
            this.IsReadOnly = this.Options.IsReadOnly;
            if ($.AKjs.IsEmpty(this.DataValue)) {
                this.DataValue = $.AKjs.AtawJsDataValueObj("");
            }
            if (typeof (this.DataValue) == "string") {
                this.DataValue = $.AKjs.AtawJsDataValueObj(this.DataValue);
            }

            this.IsKey = this.Options.IsKey;

            this.beforeRender();
            this.init();
            this.initLegal();

            if (this.Options.PostSetting) {
                this.PostSetting = this.Options.PostSetting;
            }
            this.sysInitChange();
            this.afterInit();

            // alert();
            // this.$JObj.append(this.ControlTypeName);
            // alert(this.ControlTypeName);
            if (!this.IsReadOnlyControl && this.IsReadOnly
             && this.sys_ataw_fun_name != "AtawDetailControl"
             && this.sys_ataw_fun_name != "AtawImageDetailControl"
             && this.sys_ataw_fun_name != "AtawAllImageShow"
             && this.sys_ataw_fun_name != "AtawFileDetailControl"
             )

                if (this.Options.DisplayName == "文件来源" || this.Options.DisplayName == "empty-title") { } else {
                    this.toReadStatus(true,true);
                }

            if (this.LegalObj)
                this.LegalObj.initTip();
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPrivate, "sysInitChange", function () {
            this.initChange();
        });

        //控件更新方法 和 事件
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initChange", function () {

        });


        //控件更新方法 和 事件
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "toReadStatus", function (isReadOnly,isForce) {
            if (this.IsReadOnly != isReadOnly || isForce) {
                if (isReadOnly) {
                    this.$JObj.children().hide();
                    this.$JObj.append(this.$Detail);
                    var _val = this.getReadOnlyText();
                    if (_val == "" || _val == null) {
                        _val = "&nbsp;";
                    }
                    this.$Detail.html(_val);
                }
                else {
                    this.$Detail.remove();
                    this.$JObj.children().show();

                }
                this.IsReadOnly = isReadOnly
                if (this.ReadOnlyFun) {
                    this.ReadOnlyFun(isReadOnly);
                }
            }

            // }
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getReadOnlyText", function () {
            return this.dataValue();
        });



        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initLegal", function () {
            this.LegalObj = $.AKjs.AtawBaseLegal(this);
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "enableLegal", function () {
            if (this.LegalObj) {
                this.LegalObj.enableLegal();
            }
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "disableLegal", function () {
            if (this.LegalObj) {
                this.LegalObj.disableLegal();
            }
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "afterInit", function () {
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "setSubmit", function (index) {
            if (this.PostSetting) {
                var _s = $.AKjs.CreateBuffer();
                _s.ad(this.PostSetting.TableName).ad(".").ad(this.PostSetting.ColumnName).ad(".").ad(index);
                _s = _s.toString();
                this.$JObj.attr("act_ds", _s);
                this.$JObj.addClass("ACT_POST");
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "triggerChangeEvent", function () {
            this.legal();
            this.IsChange = true;
            //if (this.LegalObj && this.LegalObj.LegalResult) {

            var _fun = this.ChangeEventFun;

            if (_fun) {
                _fun(this, this.ParentFormObj);
            }
            this.EventEmitter.emit("event_change", this, this.ParentFormObj)
            // }

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "event_change", function (fun) {
           return  this.on("event_change",fun);
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "hideLegal", function () {
            this.LegalObj.canclePoshytip();
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "legal", function () {
            if (this.LegalObj && (!this.DisableLegal)) {
                this.LegalObj.legal();
                if (!this.LegalObj.LegalResult) {
                    if (this.ParentFormObj && this.ParentFormObj.ParentPageObj &&this.ParentFormObj.ParentPageObj.$JObj.find("li")) {
                        this.ParentFormObj.MultiPageLegal(this.ParentFormObj);
                    }
                }
                return this.LegalObj.LegalResult;
            }
            return true;
        });





        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Get", function () {
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Set", function (opt_str) {

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "intoDom", function ($dom) {
            this.AtawBaseDom_intoDom($dom);
            $dom.data("ATAW_CONTROL", this);

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "getTipJobj", function () {
            return this.$JObj.parent();
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue", function (opt_str) {
            var _jObj = this.$JObj;
            if (opt_str === undefined) {
                var _dvg = this.dataValue_Get();
                if (_dvg != undefined && _dvg != null) {
                    this.DataValue.setValue(_dvg);
                }

                return this.DataValue.getValue();
            }
            else {
                this.DataValue.setValue(opt_str);
                var _isAsy = this.dataValue_Set(opt_str,
                    function () {
                        if (this.$Detail && this.$Detail.html) {
                            this.$Detail.html(this.getReadOnlyText());
                        }
                        this.triggerChangeEvent();

                    }
                    );
                if (!_isAsy) {
                    if (this.$Detail && this.$Detail.html) {
                        this.$Detail.html(this.getReadOnlyText());
                    }
                    this.triggerChangeEvent();
                }
            }
        });
    }



})(jQuery);