define(["require", "exports", "./../baseCol/baseCol", "./../../01core/Ioc", "react"], function (require, exports, basecolFile, iocFile, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Text;
    (function (Text) {
        class TextAction extends basecolFile.Core.BaseColAction {
        }
        Text.TextAction = TextAction;
        class TextReact extends basecolFile.Core.BaseColReact {
            pInputOnChange(e) {
                var _val = e.target["value"];
                if (!_val || _val == "") {
                    this.props.Vm.IsEmpty = true;
                }
                //赋值
                this.props.Vm.reactDataValueSet(_val);
            }
            pSender() {
                return React.createElement("div", { className: "Hc-input" },
                    React.createElement("input", { type: "text", value: this.props.Vm.reactDataValueGet(), onChange: (e) => { this.pInputOnChange(e); return true; }, className: "Hg-width form-control " }),
                    React.createElement("i", { className: "fa fa-close Hu-pointer" + (!this.props.Vm.IsEmpty ? "" : " hide"), onClick: (a) => { this.fun_emptyClick(); } }),
                    React.createElement("div", { className: "Hm-legal hide" },
                        React.createElement("div", { className: "Hu-triangle" }),
                        React.createElement("span", null)));
            }
            fun_emptyClick() {
                this.props.Vm.dataValueSet("");
                this.props.Vm.IsEmpty = true;
                this.forceUpdate();
            }
        }
        Text.TextReact = TextReact;
        class TextProps extends basecolFile.Core.BaseColProps {
        }
        Text.TextProps = TextProps;
        class TextVm extends basecolFile.Core.BaseColVm {
            constructor() {
                super();
                this.ReactType = TextReact;
                this.pRegName = "文本控件";
                this.IsEmpty = true;
            }
        }
        Text.TextVm = TextVm;
        class TextStates extends basecolFile.Core.BaseColStates {
        }
        Text.TextStates = TextStates;
        iocFile.Core.Ioc.Current().RegisterType("TextVm", basecolFile.Core.BaseColVm, TextVm);
    })(Text = exports.Text || (exports.Text = {}));
});
