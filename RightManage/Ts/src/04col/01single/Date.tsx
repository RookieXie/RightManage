﻿import domFile = require("./../../01core/0Dom");
import basecolFile = require("./../baseCol/baseCol");
import iocFile = require("./../../01core/Ioc");
import utilFile = require("./../../01core/Util");
import React = require("react");
import ReactDOM = require("react-dom");

export module DateCol {
    export class DateAction extends basecolFile.Core.BaseColAction {

    }
    export class DateReact extends basecolFile.Core.BaseColReact<DateProps, DateStates, DateAction> implements domFile.Core.IReact {
        protected pInputOnChange(e: React.FormEvent) {
            
            var _val = e.target["value"];      
            //调用Object的设置
            this.props.Vm.reactDataValueSet(_val);
        }
       
        public pSender(): React.ReactElement<any> {
            return <div>
                <input ref="date" placeholder="选择..."
                    value={this.props.Vm.reactDataValueGet()}>
                </input>
            </div>
        }

        protected pComponentDidMount(): void {
            super.pComponentDidMount();
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
                }, (reqError) => { alert("js载入错误"); console.log(reqError) });
            }
            catch (eee) {
                alert("require错误");
            }


            __this.fGetDateDom().addClass("runcode");
        };

        private dateChange(dateVal: string) {
            if (dateVal == "" || dateVal == null || utilFile.Core.Util.isDateTime(dateVal) || utilFile.Core.Util.isDate(dateVal)) {
                //  var _bean: DateVm = new DateVm();
                //   _bean.dataValueSet(dateVal);

                //   this.DataValue.setValue(dateVal);
                //   this.triggerChangeEvent();

                var _ac: DateAction = new DateAction();
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
        }

        private fGetDateDom(): JQuery {
            var _reactObj = this.refs["date"];
            var _dom = ReactDOM.findDOMNode(_reactObj);
            var _$dom = $(_dom);
            return _$dom;
        }

        
    }
    export class DateProps extends basecolFile.Core.BaseColProps<DateVm> {



    }
    export interface IDateVmConfig {
        IsInAndAfterToday?: boolean;
    }
    export class DateVm extends basecolFile.Core.BaseColVm {
        public ReactType: any = DateReact;
        protected pRegName = "文本控件";
        public IsEmpty: boolean = true;
        public IsInAndAfterToday: boolean;
        constructor(config?:IDateVmConfig) {
            super();
            if (config) {
                if (config.IsInAndAfterToday) {
                    this.IsInAndAfterToday = config.IsInAndAfterToday;
                }
            }
        }
        public reactDataValueGet() {
            var _str = super.reactDataValueGet();
            if (_str && _str != "") {
                var _time = new Date(_str);
                return utilFile.Core.Util.DateFormat(new Date(_time.toDateString()), "yyyy-MM-dd");
            }
            else
                return _str;
        }
    }
    export class DateStates extends basecolFile.Core.BaseColStates {

    }

    iocFile.Core.Ioc.Current().RegisterType("DateVm", basecolFile.Core.BaseColVm, DateVm);
}