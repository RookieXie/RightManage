(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.AKjs.AtawTreeGridPage = function (options) {
        return $.extend({}, $.AKjs.AtawListPage(options), new AtawTreeGridPage()).sysCreator();
    }


    $.fn.AtawTreeGridPage = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawTreeGridPage", options);
    }

    function AtawTreeGridPage() {
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initPager", function (pageIndex) {
        });
        //添加表体
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initBody", function () {
            var _header = this.Forms[this.ListFormName];
            var _content = this.Data[_header.TableName];
            var _data = this.Data;
            this.$Grid.find("td").parents("tr").remove();

            if (_content != undefined && _content != null) {
                var _strb = $.AKjs.CreateBuffer("");
                $.each(_content, function (i, row) {
                    var _buttons = row["BUTTON_RIGHT"];
                    if (_buttons == null || _buttons == undefined) {
                        _buttons = "";
                    }

                    var _id = row[_header.PrimaryKey];
                    var _pid = row[_header.ParentKey];

                    _strb.ad("<tr  id=\"" + _id + "\" pId=\"" + _pid + "\">");
                    _strb.ad("<td class=\"cbk_panel\"><input type=\"checkbox\" class=\"ACT-CHECK-SINGLE ckb_input\" buttons=\"" + _buttons + "\" key=\"" + row[_header.PrimaryKey] + "\"/></td>");
                    $.each(_header.Columns, function (key, col) {
                        var _dataText = row[col.Name];
                        _dataText = $.AKjs.RegNameDataGet(col.Options.RegName, _data, col.Options.DataValue, _dataText, i);

                        var isFormat = false;
                        if (_dataText == null || _dataText.toString() == "") {
                            _dataText = "_";
                        }
                        else {
                            if (col.Options.DetialFormatFun) {
                                var _fun = $.AKjs.DetailFormat[col.Options.DetialFormatFun];
                                if (_fun) {
                                    _dataText = _fun(_dataText);
                                    isFormat = true;
                                }
                                else {
                                    Ataw.msgbox.show(" DetialFormatFun方法：" + col.Options.DetialFormatFun +"未定义");
                                }
                            }
                        }
                        if (_dataText.length > 25 && !isFormat) {
                            var _txt = _dataText;

                            _dataText = "<span title='" + _txt + "'>" + _dataText.substr(0, 25) + "..</span>";
                        }

                        switch (col.ControlType) {
                            case "DetailDate":
                                _dataText = new Date().parse(_dataText).Aformat("yyyy年mm月dd日");
                                _strb.ad("<td>" + _dataText + "</td>");
                                break;
                            case "Hidden":
                                _strb.ad("<td style=\"display:none;\">" + _dataText + "</td>");
                                break;
                            case "":
                                _strb.ad("<td>_</td>");
                                break;
                            default:
                                _strb.ad("<td>" + _dataText + "</td>");
                                break;
                        }
                    });
                    _strb.ad("</tr>");
                })
                this.$Grid.append(_strb.toString());
                this.$Grid.selctedBgColor();
            }
            this.clearButton();
            var option = {
                theme: 'vsStyle',
                expandLevel: 1,
                onSelect: function ($treeTable, id) {
                    window.console && console.log('onSelect:' + id);
                }
            };
            this.$Grid.treeTable(option);
        });


    }

})(jQuery);
