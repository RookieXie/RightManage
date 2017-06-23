(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.fn.AtawFileManagement = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawFileManagement", options);
    }
    $.AKjs.AtawFileManagement = function (options) {
        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawFileManagementControl());
    }

    function AtawFileManagementControl() {
    }
})(jQuery);
