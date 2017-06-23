(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};
    $.AKjs.DetailFormat = $.AKjs.DetailFormat ? $.AKjs.DetailFormat : {};

    // val = this.DetialFormatFun(_val, this.ParentFormObj,val);
    $.AKjs.DetailFormat.AddWorkflowDefLink = function (a) {
        var key = this.ParentColumnObj.ParentRowObj.DataRow.WD_SHORT_NAME;
        return "<a href='/Workflow/Designer/Index?shortName=" + key + "' target='_blank'>" + a + "</a>"
    }
    $.AKjs.DetailFormat.AddWorkflowInstHisLink = function (a) {
        var key = this.ParentColumnObj.ParentRowObj.DataRow.WI_ID;

        return $('<a href="javascript:void(0)" key="' + key + '" onclick="$.AKjs.WorkflowInstHisDetail(this)">' + a + '</a>');
    }
    $.AKjs.DetailFormat.AddWorkflowInstLink = function (a) {
        var key = this.ParentColumnObj.ParentRowObj.DataRow.WI_ID;
        return $('<a href="javascript:void(0)" key="' + key + '" onclick="$.AKjs.WorkflowInstDetail(this)">' + a + '</a>');
    }
    $.AKjs.DetailFormat.AddPx = function (a) {
        return a + "px";
    }

    //金额格式化
    $.AKjs.DetailFormat.FormatMoney = function (a) {
        if (!isNaN(a)) {
            return parseFloat(a).toFixed(2) + "元";
        }
        return "";
    }

    //重量格式化
    $.AKjs.DetailFormat.FormatWeight = function (a) {
        if (parseFloat(a)) {
            return parseFloat(a).toFixed(2) + "千克";
        }
        return "";
    }

    //容积格式化
    $.AKjs.DetailFormat.FormatVolume = function (a) {
        if (parseFloat(a)) {
            return parseFloat(a).toFixed(2) + "L";
        }
        return "";
    }

    //长度格式化
    $.AKjs.DetailFormat.FormatLen = function (a) {
        if (parseFloat(a)) {
            return parseFloat(a).toFixed(2) + "公里";
        }
        return "";
    }

    //小时格式化
    $.AKjs.DetailFormat.FormatHour = function (a) {
        if (parseFloat(a)) {
            return parseFloat(a).toFixed(2) + "小时";
        }
        return "";
    }
    //天格式化
    $.AKjs.DetailFormat.FormatDay = function (a) {
        if (a) {
            return a + "天";
        }
        return "";
    }
    //月格式化
    $.AKjs.DetailFormat.FormatMonth = function (a) {
        if (a) {
            return a + "月";
        }
        return "";
    }
    //布尔值格式化
    $.AKjs.DetailFormat.FormatBoolDetail = function (a) {
        if (a)
        { return "√"; }
        return "×";
    }
    $.AKjs.DetailFormat.FormatStrong = function (a, b, c) {
        //<strong>
        return "<span style='font-weight:bold'>" + c + "</span>";
    }
    //订单的格式化
    $.AKjs.DetailFormat.FormatOrder = function (a) {
        var _color = "";
        a = $(a).text();
        switch (a) {
            case "作废":
                _color = "gray";
                break;
            case "待付款":
                _color = "red";
                break;
            case "用户申请退货":
                _color = "red";
                break;
            case "用户申请退款":
                _color = "red";
                break;
            case "已付款":
                _color = "orange";
                break;
            case "已发货":
                _color = "blue";
                break;
            case "完成":
                _color = "green";
                break;
            default:
                break;
        }
        return "<span style='padding: 4px;color:" + _color + "'>" + a + "<span>";
    }

    //图标格式化
    $.AKjs.DetailFormat.FormatIcon = function (a) {
        return "<span><i class='icon-2x " + a + "' style='color:#000000'/></span>&nbsp&nbsp&nbsp&nbsp<span class='label label-success'><i class=' " + a + "' /></span>";

    }

    //颜色格式化
    $.AKjs.DetailFormat.FormatColor = function (a) {
        var _color = "";
        a = $(a).text();
        switch (a) {
            case "简单":
                _color = "green";
                break;
            case "普通":
                _color = "orange";
                break;
            case "困难":
                _color = "red";
                break;
            default:
                break;

        }
        return "<span style='padding: 4px;color:" + _color + "'>" + a + "<span>";
    }

    $.AKjs.DetailFormat.AddPlaceApplyFileLink = function (a) {
        var fid = this.ParentColumnObj.ParentRowObj.DataRow.FID;
        //var filePath = this.ParentColumnObj.ParentRowObj.DataRow.RF_FILEPATH;
        //        filePath = "http://file:"+ filePath.replace(/\\/g, '/');
        //        return "<a target=\"_blank\" href=\"" + filePath + "\">" + a + "</a>";
        // return "<a onclick=\" $.AKjs.RookieFDownLoadFun(" + fid + ");\">" + a + "</a>"
        return "<a onclick=\" $.AKjs.RookieFDownLoadFun('"+fid+"');\">" + a + "</a>";
    }

    $.AKjs.RookieFDownLoadFun = function (fid) {
        window.open("/RookieF/DeviceReportViewer/LogisticsFileDown?fid=" + fid + "&rmd=" + Math.random());
    }

})(jQuery);