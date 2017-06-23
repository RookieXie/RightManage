(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};

    //  return $.extend({}, $.AKjs.AtawClass, new AtawJsDataValue(ds), bean);

    $.AKjs.AtawAjaxData = function (options) {
        return $.extend({}, $.AKjs.AtawClass, new AtawAjaxData(options)).sysCreator();
    }

    function AtawAjaxData(options) {
        this.Options = options;
        this.Url = null;

        // this.

        this.SetPostDataFun = function (data, page) { return data; }; //数据，页面：数据
        this.BefortPostDataFun = null; //页面：是否提交
        this.AfterPostDataFun = null; //页面,数据： 返回数据 

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "create", function () {
            this.setProByOptName("Url", "Url");
            this.setProByOptName("SetPostDataFun", "SetPostDataFun");
            this.setProByOptName("BefortPostDataFun", "BefortPostDataFun");
            this.setProByOptName("AfterPostDataFun", "AfterPostDataFun");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "ajax", function (data, host) {
            //$.AKjs.getJSON();
            if (this.SetPostDataFun) {
                
            }


            if (this.BefortPostDataFun) {
                var _before = this.getRunFunObj(this.BefortPostDataFun);
                var _isAjax = _before(data);
                if (_isAjax) {
                    $.AKjs.getJSON(
                    this.Url,
                    data,
                    function (res) {

                    });
                }
            }

        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "getRunFunObj", function (funObj) {
            //$.AKjs.getJSON();
            if (typeof (funObj) == "string") {
                var _funObj = $.AKjs.AAD[funObj];
                if (_funObj) {
                    if ($.isFunction(_funObj)) {
                        return _funObj;
                    }
                    else
                        throw ("名称为 " + funObj + "  的$.AKjs.AAD 对象不是一个函数");
                }
                else {
                    throw ("不存在名称为 " + funObj + "  的$.AKjs.AAD提交函数");
                }
            }
            else {
                if ($.isFunction(funObj)) {
                    return funObj;
                }
                else {
                    throw ("不是函数也不是字符串是不被 支持的");
                }
            }

        });
    }


})(jQuery);