(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};
    $.fn.AtawTreeSingleNavi = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawTreeSingleNavi", options);
    }
    $.AKjs.AtawTreeSingleNavi = function (options) {
        return $.extend({}, $.AKjs.AtawTreeNavi(options), new AtawTreeSingleNaviControl());
    }
    function AtawTreeSingleNaviControl() {
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createContent", function () {
            var _this = this;
            this.ZtreeObj = $.AKjs.AtawZTree({
                RegName: this.NaviFrom.Options.RegName,
                OnCheckFun: function () {
                    _this.EventEmitter.emit("_onCheckFun", _this);
                    //                    _this.CurrentSelectedID = _this.getCurrentSelectedItem().split(',');
                    var _currentSelected = _this.getCurrentSelectedItem();
                    _this.CurrentSelectedID = _currentSelected.split(',');
                    var anchorParam = {};
                    anchorParam[_this.NaviFrom.Name] = _currentSelected;
                    _this.Callback(anchorParam);
                },
                IsMultiSelect: false
            });
            this.ZtreeObj.loadData(this.CurrentSelectedID, function () {
                                _this.$Ztree.html("");
                                _this.ZtreeObj.intoDom(_this.$Ztree);
                                _this.$Content.append(_this.$Ztree);
                                 //if()
                            });
        })
    }
})(jQuery);
