(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.fn.AtawNumText = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawNumText", options);
    }
    $.AKjs.AtawNumText = function (options) {
        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawNumTextControl()).sysCreator();
    }

    function AtawNumTextControl() {
        this.$body = $('<div id="ataw-add-product">'
        + '<div>'
        + '<span class="b-widget">'
        + '<span class="b-numeric-wrap">'
        + '<input type="text" class="b-formatted-value b-input" tabindex="0" aria-disabled="false" aria-readyonly="false">'
        + '<input id="numeric" type="text" value="17" min="0" max="100" step="1" class="b-input" > '
        + '<span class="b-select">'
        + '<span class="b-link" unselectable="on">'
        + '<span class="b-icon icon-caret-down fa fa-caret-down" unselectable="on"></span> '
        + '</span>'
        + '<span unselectable="on" class="b-link">'
        + '<span class="b-icon icon-caret-up fa fa-caret-up" unselectable="on"></span>'
        + '</span>'
        + '</span>'
        + '</span>'
        + '</span>'
        + '</div>'
        + '</div>');
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "creator", function () {

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "init", function () {
            var _this = this;
            this.$JObj.append(this.$body);
            this.$Focus = this.$body.find("#numeric");
            this.$Add = this.$body.find(".icon-caret-down");
            this.$Less = this.$body.find(".icon-caret-up");

        });



        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dataValue_Get", function () {

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Set", function (val) {
            var _itemtags = val.split(",");

        });
        //设为只读
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "getReadOnlyText", function () {

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dispose", function () {
            this.AtawBaseDom_dispose();
        });


    };
})(jQuery);