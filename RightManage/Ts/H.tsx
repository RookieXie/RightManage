/// <reference path="typings/react/react.d.ts" />
/// <reference path="typings/react/react-dom.d.ts" />

import React = require("react");
import ReactDOM = require("react-dom");

export class DomReact extends React.Component<any, any>{
    public render(): React.ReactElement<any> {
        return <div><input className="Hg-width" onChange={() => { return false; } } ></input>我日日日</div>;
    }
     
}

$(function () {
    if ($("#ACT-DIV-SHELL").length > 0) {
        // debugger;
        // alert(123);
        // window["Hull_HasNoLeftMenu"] = true;
        ReactDOM.render(React.createElement(DomReact, {}, {}), document.getElementById("ACT-DIV-SHELL"));
    }
}); 