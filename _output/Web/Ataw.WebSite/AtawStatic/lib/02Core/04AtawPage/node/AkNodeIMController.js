(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};
    $.AKjs.AkNode = $.AKjs.AkNode ? $.AKjs.AkNode : {};
    var _this = $.AKjs.AkNode.IM = $.AKjs.AkNode.IM ? $.AKjs.AkNode.IM : {};
    _this.p2p = function (data) {
        //有私聊信息来时，头部私聊图标变红
        var _userId = data.Data.SendUserID;
        //当前登录用户是接收消息对象并且不处在聊天状态时，需要将发消息用户信息添加到消息盒
        if ($.AKjs.LoginId != _userId && $.AKjs.App.CurrentChatUsers.indexOf(_userId) == -1) {
            if ($(".ACT-P2P-MINE ul").length == 0) {
                $(".ACT-P2P-MINE").append("<ul class='dropdown-menu'></ul>");
            }
            $(".ACT-P2P-MINE i").css("color", "red");
            if ($(".ACT-P2P-MINE li[userid='" + _userId + "']").length == 0) {
                var _$li = $('<li userid="' + _userId + '"><a></a></li>');
                _$li.html(data.Data.SendUserAvatar + " <lable>" + data.Data.SendNickName + "</label>" + "<span>[<label class='msg_count'>1</lable>]</span>");
                // _$li.append(" <lable>" + data.Data.SendNickName + "</label>");
                // _$li.append("<span>[<label class='msg_count'>1</lable>]</span>");

              
                // alert(_li);
                $(".ACT-P2P-MINE ul").append(_$li);
            }
            else {
                var _$li = $(".ACT-P2P-MINE li[userid='" + _userId + "']");
                var _count = _$li.find(".msg_count").text();
                _$li.find(".msg_count").text((parseInt(_count) + 1).toString());
            }
            $(".ACT-P2P-MINE li").unbind("click").bind("click", function () {
                var _id = $(this).attr("userid");
                var _$userItem = $(".ACT-IM").find(".ACT-CHAT-USER-ITEM[userid='" + _id + "']");
                if (_$userItem.length > 0) {
                    var _chat = _$userItem.find(".ACT-CHAT").data("MRC");
                    _chat.showChatBox(_id, data.Data.SendNickName);
                }
                $(this).remove();
                if ($(".ACT-P2P-MINE li").length == 0) {
                    $(".ACT-P2P-MINE ul").remove();
                }
                if ($(".ACT-P2P-MINE li").length == 0) {
                    $(".ACT-P2P-MINE i").removeAttr("style");
                }
            });
        }
        if (data.Data.SendNickName == $.AKjs.NickName) {
            var _color = "lightskyblue";
        }
        else
            _color = "royalblue";
        var _text = "<div class='ACT-MSG-ITEM'><p style='color:" + _color + "'>" + data.Data.SendNickName + " " + data.Data.SendTime + "</p><p> " + data.Data.SendMessage + "</p></div>";

        var _$userItem = $(".ACT-IM").find(".ACT-CHAT-USER-ITEM[userid='" + _userId + "']");
        if (_$userItem.length > 0) {
            var _chat = _$userItem.find(".ACT-CHAT").data("MRC");
            _chat.showMessageFrom(_userId, _text);
        }

    }

})(jQuery);