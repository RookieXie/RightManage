define(["require", "exports", "./../baseCol/baseCol", "./../../01core/Ioc", "./../../01core/Util", "react", "react-dom"], function (require, exports, basecolFile, iocFile, utilFile, React, ReactDOM) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DateTimeCol;
    (function (DateTimeCol) {
        class DateTimeAction extends basecolFile.Core.BaseColAction {
        }
        DateTimeCol.DateTimeAction = DateTimeAction;
        class DateTimeReact extends basecolFile.Core.BaseColReact {
            pInputOnChange(e) {
                var _val = e.target["value"];
                //调用Object的设置
                this.props.Vm.reactDataValueSet(_val);
            }
            pSender() {
                return React.createElement("div", null,
                    React.createElement("input", { ref: "dateTime", placeholder: "选择...", value: this.props.Vm.reactDataValueGet() }));
            }
            pComponentDidMount() {
                super.pComponentDidMount();
                var _val = this.props.Vm.reactDataValueGet();
                var __this = this;
                try {
                    utilFile.Core.Util.AsyncJs(["/AtawStatic/lib/03Extend/lhgcalendar/lhgcalendar.min.js", "/AtawStatic/lib/03Extend/lhgcalendar/skins/lhgcalendar.css"], function () {
                        var _$dom = __this.fGetDateDom();
                        if (__this.props.Vm.IsInAndAfterToday == false || __this.props.Vm.IsInAndAfterToday == true) {
                            _$dom.calendar({
                                format: "yyyy-MM-dd HH:mm:ss",
                                btnBar: false,
                                minDate: '%y-%M-%d',
                                noToday: __this.props.Vm.IsInAndAfterToday,
                                onSetDate: function () { __this.dateChange(this.getDate('dateTime')); }
                            });
                        }
                        else {
                            _$dom.calendar({
                                format: "yyyy-MM-dd HH:mm:ss",
                                btnBar: false,
                                onSetDate: function () { __this.dateChange(this.getDate('dateTime')); }
                            });
                        }
                    }, (reqError) => { alert("js载入错误"); console.log(reqError); });
                }
                catch (eee) {
                    alert("require错误");
                }
                __this.fGetDateDom().addClass("runcode");
            }
            ;
            dateChange(dateVal) {
                if (dateVal == "" || dateVal == null || utilFile.Core.Util.isDateTime(dateVal) || utilFile.Core.Util.isDate(dateVal)) {
                    //调用Object的设置
                    this.props.Vm.reactDataValueSet(dateVal);
                }
                else {
                    alert("日期控件的格式不对");
                    this.fGetDateDom().val("");
                    this.props.Vm.reactDataValueSet("");
                }
            }
            fGetDateDom() {
                var _reactObj = this.refs["dateTime"];
                var _dom = ReactDOM.findDOMNode(_reactObj);
                var _$dom = $(_dom);
                return _$dom;
            }
        }
        DateTimeCol.DateTimeReact = DateTimeReact;
        class DateTimeProps extends basecolFile.Core.BaseColProps {
        }
        DateTimeCol.DateTimeProps = DateTimeProps;
        class DateTimeVm extends basecolFile.Core.BaseColVm {
            constructor(config) {
                super();
                this.ReactType = DateTimeReact;
                this.pRegName = "文本控件";
                this.IsEmpty = true;
                if (config) {
                    if (config.IsInAndAfterToday) {
                        this.IsInAndAfterToday = config.IsInAndAfterToday;
                    }
                }
            }
            reactDataValueGet() {
                var _str = super.reactDataValueGet();
                if (_str && _str != "") {
                    var _time = new Date(_str);
                    return utilFile.Core.Util.DateFormat(new Date(_time.toDateString()), "yyyy-MM-dd");
                }
                else
                    return _str;
            }
        }
        DateTimeCol.DateTimeVm = DateTimeVm;
        class DateTimeStates extends basecolFile.Core.BaseColStates {
        }
        DateTimeCol.DateTimeStates = DateTimeStates;
        iocFile.Core.Ioc.Current().RegisterType("DateTimeVm", basecolFile.Core.BaseColVm, DateTimeVm);
    })(DateTimeCol = exports.DateTimeCol || (exports.DateTimeCol = {}));
});
