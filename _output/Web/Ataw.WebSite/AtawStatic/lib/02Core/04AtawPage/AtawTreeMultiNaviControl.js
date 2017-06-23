(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};
    $.fn.AtawTreeMultiNavi = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawTreeMultiNavi", options);
    }
    $.AKjs.AtawTreeMultiNavi = function (options) {
        return $.extend({}, $.AKjs.AtawTreeNavi(options), new AtawTreeMultiNaviControl());
    }
    function AtawTreeMultiNaviControl() {
        this.ZtreeObj = null;
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createContent", function () {
            var _this = this;
            this.ZtreeObj = $.AKjs.AtawZTree({
                RegName: this.NaviFrom.Options.RegName,
                OnCheckFun: function () {
                    //                    _this.CurrentSelectedID = _this.getCurrentSelectedItem().split(',');
                    _this.EventEmitter.emit("_onCheckFun", _this);
                    var _currentSelected = _this.getCurrentSelectedItem();
                    _this.CurrentSelectedID = _currentSelected.split(',');
                    var anchorParam = {};
                    anchorParam[_this.NaviFrom.Name] = _currentSelected;
                    _this.Callback(anchorParam);
                },
                IsMultiSelect: true
            });
            this.ZtreeObj.loadData(this.CurrentSelectedID);
            this.$Ztree.html("");
            this.ZtreeObj.intoDom(this.$Ztree);
            this.$Content.append(this.$Ztree);
        });
    }
})(jQuery);
