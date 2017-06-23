(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};
    $.AKjs.AtawTreeNavi = function (options) {
        return $.extend({}, $.AKjs.AtawBaseNavi(options), new AtawTreeNaviControl());
    }
    function AtawTreeNaviControl() {
        this.$Ztree = $('<div class="taskTree "></div>');
        this.ZtreeObj = null;
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "reload", function () {
            if (this.isRefresh) {
                this.$Content.html("");
                this.createContent();
            }
        })
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "reloadTree", function (ids) {
            if (ids) {
                this.CurrentSelectedID = ids.split(',');
                this.$Content.html("");
                this.createContent();
            }
        })
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getCurrentSelectedItem", function () {
            if (this.ZtreeObj) {
                return this.ZtreeObj.getSelectedNodesID();
                //var seletedIds = this.ZtreeObj.getSelectedNodesID();
                //数据库 in 操作,故需格式化数据
                //                var res = [];
                //                if (seletedIds) {
                //                    seletedIds = seletedIds.split(',');
                //                    for (var i = 0; i < seletedIds.length; i++) {
                //                        res.push("'" + seletedIds[i] + "'");
                //                    }
                //                }
                //return res.toString();
            }
            return "";
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dispose", function() {
            if (this.ZtreeObj)
                this.ZtreeObj.AtawControl().dispose();
            this.AtawBaseDom_dispose();
        });
    }
})(jQuery);
