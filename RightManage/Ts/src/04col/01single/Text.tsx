import domFile = require("./../../01core/0Dom");
import basecolFile = require("./../baseCol/baseCol");
import iocFile = require("./../../01core/Ioc");
import React = require("react");
import ReactDOM = require("react-dom");

export module Text {
    export class TextAction extends basecolFile.Core.BaseColAction {

    }
    export class TextReact extends basecolFile.Core.BaseColReact<TextProps, TextStates, TextAction> implements domFile.Core.IReact {



        protected pInputOnChange(e: React.FormEvent) {
            var _val = e.target["value"];
           
            if (!_val || _val == "") {
                this.props.Vm.IsEmpty = true;
            }
            //赋值
            this.props.Vm.reactDataValueSet(_val);


        }



        public pSender(): React.ReactElement<any> {
            return <div className="Hc-input">
                <input type="text" value={this.props.Vm.reactDataValueGet()}
                    onChange={(e) => { this.pInputOnChange(e); return false; }}
                    className="Hg-width form-control "
                >
                </input>
                <i className={"fa fa-close Hu-pointer" + (!this.props.Vm.IsEmpty ? "" : " hide")} onClick={(a) => { this.fun_emptyClick(); }}></i>
                <div className="Hm-legal hide"><div className="Hu-triangle"></div><span></span></div>
            </div>
        }
        protected fun_emptyClick() {
            this.props.Vm.dataValueSet("");
            this.props.Vm.IsEmpty = true;
            this.forceUpdate();
        }
    }
    export class TextProps extends basecolFile.Core.BaseColProps<TextVm> {



    }
    export class TextVm extends basecolFile.Core.BaseColVm {
        public ReactType: any = TextReact;
        protected pRegName = "文本控件";
        public IsEmpty: boolean = true;
        constructor() {
            super();
        }
    }
    export class TextStates extends basecolFile.Core.BaseColStates {

    }

    iocFile.Core.Ioc.Current().RegisterType("TextVm", basecolFile.Core.BaseColVm, TextVm);
}