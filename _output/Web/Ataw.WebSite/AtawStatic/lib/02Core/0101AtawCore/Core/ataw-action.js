define(["AppGet","json"], function (appGet,json) {

 var Ataw_ActionType = {
        1: "Alert",
        2: "Reload",
        3: "Url",
        4: "Object",
        5: "Noty",
        6: "NoGotoUrl",
        8: "JsonObject"
    };

   var ActionCommond = {
        Alert: function (aRR) {
            // Ataw.msgbox.show(aRR.Content);
            appGet().notifyMesg(aRR.Content);
        },
        Reload: function (aRR) {
            window.location.reload();
        },
        Url: function (aRR) {
            window.location.href = aRR.Content;
        },
        Object: function (aRR, obj_Fun) {
            if (obj_Fun) {
                obj_Fun(aRR.Obj);
            }
            return aRR.Obj;
        },
        NoGotoUrl: function (aRR) {
            appGet().openUrl(aRR.Content);
        },
        JsonObject: function (aRR, obj_Fun) {
            var obj = json.parseJSON(aRR.Obj)
            obj_Fun(obj);
            return obj;
        }
    };


    function ActionResponse_Commond_Fun(aRR, obj_Fun) {
        var _Ataw_ActionType = Ataw_ActionType[aRR.ActionType];
        if (_Ataw_ActionType == undefined) {
            _Ataw_ActionType = ActionCommond[aRR.ActionType];
            if (_Ataw_ActionType)
                _Ataw_ActionType = aRR.ActionType;
        }
        if (_Ataw_ActionType) {
            var _ActionCommond = ActionCommond[_Ataw_ActionType];
            if (_ActionCommond) {
                return _ActionCommond(aRR, obj_Fun);
            } else {
                alert("不存在的命令定义： " + _ActionCommond);
            }
        }
        else
            alert("不存在的命令值 " + aRR.ActionType);
    }

    return {
        Ataw_ActionType: Ataw_ActionType,
        ActionCommond: ActionCommond,
        ActionResponse_Commond_Fun: ActionResponse_Commond_Fun
    };

});


