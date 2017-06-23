(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};
    $.fn.AtawFormMultiSelector = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawFormMultiSelector", options);
    }
    $.AKjs.AtawFormMultiSelector = function (options) {
        var _base = $.extend({}, $.AKjs.AtawFormSingleSelector(options), new AtawFormMultiSelector()).sysCreator();
        return _base;
    }
    function AtawFormMultiSelector() {
        this.IsMultiSelect = true;
        this.FormTplStr = "<div class=\"col-lg-3  ACT-PAGE-NAVI   \"></div><div class=\"col-lg-7  ACT-PAGE-MAIN  \"></div><div class=\"col-lg-2  ACT-PAGE-SELECTOR Hu-form-selector  \"><div class=\"btn btn-primary ACT-PAGE-SURE\">点击确定选择</div></div>";
        this.$Form = $('<div class=\"sourceForm  row \">' + this.FormTplStr + '</div>');
        
        this.DictList = {};

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            this.AtawFormSingleSelector_init();
            //生成已选
            var _codeConfigs = this.getCodeConfigs();
            for (var i = 0 ; i < _codeConfigs.length ; i++) {
                this.DictList[_codeConfigs[i].CODE_VALUE] = _codeConfigs[i].CODE_TEXT;
            }

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "pageSysFunAfterInit", function ( _$navi,_$main, page) {
            if (_$navi.html() == "") {
                //alert(1);
                _$navi.addClass("hidden");
                //_$main.SwitchClass("col-lg-11", "col-lg-8", true);
                _$main.SwitchClass("col-lg-10", "col-lg-7", true);

            }
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initContentForm", function () {
            //--------
            this.$Form.html(this.FormTplStr);
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "formInit", function () {
            // alert(_this.$Form.find(".ACT-ROW-ExpandDetail").length);
            var _this = this;
            // _this.$Form.find(".ACT-ROW-ExpandDetail").remove();
            // _this.$Form.find(".ACT-CHECK-ALL").remove();
            var _chkList = _this.$Form.find(".ACT-CHECK-SINGLE");
            var _$select = _this.$Form.find(".ACT-PAGE-SELECTOR");
            // var _$select = _this.$Form.find(".ACT-PAGE-SELECTOR");
            if (_$select.find(".ACT-ITEM").length == 0) {
                for (var _item in _this.DictList) {
                    var _$bt = $("<div class='btn btn-default ACT-ITEM Hu-item ' key='" + _item + "'>" + _this.DictList[_item] + "</div>");
                    _$select.append(_$bt);
                    _$bt.click(function () {

                        $(this).remove();
                    });
                }
            }
            _this.$Form.find(".ACT-CHECK-ALL").on("click", function () {
                var _chkList = _this.$Form.find(".ACT-CHECK-SINGLE");
                var _l = _chkList.length;
                var _ids = [];
                for (var i = 0; i < _l ; i ++){
                    var _$i = _chkList.eq(i);
                    var _isCheck = _$i.attr("ichecked");
                    if (_isCheck == "true") {
                        _ids.push(_$i.attr("key"));

                    }
                }
                //---------------
                var _keys = _ids.join(",");
                $.AKjs.getJSON("/core/Selector/GetDataValueList", { regName: _this.RegName, xml: _this.ModuleXml, key: _keys }, function (res) {
                    var _$select = _this.$Form.find(".ACT-PAGE-SELECTOR");
                    for (var n in res) {
                        var _text = res[n];
                        if (_$select.find("[key='" + n + "']").length == 0) {
                            var _$bt = $("<div class='btn btn-default ACT-ITEM Hu-item ' key='" + n + "'>" + _text + "</div>");
                            _$select.append(_$bt);
                            _$bt.click(function () {

                                $(this).remove();
                            });
                        }


                    }

                });


            });
            _chkList.on("click", function () {
                var _$select = _this.$Form.find(".ACT-PAGE-SELECTOR");
                // alert($(this).attr("key") + _this.ModuleXml);
                var _val = $(this).attr("key");
                var _isCheck = $(this).attr("ichecked");
                if (_isCheck == "true") {
                    if (_$select.find("[key='" + _val + "']").length == 0) {
                        $.AKjs.getJSON("/core/Selector/GetDataValue", { regName: _this.RegName, xml: _this.ModuleXml, key: $(this).attr("key") }, function (res) {
                            var _$bt = $("<div class='btn btn-default ACT-ITEM Hu-item ' key='" + _val + "'>" + res + "</div>");
                            _$select.append(_$bt);
                            _$bt.click(function () {

                                $(this).remove();
                            });

                        });
                    }
                    else {
                        alert("该记录已经被选中！！");
                    }
                    }
                
                else {
                    _$select.find("[key='" + _val + "']").remove();
                }
               // var _WinObj = _this.$FormContent.AtawControl();
              //  _WinObj.close();



            });
            _this.$Form.find(".ButtonBar").hide();

            var _$sure = _this.$Form.find(".ACT-PAGE-SURE");
            _$sure.on("click", function () {
                //---------
                var _$select = _this.$Form.find(".ACT-PAGE-SELECTOR");
                var _$items  = _$select.find(".ACT-ITEM");
                _this.DictList = {};
                var codeTexts = [];
                var codeValues = [];
                var _l = _$items.length;
                for (var _i = 0; _i < _l ; _i++) {
                    var _$item = _$items.eq(_i);
                    var _text = _$item.text();
                    var _key = _$item.attr("key");
                    codeTexts.push(_text);
                    codeValues.push("\"" + _key + "\"");

                    _this.DictList[_key] = _text;
                }

                _this.$JObjText.val(codeTexts.join(","));
                //_this.setDataText($(this).attr("txt"));
                _this.dataValue_Set(codeValues.join(","));

               // _this.DataValue.setValue(codeValues.toString());
                _this.triggerChangeEvent();


                 var _WinObj = _this.$FormContent.AtawControl();
                 _WinObj.close();

            });  
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Set", function (opt_str) {
            if ($.AKjs.IsString(opt_str)) {

                this.AtawBaseSelectorControl_dataValue_Set(opt_str);
                this.KeyIds = opt_str ? opt_str.replace(/"/g, "").split(",") : [];
            }
            else {
                if (!$.AKjs.IsEmpty(opt_str)) {
                    this.DictList = opt_str;
                    var _texts = [];
                    for (var n in this.DictList) {
                        _texts.push(this.DictList[n]);
                    }
                    this.$JObjText.val(_texts.join(","));
                }
            }
            //-----------


        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Get", function () {
            if (this.KeyIds != null && this.KeyIds.length > 0) {
                var _str = "";
                for (var _i = 0 ; _i < this.KeyIds.length ; _i++) {
                    this.KeyIds[_i] = "\"" + this.KeyIds[_i] + "\"";
                }
                return this.KeyIds.join(",");
            }
            return "";
        });
    }
})(jQuery);
