(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};
    //------------根据注册名解码的实用方法
    $.AKjs.RegNameDataGet = function (regName, ds, dvBean, text, index) {
        var _oldVal = text;
        var res = "";
        var _noVal = false;

        if (regName != null) {
            var end = regName.indexOf("-");
            if (end != -1) {
                regName = regName.substring(0, end);
            }
        }

        if (dvBean.DataValueType == "Table" && !$.AKjs.IsEmpty(regName)) {
            var _dvDs = ds;
            var _rowIndex = index;
            var _dt = _dvDs[dvBean.TableName];
            var _row = _dt[_rowIndex];
            if (_dvDs && _dt && _row) {
                // var _row = _dvDs[dvBean.TableName][_rowIndex];
                // if (_row) {
                var _indexList = _row[dvBean.ColumnName + "_CODEINDEX"];
                // this.DataText = "";
                if (_indexList) {
                    if (_indexList > -1 || _indexList.length > 0) {
                        for (var _i = 0; _i < _indexList.length; _i++) {
                            var _index = _indexList[_i];
                            if (res != "") {
                                res += ",";
                            }
                            if (_dvDs[regName] && _index >= 0 && _dvDs[regName][_index]) {
                                var _codeConfig = _dvDs[regName][_index];
                                if (_indexList.length == 1) {
                                    res = _codeConfig.CODE_TEXT;
                                }
                                else
                                    res += _codeConfig.CODE_TEXT;
                                //if (_codeConfig) {
                                //  res += _codeConfig.CODE_TEXT;
                                //this.$JObjText.val(this.Text);
                                //}
                            }
                            else {

                                if (_indexList.length == 1)
                                    res = _row[dvBean.ColumnName];
                                else {
                                    res += _row[dvBean.ColumnName];
                                }
                            }
                        }

                    }
                    else {
                        res = _row[dvBean.ColumnName]; //CodeIndex等于-1时，DataText为空
                    }
                }
                else {
                    res = _row[dvBean.ColumnName]; //CodeIndex等于-1时，DataText为空
                }

                //  }


            }
        }
        else {
            if ($.AKjs.IsEmpty(text)) {
                if (dvBean.getValue)
                    text = dvBean.getValue();
            }


            res = text;
        }
        if (res === undefined || res === null || _oldVal === res) res = "";
        return res;
    }


    //----------JS插件的基类
    $.AKjs.AtawJsDataValue = function (bean, ds, val) {
        if (typeof (bean) == "string" && bean != "") {
            return  $.AKjs.AtawJsDataValueObj(bean, null);
        } else {
            if ($.AKjs.IsEmpty(bean)) {
                bean = { DataValueType: "ValueObj", Value: val };
            }
            return $.extend({}, $.AKjs.AtawClass, new AtawJsDataValue(ds), bean);
        }
    }

    $.AKjs.AtawJsDataValueObj = function (str, ds) {
        if (!$.AKjs.IsEmpty(str)) {
            if (!$.AKjs.IsEmpty(str.Value)) {
                str = str.Value;
            }
        }
        var _bean = { DataValueType: "ValueObj", Value: str };
        return $.extend({}, $.AKjs.AtawClass, new AtawJsDataValue(ds), _bean);
    }

    $.AKjs.AtawJsDataValueOrObj = function (dv, ds) {
        if ($.AKjs.IsEmpty(dv)) {
            return $.AKjs.AtawJsDataValueObj("", ds);
        }
        return $.AKjs.AtawJsDataValue(dv, ds);
    }


    $.AKjs.AtawGetJsonResult = function (url, xml, style) {
        var _res = null;
        $.AKjs.getJSON(url, { xml: xml, pageStyle: style }, function (res) {
            _res = res;
        });
        return _res;
    }

    //-----------------JS插件的基类---------
    function AtawJsDataValue(ds) {

        this.TableName = null;
        this.ColumnName = null;
        this.Index = null;
        this.FunString = null;
        this.DataValueType = null;
        this.Value = null;
        this.Ds = ds;
        this.RowFormatFun = null;
        this.DataRow = null;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "getValue", function () {
            if ($.AKjs.IsEmpty(this.DataValueType)) {
                return this["ValueObj"]();
            }
            return this[this.DataValueType]();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "RowFormat", function () {
            if (this.RowFormatFun) {
                var _row = this.Ds[this.TableName][this.Index];
                var _val = this.Ds[this.TableName][this.Index][this.ColumnName];
                return this.RowFormatFun(_val, _row);
            }
            else
                return this.Value;
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "setValue", function (vl) {
            this.Value = vl;
            this.DataValueType = "ValueObj";
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "ValueObj", function () {
            return this.Value;
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "Table", function (obj) {
            if (this.Ds[this.TableName] != undefined && this.Ds[this.TableName][this.Index] != undefined && this.Ds[this.TableName][this.Index][this.ColumnName] != undefined)
                return this.Ds[this.TableName][this.Index][this.ColumnName];
            else {
                //alert("数据解析错误");
                return null;
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "DataRow", function (obj) {
            if (this.DataRow && this.DataRow[this.ColumnName])
                return this.DataRow[this.ColumnName];
            else {
                //alert("数据解析错误");
                return null;
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "Fun", function (obj) {
            return this[FunString];
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "None", function (obj) {
            return null;
        });

    }



})(jQuery);