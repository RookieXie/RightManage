define(["require", "exports", "react-dom", "./src/06app/Web/Hull", "./src/RightManage/RightManageApp", "./src/03page/PageApp"], function (require, exports, ReactDOM, hullFile, RightManageApp, PageApp) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    RightManageApp;
    PageApp;
    $(function () {
        if ($("#ACT-DIV-SHELL").length > 0) {
            var _config = $.extend({}, { HomeUrl: "$xbgTestPage$", IsV1: true });
            ReactDOM.render(new hullFile.Web.HullVm(_config).intoDom(0), document.getElementById("ACT-DIV-SHELL"));
        }
    });
});
