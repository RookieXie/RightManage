import React = require("react");
import ReactDOM = require("react-dom");

//import hullFile = require("./src/06app/Web/Hull");
import hullFile = require("./src/06app/Web/Hull");
import iocFile = require("./src/01core/Ioc");
import RightManageApp = require("./src/RightManage/RightManageApp"); RightManageApp;
import PageApp = require("./src/03page/PageApp"); PageApp;

$(function () {
    if ($("#ACT-DIV-SHELL").length > 0) {
        var _config: hullFile.Web.IHullVmConfig = $.extend(
            {},
            { HomeUrl: "$xbgTestPage$", IsV1: true });
        ReactDOM.render(new hullFile.Web.HullVm(_config).intoDom(0), document.getElementById("ACT-DIV-SHELL"));
    }
}); 