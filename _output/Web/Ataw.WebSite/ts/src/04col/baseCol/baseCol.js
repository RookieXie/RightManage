//import akDispatcher = require("./../../01core/AkDispatcher");
define(["require", "exports", "./../../01core/Util", "./../../01core/0Dom", "react-dom"], function (require, exports, utilFile, domFile, ReactDOM) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DomReact = domFile.Core.DomReact;
    var DomVm = domFile.Core.DomVm;
    var DomProps = domFile.Core.DomProps;
    var DomStates = domFile.Core.DomStates;
    var DomAction = domFile.Core.DomAction;
    var Core;
    (function (Core) {
        class BaseColReact extends DomReact {
            getState() {
                if (this.state == null) {
                    var s = new BaseColStates();
                    this.state = s;
                }
                return this.state;
            }
            pInstall() {
                super.pInstall();
                //if (this.props.Vm.LegalObj) {
                //    this.props.Vm.LegalObj.ControlObj = this.props.Vm;
                //    this.listenEvent("legal", (msg: string) => {
                //        // this.getState().ErrMsg = msg;
                //        // this.getState().LegalResult = false;
                //        this.legal(msg);
                //    });
                //    this.listenEvent("cancleLegal", () => {
                //        // alert($(_dom).html());
                //        this.cancleLegalSender();
                //        //  }
                //    });
                //}
            }
            ;
            legal(msg) {
                //this.forceUpdate();
                //var _dom = ReactDOM.findDOMNode (this);
                this.legalSender();
                this.legalShowMsg(msg);
            }
            getLegalMsgDom() {
                try {
                    //if(this.isMounted)
                    var _dom = ReactDOM.findDOMNode(this);
                    return $(_dom);
                }
                catch (ee) {
                    return $("<div></div>");
                }
            }
            getInputDom() {
                try {
                    var _dom = ReactDOM.findDOMNode(this);
                    return $(_dom);
                }
                catch (ee) {
                    return $("<div></div>");
                }
            }
            legalShowMsg(msg) {
                var _cal = $.fn["calendar"];
                //autosize
                var _autosize = $.fn["autosize"];
                utilFile.Core.Util.AsyncJs(["/AtawStatic/lib/03Extend/qtip/jquery.qtip.min.js", "/AtawStatic/lib/03Extend/qtip/jquery.qtip.min.css"], () => {
                    $.fn["calendar"] = _cal;
                    $.fn["autosize"] = _autosize;
                    var _$dom = this.getLegalMsgDom();
                    var _$domP = _$dom;
                    if (!_$dom.is("div") && !_$dom.is("span")) {
                        _$domP = _$domP.parent();
                    }
                    _$dom.qtip({
                        position: {
                            my: 'top center',
                            at: 'bottom left',
                            container: _$domP,
                            adjust: {
                                x: (_$dom.width() / 2)
                            }
                        },
                        content: msg,
                        show: {
                            event: 'click'
                        },
                        hide: {
                            event: 'click'
                        }
                    });
                    _$dom.qtip('toggle', true);
                    //  $(_dom).poshytip("show");
                });
            }
            legalSender() {
                this.getInputDom().addClass("Hs-red-border");
            }
            cancleLegalSender() {
                this.getInputDom().removeClass("Hs-red-border");
                var _cal = $.fn["calendar"];
                utilFile.Core.Util.AsyncJs([
                    "/AtawStatic/lib/03Extend/qtip/jquery.qtip.min.js", "/AtawStatic/lib/03Extend/qtip/jquery.qtip.min.css"
                ], () => {
                    $.fn["calendar"] = _cal;
                    this.getLegalMsgDom().qtip('toggle', false);
                    this.getLegalMsgDom().qtip('destroy', true);
                });
            }
        }
        Core.BaseColReact = BaseColReact;
        class BaseColVm extends DomVm {
            //public LegalObj: AkBaseLegal.Core.BaseLegal = new AkBaseLegal.Core.BaseLegal();
            //public showLegal() {
            //    if (!this.LegalObj.LegalResult) {
            //        this.getEmit("React").emit("legal", this.LegalObj.ErrMsg);
            //    }
            //    else {
            //        this.getEmit("React").emit("cancleLegal");
            //    }
            //}
            //public legal(): boolean {
            //    if (this.LegalObj) {
            //        this.LegalObj.legal();
            //        if (!this.LegalObj.LegalResult) {
            //            this.getEmit("React").emit("legal", this.LegalObj.ErrMsg);
            //        }
            //        else {
            //            this.getEmit("React").emit("cancleLegal");
            //        }
            //        return this.LegalObj.LegalResult;
            //    }
            //    return true;
            //    //this.getEmit().emit("legal",mesg);
            //}
            pOnchange(val) {
                var res = super.pOnchange(val);
                //if (this.legal()) {
                //    this.IsDataValueChange = true;
                //    this.getEmit().emit("BaseColVm_change", this);
                //}
                return res;
            }
            getChangeValFun(changeValFun) {
                var _val = this.getChangeVal();
                changeValFun(_val != null, this.vmDataValueGet(), this);
            }
            getChangeVal() {
                var _val = this.vmDataValueGet();
                var _ori = this.getOriValue();
                if (_val == _ori) {
                    return null;
                }
                else {
                    return _val;
                }
            }
            makerInNavi(config) {
                this.pMakerInNavi(config);
            }
            pMakerInNavi(config) {
            }
        }
        Core.BaseColVm = BaseColVm;
        class BaseColProps extends DomProps {
        }
        Core.BaseColProps = BaseColProps;
        class BaseColStates extends DomStates {
        }
        Core.BaseColStates = BaseColStates;
        class BaseColAction extends DomAction {
        }
        Core.BaseColAction = BaseColAction;
    })(Core = exports.Core || (exports.Core = {}));
});
