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
define(["require", "exports", "./../baseCol/baseCol", "./../../01core/Ioc", "./../../01core/Util", "react", "react-dom"], function (require, exports, basecolFile, iocFile, utilFile, React, ReactDOM) {
    "use strict";
    exports.__esModule = true;
    var DateCol;
    (function (DateCol) {
        var DateAction = (function (_super) {
            __extends(DateAction, _super);
            function DateAction() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return DateAction;
        }(basecolFile.Core.BaseColAction));
        DateCol.DateAction = DateAction;
        var DateReact = (function (_super) {
            __extends(DateReact, _super);
            function DateReact() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            DateReact.prototype.pInputOnChange = function (e) {
                var _val = e.target["value"];
                //调用Object的设置
                this.props.Vm.reactDataValueSet(_val);
            };
            DateReact.prototype.pSender = function () {
                return React.createElement("div", null,
                    React.createElement("input", { ref: "date", placeholder: "选择...", value: this.props.Vm.reactDataValueGet() }));
            };
            DateReact.prototype.pComponentDidMount = function () {
                _super.prototype.pComponentDidMount.call(this);
                var _val = this.props.Vm.reactDataValueGet();
                var __this = this;
                try {
                    utilFile.Core.Util.AsyncJs(["/AtawStatic/lib/03Extend/lhgcalendar/lhgcalendar.min.js", "/AtawStatic/lib/03Extend/lhgcalendar/skins/lhgcalendar.css"], function () {
                        var _$dom = __this.fGetDateDom();
                        if (__this.props.Vm.IsInAndAfterToday == false || __this.props.Vm.IsInAndAfterToday == true) {
                            _$dom.calendar({
                                format: "yyyy-MM-dd",
                                btnBar: false,
                                minDate: '%y-%M-%d',
                                noToday: __this.props.Vm.IsInAndAfterToday,
                                onSetDate: function () { __this.dateChange(this.getDate('dateTime')); }
                            });
                        }
                        else {
                            _$dom.calendar({
                                format: "yyyy-MM-dd",
                                btnBar: false,
                                onSetDate: function () { __this.dateChange(this.getDate('dateTime')); }
                            });
                        }
                    }, function (reqError) { alert("js载入错误"); console.log(reqError); });
                }
                catch (eee) {
                    alert("require错误");
                }
                __this.fGetDateDom().addClass("runcode");
            };
            ;
            DateReact.prototype.dateChange = function (dateVal) {
                if (dateVal == "" || dateVal == null || utilFile.Core.Util.isDateTime(dateVal) || utilFile.Core.Util.isDate(dateVal)) {
                    //  var _bean: DateVm = new DateVm();
                    //   _bean.dataValueSet(dateVal);
                    //   this.DataValue.setValue(dateVal);
                    //   this.triggerChangeEvent();
                    var _ac = new DateAction();
                    _ac.DataValue = dateVal;
                    _ac.Vm = this.props.Vm;
                    this.pDispatcher(_ac);
                    //调用Object的设置
                    this.props.Vm.reactDataValueSet(dateVal);
                }
                else {
                    alert("日期控件的格式不对");
                    this.fGetDateDom().val("");
                    this.props.Vm.reactDataValueSet("");
                }
            };
            DateReact.prototype.fGetDateDom = function () {
                var _reactObj = this.refs["date"];
                var _dom = ReactDOM.findDOMNode(_reactObj);
                var _$dom = $(_dom);
                return _$dom;
            };
            return DateReact;
        }(basecolFile.Core.BaseColReact));
        DateCol.DateReact = DateReact;
        var DateProps = (function (_super) {
            __extends(DateProps, _super);
            function DateProps() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return DateProps;
        }(basecolFile.Core.BaseColProps));
        DateCol.DateProps = DateProps;
        var DateVm = (function (_super) {
            __extends(DateVm, _super);
            function DateVm(config) {
                var _this = _super.call(this) || this;
                _this.ReactType = DateReact;
                _this.pRegName = "文本控件";
                _this.IsEmpty = true;
                if (config) {
                    if (config.IsInAndAfterToday) {
                        _this.IsInAndAfterToday = config.IsInAndAfterToday;
                    }
                }
                return _this;
            }
            DateVm.prototype.reactDataValueGet = function () {
                var _str = _super.prototype.reactDataValueGet.call(this);
                if (_str && _str != "") {
                    var _time = new Date(_str);
                    return utilFile.Core.Util.DateFormat(new Date(_time.toDateString()), "yyyy-MM-dd");
                }
                else
                    return _str;
            };
            return DateVm;
        }(basecolFile.Core.BaseColVm));
        DateCol.DateVm = DateVm;
        var DateStates = (function (_super) {
            __extends(DateStates, _super);
            function DateStates() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return DateStates;
        }(basecolFile.Core.BaseColStates));
        DateCol.DateStates = DateStates;
        iocFile.Core.Ioc.Current().RegisterType("DateVm", basecolFile.Core.BaseColVm, DateVm);
    })(DateCol = exports.DateCol || (exports.DateCol = {}));
});
