(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};
    $.fn.AtawFormSingleSelector = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawFormSingleSelector", options);
    }
    $.AKjs.AtawFormSingleSelector = function (options) {
        return $.extend({}, $.AKjs.AtawBaseSelector(options), new AtawFormSingleSelector());
    }
    function AtawFormSingleSelector() {
        //this.$SelectButton = $("<img   border=0  src='/ico/magnifier.png' class=\"ACT-SELECT-ITEM  inputAutoBtn \" />");
        this.$SelectButton = $("<a class='btn btn-primary btn-xs'><i class=\"  icon-external-link  fa fa-external-link ACT-SELECT-ITEM \"></i></a>");
        this.$FormContent = $('<div class=\"ACT-DATA-CONTAINER\"></div>');
        this.$Form = $('<div class=\"sourceForm  row \"><div class=\"col-lg-3  ACT-PAGE-NAVI   \"></div><div class=\"col-lg-9  ACT-PAGE-MAIN  \"></div></div>');
        this.$Box = $("<div  class='Hm-input-group input-group'  ></div>"); //控件容器
        this.IsMultiSelect = false;
        this.KeyIds = [],
        this.WinObj = null;
        this.ModuleXml = "";
        // this.OnPostDataSetFun = null;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            this.setProByOptName("OnCheckFun", "OnCheckFun");
            this.setProByOptName("ModuleXml", "ModuleXml");

            //this.setProByOptName("OnPostDataSetFun", "OnPostDataSetFun");
            var _this = this;
            this.KeyIds = this.DataValue.getValue() ? this.DataValue.getValue().replace(/"/g, "").split(",") : [];
            _this.AtawBaseSelectorControl_init();
           
            _this.$JObjText.addClass("ACT-TEXT inputAutoCon");
            _this.$JObjText.css("width","100%");
            _this.$JObj.append(_this.$Box);
            _this.$Box.append(_this.$JObjText);
            _this.$Box.append("<span class='input-group-btn'/>");
            _this.$Box.find(".input-group-btn").append(this.$SelectButton);
            //_this.$JObjText.after(_this.$SelectButton);
            _this.$FormContent.append(_this.$Form);
            //选择按钮事件
            _this.selectFun();
           
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "pageSysFunAfterInit", function (_$navi, _$main, page) {
            if (_$navi.html() == "") {
                //alert(1);
                _$navi.addClass("hidden");
                _$main.SwitchClass("col-lg-12", "col-lg-9", true);
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initContentForm", function () {
            //--------
            this.$Form.html("<div class=\"col-lg-3  ACT-PAGE-NAVI   \"></div><div class=\"col-lg-9  ACT-PAGE-MAIN  \"></div>");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "selectFun", function () {
            var _this = this;
            

            _this.$SelectButton.click(function () {
                var _$main = _this.$Form.find(".ACT-PAGE-MAIN");
                var _$navi = _this.$Form.find(".ACT-PAGE-NAVI");
                _$main.dispose(true);
                _$navi.dispose(true);
                _this.$Form.html("");
               // _$main
                // _this.$Form.html("<div class=\"col-lg-3  ACT-PAGE-NAVI   \"></div><div class=\"col-lg-9  ACT-PAGE-MAIN  \"></div>");
                _this.initContentForm();
                $.AKjs.getJSON("/core/Selector/LoadPage", {
                    ds: _this.getPostDsStr(),
                    regName: _this.RegName,
                    pageStyle: "List",
                    xml: _this.ModuleXml
                }, function (res) {
                    res.IsPart = true;
                    var _form = res.Forms[res.ListFormName];



                    var _$main = _this.$Form.find(".ACT-PAGE-MAIN");
                    var _$navi = _this.$Form.find(".ACT-PAGE-NAVI");

                    res.AfterSearchCustomFun = function (page) {
                        _this.formInit();
                    };

                    res.SysFunAfterInit = function (page) {
                        _this.pageSysFunAfterInit(_$navi, _$main,page);
                    };

                    res.NaviContentSelector = _$navi;
                    // _form.FormType = "SingleSelector";
                    _$main.AtawListPage(res);

                    _$main.find(".ACT-BUTTONBAR").html("");

                    _this.winOpen();

                });
            });
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "onCheckFun", function (codeValue, codeText) {
            var _this = this;
            _this.$JObjText.val(codeText);
            _this.setDataText(codeText);
            _this.dataValue_Set(codeValue);
            _this.triggerChangeEvent();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getText", function (value) {


        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "formInit", function () {
            // alert(_this.$Form.find(".ACT-ROW-ExpandDetail").length);
            var _this = this;
            _this.$Form.find(".ACT-ROW-ExpandDetail").remove();
            _this.$Form.find(".ACT-CHECK-ALL").remove();
            var _chkList = _this.$Form.find(".ACT-CHECK-SINGLE");
          //  _chkList.removeClass("icon-check-empty fa fa-square-o").addClass("icon-circle-blank");
            //_chkList.off("mouseover").on("mouseover", function () {
            //    $(this).SwitchClass("icon-off", "icon-on", false);
            //});
            //_chkList.off("mouseout").on("mouseout", function () {
            //    $(this).SwitchClass("icon-off", "icon-on", true);
            //});
            var _len = _chkList.length;
            for (var i = 0 ; i < _len ; i++) {
                
                var _$item = _chkList.eq(i);
                _$item.removeClass("icon-check-empty fa fa-square-o");
                if (_.indexOf(this.KeyIds, _$item.attr("key")) >= 0) {
                    _$item.addClass("icon-circle fa fa-circle");
                    var _rowObj = _$item.data("AK-ROW");
                    if (_rowObj && _rowObj.$JObj) {
                        _rowObj.$JObj.addClass("danger");
                    }
                } else {
                    _$item.addClass("icon-circle-blank fa fa-circle-o");
                }


            }
            _chkList.off("click").on("click", function () {

               // alert($(this).attr("key") + _this.ModuleXml);
                var _val = $(this).attr("key");
                $.AKjs.getJSON("/core/Selector/GetDataValue", { regName: _this.RegName, xml: _this.ModuleXml, key: $(this).attr("key") }, function (res) {
                   // alert(res);
                    _this.onCheckFun(_val, res);


                });
                var _WinObj = _this.$FormContent.AtawControl();
                _WinObj.close();



            });
            _this.$Form.find(".ButtonBar").hide();
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "checkFun", function () {
            var _this = this;
            return function (obj, codeValue, codeText) {
                _this.$JObjText.val(codeText);
                _this.setDataText(codeText);
                _this.dataValue(codeValue);
                if (_this.ChangeEventFun) {
                    _this.ChangeEventFun(_this);
                }
                _this.$Win.hide();
            };
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Set", function (opt_str) {

            this.AtawBaseSelectorControl_dataValue_Set(opt_str);
            this.KeyIds = opt_str ? opt_str.replace(/"/g, "").split(",") : [];
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Get", function () {
            if (this.KeyIds != null && this.KeyIds.length > 0) {
                return this.KeyIds[0];
            }
            
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "winOpen", function () {
            var _this = this;
            // this.$Form.AtawControl().loadData(this.KeyIds);
            var myTitle = "请选择";
            if (this.Options != null && this.Options.DisplayName != null && this.Options.DisplayName != "") {
                myTitle = "请选择" + this.Options.DisplayName;
            }
           // if (this.WinObj == null) {
                this.$FormContent.AtawWindow({
                    Title: myTitle,
                    //activate: function () { _this.winPositionFun(); },
                    Width: "90%",
                    Fixed: true,
                    WindowOpenFun: function () {
                        _this.formInit();
                       // _this.WinObj
                    }

                });
          //  }
          //  this.$FormContent.css({ "height": "400px", "overflow": "auto" });
             var  WinObj = this.$FormContent.AtawControl();
              WinObj.open();
            

        });
    }
})(jQuery);
