(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};







    //----------构造控件基类
    $.AKjs.AtawBaseDom = function (options) {
        return $.extend({}, $.AKjs.AtawClass(), new AtawBaseDom(options)).sysCreator();
    }

    //-----------------控件的基类---------
    function AtawBaseDom(options) {
        this.Options = options;
        this.$JObj = null; //容器
        this.IsAfterInit = false;
        this.IsInner = false;
        this.Tag = null;
        this.EventEmitter = new EventEmitter2();

       // this.EventEmitter.Obj = this;
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "emit", function (name) {

            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return (_a = this.EventEmitter).emit.apply(_a, [name].concat(args));
           
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "on", function (name,fun) {
            var _this = this ;
            var _fun = function(){
                fun.apply(_this,arguments);
            };
            this.EventEmitter.addListener(name, _fun);
            return _fun;
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "off", function (name, fun) {
            if (fun) {
                this.EventEmitter.removeListener(name, fun);
            }
            else
            this.EventEmitter.removeAllListeners(name);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "creator", function () {
            this.setProByOptName("IsInner", "IsInner");
            this.setProByOptName("Tag", "Tag");
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "beforeInit", function () {

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "sysInit", function () {
            try {
                this.$JObj = this.Options.containerFun();
                //this.$JObj.hide();
                this.beforeInit();
                this.init();
                // this.sysInitChange();
                this.afterInit();
                this.IsAfterInit = true;
                //this.$JObj.show(500);
                //throw {};
            }
            catch (ex) {
                this.ThrowExDom(ex);
            }
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "ThrowExDom", function (ex) {
            this.$JObj.append("<div title='控件出现了异常：" + ex.message + "'><i class='icon-warning-sign fa fa-warning'></i></div>");
            if (console.error) {
                console.error(ex.message);
                console.error(ex.stack);
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "afterInit", function () {

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "intoDom", function ($dom) {
            this.Options = $.AKjs.Options(this.Options, $dom);
            $dom.addClass("AKJS");
            $dom.data("ATAW_CONTROL", this);
            this.sysInit();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setProByOptName", function (optName, proName, defaultObj) {
            if (this.Options) {
                if ($.AKjs.IsEmpty(proName)) {
                    proName = optName;
                }
                var _optVal = this.Options[optName];
                var _myPro = this[proName];
                if ((_optVal == false) || (_optVal && _optVal != "null" && !$.AKjs.IsEmpty(_optVal) && $.AKjs.IsExit(_myPro))) {
                    this[proName] = this.Options[optName];
                }
                else {
                    //if()
                    if ($.AKjs.IsEmpty(_optVal) && $.AKjs.IsExit(_myPro) && $.AKjs.IsExit(defaultObj)) {
                        this[proName] = defaultObj;
                    }
                }
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dispose", function () {



            if (this.$JObj) {
                if (this.$JObj.data("ATAW_CONTROL") === this) {
                    this.$JObj.data("ATAW_CONTROL", null);
                }
                //            this.$JObj.find("*").unbind();
                //            thithis.$JObj.clear();s.$JObj.removeClass("AKJS");
                this.$JObj.clear();
            }
            if (this.EventEmitter) {
                this.EventEmitter.Obj = null;
                this.EventEmitter.removeAllListeners();
                this.EventEmitter = null;
            }

            for (var _pro in this) {
                //                if (this[_pro] && this[_pro]["dispose"]) {
                //                    this[_pro].dispose();
                //                }
                this[_pro] = null;
                delete (this[_pro]);
            }


        });

    }



})(jQuery);