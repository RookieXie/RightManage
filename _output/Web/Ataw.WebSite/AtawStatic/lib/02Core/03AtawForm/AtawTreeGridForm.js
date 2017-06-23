(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.AKjs.AtawTreeGridForm = function (options) {
        return $.extend({}, $.AKjs.Base_AtawGridForm(options), new AtawTreeGridForm()).sysCreator();
    }


    $.fn.AtawTreeGridForm = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawTreeGridForm", options);
    }

    function AtawTreeGridForm() {
        this.TreeField = null;
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
        //---
            this.AtawGridForm_creator();
            
        });
        //创建行
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "createRowObj", function (options) {
            return $.AKjs.AtawTreeGridRowDom(options);
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            this.AtawGridForm_init();
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "formartTree", function () {
            var _this = this;
            var _index = 0;
            this.$FormContent.find("th:visible").each(function () {
                var index = $(this).index();
                if (index > 0) {
                    _index = index;
                    return false;
                }
            });
            this.$FormContent.find("tr[pid='0']").each(function () {
                _this.formatTreeObj($(this), _index);
            })
            this.$FormContent.treeTable({
                column: _index,
                theme: 'vsStyle'
            });
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPrivate, "formatTreeObj", function (current, index) {
            var _this = this;
            var children = this.$FormContent.find("tr[pid='" + current.attr("id") + "']");
            //var img;
            // var currenttd = current.children()[index];
            if (children.length > 0) {
                //img = $("<img src='/Scripts/Core/Ataw/atawDom/form/images/tree/tree_folder.gif'/>");
                // $(currenttd).prepend(img);
                //expandLevel = ++expandLevel;
                children.each(function () {
                    //var td = $(this).children()[index];
                    // $(td).css('text-indent', expandLevel * 2 + "em");
                    current.after($(this));
                    _this.formatTreeObj($(this), index);
                })
            }
            //            else {
            //                img = $("<img src='/Scripts/Core/Ataw/atawDom/form/images/tree/tree_file.gif'/>");
            //                $(currenttd).prepend(img);
            //            }
        });
    }
})(jQuery);
