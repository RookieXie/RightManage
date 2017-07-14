define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Core;
    (function (Core) {
        class Ioc {
            constructor() {
                this.fInstanceClassList = {};
                this.fInstanceSrcList = {};
            }
            static Current() {
                return this.fIoc;
            }
            IocModel() {
                return this.fInstanceClassList;
            }
            IocSrcModel() {
                return this.fInstanceSrcList;
            }
            RegisterType(regName, baseType, instaceType, customData) {
                // var _f = typeof (TTo);
                // alert(baseType.toString());
                regName = regName.toUpperCase();
                var _stre = Ioc.fGetFunName(baseType);
                var _meta = { RegName: regName, BaseType: baseType, InstanceType: instaceType, customData: customData };
                this.fInstanceClassList[_stre + "_" + regName] = _meta;
            }
            RegisterTypeSrc(regName, baseType, src) {
                regName = regName.toUpperCase();
                var _stre = Ioc.fGetFunName(baseType);
                var _meta = { RegName: regName, BaseType: baseType, InstanceType: src };
                this.fInstanceSrcList[_stre + "_" + regName] = _meta;
            }
            fetchPromise(regName, baseType, config) {
                var _p = $.Deferred();
                this.fFetchAsyInstance(regName, baseType, (a) => {
                    _p.resolve(a);
                }, () => { _p.reject(); }, config);
                return _p.promise();
            }
            FetchAsyInstance(regName, baseType, fun, error, config) {
                this.fFetchAsyInstance(regName, baseType, fun, error, config);
            }
            fFetchAsyInstance(regName, baseType, fun, error, config) {
                regName = regName.toUpperCase();
                var _obj = this.FetchInstance(regName, baseType);
                if (!_obj) {
                    var _stre = Ioc.fGetFunName(baseType);
                    var _meta = this.fInstanceSrcList[_stre + "_" + regName];
                    if (_meta) {
                        require([_meta.InstanceType], (file) => {
                            var obj = this.fFetchInstance(regName, baseType);
                            fun(obj);
                        }, () => {
                            error(_meta.InstanceType);
                        });
                    }
                    else {
                        console.log("注册名为 " + regName + "的类 " + _stre + "未注册 或者 不存在 ");
                        var _isNull = false;
                        if (config) {
                            if (config.NullFun) {
                                config.NullFun(regName, _stre);
                            }
                            else {
                                _isNull = true;
                            }
                        }
                        else {
                            _isNull = true;
                        }
                        if (_isNull) {
                            fun(null);
                        }
                        // error(null);
                    }
                }
                else {
                    return fun(_obj);
                }
            }
            fFetchInstance(regName, baseType) {
                regName = regName.toUpperCase();
                var _stre = Ioc.fGetFunName(baseType);
                var _meta = this.fInstanceClassList[_stre + "_" + regName];
                if (_meta) {
                    var _f = new _meta.InstanceType();
                    return _f;
                }
                else {
                    console.log("注册名为: " + regName + "  类型为" + baseType + "没有注册");
                    return null;
                }
            }
            FetchInstance(regName, baseType) {
                regName = regName.toUpperCase();
                return this.fFetchInstance(regName, baseType);
            }
            static fGetFunName(s) {
                if (typeof s == "string")
                    return s;
                //if (s.constructor && s.constructor.name)
                //    return s.constructor.name;
                //else {
                s = s.toString();
                var m = s.match(/function\s+([^(]+)/);
                if (m)
                    return m[1];
                else
                    return "";
                // }
                //s = s.toString();
                //var m = s.match(/function\s+([^(]+)/);
                //if (m)
                //    return m[1];
                //else
                //    return "";
            }
            GetTypeList(baseType) {
                var _list = new Array();
                var _stre = Ioc.fGetFunName(baseType);
                for (var _m in this.fInstanceClassList) {
                    var _strM = _m;
                    if (_strM.indexOf(_stre + "_") == 0) {
                        var _col = this.fInstanceClassList[_strM];
                        _list.push(_col);
                    }
                }
                return _list;
            }
        }
        Ioc.fIoc = new Ioc();
        Core.Ioc = Ioc;
    })(Core = exports.Core || (exports.Core = {}));
});
