(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};


    $.AKjs.AtawInerSnsClubCard = function (options) {
        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawInerSnsClubCard()).sysCreator();
    }
    $.fn.AtawInerSnsClubCard = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawInerSnsClubCard", options);
    }

    function AtawInerSnsClubCard() {
        this.ClubId = "";
        this.ClubName = "";
        this.Introduction = "";
        this.Logo = "";

        this.$PopvObj = null;
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "creator", function () {

            this.setProByOptName("ClubId", "ClubId");
            this.setProByOptName("ClubName", "ClubName");
            this.setProByOptName("Introduction", "Introduction");
            this.setProByOptName("Logo", "Logo");
            this.setProByOptName("$PopvObj", "$PopvObj");

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            var _strBt = 
                      // '<div class="btn-group"><a class="btn  btn-default btn-xs"><i class="icon-comment"></i></a>' +
                         '<a class="btn btn-default  btn-xs ACT-A-HREF " href="$clubhome$' + this.ClubId + '" ><i class=" icon-home fa fa-home"></i></a></div>' +
                         '</div>';
            var _html = '<div class="media" style="">' +
                      '<a class="pull-left ACT-A-HREF" href="$clubhome$' + this.ClubId + '">' +
                      '<img class="media-object aks-userlogo-card  acs-thumbImage50" src="' + this.Logo + '"   alt="...">' +
                      '</a>' +
                      '<div class="media-body"><h4 class="media-heading strong"><span class="label label-default">' + this.ClubName + '</span></h4></div>' +
                     '<div>' + _strBt+
                      ' <div style="width:100%;min-width:9em"><small >' + this.Introduction + '</small></div></div>';
            this.$JObj.html(_html);
            $.AKjs.App.bindPageEvent(this.$JObj);

        });
    }
})(jQuery);