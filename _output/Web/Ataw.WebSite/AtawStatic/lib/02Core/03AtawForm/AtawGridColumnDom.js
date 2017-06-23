(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    //继承基类
    $.AKjs.AtawGridColumnDom = function (options) {
        return $.extend({}, $.AKjs.AtawBaseColumnDom(options), new AtawGridColumnDom()).sysCreator();
    }

    function AtawGridColumnDom() {
        this.$Column = $("<span></span>"); //每列

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.AtawBaseColumnDom_creator();
            //this.setProByOptName("Width", "Width");
        });

        //将控件附加到td上
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {

            this.$JObj.append(this.$Column);
            if (this.AtawControlObj.sys_ataw_fun_name == "AtawDetailControl") {
                var _dataText = this.AtawControlObj.DataText;
                if (_dataText.indexOf && (_dataText.indexOf("<") > 0 || _dataText.indexOf(">") > 0)) {
                }
                else {
                    if (!this.AtawControlObj.Options.DetialFormatFun) {
                        if (_dataText == null || _dataText.toString() == "") {
                            _dataText = "_";
                        }
                        var _sourceText = _dataText;
                        var _tt = $("<span>" + _dataText + "</span>").text();
                        if (!_tt .AisEmpty()) {
                            // _dataText 
                            _dataText = _tt;
                        }
                        if (_dataText.length > 12) {
                            var _txt = _dataText;
                            _dataText = _dataText.substr(0, 12) + " " + _dataText.substr(12, _dataText.length - 12);
                        }
                        if (_dataText.length > 20) {
                            var _txt = _dataText;
                            _dataText = "<span title='" + _txt + "'>" + _dataText.substr(0, 20) + "..</span>";
                        }
                        else {
                            _dataText = "<span>" + _sourceText + "</span>";
                        }
                    }

                }
                if (_dataText == "<span>_</span>") {
                    _dataText = ".";
                }
                this.AtawControlObj.DataText = _dataText;
            }
            this.AtawControlObj.intoDom(this.$Column);
            if (this.ColumnConfig.ControlType == "Hidden") {
                //this.$Column.hide();
                this.$JObj.addClass("ACT_HIDDEN");
            }
            this.AtawBaseColumnDom_init();

        });
    }
})(jQuery);
