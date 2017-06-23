(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.messager = {
        alert: function (title, msg, icon, fn) {
            if (icon == undefined||icon=="info") {
                icon = "warning";
            }
            art.dialog({
                title: title,
                icon: icon,
                content: msg,
                ok: true
            });
        },
        confirm: function (title, msg, fn) {
            art.dialog({
                title: title,
                icon: "question",
                content: msg,
                ok: function () {
                    if (typeof (fn) == "function") {
                        fn(true);
                    }
                },
                cancel: function () {
                    if (typeof (fn) == "function") {
                        fn(false);
                    }
                }
            });
        }

    };

})(jQuery);