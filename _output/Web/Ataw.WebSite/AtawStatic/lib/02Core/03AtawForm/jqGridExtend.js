(function ($) {
    $.fn.extend({
        "selctedBgColor": function (options) {
            //设置默认值
            options = $.extend({
                selected: "selected"
            }, options);
            //            $('tbody>tr', this).click(function () {
            //                //判断当前是否选中
            //                var hasSelected = $(this).hasClass(options.selected);
            //                //如果选中，则移除selected类，否则就加上
            //                $(this)[hasSelected ? "removeClass" : "addClass"](options.selected)
            //                //查找内部的checkbox,设置对应的属性
            //                .find(':checkbox').attr("checked", !hasSelected);
            $('.cbk_panel input', this).click(function () {
                var hasSelected = $(this).parent().parent().hasClass(options.selected);
                //如果选中，则移除selected类，否则就加上
                $(this).parent().parent()[hasSelected ? "removeClass" : "addClass"](options.selected)
            })
            //            });
            //表头中的checkbox （全选 反选)

            //            $(".ACT-CHECK-ALL").click(function () {
            //            debugger;
            //                //判断当前是否选中
            //                var hasSelected = $(this).attr("checked");
            //                $('tbody>tr')[!hasSelected ? "removeClass" : "addClass"](options.selected);
            //                if (hasSelected) {
            //                    $('tbody>tr :checkbox').attr("checked", true);
            //                } else {
            //                    $('tbody>tr :checkbox').attr("checked", false);
            //                }
            //            });
            //如果单选框默认情况下是选择的，则高亮
            $('.cbk_panel:has(:checked)', this).addClass(options.selected);
            return this;
        }
    })
})(jQuery);