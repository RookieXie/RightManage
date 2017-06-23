(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};
    $.fn.AtawJsonForm = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawJsonForm", options);
    }
    $.AKjs.AtawJsonForm = function (options) {
        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawJsonForm());
    }
    function AtawJsonForm() {
        this.$Form = $('<div class=\"sourceForm  row \"><div class=\"col-lg-12  ACT-PAGE-MAIN  \"></div></div>');
        this.ModuleXml = "";
        this.$PageObj = $("<div/>");
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            this.setProByOptName("ModuleXml", "ModuleXml");
            this.AtawBaseControl_init();
            this.$JObj.append(this.$Form);
            this.initMain(this.DataValue.getValue());
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initMain", function (val) {
            var _this = this;
            var _formObj = this.ParentFormObj;
            var _action = _formObj.Action;
            _action = _action == "Insert" ? "Update" : _action;//这里改成Update是为了支持批量操作
            _action = _action == "List" ? "Detail" : _action;
            var _$main = _this.$Form.find(".ACT-PAGE-MAIN");
            var _form = null;
            var _insertForm = null;
            var res = $.parseJSON(_formObj.Data["JsonPageView"][0][this.ParentColumnObj.ColumnName + "_PageView"]);
            for (var form in res.Forms) {
                if (_form == null && form.indexOf("_INSERT") == -1) {
                    _form = res.Forms[form];
                }
                else if (form.indexOf("_INSERT") > -1) {
                    _insertForm = res.Forms[form];
                }
            }
            if (!_formObj.TempPageObjData)
            {
                _this.$PageObj["Ataw" + _action + "Page"](res);
                _formObj.TempPageObjData= _this.$PageObj.AtawControl();

            }
            var _op = { Data: val ? $.parseJSON(val) : {}, Form: _form, IsInner: true, IsPart: true, InsertForm: _insertForm, ParentPageObj: _formObj.TempPageObjData};
            //this.ModuleXml的Mode节点需要配置成Multiple，不然这里的FormType默认是Normal;HasBatchInsert属性需要配置true，否则InsertForm为null,新增的时候就不能自动添加一行；
            //如若不想支持批量操作,可自行通过js隐藏按钮
            _$main["Ataw" + _form.FormType + "Form"](_op);
            var _formObj = _$main.AtawControl();
            if (_action == "Update") {
                //新增行触发控件change事件
                _formObj.AfterAddNewRowFun = function (form, $row) {
                    $row.AtawControl().ChangeRowFun = function () {
                        _this.triggerChangeEvent();
                    };
                }
                if (_formObj.AtawRowList.length == 0 && _insertForm != null)//新增自动添加一行
                {
                    _formObj.addNewRow();
                }
                //行值改变触发控件change事件
                $.each(_formObj.AtawRowList, function (i, row) {
                    row.ChangeRowFun = function () {
                        _this.triggerChangeEvent();
                    };
                });
                //删除行触发控件change事件
                _formObj.AfterDelNewRowFun = function (form, $row) {
                    _this.triggerChangeEvent();
                }
            }
           
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Set", function (opt_str) {
            this.initMain(opt_str);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Get", function () {
            var pageObj = this.$PageObj.AtawControl();
            var _ds = this.createDataSet(this.$Form.find(".ACT-PAGE-MAIN").find(".PAGE-CONTROL.ACT_POST"), pageObj.setPostControl(), pageObj.setLegalControl());
            return $.toJSON(_ds);

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createDataSet", function ($controlList, controlFun, legalFun) {
            var _isRes = false;
            var ds = {};
            $controlList.each(function (i) {
                _this = $(this);
                var _col = _this.attr("act_ds");
                var _ctl = _this.attr("ACK");
                var _val = "";

                //--------------判断是否是控件
                var _control = _this.data("ATAW_CONTROL");

                if (_this.hasClass("ACT_POST") && _col && _control && _control.dataValue && _control.sys_ataw_fun_name != "AtawDetailControl") {
                    _val = _control.dataValue();
                    var cos = _col.split(".");
                    var _tb = cos[0];
                    var _row = cos[2];
                    var _um = cos[1];
                    $._JoinDataSet(ds, _tb, _row, _um, _val);
                }
            });
            ds = $._checkDataSet(ds);
            return ds;
        });

    }
})(jQuery);
