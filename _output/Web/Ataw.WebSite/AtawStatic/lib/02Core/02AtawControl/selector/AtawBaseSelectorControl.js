(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    //继承基类
    $.AKjs.AtawBaseSelector = function (options) {
        return $.extend({}, $.AKjs.AtawText(options), new AtawBaseSelectorControl()).sysCreator();
    };
    function AtawBaseSelectorControl() {
        this.DataText = "";
        this.$JObjText = null;
        this.RegName = null;
        this.OnPostDataSetFun = null;
        //    this.setProByOptName("OnPostDataSetFun", "OnPostDataSetFun");

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.setProByOptName("OnPostDataSetFun", "OnPostDataSetFun");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {

            this.RegName = this.Options.RegName;

            if (this.RegName != null) {
                var end = this.RegName.indexOf("-");
                if (end != -1) {
                    this.RegName = this.RegName.substring(0, end);
                }
            }

            this.$JObjText = this.createItem(); //创建文本控件
            //this.DataText = "";
            this.setDefaultText();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "postDataSetFun", function (opt_str) {
            var _this = this;
            return function (ds) {
                if (_this.OnPostDataSetFun) {
                    return _this.OnPostDataSetFun(ds, _this);
                }
                return ds;
            };
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getPostDsStr", function () {
            var ds = {};
            ds = this.postDataSetFun()(ds);
            var _strDs = $.toJSON(ds);
            return _strDs;
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setDataText", function (dataText) {
            this.DataText = dataText;
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getReadOnlyText", function () {
            return this.DataText;
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getCodeConfigs", function () {
            var codeConfigs = [];
            if (this.DataValue.DataValueType == "Table") {
                var _dvDs = this.DataValue.Ds;
                var _rowIndex = this.DataValue.Index;
                if (_dvDs && _dvDs[this.DataValue.TableName] && _dvDs[this.DataValue.TableName][_rowIndex]) {
                    var _row = _dvDs[this.DataValue.TableName][_rowIndex];
                    var _indexList = _row[this.DataValue.ColumnName + "_CODEINDEX"];
                    if ($.isArray(_indexList)) {
                        var _index;
                        for (var i = 0; i < _indexList.length; i++) {
                            _index = _indexList[i];
                            if (_dvDs[this.RegName] && _index > -1) {
                                var _codeConfig = _dvDs[this.RegName][_index];
                                if (_codeConfig) {
                                    codeConfigs.push(_codeConfig);
                                }
                            }
                        }
                    }
                    else if (_indexList > -1) {
                        if (_dvDs[this.RegName]) {
                            var _codeConfig = _dvDs[this.RegName][_indexList];
                            if (_codeConfig) {
                                codeConfigs.push(_codeConfig);
                            }
                        }
                    }
                }
                
            } else {
                var _dvDs = this.DataValue.Ds;
                if (_dvDs && _dvDs[this.RegName])
                {

                }

            }
            return codeConfigs;
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setDefaultText", function () {
            //this.AtawBaseControl_dataValue_Set(opt_str);
            //var _text = "";
            if (this.DataValue.DataText) {
                this.DataText = this.DataValue.DataText.getValue();
            }
            else {
                var codeConfigs = this.getCodeConfigs();
                var dataText = [];
                for (var i = 0; i < codeConfigs.length; i++) {
                    dataText.push(codeConfigs[i].CODE_TEXT);
                }
                this.DataText = dataText.toString();
            }
            this.$JObjText.val(this.DataText.AgetTextByHtml());
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Set", function (opt_str) {
            this.DataValue.setValue(opt_str);
            this.AtawBaseControl_dataValue_Set(opt_str);
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getSelectValue", function (event) {

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "createItem", function () {
            return $("<TextArea  placeholder='' type='text' class='input-border input-disabled form-control ask-input' readonly='readonly'  />");
        });
        //        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "createItem", function () {
        //            return $("<input class='form-control' type='" + this.getTypeName() + "' readonly='readonly'/>");
        //        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setDefaultData", function (codeValue, codeText) {

        });
    }
})(jQuery);
