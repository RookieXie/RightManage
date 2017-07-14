define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PromiseTest {
        constructor() {
            //$.when(this.pFun1("123")).done((a) => this.pFun1("123").then((b) => { this.pFun1("123") }));
            //$.when(this.pFun1("123")).then(this.pFun2).then(this.pFun3);
            var _s = this.pFun1("构造函数调用123").
                done((a) => { alert(" done " + a); }).
                always((a) => { alert("always " + a); }).
                fail((a) => { alert("fail" + a); }).progress(((a) => { alert("propress" + a); })).state();
            alert(_s);
        }
        pCreatePromise() {
            var _p = $.Deferred();
            return _p;
        }
        pFun1(a) {
            var _p = this.pCreatePromise();
            alert(a);
            //  _p.resolve(a);
            _p.reject("失败");
            return _p.promise();
            // return a;
        }
        ff() {
            this.pFun1("ff调用");
        }
        pFun2(a) {
            return a;
        }
        pFun3(a) {
            return a;
        }
    }
    exports.PromiseTest = PromiseTest;
});
