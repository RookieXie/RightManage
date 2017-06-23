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
define(["require", "exports", "./../baseCol/baseCol", "./../../01core/Ioc", "react"], function (require, exports, basecolFile, iocFile, React) {
    "use strict";
    exports.__esModule = true;
    var Text;
    (function (Text) {
        var TextAction = (function (_super) {
            __extends(TextAction, _super);
            function TextAction() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return TextAction;
        }(basecolFile.Core.BaseColAction));
        Text.TextAction = TextAction;
        var TextReact = (function (_super) {
            __extends(TextReact, _super);
            function TextReact() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            TextReact.prototype.pInputOnChange = function (e) {
                var _val = e.target["value"];
                if (!_val || _val == "") {
                    this.props.Vm.IsEmpty = true;
                }
                //赋值
                this.props.Vm.reactDataValueSet(_val);
            };
            TextReact.prototype.pSender = function () {
                var _this = this;
                return React.createElement("div", { className: "Hc-input" },
                    React.createElement("input", { type: "text", value: this.props.Vm.reactDataValueGet(), onChange: function (e) { _this.pInputOnChange(e); return false; }, className: "Hg-width form-control " }),
                    React.createElement("i", { className: "fa fa-close Hu-pointer" + (!this.props.Vm.IsEmpty ? "" : " hide"), onClick: function (a) { _this.fun_emptyClick(); } }),
                    React.createElement("div", { className: "Hm-legal hide" },
                        React.createElement("div", { className: "Hu-triangle" }),
                        React.createElement("span", null)));
            };
            TextReact.prototype.fun_emptyClick = function () {
                this.props.Vm.dataValueSet("");
                this.props.Vm.IsEmpty = true;
                this.forceUpdate();
            };
            return TextReact;
        }(basecolFile.Core.BaseColReact));
        Text.TextReact = TextReact;
        var TextProps = (function (_super) {
            __extends(TextProps, _super);
            function TextProps() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return TextProps;
        }(basecolFile.Core.BaseColProps));
        Text.TextProps = TextProps;
        var TextVm = (function (_super) {
            __extends(TextVm, _super);
            function TextVm() {
                var _this = _super.call(this) || this;
                _this.ReactType = TextReact;
                _this.pRegName = "文本控件";
                _this.IsEmpty = true;
                return _this;
            }
            return TextVm;
        }(basecolFile.Core.BaseColVm));
        Text.TextVm = TextVm;
        var TextStates = (function (_super) {
            __extends(TextStates, _super);
            function TextStates() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return TextStates;
        }(basecolFile.Core.BaseColStates));
        Text.TextStates = TextStates;
        iocFile.Core.Ioc.Current().RegisterType("TextVm", basecolFile.Core.BaseColVm, TextVm);
    })(Text = exports.Text || (exports.Text = {}));
});
