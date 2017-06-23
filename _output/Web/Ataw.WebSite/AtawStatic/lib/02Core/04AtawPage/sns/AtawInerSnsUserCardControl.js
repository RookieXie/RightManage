(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};


    $.AKjs.AtawInerSnsUserCard = function (options) {
        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawInerSnsUserCard()).sysCreator();
    }
    $.fn.AtawInerSnsUserCard = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawInerSnsUserCard", options);
    }

    function AtawInerSnsUserCard() {

        this.IsSelf = true;

        this.UserId = "";
        this.NickName = "";
        this.PositionJobId = "";
        this.PositionJob = "";

        this.Department = "";
        this.DepartmentId = "";
        this.Signatures = "";
        this.Logo = "";

        this.$PopvObj = null;
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "creator", function () {

            this.setProByOptName("IsSelf", "IsSelf");
            this.setProByOptName("UserId", "UserId");
            this.setProByOptName("NickName", "NickName");
            this.setProByOptName("PositionJobId", "PositionJobId");
            this.setProByOptName("PositionJob", "PositionJob");

            this.setProByOptName("Department", "Department");
            this.setProByOptName("DepartmentId", "DepartmentId");
            this.setProByOptName("Signatures", "Signatures");
            this.setProByOptName("Logo", "Logo");
            this.setProByOptName("$PopvObj", "$PopvObj");

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            var _strBt = "";
            if (!this.IsSelf) {
                _strBt = '<div class="btn-group"><a  title="私聊" class="btn  btn-default btn-xs ACT-CHAT"><i class="icon-comment fa fa-comment"></i></a>' + '<a title="发邮件" class="btn  btn-default btn-xs ACT-EMAIL"><i class="icon-envelope fa fa-envelope-o"/></a>' +
                         '<a  title="打开主页" class="btn btn-default  btn-xs ACT-A-HREF " href="$userhome$' + this.UserId + '" ><i class=" icon-home fa fa-home"></i></a></div>' +
                         '</div>';
            }
            var _html = '<div class="media" style="">' +
                      '<a class="pull-left ACT-A-HREF" href="$userhome$' + this.UserId + '">' +
                      '<img class="media-object  aks-userlogo-card acs-thumbImage50" src="' + this.Logo + '"   alt="...">' +
                      '</a>' +
                      '<div class="media-body"><h4 class="media-heading strong"><span class="label label-default">' + this.NickName + '</span></h4><span class=""> ' + this.Department + '</span> &nbsp&nbsp<span class="">' + this.PositionJob + '</span></div>' +
                     '<div>' + _strBt +
                      ' <div style="width:100%;min-width:9em"><small >' + this.Signatures + '</small></div></div>';
            this.$JObj.html(_html);
            //            var _this = this;
            //            if (_this.$PopvObj) {
            //                _this.$JObj.find(".ACT-POPV—CLOSE").click(function () {
            //                    _this.$PopvObj.popover("hide");
            //                });
            //            }
            $.AKjs.App.bindPageEvent(this.$JObj);
            this.bindEvent();

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "bindEvent", function () {
            var _this = this;
            this.$JObj.find(".ACT-CHAT").unbind("click").bind("click", function () {
                var _id = _this.UserId;
                var _$userItem = $(".ACT-IM").find(".ACT-CHAT-USER-ITEM[userid='" + _id + "']");
                if (_$userItem.length > 0) {
                    var _chat = _$userItem.find(".ACT-CHAT").data("MRC");
                    _chat.showChatBox(_id, _this.NickName);
                }
            });

            this.$JObj.find(".ACT-EMAIL").unbind("click").bind("click", function () {
                var _id = _this.UserId;
                var _$userItem = $(".ACT-IM").find(".ACT-CHAT-USER-ITEM[userid='" + _id + "']");
                if (_$userItem.length > 0) {
                    var _email = _$userItem.find(".ACT-EMAIL").data("MRC");
                    _email.setMailReceiver();
                }
            });

        });

    }
})(jQuery);