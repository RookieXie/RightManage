/// <reference path="typings/react/react.d.ts" />
/// <reference path="typings/react/react-dom.d.ts" />
define(["require", "exports", "react", "react-dom"], function (require, exports, React, ReactDOM) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DomReact extends React.Component {
        render() {
            return React.createElement("div", null,
                React.createElement("input", { className: "Hg-width", onChange: () => { return false; } }),
                "\u6211\u65E5\u65E5\u65E5");
        }
    }
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
