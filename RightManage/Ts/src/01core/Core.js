"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var DomReact = (function (_super) {
    __extends(DomReact, _super);
    function DomReact() {
        return _super.apply(this, arguments) || this;
    }
    DomReact.prototype.render = function () {
        return this.pRender();
    };
    DomReact.prototype.pRender = function () {
        return null;
    };
    return DomReact;
}(React.Component));
exports.DomReact = DomReact;
var DomVm = (function () {
    function DomVm() {
    }
    return DomVm;
}());
exports.DomVm = DomVm;
var TestDomReact = (function (_super) {
    __extends(TestDomReact, _super);
    function TestDomReact() {
        return _super.apply(this, arguments) || this;
    }
    TestDomReact.prototype.pRender = function () {
        return <div>{this.props.Vm.TestDomVm}</div>;
    };
    ;
    return TestDomReact;
}(DomReact));
exports.TestDomReact = TestDomReact;
var TestDomVm = (function (_super) {
    __extends(TestDomVm, _super);
    function TestDomVm() {
        var _this = _super.apply(this, arguments) || this;
        _this.TestDomVm = "hahahaha";
        return _this;
    }
    return TestDomVm;
}(DomVm));
exports.TestDomVm = TestDomVm;
