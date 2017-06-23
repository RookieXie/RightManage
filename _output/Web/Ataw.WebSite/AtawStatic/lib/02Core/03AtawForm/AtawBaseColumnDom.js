(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};


    $.AKjs.AtawBaseColumnDom = function (options) {
        return $.extend({}, $.AKjs.AtawBaseDom(options), new AtawBaseColumnDom()).sysCreator();
    }

    //列的基类
    function AtawBaseColumnDom() {
        this.DisplayName = null;
        this.$Column = null;
        this.AtawControlObj = null;
        this.RowIndex = 0;
        this.ColumnConfig = null;
        this.FormatterFun = null; //(rowdata , val):val 
        //重写基类
        this.Name = "";
        this.ChangeEventFunName = "";
        this.ParentFormObj = null;
        this.IsManColumn = 0;
        //行对象
        this.ParentRowObj = null;
        this.Changer = null;
        this.ColumnName = "";
        this.ParentRowObj = null;
        this.NormalStyle = null;
        this.Width = null;
        this.ShortCutName = null;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.DisplayName = this.Options.ColumnConfig.DisplayName;
            this.Prompt = this.Options.ColumnConfig.Prompt;
            var _dataValue = this.Options.DataValue;
            this.ColumnConfig = this.Options.ColumnConfig;
            this.ShortCutName = this.ColumnConfig.ShortCutName;
            this.RowIndex = _dataValue.Index;
            this.setProByOptName("FormatterFun", "FormatterFun");
            this.setProByOptName("IsManColumn", "IsManColumn");
            this.setProByOptName("Changer", "Changer");
            this.setProByOptName("Name", "Name");
            this.setProByOptName("ParentRowObj", "ParentRowObj");
            this.setProByOptName("ColumnName", "ColumnName");
            this.setProByOptName("ParentFormObj", "ParentFormObj");
            this.setProByOptName("NormalStyle", "NormalStyle");
            this.setProByOptName("Width", "Width");
            this.setProByOptName("TdStyle", "TdStyle");

            //this.setProByOptName("ChangeEventFun", "ChangeEventFun");
            if (this.Options.ColumnConfig.ChangeEventFun)
                this.ChangeEventFunName = this.Options.ColumnConfig.ChangeEventFun;

            if (this.FormatterFun) {
                _dataValue.DataValueType = "RowFormat";
                _dataValue.RowFormatFun = this.FormatterFun;
            }
            var _op = $.extend({},
            this.Options.ColumnConfig.Options,
            {
                DataValue: _dataValue,
                ChangeEventFun: this.setChangeEventFun(),
                IsReadOnly: this.Options.IsReadOnly,
                ParentColumnObj: this,
                ParentFormObj: this.ParentFormObj
            }
            );
            var _controlType = this.Options.ColumnConfig.ControlType;
            var _customControl = this.Options.ColumnConfig.CustomControl;
            if (_controlType == "Custom") {
                this.AtawControlObj = $.AKjs["Ataw" + _customControl.ControlType](_op)
            }
            else {
                if ($.AKjs["Ataw" + _controlType]) {
                    this.AtawControlObj = $.AKjs["Ataw" + _controlType](_op);
                }
                else
                    throw "_controlType 控件类型 : " + "Ataw" + _controlType + "不存在";
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            this.AtawControlObj.setSubmit(this.RowIndex);
            this.AtawControlObj.$JObj.addClass("PAGE-CONTROL");
            if (this.ShortCutName && this.ShortCutName != "") {
                this.AtawControlObj.$JObj.attr("col-shortcut", this.ShortCutName);
            }
            if (this.AtawControlObj.Options.ValPrompt == null || this.AtawControlObj.Options.ValPrompt == "") {
            } else {
                //this.AtawControlObj.$JObj.append("(" + this.AtawControlObj.Options.ValPrompt + ")");
                if ((this.ParentFormObj.Action == "Insert" || this.ParentFormObj.Action == "Update") &&
                    this.ParentFormObj.FormType == "Normal") {
                    var _str = "<div class='acs-lable-default'>" + this.AtawControlObj.Options.ValPrompt + "</div>"
                    this.AtawControlObj.$JObj.parent().append(_str);
                    //this.AtawControlObj.$JObj.addClass("col-lg-12");
                }
            }


            // this.initChangerVal();
            // this.AtawControlObj.dataValue("123");
        });
        this.IsCallChanger = false;
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setChangerVal", function (datarow) {
            //初始化。。。。。。。。。。。。。
            if (this.Changer && this.Changer.Expression) {
                var _r = this.Changer.Expression;
                //alert(_r);
                var _val = $.AKjs.Template(_r, datarow);
                //  alert(_val);
                this.IsCallChanger = true;
                this.AtawControlObj.dataValue(_val);
                this.IsCallChanger = false;
            }
            //this.AtawControlObj.dataValue("123");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setChangeEventFun", function () {
            var _this = this;
            return function (a) {
                var _col = _this.AtawControlObj;
                var legalRes = _col && _col.LegalObj && _col.LegalObj.LegalResult;

                if (legalRes && !_this.IsCallChanger) {
                    _this.exeChangeEventByChanger();
                }
                
                _this.Options.ColumnChangeFun();

                if (legalRes) {
                    _this.exeChangeEventFunName();
                }
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "exeChangeEventByChanger", function () {
            if (this.Changer && this.Changer.NotifyColumns) {
                //var _obj = this.ParentRowObj.getValObjByColNameList(this.Changer.NotifyColumns);
                //this.setChangerVal(_obj);
                for (var i = 0; i < this.Changer.NotifyColumns.length; i++) {
                    var _name = this.Changer.NotifyColumns[i];
                    var _colObj = this.ParentRowObj.getColumnObjByColName(_name);
                    if (_colObj) {
                        _colObj.setChangeEventByChanger();
                    }
                }
            }
            //alert();
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setChangeEventByChanger", function () {
            if (this.Changer && this.Changer.DependColumns) {
                var _obj = this.ParentRowObj.getValObjByColNameList(this.Changer.DependColumns);
                this.setChangerVal(_obj);
            }
            //alert();
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "exeChangeEventFunName", function () {
            if (!this.ChangeEventFunName .AisEmpty()) {
                $.AKjs.ChangeEventFun = $.AKjs.ChangeEventFun ? $.AKjs.ChangeEventFun : {};
                var _fun = $.AKjs.ChangeEventFun[this.ChangeEventFunName];
                if (_fun) {
                    _fun(this);
                }
                else {
                    alert("名称为" + this.ChangeEventFunName + "的字段配置函数未定义！");
                }
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dispose", function () {
            this.AtawControlObj.dispose();
            this.AtawBaseDom_dispose();
        });

    }

})(jQuery);
