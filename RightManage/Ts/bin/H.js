/// <reference path="typings/react/react.d.ts" />
/// <reference path="typings/react/react-dom.d.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "react", "react-dom"], function (require, exports, React, ReactDOM) {
    "use strict";
    exports.__esModule = true;
    var DomReact = (function (_super) {
        __extends(DomReact, _super);
        function DomReact() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DomReact.prototype.render = function () {
            return React.createElement("div", null,
                React.createElement("input", { className: "Hg-width", onChange: function () { return false; } }),
                "\u6211\u65E5\u65E5\u65E5");
        };
        return DomReact;
    }(React.Component));
    exports.DomReact = DomReact;
    $(function () {
        if ($("#ACT-DIV-SHELL").length > 0) {
            // debugger;
            // alert(123);
            // window["Hull_HasNoLeftMenu"] = true;
            ReactDOM.render(React.createElement(DomReact, {}, {}), document.getElementById("ACT-DIV-SHELL"));
        }
    });
});
