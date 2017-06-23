(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};
    //-------------------------------
   

    //----------------------------拼接字符串-------------
    function StringBuffer() {
        this.__strings__ = [];
    };
    if (StringBuffer.prototype.ad == undefined) {
        StringBuffer.prototype.ad = function (str) {
            this.__strings__.push(str);
            return this;
        };
    }


    StringBuffer.prototype.toString = function () {
        return this.__strings__.join('');
    };


    $.AKjs.CreateBuffer = function (opt_str) {
        var stringBuffer = new StringBuffer();
        if (opt_str) {
            stringBuffer.ad(opt_str);
        }
        return stringBuffer;
    }
    
})(jQuery);