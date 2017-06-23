(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};
    $.fn.AtawTreeMultiSelector = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawTreeMultiSelector", options);
    }
    $.AKjs.AtawTreeMultiSelector = function (options) {
        return $.extend({}, $.AKjs.AtawTreeSingleSelector(options), new AtawTreeMultiSelector());
    }
    function AtawTreeMultiSelector() {
        this.IsMultiSelect = true;
      $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
                    this.AtawTreeSingleSelector_init();
        });
        //        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initZtree", function (keyIds) {
        //            var _this = this;
        //            this.$Ztree.AtawZTree({
        //                RegName: this.Options.RegName,
        //                KeyIds: this.KeyIds,
        //                IsMultiSelect: _this.IsMultiSelect,
        //                OnPostDataSetFun: _this.postDataSetFun()
        //            });
        //        });

        //        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Set", function (opt_str) {
        //            this.AtawBaseControl_dataValue_Set(opt_str);
        //            var idList = opt_str.split(",");
        //            for (var i = 0; i < idList.length; i++) {
        //                var _id = idList[i].replace(/"/g, "");
        //                this.KeyIds.push(_id);
        //            }

        //        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "checkFun", function (a, b, c, treeNode) {
            return function (a, b, c, treeNode) {
            };
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getAdditionRoot", function () {
            return false;
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "treeFunwinOpen", function () {
            var myTitle = "请选择";
            var _this = this;
            if (this.Options != null && this.Options.DisplayName != null && this.Options.DisplayName != "") {
                myTitle = "请选择" + this.Options.DisplayName;
            }
            this.$Win = this.$ZtreeContent.AtawControl();
            if (this.$Win == null) {
                this.$ZtreeContent.AtawWindow({
                    Title: myTitle,
                    //activate: function () { _this.winPositionFun(); },
                    Width: "80%",
                    Fixed: true,
                    Button: [
                        {
                            name: '确定',
                            callback: function () {
                                var codeTexts = [];
                                var codeValues = [];
                                //_this.KeyIds = [];
                                var selectedNodes = _this.$Ztree.AtawControl().getSelectedNodes();
                                for (var i = 0; i < selectedNodes.length; i++) {
                                    codeTexts.push(selectedNodes[i].CODE_TEXT);
                                    codeValues.push("\"" + selectedNodes[i].CODE_VALUE + "\"");
                                    //_this.KeyIds.push(selectedNodes[i].CODE_VALUE);
                                }
                                _this.$JObjText.val(codeTexts.toString());
                                _this.setDataText(codeTexts.toString());
                                _this.dataValue(codeValues.toString());
                                //_this.DataValue.setValue(codeValues.toString());
                                this.hide();
                                return false;
                            },
                            focus: true
                        }]
                });
                this.$Win = this.$ZtreeContent.AtawControl();

            }
            this.$ZtreeContent.css({ "height": "450px", "overflow": "auto" });
           // this.$Win = this.$ZtreeContent.AtawControl();
            this.$Win.open();

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "winOpen", function () {
            var _this = this;
            var _obj = this.$Ztree.AtawControl();
            if (_obj) {
            }
            else {
                this.$Ztree = $('<div></div>');
                this.$ZtreeContent.html("");
                this.$ZtreeContent.append(this.$Ztree);
                this.$Ztree.AtawZTree({
                    RegName: this.Options.RegName,
                    IsMultiSelect: _this.IsMultiSelect,
                    KeyIds: this.KeyIds,
                    OnPostDataSetFun: _this.postDataSetFun()
                });

            }
            this.$Ztree.AtawControl().loadData(this.KeyIds, function () {
                _this.treeFunwinOpen();
            });
           
            //alert();
        });
    }
})(jQuery);
