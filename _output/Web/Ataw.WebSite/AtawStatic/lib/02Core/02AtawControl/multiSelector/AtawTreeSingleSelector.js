(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};
    $.fn.AtawTreeSingleSelector = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawTreeSingleSelector", options);
    }
    $.AKjs.AtawTreeSingleSelector = function (options) {
        return $.extend({}, $.AKjs.AtawBaseSelector(options), new AtawTreeSingleSelector());
    }
    function AtawTreeSingleSelector() {
        this.$SelectButton = $("<a class='btn btn-primary btn-xs'><i class=\"  icon-external-link fa fa-external-link ACT-SELECT-ITEM    \"></i></a>");
        this.$ZtreeContent = $('<div></div>');
        this.$Ztree = $('<div></div>');
        this.$Box = $("<div  class='Hm-input-group input-group'></div>"); //控件容器
        this.IsMultiSelect = false;
        this.KeyIds = [],
        this.$Win = null;
        this.$AdditionRoot = null;
        this.DisplayRoot = false;
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            this.setProByOptName("OnCheckFun", "OnCheckFun");

            var _this = this;
            this.DisplayRoot = this.Options.TreeConfig ? this.Options.TreeConfig.DisplayRoot : false;
            this.KeyIds = this.DataValue.getValue() ? this.DataValue.getValue().replace(/"/g, "").split(",") : [];
//            this.$Ztree.AtawZTree({
//                RegName: this.Options.RegName,
//                IsMultiSelect: _this.IsMultiSelect,
//                KeyIds: this.KeyIds,
//                OnPostDataSetFun: _this.postDataSetFun(),
//                OnCheckFun: _this.checkFun()
//            });
            //根据配置
            //this.$Ztree.AtawControl().loadData();
            this.AtawBaseSelectorControl_init();
            this.$JObjText.addClass("ACT-TEXT inputAutoCon");
            this.$JObjText.css("width","100%");
            this.$JObj.append(this.$Box);
            this.$Box.append(this.$JObjText);

            this.$Box.append("<span class='input-group-btn'/>");
            this.$Box.find(".input-group-btn").append(this.$SelectButton);

            //            this.$Box.append(this.$JObjText);
            //            this.$JObjText.after(this.$SelectButton);

            this.$AdditionRoot = this.getAdditionRoot();
            if (this.DisplayRoot && this.$AdditionRoot) {
                this.$ZtreeContent.append(this.$AdditionRoot);
            }
            this.$ZtreeContent.append(this.$Ztree);
            //选择按钮事件
            this.$SelectButton.click(function () {
                _this.winOpen();

            });
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getAdditionRoot", function () {
            var _this = this;
            var $rootDv = $('<div><input type="radio" value="0" title="根节点"></div>');
            $rootDv.find("input").click(function () {
                _this.$JObjText.val($(this).attr("title"));
                _this.setDataText($(this).attr("title"));
                _this.dataValue($(this).val());
                _this.$Win.hide();
            })
            return $rootDv;
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "checkFun", function () {
            var _this = this;
            return function (a, b, c, treeNode) {
                _this.$JObjText.val(treeNode.CODE_TEXT);
                _this.setDataText(treeNode.CODE_TEXT);
                _this.dataValue(treeNode.CODE_VALUE);
                if (_this.ChangeEventFun) {
                    _this.ChangeEventFun(_this);
                }
                _this.$Win.hide();
            };

        });
        //        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initZtree", function () {
        //            var _this = this;
        //            this.$Ztree.AtawZTree({
        //                RegName: this.Options.RegName,
        //                IsMultiSelect: _this.IsMultiSelect,
        //                KeyIds: this.KeyIds,
        //                OnPostDataSetFun: _this.postDataSetFun(),
        //                OnCheckFun: function (a, b, c, treeNode) {
        //                    //_this.KeyIds = treeNode.CODE_VALUE.replace(/"/g, "").split(",");
        //                    _this.$JObjText.val(treeNode.CODE_TEXT);
        //                    _this.dataValue(treeNode.CODE_VALUE);
        //                    if (_this.ChangeEventFun) {
        //                        _this.ChangeEventFun(_this);
        //                    }
        //                    //_this.DataValue.setValue(codeValues.toString());
        //                    _this.$Win.hide();
        //                }
        //            });
        //        });



        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Set", function (opt_str) {
            this.AtawBaseControl_dataValue_Set(opt_str);
            this.KeyIds = opt_str ? opt_str.replace(/"/g, "").split(",") : [];
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "winOpen", function () {
            var _this = this;
            if (this.DisplayRoot && this.$AdditionRoot) {
                var $adddtionRootRadio = this.$AdditionRoot.find("input");
                if (this.KeyIds.toString() === "0") {
                    $adddtionRootRadio.attr("checked", true);
                } else {
                    $adddtionRootRadio.removeAttr("checked");
                }
            }
            var _obj = this.$Ztree.AtawControl();
            if (_obj) {
            }
            else {
                this.$Ztree = $('<div></div>');
                this.$ZtreeContent.html("");
                this.$ZtreeContent.append(this.$Ztree);
                this.$Ztree.AtawZTree({
                    RegName: this.RegName,
                    IsMultiSelect: _this.IsMultiSelect,
                    KeyIds: this.KeyIds,
                    OnPostDataSetFun: _this.postDataSetFun(),
                    OnCheckFun: _this.checkFun()
                });
                
            }
            var _this = this;
            this.$Ztree.AtawControl().loadData(this.KeyIds, function () {
                var myTitle = "请选择";
                if (_this.Options != null && _this.Options.DisplayName != null && _this.Options.DisplayName != "") {
                    myTitle = "请选择" + _this.Options.DisplayName;
                }
                _this.$Win = _this.$ZtreeContent.AtawControl();
                if (_this.$Win == null) {
                    _this.$ZtreeContent.AtawWindow({
                        Title: myTitle,
                        //activate: function () { _this.winPositionFun(); },
                        Width: "70%",
                        Fixed: true
                    });
                    _this.$Win = _this.$ZtreeContent.AtawControl();
                }
                _this.$ZtreeContent.css({ "height": "450px", "overflow": "auto" });


                _this.$Win.open();
            });
            
            //alert();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dispose", function () {
            if (this.$Ztree && this.$Ztree.AtawControl())
                this.$Ztree.AtawControl().dispose();
            if (this.$AdditionRoot)
                this.$AdditionRoot.find("input").unbind();
            this.AtawBaseDom_dispose();
        });
    }
})(jQuery);
