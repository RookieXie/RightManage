"use strict";
var PromiseTest = (function () {
    function PromiseTest() {
        var _s = this.pFun1("构造函数调用123").
            done(function (a) { alert(" done " + a); }).
            always(function (a) { alert("always " + a); }).
            fail(function (a) { alert("fail" + a); }).progress((function (a) { alert("propress" + a); })).state();
        alert(_s);
    }
    PromiseTest.prototype.pCreatePromise = function () {
        var _p = $.Deferred();
        return _p;
    };
    PromiseTest.prototype.pFun1 = function (a) {
        var _p = this.pCreatePromise();
        alert(a);
        _p.reject("失败");
        return _p.promise();
    };
    PromiseTest.prototype.ff = function () {
        this.pFun1("ff调用");
    };
    PromiseTest.prototype.pFun2 = function (a) {
        return a;
    };
    PromiseTest.prototype.pFun3 = function (a) {
        return a;
    };
    return PromiseTest;
}());
exports.PromiseTest = PromiseTest;
