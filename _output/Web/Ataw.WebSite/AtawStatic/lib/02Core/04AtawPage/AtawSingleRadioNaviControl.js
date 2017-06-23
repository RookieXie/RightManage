(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};

    $.fn.AtawSingleRadioNavi = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawSingleRadioNavi", options);
    }

    $.AKjs.AtawSingleRadioNavi = function (options) {
        return $.extend({}, $.AKjs.AtawRadioNavi(options), new AtawSingleRadioNaviControl());
    };

    function AtawSingleRadioNaviControl() {
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createContent", function () {
            if (this.NaviFrom.GroupName) {
                this.GroupName = this.NaviFrom.GroupName;
            }
            else {
                this.GroupName = "gn" + $.AKjs.getUniqueID();
            }
            var $allDv = $('<div class="radio col-md-offset-1"></div>');
            // $allRadio = this.createItem();
            var $allRadio = $("<a  ichecked='true'  class='checkbox  cbk-input icon-check fa fa-check-square-o'/>");
            $allRadio.val("2");
            this.createItem($allRadio);

            $allDv.append($allRadio);
            this.setItemText($allRadio, '<span class="label label-success">全部</span>');

            var $yesDv = $('<div class="radio col-md-offset-1"></div>');
//            $yesRadio = this.createItem();
//            $yesRadio.val("1");
            var $yesRadio = $("<a  ichecked='true'  class='checkbox  cbk-input icon-check fa fa-check-square-o'></a>");
            $yesRadio.val("1");
            this.createItem($yesRadio);

            $yesDv.append($yesRadio);
            this.setItemText($yesRadio, '<span class="label label-danger">是</span>');

            var $noDv = $('<div class="radio col-md-offset-1"></div>');
            //$noRadio = this.createItem();
            var $noRadio = $("<a  ichecked='false'  class='checkbox  cbk-input icon-check-empty fa fa-square-o'></a>");
            $noRadio.val("0");
            this.createItem($noRadio);

            $noDv.append($noRadio);
            this.setItemText($noRadio, '<span class="label label-primary">否</span>');

            for (var j = 0; j < this.CurrentSelectedID.length; j++) {
                if (this.CurrentSelectedID[j] === "1") {
                    $yesRadio.attr("checked", true);
                    break;
                }
                else if (this.CurrentSelectedID[j] === "0") {
                    $noRadio.attr("checked", true);
                    break;
                }
                else if (this.CurrentSelectedID[j] === "2") {
                    $allRadio.attr("checked", true);
                    break;
                }
            }
            this.$Content.append($allDv).append($yesDv).append($noDv);
        })

    }

})(jQuery);