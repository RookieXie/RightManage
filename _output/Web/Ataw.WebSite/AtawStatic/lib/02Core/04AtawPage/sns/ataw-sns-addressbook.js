(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.AKjs.AddressBook = function ($rightDiv) {
        $rightDiv.find('.ACT-USER-GROUP').remove();
        var _$div = $("<div class='ACT-USER-GROUP'><ul class='nav nav-tabs nav-justified'></ul></div>");
        _$div.find("ul").append("<li class='active'><a href='#ACT-DEPARTMENT' data-toggle='tab'>部门</a></li>");
        _$div.find("ul").append("<li><a href='#ACT-MYCLUB' data-toggle='tab'>圈</a></li>");
        _$div.find("ul").append("<li><a href='#ACT-MYCLUB' data-toggle='tab'>最近</a></li>");
        var _$tabDiv = $("<div class='tab-content'></div>");
        _$tabDiv.append("<div class='tab-pane panel active  clearfix' id='ACT-DEPARTMENT'></div>");
        _$tabDiv.append("<div class='tab-pane panel  clearfix' id='ACT-MYCLUB'></div>");
        _$div.append(_$tabDiv);
        // var _$addressBookDiv = $("<div class='sns_addressbook panel panel-default ACT-RIGHT-COMMON'><div class='panel-heading'><i class='icon-sitemap'></i>部门</div></div>");
        $rightDiv.find(".DESK-SYSTEM-NOTICE").before(_$div);
        var _$departmentDiv = _$div.find('#ACT-DEPARTMENT');
        var _$clubDiv = _$div.find('#ACT-MYCLUB');

        //        _$departmentDiv.AtawZTree({ RegName: 'SNSDepartmentCodeTable', OnNodeCreatedFun: BindNodeClickEvent });
        //        _$addressBookDiv.append(_$departmentDiv);
        //        _$departmentDiv.AtawControl().loadData();
        //_$addressBookDiv.append(_$departmentDiv);
        // var _$MsgWindow = $("<div class='PAGE-WINDOW-ACT msg_window'><div class='dialog_content'></div><div style='padding-top:230px'><textarea style='resize:none;width:90%' class='message_text'></textarea><a class='btn btn-sm btn-primary send_msg'>发送</a></div></div>");
        $.AKjs.getJSON("/sns/CodeTable/GetCustomTree", { regName: "SNSDepartmentCodeTable" }, function (res) {
            _$departmentDiv.AtawLeftMenuTree({ Data: res });
            _$departmentDiv.find(".icon-file-alt ").remove();
            _$departmentDiv.find(".icon-folder-close ").removeClass().addClass("icon-group fa fa-group");
            _$departmentDiv.find(".ACT-ITEMSPAN").unbind("click");
            _$departmentDiv.find(".send_msg_private").unbind("click").click(function () {
                var _receiveNickName = $(this).parent().attr("nickname");
                var _receiveUserID = $(this).parent().attr("userid");
                if ($.AKjs.LoginId == _receiveUserID)
                    return;
                WinOpen($.AKjs.App.$P2PWindow, _receiveUserID, _receiveNickName);
            });
        });
        var _isExpand = false;
        $.AKjs.getJSON("/sns/CodeTable/GetCustomTree", { regName: "SNSClubTreeCodeTable" }, function (res) {
            _$clubDiv.AtawLeftMenuTree({ Data: res });
            _$clubDiv.find(".icon-file-alt").remove();
            _$clubDiv.find(".icon-folder-close").removeClass();
            var _items = _$clubDiv.find(".menuItems");
            var _itemList = [];
            for (var i = 0; i < _items.length; i++) {
                var _obj = { Item: _items[i], IsExpand: _isExpand };
                _itemList.push(_obj);
            }
            $.each(_items, function (i, n) {
                $(this).unbind("click").bind("click", function () {
                    if (!_itemList[i].IsExpand) {
                        $(this).parent().find("ul").show();
                        _itemList[i].IsExpand = true;
                        $.AKjs.App.bindPageEvent(_$clubDiv);
                    }
                    else {
                        $(this).parent().find("ul").hide();
                        _itemList[i].IsExpand = false;
                    }
                })

            });
        });

        // var _treeObj = null;
        //        function BindNodeClickEvent(treeObj, event, treeId, treeNode) {
        //            _treeObj = treeObj;
        //            treeObj.$Ul.find("div[userid='" + treeNode.CODE_VALUE + "']").find(".send_msg_private").unbind("click").bind("click", function () {
        //                _treeObj.$JObj.find(".msg_window").remove();
        //                //_treeObj.$JObj.append(_$MsgWindow);
        //                WinOpen(_$MsgWindow);
        //            });
        //        }

        function WinOpen($winObj, receiveUserID, receiveNickName) {
            //$winObj.find(".ACT-INPUT-MSG").val("");
            $.AKjs.App.CurrentChatUserID = receiveUserID;
            $winObj.find(".ACT-MSHg-content").html("");
            $.AKjs.getJSON("/SNS/Chat/GetChatHistory", { receiveUserID: receiveUserID }, function (res) {
                for (var i = res.length - 1; i >= 0; i--) {
                    if (res[i].SendNickName == $.AKjs.NickName) {
                        var _color = "lightskyblue";
                    }
                    else
                        _color = "royalblue";
                    var _text = "<div><p style='color:" + _color + "'>" + res[i].SendNickName + " " + res[i].SendTime + "</p><p> " + res[i].SendMessage + "</p></div>";
                    $winObj.find(".ACT-MSHg-content").append(_text);
                }
            });
            $winObj.find(".ACT-SEND-ACTION").unbind("click").bind("click", function () {
                var _message = $winObj.find(".ACT-INPUT-MSG").val();
                if (_message .AisEmpty())
                    return;
                $winObj.find(".ACT-INPUT-MSG").val("");
                var _sendTime = new Date().Aformat("yyyy-mm-dd hh:nn:ss");
                //var _text = "<div>" + " " + _sendTime + ":" + _message + "</div>";
                //$winObj.find(".ACT-MSHg-content").append(_text);
                var obj = { sendMsg: _message, sendTime: _sendTime, receiveUserID: receiveUserID, receiveNickName: receiveNickName, controlName: "IM", actionName: "p2p" };
                $.post("/SNS/Chat/PrivateChat", obj, function (res) {
                });
            });

            var myTitle = "与" + receiveNickName + "私聊中";
            $winObj.AtawWindow({
                Title: myTitle,
                Width: 300,
                Fixed: true,
                WindowCloseFun: function () {
                    $.AKjs.App.CurrentChatUserID = null;
                }

            });
            $winObj.css({ "height": "400px", "overflow": "hidden" });
            var $Win = $winObj.AtawControl();
            $Win.open();
        }

    }

})(jQuery);