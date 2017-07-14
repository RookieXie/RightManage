define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Post;
    (function (Post) {
        class Util {
            static Post($dom) {
            }
            static IsEmpty(obj) {
                if (typeof (obj) == "undefined" || obj === null || obj === "" || obj === undefined || Util.IsNull(obj)) {
                    return true;
                }
                else {
                    for (var _pro in obj) {
                        return false;
                    }
                    if (typeof (obj) == "object")
                        return true;
                }
                return false;
            }
            static IsNull(obj) {
                var i = obj.toString();
                if (i == "{}" || i == "") {
                    return true;
                }
                else {
                    return false;
                }
            }
            static CheckDataSet(ds) {
                for (var _dtName in ds) {
                    var _dt = ds[_dtName];
                    if (_dt.length > 0) {
                        for (var i = 0; i < _dt.length; i++) {
                            if (Util.IsEmpty(_dt[i])) {
                                _dt.splice(i, 1);
                                i--;
                            }
                        }
                    }
                }
                return ds;
            }
            static createDataSet(jDomList) {
                var ds = {};
                jDomList.forEach((a) => {
                    var _sign = a.SubmitSign;
                    var cos = _sign.split(".");
                    var _tb = cos[0];
                    var _row = cos[1];
                    var _col = cos[2];
                    ds = Util.joinDataSet(ds, _tb, parseInt(_row), _col, a.DataValue);
                });
                ds = Util.CheckDataSet(ds);
                return ds;
            }
            static joinDataSet(ds, tableName, rowNumber, colName, val) {
                var f = ds[tableName];
                if (typeof (f) == "undefined") {
                    ds[tableName] = [];
                }
                var rowCount = ds[tableName].length;
                if (rowNumber + 1 > rowCount) {
                    for (var i = 0; i < rowNumber - rowCount + 1; i++) {
                        var _row = {};
                        ds[tableName].push(_row);
                    }
                }
                ds[tableName][rowNumber][colName] = val;
                return ds;
            }
        }
        Post.Util = Util;
    })(Post = exports.Post || (exports.Post = {}));
});
